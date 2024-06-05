const Project = require('../models/project');
const { successResponse, errorResponse, validationErrorResponse } = require('../utils/responseHandler');

const createProject = async (req, res) => {
  try {
    const { title, technology, link, frontend, backend } = req.body;
    const img = req.file?.path;

    // Validation
    if (!title || !technology || !link || !frontend) {
      return validationErrorResponse(res, [
        'Title, technology, link, frontend code, and image are required fields.',
      ]);
    }

    // Create project object
    const project = new Project({
      title,
      img,
      technology,
      link,
      code: { frontend, backend },
    });

    // Save project to the database
    await project.save();

    // Send success response
    return successResponse(res, 201, project, 'Project created successfully!');
  } catch (error) {
    console.error('Error creating project:', error);

    // Check if the error is a Mongoose validation error
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err) => err.message);
      return validationErrorResponse(res, errors);
    }

    // Handle other types of errors
    return errorResponse(res, 500, error.message, 'Server error');
  }
};
const getProjects = async (req, res) => {
    try {
      let { page = 1, limit = 5, sort = 'desc', sortBy = 'createdAt' } = req.query;
  
      page = parseInt(page, 10);
      limit = parseInt(limit, 10);
  
      const sortOrder = sort === 'asc' ? 1 : -1;
  
      const allProjects = await Project.find()
        .sort({ [sortBy]: sortOrder })
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();
  
      const totalProjects = await Project.countDocuments().exec();
      const totalPages = Math.ceil(totalProjects / limit);
  
      return successResponse(res, 200, {
        allProjects,
        page,
        totalPages,
        totalProjects
      }, 'Projects retrieved successfully');
    } catch (error) {
      console.error('Error retrieving projects:', error);
      return errorResponse(res, 500, error.message, 'Server error');
    }
  };
module.exports = {
  createProject,
  getProjects,
};

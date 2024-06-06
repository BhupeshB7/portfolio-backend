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
        .select("-img")
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
 const getProjectImage = async (req, res) => {
  try {
    // Validate request parameters
    

    const { projectId } = req.params;

    // Validate projectId format
    if (!projectId.match(/^[0-9a-fA-F]{24}$/)) {
      return errorResponse(res, 400, 'Invalid project ID format', 'The provided project ID is not valid');
    }

    // Fetch project image
    const project = await Project.findById(projectId).select("img").exec();

    if (!project) {
      return errorResponse(res, 404, 'Project not found', 'No project found with the given ID');
    }

    // Return the project image
    return res.status(200).send(project.img);
  } catch (error) {
    console.error('Error retrieving project image:', error);
    return errorResponse(res, 500, error.message, 'Server error');
  }
};

  
module.exports = {
  createProject,
  getProjects,
  getProjectImage,
};

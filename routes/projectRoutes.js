const express = require('express');
const router = express.Router();
const { createProject,getProjects,getProjectImage } = require('../controllers/projectController');
const uploadMiddleware = require('../middleware/upload');

router.post('/projects', uploadMiddleware, createProject);
router.get('/getAllprojects',getProjects);
router.get('/projects/:projectId/image', getProjectImage);
module.exports = router;

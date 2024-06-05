const express = require('express');
const router = express.Router();
const { createProject,getProjects } = require('../controllers/projectController');
const uploadMiddleware = require('../middleware/upload');

router.post('/projects', uploadMiddleware, createProject);
router.get('/getAllprojects',getProjects);

module.exports = router;

const mongoose = require("mongoose");

const codeSchema = new mongoose.Schema({
  frontend: {
    type: String,
    required: true,
  },
  backend: {
    type: String,
    required: false,
  },
});

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Project title is required"],
    unique: true,
    trim: true,
    minlength: [3, "Title must be at least 3 characters long"],
    maxlength: [100, "Title cannot exceed 100 characters"],
  },
  img: {
    type: String,
    required: true,
  },
  technology: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  code: {
    type: codeSchema,
    // required: true,
},
}, {
  timestamps: true, // to include createdAt and updatedAt fields
});
  


const Project = mongoose.model("Project", projectSchema);

module.exports = Project;

const Project = require("../models/project");
const { connectDB } = require("../utils/db");
const path = require('path');
const fs = require('fs');
const { projects } = require("./project");
connectDB();

const importData = async () => {
   try {
      const data = await Project.find({});
     const filePath = path.join(__dirname, 'project.json');
     
     fs.writeFileSync(filePath,JSON.stringify(data,null,2),(err)=>{
        if(err){
          console.log('Error writing file',err);
        }else{
            console.log("Data saved successfully");
        }
     });
   //  await Project.collection.deleteMany({});
   //  console.log("Data deleted successfully");
   //  await Project.insertMany(projects);
   //  console.log("Data saved successfully");
   } catch (error) {
    console.log(error);
   }
}
importData();
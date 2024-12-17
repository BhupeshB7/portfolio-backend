const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    connectDB: async () => {
        try {
            // console.log('MONGODB_URI:', process.env.MONGO_URI); 
            await mongoose.connect(process.env.MONGO_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            console.log('Database connected successfully');
        } catch (error) {
            console.error('Database connection error:', error);
        }
    },
};
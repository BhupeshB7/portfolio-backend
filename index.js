const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const useragent = require('express-useragent');
dotenv.config();

const app = express();
app.use(
  cors({
    // origin:"http://localhost:3000",
    origin: "*",
  })
);
app.use(useragent.express());
app.use(bodyParser.json());
//API Routes
const emailRoutes = require('./routes/emailRoutes');
app.use('/api', emailRoutes);
const projectRoutes = require('./routes/projectRoutes');
app.use('/api', projectRoutes);
const ipRoutes = require('./routes/getIp');
app.use('/api', ipRoutes);
app.get('/', (req, res) => {
  res.json({ message: 'Portfolio Backend server is started now' });
});
//API Routes Ends
//Server Starts
const PORT = process.env.PORT || 8000;
//Database Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
    console.log('Database connected successfully');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((error) => {
  console.error('Database connection error:', error);
});

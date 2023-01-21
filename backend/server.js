const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorHandler');
const trainRoutes = require('./routes/trains');
const coachRoutes = require('./routes/coaches');

/* CONFIGURATION */
const server = express();
dotenv.config();
server.use(express.json());
server.use(morgan('common'));
server.use(helmet());
server.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
server.use(cors());
connectDB();

/* ROUTES */
const baseApiPathPrefix = process.env.API_PATH_PREFIX;
server.use(baseApiPathPrefix, trainRoutes);
server.use(baseApiPathPrefix, coachRoutes);

/* CUSTOM ERROR HANDLER */
server.use(errorHandler);

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`SERVER IS LISTENING AT PORT ${PORT}...`);
});

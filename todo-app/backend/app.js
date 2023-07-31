// START OF SETUP ENVIRONMENT VARIABLES
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, 'config', 'config.env') });
// END OF SETUP ENVIRONMENT VARIABLES

const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const errorMiddleware = require('./middleware/error');
const app = express();
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
// setup body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// Cookie parser middleware
app.use(cookieParser());

// CORS middleware
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Logger middleware
app.use(logger('dev'));

// Basic security middleware
app.use(helmet());
// Avoid Fingerprinting
app.disable('x-powered-by');

// Setup Root route

app.use('/$', (req, res) => {
    return res.status(200).json({
        success: true,
        message: 'Welcome to the todo project',
    });
});

app.use('/api/v1/todos', require('./routes/todos.routes'));

// 404 page
app.all('*', (req, res) => {
    return res.status(404).json({
        success: false,
        message: 'Path not found',
    });
});

// Error handling middleware
app.use(errorMiddleware);

module.exports = app;

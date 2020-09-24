// Rename `.env.sample` to just `.env` and it will be loaded when the app starts
// here using `dotenv`.
require('dotenv').config();

const startServer = require('./server');

startServer();

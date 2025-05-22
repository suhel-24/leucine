const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const softwareRoutes = require('./routes/software');
app.use('/api/software', softwareRoutes);

const requestRoutes = require('./routes/request');
app.use('/api/requests', requestRoutes);

module.exports = app; 
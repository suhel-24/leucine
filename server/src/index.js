const { createConnection } = require('typeorm');
const ormConfig = require('./config/ormconfig');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

createConnection(ormConfig)
    .then(() => {
        console.log('Database connected successfully!');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Database connection error:', err);
    }); 
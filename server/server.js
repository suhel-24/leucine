const { DataSource } = require('typeorm');
const ormConfig = require('./src/config/ormconfig');
const app = require('./src/index');

const PORT = process.env.PORT || 5000;
const dataSource = new DataSource(ormConfig);

dataSource.initialize()
    .then(() => {
        console.log('Database connected successfully!');
        app.locals.dataSource = dataSource;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Database connection error:', err);
    }); 
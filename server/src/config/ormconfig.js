module.exports = {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    synchronize: true, // Set to false in production
    logging: false,
    entities: [__dirname + '/../entities/*.js'],
    ssl: {
        rejectUnauthorized: false, // needed for most online DBs like Heroku or Supabase
    },
    migrations: [__dirname + '/../database/migrations/*.js'],
    cli: {
        entitiesDir: 'src/entities',
        migrationsDir: 'database/migrations',
    },
}; 
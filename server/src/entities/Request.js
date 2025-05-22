const { EntitySchema } = require('typeorm');
const User = require('./User');
const Software = require('./Software');

module.exports = new EntitySchema({
    name: 'Request',
    tableName: 'requests',
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true,
        },
        accessType: {
            type: 'varchar',
        },
        reason: {
            type: 'text',
        },
        status: {
            type: 'varchar',
            default: 'Pending',
        },
    },
    relations: {
        user: {
            type: 'many-to-one',
            target: 'User',
            joinColumn: true,
            eager: true,
        },
        software: {
            type: 'many-to-one',
            target: 'Software',
            joinColumn: true,
            eager: true,
        },
    },
}); 
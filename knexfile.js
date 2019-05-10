module.exports = {
    development:{
        client: 'mysql2',
        connection:{
            database: 'stickers',
            user: 'root',
            password: 'password',
        },
        pool: {
          min: 2,
          max: 10
        }
    },
    test:{
        client: 'mysql2',
        connection:{
            database: 'test_stickers',
            user: 'root',
            password: 'password',
        },
    migrations: {
        tableName: 'knex_migrations',
        directory: './migrations',
        
    },
    seeds: {
        directory: './seeds'
    },
          pool: {
            min: 0,
            max: 10,idleTimeoutMillis: 500
            }
    }
}
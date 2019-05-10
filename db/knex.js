const envirnoment =  process.env.NODE_ENV ||'development'
const config = require('../knexfile')
const envConfig = config[envirnoment]
const knex = require('knex')

const connection = knex(envConfig)
module.exports = connection
const knex = require('knex');
const configuration = require('../../knexfile');

// https://blog.rocketseat.com.br/variaveis-ambiente-nodejs/
const config = process.env.NODE_ENV === 'test' ? configuration.test : configuration.development;

const connection = knex(config);

module.exports = connection;
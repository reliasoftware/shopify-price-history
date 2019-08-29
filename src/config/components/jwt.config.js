'use strict';

const joi = require('joi');

/**
 * Generate a validation schema using joi to check the type of your environment variables
 */
const envSchema = joi
  .object({
    JWT_SECRET: joi.string(),
    JWT_EXPIRE: joi.string(),
    bcryptRound: joi.string(),
  })
  .unknown()
  .required();

/**
 * Validate the env variables using joi.validate()
 */
const { error, value: envVars } = joi.validate(process.env, envSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  jwt: {
    secret: envVars.JWT_SECRET || 'jwt-secret',
    expire: envVars.JWT_EXPIRE || '48h',
    bcryptRound: parseInt(envVars.BCRYPT_ROUNDS, 10) || 10,
  },
};

module.exports = config;

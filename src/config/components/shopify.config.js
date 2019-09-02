'use strict';

const joi = require('joi');

/**
 * Generate a validation schema using joi to check the type of your environment variables
 */
const envSchema = joi
  .object({
    SHOPIFY_API_KEY: joi.string(),
    SHOPIFY_API_SECRET_KEY: joi.string(),
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
  shopify: {
    SHOPIFY_API_KEY: envVars.SHOPIFY_API_KEY || '',
    SHOPIFY_API_SECRET_KEY: envVars.SHOPIFY_API_SECRET_KEY || '',
  },
};

module.exports = config;

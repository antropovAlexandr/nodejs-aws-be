import type { AWS } from '@serverless/typescript';

import { getProductsList, getProductsById, addProduct } from './src/functions';

const serverlessConfiguration: AWS = {
  service: 'product-service',
  frameworkVersion: '2',
  custom: {
    stage: "${opt:stage, self:provider.stage}",
    environment: "${file(env.yml):${self:custom.stage}, file(env.yml):default}",
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
    documentation: {
      version: '1',
      title: 'NODEJS in AWS aip',
      description: 'description NODEJS in AWS aip',
      models: {},
    }
  },
  plugins: [
      'serverless-webpack',
      'serverless-openapi-documentation'
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    stage: 'dev',
    region: 'eu-west-1',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      PG_HOST: "${self:custom.environment.PG_HOST}",
      PG_PORT: "${self:custom.environment.PG_PORT}",
      PG_DATABASE: "${self:custom.environment.PG_DATABASE}",
      PG_USERNAME: "${self:custom.environment.PG_USERNAME}",
      PG_PASSWORD: "${self:custom.environment.PG_PASSWORD}",
    },
    lambdaHashingVersion: '20201221',
  },
  functions: {
    getProductsList,
    getProductsById,
    addProduct
  },
};

module.exports = serverlessConfiguration;

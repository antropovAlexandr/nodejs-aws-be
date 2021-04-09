import type { AWS } from '@serverless/typescript';

import { getProductsList, getProductsById } from './src/functions';

const serverlessConfiguration: AWS = {
  service: 'product-service',
  frameworkVersion: '2',
  custom: {
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
    },
    lambdaHashingVersion: '20201221',
  },
  functions: {
    getProductsList,
    getProductsById
  },
};

module.exports = serverlessConfiguration;

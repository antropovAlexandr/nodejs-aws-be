import type { AWS } from '@serverless/typescript';

import { basicAuthorizer } from './src/functions';

const serverlessConfiguration: AWS = {
  service: 'authorization-service',
  frameworkVersion: '2',
  custom: {
    stage: "${opt:stage, self:provider.stage}",
    environment: "${file(env.yml):${self:custom.stage}, file(env.yml):default}",
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
  },
  plugins: ['serverless-webpack'],
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
      USERNAME: "${self:custom.environment.USERNAME}",
      PASSWORD: "${self:custom.environment.PASSWORD}",
    },
    lambdaHashingVersion: '20201221',
  },
  resources: {
    Outputs: {
      authFunction: {
        Value: {'Fn::GetAtt': ['BasicAuthorizerLambdaFunction', 'Arn']},
        Export: {
          Name: 'authFunction',
        },
      },
    },
  },
  // import the function via paths
  functions: { basicAuthorizer },
};

module.exports = serverlessConfiguration;

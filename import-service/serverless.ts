import type { AWS } from '@serverless/typescript';

import { importProductsFile, importFileParser } from './src/functions';

const serverlessConfiguration: AWS = {
  service: 'import-service',
  frameworkVersion: '2',
  custom: {
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
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: ['s3:ListBucket'],
        Resource: 'arn:aws:s3:::nodejs-aws-uploaded',
      },
      {
        Effect: 'Allow',
        Action: ['s3:PutObject'],
        Resource: 'arn:aws:s3:::nodejs-aws-uploaded',
      },
      {
        Effect: 'Allow',
        Action: ['s3:*'],
        Resource: 'arn:aws:s3:::nodejs-aws-uploaded/*',
      },
      {
        Effect: "Allow",
        Action: "sqs:SendMessage",
        Resource: "${cf:product-service-dev.SqsArn}",
      },
    ],
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      SQS_URL: "${cf:product-service-dev.SqsUrl}",
    },
    lambdaHashingVersion: '20201221',
  },
  resources: {
    Resources: {
      GatewayResponseDefault4XX: {
        Type: 'AWS::ApiGateway::GatewayResponse',
        Properties: {
          ResponseParameters: {
            'gatewayresponse.header.Access-Control-Allow-Origin': "'*'",
            'gatewayresponse.header.Access-Control-Allow-Headers': "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'",
            'gatewayresponse.header.Access-Control-Allow-Methods': "'GET,OPTIONS'"
          },
          ResponseType: 'DEFAULT_4XX',
          RestApiId: {
            Ref: 'ApiGatewayRestApi'
          }
        }
      }
    }
  },
  // import the function via paths
  functions: {
    importProductsFile,
    importFileParser,
  },
};

module.exports = serverlessConfiguration;

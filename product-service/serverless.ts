import type { AWS } from '@serverless/typescript';

import { getProductsList, getProductsById, addProduct, catalogBatchProcess } from './src/functions';

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
    sqsArn: {
      "Fn::GetAtt": ["catalogItemsQueue", "Arn"],
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
  resources: {
    Resources: {
      catalogItemsQueue: {
        Type: "AWS::SQS::Queue",
        Properties: {
          QueueName: "cvs-sqs",
        },
      },
      createProductTopic: {
        Type: "AWS::SNS::Topic",
        Properties: {
          TopicName: "notify-about-products",
        },
      },
      SNSSubscriptionSuccess: {
        Type: "AWS::SNS::Subscription",
        Properties: {
          //TODO: move to env vars
          Endpoint: "dmitrii_esin@epam.com",
          Protocol: "email",
          TopicArn: {
            Ref: "createProductTopic",
          },
          //TODO: move to env vars
          FilterPolicy: {
            status: ["success"],
          },
        },
      },
      SNSSubscriptionFailure: {
        Type: "AWS::SNS::Subscription",
        Properties: {
          Endpoint: "antopov.a.i@gmail.com",
          Protocol: "email",
          TopicArn: {
            Ref: "createProductTopic",
          },
          FilterPolicy: {
            status: ["failure"],
          },
        },
      },
    },
    Outputs: {
      SqsUrl: {
        Value: {
          Ref: "catalogItemsQueue",
        },
      },
      SqsArn: {
        Value: "${self:custom.sqsArn}",
        Export: {
          Name: "SqsArn",
        },
      },
    },
  },
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
      SNS_ARN: {
        Ref: "createProductTopic",
      },
    },
    iam: {
      role: {
        statements: [
          {
            Effect: "Allow",
            Action: "sqs:*",
            Resource: [
              {
                "Fn::GetAtt": ["catalogItemsQueue", "Arn"],
              },
            ],
          },
          {
            Effect: "Allow",
            Action: "sns:*",
            Resource: {
              Ref: "createProductTopic",
            },
          },
        ],
      },
    },
    lambdaHashingVersion: '20201221',
  },
  functions: {
    getProductsList,
    getProductsById,
    addProduct,
    catalogBatchProcess,
  },
};

module.exports = serverlessConfiguration;

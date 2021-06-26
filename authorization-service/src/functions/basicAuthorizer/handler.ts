import 'source-map-support/register';

import {APIGatewayAuthorizerResult, APIGatewayTokenAuthorizerHandler} from "aws-lambda";

import { generatePolicy } from "@libs/auth";

const { PASSWORD, USERNAME } = process.env;


const AUTH_TOKEN = 'TOKEN';

const basicAuthorizer: APIGatewayTokenAuthorizerHandler = async (event, _, callback) => {
  console.log('event:', event);

  const { type, methodArn, authorizationToken } = event;

  if (type !== AUTH_TOKEN) {
    return callback('Unauthorized') as unknown as APIGatewayAuthorizerResult;
  }

  const encodedCreds = authorizationToken.split(' ')[1];
  const buff = Buffer.from(encodedCreds, 'base64');
  const plainCreds = buff.toString('utf-8').split(':');
  const username = plainCreds[0];
  const password = plainCreds[1];

  if (username !== USERNAME || password !== PASSWORD) {
    return callback('Unauthorized') as unknown as APIGatewayAuthorizerResult;
  }

  return generatePolicy(encodedCreds, methodArn, 'Allow')
}

export const main = basicAuthorizer;

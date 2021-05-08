import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda"
import type { FromSchema } from "json-schema-to-ts";

export const DEFAULT_ERROR_CODE = 500;
export const DEFAULT_ERROR_MESSAGE = 'Internal Server Error';

type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & { body: FromSchema<S> };
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<ValidatedAPIGatewayProxyEvent<S>, APIGatewayProxyResult>;

const headers = {
  "Access-Control-Allow-Headers" : "*",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "*"
};

export const formatSuccessResponse = (response: any): APIGatewayProxyResult => {
  return {
    statusCode: 200,
    body: JSON.stringify(response),
    headers,
    isBase64Encoded : false,
  }
}

export const formatErrorResponse = (code: number = DEFAULT_ERROR_CODE, message: string = DEFAULT_ERROR_MESSAGE): APIGatewayProxyResult => {
  return {
    statusCode: code,
    body: JSON.stringify({ message: message }),
    headers,
    isBase64Encoded : false,
  }
}




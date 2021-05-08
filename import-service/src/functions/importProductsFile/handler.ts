import 'source-map-support/register';
import type { APIGatewayProxyResult } from "aws-lambda";


import { getFileUrl } from "./service";
import {formatErrorResponse, formatSuccessResponse, ValidatedEventAPIGatewayProxyEvent} from "@libs/apiGateway";
import schema from "./schema";

export const importProductsFile: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async ({ queryStringParameters }): Promise<APIGatewayProxyResult> => {
  console.log('Call importProductsFile queryStringParameters:', queryStringParameters);
  try {
    const { name } = queryStringParameters;
    const url = await getFileUrl(name);
    console.log('url url:', url);
    return formatSuccessResponse(url);
  } catch (error) {
    return formatErrorResponse(error?.code, error?.message);
  }
}

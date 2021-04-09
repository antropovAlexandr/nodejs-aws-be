import 'source-map-support/register';
import type { APIGatewayProxyResult } from "aws-lambda";

import { formatErrorResponse, formatSuccessResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import { getCourses } from "./service";


export const getProductsList = async (): Promise<APIGatewayProxyResult> => {
  try {
    const courses = await getCourses();
    return formatSuccessResponse(courses);
  } catch (error) {
      return formatErrorResponse();
  }
}

export const main = middyfy(getProductsList);

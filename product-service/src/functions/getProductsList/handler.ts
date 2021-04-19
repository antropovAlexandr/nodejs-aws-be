import 'source-map-support/register';
import type { APIGatewayProxyResult } from "aws-lambda";

import { formatErrorResponse, formatSuccessResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import { getCoursesService } from "./service";


export const getProductsList = async (): Promise<APIGatewayProxyResult> => {
  console.log('Call getProductsList');
  try {
    const courses = await getCoursesService();
    return formatSuccessResponse(courses);
  } catch (error) {
      return formatErrorResponse();
  }
}

export const main = middyfy(getProductsList);

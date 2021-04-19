import 'source-map-support/register';
import type { APIGatewayProxyResult } from "aws-lambda";


import { getCourseById } from "./service";
import {formatErrorResponse, formatSuccessResponse, ValidatedEventAPIGatewayProxyEvent} from "@libs/apiGateway";
import schema from "./schema";

export const getProductsById: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async ({ pathParameters}): Promise<APIGatewayProxyResult> => {
  console.log('Call getProductsById pathParameters:', pathParameters);
  try {
    const { productId } = pathParameters;
    const course = await getCourseById(productId);
    return course ? formatSuccessResponse(course) : formatErrorResponse(404, 'Not Found');
  } catch (error) {
    return formatErrorResponse(error?.code, error?.message);
  }
}

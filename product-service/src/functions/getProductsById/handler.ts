import 'source-map-support/register';
import type { APIGatewayProxyResult } from "aws-lambda";

import { formatErrorResponse, formatSuccessResponse } from '@libs/apiGateway';

import { getCourseById } from "./service";
import {HttpEventRequest} from "@functions/types";


export const getProductsById = async (event: HttpEventRequest<{ productId: string }>): Promise<APIGatewayProxyResult> => {
  try {
    const { productId } = event.pathParameters;
    const course = await getCourseById(productId);
    return course ? formatSuccessResponse(course) : formatErrorResponse(404, 'Not Found');
  } catch (error) {
    return formatErrorResponse();
  }
}

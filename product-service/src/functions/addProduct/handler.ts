import 'source-map-support/register';
import type { APIGatewayProxyResult } from "aws-lambda";

import {formatErrorResponse, formatSuccessResponse, ValidatedEventAPIGatewayProxyEvent} from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import schema from "./schema";
import {addProductService} from "./service";
import {CourseRequestType} from "@functions/types";


export const addProducts: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async ({ body }): Promise<APIGatewayProxyResult> => {
  console.log('Call addProducts body: ', body);
  try {
    const { title, description, price, count } = body as CourseRequestType;

    const product = await addProductService({ title, description, price, count });
    return formatSuccessResponse(product);
  } catch (error) {
      return formatErrorResponse();
  }
}

export const main = middyfy(addProducts);

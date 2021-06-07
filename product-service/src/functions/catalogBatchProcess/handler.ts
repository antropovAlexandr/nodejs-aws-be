import 'source-map-support/register';

import {formatErrorResponse, formatSuccessResponse } from "../../../../import-service/src/libs/apiGateway";
import {saveProducts} from "@functions/catalogBatchProcess/service";

export const catalogBatchProcess = async (props): Promise<any> => {
  console.log('Call catalogBatchProcess props:', props);

  try {
    const products = props.Records.map((record) =>
        JSON.parse(record.body)
    );
    await saveProducts(products);
    return formatSuccessResponse(props);
  } catch (error) {
    return formatErrorResponse(error?.code, error?.message);
  }
}

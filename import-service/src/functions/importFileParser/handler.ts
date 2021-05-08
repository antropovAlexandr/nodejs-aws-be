import 'source-map-support/register';

import {formatErrorResponse, formatSuccessResponse } from "@libs/apiGateway";
import {parseFile} from "./service";

export const importFileParser = async (props): Promise<any> => {
  console.log('Call importFileParser props:', props);

  try {
    const fileName = props.Records[0].s3.object.key;
    await parseFile(fileName);
    return formatSuccessResponse(props);
  } catch (error) {
    return formatErrorResponse(error?.code, error?.message);
  }
}

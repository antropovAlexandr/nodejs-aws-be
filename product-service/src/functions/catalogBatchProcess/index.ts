import { handlerPath } from '../../../../import-service/src/libs/handlerResolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.catalogBatchProcess`,
  events: [
    {
      sqs: {
        batchSize: 5,
        arn: {
          "Fn::GetAtt": ["catalogItemsQueue", "Arn"],
        },
      },
    },
  ],
}

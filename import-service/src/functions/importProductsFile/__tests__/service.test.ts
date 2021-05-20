import AWS  from 'aws-sdk';
import AWSMock from 'aws-sdk-mock';
import {importProductsFile} from "../handler";

describe('importProductsFile Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should correctly handle importing products file', async () => {
        AWSMock.setSDKInstance(AWS);
        AWSMock.mock('S3', 'getSignedUrl', (operation, params, callback) => {
            return callback(null, 'mockSignedUrl');
        });
        // @ts-ignore
        const url = await importProductsFile({
            "queryStringParameters": {
                "name": "test"
            }
        });
        console.log('url', url);
        expect(url).toEqual({
            statusCode: 200,
            body: '{}',
            "isBase64Encoded": false,
            headers: {
                'Access-Control-Allow-Origin': '*',
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Allow-Methods": "*",
            },
        });
    });

});

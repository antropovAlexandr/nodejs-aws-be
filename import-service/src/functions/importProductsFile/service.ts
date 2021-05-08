import { S3 } from 'aws-sdk';



export const getFileUrl: (fileName: string) => Promise<string> = async (fileName) => {
    const bucket = 'nodejs-aws-uploaded';
    const catalogPath = 'uploaded/';

    const s3 = new S3({
        region: 'eu-west-1',
        signatureVersion: 'v4',
    });
    const params = {
        Key: catalogPath + fileName,
        Bucket: bucket,
        ContentType: 'text/csv',
        ACL: 'public-read'
    };
    return await s3.getSignedUrl('putObject', params);
}
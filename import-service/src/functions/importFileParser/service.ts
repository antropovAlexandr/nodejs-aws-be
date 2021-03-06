import { S3, SQS } from 'aws-sdk';
import csv from 'csv-parser';


export const parseFile: (fileName) => Promise<void> = async (fileName) => {
    const bucket = 'nodejs-aws-uploaded';

    const s3 = new S3({
        region: 'eu-west-1',
    });
    const params = {
        Key: fileName,
        Bucket: bucket,
    };

    const results = [];
    const readStream = await s3.getObject(params).createReadStream();
    console.log('start readStream');

    const sqs = new SQS()
    await new Promise<void>((res) => {
        readStream
        .pipe(csv())
        .on('data', data => {
            results.push(data);
            console.log('data', data);

            sqs.sendMessage({
                QueueUrl: process.env.SQS_URL,
                MessageBody: JSON.stringify(data),
            }, (error,) => {
                console.log('send message');
                console.log('error send message', error);
            })
        })
        .on('end', async () => {
            console.log('Parsed successfully');
            res();
        })
    });

    console.log('start copyObject');
    await s3.copyObject({
        Bucket: bucket,
        CopySource: `/${bucket}/${fileName}`,
        Key: fileName.replace('uploaded', 'parsed')
    }).promise();

    console.log('start deleteObject');
    await s3.deleteObject({
        Bucket: bucket,
        Key: fileName,
    }).promise();

    console.log('All done!');
}
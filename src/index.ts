import { saveToTable } from './dynamodb-util';
import  { detectText } from './rekognition-util';

const TABLE_NAME = process.env.TABLE_NAME,
  PRIMARY_KEY = process.env.PRIMARY_KEY;

export const handler = async function (eventObject: any = {}) {
  const eventRecord = eventObject.Records && eventObject.Records[0],
    inputBucket = eventRecord.s3.bucket.name,
    key = eventRecord.s3.object.key;
  const detectedText = await detectText(inputBucket, key);
  return saveToTable(TABLE_NAME, PRIMARY_KEY, { imageKey: key, imageText: detectedText });
};

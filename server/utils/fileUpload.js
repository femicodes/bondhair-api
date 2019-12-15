import aws from 'aws-sdk';
import fs from 'fs';
import { config } from 'dotenv';

config();

export const uploadSettings = async (params, file) => {
  aws.config.setPromisesDependency();
  aws.config.update({
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region: 'us-west-1',
  });

  const s3 = new aws.S3();
  await s3.upload(params, (err, data) => {
    try {
      if (err) {
        Promise.reject('Error occured while trying to upload to S3 bucket');
      }

      fs.unlinkSync(file); // Empty temp folder
      return data;
    } catch (error) {
      return error
    }
  });
};

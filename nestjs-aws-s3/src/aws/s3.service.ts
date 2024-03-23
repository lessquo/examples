import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Inject, Injectable } from '@nestjs/common';
import { AWS_MODULE_OPTIONS } from './aws.constants';
import { AwsModuleOptions } from './aws.module';

@Injectable()
export class S3Service {
  private readonly client: S3Client;

  constructor(@Inject(AWS_MODULE_OPTIONS) private readonly options: AwsModuleOptions) {
    this.client = new S3Client({
      region: options.region,
      credentials: {
        accessKeyId: options.accessKeyId,
        secretAccessKey: options.secretAccessKey,
      },
    });
  }

  getObject(key: string) {
    const command = new GetObjectCommand({ Bucket: this.options.s3Bucket, Key: key });
    return this.client.send(command);
  }

  getSignedUrl(key: string) {
    const command = new GetObjectCommand({ Bucket: this.options.s3Bucket, Key: key });
    return getSignedUrl(this.client, command, { expiresIn: 3600 }); // 1 hour
  }

  createPresignedPost(key: string, contentType: string) {
    return createPresignedPost(this.client, {
      Bucket: this.options.s3Bucket,
      Key: key,
      Conditions: [
        ['starts-with', '$Content-Type', contentType],
        ['content-length-range', 0, 1024 * 1024 * 50], // 50MiB
      ],
    });
  }
}

import { Controller, Get, Query } from '@nestjs/common';
import { S3Service } from './s3.service';

@Controller('s3')
export class S3Controller {
  constructor(private service: S3Service) {}

  @Get('signed-url')
  async getSignedUrl(@Query('key') key: string) {
    return this.service.getSignedUrl(key);
  }
}

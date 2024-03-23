import { Module } from '@nestjs/common';
import { AwsModule } from 'src/aws/aws.module';
import { CatController } from './cat.controller';
import { CatService } from './cat.service';

@Module({
  imports: [AwsModule],
  providers: [CatService],
  controllers: [CatController],
  exports: [CatService],
})
export class CatModule {}

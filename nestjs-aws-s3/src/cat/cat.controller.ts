import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { S3Service } from 'src/aws/s3.service';
import { v4 } from 'uuid';
import { CreateCatDto } from './cat.dto';
import { CatService } from './cat.service';

@Controller('cat')
export class CatController {
  constructor(
    private service: CatService,
    private s3Service: S3Service,
  ) {}

  @Get()
  async get() {
    return this.service.findAll();
  }

  @Get(':id')
  async getOneById(@Param('id') id: string) {
    return this.service.findOneById(id);
  }

  @Get(':id/avatar/presigned-post')
  async getAvatarPresignedPost(@Param('id') id: string) {
    const cat = await this.service.findOneById(id);
    const key = `cat/${cat.id}/avatar`;
    const contentType = 'image/png';
    return this.s3Service.createPresignedPost(key, contentType);
  }

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    this.service.create({ ...createCatDto, id: v4() });
  }
}

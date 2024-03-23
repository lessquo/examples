import { Injectable } from '@nestjs/common';
import { Cat } from './cat.entity';

@Injectable()
export class CatService {
  private readonly cats: Cat[] = [];

  async findOneById(id: string) {
    return this.cats.find(cat => cat.id === id);
  }

  async findAll() {
    return this.cats;
  }

  async create(cat: Cat) {
    this.cats.push(cat);
  }
}

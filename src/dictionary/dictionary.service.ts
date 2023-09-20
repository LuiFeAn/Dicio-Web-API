import { Injectable } from '@nestjs/common';

@Injectable()
export class DictionaryService {

  findAll() {
    return `This action returns all dictionary`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dictionary`;
  }

}

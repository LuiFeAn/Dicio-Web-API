import { Controller, Get, Param } from '@nestjs/common';
import { DictionaryService } from './dictionary.service';

@Controller('dictionary')
export class DictionaryController {
  constructor(private readonly dictionaryService: DictionaryService) {}

  @Get(':id')
  findOne(@Param('id') word: string) {

    return this.dictionaryService.findOne(word);

  }

}

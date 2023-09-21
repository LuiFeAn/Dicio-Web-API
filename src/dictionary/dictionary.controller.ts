import { Controller, Get, Param } from '@nestjs/common';
import { DictionaryService } from './dictionary.service';

@Controller('dictionary')
export class DictionaryController {
  constructor(private readonly dictionaryService: DictionaryService) {}

  @Get(':id')
  search(@Param('id') word: string) {

    return this.dictionaryService.searchWord(word);

  }

}

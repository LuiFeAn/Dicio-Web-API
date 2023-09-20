import { Module } from '@nestjs/common';
import { DictionaryService } from './dictionary.service';
import { DictionaryController } from './dictionary.controller';
import { PuppeteerService } from 'src/puppeteer/puppeteer-service';

@Module({
  controllers: [DictionaryController],
  providers: [DictionaryService,PuppeteerService]
})
export class DictionaryModule {}

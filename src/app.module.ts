import { Module } from '@nestjs/common';
import { DictionaryModule } from './dictionary/dictionary.module';

@Module({
  imports: [DictionaryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Injectable } from '@nestjs/common';

import { PuppeteerService } from 'src/puppeteer/puppeteer-service';

@Injectable()
export class DictionaryService {

  constructor( private readonly puppeteerService: PuppeteerService ){}

  async findOne(wordSearch: string) {

      const page = await this.puppeteerService.initialize({
        headless:'new',
        page:`https://www.dicio.com.br/${wordSearch}`
      });

      const results = await page.evaluate(function(){

          const description = document.querySelector('.significado.textonovo');

          const text = [ ...description.children ].map(({ innerHTML}) => innerHTML);

          return text;

      });

      return results;

  }

}

import { Injectable } from '@nestjs/common';

import puppeteer from 'puppeteer';

@Injectable()
export class DictionaryService {

  async findOne(wordSearch: string) {
    
      const browser = await puppeteer.launch({
          headless:'new'
      });

      const page = await browser.newPage();

      await page.goto(`https://www.dicio.com.br/${wordSearch}`);

      const results = await page.evaluate(function(){

          const description = document.querySelector('.significado.textonovo');

          const text = [ ...description.children ].map(({ innerHTML}) => innerHTML);

          return text;

      });

      return results;

  }

}

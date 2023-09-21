import { Injectable } from '@nestjs/common';
import { PuppeteerService } from 'src/puppeteer/puppeteer-service';
import { HTMLElementWithInnerText } from 'src/interfaces/custom-html-element';
import { NotFoundException } from '@nestjs/common/exceptions';

@Injectable()
export class DictionaryService {

  constructor(private readonly puppeteerService: PuppeteerService){}

  async searchWord(wordSearch: string) {

      const page = await this.puppeteerService.initializePage({
        headless:'new',
        page:`https://www.dicio.com.br/${wordSearch.toLowerCase()}`
      });

      const results = await page.evaluate(function(){

          const description = document.querySelector('.significado.textonovo');

          if( !description ) return

          const elements = [ ...description.children ];

          const text = elements.map( element => ( element as HTMLElementWithInnerText).innerText );

          const [ wordClass,...rest ] = text;

          return {
            wordClass,
            results:rest
          }

      });

      if( !results ){

          throw new NotFoundException(`Nenhum resultado encontrado para ${wordSearch}`);

      }

      return results

  }

}

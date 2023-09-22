import { Injectable } from '@nestjs/common';
import { PuppeteerService } from 'src/puppeteer/puppeteer-service';
import { HTMLElementWithInnerText } from 'src/interfaces/custom-html-element';
import { NotFoundException } from '@nestjs/common/exceptions';

@Injectable()
export class DictionaryService {

  constructor(private readonly puppeteerService: PuppeteerService){}

  async searchWord(wordSearch: string) {

      const page = await this.puppeteerService.initializePage(`https://www.dicio.com.br/${wordSearch.toLowerCase()}`,{
        headless:'new'
      });

      const results = await page.evaluate(function(){

          const descriptionContainer = document.querySelector('.significado.textonovo');

          if( !descriptionContainer ) return

          const synonymsContainer = document.querySelector('.adicional.sinonimos')

          const getInnerTextFromElements = ( element: Element ) => {

            const elementChildrens = [ ...element.children ];

            return elementChildrens.map( element => ( element as HTMLElementWithInnerText).innerText )

          }

          const [ word_class,...rest ] = getInnerTextFromElements(descriptionContainer);

          const synonyms = getInnerTextFromElements(synonymsContainer);

          return {
            word_class,
            results:rest,
            synonyms
          }

      });

      if( !results ){

          throw new NotFoundException(`Nenhum resultado encontrado para ${wordSearch}`);

      }

      return results

  }

}

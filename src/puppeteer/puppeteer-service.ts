import puppeteer from "puppeteer";
import { Injectable } from '@nestjs/common';
import { IPuppeteerConfigs } from "src/interfaces/puppeteer-configs";

@Injectable()
export class PuppeteerService {

    async initialize(options: IPuppeteerConfigs){

        const browser = await puppeteer.launch({
            headless: options.headless
        });
  
        const page = await browser.newPage();
  
        await page.goto(options.page);

        return page;
        
    }

}
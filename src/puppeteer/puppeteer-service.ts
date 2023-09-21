import puppeteer from "puppeteer";
import { Injectable } from '@nestjs/common';
import { PuppeteerLaunchOptions } from "puppeteer";

@Injectable()
export class PuppeteerService {

    async initializePage(currentPage:string,options: PuppeteerLaunchOptions){

        const browser = await puppeteer.launch(options); 
  
        const page = await browser.newPage();
  
        await page.goto(currentPage);

        return page;
        
    }

}
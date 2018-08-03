const puppeteer = require('puppeteer');
const express = require('express');

(async () => {

    const app = express();
    app.use(express.static('./public'));
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    let chain = Promise.resolve();
    
    app.get('/screenshot/:url', (req, res) => {

        chain = chain.then(async () => {

            await page.goto(decodeURIComponent(req.params.url));
            const buffer = await page.screenshot();
            
            res.setHeader('Content-Type', 'image/png');
            res.write(buffer, 'binary');
            res.end();

        });
    
    });
    
    app.listen(43446);

})();

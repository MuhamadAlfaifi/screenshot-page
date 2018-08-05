const puppeteer = require('puppeteer');
const express = require('express');
const fs = require('fs');

(async () => {

    const app = express();
    app.use(express.static('./public'));

    const browser = await puppeteer.launch();

    const page = await browser.newPage();
    let chain = Promise.resolve();
    
    let counter = 0;
    
    app.get('/screenshot/:url', (req, res) => {
        chain = chain.then(async () => {
            // console.log('chain has one more promise callback is', counter);

            let image;

            try {
                await page.goto(decodeURIComponent(req.params.url));
                image = await page.screenshot();
                if (image.length === 0) {
                    // console.log('callback', counter, 'finished with empty screeshot');
                    throw Error('we have an empty image from chrome');
                }
                // console.log('callback', counter, 'finished with successfull screenshot');
            } catch(error) {
                image = fs.readFileSync('./fallback.png', 'binary');
            }
            
            res.setHeader('Content-Type', 'image/png');
            res.write(image, 'binary');
            res.end();
        });

        // counter++;
        console.log('request chained')
    
    });
    
    app.listen(8081);

})();

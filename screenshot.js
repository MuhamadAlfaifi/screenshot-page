const puppeteer = require('puppeteer');
const express = require('express');
const fs = require('fs');

(async () => {

    const app = express();
    app.use(express.static('./public'));

    const browser = await puppeteer.launch();

    const pages = [
        await browser.newPage(), 
        await browser.newPage(), 
        await browser.newPage(), 
        await browser.newPage(),
        await browser.newPage(), 
        await browser.newPage(), 
        await browser.newPage(), 
        await browser.newPage(),
        await browser.newPage(), 
        await browser.newPage(), 
        await browser.newPage(), 
        await browser.newPage(),
        await browser.newPage(), 
        await browser.newPage(),
        await browser.newPage(), 
        await browser.newPage(),
        await browser.newPage(),
        await browser.newPage(),
        await browser.newPage(),
        await browser.newPage(),
        await browser.newPage(),
        await browser.newPage(),
        await browser.newPage(),
        await browser.newPage(),
        await browser.newPage(),
        await browser.newPage(),
        await browser.newPage(),
        await browser.newPage(),
        await browser.newPage(),
        await browser.newPage(),
    ];

    const chains = [
        Promise.resolve(), 
        Promise.resolve(), 
        Promise.resolve(), 
        Promise.resolve(),
        Promise.resolve(), 
        Promise.resolve(), 
        Promise.resolve(), 
        Promise.resolve(),
        Promise.resolve(), 
        Promise.resolve(), 
        Promise.resolve(), 
        Promise.resolve(),
        Promise.resolve(), 
        Promise.resolve(), 
        Promise.resolve(), 
        Promise.resolve(),
        Promise.resolve(),
        Promise.resolve(),
        Promise.resolve(),
        Promise.resolve(),
        Promise.resolve(),
        Promise.resolve(),
        Promise.resolve(),
        Promise.resolve(),
        Promise.resolve(),
        Promise.resolve(),
        Promise.resolve(),
        Promise.resolve(),
        Promise.resolve(),
        Promise.resolve(),
    ];
    
    let counter = -1;
    
    app.get('/screenshot/:url', (req, res) => {

        if (counter === chains.length - 1) {
            console.log('reset');
            counter = 0;
        } else {
            console.log('incremening');
            counter++;
        }
        
        chains[counter] = chains[counter].then(async () => {
            console.log('chain', counter + 1, 'has one more callback');

            let image;

            try {
                await pages[counter].goto(decodeURIComponent(req.params.url));
                image = await pages[counter].screenshot();
                console.log('chain', counter + 1, 'is done with chrome');
                if (image.length === 0) {
                    console.log('there is something wrong', image)
                    throw Error('we have an empty image from chrome');
                }
            } catch(error) {
                image = fs.readFileSync('./fallback.png', 'binary');
            }
            
            res.setHeader('Content-Type', 'image/png');
            res.write(image, 'binary');
            res.end();
        });
    
    });
    
    app.listen(8080);

})();

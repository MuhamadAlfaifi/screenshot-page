const puppeteer = require('puppeteer');
const express = require('express');

const app = express();

// just to serve a demo website 
// that sends 4 requests at the same time to the endpoint below /screenshot/:url
app.use(express.static('./public/'));

app.get('/screenshot/:url', async (req, res) => {
    
    // I am less sure about this line it is important but because every time we are lauching a new browser instance
    // of course I tried launch it once and store at in a global browser variable but without luck! so I put it here instead just for the demo.
    const browser = await puppeteer.launch();
    
    // here is puppeteer doing its work and giving us the screenshot in the buffer variable
    const page = await browser.newPage();
    await page.goto(decodeURIComponent(req.params.url));
    const buffer = await page.screenshot();
    
    // here is node doing its work by sending the response back to the client
    res.setHeader('Content-Type', 'image/png');
    res.write(buffer, 'binary');
    res.end();
    
    // I am less sure about this line because every time we are closing the browser instance
    browser.close();

});

app.listen(43446);
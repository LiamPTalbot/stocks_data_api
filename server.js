// step 1 - define the web scraper

const cheerio = require('cheerio')

let stockTicker = 'pypl'
let type = 'history'

async function scrapeData() {
    try {
        // step a - fetch the page html
        const url = `https://finance.yahoo.com/quote/${stockTicker}/${type}?p=${stockTicker}`
        const res = await fetch(url)
        const html = await res.text()

        const $ = cheerio.load(html)
        const price_history = getPrices($)
        console.log(price_history)
    } catch (err) {
        console.log(err.message)
    }
}

function getPrices(cher) {
    const prices = cher('td:nth-child(6)').get().map((current_value) => {
        return cher(current_value).text()
    })
    return prices
}

scrapeData()

// step 2 - initialize server that serves up an html file that the user can play with

// step 3 - define api endpoints to access stock data (and call webscraper)

import fetch from "node-fetch"; 

const symbol = "IOC.NS";

const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}`;

async function getStockPrice() {
  try {
    const response = await fetch(url);
    const data = await response.json();

    const result = data.chart.result[0];
    const price = result.meta.regularMarketPrice;
    const currency = result.meta.currency;

    console.log(`${symbol} Current Price: ${price} ${currency}`);
  } catch (error) {
    console.error("Error fetching stock price:", error.message);
  }
}

getStockPrice();

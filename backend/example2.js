import YahooFinance from "yahoo-finance2";
 const yahooFinance = new YahooFinance();

async function getStockData() {
  const symbol = "IOC.NS"; 
  const result = await yahooFinance.quote(symbol);

  console.log({
    symbol: result.symbol,
    name: result.shortName,
    currency:result.currency,
    exchange: result.fullExchangeName,
    price: result.regularMarketPrice,
    marketCap: result.marketCap,
    peRatio: result.trailingPE,
    Latest_earning : result.epsTrailingTwelveMonths,
  });
}

getStockData();

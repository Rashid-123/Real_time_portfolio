import YahooFinance from "yahoo-finance2";
import {Stock} from "../models/Stock.js";
import {IStock, IMarketdata, ICalculatedStock ,  ISectorGroup, IPortfolioResponse} from "../types/portfolio_types.js";

//----------- Real time data from yahoofinance
const fetchMarketData = async( exchangeCode: string): Promise <IMarketdata | null>=> {
    try {
        const symbol = `${exchangeCode}.NS`;
        const yahooFinance = new YahooFinance();
        const quote = await yahooFinance.quote(symbol);

        return {
            cmp: quote.regularMarketPrice || 0,
            peRatio: quote.trailingPE || null,
            latestEarnings: quote.epsTrailingTwelveMonths || null
        }
    } catch (error) {
        console.log(`Failed to fetch data from ${exchangeCode} ,` , error);
        return null ;
    }
}

// ------- Extra parametes calculation 
const calculateStock = (stock : IStock , marketData: IMarketdata , totalInvestment: number): ICalculatedStock => {
   const investment = stock.purchasePrice * stock.qty;
   const presentValue = marketData.cmp * stock.qty;
   const gainLoss = presentValue- investment;

   return {
        _id:stock._id?.toString(),
        name: stock.name,
        purchasePrice: stock.purchasePrice,
        qty:stock.qty,
        exchangeCode: stock.exchangeCode,
        sector: stock.sector,
        exchange: stock.exchange,
        investment,
        cmp: marketData.cmp,
        presentValue,
        gainLoss,
        gainLossPercent: (gainLoss/investment) * 100,
        portfolioPercent: (investment/totalInvestment) * 100,
        peRation: marketData.peRatio,
        latestEarnings: marketData.latestEarnings
   };

};

// ------ Sector wise calculation
const calculatedSectorSummary = (stocks: ICalculatedStock[], totalInvestment: number) => {
    const totalInv = stocks.reduce((sum , s) => sum + s.investment , 0);
    const totalPresent = stocks.reduce((sum , s) => sum + s.presentValue, 0);
    const totalGain = totalPresent - totalInv;

    return {
        totalInvestment : totalInv,
        totalPresentValue : totalPresent,
        totalGainLoss : totalGain,
        gainLossPercent: (totalGain / totalInv) * 100,
        portfolioPercent : (totalInv/totalInvestment) * 100
    }
}

export const getPortfolioData = async (): Promise<IPortfolioResponse> => {

    const stocks: IStock[] = await Stock.find({});

    const totalInvestment = stocks.reduce((sum, stock) => 
        sum + (stock.purchasePrice * stock.qty), 0
    );

    const marketDataPromises = stocks.map(stock => 
        fetchMarketData(stock.exchangeCode)
    );
    
    const marketDataResults = await Promise.allSettled(marketDataPromises);

     console.log(marketDataResults);
         
    // Combining stocks with their market data
    const calculatedStocks: ICalculatedStock[] = [];

    stocks.forEach((stock, index) => {
        const result = marketDataResults[index];
        
        if (result.status === 'fulfilled' && result.value) {
            const calculatedStock = calculateStock(stock, result.value, totalInvestment);
            calculatedStocks.push(calculatedStock);
        } else {
            console.log(`no market data found for  ${stock.exchangeCode}`);
        }
    });

    
    const grouped: {[key: string]: ICalculatedStock[]} = {};

    calculatedStocks.forEach(stock => {
        if(!grouped[stock.sector]){
            grouped[stock.sector] = [];
        }
        grouped[stock.sector].push(stock);
    });

    const sectorGroups: ISectorGroup[] = Object.entries(grouped).map(([sector, stocks]) => ({
        sector,
        stocks,
        sectorSummary: calculatedSectorSummary(stocks, totalInvestment)
    }));

    const totalPresentValue = calculatedStocks.reduce((sum, s) => sum + s.presentValue, 0);
    const totalGainLoss = totalPresentValue - totalInvestment;

    return {
        sectorGroups,
        portfolioSummary: {
            totalInvestment,
            totalPresentValue,
            totalGainLoss,
            gainLosspercent: (totalGainLoss / totalInvestment) * 100
        },
        lastUpdated: new Date().toISOString()
    }
}
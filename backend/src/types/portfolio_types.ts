export interface IStock{
    _id?: string;
    name: string;
    purchasePrice:number;
    qty:number;
    exchangeCode:string;
    sector:string;
    exchange:string;
}

export interface ICalculatedStock extends IStock {
    investment : number;
    cmp: number;
    presentValue: number;
    gainLoss: number;
    gainLossPercent: number;
    portfolioPercent:number;
    peRation: number | null;
    latestEarnings: number | null ;
}

export interface ISectorSummary {
    totalInvestment : number;
    totalPresentValue: number;
    totalGainLoss: number;
    gainLossPercent: number;
    portfolioPercent: number;
}

export interface ISectorGroup {
    sector : string ;
    stocks: ICalculatedStock[];
    sectorSummary: ISectorSummary;
}

export interface IMarketdata{
    cmp: number,
    peRatio: number | null,
    latestEarnings: number | null
}


export interface IPortfolioResponse{
    sectorGroups: ISectorGroup[];
    portfolioSummary:{
        totalInvestment: number;
        totalPresentValue: number;
        totalGainLoss: number;
        gainLosspercent: number;
    };
    lastUpdated: string;
    notFound?: string[];
}
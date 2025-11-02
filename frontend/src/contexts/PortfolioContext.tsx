"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";


export interface Stock {
  _id: string;
  name: string;
  purchasePrice: number;
  qty: number;
  investment: number;
  portfolioPercent: number;
  exchangeCode: string;
  cmp: number;
  presentValue: number;
  gainLoss: number;
  gainLossPercent: number;
  peRation: number;
  latestEarnings: number;
}

export interface SectorSummary {
  totalInvestment: number;
  totalPresentValue: number;
  totalGainLoss: number;
  gainLossPercent: number;
  portfolioPercent: number;
}

export interface SectorGroup {
  sector: string;
  stocks: Stock[];
  sectorSummary: SectorSummary;
}

export interface PortfolioSummary {
  totalInvestment: number;
  totalPresentValue: number;
  totalGainLoss: number;
  gainLosspercent: number;
}

export interface PortfolioData {
  sectorGroups: SectorGroup[];
  portfolioSummary: PortfolioSummary;
  lastUpdated: string;
}

interface PortfolioContextType {
  data: PortfolioData | null;
  loading: boolean;
  error: string | null;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchData() {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/portfolio`);
      if (!res.ok) throw new Error("Failed to fetch portfolio data");
      const newData: PortfolioData = await res.json();
      setData(newData);
      setError(null);
      setLoading(false);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
    // here data is auto-refresh after 15 sec
    const interval = setInterval(fetchData, 15000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <PortfolioContext.Provider value={{ data, loading, error }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
}
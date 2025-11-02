
"use client";

import { usePortfolio } from "@/contexts/PortfolioContext";
import SectorComparisonChart from "@/components/SectorComparisonChart";
import SectorDistributionChart from "@/components/SectorDistributionChart";
import SectorSummaryTable from "@/components/SectorSummaryTable";
export default function AnalyticsPage() {
  const { data, loading, error } = usePortfolio();

  if (error) {
    return <p className="min-h-screen flex flex-col justify-center items-center text-[var(--color-danger)] ">Error : {error}</p>;
  }

  if (loading || !data) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <p className="text-[var(--color-text-secondary)]">Loading analytics...</p>
      </div>
    );
  }

  return (
    <div className="xl:px-15 md:px-10 px-4 py-8">
      
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start md:items-center gap-2">
        <h1 className="text-xl sm:text-2xl text-[var(--color-text-primary)]">
          Portfolio Analytics
        </h1>
        <p className="text-sm sm:text-base text-[var(--color-text-muted)]">
          Last Updated: {new Date(data.lastUpdated).toLocaleTimeString()}
        </p>
      </div>

     
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="p-4 bg-[var(--color-surface)] border border-[var(--color-border)] shadow-[var(--shadow-sm)]">
          <p className="text-sm text-[var(--color-text-secondary)] mb-1">Total Investment</p>
          <p className="text-xl font-semibold text-[var(--color-text-primary)]">
            ₹{data.portfolioSummary.totalInvestment.toLocaleString()}
          </p>
        </div>

        <div className="p-4 bg-[var(--color-surface)] border border-[var(--color-border)] shadow-[var(--shadow-sm)]">
          <p className="text-sm text-[var(--color-text-secondary)] mb-1">Current Value</p>
          <p className="text-xl font-semibold text-[var(--color-text-primary)]">
            ₹{data.portfolioSummary.totalPresentValue.toLocaleString()}
          </p>
        </div>

        <div className="p-4 bg-[var(--color-surface)] border border-[var(--color-border)] shadow-[var(--shadow-sm)]">
          <p className="text-sm text-[var(--color-text-secondary)] mb-1">Total Gain/Loss</p>
          <p className={`text-xl font-semibold ${
            data.portfolioSummary.totalGainLoss >= 0 
              ? "text-[var(--color-success)]" 
              : "text-[var(--color-danger)]"
          }`}>
            ₹{data.portfolioSummary.totalGainLoss.toFixed(2)}
          </p>
        </div>

        <div className="p-4 bg-[var(--color-surface)] border border-[var(--color-border)] shadow-[var(--shadow-sm)]">
          <p className="text-sm text-[var(--color-text-secondary)] mb-1">Return %</p>
          <p className={`text-xl font-semibold ${
            data.portfolioSummary.gainLosspercent >= 0 
              ? "text-[var(--color-success)]" 
              : "text-[var(--color-danger)]"
          }`}>
            {data.portfolioSummary.gainLosspercent.toFixed(2)}%
          </p>
        </div>
      </div>

         {/* Comparison charts  */}
      <div className="space-y-6 mb-8">
        <SectorComparisonChart sectorGroups={data.sectorGroups} />
        <SectorDistributionChart sectorGroups={data.sectorGroups} />
      </div>

      {/* Summary table for all sectors */}
      <SectorSummaryTable sectorGroups={data.sectorGroups} />
    </div>
  );
}
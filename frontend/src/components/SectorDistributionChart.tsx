import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { SectorGroup } from "@/contexts/PortfolioContext";

interface SectorDistributionChartProps {
  sectorGroups: SectorGroup[];
}

export default function SectorDistributionChart({ sectorGroups }: SectorDistributionChartProps) {
  const sectorInvestmentData = sectorGroups.map(group => ({
    sector: group.sector,
    amount: group.sectorSummary.totalInvestment,
    fill: group.sectorSummary.totalGainLoss >= 0 ? "#16a34a" : "#dc2626",
  }));
   
  console.log(sectorInvestmentData);
  return (
    <div className="p-4 bg-[var(--color-surface)] border border-[var(--color-border)] shadow-[var(--shadow-sm)]">
      <h2 className="text-xl font-medium mb-6 text-[var(--color-primary)]">
        Sector-wise Investment Distribution
      </h2>
      
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={sectorInvestmentData}>
          {/* <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" /> */}
          <XAxis dataKey="sector" stroke="var(--color-text-secondary)" tick={{ fontSize: 12 }} />
          <YAxis stroke="var(--color-text-secondary)" tick={{ fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              color: "var(--color-text-primary)"
            }}
          />
          <Bar dataKey="amount" name="Investment Amount"  />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
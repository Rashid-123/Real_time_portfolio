import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { SectorGroup } from "@/contexts/PortfolioContext";

interface SectorComparisonChartProps {
  sectorGroups: SectorGroup[];
}

export default function SectorComparisonChart({ sectorGroups }: SectorComparisonChartProps) {
  const sectorComparisonData = sectorGroups.map(group => ({
    sector: group.sector,
    investment: group.sectorSummary.totalInvestment,
    currentValue: group.sectorSummary.totalPresentValue,
  }));

  return (
    <div className="p-4 bg-[var(--color-surface)] border border-[var(--color-border)] shadow-[var(--shadow-sm)]">
      <h2 className="text-xl font-medium mb-6 text-[var(--color-primary)]">
        Sector Comparison: Investment vs Current Value
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        
         <BarChart data={sectorComparisonData}>
          <XAxis dataKey="sector" stroke="var(--color-text-secondary)" tick={{ fontSize: 12 }} /> 
          <YAxis stroke="var(--color-text-secondary)" tick={{ fontSize: 12 }}/>
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              color: "var(--color-text-primary)"
            }}
          />
          <Legend />
          <Bar dataKey="investment" fill="#0066cc" name="Investment" />
          <Bar dataKey="currentValue" fill="#16a34a" name="Current Value" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
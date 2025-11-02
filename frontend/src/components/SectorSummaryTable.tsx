import { SectorGroup } from "@/contexts/PortfolioContext";

interface SectorSummaryTableProps {
  sectorGroups: SectorGroup[];
}

export default function SectorSummaryTable({ sectorGroups }: SectorSummaryTableProps) {
  return (
    <div className="p-4 bg-[var(--color-surface)] border border-[var(--color-border)] shadow-[var(--shadow-sm)]">
      <h2 className="text-xl font-medium mb-4 text-[var(--color-primary)]">
        Sector-wise Summary
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead className="bg-[var(--color-table-header)]">
            <tr className="border-b border-[var(--color-border)]">
              <th className="py-2 px-3 text-left">Sector</th>
              <th className="py-2 px-3 text-right">Investment</th>
              <th className="py-2 px-3 text-right">Current Value</th>
              <th className="py-2 px-3 text-right">Gain/Loss</th>
              <th className="py-2 px-3 text-right">Return %</th>
            </tr>
          </thead>
          <tbody>
            {sectorGroups.map((group) => (
              <tr 
                key={group.sector} 
                className="border-b border-[var(--color-border)] hover:bg-[var(--color-table-row-hover)]"
              >
                <td className="py-2 px-3">{group.sector}</td>
                <td className="py-2 px-3 text-right">
                  ₹{group.sectorSummary.totalInvestment.toLocaleString()}
                </td>
                <td className="py-2 px-3 text-right">
                  ₹{group.sectorSummary.totalPresentValue.toLocaleString()}
                </td>
                <td className={`py-2 px-3 text-right ${
                  group.sectorSummary.totalGainLoss >= 0 
                    ? "text-[var(--color-success)]" 
                    : "text-[var(--color-danger)]"
                }`}>
                  ₹{group.sectorSummary.totalGainLoss.toFixed(2)}
                </td>
                <td className={`py-2 px-3 text-right ${
                  group.sectorSummary.gainLossPercent >= 0 
                    ? "text-[var(--color-success)]" 
                    : "text-[var(--color-danger)]"
                }`}>
                  {group.sectorSummary.gainLossPercent.toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
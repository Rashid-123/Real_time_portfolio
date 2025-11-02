
"use client";

import { usePortfolio } from "@/contexts/PortfolioContext";
import { COLUMN_WIDTHS } from "@/constants/columnWidths";

export default function SectorWiseTable() {
    const { data, loading, error } = usePortfolio();

    if (error) return <p className="min-h-screen flex flex-col justify-center items-center text-[var(--color-danger)]">Error : {error}</p>;
    if (loading || !data) return <div className="min-h-screen flex flex-col justify-center items-center  ">
        <p className="text-[var(--color-text-secondary)]">Loading portfolio data...</p></div>;

    return (
        <div className="xl:px-15 md:px-10 px-4 py-8">
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <h1 className="text-xl sm:text-2xl text-[var(--color-text-primary)]">
                    Sector-wise Portfolio Overview
                </h1>
                <p className="text-sm sm:text-base text-[var(--color-text-muted)]">
                    Last Updated : {new Date(data.lastUpdated).toLocaleTimeString()}
                </p>
            </div>

            {data.sectorGroups.map((group) => (
                <div key={group.sector} className="mb-8 shadow-[var(--shadow-sm)] p-4 bg-[var(--color-surface)] border border-[var(--color-border)]">
                    <h2 className="text-xl font-medium mb-3 text-[var(--color-primary)]">{group.sector}</h2>

                    <div className="overflow-x-auto">
                        <table className="table-fixed w-full text-sm border-collapse min-w-[1200px]">
                            <thead className="bg-[var(--color-table-header)] font-normal">
                                <tr className="border-b border-[var(--color-border)]">
                                    <th className={`py-2 px-3 text-left sticky left-0 bg-[var(--color-table-header)] z-10 ${COLUMN_WIDTHS.name}`}>
                                        Stock Name
                                    </th>
                                    <th className={`py-2 px-3 text-right ${COLUMN_WIDTHS.purchase}`}>Purchase</th>
                                    <th className={`py-2 px-3 text-right ${COLUMN_WIDTHS.qty}`}>Qty</th>
                                    <th className={`py-2 px-3 text-right ${COLUMN_WIDTHS.investment}`}>Investment</th>
                                    <th className={`py-2 px-3 text-right ${COLUMN_WIDTHS.portfolio}`}>Portfolio%</th>
                                    <th className={`py-2 px-3 text-right ${COLUMN_WIDTHS.exchange}`}>NSE/BSE</th>
                                    <th className={`py-2 px-3 text-right ${COLUMN_WIDTHS.cmp}`}>CMP</th>
                                    <th className={`py-2 px-3 text-right ${COLUMN_WIDTHS.presentValue}`}>Present Value</th>
                                    <th className={`py-2 px-3 text-right ${COLUMN_WIDTHS.gainLoss}`}>Gain/Loss</th>
                                    <th className={`py-2 px-3 text-right ${COLUMN_WIDTHS.gainLossPercent}`}>G/L %</th>
                                    <th className={`py-2 px-3 text-right ${COLUMN_WIDTHS.peRatio}`}>P/E</th>
                                    <th className={`py-2 px-3 text-right ${COLUMN_WIDTHS.earnings}`}>L/E</th>
                                </tr>
                            </thead>

                            <tbody>
                                {group.stocks.map((stock) => (
                                    <tr key={stock._id} className="border-b border-[var(--color-border)] hover:bg-[var(--color-table-row-hover)]">
                                        <td className={`py-2 px-3 sticky left-0 bg-[var(--color-surface)] z-10 ${COLUMN_WIDTHS.name}`}>
                                            {stock.name}
                                        </td>
                                        <td className={`py-2 px-3 text-right ${COLUMN_WIDTHS.purchase}`}>
                                            {stock.purchasePrice.toFixed(2)}
                                        </td>
                                        <td className={`py-2 px-3 text-right ${COLUMN_WIDTHS.qty}`}>{stock.qty}</td>
                                        <td className={`py-2 px-3 text-right ${COLUMN_WIDTHS.investment}`}>
                                            {stock.investment.toFixed(2)}
                                        </td>
                                        <td className={`py-2 px-3 text-right ${COLUMN_WIDTHS.portfolio}`}>
                                            {stock.portfolioPercent.toFixed(2)}
                                        </td>
                                        <td className={`py-2 px-3 text-right ${COLUMN_WIDTHS.exchange}`}>{stock.exchangeCode}</td>
                                        <td className={`py-2 px-3 text-right ${COLUMN_WIDTHS.cmp}`}>{stock.cmp.toFixed(2)}</td>
                                        <td className={`py-2 px-3 text-right ${COLUMN_WIDTHS.presentValue}`}>{stock.presentValue}</td>
                                        <td
                                            className={`py-2 px-3 text-right ${COLUMN_WIDTHS.gainLoss} ${stock.gainLoss >= 0 ? "text-[var(--color-success)]" : "text-[var(--color-danger)]"
                                                }`}
                                        >
                                            {stock.gainLoss.toFixed(2)}
                                        </td>
                                        <td
                                            className={`py-2 px-3 text-right ${COLUMN_WIDTHS.gainLossPercent} ${stock.gainLossPercent >= 0 ? "text-[var(--color-success)]" : "text-[var(--color-danger)]"
                                                }`}
                                        >
                                            {stock.gainLossPercent.toFixed(2)}%
                                        </td>
                                        <td className={`py-2 px-3 text-right ${COLUMN_WIDTHS.peRatio}`}>{stock.peRation}</td>
                                        <td className={`py-2 px-3 text-right ${COLUMN_WIDTHS.earnings}`}>{stock.latestEarnings}</td>
                                    </tr>
                                ))}

                                <tr className="bg-[var(--color-table-header)] font-medium border-t border-[var(--color-border)]">
                                    <td className={`py-2 px-3 text-[var(--color-primary)] sticky left-0 bg-[var(--color-table-header)] z-10 ${COLUMN_WIDTHS.name}`}>
                                        Sector Total:
                                    </td>
                                    <td className={COLUMN_WIDTHS.purchase}></td>
                                    <td className={COLUMN_WIDTHS.qty}></td>
                                    <td className={`py-2 px-3 text-right text-[var(--color-text-primary)] ${COLUMN_WIDTHS.investment}`}>
                                        ₹{group.sectorSummary.totalInvestment.toLocaleString()}
                                    </td>
                                    <td className={COLUMN_WIDTHS.portfolio}></td>
                                    <td className={COLUMN_WIDTHS.exchange}></td>
                                    <td className={COLUMN_WIDTHS.cmp}></td>
                                    <td className={`py-2 px-3 text-right text-[var(--color-text-primary)] ${COLUMN_WIDTHS.presentValue}`}>
                                        ₹{group.sectorSummary.totalPresentValue.toLocaleString()}
                                    </td>
                                    <td
                                        className={`py-2 px-3 text-right ${COLUMN_WIDTHS.gainLoss} ${group.sectorSummary.totalGainLoss >= 0
                                            ? "text-[var(--color-success)]"
                                            : "text-[var(--color-danger)]"
                                            }`}
                                    >
                                        ₹{group.sectorSummary.totalGainLoss.toFixed(2)}
                                    </td>
                                    <td
                                        className={`py-2 px-3 text-right ${COLUMN_WIDTHS.gainLossPercent} ${group.sectorSummary.gainLossPercent >= 0
                                            ? "text-[var(--color-success)]"
                                            : "text-[var(--color-danger)]"
                                            }`}
                                    >
                                        {group.sectorSummary.gainLossPercent.toFixed(2)}%
                                    </td>
                                    <td className={COLUMN_WIDTHS.peRatio}></td>
                                    <td className={COLUMN_WIDTHS.earnings}></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            ))}



        </div>
    );
}
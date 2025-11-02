"use client";

export default function Footer() {
    return (
        <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)] mt-auto">
            <div className="xl:px-15 md:px-10 px-4 py-6">
                <div className="flex flex-col items-center justify-between gap-4 text-sm text-[var(--color-text-secondary)]">

                    <p className="text-center">
                        All real-time data — CMP , P/E Ratio , and L/E (Latest Earnings) — is fetched from{" "}
                        <span className="font-medium text-[var(--color-text-primary)]">NSE</span>.
                    </p>
                    <p>
                        © {new Date().getFullYear()} Portfolio Tracker. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
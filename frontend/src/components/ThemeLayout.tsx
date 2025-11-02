"use client";

import { ThemeProvider } from "../contexts/ThemeContext";
import { PortfolioProvider } from "../contexts/PortfolioContext";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ReactNode } from "react";

export default function ThemeLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <PortfolioProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1 mb-6">
            {children}
          </main>
          <Footer />
        </div>
      </PortfolioProvider>
    </ThemeProvider>
  );
}
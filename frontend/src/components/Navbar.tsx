
"use client";

import { useTheme } from "../contexts/ThemeContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun } from "lucide-react";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();


  return (
    <>
      <nav className="sticky top-0 z-50 bg-[var(--color-surface)] border-b border-[var(--color-border)] shadow-sm">
        <div className="xl:px-15 md:px-10 px-4 py-4 flex items-center justify-between">
         

          <Link href="/" className="text-xl font-semibold text-[var(--color-primary)] curson-pointer">
            Portfolio Tracker
          </Link>

          <div className="flex items-center justify-between gap-3 md:gap-8">
            <Link
              href="/dashboard"
              className={` px-3 py-2 rounded-lg text-sm border border-[var(--color-border)] ${pathname === '/analytics'
                ? 'text-[var(--color-primary)] bg-[var(--color-hover)] font-medium'
                : 'text-[var(--color-text-secondary)]'
                } hover:text-[var(--color-primary)] hover:bg-[var(--color-hover)]`}
            >
              Dashboard
            </Link>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-[var(--color-background)] border border-[var(--color-border)] hover:bg-[var(--color-hover)] transition-colors cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon size={21} className="text-[var(--color-text-primary)]" />
              ) : (
                <Sun size={21} className="text-[var(--color-text-primary)]" />
              )}
            </button>

          </div>


        </div>
      </nav>



    </>
  );
}
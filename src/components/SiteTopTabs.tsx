"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabBase =
  "inline-flex min-h-11 flex-1 items-center justify-center rounded-xl border px-4 py-2.5 text-sm font-bold transition sm:flex-none sm:px-6";

export function SiteTopTabs() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isSupplementsPage = pathname === "/mukammalat";

  return (
    <header
      className="sticky top-0 z-50 border-b border-white/[0.08] bg-black/80 backdrop-blur-md supports-[backdrop-filter]:bg-black/65"
      dir="rtl"
    >
      <div className="shark-container py-3">
        <nav
          className="flex flex-wrap items-stretch justify-center gap-2 sm:justify-start"
          aria-label="التنقل الرئيسي"
        >
          <Link
            href="/"
            className={[
              tabBase,
              isHome
                ? "border-brand/55 bg-brand/15 text-white shadow-[0_0_24px_rgba(30,111,217,0.2)]"
                : "border-white/10 bg-white/[0.04] text-white/75 hover:border-brand/35 hover:bg-brand/10 hover:text-white",
            ].join(" ")}
            aria-current={isHome ? "page" : undefined}
          >
            الصفحة الرئيسية
          </Link>
          <Link
            href="/mukammalat"
            className={[
              tabBase,
              isSupplementsPage
                ? "border-brand/55 bg-brand/15 text-white shadow-[0_0_24px_rgba(30,111,217,0.2)]"
                : "border-white/10 bg-white/[0.04] text-white/75 hover:border-brand/35 hover:bg-brand/10 hover:text-white",
            ].join(" ")}
            aria-current={isSupplementsPage ? "page" : undefined}
          >
            المكملات الغذائية
          </Link>
        </nav>
      </div>
    </header>
  );
}

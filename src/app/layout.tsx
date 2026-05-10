import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { SiteTopTabs } from "@/components/SiteTopTabs";

const brandSans = Tajawal({
  variable: "--font-brand",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700", "800"],
});

export const metadata: Metadata = {
  title: `${site.name} • ${site.tagline}`,
  description:
    "SHARK TEAM — القمة في التغذية والتدريب. فريق عراقي: أطباء ومدربون، استشارات علمية ومكملات أصلية.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${brandSans.variable} h-full overflow-x-clip font-sans antialiased`}
    >
      <body className="shark-theme flex min-h-full min-w-0 flex-col overflow-x-clip bg-black pb-[max(0.5rem,env(safe-area-inset-bottom))] text-white font-sans">
        <SiteTopTabs />
        {children}
      </body>
    </html>
  );
}

"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";
import BottomNav from "@/components/BottomNav";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const SHOW_NAV_ROUTES = [
  "/profile",
  "/workouts",
  "/recovery",
  "/settings",
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const showBottomNav = SHOW_NAV_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );

  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans bg-black text-white`}>
        <div className="min-h-screen pb-20">
          {children}
        </div>

        {showBottomNav && <BottomNav />}
      </body>
    </html>
  );
}

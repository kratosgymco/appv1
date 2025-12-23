import "./globals.css";
import { Inter } from "next/font/google";
import BottomNav from "@/components/BottomNav";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Kratos",
  description: "Kratos Training Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans bg-black text-white`}>
        {/* Page content */}
        <div className="flex min-h-screen w-full flex-col items-center pb-20">
          <main className="w-full max-w-md px-6">
            {children}
          </main>
        </div>

        {/* Bottom navigation */}
        <BottomNav />
      </body>
    </html>
  );
}

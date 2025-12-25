"use client";

import { ReactNode } from "react";
import BottomNav from "@/components/BottomNav";

export default function AppLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-1">{children}</main>
            <BottomNav />
        </div>
    );
}
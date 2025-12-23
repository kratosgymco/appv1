"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Dumbbell, Settings, Moon } from "lucide-react";


const tabs = [
  { href: "/profile", label: "Profile", icon: User },
  { href: "/workouts", label: "Workouts", icon: Dumbbell },
  { href: "/recovery", label: "Recovery", icon: Moon },
  { href: "/settings", label: "Settings", icon: Settings },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-zinc-800 bg-black">
      <div className="mx-auto flex max-w-md justify-between px-6 py-3">
        {tabs.map((tab) => {
          const active = pathname === tab.href;
          const Icon = tab.icon;

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className="flex flex-1 flex-col items-center gap-1"
            >
              {/* ICON CONTAINER (ALWAYS PRESENT) */}
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl transition
                  ${active ? "bg-red-700" : "bg-transparent"}`}
              >
                <Icon
                  className={`h-5 w-5 transition
                    ${active ? "text-white" : "text-zinc-400"}`}
                />
              </div>

              {/* LABEL (NO MOVEMENT) */}
              <span
                className={`text-xs font-medium transition
                  ${active ? "text-red-500" : "text-zinc-400"}`}
              >
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Dumbbell, HeartPulse, Settings } from "lucide-react";

const tabs = [
  { href: "/profile", label: "Profile", icon: User },
  { href: "/workouts", label: "Workouts", icon: Dumbbell },
  { href: "/recovery", label: "Recovery", icon: HeartPulse },
  { href: "/settings", label: "Settings", icon: Settings },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-black border-t border-zinc-800">
      <div className="mx-auto max-w-md flex justify-between px-6 py-3">
        {tabs.map((tab) => {
          const active = pathname === tab.href;
          const Icon = tab.icon;

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className="flex flex-col items-center gap-1 flex-1"
            >
              <Icon
                className={`h-5 w-5 ${
                  active ? "text-red-500" : "text-zinc-400"
                }`}
              />
              <span
                className={`text-xs font-medium ${
                  active ? "text-white" : "text-zinc-400"
                }`}
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

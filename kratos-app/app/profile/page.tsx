"use client";
import { useState } from "react";


import { format } from "date-fns";
import { Trophy, Dumbbell, Flame, Clock, TrendingUp } from "lucide-react";

function StatCard({
    label,
    value,
    Icon,
}: {
    label: string;
    value: string;
    Icon: React.ComponentType<{ className?: string }>;
}) {
    return (
        <div className="rounded-2xl bg-red-800 border border-red-900 shadow-lg p-4">
            <div className="flex items-center gap-3">
                <div className="rounded-xl bg-zinc-950 p-2">
                    <Icon className="h-5 w-5 text-white" />
                </div>
                <div>
                    <p className="text-xs text-red-100">{label}</p>
                    <p className="text-2xl font-bold text-white">{value}</p>
                </div>
            </div>
        </div>
    );
}

function ScheduleTile({
    dateLabel,
    dayLabel,
    value,
    active,
}: {
    dateLabel: string;
    dayLabel: string;
    value: string;
    active: boolean;
}) {
    return (
        <div className="flex flex-col items-center gap-1">
            <p
                className={`text-sm font-semibold text-white ${active ? "drop-shadow-[0_0_8px_rgb(234_179_8)]" : ""
                    }`}
            >
                {dateLabel}
            </p>
            <p
                className={`text-xs font-medium text-zinc-400 ${active ? "drop-shadow-[0_0_6px_rgb(234_179_8)]" : ""
                    }`}
            >
                {dayLabel}
            </p>

            <div
                className={`w-full aspect-square rounded-xl flex items-center justify-center ${active
                    ? "bg-red-600 border-2 border-yellow-500"
                    : "bg-red-800 border border-red-900"
                    }`}
            >
                <p className={`text-[11px] font-bold text-white px-1 text-center leading-tight ${active ? "scale-110" : ""}`}>
                    {value}
                </p>
            </div>
        </div>
    );
}

function PRCard({
    name,
    current,
    prediction,
    weeks,
}: {
    name: string;
    current: string;
    prediction: string;
    weeks: number;
}) {
    return (
        <div className="rounded-2xl bg-red-800 border border-red-900 shadow-md p-4">
            <div className="flex items-center justify-center mb-3">
                <div className="p-3 bg-zinc-950 rounded-xl">
                    <Dumbbell className="w-8 h-8 text-white" />
                </div>
            </div>

            <p className="text-sm text-white font-semibold text-center mb-2">{name}</p>
            <p className="text-2xl font-black text-white text-center mb-3">{current}</p>

            <div className="pt-3 border-t border-white/20">
                <p className="text-[10px] font-bold text-yellow-300 uppercase tracking-wider text-center mb-2">
                    AI Prediction
                </p>
                <p className="text-xs text-white text-center mb-1">On track for:</p>
                <p className="text-lg font-bold text-white text-center">{prediction}</p>
                <p className="text-xs text-white text-center mt-1">in {weeks} weeks!</p>
            </div>
        </div>
    );
}

export default function ProfilePage() {
    // MOCK DATA (we’ll wire Base44 later)
    const user = {
        full_name: "Evan R",
        email: "evanroth12@gmail.com",
    };

    const stats = [
        { label: "Target Weight", value: "185 lbs", icon: TrendingUp },
        { label: "This Week", value: "0 Workouts", icon: Dumbbell },
        { label: "Calories Burned", value: "0", icon: Flame },
        { label: "Total Active Time", value: "0 min", icon: Clock },
    ];

    const defaultSchedule = ["Push", "Pull", "Legs", "Rest", "Push", "Pull", "Legs"];
    const [schedule, setSchedule] = useState(defaultSchedule);
    const [previousSchedule, setPreviousSchedule] = useState<string[] | null>(null);

    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const today = new Date();
    const todayIndex = today.getDay();

    // build dates for this week (Sun..Sat)
    const start = new Date(today);
    start.setDate(today.getDate() - today.getDay());

    const prs = [
        { name: "Bench", current: "285 lbs", prediction: "290 lbs", weeks: 2 },
        { name: "Squat", current: "315 lbs", prediction: "405 lbs", weeks: 3 },
        { name: "Deadlift", current: "405 lbs", prediction: "495 lbs", weeks: 6 },
    ];

    return (
        <div className="min-h-screen bg-black text-white">
            <div className="mx-auto w-full max-w-md px-6 py-8 space-y-6">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <div className="h-20 w-20 rounded-full border-2 border-red-600 shadow-xl shadow-red-600/20 bg-zinc-900 flex items-center justify-center text-2xl font-bold">
                        ER
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold">{user.full_name}</h1>
                        <p className="text-zinc-400">{user.email}</p>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3">
                    {stats.map((s) => (
                        <StatCard key={s.label} label={s.label} value={s.value} Icon={s.icon} />
                    ))}
                </div>

                {/* Workout Schedule */}
                <div className="space-y-4">
                    <h2 className="text-xl font-bold">Your Workout Schedule</h2>

                    <div className="rounded-2xl bg-zinc-900/80 backdrop-blur border border-zinc-800 shadow-md p-4">
                        <div className="grid grid-cols-7 gap-2">
                            {dayNames.map((day, idx) => {
                                const d = new Date(start);
                                d.setDate(start.getDate() + idx);
                                const dateLabel = format(d, "M/d");
                                return (
                                    <ScheduleTile
                                        key={day}
                                        dateLabel={dateLabel}
                                        dayLabel={day}
                                        value={schedule[idx]}
                                        active={idx === todayIndex}
                                    />
                                );
                            })}
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={() => {
                                // Save snapshot for undo
                                setPreviousSchedule([...schedule]);

                                // Insert Rest today and shift future days
                                const next = [
                                    ...schedule.slice(0, todayIndex),
                                    "Rest",
                                    ...schedule.slice(todayIndex, schedule.length - 1),
                                ];

                                setSchedule(next);
                            }}
                            disabled={previousSchedule !== null}
                            className="flex-1 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 py-3 font-semibold disabled:opacity-50"
                        >
                            Make Today Rest Day
                        </button>

                        {previousSchedule && (
                            <button
                                onClick={() => {
                                    setSchedule(previousSchedule);
                                    setPreviousSchedule(null);
                                }}
                                className="flex-1 rounded-xl bg-red-600 hover:bg-red-700 py-3 font-semibold"
                            >
                                Undo
                            </button>
                        )}
                    </div>


                </div>

                {/* PRs */}
                <div className="space-y-4">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Trophy className="w-5 h-5 text-yellow-500" />
                        Personal Records
                    </h2>

                    <div className="grid grid-cols-3 gap-3">
                        {prs.map((p) => (
                            <PRCard
                                key={p.name}
                                name={p.name}
                                current={p.current}
                                prediction={p.prediction}
                                weeks={p.weeks}
                            />
                        ))}
                    </div>
                </div>

                {/* Machine Analytics placeholder (next piece) */}
                <div className="space-y-4">
                    <h2 className="text-xl font-bold">Machine Analytics</h2>
                    <div className="rounded-2xl bg-zinc-900/80 border border-zinc-800 p-6">
                        <p className="text-zinc-400 text-sm">Chart goes here (next step).</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

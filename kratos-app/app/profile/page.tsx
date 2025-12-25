"use client";
import { useState } from "react";
import { format } from "date-fns";
import {
    Trophy,
    Dumbbell,
    Flame,
    Clock,
    TrendingUp,
    Target
} from "lucide-react";


function StatCard({
    label,
    value,
    Icon,
    compact = false,
}: {
    label: string;
    value: string;
    Icon: React.ComponentType<{ className?: string }>;
    compact?: boolean;
}) {

    return (
        <div className="h-20 rounded-2xl bg-red-800 border border-red-900 shadow-lg px-4 py-3 flex flex-col justify-center">

            {/* Title */}
            <p className="text-sm text-red-100 text-center whitespace-nowrap mb-1">
                {label}
            </p>

            {/* Locked grid for alignment */}
            <div className="grid grid-cols-[40px_1fr] items-center justify-center gap-3">

                {/* ICON — fixed column */}
                <div className="flex justify-center">
                    <div className="rounded-xl bg-zinc-950 p-2">
                        <Icon className="h-5 w-5 text-white" />
                    </div>
                </div>

                {/* VALUE — fixed start line */}
                <p
                    className={`font-bold text-white whitespace-nowrap ${compact ? "text-lg tracking-tight" : "text-2xl"
                        }`}
                >
                    {value}
                </p>

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

function BenchIcon({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 64 64"
            className={className}
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            {/* Uprights */}
            <line x1="10" y1="8" x2="10" y2="56" />
            <line x1="54" y1="8" x2="54" y2="56" />

            {/* Barbell */}
            <line x1="14" y1="16" x2="50" y2="16" />

            {/* Bench */}
            <rect x="18" y="36" width="28" height="6" rx="2" />
            <line x1="22" y1="42" x2="22" y2="52" />
            <line x1="42" y1="42" x2="42" y2="52" />
        </svg>
    );
}

function SquatIcon({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 64 64"
            className={className}
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            {/* Rack */}
            <line x1="12" y1="6" x2="12" y2="58" />
            <line x1="52" y1="6" x2="52" y2="58" />
            <line x1="12" y1="16" x2="52" y2="16" />

            {/* Bar */}
            <line x1="18" y1="22" x2="46" y2="22" />

            {/* Lifter */}
            <circle cx="32" cy="28" r="4" />
            <line x1="32" y1="32" x2="32" y2="44" />
            <line x1="26" y1="38" x2="32" y2="44" />
            <line x1="38" y1="38" x2="32" y2="44" />
        </svg>
    );
}


function BarbellIcon({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 64 64"
            className={className}
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            {/* Bar */}
            <line x1="8" y1="32" x2="56" y2="32" />

            {/* Inner plates */}
            <rect x="16" y="22" width="6" height="20" rx="2" />
            <rect x="42" y="22" width="6" height="20" rx="2" />

            {/* Outer plates */}
            <rect x="8" y="18" width="6" height="28" rx="2" />
            <rect x="50" y="18" width="6" height="28" rx="2" />
        </svg>
    );
}






function PRCard({
    name,
    current,
    prediction,
    weeks,
    Icon,
}: {
    name: string;
    current: string;
    prediction: string;
    weeks: number;
    Icon: React.ComponentType<{ className?: string }>;
}) {

    return (
        <div className="rounded-2xl bg-red-800 border border-red-900 shadow-md p-4">
            <div className="flex items-center justify-center mb-3">
                <div className="p-3 bg-zinc-950 rounded-xl">
                    <Icon className="w-8 h-8 text-white" />
                </div>
            </div>

            <p className="text-lg text-white font-semibold text-center mb-2">{name}</p>
            <p className="text-2xl font-black text-white text-center mb-3">{current}</p>

            <div className="pt-3 border-t border-white/75">
                <p className="text-[10px] font-bold text-yellow-300 uppercase tracking-wider text-center whitespace-nowrap mb-2">
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

    const ALL_OBJECTIVES = [
        {
            id: "workoutsWeek",
            label: "This week’s workouts",
            value: "0 wkts",
            icon: Dumbbell,
        },
        {
            id: "calories",
            label: "Calories burned",
            value: "0 cals",
            icon: Flame,
        },
        {
            id: "activeTime",
            label: "Total active time",
            value: "0 mins",
            icon: Clock,
        },
        {
            id: "sleep",
            label: "Average sleep",
            value: "7.2 hrs",
            icon: Clock,
        },
        {
            id: "currentGoal",
            label: "Current goal",
            value: "Hypertrophy",
            icon: TrendingUp,
        },
        {
            id: "targetWeight",
            label: "Target weight",
            value: "185 lbs",
            icon: Target,
        },
    ];



    const [selectedObjectives, setSelectedObjectives] = useState<string[]>([
        "targetWeight",
        "workoutsWeek",
        "calories",
        "activeTime",
    ]);

    const [showObjectivePicker, setShowObjectivePicker] = useState(false);

    const visibleObjectives = ALL_OBJECTIVES.filter((o) =>
        selectedObjectives.includes(o.id)
    );


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
        {
            name: "Bench",
            current: "285 lbs",
            prediction: "290 lbs",
            weeks: 2,
            icon: BenchIcon,
        },
        {
            name: "Squat",
            current: "315 lbs",
            prediction: "405 lbs",
            weeks: 3,
            icon: SquatIcon,
        },
        {
            name: "Deadlift",
            current: "405 lbs",
            prediction: "495 lbs",
            weeks: 6,
            icon: BarbellIcon,
        },
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
                {/* Stats + Change Objectives */}
                <div className="space-y-1">
                    <div className="grid grid-cols-2 gap-3">
                        {visibleObjectives.map((s, idx) => {
                            const isLastSingle =
                                visibleObjectives.length % 2 === 1 &&
                                idx === visibleObjectives.length - 1;

                            return (
                                <div
                                    key={s.id}
                                    className={isLastSingle ? "col-span-2 flex justify-center" : ""}
                                >
                                    <StatCard
                                        label={s.label}
                                        value={s.value}
                                        Icon={s.icon}
                                        compact={!isLastSingle}
                                    />

                                </div>
                            );
                        })}
                    </div>

                    <button
                        onClick={() => setShowObjectivePicker(true)}
                        className="text-sm text-red-500 hover:text-red-600"
                    >
                        Change objectives
                    </button>
                </div>




                {/* Workout Schedule */}
                <div className="space-y-3">
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
                            className="flex-1 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 py-2 font-semibold disabled:opacity-50"
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
                        <Trophy className="w-5 h-5 text-yellow-500" />
                    </h2>


                    <div className="grid grid-cols-3 gap-3">
                        {prs.map((p) => (
                            <PRCard
                                key={p.name}
                                name={p.name}
                                current={p.current}
                                prediction={p.prediction}
                                weeks={p.weeks}
                                Icon={p.icon}
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
            {showObjectivePicker && (
                <div className="fixed inset-0 z-50 bg-black/70 flex items-end">
                    {/* center to same width as page */}
                    <div className="w-full flex justify-center px-6">
                        {/* actual sheet */}
                        <div className="w-full max-w-md rounded-t-2xl bg-black border border-zinc-800">
                            {/* header */}
                            <div className="relative px-6 pt-6 pb-4">
                                <h2 className="text-lg font-semibold text-center">Choose objectives</h2>
                                <button
                                    onClick={() => setShowObjectivePicker(false)}
                                    className="absolute right-6 top-6 text-sm text-zinc-400 hover:text-white"
                                >
                                    Done
                                </button>
                            </div>

                            {/* scrollable content */}
                            <div className="max-h-[70vh] overflow-y-auto px-6 pb-28">
                                <div className="grid grid-cols-2 gap-3">
                                    {ALL_OBJECTIVES.map((obj) => {
                                        const selected = selectedObjectives.includes(obj.id);
                                        const disabled = !selected && selectedObjectives.length >= 4;

                                        return (
                                            <button
                                                key={obj.id}
                                                disabled={disabled}
                                                onClick={() => {
                                                    if (disabled) return;
                                                    setSelectedObjectives((prev) =>
                                                        selected ? prev.filter((id) => id !== obj.id) : [...prev, obj.id]
                                                    );
                                                }}
                                                className={`w-full rounded-2xl border px-4 py-4 text-sm font-semibold transition
                        ${selected
                                                        ? "bg-red-600 border-red-700 text-white"
                                                        : disabled
                                                            ? "bg-zinc-800 border-zinc-700 text-zinc-500 opacity-75 cursor-not-allowed"
                                                            : "bg-zinc-900 border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                                                    }`}


                                            >
                                                <span className="block text-center whitespace-nowrap">{obj.label}</span>
                                            </button>
                                        );
                                    })}
                                </div>

                                {/* extra space so it doesn’t get covered by BottomNav */}
                                <div className="h-20" />
                            </div>
                        </div>
                    </div>
                </div>
            )}



        </div>
    );
}

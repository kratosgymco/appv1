"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

type Props = {
    onNext: () => void;
};

const schema = z.object({
    age: z.string().min(1),
    sex: z.string(),
    heightFt: z.string(),
    heightIn: z.string(),
    weight: z.string(),
    experience: z.string(),
    activityLevel: z.string(),
    bodyFat: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const fieldClass =
    "w-full h-12 rounded-xl border border-zinc-200 bg-white px-4 pr-16 text-black placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-600 appearance-none";

export default function AboutYouStep({ onNext }: Props) {
    const router = useRouter();
    const { register, handleSubmit, watch } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const [units, setUnits] = useState<"us" | "metric">("us");
    const [showBodyFatHelp, setShowBodyFatHelp] = useState(false);
    const [showBodyFatInfo, setShowBodyFatInfo] = useState(false);
    const [showBodyFatImages, setShowBodyFatImages] = useState(false);


    function onSubmit(data: FormData) {
        console.log("ABOUT YOU:", { ...data, units });
        router.push("/profile");
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-12 mx-auto max-w-xs space-y-6"
        >
            <h1 className="text-3xl font-semibold text-center whitespace-nowrap">
                Tell me about yourself!
            </h1>

            <p className="text-md text-zinc-300 text-center">
                This helps personalize your training.
            </p>

            {/* UNITS SLIDER */}
            <div className="flex justify-center">
                <div className="flex w-56 rounded-full border border-zinc-200 bg-white p-1">
                    <button
                        type="button"
                        onClick={() => setUnits("us")}
                        className={`w-1/2 rounded-full py-1 text-sm font-semibold transition ${units === "us" ? "bg-red-600 text-white" : "text-zinc-400"
                            }`}
                    >
                        US
                    </button>
                    <button
                        type="button"
                        onClick={() => setUnits("metric")}
                        className={`w-1/2 rounded-full py-1 text-sm font-semibold transition ${units === "metric" ? "bg-red-600 text-white" : "text-zinc-400"
                            }`}
                    >
                        Metric
                    </button>
                </div>
            </div>

            {/* AGE + SEX */}
            <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                    <input
                        type="number"
                        min={1}
                        step={1}
                        placeholder="Age"
                        {...register("age")}
                        onKeyDown={(e) => {
                            if (["-", "e", "E", "+"].includes(e.key)) {
                                e.preventDefault();
                            }
                        }}
                        onInput={(e) => {
                            const el = e.target as HTMLInputElement;
                            if (el.value === "") return;
                            if (Number(el.value) < 1) el.value = "1";
                        }}
                        className="h-12 w-full rounded-xl border border-zinc-200 bg-white px-4 pr-12 text-black placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-600"
                    />


                    {/* SAME POSITION AS BEFORE */}
                    <span
                        className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-md text-zinc-400 transition-all ${watch("age") ? "right-3" : "left-12.5"
                            }`}
                    >
                        (years)
                    </span>

                </div>

                <div className="relative">
                    <select
                        {...register("sex")}
                        defaultValue=""
                        className={`w-full h-12 rounded-xl border border-zinc-200 bg-white px-4 pr-10 appearance-none focus:outline-none focus:ring-2 focus:ring-red-600 ${watch("sex") ? "text-black" : "text-zinc-400"
                            }`}
                    >
                        <option value="" disabled hidden>
                            Sex
                        </option>
                        <option className="text-black">Male</option>
                        <option className="text-black">Female</option>
                        <option className="text-black">Other</option>
                        <option className="text-black">Prefer not to say</option>
                    </select>

                    {watch("sex") && (
                        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-md text-zinc-400">
                            (sex)
                        </span>
                    )}
                </div>
            </div>

            {/* HEIGHT + WEIGHT */}
            <div className="grid grid-cols-2 gap-3">
                <div className="grid grid-cols-2 gap-3">
                    {/* HEIGHT FT */}
                    <div className="relative">
                        <input
                            type="number"
                            min={1}
                            max={8}
                            step={1}
                            inputMode="numeric"
                            placeholder="Ht"
                            {...register("heightFt")}
                            onKeyDown={(e) => {
                                if (["-", "e", "E", "+"].includes(e.key)) {
                                    e.preventDefault();
                                }
                            }}
                            onInput={(e) => {
                                const el = e.target as HTMLInputElement;
                                if (el.value === "") return;
                                const v = Number(el.value);
                                if (v < 1) el.value = "1";
                                if (v > 8) el.value = "8";
                            }}
                            className="h-12 w-full rounded-xl border border-zinc-200 bg-white px-3 pr-10 text-black placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-600 appearance-none"
                        />


                        <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-md text-zinc-400">
                            (ft)
                        </span>
                    </div>

                    {/* HEIGHT IN */}
                    <div className="relative">
                        <input
                            type="number"
                            min={0}
                            max={11}
                            step={1}
                            inputMode="numeric"
                            placeholder="Ht"
                            {...register("heightIn")}
                            onKeyDown={(e) => {
                                if (["-", "e", "E", "+"].includes(e.key)) {
                                    e.preventDefault();
                                }
                            }}
                            onInput={(e) => {
                                const el = e.target as HTMLInputElement;
                                if (el.value === "") return;
                                const v = Number(el.value);
                                if (v < 0) el.value = "0";
                                if (v > 11) el.value = "11";
                            }}
                            className="h-12 w-full rounded-xl border border-zinc-200 bg-white px-3 pr-10 text-black placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-600 appearance-none"
                        />


                        <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-md text-zinc-400">
                            (in)
                        </span>
                    </div>
                </div>



                <div className="relative">
                    <input
                        type="number"
                        min={1}
                        {...register("weight")}
                        placeholder="Weight"
                        className={fieldClass}
                    />

                    <span
                        className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-md text-zinc-400 transition-all ${watch("weight") ? "right-3" : "left-18"
                            }`}
                    >
                        {units === "us" ? "(lbs)" : "(kg)"}
                    </span>

                </div>
            </div>

            {/* EXPERIENCE */}
            <select
                {...register("experience")}
                defaultValue=""
                className={`${fieldClass} ${watch("experience") ? "text-black" : "text-zinc-400"
                    }`}
            >
                <option value="" disabled hidden>
                    Training experience
                </option>
                <option className="text-black">Beginner</option>
                <option className="text-black">Intermediate</option>
                <option className="text-black">Advanced</option>
            </select>

            {/* ACTIVITY LEVEL */}
            <select
                {...register("activityLevel")}
                defaultValue=""
                className={`${fieldClass} ${watch("activityLevel") ? "text-black" : "text-zinc-400"
                    }`}
            >
                <option value="" disabled hidden>
                    Activity level
                </option>
                <option className="text-black">Sedentary (little to no exercise)</option>
                <option className="text-black">Lightly active (1–3x / week)</option>
                <option className="text-black">Moderately active (3–5x / week)</option>
                <option className="text-black">Very active (6–7x / week)</option>
                <option className="text-black">Athlete / intense daily training</option>
            </select>

            {/* BODY FAT */}
            <div className="relative">
                <input
                    type="number"
                    min={0}
                    max={60}
                    step={0.1}
                    inputMode="decimal"
                    {...register("bodyFat")}
                    placeholder="Body fat % (optional)"
                    onKeyDown={(e) => {
                        if (["-", "e", "E", "+"].includes(e.key)) {
                            e.preventDefault();
                        }
                    }}
                    onInput={(e) => {
                        const el = e.target as HTMLInputElement;
                        if (el.value === "") return;
                        const v = Number(el.value);
                        if (v < 0) el.value = "0";
                        if (v > 60) el.value = "60";
                    }}
                    className={`${fieldClass} pr-12`}
                />


                {/* ? ICON — CLICK (text popup) */}
                <div
                    onClick={() => {
                        setShowBodyFatInfo((v) => !v);
                        setShowBodyFatImages(false);
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                >
                    <span className="flex h-5 w-5 items-center justify-center rounded-full border border-zinc-400 text-xs font-semibold text-zinc-600">
                        ?
                    </span>
                </div>

                {/* HELP ME — CLICK (image popup) */}
                <span
                    onClick={() => {
                        setShowBodyFatImages((v) => !v);
                        setShowBodyFatInfo(false);
                    }}
                    className="absolute left-1 -bottom-5 cursor-pointer text-xs font-medium text-red-600 hover:underline"
                >
                    help me
                </span>

                {/* TEXT POPUP */}
                {showBodyFatInfo && (
                    <div className="pointer-events-auto absolute left-[50%] top-15 -translate-x-1/2 z-20 w-72 rounded-xl border border-zinc-200 bg-white p-3 text-sm text-zinc-700 shadow-lg">

                        {/* CLOSE */}
                        <span
                            onClick={() => setShowBodyFatInfo(false)}
                            className="absolute right-3 top-1.5 cursor-pointer text-lg font-semibold text-zinc-400 hover:text-zinc-600"
                        >
                            ×
                        </span>

                        <p className="mb-2 font-medium text-black">What is body fat %?</p>

                        <p className="mb-2">
                            Body fat percentage estimates how much of your total body weight comes
                            from fat versus lean mass (muscle, bone, organs).
                        </p>

                        <p className="mb-2">
                            It helps personalize training intensity, recovery needs, and realistic
                            body composition goals.
                        </p>

                        <p className="text-xs text-zinc-500">
                            Estimates don’t need to be exact — trends over time matter more.
                        </p>
                    </div>
                )}


                {/* IMAGE POPUP */}
                {showBodyFatImages && (
                    <div className="pointer-events-auto absolute left-0 top-18 z-30 w-80 rounded-xl border border-zinc-200 bg-white p-3 shadow-lg">
                        <span
                            onClick={() => setShowBodyFatImages(false)}
                            className="absolute right-3 top-1.5 cursor-pointer text-lg font-semibold text-zinc-400 hover:text-zinc-600"
                        >
                            ×
                        </span>
                        <p className="mb-2 text-sm font-semibold text-black">
                            Average body fat reference
                        </p>

                        <div className="grid grid-cols-2 gap-2 text-center text-xs">
                            <div>
                                <img
                                    src="/bodyfat-male.png"
                                    alt="Average male body fat"
                                    className="rounded-md"
                                />
                                <p className="mt-1 text-zinc-600">Avg male</p>
                            </div>

                            <div>
                                <img
                                    src="/bodyfat-female.png"
                                    alt="Average female body fat"
                                    className="rounded-md"
                                />
                                <p className="mt-1 text-zinc-600">Avg female</p>
                            </div>
                        </div>

                        <p className="mt-2 text-[11px] text-zinc-400">
                            Visual reference only — estimates are fine.
                        </p>
                    </div>
                )}
                {watch("bodyFat") && (
                    <span className="pointer-events-none absolute right-10 top-1/2 -translate-y-1/2 text-md text-zinc-400">
                        %
                    </span>
                )}


            </div>


            <button
                type="submit"
                className="mt-4 h-16 w-full rounded-full bg-red-600 text-2xl font-semibold text-white hover:bg-red-700 active:bg-red-800 transition"
            >
                Continue
            </button>
        </form>
    );
}

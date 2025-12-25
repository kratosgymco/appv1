"use client";

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
    height: z.string(),
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

    const ageValue = watch("age");

    function onSubmit(data: FormData) {
        console.log("ABOUT YOU:", data);
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
                            if (e.key === "-" || e.key === "e" || e.key === "E") {
                                e.preventDefault();
                            }
                        }}
                        className="h-12 w-full rounded-xl border border-zinc-200 bg-white px-4 pr-12 text-black placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-600"
                    />
                    {ageValue && (
                        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-md text-zinc-400">
                            (yrs)
                        </span>
                    )}
                </div>

                <div className="relative">
                    <select
                        {...register("sex")}
                        defaultValue=""
                        className="w-full h-12 rounded-xl border border-zinc-200 bg-white px-4 pr-10 text-black placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-600 appearance-none"
                    >
                        <option value="" disabled hidden>
                            Sex
                        </option>
                        <option className="text-black">Male</option>
                        <option className="text-black">Female</option>
                        <option className="text-black">Other</option>
                        <option className="text-black">Prefer not to say</option>
                    </select>

                    {/* right-side label */}
                    <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-md text-zinc-400">
                        (sex)
                    </span>
                </div>

            </div>

            {/* HEIGHT + WEIGHT */}
            <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                    <input
                        {...register("height")}
                        placeholder="Height (ft/in)"
                        className="w-full h-12 rounded-xl border border-zinc-200 bg-white px-4 pr-4 text-black placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-600 appearance-none"
                    />
                    {watch("height") && (
                        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-md text-zinc-400">
                            (ft/in)
                        </span>
                    )}
                </div>

                <div className="relative">
                    <input
                        type="number"
                        min={1}
                        {...register("weight")}
                        placeholder="Weight"
                        className={fieldClass}
                    />
                    {watch("weight") && (
                        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-md text-zinc-400">
                            (lbs)
                        </span>
                    )}
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
                <option className="text-black">
                    Sedentary (little to no exercise)
                </option>
                <option className="text-black">
                    Lightly active (1–3x / week)
                </option>
                <option className="text-black">
                    Moderately active (3–5x / week)
                </option>
                <option className="text-black">
                    Very active (6–7x / week)
                </option>
                <option className="text-black">
                    Athlete / intense daily training
                </option>
            </select>

            {/* BODY FAT */}
            <div className="relative">
                <input
                    type="number"
                    min={1}
                    max={60}
                    step={0.1}
                    {...register("bodyFat")}
                    placeholder="Body fat % (optional)"
                    className={`${fieldClass} pr-10`}
                />

                {/* ? icon */}
                <div className="group absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full border border-zinc-400 text-xs font-semibold text-zinc-600">
                        ?
                    </span>
                    <div className="pointer-events-none absolute right-0 top-8 z-20 hidden w-72 rounded-xl border border-zinc-200 bg-white p-3 text-sm text-zinc-700 shadow-lg group-hover:block">
                        Body fat % estimates how much of your weight is fat vs lean mass.
                    </div>
                </div>

                {/* HELP ME */}
                <div className="group absolute left-1 -bottom-5 cursor-pointer">
                    <span className="block mt-2 text-xs font-medium text-red-600 hover:underline">
                        help me
                    </span>


                    <div className="pointer-events-none absolute left-0 top-6 z-30 hidden w-80 rounded-xl border border-zinc-200 bg-white p-3 shadow-lg group-hover:block">
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
                </div>
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

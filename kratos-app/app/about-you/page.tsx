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
});

type FormData = z.infer<typeof schema>;

const fieldClass =
    "w-full h-12 rounded-xl border border-zinc-200 bg-white px-4 pr-16 text-black placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-600 appearance-none";

export default function AboutYouStep({ onNext }: Props) {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        watch,
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const ageValue = watch("age");

    function onSubmit(data: FormData) {
        console.log("ABOUT YOU:", data);
        router.push("/profile");
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <h1 className="text-3xl font-semibold text-center whitespace-nowrap">
                Tell me about yourself!
            </h1>

            <p className="text-md text-zinc-300 text-center">
                This helps personalize your training.
            </p>

            {/* AGE */}
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
                    className="h-12 w-full rounded-xl border border-zinc-200 bg-white px-4 pr-28 text-black placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-600"
                />

                {ageValue && (
                    <span className="pointer-events-none absolute right-73.5 top-1/2 -translate-y-1/2 text-black">
                        (years old)
                    </span>
                )}
            </div>

            {/* SEX */}
            <select
                {...register("sex")}
                defaultValue=""
                className={`${fieldClass} ${watch("sex") ? "text-black" : "text-zinc-400"
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

            {/* HEIGHT */}
            <div className="relative">
                <input
                    {...register("height")}
                    placeholder={`Height (e.g. 5'10")`}
                    className={fieldClass}
                />
                {watch("height") && (
                    <span className="pointer-events-none absolute right-77.5 top-1/2 -translate-y-1/2 text-black">
                        (ft'in)
                    </span>
                )}
            </div>

            {/* WEIGHT */}
            <div className="relative">
                <input
                    type="number"
                    min={1}
                    {...register("weight")}
                    placeholder="Weight"
                    className={fieldClass}
                />
                {watch("weight") && (
                    <span className="pointer-events-none absolute right-80.5 top-1/2 -translate-y-1/2 text-black">
                        (lbs)
                    </span>
                )}
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

            <button
                type="submit"
                className="h-12 w-full rounded-full bg-red-600 text-xl font-semibold text-white hover:bg-red-700 active:bg-red-800 transition"
            >
                Continue
            </button>
        </form>
    );
}

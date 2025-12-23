"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {
    onNext: () => void;
};

const schema = z.object({
    age: z.string(),
    sex: z.string(),
    height: z.string(),
    weight: z.string(),
    experience: z.string(),
});

type FormData = z.infer<typeof schema>;

export default function AboutYouStep({ onNext }: Props) {
    const { register, handleSubmit } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    function onSubmit(data: FormData) {
        console.log("ABOUT YOU:", data);
        onNext();
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <h1 className="text-3xl font-semibold text-center whitespace-nowrap">
                Tell me about yourself!
            </h1>

            <p className="text-md text-zinc-300 text-center">
                This helps personalize your training.
            </p>

            <input
                type="number"
                min={1}
                step={1}
                inputMode="numeric"
                {...register("age")}
                placeholder="Age"
                className="w-full rounded-lg border p-3 bg-background
             text-zinc-400 placeholder:text-zinc-400
             focus:text-black focus:outline-none"
            />



            <select
                {...register("sex")}
                defaultValue=""
                className="w-full rounded-lg border p-3 bg-background
             text-zinc-400
             focus:text-black focus:outline-none"
            >
                <option value="" disabled hidden>
                    Sex
                </option>
                <option className="text-black">Male</option>
                <option className="text-black">Female</option>
                <option className="text-black">Other</option>
                <option className="text-black">Prefer not to say</option>
            </select>


            <input
                {...register("height")}
                placeholder="Height (e.g. 5'10 or 178cm)"
                className="w-full rounded-lg border p-3 bg-background text-foreground"
            />

            <input
                {...register("weight")}
                placeholder="Weight (lbs or kg)"
                className="w-full rounded-lg border p-3 bg-background text-foreground"
            />

            <select
                {...register("experience")}
                className="w-full rounded-lg border p-3 bg-background text-foreground"
            >
                <option value="">Training experience</option>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
            </select>

            <button
                type="submit"
                className="h-12 w-full rounded-full bg-red-600 text-lg font-semibold text-white hover:bg-red-700 active:bg-red-800 transition"
            >
                Continue
            </button>
        </form>
    );
}

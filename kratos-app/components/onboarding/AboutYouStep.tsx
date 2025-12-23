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
    const {
        register,
        handleSubmit,
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    function onSubmit(data: FormData) {
        console.log("ABOUT YOU:", data);
        onNext();
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <h1 className="text-3xl font-semibold text-center">
                Tell me about yourself!
            </h1>
            <p className="text-md text-zinc-500 text-center">
                This helps personalize your training.
            </p>


            <select {...register("age")} className="w-full rounded-lg border p-3">
                <option value="">Age</option>
                {Array.from({ length: 68 }, (_, i) => (
                    <option key={i} value={i + 13}>
                        {i + 13}
                    </option>
                ))}
            </select>

            <select {...register("sex")} className="w-full rounded-lg border p-3">
                <option value="">Sex</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
                <option>Prefer not to say</option>
            </select>

            <input
                {...register("height")}
                placeholder="Height (e.g. 5'10 or 178cm)"
                className="w-full rounded-lg border p-3"
            />

            <input
                {...register("weight")}
                placeholder="Weight (lbs or kg)"
                className="w-full rounded-lg border p-3"
            />

            <select {...register("experience")} className="w-full rounded-lg border p-3">
                <option value="">Training experience</option>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
            </select>

            <button
                type="submit"
                className="h-12 w-full rounded-full bg-red-600 text-white hover:bg-red-700 active:bg-red-800 transition"
            >
                Continue
            </button>

        </form>
    );
}

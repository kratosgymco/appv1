"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const emailSchema = z.object({
    email: z.string().email(),
});

type EmailForm = z.infer<typeof emailSchema>;

const fieldClass =
    "w-full h-12 rounded-xl border border-zinc-200 bg-white px-4 text-black placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-600";

export default function ForgotPasswordPage() {
    const [codeSent, setCodeSent] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { isValid },
    } = useForm<EmailForm>({
        resolver: zodResolver(emailSchema),
        mode: "onChange",
    });

    function onSubmit(data: EmailForm) {
        console.log("SEND CODE TO:", data.email);
        setCodeSent(true);
    }

    return (
        <div className="flex min-h-screen items-center justify-center px-4 -mt-8">
            <div className="w-full max-w-md">
                <h1 className="mb-2 text-center text-2xl font-semibold">
                    Forgot your password?
                </h1>

                <p className="mb-6 text-center text-sm text-zinc-400">
                    Enter your email and we’ll send you a verification code.
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <input
                        {...register("email")}
                        placeholder="Email address"
                        disabled={codeSent}
                        className={`${fieldClass} ${codeSent ? "bg-zinc-100 cursor-not-allowed" : ""
                            }`}
                    />

                    {!codeSent && (
                        <button
                            type="submit"
                            disabled={!isValid}
                            className={`h-12 w-full rounded-full text-lg font-semibold text-white transition ${isValid
                                ? "bg-red-600 hover:bg-red-700 active:bg-red-800"
                                : "cursor-not-allowed bg-red-300"
                                }`}
                        >
                            Send Verification Code
                        </button>
                    )}
                </form>

                {codeSent && (
                    <div className="mt-6 space-y-4">
                        <input
                            type="text"
                            placeholder="Enter verification code"
                            className={fieldClass}
                        />

                        <button
                            type="button"
                            className="block mx-auto text-sm text-red-600 hover:underline"
                        >
                            Resend code
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

"use client";

import Link from "next/link";

export default function AccountPage() {
    return (
        <div className="mx-auto max-w-md py-16">
            <h1 className="mb-8 text-center text-2xl font-semibold">
                Log in to your account
            </h1>

            <form className="flex flex-col gap-4">
                <Input label="Username or Email" type="text" />
                <Input label="Password" type="password" />

                <div className="flex justify-between text-sm">
                    <Link
                        href="/forgot-password"
                        className="text-red-600 hover:underline"
                    >
                        Forgot password?
                    </Link>

                    <Link
                        href="/create-account"
                        className="text-red-600 hover:underline"
                    >
                        Create account
                    </Link>
                </div>

                <button className="mt-4 h-12 rounded-full bg-red-600 text-white hover:bg-red-700">
                    Log In
                </button>
            </form>
        </div>
    );
}

function Input({
    label,
    type,
}: {
    label: string;
    type: string;
}) {
    return (
        <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">
                {label} <span className="text-red-500">*</span>
            </label>
            <input
                type={type}
                required
                className="h-11 rounded-md border border-zinc-300 px-3 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
        </div>
    );
}

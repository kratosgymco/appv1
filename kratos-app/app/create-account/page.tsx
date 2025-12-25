"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateAccountPage() {
    const router = useRouter();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [acknowledged, setAcknowledged] = useState(false);

    const passwordsMatch =
        password.length > 0 && password === verifyPassword;

    const formValid =
        firstName &&
        lastName &&
        email &&
        password &&
        verifyPassword &&
        passwordsMatch &&
        acknowledged;

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!formValid) return;
        router.push("/about-you");
    }

    return (
        <div className="mx-auto max-w-md py-16">
            <h1 className="mb-2 text-center text-2xl font-semibold">
                Create Your Account!
            </h1>
            <h2 className="mb-6 text-center text-base font-medium text-zinc-500">
                We're Excited For You to Join Kratos!
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Input label="First Name" value={firstName} onChange={setFirstName} />
                <Input label="Last Name" value={lastName} onChange={setLastName} />
                <Input
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={setEmail}
                />

                <PasswordInput
                    label="Password"
                    value={password}
                    onChange={setPassword}
                    show={showPassword}
                    toggleShow={() => setShowPassword(!showPassword)}
                />

                <PasswordInput
                    label="Verify Password"
                    value={verifyPassword}
                    onChange={setVerifyPassword}
                    show={showPassword}
                    toggleShow={() => setShowPassword(!showPassword)}
                    error={
                        verifyPassword.length > 0 && !passwordsMatch
                            ? "Passwords do not match"
                            : undefined
                    }
                />

                <label className="flex items-start gap-3 text-sm">
                    <input
                        type="checkbox"
                        checked={acknowledged}
                        onChange={(e) => setAcknowledged(e.target.checked)}
                        className="mt-1 h-4 w-4 accent-red-600"
                    />
                    <span>
                        I acknowledge that AI predictions may not be accurate and are used as
                        guidelines based on the information I provide.
                        <span className="text-red-500">*</span>
                    </span>
                </label>

                <button
                    type="submit"
                    disabled={!formValid}
                    className={`mt-4 h-12 rounded-full text-white ${formValid
                        ? "bg-red-600 hover:bg-red-700"
                        : "cursor-not-allowed bg-red-300"
                        }`}
                >
                    Create Account
                </button>
                router.push("/AboutYouStep");

            </form>
        </div>
    );
}

/* ---------- Components ---------- */

function Input({
    label,
    value,
    onChange,
    type = "text",
}: {
    label: string;
    value: string;
    onChange: (v: string) => void;
    type?: string;
}) {
    return (
        <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">
                {label} <span className="text-red-500">*</span>
            </label>
            <input
                type={type}
                required
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="h-11 rounded-md border border-zinc-300 px-3 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
        </div>
    );
}

function PasswordInput({
    label,
    value,
    onChange,
    show,
    toggleShow,
    error,
}: {
    label: string;
    value: string;
    onChange: (v: string) => void;
    show: boolean;
    toggleShow: () => void;
    error?: string;
}) {
    return (
        <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">
                {label} <span className="text-red-500">*</span>
            </label>

            <input
                type={show ? "text" : "password"}
                required
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="h-11 rounded-md border border-zinc-300 px-3 focus:outline-none focus:ring-2 focus:ring-red-600"
            />

            <div className="mt-1 flex items-center gap-2 text-sm">
                <button
                    type="button"
                    onClick={toggleShow}
                    className={`relative h-5 w-9 rounded-full transition ${show ? "bg-red-600" : "bg-zinc-300"
                        }`}
                >
                    <span
                        className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition ${show ? "left-4" : "left-0.5"
                            }`}
                    />
                </button>
                <span className="text-zinc-500">
                    {show ? "Hide password" : "Show password"}
                </span>
            </div>

            {error && <span className="text-xs text-red-600">{error}</span>}
        </div>
    );
}

"use client";

import { useRouter } from "next/navigation";
import AboutYouStep from "@/components/onboarding/AboutYouStep";

export default function AboutYouPage() {
    const router = useRouter();

    return (
        <div className="mx-auto max-w-md py-16">
            <AboutYouStep onNext={() => router.push("/profile")} />
        </div>
    );
}

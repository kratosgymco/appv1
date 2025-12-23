"use client";

import { useState } from "react";
import WelcomeStep from "@/components/onboarding/WelcomeStep";
import AboutYouStep from "@/components/onboarding/AboutYouStep";
import AvatarStep from "@/components/onboarding/AvatarStep";

export default function OnboardingPage() {
  const [step, setStep] = useState<0 | 1 | 2>(0);

  return (
    <div className="mx-auto max-w-md py-12">
      {step === 0 && <WelcomeStep onNext={() => setStep(1)} />}
      {step === 1 && <AboutYouStep onNext={() => setStep(2)} />}
      {step === 2 && <AvatarStep />}
    </div>
  );
}

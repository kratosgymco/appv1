"use client";

type Props = {
    onNext: () => void;
};

export default function WelcomeStep({ onNext }: Props) {
    return (
        <div className="flex min-h-[70vh] flex-col items-center justify-center space-y-8 text-center">
            <h1 className="text-5xl font-semibold whitespace-nowrap">
                Welcome to Kratos!
            </h1>


            <p className="max-w-sm text-muted-foreground">
                We’re here to make your fitness journey more intelligently personalized!
            </p>

            <button
                onClick={onNext}
                className="h-15 w-50 rounded-full bg-red-600 text-xl font-semibold text-white hover:bg-red-700 active:bg-red-800 transition"
            >
                Let’s go!
            </button>
        </div>
    );
}

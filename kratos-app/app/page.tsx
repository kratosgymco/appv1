import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">

      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">

        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50 whitespace-nowrap">
            Kratos Training Platform
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Strength training, recovery, and performance — all in one easy to use platform.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <button className="h-13 rounded-full bg-black px-12 text-lg text-white hover:bg-red-800 whitespace-nowrap">
            Get Started
          </button>
          <section className="mt-24 w-full border-t pt-12">
            <h2 className="text-2xl font-semibold text-zinc dark:text-zinc-50">
              What Kratos Does
            </h2>

            <p className="mt-4 max-w-xl text-red-600 dark:text-zinc-400">
              Kratos helps athletes plan workouts, track recovery, and improve performance
              with data-driven insights.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}

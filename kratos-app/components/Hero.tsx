export default function Hero() {
  return (
    <section className="w-full py-32 px-6 text-center">
      <h1 className="text-5xl font-bold tracking-tight">
        Kratos Training Platform
      </h1>

      <p className="mt-6 text-lg text-zinc-600">
        Strength training, recovery, and performance — all in one platform.
      </p>

      <div className="mt-10">
        <button className="rounded-full bg-black px-8 py-4 text-white text-lg hover:bg-red-800">
          Get Started
        </button>
      </div>
    </section>
  );
}

"use client";

import { useRouter } from "next/navigation";

export default function SiteHeader() {
  return (
    <div className="mx-auto max-w-7xl px-6 pt-10 pb-24 sm:pb-32 lg:flex lg:px-8 lg:py-40">
      <div className="w-full lg:pt-8">
        {/* Centered Block */}
        <div className="flex flex-col items-center text-center w-full">
          <h2 className="w-full text-5xl font-semibold tracking-tight text-white sm:text-7xl">
            Empower Therapists and Clients with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-lime-500 to-green-500">
              Therassist
            </span>
          </h2>

          <p className="mt-8 max-w-3xl text-xl font-medium text-zinc-400">
            An interactive platform for clients and therapists to track
            progress, set goals, and collaborate on mental health journeys for
            improved well-being and growth.
          </p>
        </div>
      </div>
    </div>
  );
}

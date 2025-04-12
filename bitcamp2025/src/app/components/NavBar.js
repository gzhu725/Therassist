"use client";

import { ShieldCheckIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NavBar() {
  const router = useRouter(); // Create the router instance to use for navigation

  return (
    <div className="w-full lg:pt-8">
      <div className="flex justify-between items-center px-6 text-center sm:text-left">
        {/* Left Section: NurseAssist Title */}
        <Link href="/">
          <h1 className="text-4xl font-bold flex items-center gap-2 text-white">
            <div className="h-10 w-10 bg-gradient-to-r from-emerald-500 via-lime-500 to-green-500 rounded-full flex items-center justify-center">
              <ShieldCheckIcon className="h-5 w-5 text-white" />
            </div>
            NurseAssist
          </h1>
        </Link>
        {/* Right Section: Button Container */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-6">
          <button
            onClick={() => router.push("/upload")}
            className="min-w-[200px] h-11 bg-gradient-to-r from-emerald-500 via-lime-500 to-green-500 hover:from-emerald-600 hover:via-lime-600 hover:to-green-600 text-white px-6 py-2.5 rounded-md transition-all duration-300 text-lg text-center"
          >
            Upload Information
          </button>

          <button
            onClick={() => router.push("/gemini")}
            className="min-w-[200px] h-11 bg-gradient-to-r from-emerald-500 via-lime-500 to-green-500 hover:from-emerald-600 hover:via-lime-600 hover:to-green-600 text-white px-6 py-2.5 rounded-md transition-all duration-300 text-lg text-center"
          >
            There is a Bot!
          </button>
        </div>
      </div>
    </div>
  );
}

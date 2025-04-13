"use client";
import React, { useState } from "react";
import NavBar from "../components/NavBar";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginPage = () => {
  const router = useRouter();
  const [errMessage, setErrMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");

    const myContainer = document.getElementById("err");

    try {
      // Fetch user data from the backend
      const response = await fetch(
        `http://localhost:5001/getUsers/${username}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.ok) {
        const user = await response.json();
        console.log(user);

        // Check if the password matches
        if (user && user.password === password) {
          router.push("/gemini");
          if (username) {
            localStorage.setItem("username", username.toString());
          }
        } else {
          setErrMessage("Incorrect username or password");
          myContainer.style.display = "block";
        }
      } else {
        setErrMessage("User not found");
        myContainer.style.display = "block";
      }
    } catch (error) {
      setErrMessage("Server error");
      console.log(error);
      myContainer.style.display = "block";
    }
  };

  return (
    <>
      <div className="w-full max-w-xs m-4">
        <NavBar />
        <h1 className="text-2xl font-bold">Login</h1>
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              name="username"
              placeholder="Username"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              className="shadow appearance-none rounded border w-full py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
              name="password"
              required
            />
          </div>
          <div className="flex items-center justify-start gap-4">
            <button
              className="h-11 bg-gradient-to-r from-emerald-500 via-lime-500 to-green-500 hover:from-emerald-600 hover:via-lime-600 hover:to-green-600 text-white px-6 py-2.5 rounded-md transition-all duration-300  text-center"
              type="submit"
            >
              Sign In
            </button>
            <Link href="/signup">Sign Up</Link>
          </div>
          <p className="text-red-500 text-xs italic mt-4 hidden" id="err">
            {errMessage}
          </p>
        </form>
      </div>
    </>
  );
};

export default LoginPage;

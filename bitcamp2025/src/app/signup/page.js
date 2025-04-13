"use client";
import React, { useState } from "react";
import NavBar from "../components/NavBar";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";

export default function SignupPage() {
  const [isTherapist, setIsTherapist] = useState(false); // Define useState outside of handleSubmit
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const username = formData.get("username");
    const password1 = formData.get("password1");
    const password2 = formData.get("password2");

    let err = "";

    // Validation
    if (password1 !== password2) {
      err = "Your passwords do not match";
    } else if (!password1 || password1.length < 6 || password1.length > 30) {
      err = "Your password must be between 6-30 characters";
    }

    if (!username || username.length < 6 || username.length > 20) {
      err = "Your username must be between 6-20 characters";
    }

    // If there's no error, proceed to send the data to the server
    if (err === "") {
      try {
        const userId = uuidv4(); // Generate the UUID for the user

        const response = await fetch("http://localhost:5001/postUser", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: userId,
            username,
            password: password1,
            name: username, 
            type: isTherapist ? "therapist" : "client", 
            userInfo: { email }, 
          }),
        });

        const responseData = await response.json();
        console.log(responseData);

        if (response.ok) {
         
          if (responseData === "False") {
            err = "Your username or email is already in use";
          } else {
            router.push("/login");
          }
        } else {
          // Handle errors
          const myContainer = document.getElementById("err");
          myContainer.innerHTML = "Please try again";
          myContainer.style.display = "block";
        }
      } catch (error) {
        err = "Server error";
        console.log(error);
      }
    }
    if (err !== "") {
      const myContainer = document.getElementById("err");
      myContainer.innerHTML = err;
      myContainer.style.display = "block";
    }
  };

  return (
    <>
      <div className="w-full max-w-xs m-4">
        <NavBar />
        <h1 className="text-2xl font-bold">Sign Up</h1>
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Are you a therapist or a client?
            </label>
            <div>
              <div className="flex flex-wrap">
                <div className="flex items-center me-4">
                  <input
                    type="radio"
                    className="h-6 w-6 checked:bg-green-500 text-green-500 p-3 my-4"
                    name="radio"
                    value="therapist"
                    onClick={() => setIsTherapist(true)}
                  />
                  <label
                    htmlFor="therapist-radio"
                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Therapist
                  </label>
                </div>
                <div className="flex items-center me-4">
                  <input
                    type="radio"
                    className="h-6 w-6 checked:bg-green-500 text-green-500 p-3 my-4"
                    name="radio"
                    value="client"
                    onClick={() => setIsTherapist(false)}
                  />
                  <label
                    htmlFor="client-radio"
                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Client
                  </label>
                </div>
              </div>
            </div>

            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              name="email"
              placeholder="Email"
              required
            />
          </div>

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

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              className="shadow appearance-none rounded border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password1"
              type="password"
              name="password1"
              placeholder="Password"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Confirm Password
            </label>
            <input
              className="shadow appearance-none rounded border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password2"
              type="password"
              name="password2"
              placeholder="Confirm Password"
              required
            />
          </div>

          <div className="flex items-center justify-start gap-4">
            <button
              className="h-11 bg-gradient-to-r from-emerald-500 via-lime-500 to-green-500 hover:from-emerald-600 hover:via-lime-600 hover:to-green-600 text-white px-6 py-2.5 rounded-md transition-all duration-300 text-center"
              type="submit"
            >
              Sign Up
            </button>

            <Link href="/login">Login</Link>
          </div>

          <p className="text-red-500 text-xs italic mt-4 hidden" id="err"></p>
        </form>
      </div>
    </>
  );
}

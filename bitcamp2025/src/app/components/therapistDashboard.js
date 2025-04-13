"use client";
import React, { useState, useRef, useCallback, useEffect } from "react";
import NavBar from "../components/NavBar";
import { GoogleGenAI } from "@google/genai";
import { GEMINI_KEY } from "@/keys";
import { initFlowbite } from "flowbite";
import { PuzzlePieceIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import Link from "next/link";

const TherapistDashboardPage = () => {
  const [chatAnswer, setChatAnswer] = useState("Hi! How can I help you today?");
  const [client, setClient] = useState("Select a Client:");
  const [summary, setSummary] = useState("No Client Selected");
  const [clientsList, setClientsList] = useState([]);
  const [sessionsList, setSessionsList] = useState([]);
  const [clientFilesList, setClientFilesList] = useState([]);
  const [chatQuestion, setChatQuestion] = useState("");
  const [currentFileData, setCurrentFileData] = useState(
    "Your files will open here!"
  );
  const [currentFileName, setCurrentFileName] = useState("");

  const [username, setUsername] = useState("candacesun");
  const router = useRouter(); // Create the router instance to use for navigation

  useEffect(() => {
    setTimeout(() => {
      initFlowbite();
      getClients();
    });
  }, []);

  async function getClients() {
    var name = "Gloria Zhu";
    try {
      // Fetch user data from the backend
      const response = await fetch(`http://localhost:5001/getClients/${name}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        var clientsUpdated = [];
        const theclients = await response.json();
        console.log(theclients);

        for (var person of theclients) {
          console.log(person.name);
          clientsUpdated.push(person.name);
        }

        setClientsList(clientsUpdated);
      } else {
        console.log("clients not found");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getResponse() {
    setChatAnswer("Loading...");
    var inputtext = document.getElementById("question-input").value;
    console.log(inputtext);

    // Check if the input contains the phrase "my patients" to summarize
    if (
      inputtext.toLowerCase().includes("my patients") ||
      inputtext.toLowerCase().includes("my clients")
    ) {
      setChatAnswer(
        "Your patients are: " +
          clientsList +
          ". Would you like me to summarize any of your clients?"
      );
    } else {
      const clientContext = `
    Client Summary: ${summary || "No summary available"}.
    Recent Sessions: ${sessionsList.length > 0 ? sessionsList.join(", ") : "No sessions available"}.
    Files: ${clientFilesList.length > 0 ? clientFilesList.join(", ") : "No files available"}.`;

      var extraInput = `Answer the user query above acting as an AI therapist for a client. Keep your answer unformatted and no more than a paragraph.Use the following client data to inform your response: ${clientContext}`;

      const ai = new GoogleGenAI({
        apiKey: GEMINI_KEY,
      });
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: inputtext + extraInput,
      });
      console.log(response.text);
      setChatAnswer(response.text);
    }
  }

  async function updateClient(clientItem) {
    try {
      // Fetch user data from the backend
      const response = await fetch(
        `http://localhost:5001/clients/get/${clientItem}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("aaa");
      if (response.ok) {
        const theclient = await response.json();
        console.log("bbb");

        console.log(theclient);

        setSessionsList(theclient.sessions);
        setClientFilesList(theclient.journals);
        setSummary(theclient.summary);
      } else {
        console.log("client not found");
      }
    } catch (error) {
      console.log(error);
    }

    setClient(clientItem);
    // setSummary(
    //   "Bonnie has made significant progress in therapy, demonstrating increased self-awareness and improved coping strategies for managing anxiety and stress. She has shown a strong commitment to personal growth, actively engaging in sessions and applying therapeutic tools to her daily life. Currently, Bonnie is working on setting healthy boundaries in her relationships and building self-confidence through assertiveness training. Additionally, she continues to explore underlying patterns from past experiences that contribute to her emotional responses. "
    // );
    // setSessionsList(["4/1/2025", "4/3/2025"]);
    // setClientFilesList(["Journal Entry - 3/29", "Audio Entry - 3/30"]);
    console.log("client ", clientItem);
  }

  return (
    <div>
      <NavBar username={username} />

      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-80 h-screen pt-20 transition-transhtmlForm -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <button
                id="dropdownSearchButton"
                data-dropdown-toggle="dropdownSearch"
                data-dropdown-placement="bottom"
                className="text-center inline-flex items-center h-11 bg-gradient-to-r from-emerald-500 via-lime-500 to-green-500 hover:from-emerald-600 hover:via-lime-600 hover:to-green-600 text-white px-6 py-2.5 rounded-md transition-all duration-300"
                type="button"
              >
                {client}
                <svg
                  className="w-2.5 h-2.5 ms-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>

              <div
                id="dropdownSearch"
                className="z-10 hidden bg-white rounded-lg shadow-sm w-60 dark:bg-gray-700"
              >
                <div className="p-3">
                  <label htmlFor="input-group-search" className="sr-only">
                    Search
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="input-group-search"
                      className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Search user"
                    />
                  </div>
                </div>
                <ul
                  className="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownSearchButton"
                >
                  {clientsList.map((clientItem) => {
                    return (
                      <li key={clientItem}>
                        <div className="flex items-center ps-2 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-600">
                          <input
                            id={clientItem}
                            type="radio"
                            name="radio"
                            value=""
                            onChange={function (e) {
                              updateClient(clientItem);
                            }}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                          />
                          <label
                            htmlFor="radio-item-11"
                            className="w-full py-2 ms-2 text-sm font-medium text-gray-900 rounded-sm dark:text-gray-300"
                          >
                            {clientItem}
                          </label>
                        </div>
                      </li>
                    );
                  })}
                </ul>
                <a
                  href="#"
                  className="flex items-center p-3 text-sm font-medium text-red-600 border-t border-gray-200 rounded-b-lg bg-gray-50 dark:border-gray-600 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-red-500 hover:underline"
                >
                  <svg
                    className="w-4 h-4 me-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 18"
                  >
                    <path d="M6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Zm11-3h-6a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2Z" />
                  </svg>
                  Delete user
                </a>
              </div>
            </li>
            <li>
              <button
                type="button"
                className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                aria-controls="dropdown-example3"
                data-collapse-toggle="dropdown-example3"
              >
                <svg
                  className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                    clipRule="evenodd"
                  />
                </svg>

                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                  Summary
                </span>
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>

              <ul id="dropdown-example3" className="hidden py-2 space-y-2">
                <li>
                  <div className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 text-sm">
                    {summary}
                  </div>
                </li>
              </ul>
            </li>

            <li>
              <button
                type="button"
                className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                aria-controls="dropdown-example"
                data-collapse-toggle="dropdown-example"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                >
                  <path d="M12.75 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM7.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM8.25 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM9.75 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM10.5 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM12.75 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM14.25 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
                  <path
                    fillRule="evenodd"
                    d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"
                    clipRule="evenodd"
                  />
                </svg>

                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                  Sessions
                </span>
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              <ul id="dropdown-example" className="hidden py-2 space-y-2">
                {sessionsList.map((sessionItem, i) => {
                  return (
                    <li key={sessionItem}>
                      <button
                        onClick={() => {
                          setCurrentFileData(sessionItem);
                          setCurrentFileName("Session " + (i + 1).toString());
                        }}
                        className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      >
                        Session {i + 1}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </li>
            <li>
              <button
                type="button"
                className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                aria-controls="dropdown-example2"
                data-collapse-toggle="dropdown-example2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625ZM7.5 15a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 7.5 15Zm.75 2.25a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5H8.25Z"
                    clipRule="evenodd"
                  />
                  <path d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z" />
                </svg>

                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                  Client Files
                </span>
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              <ul id="dropdown-example2" className="hidden py-2 space-y-2">
                {clientFilesList.map((fileItem, i) => {
                  return (
                    <li key={fileItem}>
                      <button
                        onClick={() => {
                          setCurrentFileData(fileItem);
                          setCurrentFileName(
                            "Journal File " + (i + 1).toString()
                          );
                        }}
                        className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      >
                        Journal File {i + 1}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </li>
          </ul>
        </div>
      </aside>

      <div className="p-4 sm:ml-80">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <div className="grid grid-cols-1 gap-4 mb-4">
            <>
              <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
                <ul
                  className="flex flex-wrap -mb-px text-sm font-medium text-center"
                  id="default-styled-tab"
                  data-tabs-toggle="#default-styled-tab-content"
                  data-tabs-active-classes="text-emerald-600 hover:text-emerald-600 dark:text-emerald-500 dark:hover:text-emerald-500 border-emerald-600 dark:border-emerald-500"
                  data-tabs-inactive-classes="dark:border-transparent text-gray-500 hover:text-gray-600 dark:text-gray-400 border-gray-100 hover:border-gray-300 dark:border-gray-700 dark:hover:text-gray-300"
                  role="tablist"
                >
                  <li className="me-2" role="presentation">
                    <button
                      className="inline-block p-4 border-b-2 rounded-t-lg"
                      id="profile-styled-tab"
                      data-tabs-target="#styled-profile"
                      type="button"
                      role="tab"
                      aria-controls="profile"
                      aria-selected="false"
                    >
                      File Viewer
                    </button>
                  </li>
                  <li className="me-2" role="presentation">
                    <button
                      className="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                      id="dashboard-styled-tab"
                      data-tabs-target="#styled-dashboard"
                      type="button"
                      role="tab"
                      aria-controls="dashboard"
                      aria-selected="false"
                    >
                      TheraBot
                    </button>
                  </li>
                </ul>
              </div>
              <div id="default-styled-tab-content">
                <div
                  className="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
                  id="styled-profile"
                  role="tabpanel"
                  aria-labelledby="profile-tab"
                >
                  <b className="text-sm text-gray-700 dark:text-gray-400">
                    {currentFileName}
                  </b>
                  <p className="text-sm text-gray-700 dark:text-gray-400">
                    {currentFileData}
                  </p>
                </div>
                <div
                  className="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
                  id="styled-dashboard"
                  role="tabpanel"
                  aria-labelledby="dashboard-tab"
                >
                  {chatAnswer ? (
                    <div className="flex items-start gap-2.5">
                      <div className="h-10 w-10 bg-gradient-to-r from-emerald-500 via-lime-500 to-green-500 rounded-full flex items-center justify-center">
                        <PuzzlePieceIcon className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">
                            TheraBot
                          </span>
                        </div>
                        <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
                          {chatAnswer}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                  <div className="">
                    <div className="mt-6">
                      <p>Ask Therabot a question:</p>
                      <textarea
                        id="question-input"
                        rows="4"
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-3"
                        placeholder="Your question here..."
                      ></textarea>
                      <button
                        onClick={() => getResponse()}
                        className="h-11 bg-gradient-to-r from-emerald-500 via-lime-500 to-green-500 hover:from-emerald-600 hover:via-lime-600 hover:to-green-600 text-white px-6 py-2.5 rounded-md transition-all duration-300 text-sm text-center"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TherapistDashboardPage;

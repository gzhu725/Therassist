"use client";
import React, { useState, useRef, useCallback } from "react";
import NavBar from "../components/NavBar";
import { GoogleGenAI } from "@google/genai";

const GeminiPage = () => {
  const [text, setText] = useState("");

  async function getResponse() {
    var inputtext = document.getElementById("question-input").value;
    console.log(inputtext);

    const ai = new GoogleGenAI({
      apiKey: "AIzaSyDIuS7uENtCJALiRnCa-juAdEcO82dqplI",
    });
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: inputtext,
    });
    console.log(response.text);
    setText(response.text);
  }

  return (
    <div>
      <NavBar />
      <div className="chat-container">
        <div className="chat-question-container">
          <p>What is your question?</p>
          <input type="text" id="question-input"></input>
          <button
            onClick={() => getResponse()}
            className="min-w-[200px] h-11 bg-gradient-to-r from-emerald-500 via-lime-500 to-green-500 hover:from-emerald-600 hover:via-lime-600 hover:to-green-600 text-white px-6 py-2.5 rounded-md transition-all duration-300 text-lg text-center"
          >
            Submit
          </button>
        </div>

        <p>{text}</p>
      </div>
    </div>
  );
};

export default GeminiPage;

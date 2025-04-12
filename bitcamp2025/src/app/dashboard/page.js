"use client";
import React, { useState, useRef, useCallback } from "react";
import NavBar from "../components/NavBar";

const Name = () => {
  const [text, setText] = useState("Hi");

    return (
        <div>
            <NavBar />
            <div className="text-center">
                <h2 className="text-3xl font-semibold mb-8 mt-20">
                    Hello World!
                </h2>
            </div>
            <p>{text}</p>
        </div>
    )
}

export default Name;
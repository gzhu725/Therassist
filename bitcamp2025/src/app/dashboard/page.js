"use client";
import React, { useState, useRef, useCallback, useEffect } from "react";
import NavBar from "../components/NavBar";
import { GoogleGenAI } from "@google/genai";
import { GEMINI_KEY } from "@/keys";
import { initFlowbite } from "flowbite";
import { PuzzlePieceIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import Link from "next/link";
import TherapistDashboardPage from "../components/therapistDashboard";
import ClientDashboardPage from "../components/clientDashboard";

const DashboardPage = () => {
  const [role, setRole] = useState("client");

  return (
    <>
      {role == "therapist" ? (
        <TherapistDashboardPage />
      ) : (
        <ClientDashboardPage />
      )}
    </>
  );
};

export default DashboardPage;

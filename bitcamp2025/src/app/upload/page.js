"use client";
import React, { useEffect, useState, useRef } from "react";
import Webcam from "react-webcam";
import NavBar from "../components/NavBar";
import { GoogleGenAI } from "@google/genai";
import { GEMINI_KEY } from "@/keys";

import { initFlowbite } from "flowbite";

const UploadInfo = () => {
  const [image, setImage] = useState(null);
  const webcamRef = useRef(null);
  const fileInputRef = useRef(null);
  const fileInputRef2 = useRef(null);
  const audioInputRef = useRef(null);

  const [showWebcam, setShowWebcam] = useState(false);
  const [loading, setLoading] = useState(false);
  const [scannedText, setScannedText] = useState("");

  const [geminiText, setGeminiText] = useState("");

  const [username, setUsername] = useState("candacesun");
  useEffect(() => {
    setTimeout(() => {
      initFlowbite();
    });
  }, []);

  useEffect(() => {
    if (scannedText) {
      sendEmail();
    }
  }, [scannedText]);
  const [audio, setAudio] = useState(null);


  const handleScan = async (imageUrl) => {
    setLoading(true);
    try {
      const blob = await fetch(imageUrl).then((res) => res.blob());
      const base64 = await blobToBase64(blob); //valid base 64 coding

      const res = await fetch("/api/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64 }),
      });

      const data = await res.json();
      console.log("Detected text:", data.text);
      setScannedText(data.text);

      // POST TO DATABASE
      // client as placeholder for now
      const client_name = "ella";
      const newRes = await fetch('http://localhost:5000/clients/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: client_name, // this is the client name
          img_data: data.text, // this is the new image data
        }),
      });

      const newData = await newRes.json();
      console.log('Updated client:', newData);
      // print("new new")
      // console.log(newData.clientInfo.img_data);
      // test 
      const therapist_id = "67fb2dafd94617a5c6072202";
      const newRes2 = await fetch('http://localhost:5000/getClients/67fb2dafd94617a5c6072202', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
   
      });

      const newData2 = await newRes2.json();
      console.log('all clients:', newData2);
      
    } catch (err) {
      console.error("Scan failed:", err);
    }
    setLoading(false);
  };

  async function sendEmail() {
    /*
    email: string
    take the scanned text
    run thru gemini. what are the plan of action/suggested things for the client to do?
    send that suggestion to the client
    */

    const geminiInput =
      "Please write an email (no subject) to the following client about the tasks they should complete before our next session based on the following notes:" +
      scannedText;
    console.log(geminiInput);

    const ai = new GoogleGenAI({
      apiKey: GEMINI_KEY,
    });

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: geminiInput,
      });

      const suggestion = await response.response.text();
      console.log("Generated suggestion:", suggestion);

      setGeminiText(suggestion);

      if (suggestion.trim() !== "") {
        await fetch("/api/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: suggestion }),
        });
      } else {
        console.warn("Gemini returned an empty suggestion, not sending email.");
      }
    } catch (err) {
      console.error("Error generating Gemini content or sending email:", err);
    }
  }

  async function sendEmail() {
    const geminiInput =
      "Please write an email (no subject) to the following client about the tasks they should complete before our next session based on the following notes:" +
      scannedText;
    console.log(geminiInput);
    const ai = new GoogleGenAI({
      apiKey: GEMINI_KEY,
    });
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: geminiInput,
    });
    console.log(response.text);

    //after getting the response, send an automatic ACTUAL email from allwoed domain to gloria's personal email for now
    await fetch("/api/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: response.text }),
    });
  }

  const triggerPhoto = () => {
    setImage(null);
    setShowWebcam((prev) => !prev);
  };

  const capturePhoto = async () => {
    const screenshot = webcamRef.current.getScreenshot();
    if (screenshot) {
      setImage(screenshot);
      setShowWebcam(false);
      await handleScan(screenshot);
    }
  };

  const blobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(",")[1]); // get base64 only
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImage(url);
      setShowWebcam(false);
      console.log("will it handle this scan? " + url);
      handleScan(url);
    }
  };

  const triggerFileInput = () => {
    setShowWebcam(false);
    setImage(null);
    fileInputRef.current.click();
  };

  const removeImage = () => {
    setImage(null);
  };

  const triggerAudioInput = () => {
    setShowWebcam(false);
    setAudio(null);
    fileInputRef.current.click();
  };

  const handleAudioChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('audio/')) {
      setAudio(file);
    } else {
      alert("Please select a valid audio file.");
    }
  };

  return (
    <div>
      <NavBar username={username} />
      <div className="text-center">
        <h2 className="text-3xl font-semibold mb-8 mt-20">
          Upload or Take a Photo
        </h2>
      </div>
      <div className="flex justify-evenly gap-6 mt-8">
        <button
          onClick={triggerFileInput}
          className="w-40 h-17 bg-gradient-to-r from-emerald-500 via-lime-500 to-green-500 hover:from-emerald-600 hover:via-lime-600 hover:to-green-600 text-white px-6 py-2.5 rounded-md transition-all duration-300 text-lg"
        >
          Select a Photo
        </button>
        <button
          onClick={triggerPhoto}
          className="w-40 h-17 bg-gradient-to-r from-emerald-500 via-lime-500 to-green-500 hover:from-emerald-600 hover:via-lime-600 hover:to-green-600 text-white px-6 py-2.5 rounded-md transition-all duration-300 text-lg"
        >
          Use Webcam
        </button>
      
      <button
          onClick={triggerAudioInput}
          className="w-40 h-17 bg-gradient-to-r from-emerald-500 via-lime-500 to-green-500 hover:from-emerald-600 hover:via-lime-600 hover:to-green-600 text-white px-6 py-2.5 rounded-md transition-all duration-300 text-lg"
        >
          Upload audio recording
      </button>
      </div>

      {showWebcam && (
        <div className="flex flex-col justify-center items-center mt-8">
          <button
            onClick={triggerPhoto}
            className="mt-4 mb-4 w-40 h-11 bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:from-red-600 hover:via-red-700 hover:to-red-800 text-white px-6 py-2.5 rounded-md transition-all duration-300 text-lg"
          >
            Cancel photo
          </button>
          <Webcam
            ref={webcamRef}
            height={600}
            width={600}
            screenshotFormat="image/jpeg"
          />
          <br />
          <button
            onClick={capturePhoto}
            className="mt-4 w-40 h-11 bg-gradient-to-r from-emerald-500 via-lime-500 to-green-500 hover:from-emerald-600 hover:via-lime-600 hover:to-green-600 text-white px-6 py-2.5 rounded-md transition-all duration-300 text-lg"
          >
            Take a photo
          </button>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
        capture="environment"
      />
      {image && (
        <div className="mt-4 flex flex-col items-center justify-center">
          <img src={image} alt="Uploaded" className="w-[300px] mx-auto" />
          <button
            onClick={removeImage}
            className="mt-4 w-40 h-17 bg-gradient-to-r from-rose-500 via-red-500 to-pink-500 hover:from-rose-600 hover:via-red-600 hover:to-pink-600 text-white px-6 py-2.5 rounded-md transition-all duration-300 text-lg"
          >
            Remove Photo
          </button>
        </div>
      )}

      
    <input
        ref={audioInputRef}
        type="file"
        accept="audio/*"
        onChange={handleAudioChange}
        style={{ display: "none" }}
        capture
      />
       {audio && (
        <audio
          controls
          src={URL.createObjectURL(audio)}
          style={{ display: "block", marginTop: "10px" }}
        />
      )}
    </div>
  );
};

export default UploadInfo;

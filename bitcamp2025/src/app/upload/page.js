"use client";
import React, { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import NavBar from "../components/NavBar";

const UploadInfo = () => {
  const [image, setImage] = useState(null);
  const webcamRef = useRef(null);
  const fileInputRef = useRef(null);
  const [showWebcam, setShowWebcam] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleScan = async (imageUrl) => {
    setLoading(true);
    try {
      const blob = await fetch(imageUrl).then((res) => res.blob());
      const base64 = await blobToBase64(blob);  //valid base 64 coding

      if (imageInput.startsWith("data:image")) base64 = imageInput.split(",")[1];

      const res = await fetch("/api/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64 })
      });

      const data = await res.json();
      console.log("Detected text:", data.text);
    } catch (err) {
      console.error("Scan failed:", err);
    }
    setLoading(false);
  };

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

  return (
    <div>
      <NavBar />
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
    </div>
  );
};

export default UploadInfo;

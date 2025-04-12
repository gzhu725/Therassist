"use client";
import React, { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import NavBar from "../components/NavBar";


const UploadInfo = () => {
  const [image, setImage] = useState(null);
  const webcamRef = useRef(null);
  const fileInputRef = useRef(null);
  const [showWebcam, setShowWebcam] = useState(false);

  const triggerPhoto = () => {
    setImage(null);
    setShowWebcam((prev) => !prev);
  };

  const capturePhoto = () => {
    const screenshot = webcamRef.current.getScreenshot();
    if (screenshot) {
      setImage(screenshot);
      setShowWebcam(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImage(url);
      setShowWebcam(false);
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
      <button onClick={triggerFileInput}>Select a Photo</button>
      <br />
      <br />
      <button onClick={triggerPhoto}>
        {showWebcam ? "Cancel Webcam" : "Use Webcam"}
      </button>
      {showWebcam && (
        <div>
          <Webcam
            ref={webcamRef}
            height={600}
            width={600}
            screenshotFormat="image/jpeg"
          />
          <br />
          <button onClick={capturePhoto}>Take a photo</button>
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
        <div style={{ marginTop: "1rem" }}>
          <img src={image} alt="Uploaded" style={{ width: 300 }} />
          <br />
          <button onClick={removeImage} style={{ marginTop: "10px" }}>
            Remove Photo
          </button>
        </div>
      )}
      <br/>
      tesseract interaction below
    </div>
  );
};

export default UploadInfo;

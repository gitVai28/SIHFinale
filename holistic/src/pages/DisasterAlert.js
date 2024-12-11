import React, { useState, useEffect, useRef, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import sirenAudio from "./siren.mp3";

const DisasterAlert = ({ onAcknowledge }) => {
  const navigate = useNavigate();

  // Static disaster data wrapped in useMemo
  const initialDisasterData = useMemo(() => [
    {
      type: "Earthquake",
      location: "Himalayan Region, India",
      severity: "Severe",
      summary:
        "Magnitude 7.1 earthquake detected. Risk of significant damage in the northern and northeastern regions of India.",
    },
    {
      type: "Flood",
      location: "Kerala, India",
      severity: "Moderate",
      summary:
        "Heavy rains expected to cause flooding in low-lying areas of Kerala. Residents are advised to stay alert.",
    },
  ], []);

  const adminContact = "+919699408170"; // Admin's contact number
  const emergencyContacts = [
    "+919699408170"
  ];

  const [isDisaster, setIsDisaster] = useState(false);
  const [disasterData, setDisasterData] = useState(null);
  const [isAcknowledged, setIsAcknowledged] = useState(false);
  const [smsStatus, setSmsStatus] = useState([]);
  const [audioError, setAudioError] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Simulate disaster detection
    const simulateDisaster = () => {
      setIsDisaster(true);
      setDisasterData(initialDisasterData[0]); // Choose the first disaster for demo
      sendSmsToAdmin(initialDisasterData[0]);
    };

    const timer = setTimeout(simulateDisaster, 3000); // Trigger after 3 seconds

    return () => clearTimeout(timer);
  }, [initialDisasterData]);

  useEffect(() => {
    if (isDisaster && audioRef.current) {
      audioRef.current.play().catch(() => setAudioError(true));
    }
  }, [isDisaster]);

  const sendSmsToAdmin = async (data) => {
    try {
      await axios.post("https://sih-backend-1.onrender.com/sms/send", {
        phoneNumber: adminContact,
        message: `ALERT: ${data.type} in ${data.location}. ${data.summary}`,
      });
    } catch (error) {
      console.error("Error sending SMS to admin:", error);
    }
  };

  const sendSmsToContacts = async () => {
    if (!disasterData) return;

    const results = [];
    for (const number of emergencyContacts) {
      try {
        const response = await axios.post("https://sih-backend-1.onrender.com/sms/send", {
          phoneNumber: number,
          message: `ALERT: ${disasterData.type} in ${disasterData.location}. ${disasterData.summary}`,
        });

        results.push({
          phoneNumber: number,
          success: response.data.success,
          message: response.data.success ? "Sent successfully" : "Failed to send",
        });
      } catch (error) {
        results.push({
          phoneNumber: number,
          success: false,
          message: "Network error",
        });
      }
    }

    setSmsStatus(results);
  };

  const handleAcknowledge = () => {
    setIsAcknowledged(true);
    sendSmsToContacts();
    
    // Call the onAcknowledge prop with the current disaster data
    if (onAcknowledge) {
      onAcknowledge(disasterData);
    }

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const handleReset = () => {
    setIsDisaster(false);
    setDisasterData(null);
    setIsAcknowledged(false);
    setSmsStatus([]);
  };

  // If no disaster is active, return null
  if (!isDisaster || !disasterData) return null;

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 max-w-md">
      {/* Add Keyword Button */}
      <button
        onClick={() => navigate("/admin/keywords")}
        className="absolute top-2 right-2 bg-blue-600 text-white text-xs py-1 px-2 rounded hover:bg-blue-700"
      >
        Add Keyword
      </button>

      <h2 className="text-xl font-bold text-red-600 mb-2">
        {disasterData.type} Alert
      </h2>
      <p className="text-gray-700">
        <strong>Location:</strong> {disasterData.location}
      </p>
      <p className="text-gray-700">
        <strong>Severity:</strong> {disasterData.severity}
      </p>
      <p className="text-gray-600 italic mb-4">{disasterData.summary}</p>

      {isAcknowledged ? (
        <div className="mt-4 text-green-600">
          <strong>Alert acknowledged. SMS sent to emergency contacts.</strong>
        </div>
      ) : (
        <div className="mt-4 flex justify-between">
          <button
            onClick={handleAcknowledge}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Acknowledge
          </button>
          <button
            onClick={handleReset}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Deny
          </button>
        </div>
      )}

      {/* SMS Status */}
      {smsStatus.length > 0 && (
        <div className="mt-4 bg-gray-50 p-2 rounded">
          <h3 className="text-sm font-bold mb-2">SMS Status</h3>
          {smsStatus.map((status, idx) => (
            <div
              key={idx}
              className={`text-xs ${status.success ? "text-green-600" : "text-red-600"}`}
            >
              {status.phoneNumber}: {status.message}
            </div>
          ))}
        </div>
      )}

      {/* Siren Audio */}
      <audio ref={audioRef} src={sirenAudio} />
      {audioError && (
        <div className="fixed bottom-4 right-4 bg-red-500 text-white p-2 rounded text-sm">
          Could not play siren audio.
        </div>
      )}
    </div>
  );
};

export default DisasterAlert;
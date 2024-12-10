import React, { useState, useEffect } from "react";
import axios from "axios";

const Qrcomponents = ({ studentId }) => {
  const [qrCodeImage, setQrCodeImage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Fetching QR code for Student ID:", studentId);
    
    axios
      .get(`http://127.0.0.1:8000/api/students/${studentId}/qrcode`, { responseType: 'blob' })
      .then((response) => {
        const qrCodeUrl = URL.createObjectURL(response.data);
        console.log("QR Code URL:", qrCodeUrl);
        setQrCodeImage(qrCodeUrl);
      })
      .catch((error) => {
        console.error("Error fetching QR code:", error);
        setError("Could not fetch QR code. Please try again.");
      });
  }, [studentId]);

  if (error) return <p>{error}</p>;
  if (!qrCodeImage) return <p>Loading QR Code...</p>;

  const downloadQrCode = () => {
    const downloadLink = document.createElement("a");
    downloadLink.href = qrCodeImage;
    downloadLink.download = `${studentId}_QR_Code.png`;
    downloadLink.click();
  };

  return (
    <div className="qr-code-container">
      <img src={qrCodeImage} alt="Student QR Code" style={{ width: 200, height: 200 }} />
      <button onClick={downloadQrCode} className="btn-download">
        Download QR Code
      </button>
    </div>
  );
};

export default Qrcomponents;

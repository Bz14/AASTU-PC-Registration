import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Html5Qrcode } from "html5-qrcode";

const fetchQRCode = async (serial_number) => {
  const token = localStorage.getItem("token");
  const response = await axios.get(
    `http://150.40.238.179:8000/api/qrcode/generate/${serial_number}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

const QrCodePage = () => {
  const { serial_number } = useParams();
  const [studentData, setStudentData] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState(null);
  // const qrRef = useRef(null);
  const qrCodeInstance = useRef(null);

  const { data, isLoading } = useQuery({
    queryKey: ["qrCode", serial_number],
    queryFn: () => fetchQRCode(serial_number),
    onSuccess: (data) => {
      console.log("QR Code data:", data);
    },
    onError: (err) => {
      console.error("Error fetching QR code:", err);
      setError("Failed to load QR code.");
    },
  });

  useEffect(() => {
    if (isScanning) {
      qrCodeInstance.current = new Html5Qrcode("qr-reader");
      qrCodeInstance.current
        .start(
          { facingMode: "environment" },
          { fps: 10, qrbox: { width: 250, height: 250 } },
          async (decodedText) => {
            console.log("Scanned QR code data:", decodedText);
            try {
              const response = await axios.get(
                `http://150.40.238.179:8000/api/students/serial/${decodedText}`,
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                }
              );
              console.log("Fetched student data:", response.data);
              if (response.data && Object.keys(response.data).length > 0) {
                setStudentData(response.data);
                setIsScanning(false);
                setError(null);
              } else {
                setError("No student data found.");
                console.warn(
                  "Response data is empty or not valid:",
                  response.data
                );
              }
            } catch (error) {
              console.error("Error fetching student data:", error);
              setError("Failed to fetch student data.");
            }
          },
          (err) => {
            console.error("QR scan error:", err);
            setError("Error reading QR code.");
          }
        )
        .catch((err) => {
          console.error("QR start error:", err);
          setError("Failed to start QR scanner.");
        });
    } else if (qrCodeInstance.current) {
      qrCodeInstance.current.stop().catch((err) => {
        console.error("QR stop error:", err);
      });
    }

    return () => {
      if (qrCodeInstance.current) {
        qrCodeInstance.current.stop().catch((err) => {
          console.error("QR cleanup error:", err);
        });
      }
    };
  }, [isScanning]);

  const downloadQRCode = async () => {
    const fullUrl = `http://150.40.238.179:8000/api/qrcode/image/${serial_number}`;
    try {
      const response = await axios.get(fullUrl, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.download = `QR_${serial_number}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      console.log("Download started for QR code.");
    } catch (error) {
      console.error("Error downloading QR code:", error.message);
      setError("Failed to download QR code.");
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const formData = new FormData();
      formData.append("file", file);
      console.log(formData.get("file"));
      try {
        const response = await axios.post(
          "http://150.40.238.179:8000/api/qrcode/scan",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data) {
          setStudentData(response.data);
          setError(null);
          console.log("Scan Response Data:", response.data);
        } else {
          setError("No data received from the server.");
        }
      } catch (error) {
        console.error(
          "Error scanning QR code:",
          error.response ? error.response.data : error.message
        );
        setError(
          `Failed to scan QR code: ${
            error.response
              ? error.response.data.error || error.response.statusText
              : error.message
          }`
        );
      }
    } else {
      setError("Please upload a valid image file.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[141414] p-4">
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-500">
        QR Code for Student {serial_number}
      </h1>
      {isLoading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {data && (
        <>
          <img
            src={`http://150.40.238.179:8000${data.qrCodeUrl}`}
            alt="QR Code"
            className="mb-4 w-64 h-64"
            onError={() => setError("Failed to load QR code image.")}
          />
          <button
            onClick={downloadQRCode}
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none"
          >
            Download QR Code
          </button>
        </>
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="mt-4 text-gray-800"
      />
      <button
        onClick={() => setIsScanning(!isScanning)}
        className="mt-4 px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none"
      >
        {isScanning ? "Stop Scanning" : "Scan QR Code"}
      </button>
      {isScanning && (
        <div className="mt-4">
          <div id="qr-reader" style={{ width: "300px", height: "300px" }}></div>
        </div>
      )}
      {studentData && (
        <div className="mt-4 bg-white p-6 rounded shadow-md w-full max-w-xl">
          <div className="text-gray-800 mb-3">
            <h1 className="text-gray-800">
              Student Authenticated as:{" "}
              <span className="text-gray-900 ml-2 font-bolder">
                {studentData.student_name}
              </span>
            </h1>
          </div>
          <h2 className="text-lg font-bold mb-2 text-gray-800">
            Student Information
          </h2>
          <table className="table-auto w-full border border-gray-300 rounded-md">
            <tbody>
              <tr>
                <td className="border px-4 py-2 font-semibold text-gray-700 bg-gray-100">
                  ID Number
                </td>
                <td className="border px-4 py-2 text-gray-600">
                  {studentData.student_id}
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-semibold text-gray-700 bg-gray-100">
                  Name
                </td>
                <td className="border px-4 py-2 text-gray-600">
                  {studentData.student_name}
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-semibold text-gray-700 bg-gray-100">
                  PC Serial Number
                </td>
                <td className="border px-4 py-2 text-gray-600">
                  {studentData.serial_number}
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-semibold text-gray-700 bg-gray-100">
                  PC Brand
                </td>
                <td className="border px-4 py-2 text-gray-600">
                  {studentData.pc_brand}
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-semibold text-gray-700 bg-gray-100">
                  PC Color
                </td>
                <td className="border px-4 py-2 text-gray-600">
                  {studentData.pc_color}
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-semibold text-gray-700 bg-gray-100">
                  Phone Number
                </td>
                <td className="border px-4 py-2 text-gray-600">
                  {studentData.phoneNumber}
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-semibold text-gray-700 bg-gray-100">
                  Email
                </td>
                <td className="border px-4 py-2 text-gray-600">
                  {studentData.email}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default QrCodePage;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { QrReader } from "react-qr-reader"; // Import the QR Reader
import QrScanner from "qr-scanner"; // Import QR scanner for image file upload
import ThemeToggler from "../Components/Layout/ThemeToggler";
const QrCodePage = () => {
    const { serial_number } = useParams();
    const [qrCodeUrl, setQrCodeUrl] = useState("");
    const [studentData, setStudentData] = useState(null); // State to hold student data
    const [isScanning, setIsScanning] = useState(false); // State to manage scanning mode
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState(null); // Error state
    console.log("Serial Number from Params:", serial_number); // Add this line

    useEffect(() => {
        if (!serial_number) {
            setError("Serial number is missing.");
            return;
        }
        const fetchQRCode = async () => {
            setLoading(true);
            console.log("Fetching QR code for serial number:", serial_number); // Log serial number

            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/qrcode/generate/${serial_number}`);
                console.log("Response data:", response.data); // Debugging response data

                const qrCodeUrl = `http://127.0.0.1:8000/${response.data.qrCodeUrl}`;
                console.log("QR Code URL:", qrCodeUrl); // Log the URL
                setQrCodeUrl(qrCodeUrl);
                setError(null);
            } catch (error) {
                console.error("Error fetching QR code:", error);
                setError("Failed to load QR code.");
            } finally {
                setLoading(false);
            }
        };
    
        fetchQRCode();
    }, [serial_number]);
    
    const handleScan = async (data) => {
        if (data && typeof data === 'string') {
            console.log("Scanned QR code data:", data);
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/students/serial/${data}`);
                console.log("Fetched student data:", response.data); // Log the complete response data
    
                if (response.data && Object.keys(response.data).length > 0) {
                    setStudentData(response.data);
                    setIsScanning(false);
                    setError(null);
                } else {
                    setError("No student data found.");
                    console.warn("Response data is empty or not valid:", response.data);
                }
            } catch (error) {
                console.error("Error fetching student data:", error);
                setError("Failed to fetch student data.");
            }
        } else {
            console.warn("No valid data scanned.");
        }
    };
    
    
    

    const handleError = (err) => {
        console.error(err);
        setError("Error reading QR code.");
    };

    const downloadQRCode = async () => {
        const fullUrl = `http://127.0.0.1:8000/api/qrcode/image/${serial_number}`;
    
        try {
            const response = await axios.get(fullUrl, { responseType: 'blob' });
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
//send to use

// const sendQrCodeToEmail = async () => {
//     try {
//         const response = await axios.post(`http://127.0.0.1:8000/api/send-qr-code/${serial_number}`);
//         console.log("QR code sent to email:", response.data);///send-qr-code/{studentId}
//         alert("QR code sent to email successfully.");
//     } catch (error) {
//         console.error("Error sending QR code to email:", error.message);
//         setError("Failed to send QR code to email.");
//     }
// };
//
    // Function to handle file upload for QR code
    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
    
        if (file && file.type.startsWith("image/")) {
            const formData = new FormData();
            formData.append("qr_image", file);
    
            try {
                const response = await axios.post("http://127.0.0.1:8000/api/qrcode/scan", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                    
                });

                if (response.data) {
                    setStudentData(response.data);
                    setError(null);
                    console.log("Scan Response Data:", response.data);

                } else {
                    setError("No data received from the server.");
                }
            } catch (error) {
                console.error('Error scanning QR code:', error.response ? error.response.data : error.message);
                if (error.response) {
                    setError(`Failed to scan QR code: ${error.response.data.error || error.response.statusText}`);
                } else {
                    setError("Failed to scan QR code: " + error.message);
                }
            }
        } else {
            setError("Please upload a valid image file.");
        }
    };
    


    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[141414] p-4">
           
            <h1 className="text-2xl font-bold mb-4 text-center text-gray-500">QR Code for Student {serial_number}</h1>
            {loading && <p className="text-gray-500">Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {qrCodeUrl ? (
                <>
                    {console.log(qrCodeUrl)}
                    <img src={qrCodeUrl} alt="QR Code" className="mb-4 w-64 h-64" onError={() => setError("Failed to load QR code image.")} />
                    <button
                        onClick={downloadQRCode}
                        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none"
                    >
                        Download QR Code
                    </button>
                    {/* <button
                        onClick={sendQrCodeToEmail}
                        className="px-4 py-2  mt-3 bg-blue-800 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none"
                    >
      send  to email                 
       </button> */}
                </>
            ) : (
                <p className="text-gray-500">Loading QR code...</p>
            )}

            <input  type="file" accept="image/*" onChange={handleFileUpload} className="mt-4 text-gray-800" />

            <button
                onClick={() => setIsScanning(!isScanning)}
                className="mt-4 px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none"
            >
                {isScanning ? "Stop Scanning" : "Scan QR Code"}
            </button>

            {isScanning && (
                <div className="mt-4">
                    <QrReader
                        delay={300}
                        onError={handleError}
                        onScan={handleScan}
                        style={{ width: "300px" }}
                    />
                </div>
            )}

{studentData && (
                <div className="mt-4 bg-white p-6 rounded shadow-md w-full max-w-xl">
                   <div className="text-gray-800 mb-3"> <h1 className="text-gray-800">Student Authenticated as: <span className="text-gray-900 ml-2 font-bolder">{studentData.student_name}</span></h1></div>
                    <h2 className="text-lg font-bold mb-2 text-gray-800 ">Student Information</h2>
                    <table className="table-auto w-full border border-gray-300 rounded-md">
                        <tbody>
                            <tr>
                                <td className="border px-4 py-2 font-semibold text-gray-700 bg-gray-100">ID Number</td>
                                <td className="border px-4 py-2 text-gray-600">{studentData.student_id}</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2 font-semibold text-gray-700 bg-gray-100">Name</td>
                                <td className="border px-4 py-2 text-gray-600">{studentData.student_name}</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2 font-semibold text-gray-700 bg-gray-100">PC Serial Number</td>
                                <td className="border px-4 py-2 text-gray-600">{studentData.serial_number}</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2 font-semibold text-gray-700 bg-gray-100">PC Brand</td>
                                <td className="border px-4 py-2 text-gray-600">{studentData.pc_brand}</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2 font-semibold text-gray-700 bg-gray-100">PC Color</td>
                                <td className="border px-4 py-2 text-gray-600">{studentData.pc_color}</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2 font-semibold text-gray-700 bg-gray-100">Phone Number</td>
                                <td className="border px-4 py-2 text-gray-600">{studentData.phoneNumber}</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2 font-semibold text-gray-700 bg-gray-100">Email</td>
                                <td className="border px-4 py-2 text-gray-600">{studentData.email}</td>
                            </tr>
                            {/* <tr>
                                <td className="border px-4 py-2 font-semibold text-gray-700 bg-gray-100">Status</td>
                                <td className="border px-4 py-2 text-gray-600">{studentData.status}</td>
                            </tr> */}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default QrCodePage;

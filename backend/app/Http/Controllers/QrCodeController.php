<?php

namespace App\Http\Controllers;
use App\Mail\DynamicQrCodeEmail; // Assuming you have a Mailable for the QR code email
use Illuminate\Support\Facades\Mail;

use Zxing\QrReader;
use Illuminate\Http\Request;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use Illuminate\Support\Facades\Storage;
use App\Models\Student; // Import the Student model

class QrCodeController extends Controller
{
    public function generateQrCode($serial_number)
    {
        try {
            // Trim the serial number to remove whitespace and newline characters
            $serial_number = trim($serial_number);

            // Validate the serial number to prevent issues
            if (empty($serial_number) || !is_string($serial_number)) {
                return response()->json(['error' => 'Invalid serial number'], 400);
            }

            // Generate QR code image as base64
            $qrCodeImage = QrCode::format('png')->size(300)->generate($serial_number);
            $qrCodePath = 'qrcodes/' . $serial_number . '.png';

            $fullPath = public_path($qrCodePath);
            file_put_contents($fullPath, $qrCodeImage);

            $qrCodeUrl = url($qrCodePath);
            \Log::info($qrCodeUrl);

            // Save the QR code to storage
            //Storage::disk('public')->put($qrCodePath, $qrCodeImage);
            //\Log::info($qrCodePath);
            // Generate URL to access the QR code
            //$qrCodeUrl = Storage::url($qrCodePath);
            //\Log::info($qrCodeUrl);

            return response()->json(['qrCodeUrl' => $qrCodePath]);
        } catch (\Exception $e) {
            // Log the error for debugging
            \Log::error('QR Code Generation Error: ' . $e->getMessage());
            return response()->json(['error' => 'Unable to generate QR code', 'details' => $e->getMessage()], 500);
        }
    }

    public function getQRCode($serial_number)
    {
        $qrCodePath = public_path('qrcodes/' . $serial_number . '.png');
        \Log::info($qrCodePath);
        if (file_exists($qrCodePath)) {
            return response()->file($qrCodePath);
        }

        return response()->json(['error' => 'QR code not found'], 404);
    }

    public function scanQrCode(Request $request)
    {
        try {
            if (!$request->hasFile('qr_image') || !$request->file('qr_image')->isValid()) {
                return response()->json(['error' => 'Invalid file upload'], 400);
            }

            $image = $request->file('qr_image');
            $qrReader = new QrReader($image->getRealPath()); // Initialize Zxing's QR reader
            $decodedText = $qrReader->text();

            if (!$decodedText) {
                return response()->json(['error' => 'QR code not detected or unreadable.'], 400);
            }

            // Fetch student data by the decoded serial number
            $student = Student::where('serial_number', $decodedText)->first();

            if (!$student) {
                return response()->json(['error' => 'Student not found'], 404);
            }

            return response()->json($student, 200);
        } catch (\Exception $e) {
            \Log::error('QR Code Scanning Error: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to process QR code', 'details' => $e->getMessage()], 500);
        }
    }

    public function showBySerialNumber($serial_number)
    {
        $student = Student::where('serial_number', $serial_number)->first();

        if (!$student) {
            return response()->json(['error' => 'Student not found'], 404);
        }

        return response()->json($student);
    }
    //email mail
//
}

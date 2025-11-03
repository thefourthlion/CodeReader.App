"use client";

import React, { useState, useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { QRCodeSVG } from "qrcode.react";
import Barcode from "react-barcode";
import { initFirebase } from "@/firebase";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { parseQRCode, ParsedQRCode } from "@/utils/qrParser";
import { QRDisplay } from "@/components/QRDisplay";
import { QRActions } from "@/components/QRActions";

const QRCodeScanner = () => {
    const [data, setData] = useState<string>("No result");
    const [parsedData, setParsedData] = useState<ParsedQRCode | null>(null);
    const [isScanning, setIsScanning] = useState<boolean>(false);
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const [isBarcode, setIsBarcode] = useState<boolean>(false);
    const [barcodeFormat, setBarcodeFormat] = useState<"CODE128" | "EAN13" | "EAN8" | "UPC" | "CODE39" | "ITF14">("CODE128");
    const scannerRef = useRef<Html5Qrcode | null>(null);
    const isInitializing = useRef<boolean>(false);
    const isMounted = useRef<boolean>(true);
    
    const app = initFirebase();
    const auth = getAuth(app);
    const [user, loading] = useAuthState(auth);
    const router = useRouter();

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    // Detect if scanned code is a barcode based on content pattern
    const detectBarcodeType = (decodedText: string): { isBarcode: boolean; format: "CODE128" | "EAN13" | "EAN8" | "UPC" | "CODE39" | "ITF14" } => {
        // QR codes typically have special formatting (URLs, WIFI:, BEGIN:VCARD, etc.)
        const qrPatterns = [
            /^(https?|ftp):\/\//i,          // URLs
            /^mailto:/i,                     // Email
            /^tel:/i,                        // Phone
            /^sms:/i,                        // SMS
            /^geo:/i,                        // Geo location
            /^WIFI:/i,                       // WiFi
            /^BEGIN:VCARD/i,                 // vCard
            /^MECARD:/i,                     // MeCard
            /^BEGIN:VEVENT/i,                // Calendar
            /^bitcoin:/i,                    // Crypto
            /^ethereum:/i,
            /^COUPON:/i,                     // Custom formats
            /^SKU:/i,
        ];

        // Check if it matches any QR pattern
        const isQR = qrPatterns.some(pattern => pattern.test(decodedText));
        
        if (isQR) {
            return { isBarcode: false, format: "CODE128" };
        }

        // Detect barcode format based on content
        const numericOnly = /^[0-9]+$/.test(decodedText);
        const alphanumeric = /^[A-Z0-9\-.$\/+% ]+$/.test(decodedText);
        
        // Common barcode formats
        if (decodedText.length === 13 && numericOnly) {
            return { isBarcode: true, format: "EAN13" };
        } else if (decodedText.length === 8 && numericOnly) {
            return { isBarcode: true, format: "EAN8" };
        } else if (decodedText.length === 12 && numericOnly) {
            return { isBarcode: true, format: "UPC" };
        } else if (decodedText.length === 14 && numericOnly) {
            return { isBarcode: true, format: "ITF14" };
        } else if (alphanumeric) {
            return { isBarcode: true, format: "CODE128" };
        } else if (numericOnly) {
            return { isBarcode: true, format: "CODE128" };
        }

        // Default to barcode if it's simple alphanumeric without QR patterns
        return { isBarcode: true, format: "CODE128" };
    };

    const handleQRCodeDetected = async (decodedText: string) => {
        console.log("Code detected:", decodedText);
        setData(decodedText);
        
        // Detect if it's a barcode or QR code
        const detection = detectBarcodeType(decodedText);
        console.log("Detected format:", detection);
        setIsBarcode(detection.isBarcode);
        setBarcodeFormat(detection.format);
        
        // Parse the QR code (still useful for structured QR data)
        const parsed = parseQRCode(decodedText);
        setParsedData(parsed);
        
        // Temporarily stop scanning to show result
        await stopScanning();
    };
    
    const resetScanner = () => {
        setData("No result");
        setParsedData(null);
        setIsBarcode(false);
        
        // Wait for React to re-render and show the qr-reader div
        setTimeout(() => {
            startScanning();
        }, 100);
    };

    const startScanning = async () => {
        // Prevent multiple simultaneous starts
        if (isInitializing.current) {
            console.log("Scanner already initializing");
            return;
        }

        try {
            isInitializing.current = true;
            console.log("Starting scanner...");

            // Wait for the qr-reader element to be available
            let readerDiv = document.getElementById("qr-reader");
            let attempts = 0;
            while (!readerDiv && attempts < 10) {
                console.log("Waiting for qr-reader element...");
                await new Promise(resolve => setTimeout(resolve, 100));
                readerDiv = document.getElementById("qr-reader");
                attempts++;
            }

            if (!readerDiv) {
                throw new Error("qr-reader element not found after waiting");
            }

            // Clean up any existing scanner instance first
            if (scannerRef.current) {
                try {
                    const state = scannerRef.current.getState();
                    console.log("Existing scanner state:", state);
                    
                    if (state === 1 || state === 2) { // SCANNING or PAUSED
                        console.log("Stopping existing scanner");
                        await scannerRef.current.stop();
                        scannerRef.current.clear();
                    }
                } catch (err) {
                    console.log("Error cleaning up existing scanner:", err);
                }
                scannerRef.current = null;
            }

            // Clear the div to ensure fresh start
            readerDiv.innerHTML = "";

            // Create new scanner instance
            console.log("Creating new Html5Qrcode instance");
            scannerRef.current = new Html5Qrcode("qr-reader");

            // Responsive QR box size based on screen width
            const screenWidth = window.innerWidth;
            const qrBoxSize = Math.min(screenWidth * 0.7, 300);

            const config = {
                fps: 10,
                qrbox: { width: qrBoxSize, height: qrBoxSize },
                aspectRatio: 1.0,
                // Enable multiple barcode formats
                formatsToSupport: [
                    0,  // QR_CODE
                    1,  // AZTEC
                    2,  // CODABAR
                    3,  // CODE_39
                    4,  // CODE_93
                    5,  // CODE_128
                    6,  // DATA_MATRIX
                    7,  // MAXICODE
                    8,  // ITF
                    9,  // EAN_13
                    10, // EAN_8
                    11, // PDF_417
                    12, // RSS_14
                    13, // RSS_EXPANDED
                    14, // UPC_A
                    15, // UPC_E
                    16, // UPC_EAN_EXTENSION
                ],
            };

            console.log("Starting camera with config (QR + Barcodes):", config);
            
            await scannerRef.current.start(
                { facingMode: "environment" },
                config,
                handleQRCodeDetected,
                (errorMessage) => {
                    console.debug("QR Scan Error:", errorMessage);
                }
            );

            console.log("Camera started successfully!");
            if (isMounted.current) {
                setIsScanning(true);
                setData("Scanning...");
            }
        } catch (err: any) {
            console.error("Error starting scanner:", err);
            if (isMounted.current) {
                setData(`Camera error: ${err.message || 'Unable to access camera'}`);
                setIsScanning(false);
            }
        } finally {
            isInitializing.current = false;
        }
    };

    const stopScanning = async () => {
        try {
            if (!scannerRef.current) {
                return;
            }

            // Check scanner state before stopping
            const state = scannerRef.current.getState();
            console.log("Stopping scanner, current state:", state);
            
            if (state === 1 || state === 2) { // SCANNING or PAUSED
                await scannerRef.current.stop();
                console.log("Scanner stopped");
                if (isMounted.current) {
                    setIsScanning(false);
                }
            }
        } catch (err: any) {
            // Silently handle stop errors as they're usually harmless
            console.debug("Stop scanner error:", err.message);
            if (isMounted.current) {
                setIsScanning(false);
            }
        }
    };

    const saveToServer = async () => {
        if (!user) {
            // Redirect to login if not authenticated
            router.push('/pages/login');
            return;
        }

        if (data === "No result" || data === "Scanning... Point camera at QR code" || data === "Initializing camera...") {
            return;
        }

        setIsSaving(true);
        try {
            // Use parsed data for better classification
            const type = parsedData?.type === 'url' ? 'url' : 'text';
            const title = parsedData ? `${parsedData.label}` : null;
            
            const response = await fetch(`${API_URL}/api/QRCode/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: user.uid,
                    data: data,
                    type: type,
                    title: title,
                }),
            });

            if (response.ok) {
                alert('✓ QR Code saved!');
            } else {
                const error = await response.json();
                alert(`Failed to save: ${error.error || 'Unknown error'}`);
            }
        } catch (err: any) {
            console.error('Error saving QR code:', err);
            alert(`Error: ${err.message || 'Failed to save'}`);
        } finally {
            setIsSaving(false);
        }
    };

    useEffect(() => {
        console.log("QRCodeScanner mounted");
        isMounted.current = true;
        
        // Auto-start scanning when component mounts
        const initScanner = async () => {
            console.log("Waiting for DOM to be ready...");
            await new Promise(resolve => setTimeout(resolve, 500)); // Increased delay
            
            const element = document.getElementById("qr-reader");
            console.log("qr-reader element:", element);
            
            if (isMounted.current && element) {
                console.log("Calling startScanning...");
                await startScanning();
            } else {
                console.error("Cannot start scanner - element not found or component unmounted");
            }
        };
        
        initScanner();
        
        return () => {
            console.log("QRCodeScanner unmounting");
            isMounted.current = false;
            isInitializing.current = false;
            
            // Cleanup scanner properly
            if (scannerRef.current) {
                try {
                    const state = scannerRef.current.getState();
                    console.log("Cleanup - scanner state:", state);
                    
                    if (state === 1 || state === 2) { // SCANNING or PAUSED
                        scannerRef.current.stop().then(() => {
                            console.log("Scanner stopped during cleanup");
                            if (scannerRef.current) {
                                scannerRef.current.clear();
                                console.log("Scanner cleared");
                            }
                        }).catch((err) => {
                            console.log("Error during cleanup:", err);
                        });
                    }
                } catch (err) {
                    console.log("Error checking state during cleanup:", err);
                }
            }
            
            // Clear the div contents
            const readerDiv = document.getElementById("qr-reader");
            if (readerDiv) {
                readerDiv.innerHTML = "";
                console.log("qr-reader div cleared");
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const hasResult = parsedData !== null && data !== "No result" && data !== "Scanning... Point camera at QR code" && data !== "Initializing camera...";

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 px-4 py-6">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="relative">
                        <div className="absolute -top-2 -left-2 w-32 h-32 bg-gradient-primary opacity-10 rounded-full blur-3xl"></div>
                        <h1 className="relative text-3xl sm:text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                            QR & Barcode Scanner
                        </h1>
                        <p className="relative text-sm sm:text-base text-foreground/70 mt-2 font-medium">Scan any QR code or barcode</p>
                    </div>
                    {user && (
                        <button 
                            onClick={() => router.push('/pages/qrcodehistory')}
                            className="px-4 py-2 sm:px-6 text-sm sm:text-base rounded-xl border-2 border-primary/30 bg-gradient-to-r from-primary/10 to-secondary/10 text-primary font-semibold hover:from-primary/20 hover:to-secondary/20 hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-glow-primary"
                        >
                            My Codes
                        </button>
                    )}
                </div>

                {/* Camera View / QR Code Display */}
                <div className="relative w-full aspect-square max-w-lg mx-auto rounded-3xl overflow-hidden bg-content1 mb-6 border-2 border-primary/20 shadow-2xl backdrop-blur-sm">
                    {!hasResult ? (
                        <>
                            <div 
                                id="qr-reader" 
                                className="w-full h-full"
                            />
                            {!isScanning && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-content1/80 backdrop-blur-sm">
                                    <div className="w-32 h-32 sm:w-48 sm:h-48 border-2 border-foreground/60 rounded-2xl relative animate-pulse">
                                        <div className="absolute top-0 left-0 w-6 h-6 sm:w-8 sm:h-8 border-l-4 border-t-4 border-foreground rounded-tl-2xl"></div>
                                        <div className="absolute top-0 right-0 w-6 h-6 sm:w-8 sm:h-8 border-r-4 border-t-4 border-foreground rounded-tr-2xl"></div>
                                        <div className="absolute bottom-0 left-0 w-6 h-6 sm:w-8 sm:h-8 border-l-4 border-b-4 border-foreground rounded-bl-2xl"></div>
                                        <div className="absolute bottom-0 right-0 w-6 h-6 sm:w-8 sm:h-8 border-r-4 border-b-4 border-foreground rounded-br-2xl"></div>
                                    </div>
                                    <p className="mt-6 text-sm sm:text-base text-foreground/80 font-medium">{data === "No result" ? "Initializing camera..." : data}</p>
                                    <p className="mt-2 text-xs text-foreground/50">Check browser console for details</p>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-primary/10 via-secondary/10 to-success/10">
                            <div className="bg-white p-4 sm:p-6 rounded-3xl shadow-2xl mb-4 animate-in zoom-in-50 duration-500 max-w-full overflow-hidden border-2 border-primary/20">
                                {isBarcode ? (
                                    <div className="flex items-center justify-center">
                                        <Barcode 
                                            value={data}
                                            format={barcodeFormat}
                                            width={2}
                                            height={100}
                                            displayValue={true}
                                            background="#ffffff"
                                            lineColor="#000000"
                                            margin={10}
                                        />
                                    </div>
                                ) : (
                                    <QRCodeSVG 
                                        value={data}
                                        size={256}
                                        level="H"
                                        includeMargin={true}
                                        className="w-48 h-48 sm:w-64 sm:h-64"
                                    />
                                )}
                            </div>
                            <div className="text-center">
                                <p className="text-xs sm:text-sm font-semibold text-success mb-1 flex items-center justify-center gap-2">
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                                        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M22 4L12 14.01l-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    {isBarcode ? 'Barcode' : 'QR Code'} Scanned Successfully
                                </p>
                                <p className="text-xs text-foreground/60">
                                    {isBarcode ? `Format: ${barcodeFormat}` : 'Generated from scanned data'}
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Result Section */}
                {hasResult && parsedData && (
                    <div className="space-y-4">
                        <div className="border-2 border-primary/20 rounded-3xl p-5 sm:p-7 bg-gradient-to-br from-content1 via-content1 to-primary/5 shadow-xl backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-300">
                            {/* Display parsed QR code */}
                            <QRDisplay parsedData={parsedData} />
                            
                            {/* Action buttons */}
                            <QRActions 
                                parsedData={parsedData}
                                onSave={saveToServer}
                                isSaving={isSaving}
                                isLoggedIn={!!user}
                            />
                        </div>
                        
                        {/* Scan Another Button */}
                        <button 
                            className="w-full h-16 rounded-2xl font-bold text-lg bg-gradient-primary text-primary-foreground hover:shadow-glow-primary transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 shadow-xl"
                            onClick={resetScanner}
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                                <path d="M3 11V3H11V11H3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M13 3H21V11H13V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M3 13H11V21H3V13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M18 13H21V16H18V13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M13 18H16V21H13V18Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M18 18H21V21H18V18Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            Scan Another Code
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default QRCodeScanner;

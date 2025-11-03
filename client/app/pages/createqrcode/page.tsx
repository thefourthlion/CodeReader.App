"use client";

import React, { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import Barcode from "react-barcode";
import { useRouter } from "next/navigation";
import { initFirebase } from "@/firebase";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

type QRType = 'url' | 'text' | 'contact' | 'email' | 'sms' | 'geo' | 'phone' | 'calendar' | 'wifi' | 'barcode';

// Calculate and validate checksum for EAN/UPC formats
const validateChecksum = (value: string, format: 'EAN13' | 'EAN8' | 'UPC'): boolean => {
    if (!/^\d+$/.test(value)) return false;
    
    let length: number;
    if (format === 'EAN13') length = 13;
    else if (format === 'EAN8') length = 8;
    else if (format === 'UPC') length = 12;
    else return true;
    
    if (value.length !== length) return false;
    
    // Extract data digits (all but last)
    const dataDigits = value.slice(0, -1);
    const providedChecksum = parseInt(value.slice(-1));
    
    // Calculate expected checksum
    let sum = 0;
    for (let i = 0; i < dataDigits.length; i++) {
        const digit = parseInt(dataDigits[i]);
        // For EAN/UPC, odd positions (from right, 0-indexed from left) are multiplied by 3
        if ((dataDigits.length - i) % 2 === 0) {
            sum += digit * 3;
        } else {
            sum += digit;
        }
    }
    const expectedChecksum = (10 - (sum % 10)) % 10;
    
    return providedChecksum === expectedChecksum;
};

// Validate barcode value before rendering
const validateBarcode = (
    value: string, 
    format: 'CODE128' | 'EAN13' | 'EAN8' | 'UPC' | 'CODE39' | 'ITF14'
): { isValid: boolean; error?: string } => {
    if (!value || value.trim() === '') {
        return { isValid: false, error: 'Please enter a barcode value' };
    }

    // Check if value contains only digits for numeric formats
    if (['EAN13', 'EAN8', 'UPC', 'ITF14'].includes(format)) {
        if (!/^\d+$/.test(value)) {
            return { isValid: false, error: `${format} requires only digits` };
        }
    }

    // Check length requirements (allow partial input - will catch library errors)
    switch (format) {
        case 'EAN13':
            if (value.length < 12 || value.length > 13) {
                return { isValid: false, error: `EAN-13 requires 12-13 digits (you have ${value.length})` };
            }
            // If 12 digits, checksum will be auto-calculated to 13 digits
            // If 13 digits, validate checksum before rendering
            if (value.length === 13 && !validateChecksum(value, 'EAN13')) {
                return { isValid: false, error: 'Invalid checksum digit. Enter 12 digits to auto-calculate it.' };
            }
            break;
        case 'EAN8':
            if (value.length < 7 || value.length > 8) {
                return { isValid: false, error: `EAN-8 requires 7-8 digits (you have ${value.length})` };
            }
            // If 7 digits, checksum will be auto-calculated to 8 digits
            // If 8 digits, validate checksum before rendering
            if (value.length === 8 && !validateChecksum(value, 'EAN8')) {
                return { isValid: false, error: 'Invalid checksum digit. Enter 7 digits to auto-calculate it.' };
            }
            break;
        case 'UPC':
            if (value.length < 11 || value.length > 12) {
                return { isValid: false, error: `UPC requires 11-12 digits (you have ${value.length})` };
            }
            // If 11 digits, checksum will be auto-calculated to 12 digits
            // If 12 digits, validate checksum before rendering
            if (value.length === 12 && !validateChecksum(value, 'UPC')) {
                return { isValid: false, error: 'Invalid checksum digit. Enter 11 digits to auto-calculate it.' };
            }
            break;
        case 'ITF14':
            if (value.length !== 14) {
                return { isValid: false, error: `ITF-14 requires exactly 14 digits (you have ${value.length})` };
            }
            break;
        case 'CODE39':
            // CODE39: uppercase letters, numbers, and some symbols
            if (!/^[A-Z0-9\-. $\/+%]+$/.test(value)) {
                return { isValid: false, error: 'CODE 39 supports uppercase letters, numbers, and symbols (-. $/+%)' };
            }
            break;
        case 'CODE128':
            // CODE128: supports alphanumeric and extended ASCII
            if (value.length === 0) {
                return { isValid: false, error: 'CODE 128 requires at least one character' };
            }
            break;
    }

    return { isValid: true };
};

// Error boundary component for barcode rendering
const BarcodeRenderer: React.FC<{ 
    value: string; 
    format: 'CODE128' | 'EAN13' | 'EAN8' | 'UPC' | 'CODE39' | 'ITF14';
    onError: (error: string) => void;
}> = ({ value, format, onError }) => {
    // Validate before rendering
    const validation = validateBarcode(value, format);
    
    if (!validation.isValid) {
        // Don't show error for intermediate input states (too short)
        // Only show error message in the input field, not in preview
        if (value.length === 0 || 
            (format === 'EAN13' && value.length < 12) ||
            (format === 'EAN8' && value.length < 7) ||
            (format === 'UPC' && value.length < 11) ||
            (format === 'ITF14' && value.length < 14)) {
            // Too short - show placeholder message
            return (
                <div className="bg-content2/50 border-2 border-dashed border-default-300 rounded-2xl p-6 text-center">
                    <svg className="w-12 h-12 mx-auto mb-3 text-foreground/30" viewBox="0 0 24 24" fill="none">
                        <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                        <path d="M7 8h10M7 12h10M7 16h6" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    <p className="text-foreground/60 font-medium mb-1">Enter barcode value</p>
                    <p className="text-xs text-foreground/40">{validation.error}</p>
                </div>
            );
        }
        
        // Invalid format - show warning
        onError(validation.error || 'Invalid barcode format');
        return (
            <div className="bg-warning/10 border-2 border-warning rounded-2xl p-6 text-center">
                <svg className="w-12 h-12 mx-auto mb-3 text-warning" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <p className="text-warning font-semibold mb-2">Invalid Input</p>
                <p className="text-sm text-warning/80">{validation.error}</p>
            </div>
        );
    }

    // Double-check checksum validation before rendering to prevent library errors
    // This is critical because the library logs console errors we can't catch
    if (format === 'EAN13' || format === 'EAN8' || format === 'UPC') {
        const requiredLength = format === 'EAN13' ? 13 : format === 'EAN8' ? 8 : 12;
        if (value.length === requiredLength && !validateChecksum(value, format)) {
            onError('Invalid checksum digit');
            return (
                <div className="bg-danger/10 border-2 border-danger rounded-2xl p-6 text-center">
                    <svg className="w-12 h-12 mx-auto mb-3 text-danger" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                        <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    <p className="text-danger font-semibold mb-2">Invalid Checksum</p>
                    <p className="text-sm text-danger/80 mb-2">The checksum digit is incorrect.</p>
                    <p className="text-xs text-danger/70 mt-2 font-medium">
                        {format === 'EAN13' && 'Try entering 12 digits to auto-calculate it.'}
                        {format === 'EAN8' && 'Try entering 7 digits to auto-calculate it.'}
                        {format === 'UPC' && 'Try entering 11 digits to auto-calculate it.'}
                    </p>
                </div>
            );
        }
    }

    // Render barcode - validation already passed, so this should work
    // The library might still log errors to console, but we prevent rendering invalid data
    return (
        <div className="bg-white p-6 rounded-2xl shadow-2xl">
            <div id="generated-barcode">
                <Barcode 
                    value={value}
                    format={format}
                    width={2}
                    height={100}
                    displayValue={true}
                    background="#ffffff"
                    lineColor="#000000"
                    margin={10}
                />
            </div>
        </div>
    );
};

const CreateQRCode = () => {
    const router = useRouter();
    const [qrType, setQrType] = useState<QRType>('url');
    const [qrValue, setQrValue] = useState<string>('');
    const [isSaving, setIsSaving] = useState<boolean>(false);
    
    const app = initFirebase();
    const auth = getAuth(app);
    const [user, loading] = useAuthState(auth);
    
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    
    // URL fields
    const [url, setUrl] = useState<string>('');
    
    // Text fields
    const [text, setText] = useState<string>('');
    
    // Contact fields
    const [contactName, setContactName] = useState<string>('');
    const [contactPhone, setContactPhone] = useState<string>('');
    const [contactEmail, setContactEmail] = useState<string>('');
    const [contactOrg, setContactOrg] = useState<string>('');
    const [contactAddress, setContactAddress] = useState<string>('');
    
    // Email fields
    const [emailTo, setEmailTo] = useState<string>('');
    const [emailSubject, setEmailSubject] = useState<string>('');
    const [emailBody, setEmailBody] = useState<string>('');
    
    // SMS fields
    const [smsNumber, setSmsNumber] = useState<string>('');
    const [smsMessage, setSmsMessage] = useState<string>('');
    
    // Geo fields
    const [geoLat, setGeoLat] = useState<string>('');
    const [geoLong, setGeoLong] = useState<string>('');
    
    // Phone fields
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    
    // Calendar fields
    const [calendarTitle, setCalendarTitle] = useState<string>('');
    const [calendarStart, setCalendarStart] = useState<string>('');
    const [calendarEnd, setCalendarEnd] = useState<string>('');
    const [calendarLocation, setCalendarLocation] = useState<string>('');
    const [calendarDescription, setCalendarDescription] = useState<string>('');
    
    // WiFi fields
    const [wifiSSID, setWifiSSID] = useState<string>('');
    const [wifiPassword, setWifiPassword] = useState<string>('');
    const [wifiSecurity, setWifiSecurity] = useState<string>('WPA');
    const [wifiHidden, setWifiHidden] = useState<boolean>(false);
    
    // Barcode fields
    const [barcodeValue, setBarcodeValue] = useState<string>('');
    const [barcodeFormat, setBarcodeFormat] = useState<'CODE128' | 'EAN13' | 'EAN8' | 'UPC' | 'CODE39' | 'ITF14'>('CODE128');
    const [barcodeError, setBarcodeError] = useState<string>('');

    // Calculate EAN/UPC checksum
    const calculateChecksum = (value: string, length: number): string => {
        if (value.length !== length - 1) return value;
        
        let sum = 0;
        for (let i = 0; i < value.length; i++) {
            const digit = parseInt(value[i]);
            // For EAN/UPC, odd positions (from right) are multiplied by 3
            if ((value.length - i) % 2 === 0) {
                sum += digit * 3;
            } else {
                sum += digit;
            }
        }
        const checksum = (10 - (sum % 10)) % 10;
        return value + checksum;
    };

    const generateQRValue = () => {
        let value = '';
        setBarcodeError('');
        
        switch (qrType) {
            case 'url':
                value = url;
                break;
                
            case 'text':
                value = text;
                break;
                
            case 'contact':
                value = `BEGIN:VCARD\nVERSION:3.0\nFN:${contactName}\nTEL:${contactPhone}\nEMAIL:${contactEmail}\nORG:${contactOrg}\nADR:${contactAddress}\nEND:VCARD`;
                break;
                
            case 'email':
                value = `mailto:${emailTo}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
                break;
                
            case 'sms':
                value = `sms:${smsNumber}?body=${encodeURIComponent(smsMessage)}`;
                break;
                
            case 'geo':
                value = `geo:${geoLat},${geoLong}`;
                break;
                
            case 'phone':
                value = `tel:${phoneNumber}`;
                break;
                
            case 'calendar':
                const startDate = calendarStart.replace(/[-:]/g, '');
                const endDate = calendarEnd.replace(/[-:]/g, '');
                value = `BEGIN:VEVENT\nSUMMARY:${calendarTitle}\nDTSTART:${startDate}\nDTEND:${endDate}\nLOCATION:${calendarLocation}\nDESCRIPTION:${calendarDescription}\nEND:VEVENT`;
                break;
                
            case 'wifi':
                value = `WIFI:T:${wifiSecurity};S:${wifiSSID};P:${wifiPassword};H:${wifiHidden};;`;
                break;
                
            case 'barcode':
                // Auto-calculate checksum for EAN/UPC if needed
                if (barcodeFormat === 'EAN13' && barcodeValue.length === 12) {
                    value = calculateChecksum(barcodeValue, 13);
                } else if (barcodeFormat === 'EAN8' && barcodeValue.length === 7) {
                    value = calculateChecksum(barcodeValue, 8);
                } else if (barcodeFormat === 'UPC' && barcodeValue.length === 11) {
                    value = calculateChecksum(barcodeValue, 12);
                } else {
                    value = barcodeValue;
                }
                break;
        }
        
        setQrValue(value);
    };

    const downloadQR = () => {
        const elementId = qrType === 'barcode' ? 'generated-barcode' : 'generated-qr-code';
        let element = document.getElementById(elementId);
        if (!element) return;
        
        // If it's a barcode, we need to get the SVG child element
        let svg: Element = element;
        if (qrType === 'barcode') {
            const svgChild = element.querySelector('svg');
            if (!svgChild) return;
            svg = svgChild;
        }
        
        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx?.drawImage(img, 0, 0);
            const pngFile = canvas.toDataURL('image/png');
            
            const downloadLink = document.createElement('a');
            downloadLink.download = `${qrType === 'barcode' ? 'barcode' : 'qrcode'}-${qrType}-${Date.now()}.png`;
            downloadLink.href = pngFile;
            downloadLink.click();
        };
        
        img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(qrValue);
        alert('✓ QR data copied to clipboard!');
    };

    const saveToServer = async () => {
        if (!user) {
            // Redirect to login if not authenticated
            if (window.confirm('You need to be logged in to save QR codes. Go to login page?')) {
                router.push('/pages/login');
            }
            return;
        }

        if (!qrValue) {
            alert('⚠️ Please fill in the details to generate a QR code first.');
            return;
        }

        setIsSaving(true);
        try {
            // Determine the type label for the title
            const typeLabel = qrTypes.find(t => t.id === qrType)?.label || qrType;
            let title = `${typeLabel} QR Code`;
            
            // Create more descriptive titles based on type
            if (qrType === 'url' && url) {
                title = `URL: ${url.substring(0, 50)}${url.length > 50 ? '...' : ''}`;
            } else if (qrType === 'text' && text) {
                title = `Text: ${text.substring(0, 50)}${text.length > 50 ? '...' : ''}`;
            } else if (qrType === 'contact' && contactName) {
                title = `Contact: ${contactName}`;
            } else if (qrType === 'email' && emailTo) {
                title = `Email: ${emailTo}`;
            } else if (qrType === 'sms' && smsNumber) {
                title = `SMS: ${smsNumber}`;
            } else if (qrType === 'phone' && phoneNumber) {
                title = `Phone: ${phoneNumber}`;
            } else if (qrType === 'wifi' && wifiSSID) {
                title = `WiFi: ${wifiSSID}`;
            } else if (qrType === 'calendar' && calendarTitle) {
                title = `Event: ${calendarTitle}`;
            } else if (qrType === 'geo') {
                title = `Location: ${geoLat}, ${geoLong}`;
            } else if (qrType === 'barcode' && barcodeValue) {
                title = `Barcode (${barcodeFormat}): ${barcodeValue.substring(0, 30)}${barcodeValue.length > 30 ? '...' : ''}`;
            }
            
            const response = await fetch(`${API_URL}/api/QRCode/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: user.uid,
                    data: qrValue,
                    type: qrType === 'url' ? 'url' : 'text',
                    title: title,
                }),
            });

            if (response.ok) {
                alert('✓ QR Code saved successfully!');
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

    React.useEffect(() => {
        generateQRValue();
    }, [qrType, url, text, contactName, contactPhone, contactEmail, contactOrg, contactAddress, 
        emailTo, emailSubject, emailBody, smsNumber, smsMessage, geoLat, geoLong, 
        phoneNumber, calendarTitle, calendarStart, calendarEnd, calendarLocation, 
        calendarDescription, wifiSSID, wifiPassword, wifiSecurity, wifiHidden, 
        barcodeValue, barcodeFormat]);

    const qrTypes = [
        { id: 'url', label: 'URL', icon: '🔗' },
        { id: 'text', label: 'Text', icon: '📝' },
        { id: 'contact', label: 'Contact', icon: '👤' },
        { id: 'email', label: 'Email', icon: '📧' },
        { id: 'sms', label: 'SMS', icon: '💬' },
        { id: 'geo', label: 'Location', icon: '📍' },
        { id: 'phone', label: 'Phone', icon: '📞' },
        { id: 'calendar', label: 'Calendar', icon: '📅' },
        { id: 'wifi', label: 'WiFi', icon: '📶' },
        { id: 'barcode', label: 'Barcode', icon: '📊' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 px-4 py-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="relative">
                        <div className="absolute -top-2 -left-2 w-32 h-32 bg-gradient-primary opacity-10 rounded-full blur-3xl"></div>
                        <h1 className="relative text-3xl sm:text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                            Create QR Code & Barcode
                        </h1>
                        <p className="relative text-sm sm:text-base text-foreground/70 mt-2 font-medium">
                            Generate custom QR codes and barcodes for any purpose
                        </p>
                    </div>
                    <button 
                        onClick={() => router.push('/pages/qrcode')}
                        className="px-4 py-2 sm:px-6 text-sm sm:text-base rounded-xl border-2 border-primary/30 bg-gradient-to-r from-primary/10 to-secondary/10 text-primary font-semibold hover:from-primary/20 hover:to-secondary/20 hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-glow-primary"
                    >
                        ← Back to Scan
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left Column - Type Selection & Form */}
                    <div className="space-y-6">
                        {/* Type Selector */}
                        <div className="border-2 border-primary/20 rounded-3xl p-5 sm:p-7 bg-gradient-to-br from-content1 via-content1 to-primary/5 shadow-xl backdrop-blur-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-1 h-8 bg-gradient-primary rounded-full"></div>
                                <h2 className="text-xl font-bold text-foreground">Select QR Type</h2>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                                {qrTypes.map((type) => (
                                    <button
                                        key={type.id}
                                        onClick={() => setQrType(type.id as QRType)}
                                        className={`p-4 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-2 transform hover:scale-105 ${
                                            qrType === type.id
                                                ? 'border-primary bg-gradient-primary text-primary-foreground shadow-glow-primary'
                                                : 'border-primary/20 bg-content2 text-foreground hover:bg-gradient-to-br hover:from-primary/10 hover:to-secondary/10 hover:border-primary/40'
                                        }`}
                                    >
                                        <span className="text-3xl">{type.icon}</span>
                                        <span className={`text-xs font-semibold ${qrType === type.id ? 'text-primary-foreground' : ''}`}>{type.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Form Fields */}
                        <div className="border-2 border-primary/20 rounded-3xl p-5 sm:p-7 bg-gradient-to-br from-content1 via-content1 to-secondary/5 shadow-xl backdrop-blur-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-1 h-8 bg-gradient-secondary rounded-full"></div>
                                <h2 className="text-xl font-bold text-foreground">Enter Details</h2>
                            </div>
                            
                            <div className="space-y-4">
                                {qrType === 'url' && (
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">Website URL</label>
                                        <input
                                            type="url"
                                            value={url}
                                            onChange={(e) => setUrl(e.target.value)}
                                            placeholder="https://example.com"
                                            className="w-full px-4 py-3 rounded-xl border-2 border-primary/20 bg-content2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 hover:border-primary/40"
                                        />
                                    </div>
                                )}

                                {qrType === 'text' && (
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">Text Content</label>
                                        <textarea
                                            value={text}
                                            onChange={(e) => setText(e.target.value)}
                                            placeholder="Enter any text..."
                                            rows={6}
                                            className="w-full px-4 py-3 rounded-xl border-2 border-primary/20 bg-content2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 hover:border-primary/40 resize-none"
                                        />
                                    </div>
                                )}

                                {qrType === 'contact' && (
                                    <>
                                        <div>
                                            <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                                            <input
                                                type="text"
                                                value={contactName}
                                                onChange={(e) => setContactName(e.target.value)}
                                                placeholder="John Doe"
                                                className="w-full px-4 py-3 rounded-xl border-2 border-primary/20 bg-content2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 hover:border-primary/40"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                                            <input
                                                type="tel"
                                                value={contactPhone}
                                                onChange={(e) => setContactPhone(e.target.value)}
                                                placeholder="+1234567890"
                                                className="w-full px-4 py-3 rounded-xl border-2 border-primary/20 bg-content2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 hover:border-primary/40"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                                            <input
                                                type="email"
                                                value={contactEmail}
                                                onChange={(e) => setContactEmail(e.target.value)}
                                                placeholder="john@example.com"
                                                className="w-full px-4 py-3 rounded-xl border-2 border-primary/20 bg-content2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 hover:border-primary/40"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-foreground mb-2">Organization</label>
                                            <input
                                                type="text"
                                                value={contactOrg}
                                                onChange={(e) => setContactOrg(e.target.value)}
                                                placeholder="Company Name"
                                                className="w-full px-4 py-3 rounded-xl border-2 border-primary/20 bg-content2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 hover:border-primary/40"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-foreground mb-2">Address</label>
                                            <input
                                                type="text"
                                                value={contactAddress}
                                                onChange={(e) => setContactAddress(e.target.value)}
                                                placeholder="123 Main St, City, Country"
                                                className="w-full px-4 py-3 rounded-xl border-2 border-primary/20 bg-content2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 hover:border-primary/40"
                                            />
                                        </div>
                                    </>
                                )}

                                {qrType === 'email' && (
                                    <>
                                        <div>
                                            <label className="block text-sm font-medium text-foreground mb-2">Recipient Email</label>
                                            <input
                                                type="email"
                                                value={emailTo}
                                                onChange={(e) => setEmailTo(e.target.value)}
                                                placeholder="recipient@example.com"
                                                className="w-full px-4 py-3 rounded-xl border-2 border-primary/20 bg-content2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 hover:border-primary/40"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-foreground mb-2">Subject</label>
                                            <input
                                                type="text"
                                                value={emailSubject}
                                                onChange={(e) => setEmailSubject(e.target.value)}
                                                placeholder="Email subject"
                                                className="w-full px-4 py-3 rounded-xl border-2 border-primary/20 bg-content2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 hover:border-primary/40"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                                            <textarea
                                                value={emailBody}
                                                onChange={(e) => setEmailBody(e.target.value)}
                                                placeholder="Email message..."
                                                rows={4}
                                                className="w-full px-4 py-3 rounded-xl border-2 border-primary/20 bg-content2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 hover:border-primary/40 resize-none"
                                            />
                                        </div>
                                    </>
                                )}

                                {qrType === 'sms' && (
                                    <>
                                        <div>
                                            <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
                                            <input
                                                type="tel"
                                                value={smsNumber}
                                                onChange={(e) => setSmsNumber(e.target.value)}
                                                placeholder="+1234567890"
                                                className="w-full px-4 py-3 rounded-xl border-2 border-primary/20 bg-content2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 hover:border-primary/40"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                                            <textarea
                                                value={smsMessage}
                                                onChange={(e) => setSmsMessage(e.target.value)}
                                                placeholder="SMS message..."
                                                rows={4}
                                                className="w-full px-4 py-3 rounded-xl border-2 border-primary/20 bg-content2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 hover:border-primary/40 resize-none"
                                            />
                                        </div>
                                    </>
                                )}

                                {qrType === 'geo' && (
                                    <>
                                        <div>
                                            <label className="block text-sm font-medium text-foreground mb-2">Latitude</label>
                                            <input
                                                type="text"
                                                value={geoLat}
                                                onChange={(e) => setGeoLat(e.target.value)}
                                                placeholder="37.7749"
                                                className="w-full px-4 py-3 rounded-xl border-2 border-primary/20 bg-content2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 hover:border-primary/40"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-foreground mb-2">Longitude</label>
                                            <input
                                                type="text"
                                                value={geoLong}
                                                onChange={(e) => setGeoLong(e.target.value)}
                                                placeholder="-122.4194"
                                                className="w-full px-4 py-3 rounded-xl border-2 border-primary/20 bg-content2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 hover:border-primary/40"
                                            />
                                        </div>
                                    </>
                                )}

                                {qrType === 'phone' && (
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
                                        <input
                                            type="tel"
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                            placeholder="+1234567890"
                                            className="w-full px-4 py-3 rounded-xl border-2 border-primary/20 bg-content2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 hover:border-primary/40"
                                        />
                                    </div>
                                )}

                                {qrType === 'calendar' && (
                                    <>
                                        <div>
                                            <label className="block text-sm font-medium text-foreground mb-2">Event Title</label>
                                            <input
                                                type="text"
                                                value={calendarTitle}
                                                onChange={(e) => setCalendarTitle(e.target.value)}
                                                placeholder="Meeting with Team"
                                                className="w-full px-4 py-3 rounded-xl border-2 border-primary/20 bg-content2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 hover:border-primary/40"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-foreground mb-2">Start Date & Time</label>
                                            <input
                                                type="datetime-local"
                                                value={calendarStart}
                                                onChange={(e) => setCalendarStart(e.target.value)}
                                                className="w-full px-4 py-3 rounded-xl border-2 border-primary/20 bg-content2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 hover:border-primary/40"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-foreground mb-2">End Date & Time</label>
                                            <input
                                                type="datetime-local"
                                                value={calendarEnd}
                                                onChange={(e) => setCalendarEnd(e.target.value)}
                                                className="w-full px-4 py-3 rounded-xl border-2 border-primary/20 bg-content2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 hover:border-primary/40"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-foreground mb-2">Location</label>
                                            <input
                                                type="text"
                                                value={calendarLocation}
                                                onChange={(e) => setCalendarLocation(e.target.value)}
                                                placeholder="Conference Room A"
                                                className="w-full px-4 py-3 rounded-xl border-2 border-primary/20 bg-content2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 hover:border-primary/40"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-foreground mb-2">Description</label>
                                            <textarea
                                                value={calendarDescription}
                                                onChange={(e) => setCalendarDescription(e.target.value)}
                                                placeholder="Event details..."
                                                rows={3}
                                                className="w-full px-4 py-3 rounded-xl border-2 border-primary/20 bg-content2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 hover:border-primary/40 resize-none"
                                            />
                                        </div>
                                    </>
                                )}

                                {qrType === 'wifi' && (
                                    <>
                                        <div>
                                            <label className="block text-sm font-medium text-foreground mb-2">Network Name (SSID)</label>
                                            <input
                                                type="text"
                                                value={wifiSSID}
                                                onChange={(e) => setWifiSSID(e.target.value)}
                                                placeholder="MyWiFiNetwork"
                                                className="w-full px-4 py-3 rounded-xl border-2 border-primary/20 bg-content2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 hover:border-primary/40"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-foreground mb-2">Password</label>
                                            <input
                                                type="text"
                                                value={wifiPassword}
                                                onChange={(e) => setWifiPassword(e.target.value)}
                                                placeholder="password123"
                                                className="w-full px-4 py-3 rounded-xl border-2 border-primary/20 bg-content2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 hover:border-primary/40"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-foreground mb-2">Security Type</label>
                                            <select
                                                value={wifiSecurity}
                                                onChange={(e) => setWifiSecurity(e.target.value)}
                                                className="w-full px-4 py-3 rounded-xl border-2 border-primary/20 bg-content2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 hover:border-primary/40"
                                            >
                                                <option value="WPA">WPA/WPA2</option>
                                                <option value="WEP">WEP</option>
                                                <option value="nopass">None (Open)</option>
                                            </select>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="checkbox"
                                                id="wifi-hidden"
                                                checked={wifiHidden}
                                                onChange={(e) => setWifiHidden(e.target.checked)}
                                                className="w-5 h-5 rounded border-default-300 text-primary focus:ring-2 focus:ring-primary"
                                            />
                                            <label htmlFor="wifi-hidden" className="text-sm font-medium text-foreground">Hidden Network</label>
                                        </div>
                                    </>
                                )}

                                {qrType === 'barcode' && (
                                    <>
                                        <div>
                                            <label className="block text-sm font-medium text-foreground mb-2">Barcode Format</label>
                                            <select
                                                value={barcodeFormat}
                                                onChange={(e) => {
                                                    setBarcodeFormat(e.target.value as any);
                                                    setBarcodeError('');
                                                }}
                                                className="w-full px-4 py-3 rounded-xl border-2 border-primary/20 bg-content2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 hover:border-primary/40"
                                            >
                                                <option value="CODE128">CODE 128 (Alphanumeric)</option>
                                                <option value="EAN13">EAN-13 (13 digits)</option>
                                                <option value="EAN8">EAN-8 (8 digits)</option>
                                                <option value="UPC">UPC (12 digits)</option>
                                                <option value="CODE39">CODE 39 (Alphanumeric)</option>
                                                <option value="ITF14">ITF-14 (14 digits)</option>
                                            </select>
                                            <p className="text-xs text-foreground/50 mt-2">
                                                {barcodeFormat === 'CODE128' && 'Supports numbers, letters, and symbols'}
                                                {barcodeFormat === 'EAN13' && 'Enter 12 or 13 digits. Checksum will be auto-calculated if you enter 12.'}
                                                {barcodeFormat === 'EAN8' && 'Enter 7 or 8 digits. Checksum will be auto-calculated if you enter 7.'}
                                                {barcodeFormat === 'UPC' && 'Enter 11 or 12 digits. Checksum will be auto-calculated if you enter 11.'}
                                                {barcodeFormat === 'CODE39' && 'Supports uppercase letters and numbers'}
                                                {barcodeFormat === 'ITF14' && 'Enter exactly 14 digits (e.g., 12345678901234)'}
                                            </p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-foreground mb-2">Barcode Value</label>
                                            <input
                                                type="text"
                                                value={barcodeValue}
                                                onChange={(e) => {
                                                    setBarcodeValue(e.target.value);
                                                    setBarcodeError('');
                                                }}
                                                placeholder={
                                                    barcodeFormat === 'CODE128' ? 'ABC123' :
                                                    barcodeFormat === 'EAN13' ? '123456789012 (checksum auto-added)' :
                                                    barcodeFormat === 'EAN8' ? '1234567 (checksum auto-added)' :
                                                    barcodeFormat === 'UPC' ? '12345678901 (checksum auto-added)' :
                                                    barcodeFormat === 'CODE39' ? 'ABC123' :
                                                    '12345678901234'
                                                }
                                                className="w-full px-4 py-3 rounded-lg border border-default-300 bg-content2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm"
                                            />
                                            {qrValue && qrValue !== barcodeValue && !barcodeError && (
                                                <p className="text-xs text-success mt-2">
                                                    ✓ Checksum calculated: <span className="font-mono font-bold">{qrValue}</span>
                                                </p>
                                            )}
                                            {barcodeError && (
                                                <div className="mt-3 p-3 bg-danger/10 border border-danger rounded-lg">
                                                    <p className="text-xs text-danger font-medium">⚠️ {barcodeError}</p>
                                                    <p className="text-xs text-danger/70 mt-1">
                                                        {barcodeFormat === 'EAN13' && 'Try entering 12 digits to auto-calculate the checksum'}
                                                        {barcodeFormat === 'EAN8' && 'Try entering 7 digits to auto-calculate the checksum'}
                                                        {barcodeFormat === 'UPC' && 'Try entering 11 digits to auto-calculate the checksum'}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - QR Code Preview */}
                    <div className="space-y-6">
                        <div className="border-2 border-primary/20 rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-content1 via-content1 to-primary/5 shadow-xl backdrop-blur-sm sticky top-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-1 h-8 bg-gradient-success rounded-full"></div>
                                <h2 className="text-xl font-bold text-foreground">
                                    {qrType === 'barcode' ? 'Barcode Preview' : 'QR Code Preview'}
                                </h2>
                            </div>
                            
                            {qrValue ? (
                                <div className="space-y-6">
                                    <div className="flex items-center justify-center bg-gradient-to-br from-primary/10 via-secondary/10 to-success/10 rounded-3xl p-8 border-2 border-primary/20 shadow-lg">
                                        {qrType === 'barcode' ? (
                                            <BarcodeRenderer 
                                                value={qrValue} 
                                                format={barcodeFormat}
                                                onError={(error) => setBarcodeError(error)}
                                            />
                                        ) : (
                                            <div className="bg-white p-6 rounded-2xl shadow-2xl">
                                                <QRCodeSVG 
                                                    id="generated-qr-code"
                                                    value={qrValue}
                                                    size={256}
                                                    level="H"
                                                    includeMargin={true}
                                                />
                                            </div>
                                        )}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="space-y-3">
                                        <div className="grid grid-cols-2 gap-3">
                                            <button
                                                onClick={downloadQR}
                                                className="h-14 rounded-2xl font-bold bg-gradient-primary text-primary-foreground hover:shadow-glow-primary transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg"
                                            >
                                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                                                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                                Download
                                            </button>
                                            <button
                                                onClick={copyToClipboard}
                                                className="h-14 rounded-2xl font-bold border-2 border-primary/40 bg-gradient-to-r from-primary/10 to-secondary/10 text-primary hover:from-primary/20 hover:to-secondary/20 hover:border-primary/60 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg"
                                            >
                                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                                                    <path d="M8 4v12a2 2 0 002 2h8a2 2 0 002-2V7.242a2 2 0 00-.602-1.43L16.083 2.57A2 2 0 0014.685 2H10a2 2 0 00-2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                    <path d="M16 18v2a2 2 0 01-2 2H6a2 2 0 01-2-2V9a2 2 0 012-2h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                                Copy Data
                                            </button>
                                        </div>
                                        
                                        {/* Save Button */}
                                        <button
                                            onClick={saveToServer}
                                            disabled={isSaving}
                                            className="w-full h-14 rounded-2xl font-bold bg-gradient-success text-success-foreground hover:shadow-glow-success transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
                                        >
                                            {isSaving ? (
                                                <>
                                                    <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                                                    </svg>
                                                    Saving...
                                                </>
                                            ) : (
                                                <>
                                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                                                        <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                        <path d="M17 21v-8H7v8M7 3v5h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                    {user ? 'Save to Account' : 'Login to Save'}
                                                </>
                                            )}
                                        </button>
                                        
                                        {user && (
                                            <p className="text-xs text-center text-foreground/50">
                                                Saved QR codes appear in your History
                                            </p>
                                        )}
                                    </div>

                                    {/* Raw Data Display */}
                                    <div className="bg-content2 rounded-xl p-4">
                                        <p className="text-xs font-semibold text-foreground/60 uppercase mb-2">
                                            {qrType === 'barcode' ? 'Raw Barcode Data' : 'Raw QR Data'}
                                        </p>
                                        <p className="text-xs text-foreground font-mono break-all leading-relaxed max-h-32 overflow-y-auto">
                                            {qrValue}
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-20 text-center">
                                    <div className="relative w-40 h-40 rounded-3xl border-2 border-dashed border-primary/30 bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center mb-6 animate-pulse">
                                        <div className="absolute inset-0 bg-gradient-primary opacity-5 rounded-3xl blur-xl"></div>
                                        <svg className="relative w-20 h-20 text-primary/40" viewBox="0 0 24 24" fill="none">
                                            <path d="M3 11V3H11V11H3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M13 3H21V11H13V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M3 13H11V21H3V13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M18 13H21V16H18V13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M13 18H16V21H13V18Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M18 18H21V21H18V18Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                    <p className="text-foreground/70 font-bold text-lg">Fill in the details above</p>
                                    <p className="text-foreground/50 text-sm mt-2 font-medium">
                                        Your {qrType === 'barcode' ? 'barcode' : 'QR code'} will appear here ✨
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateQRCode;

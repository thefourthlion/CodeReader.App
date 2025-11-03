"use client";

import React, { useState, useEffect } from "react";
import { initFirebase } from "@/firebase";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { parseQRCode } from "@/utils/qrParser";
import { QRIcon } from "@/components/QRIcons";

interface QRCodeData {
    id: number;
    userId: string;
    data: string;
    type: 'url' | 'text';
    title: string | null;
    createdAt: string;
    updatedAt: string;
}

const QRCodeHistory = () => {
    const [qrCodes, setQrCodes] = useState<QRCodeData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    // Filters and search
    const [activeTab, setActiveTab] = useState<'all' | 'created' | 'scanned'>('all');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filterType, setFilterType] = useState<string>('all');
    const [sortBy, setSortBy] = useState<'date-desc' | 'date-asc' | 'type'>('date-desc');
    
    const app = initFirebase();
    const auth = getAuth(app);
    const [user, authLoading] = useAuthState(auth);
    const router = useRouter();

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/pages/login');
        }
    }, [user, authLoading, router]);

    useEffect(() => {
        if (user) {
            fetchQRCodes();
        }
    }, [user]);

    const fetchQRCodes = async () => {
        if (!user) return;
        
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/api/QRCode/read?userId=${user.uid}&limit=100`);
            
            if (response.ok) {
                const result = await response.json();
                setQrCodes(result.data);
            } else {
                setError('Failed to load QR codes');
            }
        } catch (err: any) {
            console.error('Error fetching QR codes:', err);
            setError(err.message || 'Failed to load QR codes');
        } finally {
            setLoading(false);
        }
    };

    const deleteQRCode = async (id: number) => {
        if (!confirm('Delete this QR code?')) return;
        
        try {
            const response = await fetch(`${API_URL}/api/QRCode/delete/${id}`, {
                method: 'DELETE',
            });
            
            if (response.ok) {
                setQrCodes(qrCodes.filter(qr => qr.id !== id));
                alert('✓ Deleted successfully');
            } else {
                alert('Failed to delete');
            }
        } catch (err) {
            console.error('Error deleting QR code:', err);
            alert('Error deleting QR code');
        }
    };

    const shareQRCode = async (data: string) => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'QR Code Result',
                    text: data,
                });
            } catch (err) {
                console.log('Error sharing:', err);
            }
        } else {
            navigator.clipboard.writeText(data);
            alert('✓ Copied to clipboard!');
        }
    };

    // Determine if QR code was created or scanned based on title pattern
    const isCreatedQRCode = (qr: QRCodeData): boolean => {
        if (!qr.title) return false;
        const createdPrefixes = ['URL:', 'Text:', 'Contact:', 'Email:', 'SMS:', 'Phone:', 'WiFi:', 'Event:', 'Location:'];
        return createdPrefixes.some(prefix => qr.title?.startsWith(prefix));
    };

    // Filter and sort QR codes
    const getFilteredAndSortedQRCodes = () => {
        let filtered = [...qrCodes];

        // Tab filter (created vs scanned)
        if (activeTab === 'created') {
            filtered = filtered.filter(qr => isCreatedQRCode(qr));
        } else if (activeTab === 'scanned') {
            filtered = filtered.filter(qr => !isCreatedQRCode(qr));
        }

        // Search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(qr => 
                qr.data.toLowerCase().includes(query) ||
                qr.title?.toLowerCase().includes(query)
            );
        }

        // Type filter
        if (filterType !== 'all') {
            filtered = filtered.filter(qr => {
                const parsed = parseQRCode(qr.data);
                return parsed.type === filterType;
            });
        }

        // Sort
        filtered.sort((a, b) => {
            if (sortBy === 'date-desc') {
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            } else if (sortBy === 'date-asc') {
                return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            } else if (sortBy === 'type') {
                const typeA = parseQRCode(a.data).type;
                const typeB = parseQRCode(b.data).type;
                return typeA.localeCompare(typeB);
            }
            return 0;
        });

        return filtered;
    };

    const filteredQRCodes = getFilteredAndSortedQRCodes();
    const createdCount = qrCodes.filter(qr => isCreatedQRCode(qr)).length;
    const scannedCount = qrCodes.length - createdCount;

    if (authLoading || loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-foreground">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-danger">{error}</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 px-4 py-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="relative">
                        <div className="absolute -top-2 -left-2 w-32 h-32 bg-gradient-primary opacity-10 rounded-full blur-3xl"></div>
                        <h1 className="relative text-3xl sm:text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                            QR Code History
                        </h1>
                        <p className="relative text-sm sm:text-base text-foreground/70 mt-2 font-medium">{qrCodes.length} total codes saved</p>
                    </div>
                    <button 
                        onClick={() => router.push('/pages/qrcode')}
                        className="px-4 py-2 sm:px-6 text-sm sm:text-base rounded-xl border-2 border-primary/30 bg-gradient-to-r from-primary/10 to-secondary/10 text-primary font-semibold hover:from-primary/20 hover:to-secondary/20 hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-glow-primary"
                    >
                        ← Back to Scan
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-6 border-2 border-primary/20 rounded-2xl p-2 bg-gradient-to-br from-content1 to-primary/5 backdrop-blur-sm">
                    <button
                        onClick={() => setActiveTab('all')}
                        className={`flex-1 px-4 py-3 font-bold text-sm rounded-xl transition-all duration-300 ${
                            activeTab === 'all'
                                ? 'bg-gradient-primary text-primary-foreground shadow-glow-primary transform scale-105'
                                : 'text-foreground/60 hover:text-foreground hover:bg-primary/10'
                        }`}
                    >
                        All ({qrCodes.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('created')}
                        className={`flex-1 px-4 py-3 font-bold text-sm rounded-xl transition-all duration-300 ${
                            activeTab === 'created'
                                ? 'bg-gradient-primary text-primary-foreground shadow-glow-primary transform scale-105'
                                : 'text-foreground/60 hover:text-foreground hover:bg-primary/10'
                        }`}
                    >
                        Created ({createdCount})
                    </button>
                    <button
                        onClick={() => setActiveTab('scanned')}
                        className={`flex-1 px-4 py-3 font-bold text-sm rounded-xl transition-all duration-300 ${
                            activeTab === 'scanned'
                                ? 'bg-gradient-primary text-primary-foreground shadow-glow-primary transform scale-105'
                                : 'text-foreground/60 hover:text-foreground hover:bg-primary/10'
                        }`}
                    >
                        Scanned ({scannedCount})
                    </button>
                </div>

                {/* Search and Filters */}
                <div className="mb-6 space-y-4">
                    {/* Search Bar */}
                    <div className="relative">
                        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/60" viewBox="0 0 24 24" fill="none">
                            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                            <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search QR codes..."
                            className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-primary/20 bg-gradient-to-r from-content1 to-primary/5 text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 shadow-lg"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                </svg>
                            </button>
                        )}
                    </div>

                    {/* Filter and Sort */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        {/* Type Filter */}
                        <div className="flex-1">
                            <label className="block text-xs font-medium text-foreground/60 mb-1.5">Filter by Type</label>
                            <select
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border-2 border-primary/20 bg-gradient-to-r from-content1 to-primary/5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 text-sm shadow-lg"
                            >
                                <option value="all">All Types</option>
                                <option value="url">URL</option>
                                <option value="text">Text</option>
                                <option value="wifi">WiFi</option>
                                <option value="phone">Phone</option>
                                <option value="email">Email</option>
                                <option value="sms">SMS</option>
                                <option value="vcard">Contact (vCard)</option>
                                <option value="mecard">Contact (MeCard)</option>
                                <option value="geo">Location</option>
                                <option value="calendar">Calendar</option>
                                <option value="payment">Payment</option>
                                <option value="social">Social Media</option>
                                <option value="deeplink">Deep Link</option>
                                <option value="coupon">Coupon</option>
                                <option value="sku">Product SKU</option>
                            </select>
                        </div>

                        {/* Sort */}
                        <div className="flex-1">
                            <label className="block text-xs font-medium text-foreground/60 mb-1.5">Sort by</label>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as any)}
                                className="w-full px-4 py-3 rounded-xl border-2 border-primary/20 bg-gradient-to-r from-content1 to-primary/5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 text-sm shadow-lg"
                            >
                                <option value="date-desc">Newest First</option>
                                <option value="date-asc">Oldest First</option>
                                <option value="type">Type (A-Z)</option>
                            </select>
                        </div>
                    </div>

                    {/* Results Count */}
                    <div className="flex items-center justify-between text-sm">
                        <p className="text-foreground/60">
                            Showing {filteredQRCodes.length} of {qrCodes.length} codes
                        </p>
                        {(searchQuery || filterType !== 'all') && (
                            <button
                                onClick={() => {
                                    setSearchQuery('');
                                    setFilterType('all');
                                }}
                                className="text-primary hover:underline font-medium"
                            >
                                Clear filters
                            </button>
                        )}
                    </div>
                </div>

                {/* QR Codes List */}
                    {filteredQRCodes.length === 0 ? (
                        <div className="border-2 border-primary/20 rounded-3xl p-12 bg-gradient-to-br from-content1 via-content1 to-primary/5 text-center shadow-xl backdrop-blur-sm">
                        <svg className="w-16 h-16 mx-auto mb-4 text-foreground/30" viewBox="0 0 24 24" fill="none">
                            <path d="M3 11V3H11V11H3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M13 3H21V11H13V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M3 13H11V21H3V13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M18 13H21V16H18V13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M13 18H16V21H13V18Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M18 18H21V21H18V18Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <p className="text-foreground/60 font-medium">
                            {qrCodes.length === 0 
                                ? 'No saved QR codes yet' 
                                : 'No QR codes match your filters'}
                        </p>
                        <p className="text-foreground/40 text-sm mt-2">
                            {qrCodes.length === 0 
                                ? 'Scan and save QR codes to see them here' 
                                : 'Try adjusting your search or filters'}
                        </p>
                    </div>
                ) : (
                        <div className="space-y-4">
                            {filteredQRCodes.map((qr) => {
                                const parsedData = parseQRCode(qr.data);
                                
                                return (
                                <div 
                                    key={qr.id} 
                                    className="border-2 border-primary/20 rounded-2xl p-5 bg-gradient-to-br from-content1 via-content1 to-primary/5 hover:from-primary/10 hover:to-secondary/10 hover:border-primary/40 transition-all duration-300 shadow-lg hover:shadow-glow-primary transform hover:scale-[1.02] backdrop-blur-sm"
                                >
                                <div className="flex items-start gap-3">
                                    {/* Icon */}
                                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shadow-lg">
                                        <QRIcon icon={parsedData.icon} className="w-6 h-6 text-primary-foreground" />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs font-semibold text-primary uppercase">{parsedData.label}</span>
                                            </div>
                                            {parsedData.type === 'wifi' && parsedData.displayData.ssid && (
                                                <>
                                                    <p className="text-sm font-semibold text-foreground">{parsedData.displayData.ssid}</p>
                                                    {parsedData.displayData.password && (
                                                        <p className="text-xs text-foreground/70">
                                                            Password: <span className="font-mono">{parsedData.displayData.password}</span>
                                                        </p>
                                                    )}
                                                </>
                                            )}
                                            {parsedData.type === 'phone' && (
                                                <p className="text-sm font-semibold font-mono text-foreground">{parsedData.displayData.number}</p>
                                            )}
                                            {parsedData.type === 'email' && (
                                                <p className="text-sm font-semibold text-foreground">{parsedData.displayData.email}</p>
                                            )}
                                            {(parsedData.type === 'vcard' || parsedData.type === 'mecard') && (
                                                <p className="text-sm font-semibold text-foreground">{parsedData.displayData.fullName || parsedData.displayData.name}</p>
                                            )}
                                            {parsedData.type === 'geo' && (
                                                <p className="text-sm font-mono text-foreground">{parsedData.displayData.latitude.toFixed(6)}, {parsedData.displayData.longitude.toFixed(6)}</p>
                                            )}
                                            {parsedData.type === 'calendar' && (
                                                <p className="text-sm font-semibold text-foreground">{parsedData.displayData.title}</p>
                                            )}
                                            {parsedData.type === 'coupon' && (
                                                <p className="text-sm font-bold font-mono text-foreground">{parsedData.displayData.code}</p>
                                            )}
                                            {parsedData.type === 'sku' && (
                                                <p className="text-sm font-bold font-mono text-foreground">{parsedData.displayData.sku}</p>
                                            )}
                                            {(parsedData.type === 'url' || parsedData.type === 'social' || parsedData.type === 'deeplink') && (
                                                <p className="text-sm text-foreground break-all">{qr.data}</p>
                                            )}
                                            {parsedData.type === 'text' && (
                                                <p className="text-sm text-foreground break-all">{qr.data.substring(0, 100)}{qr.data.length > 100 ? '...' : ''}</p>
                                            )}
                                            <p className="text-xs text-foreground/50">
                                                {new Date(qr.createdAt).toLocaleDateString()} at {new Date(qr.createdAt).toLocaleTimeString()}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex-shrink-0 flex gap-2">
                                        {/* Type-specific primary action */}
                                        {parsedData.type === 'wifi' && parsedData.displayData.password && (
                                            <button
                                                onClick={() => {
                                                    navigator.clipboard.writeText(parsedData.displayData.password);
                                                    alert('✓ Password copied!');
                                                }}
                                                className="w-10 h-10 rounded-xl bg-gradient-primary text-primary-foreground hover:shadow-glow-primary transition-all duration-300 transform hover:scale-110 flex items-center justify-center shadow-lg"
                                                title="Copy Password"
                                            >
                                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                                                    <path d="M12 2a5 5 0 00-5 5v3H6a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2v-8a2 2 0 00-2-2h-1V7a5 5 0 00-5-5z" stroke="currentColor" strokeWidth="2"/>
                                                    <circle cx="12" cy="16" r="1" fill="currentColor"/>
                                                </svg>
                                            </button>
                                        )}
                                        {/* URL, social, deeplink open button */}
                                        {(parsedData.type === 'url' || parsedData.type === 'social' || parsedData.type === 'deeplink') && (
                                            <button
                                                onClick={() => window.open(qr.data, '_blank')}
                                                className="w-10 h-10 rounded-xl bg-gradient-primary text-primary-foreground hover:shadow-glow-primary transition-all duration-300 transform hover:scale-110 flex items-center justify-center shadow-lg"
                                                title="Open"
                                            >
                                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                                                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" stroke="currentColor" strokeWidth="2"/>
                                                </svg>
                                            </button>
                                        )}
                                        {/* Phone call button */}
                                        {parsedData.type === 'phone' && (
                                            <button
                                                onClick={() => window.open(`tel:${parsedData.displayData.number}`, '_self')}
                                                className="w-10 h-10 rounded-xl bg-gradient-primary text-primary-foreground hover:shadow-glow-primary transition-all duration-300 transform hover:scale-110 flex items-center justify-center shadow-lg"
                                                title="Call"
                                            >
                                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                                                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="2"/>
                                                </svg>
                                            </button>
                                        )}
                                        {/* Location open button */}
                                        {parsedData.type === 'geo' && (
                                            <button
                                                onClick={() => window.open(`https://maps.google.com/?q=${parsedData.displayData.latitude},${parsedData.displayData.longitude}`, '_blank')}
                                                className="w-10 h-10 rounded-xl bg-gradient-primary text-primary-foreground hover:shadow-glow-primary transition-all duration-300 transform hover:scale-110 flex items-center justify-center shadow-lg"
                                                title="Open in Maps"
                                            >
                                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="currentColor" strokeWidth="2"/>
                                                    <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
                                                </svg>
                                            </button>
                                        )}
                                        <button
                                            onClick={() => shareQRCode(qr.data)}
                                                className="w-10 h-10 rounded-xl bg-gradient-secondary text-secondary-foreground hover:shadow-glow-secondary transition-all duration-300 transform hover:scale-110 flex items-center justify-center shadow-lg"
                                            title="Share"
                                        >
                                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                                                <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M16 6l-4-4-4 4M12 2v13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => {
                                                navigator.clipboard.writeText(qr.data);
                                                alert('✓ Copied!');
                                            }}
                                                className="w-10 h-10 rounded-xl border-2 border-primary/30 bg-gradient-to-r from-primary/10 to-secondary/10 text-foreground hover:from-primary/20 hover:to-secondary/20 hover:border-primary/50 transition-all duration-300 transform hover:scale-110 flex items-center justify-center shadow-lg"
                                            title="Copy"
                                        >
                                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                                                <path d="M8 4v12a2 2 0 002 2h8a2 2 0 002-2V7.242a2 2 0 00-.602-1.43L16.083 2.57A2 2 0 0014.685 2H10a2 2 0 00-2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M16 18v2a2 2 0 01-2 2H6a2 2 0 01-2-2V9a2 2 0 012-2h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => deleteQRCode(qr.id)}
                                                className="w-10 h-10 rounded-xl bg-gradient-to-r from-danger to-danger/80 text-danger-foreground hover:shadow-glow-primary transition-all duration-300 transform hover:scale-110 flex items-center justify-center shadow-lg"
                                            title="Delete"
                                        >
                                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                                                <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default QRCodeHistory;

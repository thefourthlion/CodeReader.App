// Comprehensive Action Buttons for all QR Code Types
import React from 'react';
import { ParsedQRCode } from '@/utils/qrParser';

interface QRActionsProps {
  parsedData: ParsedQRCode;
  onSave: () => void;
  isSaving: boolean;
  isLoggedIn: boolean;
}

export const QRActions: React.FC<QRActionsProps> = ({ parsedData, onSave, isSaving, isLoggedIn }) => {
  const { type, displayData, rawData } = parsedData;
  
  const copyToClipboard = (text: string, label: string = 'Copied!') => {
    navigator.clipboard.writeText(text);
    alert(`✓ ${label}`);
  };
  
  const shareData = async (text: string) => {
    if (navigator.share) {
      try {
        await navigator.share({ title: 'QR Code Result', text });
      } catch (err) {
        copyToClipboard(text, 'Copied to clipboard');
      }
    } else {
      copyToClipboard(text, 'Copied to clipboard');
    }
  };
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {/* WiFi Actions */}
      {type === 'wifi' && (
        <>
          {displayData.password && (
            <button 
              className="h-12 rounded-xl font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              onClick={() => copyToClipboard(displayData.password, 'Password copied!')}
            >
              <LockIcon />
              Copy Password
            </button>
          )}
          <button 
            className="h-12 rounded-xl font-semibold border border-default-300 bg-content2 text-foreground hover:bg-content3 transition-colors flex items-center justify-center gap-2"
            onClick={() => copyToClipboard(displayData.ssid, 'Network name copied!')}
          >
            <CopyIcon />
            Copy SSID
          </button>
        </>
      )}
      
      {/* Phone Actions */}
      {type === 'phone' && (
        <>
          <button 
            className="h-12 rounded-xl font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            onClick={() => window.open(rawData, '_self')}
          >
            <PhoneCallIcon />
            Call
          </button>
          <button 
            className="h-12 rounded-xl font-semibold border border-default-300 bg-content2 text-foreground hover:bg-content3 transition-colors flex items-center justify-center gap-2"
            onClick={() => copyToClipboard(displayData.number, 'Number copied!')}
          >
            <CopyIcon />
            Copy Number
          </button>
        </>
      )}
      
      {/* SMS Actions */}
      {type === 'sms' && (
        <>
          <button 
            className="h-12 rounded-xl font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            onClick={() => window.open(rawData, '_self')}
          >
            <MessageIcon />
            Send SMS
          </button>
          <button 
            className="h-12 rounded-xl font-semibold border border-default-300 bg-content2 text-foreground hover:bg-content3 transition-colors flex items-center justify-center gap-2"
            onClick={() => copyToClipboard(displayData.number, 'Number copied!')}
          >
            <CopyIcon />
            Copy Number
          </button>
        </>
      )}
      
      {/* Email Actions */}
      {type === 'email' && (
        <>
          <button 
            className="h-12 rounded-xl font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            onClick={() => window.open(rawData, '_self')}
          >
            <EmailIcon />
            Compose
          </button>
          <button 
            className="h-12 rounded-xl font-semibold border border-default-300 bg-content2 text-foreground hover:bg-content3 transition-colors flex items-center justify-center gap-2"
            onClick={() => copyToClipboard(displayData.email, 'Email copied!')}
          >
            <CopyIcon />
            Copy Email
          </button>
        </>
      )}
      
      {/* Contact Actions (vCard/MeCard) */}
      {(type === 'vcard' || type === 'mecard') && (
        <>
          <button 
            className="h-12 rounded-xl font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            onClick={() => {
              // Create vCard blob and download
              const blob = new Blob([rawData], { type: 'text/vcard' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'contact.vcf';
              a.click();
            }}
          >
            <DownloadIcon />
            Save Contact
          </button>
          {displayData.phone && (
            <button 
              className="h-12 rounded-xl font-semibold border border-default-300 bg-content2 text-foreground hover:bg-content3 transition-colors flex items-center justify-center gap-2"
              onClick={() => window.open(`tel:${displayData.phone}`, '_self')}
            >
              <PhoneCallIcon />
              Call
            </button>
          )}
        </>
      )}
      
      {/* Location Actions */}
      {type === 'geo' && (
        <>
          <button 
            className="h-12 rounded-xl font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            onClick={() => window.open(`https://maps.google.com/?q=${displayData.latitude},${displayData.longitude}`, '_blank')}
          >
            <MapIcon />
            Open in Maps
          </button>
          <button 
            className="h-12 rounded-xl font-semibold border border-default-300 bg-content2 text-foreground hover:bg-content3 transition-colors flex items-center justify-center gap-2"
            onClick={() => copyToClipboard(`${displayData.latitude},${displayData.longitude}`, 'Coordinates copied!')}
          >
            <CopyIcon />
            Copy Coords
          </button>
        </>
      )}
      
      {/* Calendar Actions */}
      {type === 'calendar' && (
        <>
          <button 
            className="h-12 rounded-xl font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            onClick={() => {
              // Create iCal blob and download
              const blob = new Blob([rawData], { type: 'text/calendar' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'event.ics';
              a.click();
            }}
          >
            <CalendarIcon />
            Add to Calendar
          </button>
          <button 
            className="h-12 rounded-xl font-semibold border border-default-300 bg-content2 text-foreground hover:bg-content3 transition-colors flex items-center justify-center gap-2"
            onClick={() => shareData(displayData.title || rawData)}
          >
            <ShareIcon />
            Share
          </button>
        </>
      )}
      
      {/* Crypto Actions */}
      {type === 'crypto' && (
        <>
          <button 
            className="h-12 rounded-xl font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            onClick={() => copyToClipboard(displayData.address, 'Address copied!')}
          >
            <CopyIcon />
            Copy Address
          </button>
          <button 
            className="h-12 rounded-xl font-semibold border border-default-300 bg-content2 text-foreground hover:bg-content3 transition-colors flex items-center justify-center gap-2"
            onClick={() => window.open(rawData, '_blank')}
          >
            <OpenIcon />
            Open in Wallet
          </button>
        </>
      )}
      
      {/* Coupon Actions */}
      {type === 'coupon' && (
        <>
          <button 
            className="h-12 rounded-xl font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            onClick={() => copyToClipboard(displayData.code, 'Code copied!')}
          >
            <CopyIcon />
            Copy Code
          </button>
          <button 
            className="h-12 rounded-xl font-semibold border border-default-300 bg-content2 text-foreground hover:bg-content3 transition-colors flex items-center justify-center gap-2"
            onClick={() => shareData(`Coupon Code: ${displayData.code}`)}
          >
            <ShareIcon />
            Share
          </button>
        </>
      )}
      
      {/* SKU Actions */}
      {type === 'sku' && (
        <>
          <button 
            className="h-12 rounded-xl font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            onClick={() => copyToClipboard(displayData.sku, 'SKU copied!')}
          >
            <CopyIcon />
            Copy SKU
          </button>
          <button 
            className="h-12 rounded-xl font-semibold border border-default-300 bg-content2 text-foreground hover:bg-content3 transition-colors flex items-center justify-center gap-2"
            onClick={() => shareData(rawData)}
          >
            <ShareIcon />
            Share
          </button>
        </>
      )}
      
      {/* URL, Social, and DeepLink Actions */}
      {(type === 'url' || type === 'social' || type === 'deeplink') && (
        <>
          <button 
            className="h-12 rounded-xl font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            onClick={() => window.open(rawData, '_blank')}
          >
            <OpenIcon />
            Open
          </button>
          <button 
            className="h-12 rounded-xl font-semibold border border-default-300 bg-content2 text-foreground hover:bg-content3 transition-colors flex items-center justify-center gap-2"
            onClick={() => copyToClipboard(rawData, 'Link copied!')}
          >
            <CopyIcon />
            Copy
          </button>
        </>
      )}
      
      {/* Plain Text Actions */}
      {type === 'text' && (
        <button 
          className="h-12 rounded-xl font-semibold border border-default-300 bg-content2 text-foreground hover:bg-content3 transition-colors flex items-center justify-center gap-2"
          onClick={() => copyToClipboard(rawData, 'Text copied!')}
        >
          <CopyIcon />
          Copy
        </button>
      )}
      
      {/* Universal Share Button */}
      <button 
        className="h-12 rounded-xl font-semibold bg-secondary text-secondary-foreground hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
        onClick={() => shareData(rawData)}
      >
        <ShareIcon />
        Share
      </button>
      
      {/* Universal Save Button */}
      <button 
        className="h-12 rounded-xl font-semibold bg-success text-success-foreground hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={onSave}
        disabled={isSaving}
      >
        {isSaving ? (
          <span>Saving...</span>
        ) : (
          <>
            <SaveIcon />
            {isLoggedIn ? 'Save' : 'Login to Save'}
          </>
        )}
      </button>
    </div>
  );
};

// Icon components
const CopyIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
    <path d="M8 4v12a2 2 0 002 2h8a2 2 0 002-2V7.242a2 2 0 00-.602-1.43L16.083 2.57A2 2 0 0014.685 2H10a2 2 0 00-2 2z" stroke="currentColor" strokeWidth="2"/>
    <path d="M16 18v2a2 2 0 01-2 2H6a2 2 0 01-2-2V9a2 2 0 012-2h2" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const ShareIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
    <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" stroke="currentColor" strokeWidth="2"/>
    <path d="M16 6l-4-4-4 4M12 2v13" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const SaveIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
    <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" stroke="currentColor" strokeWidth="2"/>
    <path d="M17 21v-8H7v8M7 3v5h8" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const LockIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
    <path d="M12 2a5 5 0 00-5 5v3H6a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2v-8a2 2 0 00-2-2h-1V7a5 5 0 00-5-5z" stroke="currentColor" strokeWidth="2"/>
    <circle cx="12" cy="16" r="1" fill="currentColor"/>
  </svg>
);

const PhoneCallIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const MessageIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const EmailIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2"/>
    <path d="M22 6l-10 7L2 6" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const DownloadIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const MapIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="currentColor" strokeWidth="2"/>
    <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const CalendarIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
    <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const OpenIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" stroke="currentColor" strokeWidth="2"/>
  </svg>
);


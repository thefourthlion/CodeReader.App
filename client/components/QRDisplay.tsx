// Comprehensive QR Code Display Component
import React from 'react';
import { ParsedQRCode } from '@/utils/qrParser';
import { QRIcon } from './QRIcons';

interface QRDisplayProps {
  parsedData: ParsedQRCode;
}

export const QRDisplay: React.FC<QRDisplayProps> = ({ parsedData }) => {
  const { type, displayData, icon, label } = parsedData;
  
  return (
    <div className="mb-4 space-y-3">
      {/* Header with icon */}
      <div className="flex items-center gap-2 mb-3">
        <QRIcon icon={icon} className="w-5 h-5 text-primary" />
        <span className="text-xs font-semibold text-foreground/60 uppercase tracking-wide">{label}</span>
      </div>
      
      {/* Content based on type */}
      <div className="bg-content2 rounded-lg p-3 space-y-2">
        {type === 'wifi' && <WiFiDisplay data={displayData} />}
        {type === 'vcard' && <VCardDisplay data={displayData} />}
        {type === 'mecard' && <MeCardDisplay data={displayData} />}
        {type === 'phone' && <PhoneDisplay data={displayData} />}
        {type === 'sms' && <SMSDisplay data={displayData} />}
        {type === 'email' && <EmailDisplay data={displayData} />}
        {type === 'geo' && <GeoDisplay data={displayData} />}
        {type === 'calendar' && <CalendarDisplay data={displayData} />}
        {type === 'crypto' && <CryptoDisplay data={displayData} />}
        {type === 'coupon' && <CouponDisplay data={displayData} />}
        {type === 'sku' && <SKUDisplay data={displayData} />}
        {type === 'social' && <SocialDisplay data={displayData} />}
        {type === 'deeplink' && <DeepLinkDisplay data={displayData} />}
        {type === 'url' && <URLDisplay data={displayData} />}
        {type === 'text' && <TextDisplay data={displayData} />}
      </div>
    </div>
  );
};

// WiFi Display
const WiFiDisplay = ({ data }: any) => (
  <>
    <div>
      <div className="text-xs text-foreground/60 mb-1">Network Name (SSID)</div>
      <div className="text-base font-semibold text-foreground">{data.ssid}</div>
    </div>
    {data.password && (
      <div>
        <div className="text-xs text-foreground/60 mb-1">Password</div>
        <div className="text-base font-mono text-foreground">{data.password}</div>
      </div>
    )}
    <div className="flex gap-4 pt-1">
      <div>
        <div className="text-xs text-foreground/60 mb-1">Security</div>
        <div className="text-sm font-medium text-foreground">{data.security}</div>
      </div>
      {data.eapMethod && (
        <div>
          <div className="text-xs text-foreground/60 mb-1">EAP Method</div>
          <div className="text-sm font-medium text-foreground">{data.eapMethod}</div>
        </div>
      )}
      {data.hidden && (
        <div>
          <div className="text-xs text-foreground/60 mb-1">Network</div>
          <div className="text-sm font-medium text-foreground">Hidden</div>
        </div>
      )}
    </div>
  </>
);

// vCard Display
const VCardDisplay = ({ data }: any) => (
  <>
    <div>
      <div className="text-xs text-foreground/60 mb-1">Name</div>
      <div className="text-lg font-semibold text-foreground">{data.fullName || 'No name'}</div>
    </div>
    {data.organization && (
      <div>
        <div className="text-xs text-foreground/60 mb-1">Organization</div>
        <div className="text-sm text-foreground">{data.organization}</div>
      </div>
    )}
    {data.title && (
      <div>
        <div className="text-xs text-foreground/60 mb-1">Title</div>
        <div className="text-sm text-foreground">{data.title}</div>
      </div>
    )}
    {data.phone && (
      <div>
        <div className="text-xs text-foreground/60 mb-1">Phone</div>
        <div className="text-sm font-mono text-foreground">{data.phone}</div>
      </div>
    )}
    {data.email && (
      <div>
        <div className="text-xs text-foreground/60 mb-1">Email</div>
        <div className="text-sm text-foreground">{data.email}</div>
      </div>
    )}
    {data.address && (
      <div>
        <div className="text-xs text-foreground/60 mb-1">Address</div>
        <div className="text-sm text-foreground">{data.address}</div>
      </div>
    )}
    {data.url && (
      <div>
        <div className="text-xs text-foreground/60 mb-1">Website</div>
        <div className="text-sm text-primary break-all">{data.url}</div>
      </div>
    )}
  </>
);

// MeCard Display
const MeCardDisplay = ({ data }: any) => (
  <>
    <div>
      <div className="text-xs text-foreground/60 mb-1">Name</div>
      <div className="text-lg font-semibold text-foreground">{data.name}</div>
    </div>
    {data.phone && (
      <div>
        <div className="text-xs text-foreground/60 mb-1">Phone</div>
        <div className="text-sm font-mono text-foreground">{data.phone}</div>
      </div>
    )}
    {data.email && (
      <div>
        <div className="text-xs text-foreground/60 mb-1">Email</div>
        <div className="text-sm text-foreground">{data.email}</div>
      </div>
    )}
    {data.address && (
      <div>
        <div className="text-xs text-foreground/60 mb-1">Address</div>
        <div className="text-sm text-foreground">{data.address}</div>
      </div>
    )}
    {data.url && (
      <div>
        <div className="text-xs text-foreground/60 mb-1">Website</div>
        <div className="text-sm text-primary break-all">{data.url}</div>
      </div>
    )}
  </>
);

// Phone Display
const PhoneDisplay = ({ data }: any) => (
  <div>
    <div className="text-xs text-foreground/60 mb-1">Phone Number</div>
    <div className="text-xl font-semibold font-mono text-foreground">{data.number}</div>
  </div>
);

// SMS Display
const SMSDisplay = ({ data }: any) => (
  <>
    <div>
      <div className="text-xs text-foreground/60 mb-1">Phone Number</div>
      <div className="text-base font-semibold font-mono text-foreground">{data.number}</div>
    </div>
    {data.body && (
      <div>
        <div className="text-xs text-foreground/60 mb-1">Message</div>
        <div className="text-sm text-foreground">{data.body}</div>
      </div>
    )}
  </>
);

// Email Display
const EmailDisplay = ({ data }: any) => (
  <>
    <div>
      <div className="text-xs text-foreground/60 mb-1">Email Address</div>
      <div className="text-base font-semibold text-foreground">{data.email}</div>
    </div>
    {data.subject && (
      <div>
        <div className="text-xs text-foreground/60 mb-1">Subject</div>
        <div className="text-sm text-foreground">{data.subject}</div>
      </div>
    )}
    {data.body && (
      <div>
        <div className="text-xs text-foreground/60 mb-1">Message</div>
        <div className="text-sm text-foreground">{data.body}</div>
      </div>
    )}
  </>
);

// Geo Location Display
const GeoDisplay = ({ data }: any) => (
  <>
    <div>
      <div className="text-xs text-foreground/60 mb-1">Coordinates</div>
      <div className="text-base font-mono text-foreground">
        {data.latitude.toFixed(6)}, {data.longitude.toFixed(6)}
      </div>
    </div>
    {data.zoom && (
      <div>
        <div className="text-xs text-foreground/60 mb-1">Zoom Level</div>
        <div className="text-sm text-foreground">{data.zoom}</div>
      </div>
    )}
  </>
);

// Calendar Event Display
const CalendarDisplay = ({ data }: any) => (
  <>
    <div>
      <div className="text-xs text-foreground/60 mb-1">Event</div>
      <div className="text-lg font-semibold text-foreground">{data.title}</div>
    </div>
    {data.startDate && (
      <div>
        <div className="text-xs text-foreground/60 mb-1">Start Time</div>
        <div className="text-sm text-foreground">
          {data.startDate.toLocaleString()}
        </div>
      </div>
    )}
    {data.endDate && (
      <div>
        <div className="text-xs text-foreground/60 mb-1">End Time</div>
        <div className="text-sm text-foreground">
          {data.endDate.toLocaleString()}
        </div>
      </div>
    )}
    {data.location && (
      <div>
        <div className="text-xs text-foreground/60 mb-1">Location</div>
        <div className="text-sm text-foreground">{data.location}</div>
      </div>
    )}
    {data.description && (
      <div>
        <div className="text-xs text-foreground/60 mb-1">Description</div>
        <div className="text-sm text-foreground">{data.description}</div>
      </div>
    )}
  </>
);

// Crypto Payment Display
const CryptoDisplay = ({ data }: any) => (
  <>
    <div>
      <div className="text-xs text-foreground/60 mb-1">Cryptocurrency</div>
      <div className="text-base font-semibold text-foreground capitalize">{data.coin}</div>
    </div>
    <div>
      <div className="text-xs text-foreground/60 mb-1">Wallet Address</div>
      <div className="text-sm font-mono text-foreground break-all">{data.address}</div>
    </div>
    {data.amount && (
      <div>
        <div className="text-xs text-foreground/60 mb-1">Amount</div>
        <div className="text-lg font-semibold text-foreground">{data.amount}</div>
      </div>
    )}
  </>
);

// Coupon Display
const CouponDisplay = ({ data }: any) => (
  <>
    <div>
      <div className="text-xs text-foreground/60 mb-1">Coupon Code</div>
      <div className="text-2xl font-bold font-mono text-primary">{data.code}</div>
    </div>
    {data.discount && (
      <div>
        <div className="text-xs text-foreground/60 mb-1">Discount</div>
        <div className="text-lg font-semibold text-success">{data.discount}</div>
      </div>
    )}
    {data.expiry && (
      <div>
        <div className="text-xs text-foreground/60 mb-1">Expiry Date</div>
        <div className="text-sm text-foreground">{data.expiry}</div>
      </div>
    )}
  </>
);

// SKU/Product Display
const SKUDisplay = ({ data }: any) => (
  <>
    <div>
      <div className="text-xs text-foreground/60 mb-1">Product SKU</div>
      <div className="text-xl font-bold font-mono text-foreground">{data.sku}</div>
    </div>
    {data.lot && (
      <div>
        <div className="text-xs text-foreground/60 mb-1">Lot Number</div>
        <div className="text-sm font-mono text-foreground">{data.lot}</div>
      </div>
    )}
    {data.expiry && (
      <div>
        <div className="text-xs text-foreground/60 mb-1">Expiry Date</div>
        <div className="text-sm text-foreground">{data.expiry}</div>
      </div>
    )}
  </>
);

// Social Media Display
const SocialDisplay = ({ data }: any) => (
  <div>
    <div className="text-xs text-foreground/60 mb-1">Link</div>
    <div className="text-sm text-primary break-all">{data.url}</div>
  </div>
);

// Deep Link Display
const DeepLinkDisplay = ({ data }: any) => (
  <>
    <div>
      <div className="text-xs text-foreground/60 mb-1">App Scheme</div>
      <div className="text-base font-semibold font-mono text-foreground">{data.scheme}://</div>
    </div>
    <div>
      <div className="text-xs text-foreground/60 mb-1">Full URL</div>
      <div className="text-sm text-primary break-all">{data.url}</div>
    </div>
  </>
);

// URL Display
const URLDisplay = ({ data }: any) => (
  <div>
    <div className="text-xs text-foreground/60 mb-1">Link</div>
    <div className="text-sm text-primary break-all">{data.url}</div>
  </div>
);

// Text Display
const TextDisplay = ({ data }: any) => (
  <div>
    <div className="text-sm text-foreground break-all leading-relaxed">{data.text}</div>
  </div>
);


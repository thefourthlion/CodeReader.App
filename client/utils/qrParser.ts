// Comprehensive QR Code Parser
// Handles all common QR code payload types

export type QRCodeType = 
  | 'url' 
  | 'text' 
  | 'phone' 
  | 'sms' 
  | 'email' 
  | 'vcard' 
  | 'mecard' 
  | 'wifi' 
  | 'geo' 
  | 'calendar' 
  | 'deeplink' 
  | 'crypto' 
  | 'coupon' 
  | 'sku'
  | 'social';

export interface ParsedQRCode {
  type: QRCodeType;
  rawData: string;
  displayData: any;
  icon: string;
  label: string;
}

// WiFi Parser
export const parseWifi = (data: string) => {
  const ssidMatch = data.match(/S:([^;]+)/);
  const passwordMatch = data.match(/P:([^;]+)/);
  const typeMatch = data.match(/T:([^;]+)/);
  const hiddenMatch = data.match(/H:([^;]+)/);
  const eapMatch = data.match(/E:([^;]+)/);
  
  return {
    ssid: ssidMatch ? ssidMatch[1] : '',
    password: passwordMatch ? passwordMatch[1] : '',
    security: typeMatch ? typeMatch[1] : 'Open',
    hidden: hiddenMatch ? hiddenMatch[1] === 'true' : false,
    eapMethod: eapMatch ? eapMatch[1] : null,
  };
};

// vCard Parser
export const parseVCard = (data: string) => {
  const lines = data.split('\n');
  const card: any = {};
  
  lines.forEach(line => {
    if (line.startsWith('N:')) {
      const parts = line.substring(2).split(';');
      card.lastName = parts[0] || '';
      card.firstName = parts[1] || '';
      card.fullName = `${card.firstName} ${card.lastName}`.trim();
    } else if (line.startsWith('FN:')) {
      card.fullName = line.substring(3);
    } else if (line.startsWith('TEL')) {
      card.phone = line.split(':')[1];
    } else if (line.startsWith('EMAIL')) {
      card.email = line.split(':')[1];
    } else if (line.startsWith('ADR')) {
      card.address = line.split(':')[1];
    } else if (line.startsWith('ORG:')) {
      card.organization = line.substring(4);
    } else if (line.startsWith('TITLE:')) {
      card.title = line.substring(6);
    } else if (line.startsWith('URL:')) {
      card.url = line.substring(4);
    }
  });
  
  return card;
};

// MeCard Parser
export const parseMeCard = (data: string) => {
  const nameMatch = data.match(/N:([^;]+)/);
  const phoneMatch = data.match(/TEL:([^;]+)/);
  const emailMatch = data.match(/EMAIL:([^;]+)/);
  const addressMatch = data.match(/ADR:([^;]+)/);
  const urlMatch = data.match(/URL:([^;]+)/);
  
  return {
    name: nameMatch ? nameMatch[1] : '',
    phone: phoneMatch ? phoneMatch[1] : '',
    email: emailMatch ? emailMatch[1] : '',
    address: addressMatch ? addressMatch[1] : '',
    url: urlMatch ? urlMatch[1] : '',
  };
};

// Phone Number Parser
export const parsePhone = (data: string) => {
  const phoneMatch = data.match(/tel:(.+)/i);
  return {
    number: phoneMatch ? phoneMatch[1] : data.replace('tel:', ''),
  };
};

// SMS Parser
export const parseSMS = (data: string) => {
  const parts = data.replace('sms:', '').split('?');
  const number = parts[0];
  const bodyMatch = parts[1]?.match(/body=([^&]+)/);
  
  return {
    number,
    body: bodyMatch ? decodeURIComponent(bodyMatch[1]) : '',
  };
};

// Email Parser
export const parseEmail = (data: string) => {
  const emailMatch = data.match(/mailto:([^?]+)/);
  const subjectMatch = data.match(/subject=([^&]+)/);
  const bodyMatch = data.match(/body=([^&]+)/);
  
  return {
    email: emailMatch ? emailMatch[1] : '',
    subject: subjectMatch ? decodeURIComponent(subjectMatch[1]) : '',
    body: bodyMatch ? decodeURIComponent(bodyMatch[1]) : '',
  };
};

// Geo Location Parser
export const parseGeo = (data: string) => {
  const parts = data.replace('geo:', '').split(',');
  
  return {
    latitude: parseFloat(parts[0]),
    longitude: parseFloat(parts[1]),
    zoom: parts[2] ? parseFloat(parts[2]) : null,
  };
};

// Calendar Event Parser
export const parseCalendar = (data: string) => {
  const lines = data.split('\n');
  const event: any = {};
  
  lines.forEach(line => {
    if (line.startsWith('SUMMARY:')) {
      event.title = line.substring(8);
    } else if (line.startsWith('DTSTART:')) {
      const dateStr = line.substring(8);
      event.startDate = formatICalDate(dateStr);
    } else if (line.startsWith('DTEND:')) {
      const dateStr = line.substring(6);
      event.endDate = formatICalDate(dateStr);
    } else if (line.startsWith('LOCATION:')) {
      event.location = line.substring(9);
    } else if (line.startsWith('DESCRIPTION:')) {
      event.description = line.substring(12);
    }
  });
  
  return event;
};

// Format iCal date
const formatICalDate = (dateStr: string) => {
  // Format: 20251108T090000Z
  const year = dateStr.substring(0, 4);
  const month = dateStr.substring(4, 6);
  const day = dateStr.substring(6, 8);
  const hour = dateStr.substring(9, 11);
  const minute = dateStr.substring(11, 13);
  
  return new Date(`${year}-${month}-${day}T${hour}:${minute}:00Z`);
};

// Crypto Payment Parser
export const parseCrypto = (data: string) => {
  const coinMatch = data.match(/^(bitcoin|ethereum|litecoin):(.+)/i);
  if (!coinMatch) return null;
  
  const [, coin, rest] = coinMatch;
  const parts = rest.split('?');
  const address = parts[0];
  const amountMatch = parts[1]?.match(/amount=([^&]+)/);
  
  return {
    coin: coin.toLowerCase(),
    address,
    amount: amountMatch ? amountMatch[1] : null,
  };
};

// Coupon Parser
export const parseCoupon = (data: string) => {
  const codeMatch = data.match(/COUPON:([^;]+)/);
  const discountMatch = data.match(/DISCOUNT:([^;]+)/);
  const expiryMatch = data.match(/EXP:([^;]+)/);
  
  return {
    code: codeMatch ? codeMatch[1] : '',
    discount: discountMatch ? discountMatch[1] : '',
    expiry: expiryMatch ? expiryMatch[1] : null,
  };
};

// SKU/Product Parser
export const parseSKU = (data: string) => {
  const skuMatch = data.match(/SKU:([^;]+)/);
  const lotMatch = data.match(/LOT:([^;]+)/);
  const expMatch = data.match(/EXP:([^;]+)/);
  
  return {
    sku: skuMatch ? skuMatch[1] : '',
    lot: lotMatch ? lotMatch[1] : '',
    expiry: expMatch ? expMatch[1] : null,
  };
};

// Main Parser Function
export const parseQRCode = (data: string): ParsedQRCode => {
  // WiFi
  if (data.startsWith('WIFI:')) {
    return {
      type: 'wifi',
      rawData: data,
      displayData: parseWifi(data),
      icon: 'wifi',
      label: 'WiFi Network',
    };
  }
  
  // vCard
  if (data.startsWith('BEGIN:VCARD')) {
    return {
      type: 'vcard',
      rawData: data,
      displayData: parseVCard(data),
      icon: 'contact',
      label: 'Contact Card',
    };
  }
  
  // MeCard
  if (data.startsWith('MECARD:')) {
    return {
      type: 'mecard',
      rawData: data,
      displayData: parseMeCard(data),
      icon: 'contact',
      label: 'Contact',
    };
  }
  
  // Calendar Event
  if (data.startsWith('BEGIN:VEVENT')) {
    return {
      type: 'calendar',
      rawData: data,
      displayData: parseCalendar(data),
      icon: 'calendar',
      label: 'Calendar Event',
    };
  }
  
  // Phone Number
  if (data.startsWith('tel:')) {
    return {
      type: 'phone',
      rawData: data,
      displayData: parsePhone(data),
      icon: 'phone',
      label: 'Phone Number',
    };
  }
  
  // SMS
  if (data.startsWith('sms:')) {
    return {
      type: 'sms',
      rawData: data,
      displayData: parseSMS(data),
      icon: 'message',
      label: 'SMS Message',
    };
  }
  
  // Email
  if (data.startsWith('mailto:')) {
    return {
      type: 'email',
      rawData: data,
      displayData: parseEmail(data),
      icon: 'email',
      label: 'Email',
    };
  }
  
  // Geo Location
  if (data.startsWith('geo:')) {
    return {
      type: 'geo',
      rawData: data,
      displayData: parseGeo(data),
      icon: 'location',
      label: 'Location',
    };
  }
  
  // Crypto Payment
  if (/^(bitcoin|ethereum|litecoin):/i.test(data)) {
    return {
      type: 'crypto',
      rawData: data,
      displayData: parseCrypto(data),
      icon: 'crypto',
      label: 'Crypto Payment',
    };
  }
  
  // Coupon
  if (data.startsWith('COUPON:')) {
    return {
      type: 'coupon',
      rawData: data,
      displayData: parseCoupon(data),
      icon: 'coupon',
      label: 'Coupon',
    };
  }
  
  // SKU/Product
  if (data.startsWith('SKU:')) {
    return {
      type: 'sku',
      rawData: data,
      displayData: parseSKU(data),
      icon: 'product',
      label: 'Product Info',
    };
  }
  
  // Social Media Links
  if (data.includes('instagram.com') || data.includes('facebook.com') || 
      data.includes('twitter.com') || data.includes('linkedin.com') ||
      data.startsWith('whatsapp://')) {
    return {
      type: 'social',
      rawData: data,
      displayData: { url: data },
      icon: 'social',
      label: 'Social Media',
    };
  }
  
  // Deep Links / App Links
  if (data.match(/^[a-z][a-z0-9+.-]*:\/\//i) && !data.startsWith('http')) {
    return {
      type: 'deeplink',
      rawData: data,
      displayData: { scheme: data.split(':')[0], url: data },
      icon: 'app',
      label: 'App Link',
    };
  }
  
  // URL
  if (/^(https?:\/\/|www\.)/i.test(data)) {
    return {
      type: 'url',
      rawData: data,
      displayData: { url: data },
      icon: 'link',
      label: 'URL',
    };
  }
  
  // Plain Text (default)
  return {
    type: 'text',
    rawData: data,
    displayData: { text: data },
    icon: 'text',
    label: 'Text',
  };
};


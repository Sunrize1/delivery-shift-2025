export const phoneMapper = (phone: string) => {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    
    if (cleanPhone.startsWith('7') && cleanPhone.length === 11) {
        return '8' + cleanPhone.slice(1);
    }
    
    return cleanPhone;
}

export const formatPhoneForMask = (phone: string) => {
    if (!phone) return '';
    
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    
    if (cleanPhone.startsWith('8') && cleanPhone.length === 11) {
        const withoutFirstDigit = cleanPhone.slice(1);
        return `+7 (${withoutFirstDigit.slice(0, 3)}) ${withoutFirstDigit.slice(3, 6)}-${withoutFirstDigit.slice(6, 8)}-${withoutFirstDigit.slice(8, 10)}`;
    }
    
    if (cleanPhone.startsWith('7') && cleanPhone.length === 11) {
        const withoutFirstDigit = cleanPhone.slice(1);
        return `+7 (${withoutFirstDigit.slice(0, 3)}) ${withoutFirstDigit.slice(3, 6)}-${withoutFirstDigit.slice(6, 8)}-${withoutFirstDigit.slice(8, 10)}`;
    }
    
    return phone;
}
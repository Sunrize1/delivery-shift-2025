export const phoneMapper = (phone: string) => {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    
    if (cleanPhone.startsWith('7') && cleanPhone.length === 11) {
        return '8' + cleanPhone.slice(1);
    }
    
    return cleanPhone;
}
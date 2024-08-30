export const formatPhoneNumber = (phoneNumberString: string) => {
    // Remove all non-digit characters from the phone number string
    const cleanedPhoneNumber = phoneNumberString.replace(/\D/g, '');
    
    // Check if the phone number has 11 digits (including the country code)
    const isElevenDigits = cleanedPhoneNumber.length === 11;

    // Format the phone number based on the number of digits
    let formattedPhoneNumber;
    if (isElevenDigits) {
        // For 11-digit phone numbers, include the country code
        formattedPhoneNumber = cleanedPhoneNumber.replace(/(\d{1})(\d{3})(\d{3})(\d{4})/, '+$1 ($2) $3-$4');
    } else {
        // For other phone numbers, format into groups of 3 digits separated by hyphens
        formattedPhoneNumber = cleanedPhoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    }
    
    return formattedPhoneNumber;
};
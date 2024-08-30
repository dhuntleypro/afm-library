
 export const stripeConverter = (amountInCents: number) => {
    // Convert dollars to cents
    const amount = amountInCents * 100;
    
    // Return the amount
    return amount;
};
    
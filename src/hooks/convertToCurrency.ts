const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
    currency: 'USD',
    style: 'currency'
});

export function convertToCurrency(number: number) {
    return CURRENCY_FORMATTER.format(number);
}

export default convertToCurrency;
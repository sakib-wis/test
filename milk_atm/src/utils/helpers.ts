export const formatCurrency = (value: Number | bigint) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 2,
    }).format(value);
};
export const getTodayDate = (): string => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // "YYYY-MM-DD"
};
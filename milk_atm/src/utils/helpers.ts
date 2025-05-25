export const formatCurrency = (value: number | bigint): string => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 2,
    }).format(typeof value === 'bigint' ? Number(value) : value);
};

export const getTodayDate = (): string => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // "YYYY-MM-DD"
};

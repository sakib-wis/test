<<<<<<< HEAD
export const formatCurrency = (value: Number | bigint) => {
=======
export const formatCurrency = (value: number | bigint): string => {
>>>>>>> d23d73ea38e4eb1ca0ea170c1bf48902d586e524
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 2,
<<<<<<< HEAD
    }).format(value);
};
export const getTodayDate = (): string => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // "YYYY-MM-DD"
};
=======
    }).format(typeof value === 'bigint' ? Number(value) : value);
};

export const getTodayDate = (): string => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // "YYYY-MM-DD"
};
>>>>>>> d23d73ea38e4eb1ca0ea170c1bf48902d586e524

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
export const getStartDateTime = (): string => {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const hours = "00";
    const minutes = "00";

    return `${year}-${month}-${day}T${hours}:${minutes}`; // e.g. "2025-05-31T09:45"
};
export const getNowDateTime = (): string => {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const hours = String(today.getHours()).padStart(2, "59");
    const minutes = String(today.getMinutes()).padStart(2, "59");

    return `${year}-${month}-${day}T${hours}:${minutes}`; // e.g. "2025-05-31T09:45"
};
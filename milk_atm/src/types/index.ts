export interface User {
    id: number;
    phone_number: string;
    full_name: string | null;
}

export interface AuthContextType {
    token: string | null;
    user: User | null;
    login: (token: string, user: User) => void;
    logout: () => void;
}
export interface CustomerOption {
    label: string;
    value: string;
}
export interface CustomerInterface {
    id: number;
    enc_id: string;
    first_name: string | null;
    last_name: string | null;
    phone_number: string | null;
    address: string | null;
    customer_type: string | null;
    preferred_payment_method: string | null;
    delivery_schedule: string | null;
    delivery_frequency: string | null;
    additional_notes: string | null;
    city: number | null;
    state: number | null;
    label: string | null;
    value: string | null;
}
export interface AdminPanelInterface {
    cow_milk_rate: number;
    buffalo_milk_rate: number;
    mix_milk_rate: number;
}
export interface MilkTypeInterface {
    id: number | string;
    value: string;
}

export const milk_types_options: MilkTypeInterface[] = [
    { id: 1, value: 'Mix' },
    { id: 2, value: 'Buffalo' },
    { id: 3, value: 'Cow' },
]
export type PaymentMethod = 'online' | 'cash';
export const PaymentMethods: Record<PaymentMethod, string> = {
    online: 'Online',
    cash: 'Cash',

};
export interface SaleInterface {
    id: number;
    enc_id: string;
    customer: CustomerInterface;
    quantity: number;
    milk_type: number | string;
    price: number;
    payment_method: PaymentMethod;
    timestamp: string;
}
export interface SaleMilkInterface {
    customer: string;
    quantity: string;
    milk_type: number | string;
    price: number;
    payment_method: string;
}
export interface TotalInterface {
    total_price: number;
    total_quantity: number;
}
export interface dailySalesDataInterface {
    time: string;
    liters: number;
}
export interface monthlySalesDataInterface {
    month: string;
    liters: number;
}
export interface dailyPaymentDataInterface {
    name: string;
    value: number;
}
export interface monthlyPaymentDataInterface {
    month: string;
    online: number;
    cash: number;
}
export interface dashboardInterface {
    today_totals: TotalInterface;
    week_totals: TotalInterface;
    monthly_totals: TotalInterface;
    yearly_totals: TotalInterface;
    total_customer: number;
    online_percentage: number;
    dailySalesData: dailySalesDataInterface[]
    monthlySalesData: monthlySalesDataInterface[]
    dailyPaymentData: dailyPaymentDataInterface[]
    monthlyPaymentData: monthlyPaymentDataInterface[]
}
export interface StatesInterface {
    id: number;
    enc_id: string | null;
    value: string;
}
export interface CitiesInterface {
    id: number;
    enc_id: string | null;
    value: string;
}

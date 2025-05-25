export interface CustomerInterface {
    id: number;
    enc_id: string | null;
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
}
export interface AdminPanelInterface {
    cow_milk_rate: Number;
    buffalo_milk_rate: Number;
    mix_milk_rate: Number;
}

export const milk_types_options = [
    { id: '1', value: 'Mix' },
    { id: '2', value: 'Buffalo' },
    { id: '3', value: 'Cow' },
]

export interface SaleInterface {
    id: number;
    customer: CustomerInterface;
    quantity: number;
    milk_type: number;
    price: number;
    date: string;
}
export interface TotalInterface {
    total_price: number;
    total_quantity: number;
}
export interface dashboardInterface {
    today_totals: TotalInterface;
    week_totals: TotalInterface;
    monthly_totals: TotalInterface;
    yearly_totals: TotalInterface;
    total_customer: number;
}
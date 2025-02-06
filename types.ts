import Stripe from "stripe";

export interface UserDetails{
    id: string,
    firstName: string,
    lastName: string,
    avatarUrl?: string,
    billing_address?: Stripe.Address,
    payment_method?: Stripe.PaymentMethod

};
export interface Product{
    id: string,
    active?: boolean,
    name?: string,
    description?: string,
    images?: string[],
    metadata?: Stripe.Metadata
}
export interface Price {
    id: string,
    product_id?: string,
    active?: boolean,
    description?: string,
    type?: Stripe.Price.Type,
    unit_amount?: number,
    currency?: string,
    interval: Stripe.Price.Recurring.Interval,
    interval_count: number,
    trial_period_days: number,
    metadata: Stripe.Metadata,
    product?:Product,
}
export interface Subscription{
    id: string,
    user_id: string,
    status?: Stripe.Subscription.Status,
    metadata?: Stripe.Metadata,
    price_id?: string,
    quantity?: string
    cancel_at_period_end?: boolean,
    created:string,
    current_period_end:string,
    current_period_start:string,
    ended_at?:string,
    cancel_at?:string,
    canceled_at?:string,
    trial_start?:string,
    trial_end?:string,
    price?: Price;


}
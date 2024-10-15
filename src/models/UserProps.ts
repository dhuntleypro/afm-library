interface StoreAuth {
    id: string;
    password: string;
    user_id: string;
    email: string;
}

// Define the interface for cart items
export interface CartItem {
    id: string;
    productID: string;
    price: number;
    quantity: number;
    size: string;
    color: string;
    notes: string;
  }

export interface UserProps {
    id: string;
    store_ids: string[];
    store_owner_id: string;
    onboardingQ1: string;
    onboardingQ2: string;
    onboardingQ3: string;
    onboardingQ4: string;
    orders: string[];
    favoriteItems: string[];
    cart: CartItem[];
    abandonedCart?: boolean;
    affiliate_link: string;
    active: boolean;
    role: string;
    birthday: string;
    todo_completed: boolean;
    tableName: string;
    name: string;
    username: string;
    email: string;
    password: string;
    phone_number: string;
    gender: string;
    profile_image: string;
    isAdmin?: boolean;
    address?: string;
    address_city: string;
    address_state: string;
    address_zip?: string;
    location?: string;
    location_history: string[];
    current_notification: string;
    notifications: string[];
    payment_due: number;
    payment_due_date: string;
    payment_due_day: string;
    payment_monthly_amount: number;
    device_id: string;
    device_os_version: string;
    device_model: string;
    device_ip_address: string;
    device_battery_level: string;
    device_battery_statue: string;
    device_network_connectio_type: string;
    loyalty_date: string;
    payment_history_total: number;
    subscription_id: string;
    paid_subscriber: boolean;
    newsletter_subscriber: boolean;
    notification_subscriber: boolean;
    left_review: boolean;
    review_stars: number[];
    reviews: string[];
    testimonials: string[];
    notify_arn: string;
    owner_notify_arn: string;
}

const storeAuth: StoreAuth = {
    id: "",
    password: "",
    user_id: "",
    email: ""
};

export const userDATA: UserProps = {
    id: "",
    store_ids: [],
    store_owner_id: "",
    onboardingQ1: "",
    onboardingQ2: "",
    onboardingQ3: "",
    onboardingQ4: "",
    orders: [],
    favoriteItems: [],
    cart: [],
    affiliate_link: "",
    active: false,
    role: "",
    birthday: "",
    todo_completed: false,
    tableName: "",
    name: "",
    username: "",
    email: "",
    password: "",
    phone_number: "",
    gender: "",
    profile_image: "",
    address_city: "",
    address_state: "",
    location_history: [],
    current_notification: "",
    notifications: [],
    payment_due: 0,
    payment_due_date: "",
    payment_due_day: "",
    payment_monthly_amount: 0,
    device_id: "",
    device_os_version: "",
    device_model: "",
    device_ip_address: "",
    device_battery_level: "",
    device_battery_statue: "",
    device_network_connectio_type: "",
    loyalty_date: "",
    payment_history_total: 0,
    subscription_id: "",
    paid_subscriber: false,
    newsletter_subscriber: false,
    notification_subscriber: false,
    left_review: false,
    review_stars: [],
    reviews: [],
    testimonials: [],
    notify_arn: "",
    owner_notify_arn: ""
};
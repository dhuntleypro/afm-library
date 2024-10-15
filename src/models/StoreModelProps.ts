export interface StoreModelProps {
    id: string;
    owner_id: string;
    store_users: string[];
    stripe_id: string;
    timestamp: string;
    live: boolean;
    status: string;
    store_name: string;
    store_type: string;
    year_founded: string;
    store_primary_category: string;
    store_url: string;
    store_name_alt: string;
    business_type: string;
    store_founder: string;
    business_email: string;
    email: string;
    logo: string;
    zelle_qr_code: string;
    cash_app_qr_code: string;
    phone_number: string;
    store_address: string;
    store_address_state: string;
    store_address_city: string;
    store_address_zip: string;
    socialLinks: StoreSocialLinks;
    storeSettings: StoreSettings;
    seo_helmet: StoreSEO;
    images: StoreImages;
    daysOfOperation?: DaysOfOperation[];
    sliceItems?: SliceItem[];
    legal_doc_cookies_policy: string;
    legal_doc_terms_of_use: string;
    legal_doc_privacy_policy: string;
    legal_doc_contract: string;
    media: string[];
    colors: ColorItem[];
    slice_order: string[];
    slice_header: string;
    slice_footer: string;
    paypal_client_live_id: string;
    paypal_secret_live_key: string;
}

export interface ColorItem {
    id: string;
    name: string;
    color_code: string;
}

export interface StoreSettings {
    id: string;
    add_to_cart_force_register: boolean;
    font: string;
    popup_timer: number;
    free_shipping_amount: number;
    tax_total: number;
    abandoned_cart_users: string[];
    currency: string;
    default_language: string;
    newsletter_subscription_prompt: string;
    display_welcome_message: boolean;
    default_discount_percentage: number;
}

export interface SliceItem {
    id: string;
    name: string;
    page: string;
    type: string;
    position: number;
}

export interface StoreImages {
    image_holder: string;
    welcome_image: string;
    about_object_image: string;
    initial_popup_image: string;
    profile_image: string;
    doubleImageHero_left_image: string;
    login_popup_image: string;
    doubleImageHero_right_image: string;
    register_popup_image: string;
    newsletter_popup_image: string;
}

export interface DaysOfOperation {
    day: number;
    open: number;
    close: number;
}

export interface StoreSocialLinks {
    id: string;
    instagram_url: string;
    facebook_url: string;
    twitter_url: string;
    discord_url: string;
    youTube_url: string;
    tikTok_url: string;
    linkedin_url: string;
    pinterest_url: string;
}

export interface StoreSEO {
    id: string;
    helmet_home_page_title: string;
    helmet_home_page_description: string;
    helmet_cancel_payment_page_title: string;
    helmet_cancel_payment_page_description: string;
    helmet_profile_page_title: string;
    helmet_profile_page_description: string;
    helmet_shop_page_title: string;
    helmet_shop_page_description: string;
    helmet_subscribe_page_title: string;
    helmet_subscribe_page_description: string;
    helmet_success_page_title: string;
    helmet_success_page_description: string;
}
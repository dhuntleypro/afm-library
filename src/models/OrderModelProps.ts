// OrderHistory.ts
export interface OrderHistory {
  id: string;
  title: string;
  orderPlaced: boolean;
  orderEmailSent: boolean;
  orderPaymentReceived: boolean;
  inventoryCheck: string;
  orderProcessed: boolean;
  orderPackaged: boolean;
  orderShippingLabelGenerated: boolean;
  orderShipped: boolean;
  shippedDate: string;
  trackingNumber: string;
  deliveryConfirmed: boolean;
  orderDeliveryDate: string;
  orderReturned: boolean;
  orderReturnLabelGenerated: boolean;
  status: string;
  note: string;
}

// Parcel.ts
export interface Parcel {
  length: string;
  width: string;
  height: string;
  distance_unit: string;
  weight: string;
  mass_unit: string;
  value_amount: number;
  metadata: string;
  test: boolean;
}

// FullAddress.ts
export interface FullAddress {
  name: string;
  streetOne: string;
  streetTwo: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
  email: string;
  is_residential: boolean;
}

// OrderItem.ts
export interface OrderItem {
  id: string;
  quantity: number;
  sku: string;
  title: string;
  color: string;
  productId: string;
  size: string;
  image: string;
  total_price: number;
  length: string;
  width: string;
  height: string;
  weight: string;
  weight_unit: string;
  distance_unit: string;
  description: string;
  net_weight: string;
  value_amount: number;
  value_currency: string;
  origin_country: string;
  eccn_ear99: string;
}

// Order.ts
export interface OrderModelProps {
  id: string;
  stripe_id: string;
  store_id: string;
  index: number;
  order_status: string;
  items: OrderItem[];
  userId: string;
  order_history: OrderHistory[];
  total: number;
  net_total: number;
  courier: string;
  shipping_label: string;
  return_label: string;
  from_address: FullAddress;
  to_address: FullAddress;
  parcel: Parcel;
  title: string;
  type: string;
  coupon_code: string;
  referred_by: string;
  statement_descriptor: string;
  note: string;
  budget: string;
  order_placed_date: string;
  order_started_date: string;
  order_created_date: string;
  order_completed_date: string;
  tax: number;
  stripe_fee: number;
  afm_fee: number;
  shipping_cost: number;
  discount_amount: number;
}


export const SAMPLE_ORDER_ITEMS: OrderItem[] = [
  {
    id: "item123",
    quantity: 2,
    sku: "SKU12345",
    title: "Sample Product 1",
    color: "Red",
    productId: "prod123",
    size: "Medium",
    image: "https://example.com/sample-product-1.jpg",
    total_price: 399.98,
    length: "10",
    width: "5",
    height: "3",
    weight: "1.2",
    weight_unit: "kg",
    distance_unit: "cm",
    description: "This is a sample product item for a larger order.",
    net_weight: "1.1",
    value_amount: 200.00,
    value_currency: "USD",
    origin_country: "USA",
    eccn_ear99: "EAR99",
  },
  {
    id: "item124",
    quantity: 1,
    sku: "SKU54321",
    title: "Advanced Gadget",
    color: "Silver",
    productId: "prod124",
    size: "Large",
    image: "https://example.com/advanced-gadget.jpg",
    total_price: 299.99,
    length: "15",
    width: "8",
    height: "5",
    weight: "2.0",
    weight_unit: "kg",
    distance_unit: "cm",
    description: "An advanced gadget with cutting-edge technology.",
    net_weight: "1.9",
    value_amount: 299.99,
    value_currency: "USD",
    origin_country: "China",
    eccn_ear99: "EAR99",
  },
  {
    id: "item125",
    quantity: 3,
    sku: "SKU67890",
    title: "Basic Accessory",
    color: "Black",
    productId: "prod125",
    size: "One Size",
    image: "https://example.com/basic-accessory.jpg",
    total_price: 89.97,
    length: "7",
    width: "4",
    height: "2",
    weight: "0.5",
    weight_unit: "kg",
    distance_unit: "cm",
    description: "A basic accessory to complement your gadgets.",
    net_weight: "0.45",
    value_amount: 29.99,
    value_currency: "USD",
    origin_country: "Germany",
    eccn_ear99: "EAR99",
  },
];


export const SAMPLE_ORDER_HISTORY: OrderHistory = {
  id: "history_12345",
  title: "Order History for Order #12345",
  orderPlaced: true,
  orderEmailSent: true,
  orderPaymentReceived: true,
  inventoryCheck: "Inventory checked and verified",
  orderProcessed: true,
  orderPackaged: true,
  orderShippingLabelGenerated: true,
  orderShipped: true,
  shippedDate: "2024-08-18T10:00:00Z",
  trackingNumber: "TRACK123456789",
  deliveryConfirmed: false,
  orderDeliveryDate: "",
  orderReturned: false,
  orderReturnLabelGenerated: false,
  status: "Shipped",
  note: "Shipment is on its way to the customer.",
};

export const SAMPLE_FULL_ADDRESS: FullAddress = {
  name: "John Doe",
  streetOne: "123 Main St",
  streetTwo: "Apt 4B",
  city: "New York",
  state: "NY",
  zip: "10001",
  country: "USA",
  phone: "+1 555-555-5555",
  email: "johndoe@example.com",
  is_residential: true,
};

export const SAMPLE_PARCEL: Parcel = {
  length: "10",
  width: "5",
  height: "8",
  distance_unit: "in", // Assuming inches for the distance unit
  weight: "2.5",
  mass_unit: "lb", // Assuming pounds for the mass unit
  value_amount: 100, // Assuming a value of 100 currency units
  metadata: "Sample parcel metadata",
  test: false,
};

export const SAMPLE_ORDER: OrderModelProps = {
  id: "order_12345",
  stripe_id: "stripe_12345",
  store_id: "store_123",
  index: 1,
  order_status: "Processing",
  items: SAMPLE_ORDER_ITEMS,
  userId: "user_123",
  order_history: [SAMPLE_ORDER_HISTORY],
  total: 50.0,
  net_total: 45.0,
  courier: "UPS",
  shipping_label: "http://example.com/shipping-label.pdf",
  return_label: "http://example.com/return-label.pdf",
  from_address: SAMPLE_FULL_ADDRESS,
  to_address: SAMPLE_FULL_ADDRESS,
  parcel: SAMPLE_PARCEL,
  title: "Order #12345",
  type: "Standard",
  coupon_code: "DISCOUNT10",
  referred_by: "user_456",
  statement_descriptor: "Sample Order",
  note: "Please handle with care.",
  budget: "50.0",
  order_placed_date: "2024-08-17T08:00:00Z",
  order_started_date: "2024-08-18T08:00:00Z",
  order_created_date: "2024-08-17T08:00:00Z",
  order_completed_date: "2024-08-19T08:00:00Z",
  tax: 5.0,
  stripe_fee: 2.5,
  afm_fee: 1.5,
  shipping_cost: 10.0,
  discount_amount: 5.0,
};
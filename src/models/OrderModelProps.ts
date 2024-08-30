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


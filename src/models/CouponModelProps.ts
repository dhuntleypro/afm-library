export interface CouponModelProps {
    id: string;
    store_id: string;
    user_id: string;
    index: number;
    timestamp: string;
    title: string;
    description: string;
    active: boolean;
    couponCode: string;
    coupontype: CouponType;
    discountPercentage: number;
    validUntil: string;
    minPurchaseAmount: number;
    isActive: boolean;
    productsAppliedTo: string[];
    applyToAll: boolean;
  
}

export enum CouponType {
    All = "all",
    Product = "product",
    Products = "products",
    Shipping = "shipping"
  }
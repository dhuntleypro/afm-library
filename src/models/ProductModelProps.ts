interface SizingInventoryProps {
    size: string;
    inventory: number;
    price: number;
    color: string;
    color_code: string;
}

interface VariantInfoProps {
    title: string;
    description: string;
    price: number;
    sale_price: number;
    inventory: number;
}

interface ProductVariantProps {
    id: string;
    title: string;
    image: string;
    color_code: string;
    price: number;
    sale_price: number;
    description: string;
    features: string[];
    inventory: number;
    value_price: number;
    product_id: string;
    variantInfo: VariantInfoProps[];
}

  interface ItemReviewsProps {
    userName: string;
    title: string;
    comment: string;
  }
  
  interface ProductModelProps {
    id: string;
    store_id: string;
    index: number;
    createdOn: string;
    active: boolean;
    name: string;
    image: string;
    price: number;
    on_sale: boolean;
    sale_price: number;
    slug: string;
    quantity: number;
    description: string;
    icon_name: string;
    category: string;
    images: string[];
    included: string[];
    materials: string[];
    tags: string[];
    brand: string;
    views: number;
    likes: number;
    isLiked: boolean;
    gender: string;
    color: string;
    color_code: string;
    condition: string;
    features: string[];
    sku: string;
    variant_type: boolean;
    variant_selected:  Record<string, any>;
    variants: ProductVariantProps[];
    last_updated: string;
    item_type: string;
    ingredients: string[];
    inventory: number;
    reviews: ItemReviewsProps[];
    rating: number[];
    size: string;
    sizes: string[];
    weight: number;
    year_made: number;
  }



 const ProductDATA = (): ProductModelProps => ({
    id: "",
    name: '',
    price: 0,
    store_id: '',
    index: 0,
    createdOn: '',
    active: false,
    image: '',
    on_sale: false,
    sale_price: 0,
    slug: '',
    quantity: 0,
    description: '',
    icon_name: '',
    category: '',
    images: [],
    included: [],
    materials: [],
    tags: [],
    brand: '',
    views: 0,
    likes: 0,
    isLiked: false,
    gender: '',
    color: '',
    color_code: '',
    condition: '',
    features: [],
    sku: '',
    variant_type: false,
    variant_selected: {},
    variants: [],
    last_updated: '',
    item_type: '',
    ingredients: [],
    inventory: 0,
    reviews: [],
    rating: [],
    size: '',
    sizes: [],
    weight: 0,
    year_made: 0
  });






export {
  SizingInventoryProps,
  VariantInfoProps,
  ProductVariantProps,
  ItemReviewsProps,
  ProductModelProps,
  ProductDATA,
};
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









  const SAMPLE_PRODUCT: ProductModelProps[] = [
  {
    id: "prod123",
    name: "Sample Product",
    price: 199.99,
    store_id: "store456",
    index: 1,
    createdOn: "2024-08-16T12:00:00.000Z",
    active: true,
    image: "https://example.com/sample-product.jpg",
    on_sale: true,
    sale_price: 149.99,
    slug: "sample-product",
    quantity: 100,
    description: "This is a sample product description that highlights key features and benefits of the product.",
    icon_name: "sample-icon",
    category: "Electronics",
    images: [
      "https://example.com/sample-product-1.jpg",
      "https://example.com/sample-product-2.jpg",
    ],
    included: ["Charging cable", "User manual"],
    materials: ["Plastic", "Metal"],
    tags: ["electronics", "gadget", "sale"],
    brand: "SampleBrand",
    views: 1234,
    likes: 150,
    isLiked: true,
    gender: "Unisex",
    color: "Black",
    color_code: "#000000",
    condition: "New",
    features: ["Feature 1", "Feature 2", "Feature 3"],
    sku: "SKU12345",
    variant_type: true,
    variant_selected: {},
    variants: [
      {
        id: "variant1",
        title: "Sample Variant 1",
        image: "https://example.com/sample-variant1.jpg",
        color_code: "#FF0000",
        price: 199.99,
        sale_price: 149.99,
        description: "This is a description for the first variant.",
        features: ["Feature A", "Feature B"],
        inventory: 50,
        value_price: 149.99,
        product_id: "prod123",
        variantInfo: [
          {
            title: "Size",
            description: "Size description",
            price: 149.99,
            sale_price: 129.99,
            inventory: 20,
          },
        ],
      },
      {
        id: "variant2",
        title: "Sample Variant 2",
        image: "https://example.com/sample-variant2.jpg",
        color_code: "#00FF00",
        price: 209.99,
        sale_price: 169.99,
        description: "This is a description for the second variant.",
        features: ["Feature X", "Feature Y"],
        inventory: 30,
        value_price: 169.99,
        product_id: "prod123",
        variantInfo: [
          {
            title: "Color",
            description: "Color description",
            price: 169.99,
            sale_price: 149.99,
            inventory: 15,
          },
        ],
      },
    ],
    last_updated: "2024-08-16T15:00:00.000Z",
    item_type: "physical",
    ingredients: [],
    inventory: 100,
    reviews: [
      {
        userName: "John Doe",
        title: "Great product!",
        comment: "I really enjoyed using this product. Highly recommend it!",
      },
      {
        userName: "Jane Smith",
        title: "Good value for money",
        comment: "This product offers great value for the price.",
      },
    ],
    rating: [5, 4, 4, 5],
    size: "Medium",
    sizes: ["Small", "Medium", "Large"],
    weight: 1.5,
    year_made: 2023,
  }

]
  

export {
  SizingInventoryProps,
  VariantInfoProps,
  ProductVariantProps,
  ItemReviewsProps,
  ProductModelProps,
  ProductDATA,
  SAMPLE_PRODUCT
};
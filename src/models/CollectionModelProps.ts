export interface CollectionModelProps {
    id: string;
    store_id: string;
    user_id: string;
    index: number;
    timestamp: string;
    title: string;
    description: string;
    caption: string;
    amount: number;
    likes: number;
    isliked: boolean;
    onSale: boolean;
    relatedProductIds: string[];
    image: string;
    images: string[];
    tags: string[];
    active: boolean;
  
}

export const CollectionDATA = (): CollectionModelProps => ({
    id: "",
    store_id: "",
    user_id: "",
    index: 0,
    timestamp: "",
    title: "",
    description: "",
    caption: "",
    amount: 0,
    likes: 0,
    isliked: false,
    onSale: false,
    relatedProductIds: [],
    image: "",
    images: [],
    tags: [],
    active: false
})


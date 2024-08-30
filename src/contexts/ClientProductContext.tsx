import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { ProductModelProps } from "../models/ProductModelProps";
// import { getProducts, postProduct, deleteProduct } from "../api/productsApi";
import { useAuth } from "./AuthContext";
import { Alert } from "react-native";
import { router } from "expo-router";
// import MyAlert from "../components/interfaces/MyAlert";
import { CONSTANTS } from "../utils/constants";
import { deleteProduct, getProducts, postProduct } from "@/api/productsApi";

interface ProductContextProps {
  products: ProductModelProps[];
  addClientProduct: (product: ProductModelProps) => Promise<void>;
  removeClientProduct: (productId: string) => Promise<void>;
  updateClientProduct: (product: ProductModelProps) => Promise<void>;
  getClientProducts: () => void;
  selectedProduct: ProductModelProps | null;
  selectProduct: (product: ProductModelProps) => void;
  isLoading: boolean;
  error: string | null;
}

export const ClientProductContext = createContext<ProductContextProps | undefined>(undefined);

export const useClientProduct = () => {
  const context = useContext(ClientProductContext);
  if (!context) {
    throw new Error("useClientProduct must be used within an ClientProductProvider");
  }
  return context;
}

export const ClientProductProvider = ({ children }: { children: ReactNode }) => {
  const { authState } = useAuth();
  const [products, setProducts] = useState<ProductModelProps[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<ProductModelProps | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // if (authState?.token) {
    console.log("Getting store products...")
      getClientProducts(); // Initial load of products
    // }
  }, []);

  const addClientProduct = async (product: ProductModelProps) => {
    if (!authState?.user) return;

    const storeID = authState.user.store_owner_id || '';
    const email = authState.user.email || '';
    const token = authState?.token || ""

    setIsLoading(true);
    try {
      await postProduct(product, storeID, email, token );
      setProducts((prevProducts) => [...prevProducts, product]);
      console.log("product added", product );

      // change fix
      router.push('/')

    } catch (error: any) {
      console.error("Failed to add product:", error.response?.data );
      

      // <MyAlert
      // title="Product not Created"
      // message="You are missing information. Please update your store."
      // onCancelPress={() => console.log("Cancel Pressed")}
      // onUpdatePress={() => router.push('/store')}
      // />   
      setError(error.response?.data || "Failed to add product. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const removeClientProduct = async (productId: string) => {
    setIsLoading(true);
    try {
      await deleteProduct({ id: productId });
      setProducts((prevProducts) => prevProducts.filter(product => product.id !== productId));
    } catch (error: any) {
      console.error("Failed to remove product:", error.response?.data?.message || error.message);
      setError(error.response?.data?.message || "Failed to remove product. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const updateClientProduct = async (product: ProductModelProps) => {
    setIsLoading(true);
    try {
      await updateClientProduct(product);
      setProducts((prevProducts) => prevProducts.map(o => o.id === product.id ? product : o));
    } catch (error: any) {
      console.error("Failed to update product:", error.response?.data?.message || error.message);
      setError(error.response?.data?.message || "Failed to update product. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const getClientProducts = async () => {
    // if (!authState?.user) return;

    setIsLoading(true);
    setError(null);
    try {
      const email = '';
      const store_owner_id = CONSTANTS.store_id // authState.user.store_owner_id || '';

      const response = await getProducts(store_owner_id, email);
      const fetchedProducts = response.data;
      setProducts(fetchedProducts);
      console.log("Products Fetched !!")
    } catch (error: any) {
      console.error("Failed to fetch products:", error.response?.data?.message || error.message);
      setError(error.response?.data?.message || "Failed to fetch products. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const selectProduct = (product: ProductModelProps) => {
    setSelectedProduct(product);
  };

  return (
    <ClientProductContext.Provider 
      value={{ 
        products, 
        addClientProduct, 
        removeClientProduct, 
        updateClientProduct, 
        getClientProducts, 
        selectedProduct, 
        selectProduct, 
        isLoading, 
        error 
      }}
    >
      {children}
    </ClientProductContext.Provider>
  );
};


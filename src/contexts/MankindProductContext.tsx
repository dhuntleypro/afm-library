import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { ProductModelProps } from "../models/ProductModelProps";
// import { getMankindProducts as gmP } from "../api/mankindProductApi";
import { CONSTANTS } from "../utils/constants";
import { getMankindProductsApi } from "@/api/mankindProductApi";
import { useClientStore } from "./ClientStoreContext";

interface ProductContextProps {
  products: ProductModelProps[];
  addProduct: (product: ProductModelProps) => void;
  removeProduct: (productId: string) => void;
  getMankindProducts: () => void;
  selectedProduct: ProductModelProps | null;
  selectProduct: (product: ProductModelProps) => void;
  isLoading: boolean;
  error: string | null;
}

export const MankindProductContext = createContext<ProductContextProps | undefined>(undefined);

export const useMankindProduct = () => {
  const context = useContext(MankindProductContext);
  if (!context) {
    throw new Error("useMankindProduct must be used within a MankindProductProvider");
  }
  return context;
};

export const MankindProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<ProductModelProps[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<ProductModelProps | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const {store} = useClientStore()
  // useEffect(() => {
  //   console.log("getMankindProducts()....")
  //   getMankindProducts(); // Initial load of products
  // }, []);

  const addProduct = (product: ProductModelProps) => {
    setProducts((prevProducts) => [...prevProducts, product]);
  };

  const removeProduct = (productId: string) => {
    setProducts((prevProducts) => prevProducts.filter(product => product.id !== productId));
  };

  const getMankindProducts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const email = ""; // Replace with logic to get the current user's email
      const response = await getMankindProductsApi(store?.id ?? "", email);
      const fetchedProducts = response.data; // Extract the data from the  response
      setProducts(fetchedProducts);
    } catch (error) {
      console.error("Failed to fetch mankind products:", error);
      setError("Failed to fetch products. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const selectProduct = (product: ProductModelProps) => {
    setSelectedProduct(product);
  };

  return (
    <MankindProductContext.Provider 
      value={{ 
        products, 
        addProduct, 
        removeProduct, 
        getMankindProducts, 
        selectedProduct, 
        selectProduct, 
        isLoading, 
        error 
      }}
    >
      {children}
    </MankindProductContext.Provider>
  );
};

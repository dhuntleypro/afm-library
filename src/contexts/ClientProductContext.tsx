import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { getClientProductApi, getClientProductsApi } from '@/api/productApi';
import { ProductModelProps } from '@/models/ProductModelProps';
import { CONSTANTS } from '@/utils/constants';

// Define the context interface for client products
interface ClientProductContextProps {
  product: ProductModelProps | null;
  products: ProductModelProps[]; // To store multiple products
  getClientProducts: (store_id: string) => void; // Fetch multiple products
  getClientProduct: (store_id: string) => void; // Fetch a single product
  addProduct: (product: ProductModelProps) => void;
  removeProduct: () => void;
  selectedProduct: ProductModelProps | null;
  selectProduct: (product: ProductModelProps) => void;
  error: string | null;
  isLoading: boolean;
}

const ClientProductContext = createContext<ClientProductContextProps | undefined>(undefined);

// Hook for accessing client product context
export const useClientProduct = (): ClientProductContextProps => {
  const context = useContext(ClientProductContext);
  if (!context) {
    throw new Error('useClientProduct must be used within a ClientProductProvider');
  }
  return context;
};

export const ClientProductProvider = ({ children }: { children: ReactNode }) => {
  const [product, setProduct] = useState<ProductModelProps | null>(null);
  const [products, setProducts] = useState<ProductModelProps[]>([]); // Store multiple products
  const [selectedProduct, setSelectedProduct] = useState<ProductModelProps | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Add a product to the state
  const addProduct = (newProduct: ProductModelProps) => setProduct(newProduct);

  // Remove the currently stored product
  const removeProduct = () => setProduct(null);

  // Select a product to set as the current active one
  const selectProduct = (product: ProductModelProps) => setSelectedProduct(product);

  // Fetch a single product using the provided product_owner_id
  const getClientProduct = async (product_owner_id: string) => {
    setIsLoading(true);
    setError(null); // Reset error state
    try {
      const response = await getClientProductApi(product_owner_id);
      setProduct(response.data);
      console.log(`Fetched client product: ${response.data}`);
    } catch (error: any) {
      console.error("Error fetching product:", error.message);
      setError(error.message || "Failed to fetch product. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch multiple products using the store_id
  const getClientProducts = async (store_id: string) => {
    setIsLoading(true);
    setError(null); // Reset error state
    try {
      const response = await getClientProductsApi(store_id , true );
      setProducts(response.data);
      console.log(`Fetched client products: ${response.data}`);
    } catch (error: any) {
      console.error("Error fetching products:", error.message);
      setError(error.message || "Failed to fetch products. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ClientProductContext.Provider
      value={{
        product,
        products, // Pass the products array
        getClientProduct,
        getClientProducts, // Provide getClientProducts to the context
        addProduct,
        removeProduct,
        selectedProduct,
        selectProduct,
        error,
        isLoading,
      }}
    >
      {children}
    </ClientProductContext.Provider>
  );
};


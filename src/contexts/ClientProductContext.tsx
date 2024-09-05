import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { getClientProductApi, getClientProductsApi } from '@/api/productApi';
import { ProductModelProps } from '@/models/ProductModelProps';
import { CONSTANTS } from '@/utils/constants';

interface ClientProductContextProps {
  product: ProductModelProps | null;
  products: ProductModelProps[];
  getClientProducts: (store_id: string) => Promise<void>;
  getClientProduct: (product_owner_id: string) => Promise<void>;
  addProduct: (product: ProductModelProps) => void;
  removeProduct: () => void;
  selectedProduct: ProductModelProps | null;
  selectProduct: (product: ProductModelProps) => void;
  error: string | null;
  isLoading: boolean;
}

const ClientProductContext = createContext<ClientProductContextProps | undefined>(undefined);

export const useClientProduct = (): ClientProductContextProps => {
  const context = useContext(ClientProductContext);
  if (!context) {
    throw new Error('useClientProduct must be used within a ClientProductProvider');
  }
  return context;
};

export const ClientProductProvider = ({ children }: { children: ReactNode }) => {
  const [product, setProduct] = useState<ProductModelProps | null>(null);
  const [products, setProducts] = useState<ProductModelProps[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<ProductModelProps | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Add product to the state
  const addProduct = useCallback((newProduct: ProductModelProps) => {
    setProduct(newProduct);
  }, []);

  // Remove the product from the state
  const removeProduct = useCallback(() => {
    setProduct(null);
  }, []);

  // Select a product as active
  const selectProduct = useCallback((product: ProductModelProps) => {
    setSelectedProduct(product);
  }, []);

  // Fetch a single product
  const getClientProduct = useCallback(async (product_owner_id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getClientProductApi(product_owner_id);
      setProduct(response.data);
      console.log(`Fetched client product Successfully`);
      // console.log(`Fetched client product: ${JSON.stringify(response.data, null, 2)}`);
    } catch (error: any) {
      console.error("Error fetching product:", error.message);
      setError(error.message || "Failed to fetch product. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch multiple products
  const getClientProducts = useCallback(async (store_id: string): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const response: ProductModelProps[] = await getClientProductsApi(store_id, true);
      // console.log("Full API response:", JSON.stringify(response, null, 2));
      if (!response || response.length === 0) {
        throw new Error('No data returned from the API');
      }

      const validProducts = response.filter(product => product && product.id);
      setProducts(validProducts);
      // console.log(`Fetched client products: ${JSON.stringify(validProducts, null, 2)}`);
      console.log(`Fetched client products Successfully`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error fetching products:", error.message);
        setError(error.message || "Failed to fetch products. Please try again later.");
      } else {
        console.error("Unknown error fetching products");
        setError("Failed to fetch products. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <ClientProductContext.Provider
      value={{
        product,
        products,
        getClientProduct,
        getClientProducts,
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























// import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
// import { getClientProductApi, getClientProductsApi } from '@/api/productApi';
// import { ProductModelProps } from '@/models/ProductModelProps';
// import { CONSTANTS } from '@/utils/constants';

// // Define the context interface for client products
// interface ClientProductContextProps {
//   product: ProductModelProps | null;
//   products: ProductModelProps[]; // To store multiple products
//   getClientProducts: (store_id: string) => void; // Fetch multiple products
//   getClientProduct: (store_id: string) => void; // Fetch a single product
//   addProduct: (product: ProductModelProps) => void;
//   removeProduct: () => void;
//   selectedProduct: ProductModelProps | null;
//   selectProduct: (product: ProductModelProps) => void;
//   error: string | null;
//   isLoading: boolean;
// }

// const ClientProductContext = createContext<ClientProductContextProps | undefined>(undefined);

// // Hook for accessing client product context
// export const useClientProduct = (): ClientProductContextProps => {
//   const context = useContext(ClientProductContext);
//   if (!context) {
//     throw new Error('useClientProduct must be used within a ClientProductProvider');
//   }
//   return context;
// };

// export const ClientProductProvider = ({ children }: { children: ReactNode }) => {
//   const [product, setProduct] = useState<ProductModelProps | null>(null);
//   const [products, setProducts] = useState<ProductModelProps[]>([]); // Store multiple products
//   const [selectedProduct, setSelectedProduct] = useState<ProductModelProps | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(false);

//   // Add a product to the state
//   const addProduct = (newProduct: ProductModelProps) => setProduct(newProduct);

//   // Remove the currently stored product
//   const removeProduct = () => setProduct(null);

//   // Select a product to set as the current active one
//   const selectProduct = (product: ProductModelProps) => setSelectedProduct(product);

//   // Fetch a single product using the provided product_owner_id
//   const getClientProduct = async (product_owner_id: string) => {
//     setIsLoading(true);
//     setError(null); // Reset error state
//     try {
//       const response = await getClientProductApi(product_owner_id);
//       setProduct(response.data);
//       console.log(`Fetched client product: ${response.data}`);
//     } catch (error: any) {
//       console.error("Error fetching product:", error.message);
//       setError(error.message || "Failed to fetch product. Please try again later.");
//     } finally {
//       setIsLoading(false);
//     }
//   };
    
//   const getClientProducts = async (store_id: string): Promise<void> => {
//     setIsLoading(true);
//     setError(null); // Reset error state
  
//     try {
//       // The response is now expected to be an array of ProductModelProps
//       const response: ProductModelProps[] = await getClientProductsApi(store_id, true);
  
//       // Log the full response to check its structure
//       console.log("Full API response:", JSON.stringify(response, null, 2));
  
//       // Ensure the response contains data
//       if (!response || response.length === 0) {
//         throw new Error('No data returned from the API');
//       }
  
//       // Filter valid products that have an 'id'
//       const validProducts: ProductModelProps[] = response.filter((product: ProductModelProps) => product && product.id);
  
//       // Set the valid products to state
//       setProducts(validProducts);
//       console.log(`Fetched client products: ${JSON.stringify(validProducts, null, 2)}`);
//     } catch (error: unknown) {
//       // Check if the error has a message and handle it accordingly
//       if (error instanceof Error) {
//         console.error("Error fetching products:", error.message);
//         setError(error.message || "Failed to fetch products. Please try again later.");
//       } else {
//         console.error("Unknown error fetching products");
//         setError("Failed to fetch products. Please try again later.");
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };
  
  
//   return (
//     <ClientProductContext.Provider
//       value={{
//         product,
//         products, // Pass the products array
//         getClientProduct,
//         getClientProducts, // Provide getClientProducts to the context
//         addProduct,
//         removeProduct,
//         selectedProduct,
//         selectProduct,
//         error,
//         isLoading,
//       }}
//     >
//       {children}
//     </ClientProductContext.Provider>
//   );
// };


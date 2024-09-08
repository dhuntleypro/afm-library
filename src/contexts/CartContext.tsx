import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { ProductModelProps } from "@/models/ProductModelProps";

// Define the context type
interface CartContextType {
  carts: Partial<ProductModelProps>[];
  addToCart: (item: Partial<ProductModelProps>) => Promise<void>;
  decreaseFromCart: (item: Partial<ProductModelProps>) => void;
  deleteItemFromCart: (item: Partial<ProductModelProps>) => void;
  totalSum: number;
  totalTax: number;
  totalShipping: number;
  grandTotal: number;
  quantity: number;
  clearData: () => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

// Updated CartProvider to accept storage and storageKey as props
interface CartProviderProps {
  children: ReactNode;
  storage: {
    getItem: (key: string) => Promise<string | null>;
    setItem: (key: string, value: string) => Promise<void>;
    removeItem: (key: string) => Promise<void>;
  };
  storageKey: string;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children, storage, storageKey }) => {
  const [carts, setCarts] = useState<Partial<ProductModelProps>[]>([]);
  const [totalSum, setTotalSum] = useState<number>(0);
  const [totalShipping, setTotalShipping] = useState<number>(10); // Example shipping cost
  const [quantity, setQuantity] = useState<number>(0);

  const totalTax = totalSum * 0.08875; // Tax calculation
  const grandTotal = totalSum + totalTax + totalShipping; // Grand total calculation

  // Load carts from provided storage when the component mounts
  useEffect(() => {
    const loadCarts = async () => {
      try {
        const storedCarts = await storage.getItem(storageKey);
        if (storedCarts) {
          const parsedCarts = JSON.parse(storedCarts);
          setCarts(parsedCarts);
          calculateTotalSum(parsedCarts);
          setQuantity(parsedCarts.reduce((sum: number, item: Partial<ProductModelProps>) => sum + (item.quantity || 0), 0));
        }
      } catch (error) {
        console.error("Failed to load carts from storage:", error);
      }
    };
    loadCarts();
  }, [storage, storageKey]);

  // Save carts to provided storage whenever they are updated
  useEffect(() => {
    const saveCarts = async () => {
      try {
        if (carts.length > 0) {
          await storage.setItem(storageKey, JSON.stringify(carts));
        }
      } catch (error) {
        console.error("Failed to save carts to storage:", error);
      }
    };
    saveCarts();
  }, [carts, storage, storageKey]);

  const addToCart = async (item: Partial<ProductModelProps>) => {
    let updatedCarts = [...carts];
    const itemExistIndex = updatedCarts.findIndex((cart) => cart.id === item.id);

    if (itemExistIndex !== -1) {
      updatedCarts[itemExistIndex].quantity = (updatedCarts[itemExistIndex].quantity || 0) + 1;
    } else {
      updatedCarts = [...updatedCarts, { ...item, quantity: 1 }];
    }

    setCarts(updatedCarts);
    calculateTotalSum(updatedCarts);
    setQuantity((prev) => prev + 1);
  };

  const decreaseFromCart = (item: Partial<ProductModelProps>) => {
    const itemExistIndex = carts.findIndex((cart) => cart.id === item.id);
    if (itemExistIndex !== -1) {
      const updatedCarts = [...carts];
      if ((updatedCarts[itemExistIndex].quantity || 0) > 1) {
        updatedCarts[itemExistIndex].quantity = (updatedCarts[itemExistIndex].quantity || 0) - 1;
      } else {
        updatedCarts.splice(itemExistIndex, 1); // Remove item if quantity <= 1
      }

      setCarts(updatedCarts);
      calculateTotalSum(updatedCarts);
      setQuantity((prev) => prev - 1);
    }
  };

  const deleteItemFromCart = (item: Partial<ProductModelProps>) => {
    const updatedCarts = carts.filter((cart) => cart.id !== item.id);
    setCarts(updatedCarts);
    calculateTotalSum(updatedCarts);
    setQuantity((prev) => prev - (item.quantity || 0));
  };

  const clearData = () => {
    setCarts([]);
    setTotalSum(0);
    setQuantity(0);
    storage.removeItem(storageKey); // Clear from storage as well
  };

  const calculateTotalSum = (carts: Partial<ProductModelProps>[]) => {
    const total = carts.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 0), 0);
    setTotalSum(total);
  };

  const value: CartContextType = {
    carts,
    addToCart,
    decreaseFromCart,
    quantity,
    totalSum,
    totalTax,
    totalShipping,
    grandTotal,
    deleteItemFromCart,
    clearData,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};



















// import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { ProductModelProps } from "@/models/ProductModelProps"; 

// // Define the context type
// interface CartContextType {
//   carts: Partial<ProductModelProps>[];
//   addToCart: (item: Partial<ProductModelProps>) => Promise<void>;
//   decreaseFromCart: (item: Partial<ProductModelProps>) => void;
//   deleteItemFromCart: (item: Partial<ProductModelProps>) => void;
//   totalSum: number;
//   totalTax: number;
//   totalShipping: number;
//   grandTotal: number;
//   quantity: number;
//   clearData: () => void;
// }

// export const CartContext = createContext<CartContextType | undefined>(undefined);

// export const useCart = (): CartContextType => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error("useCart must be used within a CartProvider");
//   }
//   return context;
// };

// // Update CartProvider to accept CARTS_KEY as a prop
// export const CartProvider = ({ children, storageKey }: { children: ReactNode; storageKey: string }) => {
//   const [carts, setCarts] = useState<Partial<ProductModelProps>[]>([]);
//   const [totalSum, setTotalSum] = useState<number>(0);
//   const [totalShipping, setTotalShipping] = useState<number>(10); // Example shipping cost
//   const [quantity, setQuantity] = useState<number>(0);
  
//   const totalTax = totalSum * 0.08875; // Tax calculation
//   const grandTotal = totalSum + totalTax + totalShipping; // Grand total calculation

//   // Load carts from AsyncStorage when the component mounts
//   useEffect(() => {
//     const loadCarts = async () => {
//       try {
//         const storedCarts = await AsyncStorage.getItem(storageKey); // Use passed storage key
//         if (storedCarts) {
//           const parsedCarts = JSON.parse(storedCarts);
//           setCarts(parsedCarts);
//           calculateTotalSum(parsedCarts);
//           setQuantity(parsedCarts.reduce((sum: number, item: Partial<ProductModelProps>) => sum + (item.quantity || 0), 0));
//         }
//       } catch (error) {
//         console.error("Failed to load carts from storage:", error);
//       }
//     };
//     loadCarts();
//   }, [storageKey]);

//   // Save carts to AsyncStorage whenever they are updated
//   useEffect(() => {
//     const saveCarts = async () => {
//       try {
//         await AsyncStorage.setItem(storageKey, JSON.stringify(carts)); // Use passed storage key
//       } catch (error) {
//         console.error("Failed to save carts to storage:", error);
//       }
//     };
//     if (carts.length > 0) {
//       saveCarts();
//     }
//   }, [carts, storageKey]);

//   const addToCart = async (item: Partial<ProductModelProps>) => {
//     let updatedCarts = [...carts];
//     const itemExistIndex = updatedCarts.findIndex((cart) => cart.id === item.id);

//     if (itemExistIndex !== -1) {
//       updatedCarts[itemExistIndex].quantity = (updatedCarts[itemExistIndex].quantity || 0) + 1;
//     } else {
//       updatedCarts = [...updatedCarts, { ...item, quantity: 1 }];
//     }

//     setCarts(updatedCarts);
//     calculateTotalSum(updatedCarts);
//     setQuantity((prev) => prev + 1);
//   };

//   const decreaseFromCart = (item: Partial<ProductModelProps>) => {
//     const itemExistIndex = carts.findIndex((cart) => cart.id === item.id);
//     if (itemExistIndex !== -1) {
//       const updatedCarts = [...carts];
//       if ((updatedCarts[itemExistIndex].quantity || 0) > 1) {
//         updatedCarts[itemExistIndex].quantity = (updatedCarts[itemExistIndex].quantity || 0) - 1;
//       } else {
//         updatedCarts.splice(itemExistIndex, 1); // Remove item if quantity <= 1
//       }

//       setCarts(updatedCarts);
//       calculateTotalSum(updatedCarts);
//       setQuantity((prev) => prev - 1);
//     }
//   };

//   const deleteItemFromCart = (item: Partial<ProductModelProps>) => {
//     const updatedCarts = carts.filter((cart) => cart.id !== item.id);
//     setCarts(updatedCarts);
//     calculateTotalSum(updatedCarts);
//     setQuantity((prev) => prev - (item.quantity || 0));
//   };

//   const clearData = () => {
//     setCarts([]);
//     setTotalSum(0);
//     setQuantity(0);
//     AsyncStorage.removeItem(storageKey); // Clear from storage as well
//   };

//   const calculateTotalSum = (carts: Partial<ProductModelProps>[]) => {
//     const total = carts.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 0), 0);
//     setTotalSum(total);
//   };

//   const value: CartContextType = {
//     carts,
//     addToCart,
//     decreaseFromCart,
//     quantity,
//     totalSum,
//     totalTax,
//     totalShipping,
//     grandTotal,
//     deleteItemFromCart,
//     clearData,
//   };

//   return (
//     <CartContext.Provider value={value}>
//       {children}
//     </CartContext.Provider>
//   );
// };































// import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { ProductModelProps } from "@/models/ProductModelProps"; 

// // Define the context type
// interface CartContextType {
//   carts: Partial<ProductModelProps>[];
//   addToCart: (item: Partial<ProductModelProps>) => Promise<void>;
//   decreaseFromCart: (item: Partial<ProductModelProps>) => void;
//   deleteItemFromCart: (item: Partial<ProductModelProps>) => void;
//   totalSum: number;
//   totalTax: number;
//   totalShipping: number;
//   grandTotal: number;
//   quantity: number;
//   clearData: () => void;
// }

// export const CartContext = createContext<CartContextType | undefined>(undefined);
// // const CARTS_KEY = 'user_carts'; // Key for storing carts in AsyncStorage

// export const useCart = (): CartContextType => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error("useCart must be used within a CartProvider");
//   }
//   return context;
// };

// export const CartProvider = ({ children }: { children: ReactNode }) => {
//   const [carts, setCarts] = useState<Partial<ProductModelProps>[]>([]);
//   const [totalSum, setTotalSum] = useState<number>(0);
//   const [totalShipping, setTotalShipping] = useState<number>(10); // Example shipping cost
//   const [quantity, setQuantity] = useState<number>(0);
  
//   // Calculating total tax and grand total
//   const totalTax = totalSum * 0.08875; 
//   const grandTotal = totalSum + totalTax + totalShipping; 

//   // Load carts from AsyncStorage when the component mounts
//   useEffect(() => {
//     const loadCarts = async () => {
//       try {
//         const storedCarts = await AsyncStorage.getItem(CARTS_KEY);
//         if (storedCarts) {
//           const parsedCarts = JSON.parse(storedCarts);
//           setCarts(parsedCarts);
//           calculateTotalSum(parsedCarts);
//           setQuantity(parsedCarts.reduce((sum: number, item: Partial<ProductModelProps>) => sum + (item.quantity || 0), 0));
//         }
//       } catch (error) {
//         console.error("Failed to load carts from storage:", error);
//       }
//     };
//     loadCarts();
//   }, []);

//   // Save carts to AsyncStorage whenever they are updated
//   useEffect(() => {
//     const saveCarts = async () => {
//       try {
//         await AsyncStorage.setItem(CARTS_KEY, JSON.stringify(carts));
//       } catch (error) {
//         console.error("Failed to save carts to storage:", error);
//       }
//     };
//     if (carts.length > 0) {
//       saveCarts();
//     }
//   }, [carts]);

//   const addToCart = async (item: Partial<ProductModelProps>) => {
//     let updatedCarts = [...carts];
//     const itemExistIndex = updatedCarts.findIndex((cart) => cart.id === item.id);

//     if (itemExistIndex !== -1) {
//       updatedCarts[itemExistIndex].quantity = (updatedCarts[itemExistIndex].quantity || 0) + 1;
//     } else {
//       updatedCarts = [...updatedCarts, { ...item, quantity: 1 }];
//     }

//     setCarts(updatedCarts);
//     calculateTotalSum(updatedCarts);
//     setQuantity((prev) => prev + 1);
//   };

//   const decreaseFromCart = (item: Partial<ProductModelProps>) => {
//     const itemExistIndex = carts.findIndex((cart) => cart.id === item.id);
//     if (itemExistIndex !== -1) {
//       const updatedCarts = [...carts];
//       if ((updatedCarts[itemExistIndex].quantity || 0) > 1) {
//         updatedCarts[itemExistIndex].quantity = (updatedCarts[itemExistIndex].quantity || 0) - 1;
//       } else {
//         updatedCarts.splice(itemExistIndex, 1); // Remove item if quantity <= 1
//       }

//       setCarts(updatedCarts);
//       calculateTotalSum(updatedCarts);
//       setQuantity((prev) => prev - 1);
//     }
//   };

//   const deleteItemFromCart = (item: Partial<ProductModelProps>) => {
//     const updatedCarts = carts.filter((cart) => cart.id !== item.id);
//     setCarts(updatedCarts);
//     calculateTotalSum(updatedCarts);
//     setQuantity((prev) => prev - (item.quantity || 0));
//   };

//   const clearData = () => {
//     setCarts([]);
//     setTotalSum(0);
//     setQuantity(0);
//     AsyncStorage.removeItem(CARTS_KEY); // Clear from storage as well
//   };

//   const calculateTotalSum = (carts: Partial<ProductModelProps>[]) => {
//     const total = carts.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 0), 0);
//     setTotalSum(total);
//   };

//   const value: CartContextType = {
//     carts,
//     addToCart,
//     decreaseFromCart,
//     quantity,
//     totalSum,
//     totalTax,
//     totalShipping,
//     grandTotal,
//     deleteItemFromCart,
//     clearData,
//   };

//   return (
//     <CartContext.Provider value={value}>
//       {children}
//     </CartContext.Provider>
//   );
// };































// import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
// import { useFocusEffect } from "@react-navigation/native";
// import { ProductModelProps } from "@/models/ProductModelProps"; 
// import AsyncStorage from "@react-native-async-storage/async-storage";

// // Define the context type
// interface CartContextType {
//   carts: Partial<ProductModelProps>[];
//   addToCart: (item: Partial<ProductModelProps>) => Promise<void>;
//   decreaseFromCart: (item: Partial<ProductModelProps>) => void;
//   deleteItemFromCart: (item: Partial<ProductModelProps>) => void;
//   totalSum: number;
//   totalTax: number;
//   totalShipping: number;
//   grandTotal: number;
//   quantity: number;
//   clearData: (authUser: any) => void;
// }

// export const CartContext = createContext<CartContextType | undefined>(undefined);
// const CARTS_KEY = 'user_carts'; // Key for storing carts in AsyncStorage

// export const useCart = (): CartContextType => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error("useCart must be used within a CartProvider");
//   }
//   return context;
// };


// export const CartProvider = ({ children }: { children: ReactNode }) => {
//   const [carts, setCarts] = useState<Partial<ProductModelProps>[]>([]);
//   const [totalSum, setTotalSum] = useState<number>(0);
//   const [totalShipping, setTotalShipping] = useState<number>(10);
//   const [quantity, setQuantity] = useState<number>(0);
//   const totalTax = totalSum * 0.08875; // Tax calculation
//   const grandTotal = totalSum + totalTax + totalShipping; // Grand total calculation

//   // Load carts from AsyncStorage when the component mounts
//   useEffect(() => {
//     const loadCarts = async () => {
//       try {
//         const storedCarts = await AsyncStorage.getItem(CARTS_KEY);
//         if (storedCarts) {
//           setCarts(JSON.parse(storedCarts));
//         }
//       } catch (error) {
//         console.error("Failed to load carts from storage:", error);
//       }
//     };
//     loadCarts();
//   }, []);

//   // Save carts to AsyncStorage whenever they are updated
//   useEffect(() => {
//     const saveCarts = async () => {
//       try {
//         await AsyncStorage.setItem(CARTS_KEY, JSON.stringify(carts));
//       } catch (error) {
//         console.error("Failed to save carts to storage:", error);
//       }
//     };
//     saveCarts();
//   }, [carts]);

//   const addToCart = async (item: Partial<ProductModelProps>) => {
//     let updatedCarts = [...carts];
//     const itemExistIndex = updatedCarts.findIndex((cart) => cart.id === item.id);

//     if (itemExistIndex !== -1) {
//       updatedCarts[itemExistIndex].quantity = (updatedCarts[itemExistIndex].quantity || 0) + 1;
//     } else {
//       updatedCarts = [...updatedCarts, { ...item, quantity: 1 }];
//     }

//     setCarts(updatedCarts);
//     calculateTotalSum(updatedCarts);
//     setQuantity((prev) => prev + 1);
//   };

//   const decreaseFromCart = (item: Partial<ProductModelProps>) => {
//     const itemExistIndex = carts.findIndex((cart) => cart.id === item.id);
//     if (itemExistIndex !== -1) {
//       const updatedCarts = [...carts];
//       if ((updatedCarts[itemExistIndex].quantity || 0) > 1) {
//         updatedCarts[itemExistIndex].quantity = (updatedCarts[itemExistIndex].quantity || 0) - 1;
//       } else {
//         updatedCarts.splice(itemExistIndex, 1); // Remove item if quantity <= 1
//       }

//       setCarts(updatedCarts);
//       calculateTotalSum(updatedCarts);
//       setQuantity((prev) => prev - 1);
//     }
//   };

//   const deleteItemFromCart = (item: Partial<ProductModelProps>) => {
//     const updatedCarts = carts.filter((cart) => cart.id !== item.id);
//     setCarts(updatedCarts);
//     calculateTotalSum(updatedCarts);
//     setQuantity((prev) => prev - (item.quantity || 0));
//   };

//   const clearData = () => {
//     setCarts([]);
//     setTotalSum(0);
//     setQuantity(0);
//     AsyncStorage.removeItem(CARTS_KEY); // Clear from storage as well
//   };

//   const calculateTotalSum = (carts: Partial<ProductModelProps>[]) => {
//     const total = carts.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 0), 0);
//     setTotalSum(total);
//   };


//   const value: CartContextType = {
//     carts,
//     addToCart,
//     decreaseFromCart,
//     quantity,
//     totalSum,
//     totalTax,
//     totalShipping,
//     grandTotal,
//     deleteItemFromCart,
//     clearData,
//   };

//   return (
//     <CartContext.Provider value={value}>
//       {children}
//     </CartContext.Provider>
//   );
// };




























// import React, { createContext, useContext, useState, ReactNode } from "react";
// import { useFocusEffect } from "@react-navigation/native";
// import { ProductModelProps } from "@/models/ProductModelProps"; 

// // Define the context type
// interface CartContextType {
//   carts: Partial<ProductModelProps>[];
//   addToCart: (item: Partial<ProductModelProps>, authUser: any, updateSingleUserItem: any) => void;
//   decreaseFromCart: (item: Partial<ProductModelProps>, authUser: any, updateSingleUserItem: any) => void;
//   deleteItemFromCart: (item: Partial<ProductModelProps>, authUser: any, updateSingleUserItem: any) => void;
//   totalSum: number;
//   totalTax: number;
//   totalShipping: number;
//   grandTotal: number;
//   quantity: number;
//   clearData: (authUser: any, updateSingleUserItem: any) => void;
// }

// export const CartContext = createContext<CartContextType | undefined>(undefined);

// export const useCart = (): CartContextType => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error("useCart must be used within a CartProvider");
//   }
//   return context;
// };

// export const CartProvider = ({ children }: { children: ReactNode }) => {
//   const [carts, setCarts] = useState<Partial<ProductModelProps>[]>([]); // Initialize state with an empty cart

//   const [totalSum, setTotalSum] = useState<number>(0);
//   const [totalShipping, setTotalShipping] = useState<number>(10); // Example shipping cost
//   const [quantity, setQuantity] = useState<number>(0);

//   const totalTax = totalSum * 0.08875; // Tax calculation
//   const grandTotal = totalSum + totalTax + totalShipping; // Grand total calculation

//   useFocusEffect(
//     React.useCallback(() => {
//       // Load or calculate initial values when the cart context is first used
//       calculateTotalSum(carts);
//       setQuantity(carts.reduce((sum, item) => sum + (item.quantity || 0), 0));
//     }, [carts]) // Runs when the cart is updated
//   );

//   const addToCart = (item: Partial<ProductModelProps>, authUser: any, updateSingleUserItem: any) => {
//     let updatedCarts = [...carts];
//     const itemExistIndex = updatedCarts.findIndex((cart) => cart.id === item.id);

//     if (itemExistIndex !== -1) {
//       updatedCarts[itemExistIndex].quantity = (updatedCarts[itemExistIndex].quantity || 0) + 1; // Increment quantity
//     } else {
//       updatedCarts = [...updatedCarts, { ...item, quantity: 1 }];
//     }

//     setCarts(updatedCarts);
//     calculateTotalSum(updatedCarts);
//     setQuantity((prev) => prev + 1);
//     updateSingleUserItem({ cart: updatedCarts, user: authUser }); // Update user profile with cart changes
//   };

//   const decreaseFromCart = (item: Partial<ProductModelProps>, authUser: any, updateSingleUserItem: any) => {
//     const itemExistIndex = carts.findIndex((cart) => cart.id === item.id);
//     if (itemExistIndex !== -1) {
//       const updatedCarts = [...carts];
//       if ((updatedCarts[itemExistIndex].quantity || 0) > 1) {
//         updatedCarts[itemExistIndex].quantity = (updatedCarts[itemExistIndex].quantity || 0) - 1;
//       } else {
//         updatedCarts.splice(itemExistIndex, 1); // Remove item if quantity <= 1
//       }

//       setCarts(updatedCarts);
//       calculateTotalSum(updatedCarts);
//       setQuantity((prev) => prev - 1);
//       updateSingleUserItem({ cart: updatedCarts, user: authUser }); // Update user profile cart
//     }
//   };

//   const deleteItemFromCart = (item: Partial<ProductModelProps>, authUser: any, updateSingleUserItem: any) => {
//     const updatedCarts = carts.filter((cart) => cart.id !== item.id);
//     setCarts(updatedCarts);
//     calculateTotalSum(updatedCarts);
//     setQuantity((prev) => prev - (item.quantity || 0));
//     updateSingleUserItem({ cart: updatedCarts, user: authUser }); // Update user profile cart
//   };

//   const clearData = (authUser: any, updateSingleUserItem: any) => {
//     setCarts([]);
//     setTotalSum(0);
//     setQuantity(0);
//     updateSingleUserItem({ cart: [], user: authUser }); // Clear cart in user profile
//   };

//   // Calculate total sum
//   const calculateTotalSum = (carts: Partial<ProductModelProps>[]) => {
//     const total = carts.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 0), 0);
//     setTotalSum(total);
//   };

//   const value: CartContextType = {
//     carts,
//     addToCart,
//     decreaseFromCart,
//     quantity,
//     totalSum,
//     totalTax,
//     totalShipping,
//     grandTotal,
//     deleteItemFromCart,
//     clearData,
//   };
  

//   return (
//     <CartContext.Provider value={value}>
//       {children}
//     </CartContext.Provider>
//   );
// };


// import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
// import { MMKV } from "react-native-mmkv";
// import { useFocusEffect } from "@react-navigation/native";
// import { CartItem } from "@/models/UserProps";

// // Initialize MMKV storage
// const storage = new MMKV();



// // Define the context type
// interface CartContextType {
//   carts: CartItem[];
//   addToCart: (item: CartItem) => void;
//   decreaseFromCart: (item: CartItem) => void;
//   totalSum: number;
//   totalTax: number;
//   totalShipping: number;
//   grandTotal: number;
//   quantity: number;
//   deleteItemFromCart: (item: CartItem) => void;
//   clearData: () => void;
// }

// const CartContext = createContext<CartContextType | undefined>(undefined);

// export const useCart = (): CartContextType => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error('useCart must be used within a CartProvider');
//   }
//   return context;
// };

// export const CartProvider = ({ children }: { children: ReactNode }) => {
//   const [carts, setCarts] = useState<CartItem[]>([]);
//   const [totalSum, setTotalSum] = useState<number>(0);
//   const [totalShipping, setTotalShipping] = useState<number>(10); // Example shipping cost
//   const [quantity, setQuantity] = useState<number>(0);

//   const totalTax = (totalSum * 0.08875); // Tax calculation based on totalSum
//   const grandTotal = totalSum + totalTax + totalShipping; // Grand total calculation

//   useFocusEffect(
//     React.useCallback(() => {
//       loadCartItems();
//     }, [])
//   );

//   // Load cart items from MMKV
//   const loadCartItems = () => {
//     try {
//       const storedCarts = storage.getString("carts");
//       if (storedCarts) {
//         const parsedCarts: CartItem[] = JSON.parse(storedCarts);
//         setCarts(parsedCarts);
//         calculateTotalSum(parsedCarts);
//         setQuantity(parsedCarts.reduce((sum, item) => sum + item.quantity, 0)); // Update quantity
//       } else {
//         resetCart();
//       }
//     } catch (error) {
//       console.error("Error loading cart items:", error);
//     }
//   };

//   const addToCart = (item: CartItem) => {
//     try {
//       const itemExistIndex = carts.findIndex((cart) => cart.id === item.id);
//       let updatedCarts = [...carts];

//       if (itemExistIndex !== -1) {
//         updatedCarts[itemExistIndex].quantity += 1; // Increment quantity
//       } else {
//         updatedCarts = [...carts, { ...item, quantity: 1 }];
//       }

//       storage.set("carts", JSON.stringify(updatedCarts));
//       setCarts(updatedCarts);
//       calculateTotalSum(updatedCarts);
//       setQuantity((prev) => prev + 1);
//     } catch (error) {
//       console.error("Error adding item to cart:", error);
//     }
//   };

//   const decreaseFromCart = (item: CartItem) => {
//     try {
//       const itemExistIndex = carts.findIndex((cart) => cart.id === item.id);
//       if (itemExistIndex !== -1) {
//         const updatedCarts = [...carts];
//         if (updatedCarts[itemExistIndex].quantity > 1) {
//           updatedCarts[itemExistIndex].quantity -= 1;
//         } else {
//           updatedCarts.splice(itemExistIndex, 1); // Remove item if quantity <= 1
//         }
//         storage.set("carts", JSON.stringify(updatedCarts));
//         setCarts(updatedCarts);
//         calculateTotalSum(updatedCarts);
//         setQuantity((prev) => prev - 1);
//       }
//     } catch (error) {
//       console.error("Error decreasing item from cart:", error);
//     }
//   };

//   const deleteItemFromCart = (item: CartItem) => {
//     try {
//       const updatedCarts = carts.filter((cart) => cart.id !== item.id);
//       storage.set("carts", JSON.stringify(updatedCarts));
//       setCarts(updatedCarts);
//       calculateTotalSum(updatedCarts);
//       setQuantity((prev) => prev - item.quantity);
//     } catch (error) {
//       console.error("Error deleting item from cart:", error);
//     }
//   };

//   const clearData = () => {
//     try {
//       storage.delete("carts");
//       resetCart();
//     } catch (error) {
//       console.error("Error clearing cart data:", error);
//     }
//   };

//   // Calculate total sum
//   const calculateTotalSum = (carts: CartItem[]) => {
//     const total = carts.reduce((sum, item) => sum + item.price * item.quantity, 0);
//     setTotalSum(total);
//   };

//   // Reset cart state
//   const resetCart = () => {
//     setCarts([]);
//     setTotalSum(0);
//     setQuantity(0);
//   };

//   const value: CartContextType = {
//     carts,
//     addToCart,
//     decreaseFromCart,
//     quantity,
//     totalSum,
//     totalTax,
//     totalShipping,
//     grandTotal,
//     deleteItemFromCart,
//     clearData,
//   };

//   return (
//     <CartContext.Provider value={value}>
//       {children}
//     </CartContext.Provider>
//   );
// };













// import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useFocusEffect } from "@react-navigation/native";

// // Define the interface for cart items
// interface CartItem {
//   id: string;
//   price: number;
//   quantity: number;
// }

// // Define the context type
// interface CartContextType {
//   carts: CartItem[];
//   addToCart: (item: CartItem) => void;
//   decreaseFromCart: (item: CartItem) => void;
//   totalSum: number;
//   totalTax: number;
//   totalShipping: number;
//   grandTotal: number;
//   quantity: number;
//   deleteItemFromCart: (item: CartItem) => void;
//   clearData: () => void;
// }

// const CartContext = createContext<CartContextType | undefined>(undefined);

// export const useCart = (): CartContextType => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error('useCart must be used within a CartProvider');
//   }
//   return context;
// };

// export const CartProvider = ({ children }: { children: ReactNode }) => {
//   const [carts, setCarts] = useState<CartItem[]>([]);
//   const [totalSum, setTotalSum] = useState<number>(0);
//   const [totalShipping, setTotalShipping] = useState<number>(10); // Example shipping cost
//   const [quantity, setQuantity] = useState<number>(0);

//   const totalTax = (totalSum * 0.08875); // Tax calculation based on totalSum
//   const grandTotal = totalSum + totalTax + totalShipping; // Grand total calculation

//   useFocusEffect(
//     React.useCallback(() => {
//       console.log('Loading cart items...');
//       loadCartItems();
//     }, [])
//   );

//   useEffect(() => {
//     // Test AsyncStorage to ensure it's working
//     (async () => {
//       try {
//         await AsyncStorage.setItem('test_key', 'test_value');
//         const value = await AsyncStorage.getItem('test_key');
//         console.log('Test AsyncStorage Value:', value);
//       } catch (error) {
//         console.error('Error testing AsyncStorage:', error);
//       }
//     })();
//   }, []);

//   // Load cart items from AsyncStorage
//   const loadCartItems = async () => {
//     try {
//       console.log('Trying to get carts from AsyncStorage...');
//       const storedCarts = await AsyncStorage.getItem("carts");
//       console.log('Stored carts:', storedCarts);
      
//       if (storedCarts) {
//         const parsedCarts: CartItem[] = JSON.parse(storedCarts);
//         setCarts(parsedCarts);
//         calculateTotalSum(parsedCarts);
//         setQuantity(parsedCarts.reduce((sum, item) => sum + item.quantity, 0)); // Update quantity
//       } else {
//         resetCart();
//       }
//     } catch (error) {
//       console.error("Error loading cart items:", error);
//     }
//   };

//   const addToCart = async (item: CartItem) => {
//     try {
//       const itemExistIndex = carts.findIndex((cart) => cart.id === item.id);
//       let updatedCarts = [...carts];

//       if (itemExistIndex !== -1) {
//         updatedCarts[itemExistIndex].quantity += 1; // Increment quantity
//       } else {
//         updatedCarts = [...carts, { ...item, quantity: 1 }];
//       }

//       await AsyncStorage.setItem("carts", JSON.stringify(updatedCarts));
//       setCarts(updatedCarts);
//       calculateTotalSum(updatedCarts);
//       setQuantity((prev) => prev + 1);
//     } catch (error) {
//       console.error("Error adding item to cart:", error);
//     }
//   };

//   const decreaseFromCart = async (item: CartItem) => {
//     try {
//       const itemExistIndex = carts.findIndex((cart) => cart.id === item.id);
//       if (itemExistIndex !== -1) {
//         const updatedCarts = [...carts];
//         if (updatedCarts[itemExistIndex].quantity > 1) {
//           updatedCarts[itemExistIndex].quantity -= 1;
//         } else {
//           updatedCarts.splice(itemExistIndex, 1); // Remove item if quantity <= 1
//         }
//         await AsyncStorage.setItem("carts", JSON.stringify(updatedCarts));
//         setCarts(updatedCarts);
//         calculateTotalSum(updatedCarts);
//         setQuantity((prev) => prev - 1);
//       }
//     } catch (error) {
//       console.error("Error decreasing item from cart:", error);
//     }
//   };

//   const deleteItemFromCart = async (item: CartItem) => {
//     try {
//       const updatedCarts = carts.filter((cart) => cart.id !== item.id);
//       await AsyncStorage.setItem("carts", JSON.stringify(updatedCarts));
//       setCarts(updatedCarts);
//       calculateTotalSum(updatedCarts);
//       setQuantity((prev) => prev - item.quantity);
//     } catch (error) {
//       console.error("Error deleting item from cart:", error);
//     }
//   };

//   const clearData = async () => {
//     try {
//       console.log('Clearing cart data from AsyncStorage...');
//       await AsyncStorage.removeItem("carts");
//       resetCart();
//     } catch (error) {
//       console.error("Error clearing cart data:", error);
//     }
//   };

//   // Calculate total sum
//   const calculateTotalSum = (carts: CartItem[]) => {
//     const total = carts.reduce((sum, item) => sum + item.price * item.quantity, 0);
//     setTotalSum(total);
//   };

//   // Reset cart state
//   const resetCart = () => {
//     console.log("Cart reset");
//     setCarts([]);
//     setTotalSum(0);
//     setQuantity(0);
//   };

//   const value: CartContextType = {
//     carts,
//     addToCart,
//     decreaseFromCart,
//     quantity,
//     totalSum,
//     totalTax,
//     totalShipping,
//     grandTotal,
//     deleteItemFromCart,
//     clearData,
//   };

//   return (
//     <CartContext.Provider value={value}>
//       {children}
//     </CartContext.Provider>
//   );
// };



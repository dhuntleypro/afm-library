import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { ProductModelProps } from "@/models/ProductModelProps";

// Define the context type
interface FavoriteContextType {
  favorites: Partial<ProductModelProps>[];
  addToFavorite: (item: Partial<ProductModelProps>) => Promise<void>;
  decreaseFromFavorite: (item: Partial<ProductModelProps>) => void;
  deleteItemFromFavorite: (item: Partial<ProductModelProps>) => void;
  totalSum: number;
  totalTax: number;
  totalShipping: number;
  grandTotal: number;
  quantity: number;
  clearData: () => void;
}

export const FavoriteContext = createContext<FavoriteContextType | undefined>(undefined);

export const useFavorite = (): FavoriteContextType => {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error("useFavorite must be used within a FavoriteProvider");
  }
  return context;
};

interface FavoriteProviderProps {
  children: ReactNode;
  storage: {
    getItem: (key: string) => Promise<string | null>;
    setItem: (key: string, value: string) => Promise<void>;
    removeItem: (key: string) => Promise<void>;
  };
  storageKey: string;
}

export const FavoriteProvider: React.FC<FavoriteProviderProps> = ({ children, storage, storageKey }) => {
  const [favorites, setFavorites] = useState<Partial<ProductModelProps>[]>([]);
  const [totalSum, setTotalSum] = useState<number>(0);
  const [totalShipping, setTotalShipping] = useState<number>(10);
  const [quantity, setQuantity] = useState<number>(0);

  // Load favorites from provided storage when the component mounts
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavorites = await storage.getItem(storageKey);
        if (storedFavorites) {
          const parsedFavorites = JSON.parse(storedFavorites);
          setFavorites(parsedFavorites);
          calculateTotalSum(parsedFavorites);
          setQuantity(parsedFavorites.reduce((sum: number, item: Partial<ProductModelProps>) => sum + (item.quantity || 0), 0));
        }
      } catch (error) {
        console.error("Failed to load favorites from storage:", error);
      }
    };
    loadFavorites();
  }, [storage, storageKey]);

  // Save favorites to provided storage whenever they are updated
  useEffect(() => {
    const saveFavorites = async () => {
      try {
        if (favorites.length > 0) {
          await storage.setItem(storageKey, JSON.stringify(favorites));
        }
      } catch (error) {
        console.error("Failed to save favorites to storage:", error);
      }
    };
    saveFavorites();
  }, [favorites, storage, storageKey]);

  const addToFavorite = async (item: Partial<ProductModelProps>) => {
    let updatedFavorites = [...favorites];
    const itemExistIndex = updatedFavorites.findIndex((favorite) => favorite.id === item.id);

    if (itemExistIndex !== -1) {
      updatedFavorites[itemExistIndex].quantity = (updatedFavorites[itemExistIndex].quantity || 0) + 1;
    } else {
      updatedFavorites = [...updatedFavorites, { ...item, quantity: 1 }];
    }

    setFavorites(updatedFavorites);
    calculateTotalSum(updatedFavorites);
    setQuantity((prev) => prev + 1);
  };

  const decreaseFromFavorite = (item: Partial<ProductModelProps>) => {
    const itemExistIndex = favorites.findIndex((favorite) => favorite.id === item.id);
    if (itemExistIndex !== -1) {
      const updatedFavorites = [...favorites];
      if ((updatedFavorites[itemExistIndex].quantity || 0) > 1) {
        updatedFavorites[itemExistIndex].quantity = (updatedFavorites[itemExistIndex].quantity || 0) - 1;
      } else {
        updatedFavorites.splice(itemExistIndex, 1); // Remove item if quantity <= 1
      }

      setFavorites(updatedFavorites);
      calculateTotalSum(updatedFavorites);
      setQuantity((prev) => prev - 1);
    }
  };

  const deleteItemFromFavorite = (item: Partial<ProductModelProps>) => {
    const updatedFavorites = favorites.filter((favorite) => favorite.id !== item.id);
    setFavorites(updatedFavorites);
    calculateTotalSum(updatedFavorites);
    setQuantity((prev) => prev - (item.quantity || 0));
  };

  const clearData = () => {
    setFavorites([]);
    setTotalSum(0);
    setQuantity(0);
    storage.removeItem(storageKey); // Clear from storage as well
  };

  // Calculate total sum
  const calculateTotalSum = (favorites: Partial<ProductModelProps>[]) => {
    const total = favorites.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 0), 0);
    setTotalSum(total);
  };

  const value: FavoriteContextType = {
    favorites,
    addToFavorite,
    decreaseFromFavorite,
    totalSum,
    totalTax: totalSum * 0.08875,
    totalShipping,
    grandTotal: totalSum + totalSum * 0.08875 + totalShipping,
    quantity,
    deleteItemFromFavorite,
    clearData,
  };

  return <FavoriteContext.Provider value={value}>{children}</FavoriteContext.Provider>;
};


// stores it in the view temportay
// import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
// import { useFocusEffect } from "@react-navigation/native";
// import { ProductModelProps } from "@/models/ProductModelProps";
// import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage

// const FAVORITES_KEY = 'user_favorites'; // Key for storing favorites in AsyncStorage

// // Define the context type
// interface FavoriteContextType {
//   favorites: Partial<ProductModelProps>[];
//   addToFavorite: (item: Partial<ProductModelProps>) => Promise<void>;
//   decreaseFromFavorite: (item: Partial<ProductModelProps>) => void;
//   deleteItemFromFavorite: (item: Partial<ProductModelProps>) => void;
//   totalSum: number;
//   totalTax: number;
//   totalShipping: number;
//   grandTotal: number;
//   quantity: number;
//   clearData: () => void;
// }

// export const FavoriteContext = createContext<FavoriteContextType | undefined>(undefined);

// export const useFavorite = (): FavoriteContextType => {
//   const context = useContext(FavoriteContext);
//   if (!context) {
//     throw new Error("useFavorite must be used within a FavoriteProvider");
//   }
//   return context;
// };

// export const FavoriteProvider = ({ children }: { children: ReactNode }) => {
//   const [favorites, setFavorites] = useState<Partial<ProductModelProps>[]>([]);
//   const [totalSum, setTotalSum] = useState<number>(0);
//   const [totalShipping, setTotalShipping] = useState<number>(10);
//   const [quantity, setQuantity] = useState<number>(0);

//   // Load favorites from AsyncStorage when the component mounts
//   useEffect(() => {
//     const loadFavorites = async () => {
//       try {
//         const storedFavorites = await AsyncStorage.getItem(FAVORITES_KEY);
//         if (storedFavorites) {
//           setFavorites(JSON.parse(storedFavorites));
//         }
//       } catch (error) {
//         console.error("Failed to load favorites from storage:", error);
//       }
//     };
//     loadFavorites();
//   }, []);

//   // Save favorites to AsyncStorage whenever they are updated
//   useEffect(() => {
//     const saveFavorites = async () => {
//       try {
//         await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
//       } catch (error) {
//         console.error("Failed to save favorites to storage:", error);
//       }
//     };
//     saveFavorites();
//   }, [favorites]);

//   const addToFavorite = async (item: Partial<ProductModelProps>) => {
//     let updatedFavorites = [...favorites];
//     const itemExistIndex = updatedFavorites.findIndex((favorite) => favorite.id === item.id);

//     if (itemExistIndex !== -1) {
//       updatedFavorites[itemExistIndex].quantity = (updatedFavorites[itemExistIndex].quantity || 0) + 1;
//     } else {
//       updatedFavorites = [...updatedFavorites, { ...item, quantity: 1 }];
//     }

//     setFavorites(updatedFavorites);
//     calculateTotalSum(updatedFavorites);
//     setQuantity((prev) => prev + 1);
//   };

//   const decreaseFromFavorite = (item: Partial<ProductModelProps>) => {
//     const itemExistIndex = favorites.findIndex((favorite) => favorite.id === item.id);
//     if (itemExistIndex !== -1) {
//       const updatedFavorites = [...favorites];
//       if ((updatedFavorites[itemExistIndex].quantity || 0) > 1) {
//         updatedFavorites[itemExistIndex].quantity = (updatedFavorites[itemExistIndex].quantity || 0) - 1;
//       } else {
//         updatedFavorites.splice(itemExistIndex, 1); // Remove item if quantity <= 1
//       }

//       setFavorites(updatedFavorites);
//       calculateTotalSum(updatedFavorites);
//       setQuantity((prev) => prev - 1);
//     }
//   };

//   const deleteItemFromFavorite = (item: Partial<ProductModelProps>) => {
//     const updatedFavorites = favorites.filter((favorite) => favorite.id !== item.id);
//     setFavorites(updatedFavorites);
//     calculateTotalSum(updatedFavorites);
//     setQuantity((prev) => prev - (item.quantity || 0));
//   };

//   const clearData = () => {
//     setFavorites([]);
//     setTotalSum(0);
//     setQuantity(0);
//     AsyncStorage.removeItem(FAVORITES_KEY); // Clear from storage as well
//   };

//   // Calculate total sum
//   const calculateTotalSum = (favorites: Partial<ProductModelProps>[]) => {
//     const total = favorites.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 0), 0);
//     setTotalSum(total);
//   };

//   const value: FavoriteContextType = {
//     favorites,
//     addToFavorite,
//     decreaseFromFavorite,
//     totalSum,
//     totalTax: totalSum * 0.08875,
//     totalShipping,
//     grandTotal: totalSum + totalSum * 0.08875 + totalShipping,
//     quantity,
//     deleteItemFromFavorite,
//     clearData,
//   };

//   return <FavoriteContext.Provider value={value}>{children}</FavoriteContext.Provider>;
// };































// import React, { createContext, useContext, useState, ReactNode } from "react";
// import { useFocusEffect } from "@react-navigation/native";
// import { ProductModelProps } from "@/models/ProductModelProps"; 

// // Define the context type
// interface FavoriteContextType {
//   favorites: Partial<ProductModelProps>[];
//   addToFavorite: (item: Partial<ProductModelProps>) => Promise<void>;
//   decreaseFromFavorite: (item: Partial<ProductModelProps>) => void;
//   deleteItemFromFavorite: (item: Partial<ProductModelProps>) => void;
//   totalSum: number;
//   totalTax: number;
//   totalShipping: number;
//   grandTotal: number;
//   quantity: number;
//   clearData: (authUser: any) => void;
// }

// export const FavoriteContext = createContext<FavoriteContextType | undefined>(undefined);

// export const useFavorite = (): FavoriteContextType => {
//   const context = useContext(FavoriteContext);
//   if (!context) {
//     throw new Error("useFavorite must be used within a FavoriteProvider");
//   }
//   return context;
// };

// export const FavoriteProvider = ({ children }: { children: ReactNode }) => {
//   const [favorites, setFavorites] = useState<Partial<ProductModelProps>[]>([]); // Initialize state with an empty favorite
//   const [totalSum, setTotalSum] = useState<number>(0);
//   const [totalShipping, setTotalShipping] = useState<number>(10); // Example shipping cost
//   const [quantity, setQuantity] = useState<number>(0);

//   const totalTax = totalSum * 0.08875; // Tax calculation
//   const grandTotal = totalSum + totalTax + totalShipping; // Grand total calculation

//   useFocusEffect(
//     React.useCallback(() => {
//       // Load or calculate initial values when the favorite context is first used
//       calculateTotalSum(favorites);
//       setQuantity(favorites.reduce((sum, item) => sum + (item.quantity || 0), 0));
//     }, [favorites]) // Runs when the favorite is updated
//   );

//   const addToFavorite = async (item: Partial<ProductModelProps>) => {
//     try {
//       let updatedFavorites = [...favorites];
//       const itemExistIndex = updatedFavorites.findIndex((favorite) => favorite.id === item.id);

//       if (itemExistIndex !== -1) {
//         updatedFavorites[itemExistIndex].quantity = (updatedFavorites[itemExistIndex].quantity || 0) + 1; // Increment quantity
//       } else {
//         updatedFavorites = [...updatedFavorites, { ...item, quantity: 1 }];
//       }

//       setFavorites(updatedFavorites);
//       calculateTotalSum(updatedFavorites);
//       setQuantity((prev) => prev + 1);

//       // Ensure to await the user profile update
//       //  error adding item -- needed editing 
//       // await updateSingleUserItem({ favorite: updatedFavorites, user: authUser });





//     } catch (error) {
//       console.error("Error adding item to favorite:", error);
//       // You can add further error handling here, e.g., show a notification to the user
//     }
//   };

//   const decreaseFromFavorite = (item: Partial<ProductModelProps>) => {
//     const itemExistIndex = favorites.findIndex((favorite) => favorite.id === item.id);
//     if (itemExistIndex !== -1) {
//       const updatedFavorites = [...favorites];
//       if ((updatedFavorites[itemExistIndex].quantity || 0) > 1) {
//         updatedFavorites[itemExistIndex].quantity = (updatedFavorites[itemExistIndex].quantity || 0) - 1;
//       } else {
//         updatedFavorites.splice(itemExistIndex, 1); // Remove item if quantity <= 1
//       }

//       setFavorites(updatedFavorites);
//       calculateTotalSum(updatedFavorites);
//       setQuantity((prev) => prev - 1);
//       // updateSingleUserItem({ favorite: updatedFavorites, user: authUser }); // Update user profile favorite
//     }
//   };

//   const deleteItemFromFavorite = (item: Partial<ProductModelProps>) => {
//     const updatedFavorites = favorites.filter((favorite) => favorite.id !== item.id);
//     setFavorites(updatedFavorites);
//     calculateTotalSum(updatedFavorites);
//     setQuantity((prev) => prev - (item.quantity || 0));
//   };

//   const clearData = (authUser: any) => {
//     setFavorites([]);
//     setTotalSum(0);
//     setQuantity(0);
//     // updateSingleUserItem({ favorite: [], user: authUser }); // Clear favorite in user profile
//   };

//   // Calculate total sum
//   const calculateTotalSum = (favorites: Partial<ProductModelProps>[]) => {
//     const total = favorites.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 0), 0);
//     setTotalSum(total);
//   };

//   const value: FavoriteContextType = {
//     favorites,
//     addToFavorite,
//     decreaseFromFavorite,
//     quantity,
//     totalSum,
//     totalTax,
//     totalShipping,
//     grandTotal,
//     deleteItemFromFavorite,
//     clearData,
//   };

//   return (
//     <FavoriteContext.Provider value={value}>
//       {children}
//     </FavoriteContext.Provider>
//   );
// };






















































// import React, { createContext, useContext, useState, ReactNode } from "react";
// import { useFocusEffect } from "@react-navigation/native";
// import { ProductModelProps } from "@/models/ProductModelProps"; 

// // Define the context type
// interface FavoriteContextType {
//   favorites: Partial<ProductModelProps>[];
//   addToFavorite: (item: Partial<ProductModelProps>, authUser: any, updateSingleUserItem: any) => Promise<void>;
//   decreaseFromFavorite: (item: Partial<ProductModelProps>, authUser: any, updateSingleUserItem: any) => void;
//   deleteItemFromFavorite: (item: Partial<ProductModelProps>, authUser: any, updateSingleUserItem: any) => void;
//   totalSum: number;
//   totalTax: number;
//   totalShipping: number;
//   grandTotal: number;
//   quantity: number;
//   clearData: (authUser: any, updateSingleUserItem: any) => void;
// }

// export const FavoriteContext = createContext<FavoriteContextType | undefined>(undefined);

// export const useFavorite = (): FavoriteContextType => {
//   const context = useContext(FavoriteContext);
//   if (!context) {
//     throw new Error("useFavorite must be used within a FavoriteProvider");
//   }
//   return context;
// };

// export const FavoriteProvider = ({ children }: { children: ReactNode }) => {
//   const [favorites, setFavorites] = useState<Partial<ProductModelProps>[]>([]); // Initialize state with an empty favorite
//   const [totalSum, setTotalSum] = useState<number>(0);
//   const [totalShipping, setTotalShipping] = useState<number>(10); // Example shipping cost
//   const [quantity, setQuantity] = useState<number>(0);

//   const totalTax = totalSum * 0.08875; // Tax calculation
//   const grandTotal = totalSum + totalTax + totalShipping; // Grand total calculation

//   useFocusEffect(
//     React.useCallback(() => {
//       // Load or calculate initial values when the favorite context is first used
//       calculateTotalSum(favorites);
//       setQuantity(favorites.reduce((sum, item) => sum + (item.quantity || 0), 0));
//     }, [favorites]) // Runs when the favorite is updated
//   );

//   const addToFavorite = async (item: Partial<ProductModelProps>, authUser: any, updateSingleUserItem: any) => {
//     try {
//       let updatedFavorites = [...favorites];
//       const itemExistIndex = updatedFavorites.findIndex((favorite) => favorite.id === item.id);

//       if (itemExistIndex !== -1) {
//         updatedFavorites[itemExistIndex].quantity = (updatedFavorites[itemExistIndex].quantity || 0) + 1; // Increment quantity
//       } else {
//         updatedFavorites = [...updatedFavorites, { ...item, quantity: 1 }];
//       }

//       setFavorites(updatedFavorites);
//       calculateTotalSum(updatedFavorites);
//       setQuantity((prev) => prev + 1);

//       // Ensure to await the user profile update
//       //  error adding item -- needed editing 
//       // await updateSingleUserItem({ favorite: updatedFavorites, user: authUser });





//     } catch (error) {
//       console.error("Error adding item to favorite:", error);
//       // You can add further error handling here, e.g., show a notification to the user
//     }
//   };

//   const decreaseFromFavorite = (item: Partial<ProductModelProps>, authUser: any, updateSingleUserItem: any) => {
//     const itemExistIndex = favorites.findIndex((favorite) => favorite.id === item.id);
//     if (itemExistIndex !== -1) {
//       const updatedFavorites = [...favorites];
//       if ((updatedFavorites[itemExistIndex].quantity || 0) > 1) {
//         updatedFavorites[itemExistIndex].quantity = (updatedFavorites[itemExistIndex].quantity || 0) - 1;
//       } else {
//         updatedFavorites.splice(itemExistIndex, 1); // Remove item if quantity <= 1
//       }

//       setFavorites(updatedFavorites);
//       calculateTotalSum(updatedFavorites);
//       setQuantity((prev) => prev - 1);
//       updateSingleUserItem({ favorite: updatedFavorites, user: authUser }); // Update user profile favorite
//     }
//   };

//   const deleteItemFromFavorite = (item: Partial<ProductModelProps>, authUser: any, updateSingleUserItem: any) => {
//     const updatedFavorites = favorites.filter((favorite) => favorite.id !== item.id);
//     setFavorites(updatedFavorites);
//     calculateTotalSum(updatedFavorites);
//     setQuantity((prev) => prev - (item.quantity || 0));
//     updateSingleUserItem({ favorite: updatedFavorites, user: authUser }); // Update user profile favorite
//   };

//   const clearData = (authUser: any, updateSingleUserItem: any) => {
//     setFavorites([]);
//     setTotalSum(0);
//     setQuantity(0);
//     updateSingleUserItem({ favorite: [], user: authUser }); // Clear favorite in user profile
//   };

//   // Calculate total sum
//   const calculateTotalSum = (favorites: Partial<ProductModelProps>[]) => {
//     const total = favorites.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 0), 0);
//     setTotalSum(total);
//   };

//   const value: FavoriteContextType = {
//     favorites,
//     addToFavorite,
//     decreaseFromFavorite,
//     quantity,
//     totalSum,
//     totalTax,
//     totalShipping,
//     grandTotal,
//     deleteItemFromFavorite,
//     clearData,
//   };

//   return (
//     <FavoriteContext.Provider value={value}>
//       {children}
//     </FavoriteContext.Provider>
//   );
// };



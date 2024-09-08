import React, { createContext, useContext, useState, ReactNode } from "react";
import { useFocusEffect } from "@react-navigation/native";
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
  clearData: (authUser: any) => void;
}

export const FavoriteContext = createContext<FavoriteContextType | undefined>(undefined);

export const useFavorite = (): FavoriteContextType => {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error("useFavorite must be used within a FavoriteProvider");
  }
  return context;
};

export const FavoriteProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<Partial<ProductModelProps>[]>([]); // Initialize state with an empty favorite
  const [totalSum, setTotalSum] = useState<number>(0);
  const [totalShipping, setTotalShipping] = useState<number>(10); // Example shipping cost
  const [quantity, setQuantity] = useState<number>(0);

  const totalTax = totalSum * 0.08875; // Tax calculation
  const grandTotal = totalSum + totalTax + totalShipping; // Grand total calculation

  useFocusEffect(
    React.useCallback(() => {
      // Load or calculate initial values when the favorite context is first used
      calculateTotalSum(favorites);
      setQuantity(favorites.reduce((sum, item) => sum + (item.quantity || 0), 0));
    }, [favorites]) // Runs when the favorite is updated
  );

  const addToFavorite = async (item: Partial<ProductModelProps>) => {
    try {
      let updatedFavorites = [...favorites];
      const itemExistIndex = updatedFavorites.findIndex((favorite) => favorite.id === item.id);

      if (itemExistIndex !== -1) {
        updatedFavorites[itemExistIndex].quantity = (updatedFavorites[itemExistIndex].quantity || 0) + 1; // Increment quantity
      } else {
        updatedFavorites = [...updatedFavorites, { ...item, quantity: 1 }];
      }

      setFavorites(updatedFavorites);
      calculateTotalSum(updatedFavorites);
      setQuantity((prev) => prev + 1);

      // Ensure to await the user profile update
      //  error adding item -- needed editing 
      // await updateSingleUserItem({ favorite: updatedFavorites, user: authUser });





    } catch (error) {
      console.error("Error adding item to favorite:", error);
      // You can add further error handling here, e.g., show a notification to the user
    }
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
      // updateSingleUserItem({ favorite: updatedFavorites, user: authUser }); // Update user profile favorite
    }
  };

  const deleteItemFromFavorite = (item: Partial<ProductModelProps>) => {
    const updatedFavorites = favorites.filter((favorite) => favorite.id !== item.id);
    setFavorites(updatedFavorites);
    calculateTotalSum(updatedFavorites);
    setQuantity((prev) => prev - (item.quantity || 0));
  };

  const clearData = (authUser: any) => {
    setFavorites([]);
    setTotalSum(0);
    setQuantity(0);
    // updateSingleUserItem({ favorite: [], user: authUser }); // Clear favorite in user profile
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
    quantity,
    totalSum,
    totalTax,
    totalShipping,
    grandTotal,
    deleteItemFromFavorite,
    clearData,
  };

  return (
    <FavoriteContext.Provider value={value}>
      {children}
    </FavoriteContext.Provider>
  );
};






















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



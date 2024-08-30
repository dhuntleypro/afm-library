import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from "@react-navigation/native";

// Define the interface for cart items
interface CartItem {
  id: string;
  price: number; // Add price property
  quantity: number
  // Add any other properties as needed
}

// Define the context type
interface CartContextType {
  carts: CartItem[];
  addToCart: (item: CartItem) => void;  
  decreaseFromCart: (item: CartItem) => void;
  totalSum: number;
  totalTax:  number;
  totalShipping :  number;
  grandTotal:  number;
  quantity: number;
  
  deleteItemFromCart: (item: CartItem) => void;
  clearData: (item: CartItem) => void;
}

// Create the context with initial value
export const CartContext = createContext<CartContextType>({
  carts: [],
  addToCart: () => {}, // Placeholder function
  decreaseFromCart: () => {},
  totalSum: 0, // Initial total sum
  totalTax: 0, 
  totalShipping : 0,
  grandTotal: 0,
  deleteItemFromCart:  () => {},
  quantity: 0,
  clearData:  () => {},
});

// Define the CartProvider component
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state for carts and totalSum
  const [carts, setCarts] = useState<CartItem[]>([]);
  const [totalSum, setTotalSum] = useState(0);
  // const [totalTax, setTotalTax] = useState(0);
  const [totalShipping, setTotalShipping] = useState(10);
  // const [grandTotal, setGrandTotal] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const totalTax = (totalSum  + totalShipping ) / ( 8.875 )
  const grandTotal = totalTax + totalSum

  useEffect(() => {
    loadCartItems(); // Load cart items on component mount

    // if (quantity <= 0    ){ // || carts.length <= 0
    //   setQuantity(0)
    // }
  }, []); // Empty dependency array ensures it only runs once on mount

 
  // Function to load cart items from AsyncStorage
  const loadCartItems = async () => {
    try {
      const storedCarts = await AsyncStorage.getItem("carts");
      if (storedCarts) {
        const parsedCarts: CartItem[] = JSON.parse(storedCarts);
        setCarts(parsedCarts);
        calculateTotalSum(parsedCarts); // Calculate total sum
        calculateGrandTotal(parsedCarts); // Calculate grand total
        // calculateTax(parsedCarts);
      
      }
    } catch (error) {
      console.error("Error loading cart items:", error);
    }
  };

  // Function to add an item to the cart
  const addToCart = async (item: CartItem) => {
    try {
      const itemExistIndex = carts.findIndex((cart) => cart.id === item.id);

      if (itemExistIndex !== -1) {
        // Item already exists in the cart, update its quantity
        const updatedCarts = [...carts];
        updatedCarts[itemExistIndex] = {
          ...updatedCarts[itemExistIndex],
          quantity: updatedCarts[itemExistIndex].quantity + 1 // Increment quantity
        };

        await AsyncStorage.setItem("carts", JSON.stringify(updatedCarts));
        setCarts(updatedCarts);

        calculateTotalSum(updatedCarts); // Calculate total sum
        calculateGrandTotal(updatedCarts); // Calculate grand total
        // calculateTax(updatedCarts);


      // Refetch payment intent (TEST)
      // const paymentData = {
      //   amount: stripeConverter(props.amount), // Example value, replace with your actual data
      //   currency: "USD", // Example value, replace with your actual data
      //   shipping_fee: stripeConverter(props.shippingAmount), // Example value, replace with your actual data
      //   // (FIX) - USE STORE.STRIPE
      //   stripe_id: "acct_1NVCh3JEHBX7gOQA", // Example value, replace with your actual data
      //   app_name: CONSTANTS.appName // Example value, replace with your actual data
      // };
      
      // const response = await createPaymentIntent(paymentData);
      // console.log(response)
 




  // };









      } else {
        // Item does not exist in the cart, add it as a new item
        const newCartItem = { ...item, quantity: 1, price: item.price }; // Set quantity and price
        const newCartItems = [...carts, newCartItem];
        await AsyncStorage.setItem("carts", JSON.stringify(newCartItems));
        setCarts(newCartItems);

        calculateTotalSum(newCartItems); // Calculate total sum
        calculateGrandTotal(newCartItems); // Calculate grand total
        calculateShipping(newCartItems); // Calculate shipping
        // calculateTax(newCartItems);
      }

      // Update Quantity
      setQuantity(quantity + 1);

      // if (quantity <=0) {
      //   setQuantity(0)
      //   }

    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };


    // // Function to add an item to the cart
    // const decreaseFromCart = async (item: CartItem) => {
    //   try {
    //     const itemExistIndex = carts.findIndex((cart) => cart.id === item.id);
  
    //     if (itemExistIndex !== -1) {
    //       // Item already exists in the cart, update its quantity
    //       const updatedCarts = [...carts];
    //       updatedCarts[itemExistIndex] = {
    //         ...updatedCarts[itemExistIndex],
    //         quantity: updatedCarts[itemExistIndex].quantity - 1 // Increment quantity
    //       };
  
    //       await AsyncStorage.setItem("carts", JSON.stringify(updatedCarts));
    //       setCarts(updatedCarts);
  
    //       calculateTotalSum(updatedCarts); // Calculate total sum
    //       calculateGrandTotal(updatedCarts); // Calculate grand total
    //       // calculateTax(updatedCarts);
    //     }
    //     // Update Quantity
    //    //setQuantity(quantity - 1);
    //   } catch (error) {
    //     console.error("Error adding item to cart:", error);
    //   }
    // };
   // Function to add an item to the cart
  //  const decreaseFromCart = async (item: CartItem) => {
  //   try {
  //     const itemExistIndex = carts.findIndex((cart) => cart.id === item.id);
  
  //     if (itemExistIndex !== -1) {
  //       // Item already exists in the cart, update its quantity
  //       const updatedCarts = [...carts];
  //       if (updatedCarts[itemExistIndex].quantity > 1) {
  //         // Decrement quantity only if it's greater than 1
  //         updatedCarts[itemExistIndex] = {
  //           ...updatedCarts[itemExistIndex],
  //           quantity: updatedCarts[itemExistIndex].quantity - 1
  //         };
  //       }
  
  //       await AsyncStorage.setItem("carts", JSON.stringify(updatedCarts));
  //       setCarts(updatedCarts);
  
  //       calculateTotalSum(updatedCarts); // Calculate total sum
  //       calculateGrandTotal(updatedCarts); // Calculate grand total
  //     }
  //   } catch (error) {
  //     console.error("Error decreasing item from cart:", error);
  //   }
  // };
  
  const decreaseFromCart = async (item: CartItem) => {
    try {

     
      const itemExistIndex = carts.findIndex((cart) => cart.id === item.id);
  
      if (itemExistIndex !== -1) {
        // Item already exists in the cart, update its quantity
        const updatedCarts = [...carts];
        // if (updatedCarts[itemExistIndex].quantity > 1) {
        //   // Decrement quantity only if it's greater than 1
          updatedCarts[itemExistIndex] = {
            ...updatedCarts[itemExistIndex],
            quantity: updatedCarts[itemExistIndex].quantity - 1
          };
        // }
        setQuantity(quantity - 1)
  
        await AsyncStorage.setItem("carts", JSON.stringify(updatedCarts));
        setCarts(updatedCarts);
  
        calculateTotalSum(updatedCarts); // Calculate total sum
        calculateGrandTotal(updatedCarts); // Calculate grand total
      }
      // if (quantity <=0) {
      // setQuantity(0)
      // }

    } catch (error) {
      console.error("Error decreasing item from cart:", error);
    }
  };
  
// Function to delete an item from the cart
const deleteItemFromCart = async (item: CartItem) => {
  try {
    // Filter out the item from the carts array
    const updatedCarts = carts.filter((cart) => cart.id !== item.id);

    // Update AsyncStorage and state with the updated carts array
    await AsyncStorage.setItem("carts", JSON.stringify(updatedCarts));
    setCarts(updatedCarts);

    // Recalculate total sum
    calculateTotalSum(updatedCarts);
    calculateGrandTotal(updatedCarts);
    calculateShipping(updatedCarts);
    // calculateTax(updatedCarts);

    await AsyncStorage.removeItem("carts");

    setQuantity(quantity - item.quantity);
    if (quantity <=0) {
      setQuantity(0)
      }
    console.log("Item removed");


  } catch (error) {
    console.error("Error deleting item from cart:", error);
  }
};
  // Function to clear all data from the cart
  const clearData = async () => {
    try {
      setQuantity(0);
      await AsyncStorage.removeItem("carts");
      setCarts([]);
      setTotalSum(0);
      // setTotalTax(0);
      setTotalShipping(10);
      // setGrandTotal(0);
      setQuantity(0)
    } catch (error) {
      console.error("Error clearing data:", error);
    }
  };

  // Function to calculate the total sum of cart items
  const calculateTotalSum = (carts: CartItem[]) => {
    const total = carts.reduce((sum, item) => sum + item.price * item.quantity , 0);
    setTotalSum(total);
  };

  // Function to calculate the total sum of cart items
  const calculateGrandTotal = (carts: CartItem[]) => {
    const grandTotal = carts.reduce((sum, item) => sum + totalSum + totalTax + totalShipping , 0);
    // setGrandTotal(grandTotal);
  };

  // Function to calculate the total sum of cart items
  // const calculateTax = (carts: CartItem[]) => {
  //   const totalTax = carts.reduce((sum, item) => sum + item.price, 0);
  //   setTotalSum(totalTax);
  // };

  // const calculateTax = (carts: CartItem[]) => {
  //   // const totalTax = carts.reduce((sum, item) => sum + item.price, 0);
  //   const totalTax = (totalSum  + totalShipping ) / ( 8.875 * 100 )
  //   setTotalTax(totalTax);
  // };

  // Function to calculate the total sum of cart items
  const calculateShipping = (carts: CartItem[]) => {
    // const totalShipping = carts.reduce((sum, item) => sum + item.price , 0);
    // setTotalSum(totalShipping);
  };


  // Create the value object to be passed to the context provider
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
    clearData
  };

  // Render the context provider with children
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};


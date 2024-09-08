import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { OrderModelProps } from "../models/OrderModelProps";
import { getClientOrdersApi, postClientOrderApi, updateClientOrderApi, deleteClientOrderApi } from "../api/ordersApi";
import { useAuth } from "./AuthContext";
import { Alert } from "react-native";
import { router } from "expo-router";
// import MyAlert from "@/components/interfaces/MyAlert";

interface ClientOrderContextProps {
  orders: OrderModelProps[];
  addOrder: (order: OrderModelProps) => Promise<void>;
  removeOrder: (orderId: string) => Promise<void>;
  updateOrder: (order: OrderModelProps) => Promise<void>;
  getClientOrders: () => void;
  selectedOrder: OrderModelProps | null;
  selectOrder: (order: OrderModelProps) => void;
  isLoading: boolean;
  error: string | null;
}

export const ClientOrderContext = createContext<ClientOrderContextProps | undefined>(undefined);

export const useClientOrder = () => {
  const context = useContext(ClientOrderContext);
  if (!context) {
    throw new Error("useClientOrder must be used within an ClientOrderProvider");
  }
  return context;
};

export const ClientOrderProvider = ({ children }: { children: ReactNode }) => {
  const { authState } = useAuth();
  const [orders, setOrders] = useState<OrderModelProps[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<OrderModelProps | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   if (authState?.token) {
  //     getClientOrders(); // Initial load of orders
  //   }
  // }, [authState?.token]);

  const addOrder = async (order: OrderModelProps) => {
    if (!authState?.user) return;

    const storeID = authState.user.store_owner_id || '';
    const email = authState.user.email || '';
    const token = authState?.token || ""

    setIsLoading(true);
    try {
      await postClientOrderApi(order, storeID, email, token );
      setOrders((prevOrders) => [...prevOrders, order]);
      console.log("order added", order );

      // change fix
      router.push('/')

    } catch (error: any) {
      console.error("Failed to add order:", error.response?.data );
      

      // <MyAlert
      // title="Order not Created"
      // message="You are missing information. Please update your store."
      // onCancelPress={() => console.log("Cancel Pressed")}
      // onUpdatePress={() => router.push('/store')}
      // />   
      setError(error.response?.data || "Failed to add order. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const removeOrder = async (orderId: string) => {
    setIsLoading(true);
    try {
      await deleteClientOrderApi(orderId);
      setOrders((prevOrders) => prevOrders.filter(order => order.id !== orderId));
    } catch (error: any) {
      console.error("Failed to remove order:", error.response?.data?.message || error.message);
      setError(error.response?.data?.message || "Failed to remove order. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const updateOrder = async (order: OrderModelProps) => {
    setIsLoading(true);
    try {
      await updateOrder(order);
      setOrders((prevOrders) => prevOrders.map(o => o.id === order.id ? order : o));
    } catch (error: any) {
      console.error("Failed to update order:", error.response?.data?.message || error.message);
      setError(error.response?.data?.message || "Failed to update order. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const getClientOrders = async () => {
    if (!authState?.user) return;

    setIsLoading(true);
    setError(null);
    try {
      const email = authState.user.email || '';
      const store_owner_id = authState.user.store_owner_id || '';

      const response = await getClientOrdersApi(store_owner_id, email);
      const fetchedOrders = response.data;
      setOrders(fetchedOrders);
    } catch (error: any) {
      console.error("Failed to fetch client orders:", error.response?.data?.message || error.message);
      setError(error.response?.data?.message || "Failed to fetch orders. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const selectOrder = (order: OrderModelProps) => {
    setSelectedOrder(order);
  };

  return (
    <ClientOrderContext.Provider 
      value={{ 
        orders, 
        addOrder, 
        removeOrder, 
        updateOrder, 
        getClientOrders, 
        selectedOrder, 
        selectOrder, 
        isLoading, 
        error 
      }}
    >
      {children}
    </ClientOrderContext.Provider>
  );
};

import axios, { AxiosError } from 'axios';
// import { BASE_URL } from '../utils/api';
// import { CONSTANTS } from '../utils/constants';
import { OrderModelProps } from '../models/OrderModelProps';
import { TOKEN_KEY } from '../contexts/AuthContext';
import { UserProps } from '../models/UserProps';
import { BASE_URL } from '../utils/api';
import { CONSTANTS } from '../utils/constants';
// import { BASE_URL } from '../utils/api';
// import { CONSTANTS } from '../utils/constants';
// import { OrderModelProps } from '../models/OrderModelProps';


  const ordersApi = axios.create({
    baseURL: BASE_URL,
    // headers: {
    //    // Authorization: TOKEN_KEY,
    //     'Content-Type': 'application/json',
    // },
    params: {
      store_id: CONSTANTS.store_id,
      // email: "", // user?.email ?? "",
      tableName: 'prof-website-order-table', 
      showFilteredItems: true
    },
  });



  export const getOrders = async (storeID: string, email: string) => {
    return await ordersApi.get(`/orders`, {
      params: { 
        store_id: storeID, // CONSTANTS.store_id,// storeID,
        email: email,
      },
      headers: { 
        Authorization: TOKEN_KEY ,
        'Content-Type': 'application/json',

      
      },

    });
   
  };
  

export const getOrder = async (id: any) => {
  return await ordersApi.get(`/order?id=${id}`);
};


// export const getOrders = async () => {
//     return await ordersApi.get(`/orders`);
//   };





// export const getClientOrders = async (storeID: string, email: string) => {
//   return await ordersApi.get(`/orders`, {
//     params: {
//       store_id: storeID, // CONSTANTS.store_id,// storeID,
//       email: email,
//     },

//   });
// };






export const postOrder = async (order: OrderModelProps, storeID: string, email: string, token: string) => {
  console.log(`email:::::::: ${email}`)
  
  return await ordersApi.post(`/order`, order, {
    params: { 
      store_id: storeID, // The store ID as a query parameter
      email: email,      // The email as a query parameter
    },
    headers: { 
      Authorization: token ,
      'Content-Type': 'application/json',

    
    },
});
};



export const updateOrder = async (order: OrderModelProps) => {
  return await ordersApi.patch(`/order?id=${order.id}`, order);
};

export const deleteOrder = async ({ id }: { id: any }) => {
  console.log(id);
  return await ordersApi.delete(`/order?id=${id}`, id);
};


export default ordersApi;

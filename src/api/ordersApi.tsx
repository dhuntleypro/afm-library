import { OrderModelProps } from '../models/OrderModelProps';
import { TOKEN_KEY } from '../contexts/AuthContext';
import { createFetchClient } from '../utils/createFetchClient';
import { BASE_URL } from '@/utils/api';
import { CONSTANTS } from '@/utils/constants';

const orderTableName =  'prof-website-order-table'

// Initialize the fetch client with the base URL and headers
const clientOrdersApi = createFetchClient(
  BASE_URL, // Base URL includes the `/prod` part
  {}, // No default parameters for now
  { 'Content-Type': 'application/json' } // Default headers
);

// GET ALL STORES
export async function getClientOrdersApi(orderID: string, email: string) {
  try {
    const response = await clientOrdersApi.get('/orders', {
      params: {
        order_id: orderID,
        email: email,
      },
      headers: {
        Authentication: TOKEN_KEY,
        'Content-Type': 'application/json',
      },
    });
    return response; // Return the server response
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error; // Re-throw error for handling
  }
}

// GET SINGLE STORE
export async function getClientOrderApi(id: string) {
  try {
    const response = await clientOrdersApi.get('/order', {
      params: {
        id,
        tableName: orderTableName,
      },
    });
    return response; // Return the server response
  } catch (error) {
    console.error('Error fetching order:', error);
    throw error; // Re-throw error for handling
  }
}

// POST - CREATE OR UPDATE STORE
export const postClientOrderApi = async (order: OrderModelProps, orderID: string, email: string, token: string) => {
  try {
    const response = await clientOrdersApi.post('/order', order, {
      params: {
        order_id: orderID,
        email: email,
      },
      headers: {
        Authentication: token,
        'Content-Type': 'application/json',
      },
    });
    return response; // Return the server response
  } catch (error) {
    console.error('Error posting order:', error);
    throw error; // Re-throw error for handling
  }
};

// PUT - UPDATE STORE
export const updateClientOrderApi = async (order: OrderModelProps) => {
  try {
    const response = await clientOrdersApi.put(`/order?id=${order.id}`, order);
    return response; // Return the server response
  } catch (error) {
    console.error('Error updating order:', error);
    throw error; // Re-throw error for handling
  }
};

// DELETE STORE
export const deleteClientOrderApi = async (id: string) => {
  try {
    const response = await clientOrdersApi.delete('/order', {
      params: { id },
    });
    return response; // Return the server response
  } catch (error) {
    console.error('Error deleting order:', error);
    throw error; // Re-throw error for handling
  }
};














// import { OrderModelProps } from '../models/OrderModelProps';
// import { TOKEN_KEY } from '../contexts/AuthContext';
// import { createFetchClient } from '../utils/createFetchClient';
// import { BASE_URL } from '@/utils/api';

// // Setup the  instance for order API
// const ordersApi = createFetchClient(
//   BASE_URL,
//   {
//     tableName: 'prof-website-order-table',
//     showFilteredItems: 'true',
//   },
//   {
//     'Content-Type': 'application/json',
//   }
// );


// // GET ALL 
// export async function getOrdersApi(orderID: string, email: string) {
//   try {
//     const response = await ordersApi.get('/orders', {
//       params: {
//         order_id: orderID,
//         email: email,
//       },
//       headers: {
//         Authentication: TOKEN_KEY,
//         'Content-Type': 'application/json',
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching orders:', error);
//     throw error;
//   }
// }


// // GET SINGLE ITEM
// export async function getOrderApi(id: any) {
//   try {
//     const response = await ordersApi.get(`/order`, {
//       params: { id },
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching order:', error);
//     throw error;
//   }
// }


// // POST - Create / easy update
// export const postOrderApi = async (order: OrderModelProps, orderID: string, email: string, token: string) => {
//   return await ordersApi.post(`/order`, order, {
//     params: { 
//       order_id: orderID,
//       email: email,
//     },
//     headers: { 
//       Authentication: token,
//       'Content-Type': 'application/json',
//     },
//   });
// };


// // UPDATE
// export const updateOrderApi = async (order: OrderModelProps) => {
//   return await ordersApi.put(`/order?id=${order.id}`, order);
// };

// // DELETE
// export const deleteOrderApi = async (id: any) => {
//   return await ordersApi.delete(`/order`, {
//     params: { id },
//   });
// };










// // // import { BASE_URL } from '../utils/api';
// // // import { CONSTANTS } from '../utils/constants';
// // import { OrderModelProps } from '../models/OrderModelProps';
// // import { TOKEN_KEY } from '../contexts/AuthContext';
// // import { UserProps } from '../models/UserProps';
// // import { BASE_URL } from '../utils/api';
// // import { CONSTANTS } from '../utils/constants';
// // // import { BASE_URL } from '../utils/api';
// // // import { CONSTANTS } from '../utils/constants';
// // // import { OrderModelProps } from '../models/OrderModelProps';


// //   const ordersApi = axios.create({
// //     baseURL: BASE_URL,
// //     // headers: {
// //     //    // Authentication: TOKEN_KEY,
// //     //     'Content-Type': 'application/json',
// //     // },
// //     params: {
// //       order_id: CONSTANTS.order_id,
// //       // email: "", // user?.email ?? "",
// //       tableName: 'prof-website-order-table', 
// //       showFilteredItems: true
// //     },
// //   });



// //   export const getOrdersApi = async (orderID: string, email: string) => {
// //     return await ordersApi.get(`/orders`, {
// //       params: { 
// //         order_id: orderID, // CONSTANTS.order_id,// orderID,
// //         email: email,
// //       },
// //       headers: { 
// //         Authentication: TOKEN_KEY ,
// //         'Content-Type': 'application/json',

      
// //       },

// //     });
   
// //   };
  

// // export const getOrderApi = async (id: any) => {
// //   return await ordersApi.get(`/order?id=${id}`);
// // };


// // // export const getOrders = async () => {
// // //     return await ordersApi.get(`/orders`);
// // //   };





// // // export const getClientOrders = async (orderID: string, email: string) => {
// // //   return await ordersApi.get(`/orders`, {
// // //     params: {
// // //       order_id: orderID, // CONSTANTS.order_id,// orderID,
// // //       email: email,
// // //     },

// // //   });
// // // };






// // export const postOrderApi = async (order: OrderModelProps, orderID: string, email: string, token: string) => {
// //   console.log(`email:::::::: ${email}`)
  
// //   return await ordersApi.post(`/order`, order, {
// //     params: { 
// //       order_id: orderID, // The order ID as a query parameter
// //       email: email,      // The email as a query parameter
// //     },
// //     headers: { 
// //       Authentication: token ,
// //       'Content-Type': 'application/json',

    
// //     },
// // });
// // };



// // export const updateOrderApi = async (order: OrderModelProps) => {
// //   return await ordersApi.patch(`/order?id=${order.id}`, order);
// // };

// // export const deleteOrderApi = async ({ id }: { id: any }) => {
// //   console.log(id);
// //   return await ordersApi.delete(`/order?id=${id}`, id);
// // };


// // export default ordersApi;

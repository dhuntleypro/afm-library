// import { MankindStoreModelProps } from '../models/MankindStoreModelProps';
import { StoreModelProps } from '@/models/StoreModelProps';
import { TOKEN_KEY } from '../contexts/AuthContext';
import { createFetchClient } from '../utils/createFetchClient';
import { BASE_URL } from '@/utils/api';

// Setup the axios instance for mankindStore API
const mankindStoresApi = createFetchClient(
  BASE_URL,
  {
    tableName: 'prof-website-mankindStore-table',
    showFilteredItems: 'true',
  },
  {
    'Content-Type': 'application/json',
  }
);


// GET ALL 
export async function getMankindStoresApi(storeID: string, email: string) {
  try {
    const response = await mankindStoresApi.get('/mankindStores', {
      params: {
        store_id: storeID,
        email: email,
      },
      headers: {
        Authentication: TOKEN_KEY,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching mankindStores:', error);
    throw error;
  }
}


// GET SINGLE ITEM
export async function getMankindStoreApi(id: any) {
  try {
    const response = await mankindStoresApi.get(`/mankindStore`, {
      params: { id },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching mankindStore:', error);
    throw error;
  }
}


// POST - Create / easy update
export const postMankindStoreApi = async (mankindStore: StoreModelProps, storeID: string, email: string, token: string) => {
  return await mankindStoresApi.post(`/mankindStore`, mankindStore, {
    params: { 
      store_id: storeID,
      email: email,
    },
    headers: { 
      Authentication: token,
      'Content-Type': 'application/json',
    },
  });
};


// UPDATE
export const updateMankindStoreApi = async (mankindStore: StoreModelProps) => {
  return await mankindStoresApi.put(`/mankindStore?id=${mankindStore.id}`, mankindStore);
};

// DELETE
export const deleteMankindStoreApi = async (id: any) => {
  return await mankindStoresApi.delete(`/mankindStore`, {
    params: { id },
  });
};




















// // import { getUserCookie, getUserToken } from '../config/cookieUtils';
// // import { API_ID, AWS_BASE_URL, BASE_URL } from '../utils/api';
// import axios from 'axios';
// import { StoreModelProps } from '../models/StoreModelProps';
// import { BASE_URL } from '../utils/api';
// import { CONSTANTS } from '../utils/constants';

// // import { CONSTANTS } from '../utils/constants';

// // const user = getUserCookie();
// // const token = getUserToken();
// const mankindStoresApi = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     Authentication: "token",
//       'Content-Type': 'application/json',
//   },
//   params: {
//     id: CONSTANTS.store_id,
//     tableName: 'prof-website-store-table', 
//     showFilteredItems: true

//     // store_id: CONSTANTS.store_id,
//     // email: "", // user?.email ?? "",
//     // tableName: 'prof-website-mankindStore-table', 
//     // showFilteredItems: true
//   },
// });

// export const getMankindStoreAttributesApi = async () => {
//   const response = await mankindStoresApi.get('/stores');

//   // Get the name of attributes in the API response
//   const attributeNames = Object.keys(response.data[0]);

//   return attributeNames;
// };

// // // -----------------
// // // GET SINGLE ITEM
// // // -----------------
// // export const getStore = async (store: StoreModelProps) => {
// //   const response = await storesApi.get(`/store?id=${store.id}`, {
// //     params: {
// //      // id: STORE_ID,
// //       ...store // spread the properties of `store` into the params object
// //     }
// //   });
// //   console.log(response);
// //   return response.data as StoreModelProps;
// // };





// // -----------------
// // GET SINGLE ITEM
// // -----------------
// export const getMankindStoreApi = async (id: any) => {
//   console.log('Fetching Mankind store...');
//   const response = await mankindStoresApi.get(`/store?id=${id}`);
  
//   const store = response.data;
//   // console.log('Store:', response.data);
//   // console.log('Store:', store);

//   if (store === 'undefined' || !store) {
//     return null;
//   } else {
//     return store;
//   }
// };



// // export const getStore = async (): Promise<StoreProps | null> => {
// //   try {
// //     console.log('Fetching store...');
// //     //   const response = await storesApi.get(`/store?id=${id}`);

// //     const response = await storesApi.get(`/store`);
// //     console.log('Store:', response.data);

// //     const store: StoreProps = response.data;

// //     if (!store) {
// //       return null;
// //     }

// //     return store;
// //   } catch (error) {
// //     console.error('Error fetching store:', error);
// //     return null;
// //   }
// // };


// // -------------
// // GET ITEMS
// // -------------
// export const getMankindStoresApi = async () => {
//     const response = await mankindStoresApi.get('');
//     return response.data as StoreModelProps[]; 
//   };
  
// // -------------
// // POST
// // -------------
// export const postMankindStoreApi = async (store: StoreModelProps) => {
//   return await mankindStoresApi.post('/store', store);
// };

// // -------------
// // PATCH
// // -------------
// export const updateMankindStoreApi = async (store: any) => {
//   return await mankindStoresApi.patch(`/store?id=${store.id}`, store);
// };

// // -------------
// // DELETE
// // -------------
// export const deleteMankindStoreApi = async ({ id }: { id: any }) => {
//   console.log(id);
//   return await mankindStoresApi.delete(`/store?id=${id}`, id);
//   // return await storesApi.delete(`/store/${id}`);
//   // D_a_r_r_i_e_n H_u_n_t_l_e_y - o_w_n_e_r
// };

// export default mankindStoresApi;

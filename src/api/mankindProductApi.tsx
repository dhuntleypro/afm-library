// import { MankindProductModelProps } from '../models/MankindProductModelProps';
import { ProductModelProps } from '@/models/ProductModelProps';
import { TOKEN_KEY } from '../contexts/AuthContext';
import { createFetchClient } from '../utils/createFetchClient';
import { BASE_URL } from '@/utils/api';

// Setup the axios instance for product API
const productsApi = createFetchClient(
  BASE_URL,
  {
    tableName: 'prof-website-product-table',
    showFilteredItems: 'true',
  },
  {
    'Content-Type': 'application/json',
  }
);


// GET ALL 
export async function getMankindProductsApi(storeID: string, email: string) {
  try {
    const response = await productsApi.get('/products', {
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
    console.error('Error fetching mankind products:', error);
    throw error;
  }
}


// GET SINGLE ITEM
export async function getMankindProductApi(id: any) {
  try {
    const response = await productsApi.get(`/product`, {
      params: { id },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
}


// POST - Create / easy update
export const postMankindProductApi = async (product: ProductModelProps, storeID: string, email: string, token: string) => {
  return await productsApi.post(`/product`, product, {
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
export const updateMankindProductApi = async (product: ProductModelProps) => {
  return await productsApi.put(`/product?id=${product.id}`, product);
};

// DELETE
export const deleteMankindProductApi = async (id: any) => {
  return await productsApi.delete(`/product`, {
    params: { id },
  });
};








// import axios, { AxiosError } from 'axios';
// // import { BASE_URL } from '../utils/api';
// // import { CONSTANTS } from '../utils/constants';
// import { MankindProductModelProps } from '../models/MankindProductModelProps';
// import { TOKEN_KEY } from '../contexts/AuthContext';
// import { UserProps } from '../models/UserProps';
// import { BASE_URL } from '../utils/api';
// import { CONSTANTS } from '../utils/constants';
// // import { BASE_URL } from '../utils/api';
// // import { CONSTANTS } from '../utils/constants';
// // import { MankindProductModelProps } from '../models/MankindProductModelProps';


//   const mankindMankindProductsApi = axios.create({
//     baseURL: BASE_URL,
//     headers: {
//         Authentication: TOKEN_KEY,
//         'Content-Type': 'application/json',
//     },
//     params: {
//       store_id: CONSTANTS.store_id,
//       // email: "", // user?.email ?? "",
//       tableName: 'prof-website-product-table', 
//       showFilteredItems: true
//     },
//   });



//   export const getMankindMankindProductsApi = async (storeID: string, email: string) => {
//     return await mankindMankindProductsApi.get(`/products`, {
//       params: { 
//         store_id: storeID, // CONSTANTS.store_id,// storeID,
//         email: email,
//       },
//       headers: { Authentication: TOKEN_KEY },
//     });
   
//   };
  

// export const getMankindMankindProductApi = async (id: any) => {
//   return await mankindMankindProductsApi.get(`/product?id=${id}`);
// };



// export const postMankindMankindProductApi = async (product: MankindProductModelProps) => {
//   return await mankindMankindProductsApi.post(`/product`, product);
// };

// export const updateMankindMankindProductApi = async (product: MankindProductModelProps) => {
//   return await mankindMankindProductsApi.patch(`/product?id=${product.id}`, product);
// };

// export const deleteMankindMankindProductApi = async ({ id }: { id: any }) => {
//   console.log(id);
//   return await mankindMankindProductsApi.delete(`/product?id=${id}`, id);
// };


// export default mankindMankindProductsApi;

import { ProductModelProps } from '../models/ProductModelProps';
import { createFetchClient } from '../utils/createFetchClient';
import { createFetchClientForItems } from '../utils/createFetchClientForItems';
import { BASE_URL } from '@/utils/api';

const productTableName = 'prof-website-product-table';

// Product
const clientProductApi = createFetchClient(
  BASE_URL, // Base URL includes the `/prod` part
  {}, // No default parameters for now
  { 'Content-Type': 'application/json' } // Default headers
);

// Products
const clientProductsApi = createFetchClientForItems(
  BASE_URL,
  { showFilteredItems: 'false' }, // Default as string
  { 'Content-Type': 'application/json' }
);

// GET ALL PRODUCTS
export const getClientProductsApi = async (storeID: string, showFilteredItems: boolean) => {
  const response = await clientProductsApi.get('/products', {
    params: {
      store_id: storeID,
      tableName: productTableName,
      showFilteredItems: showFilteredItems ? 'true' : 'false', // Convert boolean to string
    },
  });

  return response;
};

// GET SINGLE PRODUCT
export async function getClientProductApi(id: string) {
  try {
    const response = await clientProductApi.get('/product', {
      params: {
        id,
        tableName: productTableName,
      },
    });
    return response; // Return the server response
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error; // Re-throw error for handling
  }
}

// POST - CREATE OR UPDATE PRODUCT
export const postClientProductApi = async (product: ProductModelProps, productID: string, email: string, token: string) => {
  try {
    const response = await clientProductApi.post('/product', product, {
      params: {
        product_id: productID,
        email: email,
      },
      headers: {
        Authentication: token,
        'Content-Type': 'application/json',
      },
    });
    return response; // Return the server response
  } catch (error) {
    console.error('Error posting product:', error);
    throw error; // Re-throw error for handling
  }
};

// PUT - UPDATE PRODUCT
export const updateClientProductApi = async (product: ProductModelProps) => {
  try {
    const response = await clientProductApi.put(`/product?id=${product.id}`, product);
    return response; // Return the server response
  } catch (error) {
    console.error('Error updating product:', error);
    throw error; // Re-throw error for handling
  }
};

// DELETE PRODUCT
export const deleteClientProductApi = async (id: string) => {
  try {
    const response = await clientProductApi.delete('/product', {
      params: { id },
    });
    return response; // Return the server response
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error; // Re-throw error for handling
  }
};









// import { ProductModelProps } from '../models/ProductModelProps';
// import { TOKEN_KEY } from '../contexts/AuthContext';
// import { createFetchClient } from '../utils/createFetchClient';
// import { BASE_URL } from '@/utils/api';
// import { CONSTANTS } from '@/utils/constants';
// import { createFetchClientForItems } from '@/utils/createFetchClientForItems';

// const productTableName =  'prof-website-product-table'

// // Initialize the fetch client with the base URL and headers
// // Initialize the fetch client with the base URL and headers
// const clientProductApi = createFetchClient(
//   BASE_URL, // Base URL includes the `/prod` part
//   {}, // No default parameters for now
//   { 'Content-Type': 'application/json' } // Default headers
// );

// const clientProductsApi = createFetchClientForItems(
//   BASE_URL,
//   { showFilteredItems: false },
//   { 'Content-Type': 'application/json' }
// );

// // GET ALL STORES

// // GET ALL PRODUCTS
// export const getClientProductsApi = async (storeID: string, showFilteredItems: boolean) => {
//   // if (!store_id) {
//   //   throw new Error('Store ID is missing.');
//   // }

//   const response = await clientProductsApi.get('/products', {
//     params: {
//       store_id: storeID,
//       tableName: productTableName,
//       showFilteredItems: showFilteredItems ? 'true' : 'false', // Convert boolean to string
//     },
//   });

//   return response;
// };


// // GET SINGLE STORE
// export async function getClientProductApi(id: string) {
//   try {
//     const response = await clientProductsApi.get('/product', {
//       params: {
      
//         id,
//         tableName: productTableName,
//       },
//     });
//     return response; // Return the server response
//   } catch (error) {
//     console.error('Error fetching product:', error);
//     throw error; // Re-throw error for handling
//   }
// }

// // POST - CREATE OR UPDATE STORE
// export const postClientProductApi = async (product: ProductModelProps, productID: string, email: string, token: string) => {
//   try {
//     const response = await clientProductsApi.post('/product', product, {
//       params: {
//         product_id: productID,
//         email: email,
//       },
//       headers: {
//         Authentication: token,
//         'Content-Type': 'application/json',
//       },
//     });
//     return response; // Return the server response
//   } catch (error) {
//     console.error('Error posting product:', error);
//     throw error; // Re-throw error for handling
//   }
// };

// // PUT - UPDATE STORE
// export const updateClientProductApi = async (product: ProductModelProps) => {
//   try {
//     const response = await clientProductsApi.put(`/product?id=${product.id}`, product);
//     return response; // Return the server response
//   } catch (error) {
//     console.error('Error updating product:', error);
//     throw error; // Re-throw error for handling
//   }
// };

// // DELETE STORE
// export const deleteClientProductApi = async (id: string) => {
//   try {
//     const response = await clientProductsApi.delete('/product', {
//       params: { id },
//     });
//     return response; // Return the server response
//   } catch (error) {
//     console.error('Error deleting product:', error);
//     throw error; // Re-throw error for handling
//   }

// };

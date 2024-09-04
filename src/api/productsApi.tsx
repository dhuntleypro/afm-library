import { ProductModelProps } from '../models/ProductModelProps';
import { TOKEN_KEY } from '../contexts/AuthContext';
import { createFetchClient } from '../utils/createFetchClient';
import { BASE_URL } from '@/utils/api';

// Setup the  instance for product API
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
export async function getProductsApi(storeID: string, email: string) {
  try {
    const response = await productsApi.get('/products', {
      params: {
        store_id: storeID,
        email: email,
      },
      headers: {
        Authorization: TOKEN_KEY,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error: any) {
    console.error('Error fetching products 4:', error.data);
    throw error;
  }
}


// GET SINGLE ITEM
export async function getProductApi(id: any) {
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
export const postProductApi = async (product: ProductModelProps, storeID: string, email: string, token: string) => {
  return await productsApi.post(`/product`, product, {
    params: { 
      store_id: storeID,
      email: email,
    },
    headers: { 
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });
};


// UPDATE
export const updateProductApi = async (product: ProductModelProps) => {
  return await productsApi.put(`/product?id=${product.id}`, product);
};

// DELETE
export const deleteProductApi = async (id: any) => {
  return await productsApi.delete(`/product`, {
    params: { id },
  });
};


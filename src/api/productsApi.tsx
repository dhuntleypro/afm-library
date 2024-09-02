import axios from 'axios';
import { ProductModelProps } from '../models/ProductModelProps';
import { TOKEN_KEY } from '../contexts/AuthContext';
import { BASE_URL } from '../utils/api';
import { CONSTANTS } from '../utils/constants';

const productsApi = axios.create({
  baseURL: BASE_URL,
  params: {
    store_id: CONSTANTS.store_id,
    tableName: 'prof-website-product-table', 
    showFilteredItems: true
  },
});

// API Methods
export const getProductsApi = async (storeID: string, email: string) => {
  return await productsApi.get(`/products`, {
    params: { 
      store_id: storeID,
      email: email,
    },
    headers: { 
      Authorization: TOKEN_KEY,
      'Content-Type': 'application/json',
    },
  });
};

export const getProductApi = async (id: any) => {
  return await productsApi.get(`/product`, {
    params: { id },
  });
};

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

export const updateProductApi = async (product: ProductModelProps) => {
  return await productsApi.patch(`/product?id=${product.id}`, product);
};

export const deleteProductApi = async (id: any) => {
  return await productsApi.delete(`/product`, {
    params: { id },
  });
};

// If you need to export the Axios instance itself
export default {productsApi, getProductApi ,  postProductApi , updateProductApi , deleteProductApi};


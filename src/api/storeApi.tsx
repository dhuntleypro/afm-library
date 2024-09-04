import { StoreModelProps } from '../models/StoreModelProps';
import { TOKEN_KEY } from '../contexts/AuthContext';
import { createFetchClient } from '../utils/createFetchClient';
import { BASE_URL } from '@/utils/api';

// Setup
const storesApi = createFetchClient(
  BASE_URL,
  {
    tableName: 'prof-website-store-table',
    showFilteredItems: 'true',
  },
  {
    'Content-Type': 'application/json',
  }
);


// GET ALL 
export async function getStoresApi(storeID: string, email: string) {
  try {
    const response = await storesApi.get('/stores', {
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
  } catch (error) {
    console.error('Error fetching stores:',  error.response?.data?.message);
    throw error;
  }
}


// GET SINGLE ITEM
export async function getStoreApi(id: any) {
  try {
    const response = await storesApi.get(`/store`, {
      params: { id },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching store:', error.response?.data?.message);
    throw error;
  }
}


// POST - Create / easy update
export const postStoreApi = async (store: StoreModelProps, storeID: string, email: string, token: string) => {
  return await storesApi.post(`/store`, store, {
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
export const updateStoreApi = async (store: StoreModelProps) => {
  return await storesApi.put(`/store?id=${store.id}`, store);
};

// DELETE
export const deleteStoreApi = async (id: any) => {
  return await storesApi.delete(`/store`, {
    params: { id },
  });
};



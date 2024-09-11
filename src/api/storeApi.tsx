import { StoreModelProps } from '../models/StoreModelProps';
import { TOKEN_KEY } from '../contexts/AuthContext';
import { createFetchClient } from '../utils/createFetchClient';
import { BASE_URL } from '@/utils/api';
import { CONSTANTS } from '@/utils/constants';

const storeTableName =  'prof-website-store-table'

// Initialize the fetch client with the base URL and headers
const clientStoresApi = createFetchClient(
  BASE_URL, // Base URL includes the `/prod` part
  {}, // No default parameters for now
  { 'Content-Type': 'application/json' } // Default headers
);

// GET ALL STORES
export async function getClientStoresApi(storeID: string, email: string) {
  try {
    const response = await clientStoresApi.get('/stores', {
      params: {
        store_id: storeID,
        email: email,
      },
      headers: {
        Authentication: TOKEN_KEY,
        'Content-Type': 'application/json',
      },
    });
    return response; // Return the server response
  } catch (error) {
    console.error('Error fetching stores:', error);
    throw error; // Re-throw error for handling
  }
}

// GET SINGLE STORE
export async function getClientStoreApi(id: string) {
  try {
    const response = await clientStoresApi.get('/store', {
      params: {
        id,
        tableName: storeTableName,
      },
    });
    return response; // Return the server response
  } catch (error) {
    console.error('Error fetching store:', error);
    throw error; // Re-throw error for handling
  }
}

// POST - CREATE OR UPDATE STORE
export const postClientStoreApi = async (store: StoreModelProps, storeID: string, email: string, token: string) => {
  try {
    const response = await clientStoresApi.post('/store', store, {
      params: {
        store_id: storeID,
        email: email,
      },
      headers: {
        Authentication: token,
        'Content-Type': 'application/json',
      },
    });
    return response; // Return the server response
  } catch (error) {
    console.error('Error posting store:', error);
    throw error; // Re-throw error for handling
  }
};

// PUT - UPDATE STORE
export const updateClientStoreApi = async (store: StoreModelProps) => {
  try {
    const response = await clientStoresApi.put(`/store?id=${store.id}`, store);
    return response; // Return the server response
  } catch (error) {
    console.error('Error updating store:', error);
    throw error; // Re-throw error for handling
  }
};

// DELETE STORE
export const deleteClientStoreApi = async (id: string) => {
  try {
    const response = await clientStoresApi.delete('/store', {
      params: { id },
    });
    return response; // Return the server response
  } catch (error) {
    console.error('Error deleting store:', error);
    throw error; // Re-throw error for handling
  }
};

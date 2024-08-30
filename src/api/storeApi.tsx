import axios from 'axios';
import { StoreModelProps } from '../models/StoreModelProps';
import { BASE_URL } from '../utils/api';

// Configure Axios Instance
const storesApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: 'token', // Replace with actual token logic if needed
    'Content-Type': 'application/json',
  },
  params: {
    tableName: 'prof-website-store-table',
    showFilteredItems: true,
  },
});

// -------------
// GET STORE ATTRIBUTES
// -------------
export const getStoreAttributes = async (): Promise<string[]> => {
  try {
    const response = await storesApi.get('/stores');
    const attributeNames = Object.keys(response.data[0]);
    return attributeNames;
  } catch (error) {
    console.error('Error fetching store attributes:', error);
    throw error;
  }
};

// -----------------
// GET SINGLE STORE
// -----------------




export const getStore = async (id: string) => {
  try {
    const response = await storesApi.get(`/store`, {
      params: { id },
    });
    const store = response.data;
    console.log('Store Fetched !!');

    return store ? store : null;
  } catch (error) {
    console.error('Error fetching store:', error);
    throw error;
  }
};

// -------------
// GET ALL STORES
// -------------
export const getStores = async (): Promise<StoreModelProps[]> => {
  try {
    const response = await storesApi.get('/stores');
    return response.data as StoreModelProps[];
  } catch (error) {
    console.error('Error fetching stores:', error);
    throw error;
  }
};




// -------------
// CREATE STORE (POST)
// -------------
export const postStore = async (store: StoreModelProps): Promise<StoreModelProps> => {
  try {
    const response = await storesApi.post('/store', store);
    return response.data as StoreModelProps;
  } catch (error) {
    console.error('Error creating store:', error);
    throw error;
  }
};

// -------------
// UPDATE STORE (PATCH)
// -------------
// Update store information (PATCH request)
export const updateStore = async (store: StoreModelProps, updateKey: string , updateValue: string): Promise<StoreModelProps> => {
  try {
    const response = await storesApi.patch(`/store`, {
      id: store.id, // Ensure the ID is passed in the body
      tableName: 'prof-website-store-table', // Add the required table name
      updateKey: updateKey, // 'store_name', // This is an example; adjust based on your needs
      updateValue: updateValue, // store.store_name, // Example; modify as needed for your updates
    });
    return response.data as StoreModelProps;
  } catch (error) {
    console.error('Error updating store:', error);
    throw error;
  }
};

// -------------
// DELETE STORE
// -------------
export const deleteStore = async (id: string): Promise<void> => {
  try {
    await storesApi.delete(`/store`, {
      params: { id },
    });
  } catch (error) {
    console.error('Error deleting store:', error);
    throw error;
  }
};

export default storesApi;

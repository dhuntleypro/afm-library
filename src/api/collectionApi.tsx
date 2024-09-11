import { CollectionModelProps } from '../models/CollectionModelProps';
import { createFetchClient } from '../utils/createFetchClient';
import { createFetchClientForItems } from '../utils/createFetchClientForItems';
import { BASE_URL } from '@/utils/api';

const collectionTableName = 'prof-website-collection-table';

// Collection
const clientCollectionApi = createFetchClient(
  BASE_URL, // Base URL includes the `/prod` part
  {}, // No default parameters for now
  { 'Content-Type': 'application/json' } // Default headers
);

// Collections
const clientCollectionsApi = createFetchClientForItems(
  BASE_URL,
  {},{}
  // { showFilteredItems: 'false' }, // Default as string
  // { 'Content-Type': 'application/json' }
);

// GET ALL PRODUCTS
export const getClientCollectionsApi = async (storeID: string, showFilteredItems: boolean) => {
  const response = await clientCollectionsApi.get('/collections', {
    params: {
      store_id: storeID,
      tableName: collectionTableName,
      showFilteredItems: showFilteredItems ? 'true' : 'false', // Convert boolean to string
    },
  });

  return response;
};

// GET SINGLE PRODUCT
export async function getClientCollectionApi(id: string) {
  try {
    const response = await clientCollectionApi.get('/collection', {
      params: {
        id,
        tableName: collectionTableName,
      },
    });
    return response; // Return the server response
  } catch (error) {
    console.error('Error fetching collection:', error);
    throw error; // Re-throw error for handling
  }
}

// POST - CREATE OR UPDATE PRODUCT
export const postClientCollectionApi = async (collection: CollectionModelProps, collectionID: string, email: string, token: string) => {
  try {
    const response = await clientCollectionApi.post('/collection', collection, {
      params: {
        collection_id: collectionID,
        email: email,
      },
      headers: {
        Authentication: token,
        'Content-Type': 'application/json',
      },
    });
    return response; // Return the server response
  } catch (error) {
    console.error('Error posting collection:', error);
    throw error; // Re-throw error for handling
  }
};

// PUT - UPDATE PRODUCT
export const updateClientCollectionApi = async (collection: CollectionModelProps) => {
  try {
    const response = await clientCollectionApi.put(`/collection?id=${collection.id}`, collection);
    return response; // Return the server response
  } catch (error) {
    console.error('Error updating collection:', error);
    throw error; // Re-throw error for handling
  }
};

// DELETE PRODUCT
export const deleteClientCollectionApi = async (id: string) => {
  try {
    const response = await clientCollectionApi.delete('/collection', {
      params: { id },
    });
    return response; // Return the server response
  } catch (error) {
    console.error('Error deleting collection:', error);
    throw error; // Re-throw error for handling
  }
};



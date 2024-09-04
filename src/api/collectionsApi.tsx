import { CollectionModelProps } from '../models/CollectionModelProps';
import { TOKEN_KEY } from '../contexts/AuthContext';
import { createFetchClient } from '../utils/createFetchClient';
import { BASE_URL } from '@/utils/api';
import { CONSTANTS } from '@/utils/constants';

const collectionTableName =  'prof-website-collection-table'

// Initialize the fetch client with the base URL and headers
const clientCollectionsApi = createFetchClient(
  BASE_URL, // Base URL includes the `/prod` part
  {}, // No default parameters for now
  { 'Content-Type': 'application/json' } // Default headers
);

// GET ALL STORES
export async function getClientCollectionsApi(collectionID: string, email: string) {
  try {
    const response = await clientCollectionsApi.get('/collections', {
      params: {
        collection_id: collectionID,
        email: email,
      },
      headers: {
        Authorization: TOKEN_KEY,
        'Content-Type': 'application/json',
      },
    });
    return response; // Return the server response
  } catch (error) {
    console.error('Error fetching collections:', error);
    throw error; // Re-throw error for handling
  }
}

// GET SINGLE STORE
export async function getClientCollectionApi(id: string) {
  try {
    const response = await clientCollectionsApi.get('/collection', {
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

// POST - CREATE OR UPDATE STORE
export const postClientCollectionApi = async (collection: CollectionModelProps, collectionID: string, email: string, token: string) => {
  try {
    const response = await clientCollectionsApi.post('/collection', collection, {
      params: {
        collection_id: collectionID,
        email: email,
      },
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    });
    return response; // Return the server response
  } catch (error) {
    console.error('Error posting collection:', error);
    throw error; // Re-throw error for handling
  }
};

// PUT - UPDATE STORE
export const updateClientCollectionApi = async (collection: CollectionModelProps) => {
  try {
    const response = await clientCollectionsApi.put(`/collection?id=${collection.id}`, collection);
    return response; // Return the server response
  } catch (error) {
    console.error('Error updating collection:', error);
    throw error; // Re-throw error for handling
  }
};

// DELETE STORE
export const deleteClientCollectionApi = async (id: string) => {
  try {
    const response = await clientCollectionsApi.delete('/collection', {
      params: { id },
    });
    return response; // Return the server response
  } catch (error) {
    console.error('Error deleting collection:', error);
    throw error; // Re-throw error for handling
  }
};

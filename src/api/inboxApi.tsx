import { InboxModelProps } from '../models/InboxModelProps';
import { TOKEN_KEY } from '../contexts/AuthContext';
import { createFetchClient } from '../utils/createFetchClient';
import { BASE_URL } from '@/utils/api';
import { CONSTANTS } from '@/utils/constants';

const inboxTableName =  'prof-website-inbox-table'

// Initialize the fetch client with the base URL and headers
const clientInboxsApi = createFetchClient(
  BASE_URL, // Base URL includes the `/prod` part
  {}, // No default parameters for now
  { 'Content-Type': 'application/json' } // Default headers
);

// GET ALL STORES
export async function getClientInboxsApi(inboxID: string, email: string) {
  try {
    const response = await clientInboxsApi.get('/inboxs', {
      params: {
        inbox_id: inboxID,
        email: email,
      },
      headers: {
        Authentication: TOKEN_KEY,
        'Content-Type': 'application/json',
      },
    });
    return response; // Return the server response
  } catch (error) {
    console.error('Error fetching inboxs:', error);
    throw error; // Re-throw error for handling
  }
}

// GET SINGLE STORE
export async function getClientInboxApi(id: string) {
  try {
    const response = await clientInboxsApi.get('/inbox', {
      params: {
        id,
        tableName: inboxTableName,
      },
    });
    return response; // Return the server response
  } catch (error) {
    console.error('Error fetching inbox:', error);
    throw error; // Re-throw error for handling
  }
}

// POST - CREATE OR UPDATE STORE
export const postClientInboxApi = async (inbox: InboxModelProps, inboxID: string, email: string, token: string) => {
  try {
    const response = await clientInboxsApi.post('/inbox', inbox, {
      params: {
        inbox_id: inboxID,
        email: email,
      },
      headers: {
        Authentication: token,
        'Content-Type': 'application/json',
      },
    });
    return response; // Return the server response
  } catch (error) {
    console.error('Error posting inbox:', error);
    throw error; // Re-throw error for handling
  }
};

// PUT - UPDATE STORE
export const updateClientInboxApi = async (inbox: InboxModelProps) => {
  try {
    const response = await clientInboxsApi.put(`/inbox?id=${inbox.id}`, inbox);
    return response; // Return the server response
  } catch (error) {
    console.error('Error updating inbox:', error);
    throw error; // Re-throw error for handling
  }
};

// DELETE STORE
export const deleteClientInboxApi = async (id: string) => {
  try {
    const response = await clientInboxsApi.delete('/inbox', {
      params: { id },
    });
    return response; // Return the server response
  } catch (error) {
    console.error('Error deleting inbox:', error);
    throw error; // Re-throw error for handling
  }
};

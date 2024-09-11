import { TOKEN_KEY } from '@/contexts/AuthContext';
// import * as SecureStore from 'expo-secure-store';

// // Helper function to get the Authentication token
// export const getAuthToken = async (): Promise<string | null> => {
//     return await SecureStore.getItemAsync(TOKEN_KEY);
//   };
  
import * as SecureStore from 'expo-secure-store';

export const getAuthToken = async () => {
  try {
    const token = await SecureStore.getItemAsync(TOKEN_KEY);
    if (!token) {
      throw new Error('No token found');
    }
    console.log('token is active');

    return token;
  } catch (error) {
    console.error('Error fetching auth token:', error);
    throw new Error('Unable to retrieve authentication token');
  }
};

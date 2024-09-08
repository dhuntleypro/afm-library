import { TOKEN_KEY } from '@/contexts/AuthContext';
import * as SecureStore from 'expo-secure-store';

// Helper function to get the authorization token
export const getAuthToken = async (): Promise<string | null> => {
    return await SecureStore.getItemAsync(TOKEN_KEY);
  };
  
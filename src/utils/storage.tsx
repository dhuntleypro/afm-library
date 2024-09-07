import * as SecureStore from "expo-secure-store";

// Securely save a value with a specified key
export const saveToSecureStore = async (key: string, value: string) => {
  try {
    await SecureStore.setItemAsync(key, value);
  } catch (error) {
    console.error('Error saving to SecureStore', error);
  }
};

export const getFromSecureStore = async (key: string) => {
  try {
    const value = await SecureStore.getItemAsync(key);
    if (value) {
      console.log('Retrieved value:', value);
    }
  } catch (error) {
    console.error('Error getting from SecureStore', error);
  }
};

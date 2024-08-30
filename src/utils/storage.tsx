import * as SecureStore from "expo-secure-store";

// Securely save a value with a specified key
export const saveSecurely = async (key: string, value: any): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(value);
    await SecureStore.setItemAsync(key, jsonValue);
  } catch (error) {
    console.error(`Error saving data for key "${key}":`, error);
    throw error;
  }
};

// Securely fetch a value for a specified key
export const fetchSecurely = async (key: string): Promise<any> => {
  try {
    const jsonValue = await SecureStore.getItemAsync(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error(`Error fetching data for key "${key}":`, error);
    throw error;
  }
};

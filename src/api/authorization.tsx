import * as SecureStore from 'expo-secure-store';
import { UserProps } from "../models/UserProps";
import { BASE_URL } from "../utils/api";
import { createFetchClient } from "../utils/createFetchClient";

// Create a fetch client instance
export const authApi = createFetchClient(
  BASE_URL,
  {
    tableName: 'prof-website-user-table',
    showFilteredItems: 'true',
  },
  {
    'Content-Type': 'application/json',
  }
);

// Helper function to get the authorization token
async function getAuthToken() {
  return await SecureStore.getItemAsync('your_token_key_here');
}

// API Calls

export const verify = async (user: any) => {
  const token = await getAuthToken();
  return await authApi.post('/verify', user, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const login = async (user: any) => {
  const token = await getAuthToken();
  return await authApi.post('/login', user, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getUsersApi = async () => {
  const token = await getAuthToken();
  return await authApi.get('/users', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getClientUsersApi = async (storeID: string, email: string) => {
  try {
    const token = await getAuthToken();
    const response = await authApi.get('/users', {
      params: {
        store_id: storeID,
        email: email, // Pass the email parameter here
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response; // Return the data from the response
  } catch (error) {
    console.error('Error fetching client users:', error);
    throw error; // Rethrow the error after logging it
  }
};

export const updateUserApi = async (user: UserProps) => {
  const token = await getAuthToken();
  return await authApi.put(`/user?id=${user.id}`, user, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteUserApi = async ({ id }: { id: any }) => {
  const token = await getAuthToken();
  console.log(id);
  return await authApi.delete(`/user`, {
    params: { id },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};










// // import axios from "axios";
// import * as SecureStore from 'expo-secure-store';
// import { UserProps } from "../models/UserProps";
// import { BASE_URL } from "../utils/api";

// // Create an axios instance
// export const authApi = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   params: {
//     tableName: 'prof-website-user-table',
//     showFilteredItems: true,
//   },
// });

// // Add a request interceptor to dynamically set the Authorization header
// authApi.interceptors.request.use(
//   async (config) => {
//     const token = await SecureStore.getItemAsync('your_token_key_here');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // API Calls
// export const verify = async (user: any) => {
//   return await authApi.post('/verify', user);
// };

// export const login = async (user: any) => {
//   return await authApi.post('/login', user);
// };

// export const getUsersApi = async () => {
//   return await authApi.get(`/users`);
// };

// export const getClientUsersApi = async (storeID: string, email: string) => {
//   try {
//     const response = await authApi.get(`/users`, {
//       params: {
//         store_id: storeID,
//         email: email, // Pass the email parameter here
//       },
//     });
//     console.log(response.data);
//     return response.data; // Return the data from the response
//   } catch (error) {
//     console.error("Error fetching client users:", error);
//     throw error; // Rethrow the error after logging it
//   }
// };

// export const updateUserApi = async (user: UserProps) => {
//   return await authApi.patch(`/user?id=${user.id}`, user);
// };

// export const deleteUserApi = async ({ id }: { id: any }) => {
//   console.log(id);
//   return await authApi.delete(`/user?id=${id}`);
// };

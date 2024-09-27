import * as SecureStore from 'expo-secure-store';
import { UserProps } from "../models/UserProps";
import { BASE_URL } from "../utils/api";
import { createFetchClient } from "../utils/createFetchClient";
import { getAuthToken } from '@/utils/getAuthToken';

// Create a fetch client instance
// export const authApi = createFetchClient(
//   BASE_URL,
//   {},{}
// );

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



// API Calls

// Verify user API
export const verify = async (user: any) => {
  const token = await getAuthToken();
  return await authApi.post('/verify', user, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Login API with token-based Authentication
export const login = async (user: UserProps) => {
  // Create the request body using the user object properties
  const body = {
    email: user.email,
    password: user.password,
  };

  // Perform the login request and return the result
  return await authApi.post("/login", body, {
    headers: {
      "Content-Type": "application/json",
    }
  });
};

// Get users API
export const getUsersApi = async () => {
  const token = await getAuthToken();
  return await authApi.get('/users', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Get client users by store ID and email
export const getClientUsersApi = async (storeID: string, email: string) => {
  try {
    const token = await getAuthToken();
    const response = await authApi.get('/users', {
      params: {
        store_id: storeID,
        email: email,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error('Error fetching client users:', error);
    throw error;
  }
};

// Update user API
export const updateUserApi = async (
  userEmail: string,
  tableName: string,
  updateKey: string,
  updateValue: any
) => {
  const token = await getAuthToken();

  const body = {
    email: userEmail,
    tableName: tableName,
    updateKey: updateKey,
    updateValue: updateValue,
  };

  return await authApi.patch(`/user`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

// Delete user API
export const deleteUserApi = async ({ email }: { email: string }) => {
  const token = await getAuthToken();

  console.log(`token: ${token}`)
  return await authApi.delete(`/user`, {
    params: { email },
    headers: {
     Authorization: `${token}`,
    "Content-Type": "application/json",
    },
  });
};


















// import * as SecureStore from 'expo-secure-store';
// import { UserProps } from "../models/UserProps";
// import { BASE_URL } from "../utils/api";
// import { createFetchClient } from "../utils/createFetchClient";
// import { getAuthToken } from '@/utils/getAuthToken';

// // Create a fetch client instance
// export const authApi = createFetchClient(
//   BASE_URL,
//   {},{}
//   // {
//   //   tableName: 'prof-website-user-table',
//   //   showFilteredItems: 'true',
//   // },
//   // {
//   //   'Content-Type': 'application/json',
//   // }
// );


// // API Calls

// // Verify user API
// export const verify = async (user: any) => {
//   const token = await getAuthToken();
//   return await authApi.post('/verify', user, {
//     headers: {
//       Authentication: `${token}`,
//     },
//   });
// };

// // Login API with token-based Authentication
// export const login = async (user: UserProps) => {
//   const authApi = createFetchClient(
//     BASE_URL,
//     { tableName: "prof-website-user-table" },
//     { "Content-Type": "application/json" }
//   );

//   // Create the request body using the user object properties
//   const body = {
//     email: user.email,
//     password: user.password,
//   };

//   // Perform the login request and return the result
//   return await authApi.post("/login", body);
// };

// // Get users API
// export const getUsersApi = async () => {
//   const token = await getAuthToken();
//   return await authApi.get('/users', {
//     headers: {
//       Authentication: `${token}`,

//     },
//   });
// };

// // Get client users by store ID and email
// export const getClientUsersApi = async (storeID: string, email: string) => {
//   try {
//     const token = await getAuthToken();
//     const response = await authApi.get('/users', {
//       params: {
//         store_id: storeID,
//         email: email, // Pass the email parameter here
//       },
//       headers: {
//         Authentication: `${token}`,
//       },
//     });
//     console.log(response);
//     return response; // Return the data from the response
//   } catch (error) {
//     console.error('Error fetching client users:', error);
//     throw error; // Rethrow the error after logging it
//   }
// };


// // Update user API
// export const updateUserApi = async (
//   userEmail: string,
//   tableName: string,
//   updateKey: string,
//   updateValue: any
// ) => {
//   const token = await getAuthToken();

//   // Construct the body for the API call
//   const body = {
//     email: userEmail,
//     tableName: tableName, // Example: "prof-website-product-table"
//     updateKey: updateKey, // The key that needs to be updated, e.g. "on_sale"
//     updateValue: updateValue, // The new value for the key, e.g. true or false
//   };

//   return await authApi.patch(`/user`, body, {
//     headers: {
//       authorization: `${token}`,  // Ensure this is correctly formatted

//       // Authentication: `${token}`,
//       "Content-Type": "application/json", // Properly added Content-Type
//     },
//   });
// };




// // Delete user API
// export const deleteUserApi = async ({ id }: { id: any }) => {
//   const token = await getAuthToken();
//   console.log(id);
//   return await authApi.delete(`/user`, {
//     params: { id },
//     headers: {
//       Authentication: `${token}`,
//     },
//   });
// };




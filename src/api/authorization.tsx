import axios from "axios";
import { UserProps } from "../models/UserProps";
import { BASE_URL } from "../utils/api";

export const authApi = axios.create({
  baseURL: BASE_URL,
  headers: {
      Authorization: "token",
      'Content-Type': 'application/json',
  },
  params: {
  
    tableName: 'prof-website-user-table', 
    showFilteredItems: true
  },
});
     

// export const register = async (user: any) => {
//     return await authApi.post('/register', user);
// };

// export const register = async (user: any) => {
//   try {
//     const result =  await authApi.post('/register', user);
//     if (result) {
//       login
//     }
//   } catch (error) {
//     {/* @ts-ignore */}
//     console.error("Error registering user:",  error.response.data);
//     {/* @ts-ignore */}
//     return (error.response.data)
//   }
  
// };



  export const verify = async (user: any) => {
    return await authApi.post('/verify', user);
  };
  
  export const login = async (user: any) => {
    return await authApi.post('/login', user);
  };
  
  

  
export const getUsers = async () => {
  return await authApi.get(`/users`);
};
  

export const getClientUsers = async (storeID: string, email: string) => {
  try {      
    const response = await authApi.get(`/users`, {
      params: {
        store_id: storeID,
        email: email, // Pass the email parameter here
       
      },
    });

    console.log(response.data)
    return response.data; // Return the data from the response
  } catch (error) {  
    console.error("Error fetching client users:", error);
    throw error; // Rethrow the error after logging it
  }
};



export const updateUser = async (user: UserProps) => {
return await authApi.patch(`/user?id=${user.id}`, user);
};

export const deleteUser = async ({ id }: { id: any }) => {
console.log(id);
return await authApi.delete(`/user?id=${id}`, id);
};


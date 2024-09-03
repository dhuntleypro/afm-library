import { InboxModelProps } from '../models/InboxModelProps';
import { TOKEN_KEY } from '../contexts/AuthContext';
import { createFetchClient } from '../utils/createFetchClient';
import { BASE_URL } from '@/utils/api';

// Setup the axios instance for inbox API
const inboxsApi = createFetchClient(
  BASE_URL,
  {
    tableName: 'prof-website-inbox-table',
    showFilteredItems: 'true',
  },
  {
    'Content-Type': 'application/json',
  }
);


// GET ALL 
export async function getInboxsApi(storeID: string, email: string) {
  try {
    const response = await inboxsApi.get('/inboxs', {
      params: {
        store_id: storeID,
        email: email,
      },
      headers: {
        Authorization: TOKEN_KEY,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching inboxs:', error);
    throw error;
  }
}


// GET SINGLE ITEM
export async function getInboxApi(id: any) {
  try {
    const response = await inboxsApi.get(`/inbox`, {
      params: { id },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching inbox:', error);
    throw error;
  }
}


// POST - Create / easy update
export const postInboxApi = async (inbox: InboxModelProps, storeID: string, email: string, token: string) => {
  return await inboxsApi.post(`/inbox`, inbox, {
    params: { 
      store_id: storeID,
      email: email,
    },
    headers: { 
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });
};


// UPDATE
export const updateInboxApi = async (inbox: InboxModelProps) => {
  return await inboxsApi.put(`/inbox?id=${inbox.id}`, inbox);
};

// DELETE
export const deleteInboxApi = async (id: any) => {
  return await inboxsApi.delete(`/inbox`, {
    params: { id },
  });
};







// // import { getUserCookie, getUserToken } from '../config/cookieUtils';
// // import { BASE_URL, STORE_ID } from '../utilities/constants';
// import axios, { AxiosError } from 'axios';
// // import { InboxModelProps } from '../models/InboxModelProps';
// // import { BASE_URL } from '../utils/api';
// // import { CONSTANTS } from '../utils/constants';
// import { InboxModelProps } from '../models/InboxModelProps';
// import { BASE_URL } from '../utils/api';
// import { CONSTANTS } from '../utils/constants';
// // import { InboxModelProps } from '../models/InboxModelProps';

// // const token = getUserToken();
// // const user = getUserCookie();


//   const inboxsApi = axios.create({
//     baseURL: BASE_URL,
//     headers: {
//         Authorization: "token",
//         'Content-Type': 'application/json',
//     },
//     params: {
//       store_id: CONSTANTS.store_id,
//       // email: "", // user?.email ?? "",
//       tableName: 'prof-website-inbox-table', 
//       showFilteredItems: true
//     },
//   });

// // export const getInboxs = async () => {
// //   const response = await inboxsApi.get('/inboxs');
// //   console.log('Inboxs:', response.data);

// //   return response.data;
// // };

 
// // export const getInboxs = async () => {
// //   try {
// //     const response = await inboxsApi.get('/inboxs');
// //     console.log('Inboxs:', response.data);
// //     return response.data;
// //   } catch (error) {
// //     if (axios.isAxiosError(error)) {
// //       const axiosError = error as AxiosError;
// //       if (axiosError.response) {
// //         // The request was made, and the server responded with a status code outside of the 2xx range
// //         console.error('Status Code:', axiosError.response.status);
// //         console.error('Response Data:', axiosError.response.data);
// //       } else if (axiosError.request) {
// //         // The request was made, but no response was received
// //         console.error('No response received');
// //       }
// //     } else {
// //       // Handle non-Axios errors here
// //       // console.error('Non-Axios error:', error.message);
// //     }

// //   }
// // };







// // export const getInboxs = async () => {
// //   const response = await inboxsApi.get('/inboxs', {
// //     // params: { category: 'electronics' },
// //     // headers: { Authorization: 'Bearer token' },
// //   });
// //   return response;
// // };


// export const getInboxsApi = async () => {
//   return await inboxsApi.get(`/inboxs`);
// };






// export const getInboxsAttributesApi = async () => {
//     const response = await inboxsApi.get('/inboxs');
//       const attributeNames = Object.keys(response.data[0]);
  
//     return attributeNames;
//   };
  

// export const getInboxApi = async (id: any) => {
//   return await inboxsApi.get(`/inbox?id=${id}`);
// };

// export const postInboxApi = async (inbox: InboxModelProps) => {
//   return await inboxsApi.post(`/inbox`, inbox);
// };

// export const updateInboxApi = async (inbox: InboxModelProps) => {
//   return await inboxsApi.patch(`/inbox?id=${inbox.id}`, inbox);
// };

// export const deleteInboxApi = async ({ id }: { id: any }) => {
//   console.log(id);
//   return await inboxsApi.delete(`/inbox?id=${id}`, id);
// };


// export default inboxsApi;

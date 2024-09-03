import { CollectionModelProps } from '../models/CollectionModelProps';
import { TOKEN_KEY } from '../contexts/AuthContext';
import { createFetchClient } from '../utils/createFetchClient';
import { BASE_URL } from '@/utils/api';

// Setup the axios instance for collection API
const collectionsApi = createFetchClient(
  BASE_URL,
  {
    tableName: 'prof-website-collection-table',
    showFilteredItems: 'true',
  },
  {
    'Content-Type': 'application/json',
  }
);


// GET ALL 
export async function getCollectionsApi(storeID: string, email: string) {
  try {
    const response = await collectionsApi.get('/collections', {
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
    console.error('Error fetching collections:', error);
    throw error;
  }
}


// GET SINGLE ITEM
export async function getCollectionApi(id: any) {
  try {
    const response = await collectionsApi.get(`/collection`, {
      params: { id },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching collection:', error);
    throw error;
  }
}


// POST - Create / easy update
export const postCollectionApi = async (collection: CollectionModelProps, storeID: string, email: string, token: string) => {
  return await collectionsApi.post(`/collection`, collection, {
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
export const updateCollectionApi = async (collection: CollectionModelProps) => {
  return await collectionsApi.put(`/collection?id=${collection.id}`, collection);
};

// DELETE
export const deleteCollectionApi = async (id: any) => {
  return await collectionsApi.delete(`/collection`, {
    params: { id },
  });
};











// import axios, { AxiosError } from 'axios';
// // import { BASE_URL } from '../utils/api';
// // import { CONSTANTS } from '../utils/constants';
// import { CollectionModelProps } from '../models/CollectionModelProps';
// import { BASE_URL } from '../utils/api';
// // import { CollectionModelProps } from '../models/CollectionModelProps';


//   const collectionsApi = axios.create({
//     baseURL: BASE_URL,
//     headers: {
//         Authorization: "token",
//         'Content-Type': 'application/json',
//     },
//     params: {
//       tableName: 'prof-website-collection-table', 
//       showFilteredItems: true
//     },
//   });



//   export const getCollectionsApi = async (storeID: string, email: string) => {
//     return await collectionsApi.get(`/collections`, {
//       params: {
//         store_id: storeID,
//         email: email // "", // user?.email ?? "",
    
//       },
//     });
//   };


  
    
//   // export const getClientCollections = async (storeID: string, email: string) => {
//   //   return await collectionsApi.get(`/collections`, {
//   //     params: {
//   //       store_id: storeID, // CONSTANTS.store_id,// storeID,
//   //       email: email,
//   //     },
  
//   //   });
//   // };
  


// export const getCollectionApi = async (id: any) => {
//   return await collectionsApi.get(`/collection?id=${id}`);
// };





// // export const postCollection = async (collection: CollectionModelProps) => {
// //   return await collectionsApi.post(`/collection`, collection);
// // };


// export const postCollectionApi = async (collection: CollectionModelProps, storeID: string, email: string, token: string) => {
//   console.log(`email:::::::: ${email}`)
  
//   return await collectionsApi.post(`/collection`, collection, {
//     params: { 
//       store_id: storeID, // The store ID as a query parameter
//       email: email,      // The email as a query parameter
//     },
//     headers: { 
//       Authorization: token ,
//       'Content-Type': 'application/json',

    
//     },
// });
// };



// export const postClientCollectionApi = async (collection: CollectionModelProps) => {
//   return await collectionsApi.post(`/collection`, collection, {
//     params: {
//       store_id: collection.store_id,
//       // email: "", // user?.email ?? "",
//     }
//   });

// };




// export const updateCollectionApi = async (collection: CollectionModelProps) => {
//   return await collectionsApi.patch(`/collection?id=${collection.id}`, collection);
// };

// export const deleteCollectionApi = async ({ id }: { id: any }) => {
//   console.log(id);
//   return await collectionsApi.delete(`/collection?id=${id}`, id);
// };


// export default collectionsApi;

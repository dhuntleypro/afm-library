import axios, { AxiosError } from 'axios';
// import { BASE_URL } from '../utils/api';
// import { CONSTANTS } from '../utils/constants';
import { ProductModelProps } from '../models/ProductModelProps';
import { TOKEN_KEY } from '../contexts/AuthContext';
import { UserProps } from '../models/UserProps';
import { BASE_URL } from '../utils/api';
import { CONSTANTS } from '../utils/constants';
// import { BASE_URL } from '../utils/api';
// import { CONSTANTS } from '../utils/constants';
// import { ProductModelProps } from '../models/ProductModelProps';


  const productsApi = axios.create({
    baseURL: BASE_URL,
    // headers: {
    //    // Authorization: TOKEN_KEY,
    //     'Content-Type': 'application/json',
    // },
    params: {
      store_id: CONSTANTS.store_id,
      // email: "", // user?.email ?? "",
      tableName: 'prof-website-product-table', 
      showFilteredItems: true
    },
  });


// GET
  export const getProducts = async (storeID: string, email: string) => {
    return await productsApi.get(`/products`, {
      params: { 
        store_id: storeID, // CONSTANTS.store_id,// storeID,
        email: email,
      },
      headers: { 
        Authorization: TOKEN_KEY ,
        'Content-Type': 'application/json',

      
      },

    });
   
  };
  

export const getProduct = async (id: any) => {
  return await productsApi.get(`/product?id=${id}`);
};



export const postProduct = async (product: ProductModelProps, storeID: string, email: string, token: string) => {
  console.log(`email:::::::: ${email}`)
  
  return await productsApi.post(`/product`, product, {
    params: { 
      store_id: storeID, // The store ID as a query parameter
      email: email,      // The email as a query parameter
    },
    headers: { 
      Authorization: token ,
      'Content-Type': 'application/json',

    
    },
});
};



export const updateProduct = async (product: ProductModelProps) => {
  return await productsApi.patch(`/product?id=${product.id}`, product);
};

export const deleteProduct = async ({ id }: { id: any }) => {
  console.log(id);
  return await productsApi.delete(`/product?id=${id}`, id);
};


export default productsApi;




















// export const getProducts = async () => {
//     return await productsApi.get(`/products`);
//   };





// export const getClientProducts = async (storeID: string, email: string) => {
//   return await productsApi.get(`/products`, {
//     params: {
//       store_id: storeID, // CONSTANTS.store_id,// storeID,
//       email: email,
//     },

//   });
// };






















// import axios, { AxiosError } from 'axios';
// import { ProductModelProps } from '../models/ProductModelProps';
// import { BASE_URL } from '../utils/api';
// import { CONSTANTS } from '../utils/constants';

//   const productsApi = axios.create({
//     baseURL: BASE_URL,
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     params: {
//       tableName: 'prof-website-product-table', 
//       showFilteredItems: true
//     },
//   });


//     // GET
// export const getProducts = async (storeID: string, email: string) => {
//   return await productsApi.get(`/products`, {
//     params: {
//       store_id: storeID, // CONSTANTS.store_id,// storeID,
//       email: email,
//     },

//   });
// };

// // POST
// export const postClientProduct = async (product: ProductModelProps) => {
//   return await productsApi.post(`/product`, product, {
//     params: {
//       store_id: product.store_id,
//       // email: "", // user?.email ?? "",
//     }
//   });
// };





















  // UPDATE

  // export const updateCLientProduct = async (product: ProductModelProps) => {
//   return await productsApi.patch(`/product?id=${product.id}`, product);
// };






  // DELETE



// export const getProducts = async (storeID: string, email: string) => {
//   return await productsApi.get(`/products`, {
//     params: {
//       store_id: CONSTANTS.store_id,// storeID,
//       email: email,
//       tableName: 'prof-website-product-table', 
//       showFilteredItems: true
//     },

//   });
// };











// export const getProducts = async () => {
//   const response = await productsApi.get('/products');
//   console.log('Products:', response.data);

//   return response.data;
// };

 
// export const getProducts = async () => {
//   try {
//     const response = await productsApi.get('/products');
//     console.log('Products:', response.data);
//     return response.data;
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       const axiosError = error as AxiosError;
//       if (axiosError.response) {
//         // The request was made, and the server responded with a status code outside of the 2xx range
//         console.error('Status Code:', axiosError.response.status);
//         console.error('Response Data:', axiosError.response.data);
//       } else if (axiosError.request) {
//         // The request was made, but no response was received
//         console.error('No response received');
//       }
//     } else {
//       // Handle non-Axios errors here
//       // console.error('Non-Axios error:', error.message);
//     }

//   }
// };







// export const getProducts = async () => {
//   const response = await productsApi.get('/products', {
//     // params: { category: 'electronics' },
//     // headers: { Authorization: 'Bearer token' },
//   });
//   return response;
// };


// export const getMankindProducts = async () => {
//   return await productsApi.get(`/products`);
// };



// // export const getProducts = async () => {
// //   return await productsApi.get(`/products`);
// // };


// export const getProducts = async (storeID: string, email: string) => {
//   return await productsApi.get(`/products`, {
//     params: {
//       store_id: CONSTANTS.store_id,// storeID,
//       email: email,
//       tableName: 'prof-website-product-table', 
//       showFilteredItems: true
//     },

//   });
// };

// export const getClientProducts = async (storeID: string, email: string) => {
//   const {authState } = useAuth()

  
//   return await productsApi.get(`/products`, {
//     params: {
//       store_id: authState?.user?.store_owner_id, // CONSTANTS.store_id,// storeID,
//       email: email,
//       tableName: 'prof-website-product-table', 
//       showFilteredItems: true
//     },

//   });
// };

// export const getClientProduct = async (id: any) => {
//   return await productsApi.get(`/product?id=${id}`);
// };

// export const postClientProduct = async (product: ProductModelProps) => {
//   return await productsApi.post(`/product`, product);
// };

// export const updateCLientProduct = async (product: ProductModelProps) => {
//   return await productsApi.patch(`/product?id=${product.id}`, product);
// };


// // export const getProducts = async (storeID: string, email: string) => {
// //   const response = await productsApi.get('/products', {
// //     params: { 
// //       store_id: storeID, // user?.store_owner_id ?? "", // CONSTANTS.store_id,
// //       email: email, // user?.email ?? "",
// //       tableName: 'prof-website-product-table', 
// //       showFilteredItems: true
// //     },
// //     headers: { Authorization: TOKEN_KEY },
// //   });

// //   console.log(response)
// //   return response;
// // };





// export const getProductsAttributes = async () => {
//     const response = await productsApi.get('/products');
//       const attributeNames = Object.keys(response.data[0]);
  
//     return attributeNames;
//   };
  

// export const getProduct = async (id: any) => {
//   return await productsApi.get(`/product?id=${id}`);
// };

// export const postProduct = async (product: ProductModelProps) => {
//   return await productsApi.post(`/product`, product);
// };

// export const updateProduct = async (product: ProductModelProps) => {
//   return await productsApi.patch(`/product?id=${product.id}`, product);
// };

// export const deleteProduct = async ({ id }: { id: any }) => {
//   console.log(id);
//   return await productsApi.delete(`/product?id=${id}`, id);
// };


// export default productsApi;



// import axios, { AxiosError } from 'axios';
// import { ProductModelProps } from '../models/ProductModelProps';
// import { BASE_URL } from '../utils/api';
// import { CONSTANTS } from '../utils/constants';
// import { UserProps } from '../models/UserProps';
// import { TOKEN_KEY, useAuth } from '../contexts/AuthContext';


// const { authState } = useAuth();

// // MANKIND
//   const productsApi = axios.create({
//     baseURL: BASE_URL,
//     headers: {
//         Authorization: "token",
//         'Content-Type': 'application/json',
//     },
//     params: {
//       store_id: CONSTANTS.store_id,
//       // email: "", // user?.email ?? "",
//       tableName: 'prof-website-product-table', 
//       showFilteredItems: true
//     },
//   });

// // CLIENT
//   const productsClientApi = axios.create({
//     baseURL: BASE_URL,
//     headers: {
//         Authorization: authState?.token,
//         'Content-Type': 'application/json',
//     },
//     params: {
//       store_id: authState?.user?.store_owner_id ?? "", 
//       email: authState?.user?.email ?? "",
//       tableName: 'prof-website-product-table', 
//       showFilteredItems: true
//     },
//   });


// // GET
//   export const getClientProducts = async () => {
//     return await productsClientApi.get(`/products`)
//   };

// // POST
// export const postClientProduct = async (product: ProductModelProps) => {
//   return await productsClientApi.post(`/product`, product);
// };


// export const getClientProduct = async (id: any) => {
//   return await productsClientApi.get(`/product?id=${id}`);
// };



// export const updateCLientProduct = async (product: ProductModelProps) => {
//   return await productsClientApi.patch(`/product?id=${product.id}`, product);
// };












 


// // export const getProducts = async () => {
// //   const response = await productsApi.get('/products');
// //   console.log('Products:', response.data);

// //   return response.data;
// // };

 
// // export const getProducts = async () => {
// //   try {
// //     const response = await productsApi.get('/products');
// //     console.log('Products:', response.data);
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







// // export const getProducts = async () => {
// //   const response = await productsApi.get('/products', {
// //     // params: { category: 'electronics' },
// //     // headers: { Authorization: 'Bearer token' },
// //   });
// //   return response;
// // };


// export const getMankindProducts = async () => {
//   return await productsApi.get(`/products`);
// };



// // export const getProducts = async () => {
// //   return await productsApi.get(`/products`);
// // };


// export const getProducts = async (storeID: string, email: string) => {
//   return await productsApi.get(`/products`, {
//     params: {
//       store_id: CONSTANTS.store_id,// storeID,
//       email: email,
//       tableName: 'prof-website-product-table', 
//       showFilteredItems: true
//     },

//   });
// };


// // export const getProducts = async (storeID: string, email: string) => {
// //   const response = await productsApi.get('/products', {
// //     params: { 
// //       store_id: storeID, // user?.store_owner_id ?? "", // CONSTANTS.store_id,
// //       email: email, // user?.email ?? "",
// //       tableName: 'prof-website-product-table', 
// //       showFilteredItems: true
// //     },
// //     headers: { Authorization: TOKEN_KEY },
// //   });

// //   console.log(response)
// //   return response;
// // };





// export const getProductsAttributes = async () => {
//     const response = await productsApi.get('/products');
//       const attributeNames = Object.keys(response.data[0]);
  
//     return attributeNames;
//   };
  

// export const getProduct = async (id: any) => {
//   return await productsApi.get(`/product?id=${id}`);
// };

// export const postProduct = async (product: ProductModelProps) => {
//   return await productsApi.post(`/product`, product);
// };

// export const updateProduct = async (product: ProductModelProps) => {
//   return await productsApi.patch(`/product?id=${product.id}`, product);
// };

// export const deleteProduct = async ({ id }: { id: any }) => {
//   console.log(id);
//   return await productsApi.delete(`/product?id=${id}`, id);
// };


// export default productsApi;





// // export const getClientProducts = async () => {
// //   return await productsApi.get(`/products`, {
// //     params: {
// //       store_id: authState?.user?.store_owner_id, // CONSTANTS.store_id,// storeID,
// //       email: email,
// //       tableName: 'prof-website-product-table', 
// //       showFilteredItems: true
// //     },

// //   });
// // };

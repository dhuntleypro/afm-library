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


  const mankindProductsApi = axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization: TOKEN_KEY,
        'Content-Type': 'application/json',
    },
    params: {
      store_id: CONSTANTS.store_id,
      // email: "", // user?.email ?? "",
      tableName: 'prof-website-product-table', 
      showFilteredItems: true
    },
  });



  export const getMankindProducts = async (storeID: string, email: string) => {
    return await mankindProductsApi.get(`/products`, {
      params: { 
        store_id: storeID, // CONSTANTS.store_id,// storeID,
        email: email,
      },
      headers: { Authorization: TOKEN_KEY },
    });
   
  };
  

export const getProduct = async (id: any) => {
  return await mankindProductsApi.get(`/product?id=${id}`);
};



export const postProduct = async (product: ProductModelProps) => {
  return await mankindProductsApi.post(`/product`, product);
};

export const updateProduct = async (product: ProductModelProps) => {
  return await mankindProductsApi.patch(`/product?id=${product.id}`, product);
};

export const deleteProduct = async ({ id }: { id: any }) => {
  console.log(id);
  return await mankindProductsApi.delete(`/product?id=${id}`, id);
};


export default mankindProductsApi;

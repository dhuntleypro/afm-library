// import { getUserCookie, getUserToken } from '../config/cookieUtils';
// import { BASE_URL, STORE_ID } from '../utilities/constants';
import axios, { AxiosError } from 'axios';
// import { CouponModelProps } from '../models/CouponModelProps';
// import { BASE_URL } from '../utils/api';
// import { CONSTANTS } from '../utils/constants';
import { CouponModelProps } from '../models/CouponModelProps';
import { BASE_URL } from '../utils/api';
import { CONSTANTS } from '../utils/constants';

// const token = getUserToken();
// const user = getUserCookie();


  const couponsApi = axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization: "token",
        'Content-Type': 'application/json',
    },
    params: {
      store_id: CONSTANTS.store_id,
      // email: "", // user?.email ?? "",
      tableName: 'prof-website-coupon-table', 
      showFilteredItems: true
    },
  });

// export const getCoupons = async () => {
//   const response = await couponsApi.get('/coupons');
//   console.log('Coupons:', response.data);

//   return response.data;
// };

 
// export const getCoupons = async () => {
//   try {
//     const response = await couponsApi.get('/coupons');
//     console.log('Coupons:', response.data);
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







// export const getCoupons = async () => {
//   const response = await couponsApi.get('/coupons', {
//     // params: { category: 'electronics' },
//     // headers: { Authorization: 'Bearer token' },
//   });
//   return response;
// };


export const getCoupons = async () => {
  return await couponsApi.get(`/coupons`);
};






export const getCouponsAttributes = async () => {
    const response = await couponsApi.get('/coupons');
      const attributeNames = Object.keys(response.data[0]);
  
    return attributeNames;
  };
  

export const getCoupon = async (id: any) => {
  return await couponsApi.get(`/coupon?id=${id}`);
};

export const postCoupon = async (coupon: CouponModelProps) => {
  return await couponsApi.post(`/coupon`, coupon);
};

export const updateCoupon = async (coupon: CouponModelProps) => {
  return await couponsApi.patch(`/coupon?id=${coupon.id}`, coupon);
};

export const deleteCoupon = async ({ id }: { id: any }) => {
  console.log(id);
  return await couponsApi.delete(`/coupon?id=${id}`, id);
};


export default couponsApi;

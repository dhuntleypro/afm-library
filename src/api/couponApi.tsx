import { CouponModelProps } from '../models/CouponModelProps';
import { TOKEN_KEY } from '../contexts/AuthContext';
import { createFetchClient } from '../utils/createFetchClient';
import { BASE_URL } from '@/utils/api';
import { CONSTANTS } from '@/utils/constants';

const couponTableName =  'prof-website-coupon-table'

// Initialize the fetch client with the base URL and headers
const clientCouponsApi = createFetchClient(
  BASE_URL, // Base URL includes the `/prod` part
  {}, // No default parameters for now
  { 'Content-Type': 'application/json' } // Default headers
);

// GET ALL STORES
export async function getClientCouponsApi(couponID: string, email: string) {
  try {
    const response = await clientCouponsApi.get('/coupons', {
      params: {
        coupon_id: couponID,
        email: email,
      },
      headers: {
        Authentication: TOKEN_KEY,
        'Content-Type': 'application/json',
      },
    });
    return response; // Return the server response
  } catch (error) {
    console.error('Error fetching coupons:', error);
    throw error; // Re-throw error for handling
  }
}

// GET SINGLE STORE
export async function getClientCouponApi(id: string) {
  try {
    const response = await clientCouponsApi.get('/coupon', {
      params: {
        id,
        tableName: couponTableName,
      },
    });
    return response; // Return the server response
  } catch (error) {
    console.error('Error fetching coupon:', error);
    throw error; // Re-throw error for handling
  }
}

// POST - CREATE OR UPDATE STORE
export const postClientCouponApi = async (coupon: CouponModelProps, couponID: string, email: string, token: string) => {
  try {
    const response = await clientCouponsApi.post('/coupon', coupon, {
      params: {
        coupon_id: couponID,
        email: email,
      },
      headers: {
        Authentication: token,
        'Content-Type': 'application/json',
      },
    });
    return response; // Return the server response
  } catch (error) {
    console.error('Error posting coupon:', error);
    throw error; // Re-throw error for handling
  }
};

// PUT - UPDATE STORE
export const updateClientCouponApi = async (coupon: CouponModelProps) => {
  try {
    const response = await clientCouponsApi.put(`/coupon?id=${coupon.id}`, coupon);
    return response; // Return the server response
  } catch (error) {
    console.error('Error updating coupon:', error);
    throw error; // Re-throw error for handling
  }
};

// DELETE STORE
export const deleteClientCouponApi = async (id: string) => {
  try {
    const response = await clientCouponsApi.delete('/coupon', {
      params: { id },
    });
    return response; // Return the server response
  } catch (error) {
    console.error('Error deleting coupon:', error);
    throw error; // Re-throw error for handling
  }
};

export const VERSION = 0.01;

export const STORE_TYPE = {
  ecom: 'ecom',
  blog: 'blog',
  subscription: 'subscription',
  appointment: 'appointment',
};

// AWS 

export const API_ID = "yiiuqhh3a3"
export const BASE_URL =  `https://${API_ID}.execute-api.us-east-1.amazonaws.com/prod`


export const AWS_BASE_IMAGE = `https://${process.env.VITE_S3_ASSET_BUCKET_NAME}.s3.amazonaws.com`;
export const AWS_HOLDER_IMAGE = `https://appsformankind-assets.s3.amazonaws.com/Products/appoint/Flowers.png`
export const AWS_BASE_URL = `https://yiiuqhh3a3.execute-api.us-east-1.amazonaws.com/prod`;

export const AWS_BASE_URL_2 = `https://${process.env.VITE_API_ID_2}.execute-api.${
  process.env.VITE_REGION
}.amazonaws.com/prod`;


export const AWS_VERIFY = `https://${process.env.VITE_API_ID}.execute-api.${
  process.env.VITE_REGION
}.amazonaws.com/prod/verify`;

export const AWS_LOGIN_URL = `https://${process.env.VITE_API_ID}.execute-api.${
  process.env.VITE_REGION
}.amazonaws.com/prod/login`;


export const AWS_ORDERS_URL = `https://${process.env.VITE_API_ID}.execute-api.${
  process.env.VITE_REGION
}.amazonaws.com/prod/login`;

export const AWS_SUBSCRIBER_URL = `https://${process.env.VITE_API_ID}.execute-api.${
  process.env.VITE_REGION
}.amazonaws.com/prod/subscriber`;


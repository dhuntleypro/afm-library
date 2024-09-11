// import * as SecureStore from 'expo-secure-store';
// import { getAuthToken } from './getAuthToken';

// // Fetch client alternative to Axios
// export function createFetchClient(
//   baseURL: string,
//   defaultParams: Record<string, string | number>,
//   defaultHeaders: Record<string, string>
// ) {
//   const fetchClient = async <T = any>(
//     endpoint: string,
//     options: RequestInit & { params?: Record<string, string | number> } = {}
//   ): Promise<T> => {
//     const baseHasProd = baseURL.includes('/prod');
//     const normalizedBaseURL = baseHasProd ? baseURL : `${baseURL}/prod`;
//     const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
//     const url = new URL(`${normalizedBaseURL}${normalizedEndpoint}`);

//     // Add default params and any options params to URL
//     const params = new URLSearchParams();
//     Object.entries(defaultParams).forEach(([key, value]) => {
//       params.append(key, String(value));
//     });
//     if (options.params) {
//       Object.entries(options.params).forEach(([key, value]) => {
//         params.append(key, String(value));
//       });
//     }
//     url.search = params.toString();

//     // Add headers
//     const token = await getAuthToken();
//     const headers = new Headers({
//       ...defaultHeaders,
//       //authentication:  token ? `${token}` : '', 
//      //  Authorization: token ? `${token}` : '', // Changed Authentication to Authorization for correctness
//       ...options.headers,
//     });

//     // Log request details for debugging
//     console.log("Full Request URL:", url.toString());
//     console.log("Request Headers:", Object.fromEntries(headers.entries()));
//     if (options.body) {
//       console.log("Request Body:", options.body);
//     }

//     // Make the fetch request
//     const response = await fetch(url.toString(), {
//       ...options,
//       headers,
//     });

//     // Handle response errors
//     if (!response.ok) {
//       const errorData = await response.json().catch(() => ({}));
//       throw new Error(`HTTP error! Status: ${response.status}, ${JSON.stringify(errorData)}`);
//     }

//     // Return the JSON response
//     return response.json();
//   };

//   return {
//     get: <T = any>(endpoint: string, options: Omit<RequestInit, 'method'> & { params?: Record<string, string | number> } = {}) =>
//       fetchClient<T>(endpoint, { ...options, method: 'GET' }),

//     post: <T = any>(endpoint: string, body: any, options: Omit<RequestInit, 'method' | 'body'> & { params?: Record<string, string | number> } = {}) => {
//       console.log("Body before sending POST:", body); // Log the body before sending
//       return fetchClient<T>(endpoint, { ...options, method: 'POST', body: JSON.stringify(body) });
//     },

//     put: <T = any>(endpoint: string, body: any, options: Omit<RequestInit, 'method' | 'body'> & { params?: Record<string, string | number> } = {}) =>
//       fetchClient<T>(endpoint, { ...options, method: 'PUT', body: JSON.stringify(body) }),

//     patch: <T = any>(endpoint: string, body: any, options: Omit<RequestInit, 'method' | 'body'> & { params?: Record<string, string | number> } = {}) => {
//       console.log("Body before sending PATCH:", body); // Log the body before sending
//       return fetchClient<T>(endpoint, { ...options, method: 'PATCH', body: JSON.stringify(body) });
//     },

//     delete: <T = any>(endpoint: string, options: Omit<RequestInit, 'method'> & { params?: Record<string, string | number> } = {}) =>
//       fetchClient<T>(endpoint, { ...options, method: 'DELETE' }),
//   };
// }
































export function createFetchClient(
  baseURL: string,
  defaultParams: Record<string, string | number>,
  defaultHeaders: Record<string, string>
) {
  const fetchClient = async <T = any>(
    endpoint: string,
    options: RequestInit & { params?: Record<string, string | number> } = {}
  ): Promise<T> => {
    const baseHasProd = baseURL.includes('/prod');
    const normalizedBaseURL = baseHasProd ? baseURL : `${baseURL}/prod`;
    const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const url = new URL(`${normalizedBaseURL}${normalizedEndpoint}`);

    const params = new URLSearchParams();
    Object.entries(defaultParams).forEach(([key, value]) => {
      params.append(key, String(value));
    });

    if (options.params) {
      Object.entries(options.params).forEach(([key, value]) => {
        params.append(key, String(value));
      });
    }
    url.search = params.toString();

    const headers = new Headers({
      ...defaultHeaders,
      ...options.headers,
    });

    // Log the full URL and request details
    console.log("Full Request URL:", url.toString());
    console.log("Request Headers:", headers);

    if (options.body) {
      console.log("Request Body:", options.body); // Log the body being sent
    }

    const response = await fetch(url.toString(), {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`HTTP error! Status: ${response.status}, ${JSON.stringify(errorData)}`);
    }

    return response.json();
  };

  return {
    get: <T = any>(endpoint: string, options: Omit<RequestInit, 'method'> & { params?: Record<string, string | number> } = {}) =>
      fetchClient<T>(endpoint, { ...options, method: 'GET' }),

    post: <T = any>(endpoint: string, body: any, options: Omit<RequestInit, 'method' | 'body'> & { params?: Record<string, string | number> } = {}) => {
      console.log("Body before sending:", body); // Log the body before sending
      return fetchClient<T>(endpoint, { ...options, method: 'POST', body: JSON.stringify(body) });
    },

     patch: <T = any>(endpoint: string, body: any, options: Omit<RequestInit, 'method' | 'body'> & { params?: Record<string, string | number> } = {}) => {
       console.log("Body before sending PATCH:", body); // Log the body before sending
       return fetchClient<T>(endpoint, { ...options, method: 'PATCH', body: JSON.stringify(body) });
     },


    put: <T = any>(endpoint: string, body: any, options: Omit<RequestInit, 'method' | 'body'> & { params?: Record<string, string | number> } = {}) =>
      fetchClient<T>(endpoint, { ...options, method: 'PUT', body: JSON.stringify(body) }),

    delete: <T = any>(endpoint: string, options: Omit<RequestInit, 'method'> & { params?: Record<string, string | number> } = {}) =>
      fetchClient<T>(endpoint, { ...options, method: 'DELETE' }),
  };
}




// // src/util/createFetchClient.ts
// export function createFetchClient(
//   baseURL: string,
//   defaultParams: Record<string, string | number>,
//   defaultHeaders: Record<string, string>
// ) {
//   const fetchClient = async <T = any>(
//     endpoint: string,
//     options: RequestInit & { params?: Record<string, string | number> } = {}
//   ): Promise<T> => {
//     const baseHasProd = baseURL.includes('/prod');
//     const normalizedBaseURL = baseHasProd ? baseURL : `${baseURL}/prod`;
//     const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
//     const url = new URL(`${normalizedBaseURL}${normalizedEndpoint}`);

//     const params = new URLSearchParams();
//     Object.entries(defaultParams).forEach(([key, value]) => {
//       params.append(key, String(value));
//     });

//     if (options.params) {
//       Object.entries(options.params).forEach(([key, value]) => {
//         params.append(key, String(value));
//       });
//     }
//     url.search = params.toString();

//     const headers = new Headers({
//       ...defaultHeaders,
//       ...options.headers,
//     });

//     const response = await fetch(url.toString(), {
//       ...options,
//       headers,
//     });

//     if (!response.ok) {
//       const errorData = await response.json().catch(() => ({}));
//       throw new Error(`HTTP error! Status: ${response.status}, ${JSON.stringify(errorData)}`);
//     }

//     return response.json();
//   };

//   return {
//     get: <T = any>(endpoint: string, options: Omit<RequestInit, 'method'> & { params?: Record<string, string | number> } = {}) =>
//       fetchClient<T>(endpoint, { ...options, method: 'GET' }),

//     post: <T = any>(endpoint: string, body: any, options: Omit<RequestInit, 'method' | 'body'> & { params?: Record<string, string | number> } = {}) =>
//       fetchClient<T>(endpoint, { ...options, method: 'POST', body: JSON.stringify(body) }),

//     put: <T = any>(endpoint: string, body: any, options: Omit<RequestInit, 'method' | 'body'> & { params?: Record<string, string | number> } = {}) =>
//       fetchClient<T>(endpoint, { ...options, method: 'PUT', body: JSON.stringify(body) }),

//     delete: <T = any>(endpoint: string, options: Omit<RequestInit, 'method'> & { params?: Record<string, string | number> } = {}) =>
//       fetchClient<T>(endpoint, { ...options, method: 'DELETE' }),
//   };
// }

// Fetch Client Initialization Function for handling arrays
export function createFetchClientForItems(
    baseURL: string,
    defaultParams: Record<string, string | number>,
    defaultHeaders: Record<string, string>
  ) {
    const fetchClientForItems = async <T = any>(
      endpoint: string,
      options: RequestInit & { params?: Record<string, string | number> } = {}
    ): Promise<T[]> => {
      // Ensure `/prod` is part of the base URL if not already present
      const baseHasProd = baseURL.includes('/prod');
      const normalizedBaseURL = baseHasProd ? baseURL : `${baseURL}/prod`;
  
      // Ensure the endpoint always starts with a leading slash
      const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  
      // Create the full URL using the normalizedBaseURL and normalized endpoint
      const url = new URL(`${normalizedBaseURL}${normalizedEndpoint}`);
  
      // Add default parameters to the URL
      const params = new URLSearchParams();
      Object.entries(defaultParams).forEach(([key, value]) => {
        params.append(key, String(value)); // Ensure correct parameter handling
      });
  
      // Append options.params if provided
      if (options.params) {
        Object.entries(options.params).forEach(([key, value]) => {
          params.append(key, String(value)); // Convert number to string only when necessary
        });
      }
      url.search = params.toString(); // Set search params
  
      // Merge default headers with any provided headers
      const headers = new Headers({
        ...defaultHeaders,
        ...options.headers,
      });
  
      // Log the URL, headers, and parameters for debugging
      console.log('Request URL:', url.toString());
      console.log('Request Params:', params.toString());
      console.log('Request Headers:', Object.fromEntries(headers.entries()));
  
      // Perform the fetch request
      const response = await fetch(url.toString(), {
        ...options,
        headers,
      });
  
      // Check for HTTP errors
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`HTTP error! Status: ${response.status}, ${JSON.stringify(errorData)}`);
      }
  
      // Process the response and ensure it's an array
      const data = await response.json();
  
      // Log the full response data before returning
    //   console.log('Response Data:', JSON.stringify(data, null, 2));
  
      return Array.isArray(data) ? data : [data];
    };
  
    return {
      get: <T = any>(endpoint: string, options: Omit<RequestInit, 'method'> & { params?: Record<string, string | number> } = {}) =>
        fetchClientForItems<T>(endpoint, { ...options, method: 'GET' }),
  
      post: <T = any>(endpoint: string, body: any, options: Omit<RequestInit, 'method' | 'body'> & { params?: Record<string, string | number> } = {}) =>
        fetchClientForItems<T>(endpoint, { ...options, method: 'POST', body: JSON.stringify(body) }),
  
      put: <T = any>(endpoint: string, body: any, options: Omit<RequestInit, 'method' | 'body'> & { params?: Record<string, string | number> } = {}) =>
        fetchClientForItems<T>(endpoint, { ...options, method: 'PUT', body: JSON.stringify(body) }),
  
      delete: <T = any>(endpoint: string, options: Omit<RequestInit, 'method'> & { params?: Record<string, string | number> } = {}) =>
        fetchClientForItems<T>(endpoint, { ...options, method: 'DELETE' }),
    };
  }
  

















// worked but needed more
// // Fetch Client Initialization Function for handling arrays
// export function createFetchClientForItems(
//     baseURL: string,
//     defaultParams: Record<string, string | number>,
//     defaultHeaders: Record<string, string>
//   ) {
//     const fetchClientForItems = async <T = any>(
//       endpoint: string,
//       options: RequestInit & { params?: Record<string, string | number> } = {}
//     ): Promise<T[]> => { // Returns an array of items
//       // Ensure `/prod` is part of the base URL if not already present
//       const baseHasProd = baseURL.includes('/prod');
//       const normalizedBaseURL = baseHasProd ? baseURL : `${baseURL}/prod`;
  
//       // Ensure the endpoint always starts with a leading slash
//       const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  
//       // Create the full URL using the normalizedBaseURL and normalized endpoint
//       const url = new URL(`${normalizedBaseURL}${normalizedEndpoint}`);
  
//       // Add default parameters to the URL
//       const params = new URLSearchParams();
//       Object.entries(defaultParams).forEach(([key, value]) => {
//         params.append(key, String(value)); // Ensure correct parameter handling
//       });
  
//       // Append options.params if provided
//       if (options.params) {
//         Object.entries(options.params).forEach(([key, value]) => {
//           params.append(key, String(value)); // Convert number to string only when necessary
//         });
//       }
//       url.search = params.toString(); // Set search params
  
//       // Merge default headers with any provided headers
//       const headers = new Headers({
//         ...defaultHeaders,
//         ...options.headers,
//       });
  
//       // Log the URL, headers, and parameters for debugging
//       console.log('Request URL:', url.toString());
//       console.log('Request Params:', params.toString());
//       console.log('Request Headers:', Object.fromEntries(headers.entries()));
  
//       // Perform the fetch request
//       const response = await fetch(url.toString(), {
//         ...options,
//         headers,
//       });
  
//       // Check for HTTP errors
//       if (!response.ok) {
//         const errorData = await response.json().catch(() => ({}));
//         throw new Error(`HTTP error! Status: ${response.status}, ${JSON.stringify(errorData)}`);
//       }
  
//       // Process the response
//       const data = await response.json();
  
//       // Ensure that the response is always an array
//       return Array.isArray(data) ? data : [data];
//     };
  
//     return {
//       get: <T = any>(endpoint: string, options: Omit<RequestInit, 'method'> & { params?: Record<string, string | number> } = {}) =>
//         fetchClientForItems<T>(endpoint, { ...options, method: 'GET' }),
  
//       post: <T = any>(endpoint: string, body: any, options: Omit<RequestInit, 'method' | 'body'> & { params?: Record<string, string | number> } = {}) =>
//         fetchClientForItems<T>(endpoint, { ...options, method: 'POST', body: JSON.stringify(body) }),
  
//       put: <T = any>(endpoint: string, body: any, options: Omit<RequestInit, 'method' | 'body'> & { params?: Record<string, string | number> } = {}) =>
//         fetchClientForItems<T>(endpoint, { ...options, method: 'PUT', body: JSON.stringify(body) }),
  
//       delete: <T = any>(endpoint: string, options: Omit<RequestInit, 'method'> & { params?: Record<string, string | number> } = {}) =>
//         fetchClientForItems<T>(endpoint, { ...options, method: 'DELETE' }),
//     };
//   }
  
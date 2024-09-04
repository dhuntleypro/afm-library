// Fetch Client Initialization Function
export function createFetchClient(
  baseURL: string,
  defaultParams: Record<string, string | number>,
  defaultHeaders: Record<string, string>
) {
  const fetchClient = async <T = any>(
    endpoint: string,
    options: RequestInit & { params?: Record<string, string | number> } = {}
  ): Promise<T> => {
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
      params.append(key, String(value)); // No need for toString() if the value is already a string or number
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

    return response.json();
  };

  return {
    get: <T = any>(endpoint: string, options: Omit<RequestInit, 'method'> & { params?: Record<string, string | number> } = {}) =>
      fetchClient<T>(endpoint, { ...options, method: 'GET' }),

    post: <T = any>(endpoint: string, body: any, options: Omit<RequestInit, 'method' | 'body'> & { params?: Record<string, string | number> } = {}) =>
      fetchClient<T>(endpoint, { ...options, method: 'POST', body: JSON.stringify(body) }),

    put: <T = any>(endpoint: string, body: any, options: Omit<RequestInit, 'method' | 'body'> & { params?: Record<string, string | number> } = {}) =>
      fetchClient<T>(endpoint, { ...options, method: 'PUT', body: JSON.stringify(body) }),

    delete: <T = any>(endpoint: string, options: Omit<RequestInit, 'method'> & { params?: Record<string, string | number> } = {}) =>
      fetchClient<T>(endpoint, { ...options, method: 'DELETE' }),
  };
}








// // Axios alternitive
// // Fetch Client Initialization Function
// export function createFetchClient(
//   baseURL: string,
//   defaultParams: Record<string, string | number>,
//   defaultHeaders: Record<string, string>
// ) {
//   const fetchClient = async <T = any>(
//     endpoint: string,
//     options: RequestInit & { params?: Record<string, string | number> } = {}
//   ): Promise<T> => {
//     // Ensure `/prod` is part of the base URL if not already present
//     const baseHasProd = baseURL.includes('/prod');
//     const normalizedBaseURL = baseHasProd ? baseURL : `${baseURL}/prod`;

//     // Ensure the endpoint always starts with a leading slash
//     const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

//     // Create the full URL using the normalizedBaseURL and normalized endpoint
//     const url = new URL(`${normalizedBaseURL}${normalizedEndpoint}`);

//     // Add default parameters to the URL
//     const params = new URLSearchParams();
//     Object.entries(defaultParams).forEach(([key, value]) => {
//       params.append(key, value.toString()); // Ensure all defaultParams are strings
//     });

//     // Append options.params if provided, converting numbers to strings
//     if (options.params) {
//       Object.entries(options.params).forEach(([key, value]) => {
//         params.append(key, value.toString()); // Convert number to string
//       });
//     }
//     url.search = params.toString(); // Set search params as string

//     // Merge default headers with any provided headers
//     const headers = new Headers({
//       ...defaultHeaders,
//       ...options.headers,
//     });

//     // Log the URL, headers, and parameters for debugging
//     console.log('Request URL:', url.toString());
//     console.log('Request Params:', params.toString());
//     console.log('Request Headers:', Object.fromEntries(headers.entries()));

//     // Perform the fetch request
//     const response = await fetch(url.toString(), {
//       ...options,
//       headers,
//     });

//     // Check for HTTP errors
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







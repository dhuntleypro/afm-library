
// Axios alternitive

export function createFetchClient(
  baseURL: string,
  defaultParams: Record<string, string | number>,
  defaultHeaders: Record<string, string>
) {
  const fetchClient = async <T = any>(
    endpoint: string,
    options: RequestInit & { params?: Record<string, string | number> } = {}
  ): Promise<T> => {
    const url = new URL(endpoint, baseURL);

    // Add default parameters to the URL
    const params = new URLSearchParams(defaultParams as any);
    if (options.params) {
      Object.entries(options.params).forEach(([key, value]) => {
        params.append(key, value.toString());
      });
    }
    url.search = params.toString();

    // Merge default headers with any provided headers
    const headers = new Headers({
      ...defaultHeaders,
      ...options.headers,
    });

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

  
  export default createFetchClient;
  
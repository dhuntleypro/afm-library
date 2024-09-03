
import { useEffect, useState, useCallback } from 'react';

type FetchFunction = () => Promise<any>;

const useFetchObjects = (fetchFunction: FetchFunction) => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);  // Clear previous errors

    try {
      const response = await fetchFunction();
      setData(response.data || response);  // Adjust for different API structures
    } catch (err: any) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [fetchFunction]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, error, refetch };
};

export default useFetchObjects;













// import { useEffect, useState } from 'react';

// const useFetchObjects = (fetchFunction: any) => {
//   const [data, setData] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const fetchData = async () => {
//     setIsLoading(true);
//     try {
//       // const response = await axiosInstance.get(endPoint);
//       const response = await fetchFunction();

//       setData(response.data);
//     } catch (error: any) {
//       setError(error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const refetch = () => {
//     setIsLoading(true);
//     fetchData();
//   };

//   return { data, isLoading, error, refetch };
// };

// export default useFetchObjects;





// import { useEffect, useState } from 'react';
// import axios from 'axios';

// const useFetchObjects = (fetchFunction: any) => {
//   const [data, setData] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const fetchData = async () => {
//     setIsLoading(true);
//     try {
//       // const response = await axiosInstance.get(endPoint);
//       const response = await fetchFunction();

//       setData(response.data);
//     } catch (error: any) {
//       setError(error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const refetch = () => {
//     setIsLoading(true);
//     fetchData();
//   };

//   return { data, isLoading, error, refetch };
// };

// export default useFetchObjects;


import { useEffect, useState } from 'react';


const useFetchObject = <T,>(fetchFunction: () => Promise<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null); // Clear any previous errors
    try {
      console.log("FETCHING....");
      const response = await fetchFunction();
      // console.log("Fetched data (useFetchObject):", response);
      setData(response); // Directly set the response, assuming it's already the data
    } catch (err) {
      setError((err as Error).message); // Set the error in the state
      console.log("ERROR....", err);
    } finally {
      setIsLoading(false);
      console.log("FINISHED....");
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Only run on mount

  const refetch = () => {
    fetchData();
  };

  return { data, isLoading, error, refetch };
};

export default useFetchObject;
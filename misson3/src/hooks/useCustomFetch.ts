import { useEffect, useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';

export default function useCustomFetch<T>(
  url: string,
  config?: AxiosRequestConfig,
) {
  const [data, setData] = useState<T | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsPending(true);
      setIsError(false);
      try {
        const response = await axios.get<T>(url, {
          ...config,
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            ...(config?.headers || {}),
          },
        });
        setData(response.data);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, isPending, isError };
}

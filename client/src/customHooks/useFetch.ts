import { useEffect, useState } from "react";
import { axiosRequest } from "../helpers/axiosRequest";

interface ApiResponse<T> {
  data: T;
}

const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await axiosRequest.get<ApiResponse<T>>(url);
        if (res) {
          setData(res.data.data);
        }
      } catch (error) {
        if (typeof error === "string") {
          setError(true);
        } else if (error instanceof Error) {
          setError(true);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);
  return { data, error, isLoading };
};

export default useFetch;

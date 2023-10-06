import { useEffect, useState } from "react";
import { axiosRequest } from "../helpers/axiosRequest";

const useFetch = (url: string) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await axiosRequest.get(url);
        setData(res.data.data);
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

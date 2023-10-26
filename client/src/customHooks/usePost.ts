import { useState } from "react";
import { axiosRequest } from "../helpers/axiosRequest";

const usePost = (url: string, info: object) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const postData = async () => {
    try {
      setIsLoading(true);
      const res = await axiosRequest.post(url, info);
      setData(res.data);
    } catch (error: unknown) {
      if (typeof error === "string") {
        console.log(error);
        setError(true);
      } else if (error instanceof Error) {
        console.log(error);
        setError(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  postData();
  return { data, isLoading, error };
};

export default usePost;

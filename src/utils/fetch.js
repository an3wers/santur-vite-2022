import axios from "axios";
import { useConfig } from "@/utils/config";
const { API_BASE_URL } = useConfig();

export const useCustomFetch = async (
  url,
  method = "GET",
  baseURL = API_BASE_URL,
  params = {}
) => {
  const request = {
    url,
    method,
    baseURL,
    withCredentials: true,
  };

  if (method === "GET") {
    request.params = params;
  } else if (method === "POST") {
    request.data = data;
  }

  // const response = await axios(request);
  const response = await axios({
    url,
    method,
    baseURL,
    params,
    withCredentials: true,
  });
  return response.data;
};

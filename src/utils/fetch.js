import axios from "axios";
import { useConfig } from "@/utils/config";
const { API_BASE_URL } = useConfig();

export const useCustomFetch = async (url, method = "GET", params = {}) => {
  const response = await axios({
    url,
    method,
    baseURL: API_BASE_URL,
    params,
    withCredentials: true,
  });
  return response.data;
};

import { getApiPathNoVersion } from "@/config";
import * as http from "@/services/httpServices";
import { AxiosError } from "axios";

const apiHandiemanOverview = getApiPathNoVersion("orders", "overview");

export const getHandiemanOverview = async (
  sellerId: string,
  filter: string | null
): Promise<any> => {
  try {
    const overview = await http.apiCall.get(
      `${apiHandiemanOverview}/${sellerId}?filter=${filter}`
    );
    return overview?.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      // The server responded with a non-2xx status code
      console.error("Error response:", axiosError.response.data); // Error details
      return axiosError.response.data;
    } else if (axiosError.request) {
      // The request was made but no response was received
      console.error("No response received:", axiosError.request);
    } else {
      // Something happened in setting up the request
      console.error("Error setting up request:", axiosError.message);
    }
    console.log(error);
  }
};

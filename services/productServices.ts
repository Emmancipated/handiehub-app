import { getApiPathNoVersionNoPath } from "@/config";
import * as http from "@/services/httpServices";
import { AxiosError } from "axios";

const apiGetProducts = getApiPathNoVersionNoPath("products");

export const getAllProducts = async (
  page: string,
  limit: string
): Promise<any> => {
  try {
    const products = await http.apiCall.get(
      `${apiGetProducts}/?page=${page}&limit=${limit}`
    );
    console.log(products, "pdts from services, I added statuscode");

    return products?.data;
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
  }
};

export const getProduct = async (slug: string): Promise<any> => {
  try {
    const product = await http.apiCall.get(`${apiGetProducts}/${slug}`);
    return product?.data;
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
  }
};

export const getProductsByCategory = async (
  category: string,
  page: string = "1",
  limit: string = "20"
): Promise<any> => {
  try {
    const products = await http.apiCall.get(
      `${apiGetProducts}/category/${category}?page=${page}&limit=${limit}`
    );
    console.log(products, "products by category from services");
    return products?.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      console.error("Error response:", axiosError.response.data);
      return axiosError.response.data;
    } else if (axiosError.request) {
      console.error("No response received:", axiosError.request);
    } else {
      console.error("Error setting up request:", axiosError.message);
    }
  }
};

export const searchProducts = async (
  query: string,
  page: string = "1",
  limit: string = "20"
): Promise<any> => {
  try {
    const products = await http.apiCall.get(
      `${apiGetProducts}/search?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}`
    );
    console.log(products, "search products from services");
    return products?.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      console.error("Error response:", axiosError.response.data);
      return axiosError.response.data;
    } else if (axiosError.request) {
      console.error("No response received:", axiosError.request);
    } else {
      console.error("Error setting up request:", axiosError.message);
    }
  }
};
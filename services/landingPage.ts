import {
  getApiPath,
  getApiPathNoVersion,
  getApiPathNoVersionNoPath,
} from "@/config";
import * as http from "./httpServices";

const awesRapidRamp = getApiPath("open", "/aws-rapid-ramp-credit");

const getAllUsersPath = getApiPathNoVersionNoPath("users");

// export const awesRapidRampApi = async (data) => {
//   try {
//     return await http.apiCall.post(`${awesRapidRamp}`, data);
//   } catch (error) {
//     return error.message;
//   }
// };

export const getAllUsers = async (): Promise<any> => {
  try {
    const res = await http.apiCall.get(getAllUsersPath);
    // const { data: res } = await http.apiCall.api.post(apiLogIn, data);
    console.log(res.data, "updated response");
    return res;
  } catch (error) {
    console.log(error, "updated error");

    return error;
  }
};

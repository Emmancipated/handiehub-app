import { jwtDecode } from "jwt-decode";
import { getApiPath, getApiPathNoVersion } from "../config";
import * as http from "@/services/httpServices";
import { AxiosError } from "axios";
import { Alert } from "react-native";
import {
  HandiemanAccountUpdatePayload,
  LoginPayload,
  RegisterPayload,
  ResendVerificationPayload,
  VerifyUserPayload,
} from "@/utils/types";

const apiLogIn = getApiPathNoVersion("auth", "login");
const apiSignUp = getApiPathNoVersion("auth", "sign-up");
const resendVerificationLink = getApiPathNoVersion(
  "auth",
  `resend-verification`
);
const apiConfirmAccount = getApiPathNoVersion("auth", "verify");
const updateHandieman = getApiPathNoVersion("auth", "handieman/update-account");

// http://localhost:3000/auth/verify?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImVtbWFudWVsa2FsdWNrQGdtYWlsLmNvbSIsInN1YiI6ImI0YmU2MWM5LTAzOGEtNDZkMC1iMjVmLWExYzhkYTQ4MmZjZiIsInJvbGUiOiJoYW5kaWVtYW4iLCJpYXQiOjE3MzMwMzMwNTcsImV4cCI6MTczMzAzMzA2MH0.y1B4bZ8F8W49-iTEASdaqe13r2l1ELyCsA_GfmnDqYQ

// const apiConfirmSignUp = getApiPath("open", "confirm-sign-up");
// const uploadMedia = getApiPath("core", "upload-media");
// const updateUser = getApiPath("core", "update-user");

// const apiResendCode = getApiPath("open", "resend-verify-code");
// const apiForgotPassword = getApiPath("open", "forgot-password");
// const apiResetPassword = getApiPath("open", "confirm-forgot-password");

// local auth set and get
// export const getCurrentClientData = () => {
//   let clientData;
//   let token;
//   let customer_id;
//   let username;
//   let brand_name;
//   let first_name;
//   let surname;

//   const authToken = sessionStorage.getItem("cecureStreamAuthToken");

//   try {
//     if (authToken) {
//       const parsedAuthToken = JSON.parse(authToken);
//       clientData = parsedAuthToken?.uData;
//       token = parsedAuthToken?.askBettyAcToken;

//       if (clientData) {
//         customer_id = clientData["cognito:customer_id"];
//         username = clientData["cognito:username"];
//         brand_name =
//           clientData["custom:brand_name"] || clientData["custom:company_name"];
//         first_name = clientData.given_name;
//         surname = clientData.family_name;
//       }
//     }
//   } catch (error) {
//     // Handle the JSON parsing error
//     console.error("Error parsing JSON:", error);
//   }

//   return {
//     clientData,
//     token,
//     brand_name,
//     customer_id,
//     username,
//     first_name,
//     surname,
//   };
// };

// // isAuth
// export const IsAuthenticated = () => {
//   if (
//     localStorage.getItem("cecureStreamAuthToken") ||
//     sessionStorage.getItem("cecureStreamAuthToken")
//   ) {
//     try {
//       const token =
//         JSON.parse(localStorage.getItem("cecureStreamAuthToken") || "")[
//           "cecureStreamAcToken"
//         ] ||
//         JSON.parse(sessionStorage.getItem("cecureStreamAuthToken") || "")[
//           "cecureStreamAcToken"
//         ];
//       if (token) return true;
//     } catch (error) {}
//   }
//   return false;
// };

// export const getNameAbbreviation = () => {
//   let clientData;
//   let first_name;
//   let surname;
//   let initials;

//   if (
//     localStorage.getItem("cecureStreamAuthToken") ||
//     sessionStorage.getItem("cecureStreamAuthToken")
//   ) {
//     try {
//       const token =
//         JSON.parse(localStorage.getItem("cecureStreamAuthToken") || "") ||
//         JSON.parse(sessionStorage.getItem("cecureStreamAuthToken") || "");
//       if (token) {
//         clientData = token?.uData;
//         first_name = clientData.given_name;
//         surname = clientData.family_name;
//         initials =
//           first_name.charAt(0).toUpperCase() + surname.charAt(0).toUpperCase();
//       }
//     } catch (error) {
//       console.error("Error parsing JSON:", error);
//     }
//   }

//   return initials;
// };

// export const getClientInfo = () => {
//   let clientData;
//   let first_name;
//   let surname;
//   let user_id;
//   let email;
//   let picture;

//   if (
//     localStorage.getItem("cecureStreamAuthToken") ||
//     sessionStorage.getItem("cecureStreamAuthToken")
//   ) {
//     try {
//       const token =
//         JSON.parse(localStorage.getItem("cecureStreamAuthToken") || "") ||
//         JSON.parse(sessionStorage.getItem("cecureStreamAuthToken") || "");
//       if (token) {
//         clientData = token?.uData;
//         first_name = (clientData.given_name.charAt(0).toUpperCase() +
//           clientData.given_name.slice(1)) as string;
//         surname = (clientData.family_name.charAt(0).toUpperCase() +
//           clientData.family_name.slice(1)) as string;
//         user_id = clientData["cognito:username"];
//         email = clientData.email as string;
//         picture =
//           (clientData.picture as string) && (clientData.picture as string);
//       }
//     } catch (error) {
//       console.error("Error parsing JSON:", error);
//     }
//   }

//   return { first_name, surname, user_id, email, picture };
// };

// export const sessionExpired = () => {
//   sessionStorage.setItem("cecure-stream-session-expired", `${true}`);
//   // window.location.reload()
// };

// export const confirmSignUpOpt = async (
//   data: ConfirmNewSignUpPayload
// ): Promise<ConfirmNewSignUpResponse> => {
//   try {
//     return await http.apiCall.post(apiConfirmSignUp, data);
//   } catch (error: any) {
//     return error;
//   }
// };
// // Forgot Password
// export const forgotPassword = async (
//   data: ForgotPAsswordUserDetailsProps
// ): Promise<any> => {
//   try {
//     return await http.apiCall.post(apiForgotPassword, data);
//   } catch (error) {
//     return error;
//   }
// };

// export const resetPassword = async (
//   data: ResetPAsswordUserDetailsProps
// ): Promise<any> => {
//   try {
//     return await http.apiCall.post(apiResetPassword, data);
//   } catch (error) {
//     return error;
//   }
// };

// // export const changePassword = async (data: ChangePasssword) => {
// //   try {
// //     return await http.apiCall.post(apiChangePassword, data)
// //   } catch (error) {
// //     return error
// //   }
// // }

// // Confirm forgot Password
// // export const confirmForgotPassword = async (data: ConfirmSignUpPayload) => {
// //   try {
// //     return await http.apiCall.post(apiConfirmForgotPassword, data)
// //   } catch (error) {
// //     return error
// //   }
// // }
// // Resend Verification
// // Adjust the resendVerificationOTP function to accept an object with an email property

// export const resendVerificationOTP = async (
//   data: ConfirmPayload
// ): Promise<any> => {
//   try {
//     return await http.apiCall.post(apiResendCode, data);
//   } catch (error) {
//     return error;
//   }
// };

// export const uploadMediaFnc = async (
//   data: UploadMediaPayload
// ): Promise<any> => {
//   try {
//     return await http.apiCall.api.post(uploadMedia, data);
//   } catch (error) {
//     return error;
//   }
// };

// export const uploadImageFile = async (url: string, data: any): Promise<any> => {
//   const accessToken = localStorage.getItem("cecureStreamAcToken");
//   try {
//     return http.apiCall.put(url, data);
//   } catch (error) {
//     return error;
//   }
// };

// export const updateUserFnc = async (data: UpdateUserPayload): Promise<any> => {
//   try {
//     const user = await http.apiCall.api.post(updateUser, data);
//     if (user && localStorage.getItem("cecureStreamAuthToken")) {
//       const clientData = JSON.parse(
//         localStorage.getItem("cecureStreamAuthToken") || ""
//       );
//       const updatedClientData = {
//         ...clientData,
//         uData: {
//           ...clientData.uData,
//           ...data,
//         },
//       };
//       localStorage.setItem(
//         "cecureStreamAuthToken",
//         JSON.stringify(updatedClientData)
//       );
//     }
//     return user;
//   } catch (error) {
//     return error;
//   }
// };

// loginUser
export const loginUser = async (data: LoginPayload): Promise<any> => {
  try {
    const res = await http.apiCall.post(apiLogIn, data);

    // const { data: res } = await http.apiCall.api.post(apiLogIn, data);
    // console.log(res.url, data, "updated response");
    let cecureStreamAuth;
    // if (res.statusCode === 200) {
    //   const cecureStreamAcToken = res.body.data.access_token;
    //   const cecureStreamIdToken = res.body.data.id_token;
    //   const cecureStreamRefToken = res.body.data.refresh_token;
    //   const cecureStreamTokenDuration = res.body.data.expires_in;
    //   cecureStreamAuth = {
    //     cecureStreamAcToken,
    //     cecureStreamIdToken,
    //     cecureStreamRefToken,
    //     cecureStreamTokenDuration,
    //     uData: decodeJwt(cecureStreamIdToken),
    //   };
    // }
    // return {
    //   response: res,
    //   // error: res.body?.message.error,
    //   // success: res.body?.message.success,
    //   // message: res.body?.message.message,
    //   data: { ...cecureStreamAuth },
    // };
    return res;
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

// registerUser
export const registerUser = async (data: RegisterPayload): Promise<any> => {
  try {
    return await http.apiCall.post(apiSignUp, data);
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
// config?: AxiosRequestConfig<any> | undefine

export const resendVerification = async (
  data: ResendVerificationPayload
): Promise<any> => {
  try {
    return await http.apiCall.get(resendVerificationLink, {
      params: {
        email: data.email,
      },
    });
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

//verify account
export const verifyUserAccount = async (
  data: VerifyUserPayload
): Promise<any> => {
  try {
    return await http.apiCall.post(apiConfirmAccount, data);
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

export const updateHandiemanSignup = async (
  data: HandiemanAccountUpdatePayload
): Promise<any> => {
  try {
    return await http.apiCall.post(updateHandieman, data);
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

// decodeFunc
// export const decodeJwt = (jwt: string) => {
//   return jwtDecode(jwt);
// };

// // LogOutUser
// export const logOutUser = () => {
//   // sessionStorage.removeItem('askBetty-smActive')
//   sessionStorage.removeItem("cecureStreamAuthToken");
//   // sessionStorage.removeItem('env-askBetty')
//   // sessionStorage.removeItem('abDep')
//   localStorage.removeItem("cecureStreamAuthToken");
//   // localStorage.removeItem('askBetty-smActive')
//   // localStorage.removeItem('regPath')
//   // localStorage.removeItem('askBetty-acUser')
//   // localStorage.removeItem('auth_ab')
//   // localStorage.removeItem('auth_data')
//   clearCacheData();
// };

// const clearCacheData = () => {
//   caches.keys().then((names) => {
//     names.forEach((name) => {
//       caches.delete(name);
//     });
//   });
// };

// export const getUserLocation = async (accessToken: string) => {
//   try {
//     return await http.apiCall.post(apiGetUserLocation, {
//       headers: {
//         Authorization: accessToken,
//       },
//     })
//   } catch (error) {
//     console.log(error)
//   }
// }
/** 
// GetUser ***********************
export const getUserData = async (data: any) => {
  try {
    return await http.apiCall.post(apiGetUserData, data, {
      headers: {
        Authorization: data?.accessToken,
      },
    })
  } catch (error) {
    console.log(error)
  }
}

export const checkUsernameApi = async (data: any) => {
  try {
    return await http.apiCall.post(apiGetUsername, data)
  } catch (error) {
    console.log(error)
  }
}
*/

// import { subDomain } from "@/utils/getDomain";
// import { getApiBaseURL } from "@/utils/getDomain";

export const init = () => {
  localStorage.removeItem("regPath");
};
// export let apiBase = getApiBaseURL();
export let apiBase = process.env.EXPO_PUBLIC_API_BASE;

// export let apiBase = "http://192.168.23.37:3000";

// export let apiBase = "https://handiehub-backend.onrender.com";

const VERSION = "v1";

// const subdomain = subDomain();

const ENV_CECURESTREAM = "env-cecure-stream";

export const getApiPath = (pathRoot: string, path: string) => {
  return `${apiBase}/${pathRoot}/${VERSION}/${path}`;
};
export const getApiPathNoVersion = (pathRoot: string, path: string) => {
  return `${apiBase}/${pathRoot}/${path}`;
};
// export const mediaRoot = mediaBase

// export const envVariable = {
//   environment: process.NODE_ENV,
//   envVar: import.meta.env.API_KEY,
// }
export const getApiPathNoVersionNoPath = (pathRoot: string) => {
  return `${apiBase}/${pathRoot}`;
};

export const updateSignUpUser = (email: string) => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem("signUpUser", email);
    localStorage.setItem("signUpUser", email);
  }
};

export const getSignUpUser = (): string | null | undefined => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("signUpUser");
  }
};

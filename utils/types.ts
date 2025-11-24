export interface UploadMediaPayload {
  media_type: string | undefined;
}

export interface ResendVerificationPayload {
  email: string;
}
export interface VerifyUserPayload {
  email: string;
  otp: string;
}
export interface RegisterPayload {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: string;
}

export interface UpdateUserPayload {
  given_name?: string;
  family_name?: string;
  email?: string;
  picture?: string;
}
export interface ConfirmPayload {
  email: string;
}
export interface LoginPayload {
  username: string;
  password: string;
}

export interface ConfirmSignUpPayload {
  email: string;
  code: number | string;
  newPassword?: string;
}

export interface ConfirmNewSignUpPayload {
  user_name: string | null | undefined;
  code: number | string;
}

export interface ChangePasssword {
  previous_password: string;
  proposed_password: string;
  access_token: string;
}

export interface ConfirmNewSignUpResponse {
  data: {
    statusCode: number;
    body: {
      status: string;
      message: string;
      data: {};
    };
  };
}

export interface SigninResponse {
  data: {
    statusCode: number;
    body: {
      status: string;
      message: string;
      data: {
        id_token: string;
        refresh_token: string;
        access_token: string;
        expires_in: string;
        token_type: string;
      };
    };
  };
}

export interface ForgotPAsswordUserDetailsProps {
  email: string;
}

export interface ResetPAsswordUserDetailsProps {
  email: string;
  code: string;
  password: string;
}

export interface HandiemanAccountUpdatePayload {
  email: string;
  address: string;
  city: string;
  state: string;
  country: string;
  dp_url: string;
  phoneNumber: string;
  productsImageUrl: string[];
  profession: { name: string; skills: string[] }[];
  description: string;
}

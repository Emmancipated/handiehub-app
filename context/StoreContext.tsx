import React, { createContext, useContext, useState } from "react";
import * as Notifications from "expo-notifications";

type PushNotificationState = {
  notification: Notifications.Notification | undefined;
  expoPushToken: string;
};

type AuthUpState = {
  signUpName: string;
  signUpEmail: string;
  handiemanSignUpForm: {
    city: string;
    country: { label: string; value: string };
    address: string;
    state: string;
    phone: string;
    image: string;

    profession: { label: string; value: string };
    skills: string[];
    description: string;

    photo: string;

    images: string[];

    // phoneNumber: string;

    // // postalCode: string;
    // // businessName: string;
    // // businessType: string;
    // // businessDescription: string;
    // // businessWebsite: string;
    // // businessPhoneNumber: string;
    // // businessCountry: string;
    // // businessState: string;
    // // businessCity: string;
    // // businessAddress: string;
    // // businessPostalCode: string;
    activateHandiemanButton: boolean;
  };
};

type AppState = {
  authState: AuthUpState;
  pushNotificationState: PushNotificationState;
};

type AppContextType = {
  appState: AppState;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
};

export const AppCtx = createContext<AppContextType>({
  appState: {
    authState: {
      signUpName: "",
      signUpEmail: "",
      handiemanSignUpForm: {
        city: "",
        country: { label: "", value: "" },
        address: "",
        state: "",
        phone: "",
        image: "",

        profession: { label: "", value: "" },
        skills: [],
        description: "",

        photo: "",

        images: [],
        // phoneNumber: "",

        // postalCode: "",
        // businessName: "",
        // businessType: "",
        // businessDescription: "",
        // businessWebsite: "",
        // businessPhoneNumber: "",
        // businessCountry: "",
        // businessState: "",
        // businessCity: "",
        // businessAddress: "",
        // businessPostalCode: "",
        activateHandiemanButton: false,
      },
    },
    pushNotificationState: {
      notification: undefined,
      expoPushToken: "",
    },
  },
  setAppState: () => {},
});

export const StoreContext: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [appState, setAppState] = useState<AppState>({
    authState: {
      signUpName: "",
      signUpEmail: "",
      handiemanSignUpForm: {
        city: "",
        country: { label: "", value: "" },
        address: "",
        state: "",
        phone: "",
        image: "",

        profession: { label: "", value: "" },
        skills: [],
        description: "",

        photo: "",

        images: [],
        // phoneNumber: "",
        // postalCode: "",
        // businessName: "",
        // businessType: "",
        // businessDescription: "",
        // businessWebsite: "",
        // businessPhoneNumber: "",
        // businessCountry: "",
        // businessState: "",
        // businessCity: "",
        // businessAddress: "",
        // businessPostalCode: "",
        activateHandiemanButton: false,
      },
    },
    pushNotificationState: {
      notification: undefined,
      expoPushToken: "",
    },
  });

  return (
    <AppCtx.Provider value={{ appState, setAppState }}>
      {children}
    </AppCtx.Provider>
  );
};

export const HandieHubProviderComponent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <StoreContext>{children}</StoreContext>;
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppCtx);
  if (context === undefined) {
    throw new Error("useAppContext must be used within a StoreContext");
  }
  return context;
};

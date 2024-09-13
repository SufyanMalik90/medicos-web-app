import React, { createContext, useState, ReactNode } from "react";

// Define the shape of the context value
interface AppContextType {
  profile: any; // You can replace `any` with a more specific type if you know the shape of `profile`
  setProfile: React.Dispatch<React.SetStateAction<any>>;
  email: any; // You can replace `any` with a more specific type if you know the shape of `profile`
  setEmail: React.Dispatch<React.SetStateAction<any>>;
  update: boolean;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create the context with a default value
export const AppContext = createContext<AppContextType | null>(null);

// Define the provider component
export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<any>(null);
  const [update, setUpdate] = useState<boolean>(false);
  const [email, setEmail] = useState<any>(null);

  return (
    <AppContext.Provider value={{ profile, setProfile, update, setUpdate , email, setEmail}}>
      {children}
    </AppContext.Provider>
  );
};

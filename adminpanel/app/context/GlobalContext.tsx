"use client"
import { ClientSideAxiosInstance } from "@/utils/config";
import { useEffect, createContext, useState } from "react";
export const GlobalContext = createContext({});

export const GlobalContextProvider = ({ children }:any) => {
  const [currentUser, setCurrentUser] = useState();
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        setIsLoading(true);
        const tokenExist = localStorage.getItem("accessToken");
        console.log(tokenExist)

        if (tokenExist) {
          const res = await ClientSideAxiosInstance.get("/users/get-user-from-token/pass-token-in-header");
          console.log(res?.data)
          res && setCurrentUser(res?.data?.data?.user);
            setIsLoading(false);
        }

 
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    fetchCurrentUser();
  }, []);


  return <GlobalContext.Provider value={{ currentUser,setCurrentUser , isLoading }}>{children}</GlobalContext.Provider>;
};
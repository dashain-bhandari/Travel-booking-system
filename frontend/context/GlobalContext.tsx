"use client"
import { AxiosInstance, ClientSideAxiosInstance } from "@/utils";
import { useEffect, createContext, useState } from "react";

export const GlobalContext = createContext({});

export const GlobalContextProvider = ({ children }:any) => {
  const [currentUser, setCurrentUser] = useState();
  const [showWhatsapp, setShowWhatsapp] = useState(true);
  const [showYoutube, setShowYoutube] = useState(true);
  const [showInstagram, setShowInstagram] = useState(true);
  const [showX, setShowX] = useState(true);
  const [showFacebook, setShowFacebook] = useState(true);
  const [showLinkedin, setShowLinkedin] = useState(true);
  
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const tokenExist = localStorage.getItem("accessToken");

        if (tokenExist) {
          const res = await ClientSideAxiosInstance.get("/users/get-user-from-token/pass-token-in-header");
          console.log(res?.data)
          res && setCurrentUser(res?.data?.data?.user);
        }

 
      } catch (error) {
        console.error(error);
      }
    };
    fetchCurrentUser();
  }, []);


  return <GlobalContext.Provider value={{ currentUser,setCurrentUser }}>{children}</GlobalContext.Provider>;
};
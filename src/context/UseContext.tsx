import { getUserInfo } from "@/services/auth";
import React, { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext(undefined);
const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const handleUser = async () => {
    const userInfo = await getUserInfo();
    setUser(userInfo);
    setIsLoading(false);
  };
  useEffect(() => {
    handleUser();
  }, [isLoading]);

  return (
    <UserContext.Provider value={{ user, setUser, isLoading, setIsLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === null) {
    throw new Error("useUser must be used in UserContext");
  }
  return context;
};

export default UserProvider;

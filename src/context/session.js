import React, { createContext, useState, useContext } from "react";

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [session, setSession] = useState();

  return (
    <SessionContext.Provider value={{}}>
      {children}
    </SessionContext.Provider>
  );
};

export const useTheme = () => useContext(SessionContext);

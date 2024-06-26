import React, {createContext, useState} from "react";
export const Context = createContext();

export function ContextProvider({children}) {
  const [autorizado, setAutorizado] = useState(false);
  return (
    <Context.Provider value={{autorizado, setAutorizado}}>
      {children}
    </Context.Provider>
  )
}
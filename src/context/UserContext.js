import { createContext, useState } from "react";

export const UserContext = createContext()
 
export const UserContextProvider = ({children}) => {
 const [user, setuser] = useState({});

 
    return (
         <UserContext.Provider value={user}>
            {children}
         </UserContext.Provider>
    );
 
}
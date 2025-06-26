import React, { createContext, useEffect, useState } from 'react'
export const UserContext=createContext();
export default function UserContextProvider(props) {
    const [token, settoken] = useState(localStorage.getItem('token'))
    
    useEffect(() => {
      if(token){
        localStorage.setItem('token',token);
      }
      else{
        localStorage.removeItem('token')
      }
    
      
    }, [token])
    
  return  <UserContext.Provider value={{token, settoken}}>
       {props.children}

    </UserContext.Provider>
  
}

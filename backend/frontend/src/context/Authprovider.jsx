import React, { createContext } from 'react'
import { useState } from 'react';
import Cookies from 'js-cookie'
import { useContext } from 'react';

export const AuthContext = createContext(); // export kiye kyun ki ise hme bahar use krna hai


export const AuthProvider = ({ children }) => {
    // yeh children  woh components hai jaise leftside right side app everything. Iski madad se hm kisi bhi children me context api use kr skte hain.
    // localStorage se user data lete hain, yeh maan ke chalte hain ki user data localStorage me store hai.
    // Agar user data localStorage me nahi hai, toh yeh null return karega. 
    //Token bhi lenge 
    const initialUserState = Cookies.get("jwt") || localStorage.getItem("ChatApp"); // Cookies se user data

    //parse the use data and store it in a state
    const [authUser, setAuthUser] = useState(initialUserState ? JSON.parse(initialUserState) : undefined);

    return (
        <AuthContext.Provider value={[authUser, setAuthUser]}>
            {children}
        </AuthContext.Provider>
    );
};


export const useAuth = () => useContext(AuthContext); // useAuth hook banaya hai jo AuthContext se value ko access karega
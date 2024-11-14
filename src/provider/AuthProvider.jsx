import { createContext, useEffect, useState } from "react";
import auth from "../firebase.init";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";

export const AuthProviderContext = createContext(null)
const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const loginUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const signOutUser = () => {
        setLoading(true)
        return signOut(auth)
    }

    useEffect(() => {
        const disconnect = onAuthStateChanged(auth, (user) => {
            setLoading(false) 
            if(user && user.emailVerified ==  true){
                setCurrentUser(user)
            }else{
                signOutUser()
                setCurrentUser(null)
            }
            console.log(user)
        })
        return () => {
            disconnect();
        }
    },[])


    const authInfo = {
        createUser,
        loginUser,
        currentUser,
        signOutUser,
        loading
    }
    return (
        <AuthProviderContext.Provider value={authInfo}>
          {children}  
        </AuthProviderContext.Provider>
    );
};

export default AuthProvider;
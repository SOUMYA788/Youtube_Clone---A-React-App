import React, { createContext, useContext, useEffect, useState } from 'react'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../Firebase';

const FirebaseContext = createContext();

export const FirebaseContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)
    const signUp = (email, password) => createUserWithEmailAndPassword(auth, email, password);
    useEffect(() => {
        const subscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user)
        })
        return subscribe;
    }, [])

    const firebaseAuthValue = {
        currentUser,
        signUp
    }
    return (
        <FirebaseContext.Provider value={firebaseAuthValue}>
            {children}
        </FirebaseContext.Provider>
    )
}

export const useFirebaseAuthContext = () => useContext(FirebaseContext);

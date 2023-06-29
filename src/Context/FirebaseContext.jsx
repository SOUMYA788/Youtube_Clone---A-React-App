import React, { createContext, useContext, useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../Firebase';

const FirebaseContext = createContext();

export const FirebaseContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)

    const signUp = (email, password) => createUserWithEmailAndPassword(auth, email, password);
    const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
    const resetPasswordWithEmail = (email) => sendPasswordResetEmail(email)
    const logOut = () => auth.signOut();

    useEffect(() => {
        const subscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user)
        })
        return subscribe;
    }, [])

    const firebaseAuthValue = {
        currentUser,
        signUp,
        login,
        logOut
    }
    return (
        <FirebaseContext.Provider value={firebaseAuthValue}>
            {children}
        </FirebaseContext.Provider>
    )
}

export const useFirebaseAuthContext = () => useContext(FirebaseContext);

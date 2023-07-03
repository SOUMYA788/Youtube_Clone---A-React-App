import React, { createContext, useContext, useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, deleteUser, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../Firebase';

const FirebaseContext = createContext();

export const FirebaseContextProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(null);

    const signUp = (email, password) => createUserWithEmailAndPassword(auth, email, password);
    const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
    const resetPasswordWithEmail = (email) => sendPasswordResetEmail(auth, email);
    const logOut = () => auth.signOut();
    const deleteUserId = (currentUser) => deleteUser(auth, currentUser);

    useEffect(() => {
        const subscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user)
        })
        return subscribe;
    }, []);

    const firebaseAuthValue = {
        currentUser,
        signUp,
        login,
        logOut,
        resetPasswordWithEmail,
        deleteUserId
    };

    return (
        <FirebaseContext.Provider value={firebaseAuthValue}>{children}</FirebaseContext.Provider>
    )

}

export const useFirebaseAuthContext = () => useContext(FirebaseContext);

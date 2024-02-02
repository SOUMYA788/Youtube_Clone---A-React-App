import { createUserWithEmailAndPassword as signUpWithEmailAndPassword, deleteUser, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { validateEmail } from "../utils/varifyInputs";
import { auth } from "../Firebase";


const returnValue = (success, message, data) => {
    if (!success || !message || !data) { throw new Error("\n\nAUTH.JS - missing one of below argument\n--> success || message || data\n\n") }
    return { success, message, data }
}


/**
 * use to create a new user with email and password.
 * @param {string} email required
 * @param {string} password required
 */
export const createUserWithEmailAndPassword = async (email, password) => {
    try {
        if (!validateEmail(email)) { throw new Error("Invalid Email ID") };
        const { user } = await signUpWithEmailAndPassword(auth, email, password);
        if (!user) { throw new Error("Faild to create your account") };
        return returnValue(true, "Account Created succesfully", JSON.stringify(userCredentials.user))
    } catch (error) { return returnValue(false, "faild to login with your account", null) }
}



/**
 * use to login with existing account
 * @param {string} email required
 * @param {string} password required
 * @returns 
 */
export const loginWithEmailAndPassword = async (email, password) => {
    try {
        const validatedEmail = validateEmail(email);
        if (!validatedEmail) { throw new Error("Invalid Email") }
        const userCredentials = await signInWithEmailAndPassword(auth, email, password);
        if (!userCredentials?.user) { throw new Error("Faild to login with your account") }
        return {
            success: true,
            message: "login succesfully",
            data: JSON.stringify(userCredentials.user)
        }

    } catch (error) {
        return {
            success: false,
            message: "faild to login with your account",
            data: null,
        }
    }
}


export const logOut = async () => {
    try {
        await auth.signOut();
        return {
            success: true,
            message: "logout succesfully"
        }
    } catch (error) {
        return {
            success: false,
            message: "faild to logout",
        }
    }
}


export const getCurrentUser = () => {
    return auth.currentUser;
}
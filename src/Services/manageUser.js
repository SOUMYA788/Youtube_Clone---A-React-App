import { useEffect, useState } from "react";
import { auth } from "../Firebase";
import { updateProfile } from "firebase/auth";
import { useSelector } from "react-redux";

export const useCurrentUser = () => {
    const [currentUser, setCurrentUser] = useState(null);
    useEffect(() => {
        const subscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
        });
        return subscribe
    }, [setCurrentUser])
    return currentUser ? JSON.stringify(currentUser) : null;
}


/**
 * updateUserProfile used to update user's profile information, i.e. photo url, display name, email id, and phone number.
 * @param {string} updatedPhotoUrl update url string
 * @param {string} updatedDisplayName updated display name as string
 * @param {string} updatedEmail update email address as string
 * @param {string} updatedPhoneNumber updated phone number as string
 * @returns object contains operation result.
 */
export const updateUserProfile = async (updatedPhotoUrl, updatedDisplayName, updatedEmail, updatedPhoneNumber) => {
    try {
        const currentUser = useSelector(state => state?.authSlice?.value);

        const updatedProfile = {
            photoUrl: updatedPhotoUrl || currentUser?.photoUrl || "",
            displayName: updatedDisplayName || currentUser?.displayName || "",
            email: updatedEmail || currentUser?.email || "",
            phoneNumber: updatedPhoneNumber || currentUser?.phoneNumber || ""
        };

        await updateProfile(currentUser, {...updatedProfile})

        return{
            success:true,
            messsage:"profile updated",
            data:null
        }

    } catch (error) {
        return{
            success:false,
            messsage:"Faild to update profile",
            data:null
        }
    }
}
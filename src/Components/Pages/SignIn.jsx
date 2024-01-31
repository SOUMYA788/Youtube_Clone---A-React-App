import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFirebaseAuthContext } from "../../Context/FirebaseContext";

import { BiLock } from "react-icons/bi";

import { CustomButton, CustomInput } from "../Layouts";
import { validateEmail } from "../../utils/varifyInputs";
import { showErrorToast } from "../../utils/toastMethods";

import { BiLoader } from "react-icons/bi";
import { ONLINE_STATUS } from "../../constants";

export const SignIn = () => {

  const { signUp } = useFirebaseAuthContext()

  const [signinInfo, setSigninInfo] = useState({
    userEmail: "",
    userPassword: "",
    signInError: null
  })

  const [signInProcessing, setSignInProcessing] = useState(false)

  const navigate = useNavigate()

  const signinInfoOnChange = (e) => {
    setSigninInfo({
      ...signinInfo,
      [e.target.name]: e.target.value
    })
  }

  // a function used to set an error for sign in problems...
  const setSignInError = (errorInfo) => {
    setSigninInfo({
      ...signinInfo,
      signInError: errorInfo
    })
  }

  // function responsible to submit sign in form and create a new user...
  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      setSignInProcessing(true)
      setSignInError(null)

      const { userEmail, userPassword } = signinInfo

      const isEmailValid = validateEmail(userEmail);

      if (!isEmailValid) {
        throw new Error("Invalid Email")
      }

      // trying to signup
      const signUpDone = await signUp(userEmail, userPassword)
      if (!signUpDone) { throw new Error("Faild to Sign Up") }
      navigate("/")
      
    } catch (error) {
      setSignInError("Faild to create an account")
      showErrorToast(error.message)
    }finally{
      setSignInProcessing(false)
    }

  }

  useEffect(() => {
    if (!ONLINE_STATUS) {
      console.log(ONLINE_STATUS)
      showErrorToast("You Are Offline Now...")
      navigate("/")
    }
  }, [ONLINE_STATUS])



  return (
    <div className="w-full 300px:w-72 p-5 mx-auto flex flex-col justify-center items-center bg-slate-200 dark:bg-transparent border-2 border-slate-300 dark:border-transparent rounded-sm">

      <div className={`w-10 h-10 text-black ring-2 ring-offset-1 ring-offset-transparent rounded-full p-2 ${signinInfo.signInError ? "bg-red-500 ring-red-800" : "bg-green-500 ring-green-800"}`}>
        <BiLock className="w-full h-full text-inherit" />
      </div>

      <p className="mt-2 text-base"> {signinInfo?.signInError || "SIGN IN"} </p>

      <form onSubmit={handleSignIn} className="w-full mt-5 flex flex-col items-center justify-center gap-3">

        <CustomInput type="email" title={signinInfo.userEmail} name="userEmail" placeholder="Email ID" onChange={signinInfoOnChange} required />

        <CustomInput type="password" title={signinInfo.userPassword} name="userPassword" placeholder="Password" onChange={signinInfoOnChange} required />

        {/* onsubmit attached in form. */}
        <CustomButton type="submit" disabled={signInProcessing} className="bg-red-600 text-white uppercase w-full p-1.5 rounded-md my-2 ring ring-transparent focus:ring-red-700 hover:ring-red-700 disabled:hover:ring-transparent disabled:opacity-50 flex items-center justify-center gap-3">
          {signInProcessing ? <>
            <BiLoader className="animate-spin w-6 h-6 text-white" />
            loading...
          </> : "Sign In"}
        </CustomButton>

        <p className="dark:text-slate-400">Already have an account? <Link to="/login" className="px-1 text-right text-slate-700 font-medium hover:text-black focus:text-black dark:text-slate-300 dark:focus:text-white dark:hover:text-white outline-none border-none"> Login</Link></p>


      </form>
    </div>
  )
}

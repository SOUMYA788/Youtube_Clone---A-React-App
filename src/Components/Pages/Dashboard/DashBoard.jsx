import React, { useEffect, useState } from 'react'
import { USER_DASHBOARD_LINKS } from '../../../constants'
import { Link } from 'react-router-dom'
import { useCurrentUser } from '../../../Services/manageUser'
import { MdEmail } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { CustomButton, CustomInput } from '../../Layouts'


export const UserProfileCard = ({ setEditProfile, currentUser }) => {
  // const currentUser = useSelector(state => state?.authSlice?.value);

  return <div className={`w-full flex flex-col 600px:flex-row flex-wrap gap-3 bg-gray-100 dark:bg-slate-700 p-5 rounded-xl`}>

    <img src={currentUser?.photoURL || "/logo.svg"} alt="user" className='w-24 h-24 rounded-full bg-slate-500 p-2' />

    <div className='w-full 600px:flex-1'>

      <h2 className={`${currentUser?.uid ? 'capitalize font-semibold text-slate-800 dark:text-slate-300 text-base 300px:text-xl' : 'bg-slate-500 h-4 rounded-full animate-pulse'} my-1.5 mb-3`}>{currentUser?.displayName || currentUser?.email?.toString().split("@")[0]}</h2>

      <p className={`${currentUser?.uid ? "text-slate-700 dark:text-slate-300 300px:mt-3 text-xs 300px:text-sm" : "bg-slate-500 h-4 rounded-full animate-pulse"} my-1.5`}>
        {currentUser?.email || ""}
      </p>

      <p className={`${currentUser?.uid ? "text-slate-700 dark:text-slate-300 mt-1.5 text-xs" : "bg-slate-500 h-4 rounded-full animate-pulse"} `}>{currentUser?.phoneNumber || ""}</p>

      {
        currentUser?.uid && <div className='mt-4 flex gap-4 items-center'>

          <Link to={"/dashboard/create-channel"} className='w-fit text-xs px-2 py-1 capitalize rounded-full bg-gray-300 focus:bg-slate-800 hover:bg-slate-800 text-gray-900 hover:text-slate-300 focus:text-slate-300 dark:bg-slate-500 dark:text-slate-300  dark:focus:bg-slate-400 dark:focus:text-slate-800 outline-none border-none'>create channel</Link>

          <CustomButton className='w-fit text-xs px-2 py-1 capitalize rounded-full bg-gray-300 focus:bg-slate-800 hover:bg-slate-800 text-gray-900 hover:text-slate-300 focus:text-slate-300 dark:bg-slate-500 dark:text-slate-300  dark:focus:bg-slate-400 dark:focus:text-slate-800 outline-none border-none' onClick={(e) => {
            e.preventDefault();
            setEditProfile(true);
          }}>edit profile</CustomButton>

        </div>
      }

    </div>

  </div>
}




const UserProfileUpdateForm = ({ setEditProfile, currentUser }) => {
  // const currentUser = useSelector(state => state?.authSlice?.value);
  const [userDetails, setUserDetails] = useState({
    profileImage: currentUser?.photoURL || "/logo.svg",
    userName: currentUser?.displayName || "",
    userEmail: currentUser?.email || "",
    phoneNumber: currentUser?.phoneNumber || ""
  })

  const userDetailsOnChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    })
  }

  const updateProfile = () => {
    // profile updation code.
    // -------------
    // remove edit mode...
    setEditProfile(false);
  }

  const closeEditMode = (e) => {
    e.preventDefault();
    setEditProfile(false);
  }


  return <form className={`w-full flex flex-col 600px:flex-row flex-wrap gap-3 bg-gray-100 dark:bg-slate-700 p-5 rounded-xl`}>

    <label htmlFor='userImage'>
      <input type="file" name="profileImage" id="userImage" accept='.jpg, .png, .jpeg' className='hidden' onChange={userDetailsOnChange} />
      <img src={userDetails.profileImage} alt="user" className='w-24 h-24 rounded-full bg-slate-500 p-2' />
    </label>

    <div className='w-full flex flex-col 600px:flex-1'>

      <input type='text' name="userName" value={userDetails?.userName} onChange={userDetailsOnChange}  className={`capitalize font-semibold text-slate-800 dark:text-slate-300 text-base 300px:text-xl'  my-0.5 p-0.5 outline-none border-2 border-transparent hover:border-slate-400 focus:border-slate-400 rounded-md bg-transparent`}/>

      <input type='text' name="userEmail" value={userDetails?.userEmail} onChange={userDetailsOnChange}  className={`font-semibold text-slate-800 dark:text-slate-300 text-base 300px:text-xl' my-0.5 p-0.5 outline-none border-2 border-transparent hover:border-slate-400 focus:border-slate-400 rounded-md bg-transparent`}/>

      <input type='number' name="phoneNumber" value={userDetails?.phoneNumber} onChange={userDetailsOnChange}  className={`font-semibold text-slate-800 dark:text-slate-300 text-base 300px:text-xl' my-0.5 p-0.5 outline-none border-2 border-transparent hover:border-slate-400 focus:border-slate-400 rounded-md bg-transparent`}/>


      <div className='mt-4 flex gap-4 items-center'>

        <CustomButton className='w-fit text-xs px-2 py-1 capitalize rounded-full bg-gray-300 focus:bg-slate-800 hover:bg-slate-800 dark:bg-slate-500 dark:focus:bg-slate-400 dark:hover:bg-slate-400 text-gray-900 hover:text-slate-300 focus:text-slate-300 dark:text-slate-300 dark:focus:text-slate-800 dark:hover:text-slate-800 outline-none border-none' onClick={updateProfile}>update</CustomButton>

        <CustomButton className='w-fit text-xs px-2 py-1 capitalize rounded-full bg-red-300 focus:bg-
        red-800 hover:bg-red-800 text-gray-900 hover:text-slate-300 focus:text-slate-300 outline-none border-none' onClick={closeEditMode}>cancel</CustomButton>

      </div>

    </div>

  </form>
}




export const DashBoard = () => {
  // const currentUser = useSelector(state => state?.authSlice?.value);
  const userDetails = useSelector(state => state?.authSlice?.value);
  const [currentUser, setUserDetails] = useState({
    uid: 11223344,
    photoURL: userDetails?.photoURL || "/logo.svg",
    displayName: userDetails?.displayName || "soumya",
    email: userDetails?.email || "soumya@gmail.com",
    phoneNumber: userDetails?.phoneNumber || "1234567890"
  })

  const [editProfile, setEditProfile] = useState(false);


  return (
    // { setEditProfile, currentUser }
    <div className='w-full h-full flex flex-col relative'>

      <h2 className='mb-3 p-1 text-sm font-semibold text-slate-800 tracking-wider'>DASHBOARD</h2>
      {
        editProfile ? <UserProfileUpdateForm setEditProfile={setEditProfile} currentUser={currentUser} /> : <UserProfileCard setEditProfile={setEditProfile} currentUser={currentUser} />
      }

      {/* 
      <div className='w-full p-2 flex flex-col gap-3 mt-3'>

        {
          USER_DASHBOARD_LINKS.map(({ id, title, url }) => (
            <div key={id} className=''>
              <Link to={url} className='w-24 text-center 600px:w-fit text-xs p-2 rounded-md bg-gray-400 text-slate-800 dark:bg-slate-700 dark:text-slate-300 hover:bg-red-400 focus:bg-red-400 font-semibold uppercase tracking-wider outline-none border-2 border-transparent hover:border-red-800 focus:border-red-800 transition-colors'>
                {title}
              </Link>
            </div>
          ))
        }
      </div> */}
    </div>
  )
}
import React from 'react'

const VideoCardWrapper = ({ children, className, callingFrom, ...props }) => {
  return (
    <div className={`w-full ${callingFrom !== "video_player_page" ? "300px:w-72 600px:w-[47%] lg:w-[30%]" : ""}  bg-slate-100 dark:bg-slate-700 ring ring-slate-400 p-2 my-1 mx-auto sm:mx-0 flex flex-col gap-1 rounded-lg ${className}`} {...props}>
        {children}
    </div>
  )
}

export default VideoCardWrapper
import React, { useState, useEffect } from 'react'
// import { YoutubeAPI } from '../../Assets/YoutubeAPI'
import { Video } from "../"
import { useAppContextData } from '../../Context/AppContext'
import { YoutubeAPI } from '../../API/youtube'
import { showErrorToast } from '../../utils/toastMethods'

export const Home = () => {
  const [videos, setVideos] = useState([]);
  const [{ currentTab }] = useAppContextData();

  useEffect(() => {
    YoutubeAPI(`search?query=${currentTab === "home" && "new"}&geo=IN&type=video&upload_date=month&sort_by=date`)
      .then((data) => { setVideos(data.data) })
      .catch((error) => {
        setVideos(null);
        showErrorToast(error.message || "Faild to load videos.")
      })
  }, [currentTab])

  if(videos === null && videos !== undefined && !videos?.length > 0) return <div className="w-full h-full justify-center items-center text-red-600 font-semibold text-center capitalize text-xl mt-4"> connection error...! </div>

  return <Video videos={videos} />
}


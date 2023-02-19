import React, { useState, useEffect } from 'react'
import { YoutubeAPI } from '../../Assets/YoutubeAPI'
import Video from '../Video/Video'

const Home = ({ currentTab }) => {
  const [videos, setVideos] = useState([])
  useEffect(() => {
    YoutubeAPI(`search?query=${currentTab === "home" && "new"}&geo=IN&type=video&upload_date=month&sort_by=date`).then((data) => { setVideos(data.data) })
  }, [currentTab])
  return (

    <Video videos={videos} videoHeight="215px" />

  )
}

export default Home
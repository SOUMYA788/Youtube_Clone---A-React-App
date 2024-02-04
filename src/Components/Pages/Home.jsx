import React, { useState, useEffect } from 'react'
import { DashBoard, Video } from "../"
import { YoutubeAPI } from '../../API/youtube'

export const Home = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    YoutubeAPI(`search?query=new&geo=IN&type=video&upload_date=month&sort_by=date`)
      .then(data => setVideos(data.data))
      .catch(() => setVideos([]))
  }, [])

  return <DashBoard/>
  // <Video videos={videos} />
}


import React, { useState, useEffect } from 'react'
import { Video } from "../"
import { YoutubeAPI } from '../../API/youtube'

export const Home = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    YoutubeAPI(`search?query=new&geo=IN&type=video&upload_date=month&sort_by=date`)
      .then(data => setVideos(data.data))
      .catch(() => setVideos([]))
  }, [])

  return <Video videos={videos} />
}


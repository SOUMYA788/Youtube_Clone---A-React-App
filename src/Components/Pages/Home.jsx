import React, { useState, useEffect } from 'react'
import { Box } from '@mui/material'
import { YoutubeAPI } from '../../Assets/YoutubeAPI'
import Video from '../Video/Video'

const Home = ({ currentTab }) => {
  const [videos, setVideos] = useState([])
  useEffect(() => {
    YoutubeAPI(`search?query=${currentTab === "home" && "new"}&geo=IN&type=video&upload_date=month&sort_by=date`).then((data) => { setVideos(data.data) })
  }, [currentTab])
  console.log(videos)
  return (
    <Box sx={{
      flex: "1",
      height: "100%",
      padding: "10px"
    }}>
      <Video videos={videos} />
    </Box>
  )
}

export default Home
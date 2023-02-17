import { Box, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import "./VideoCard.css"

const VideoCard = ({ videoInfo }) => {
  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Link className='videoCard_videoLinks' to={`/video/${videoInfo.videoId}`}>
        <Box component="img" variant='img' src={videoInfo?.thumbnail[0]?.url || videoInfo?.thumbnail[1]?.url} alt={videoInfo.title} sx={{ width: "100%", height: "200px", borderRadius: "10px" }} />
        <Typography component="h2" variant='h2' sx={{
          fontSize: "1em",
          letterSpacing: "0",
          margin: "10px"
        }}>
          {videoInfo.title.slice(0, 60)}...
        </Typography>
      </Link>

      <Link className='videoCard_videoChannelLink' to={`/channel/${videoInfo.channelId}`}>
        <Box sx={{ marginRight: "10px" }}>
          <Box component="img" variant='img' src={videoInfo?.channelThumbnail[0]?.url} alt={videoInfo.title} sx={{ width: "30px", height: "30px", borderRadius: "25px" }} />
        </Box>

        <Box>
          <Typography component="p" variant='p' sx={{ fontSize: "0.8em" }}>
            {videoInfo?.channelTitle}
          </Typography>
          <Typography component="p" variant='p' sx={{ fontSize: "0.8em", margin: "5px 0" }}>
            {parseInt(videoInfo?.viewCount).toLocaleString()} Views • {videoInfo?.publishedText}
          </Typography>
        </Box>

      </Link>
    </Box>
  )
}

export default VideoCard
import { Box, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import "./VideoCard.css"

const VideoCard = ({ videoInfo }) => {
  return (
    <Box sx={{ width: "100%", height: "100%" }} title={videoInfo.title}>

      <Box width="100%">
        <Link className='videoCard_videoLinks' to={`/video/${videoInfo.videoId}`}>
          <Box component="img" variant='img' src={videoInfo?.thumbnail[0]?.url} alt={videoInfo.title} sx={{ width: "100%", objectFit: "contain", borderRadius: "10px" }} />
        </Link>
      </Box>

      <Box width="100%">

        <Link className='videoCard_videoLinks' to={`/video/${videoInfo.videoId}`}>
          <Typography component="h2" variant='h2' sx={{ fontSize: "1em", letterSpacing: "0", margin: "3% 0" }}>
            {videoInfo.title.slice(0, 30)}...
          </Typography>
        </Link>

        <Box>
          <Link className='videoCard_videoChannelLink' to={`/channel/${videoInfo.channelId}`}>
            <Box sx={{ marginRight: "10px" }}>

              {videoInfo?.channelThumbnail && <Box component="img" variant='img' src={videoInfo?.channelThumbnail[0]?.url} alt={videoInfo.title} sx={{ width: "30px", height: "30px", borderRadius: "25px" }} />}

              {videoInfo?.authorThumbnail && <Box component="img" variant='img' src={videoInfo?.authorThumbnail[0]?.url} alt={videoInfo.title} sx={{ width: "30px", height: "30px", borderRadius: "25px" }} />}

            </Box>

            <Box>
              <Typography component="p" variant='p' sx={{ fontSize: "0.6em" }}>
                {videoInfo?.channelTitle}
              </Typography>

              <Typography component="p" variant='p' sx={{ fontSize: "0.6em", margin: "3% 0" }}>
                {parseInt(videoInfo?.viewCount).toLocaleString()} Views • {videoInfo?.publishedText || videoInfo?.publishedTimeText}
              </Typography>
            </Box>
          </Link>
        </Box>

      </Box>

    </Box>
  )
}

export default VideoCard
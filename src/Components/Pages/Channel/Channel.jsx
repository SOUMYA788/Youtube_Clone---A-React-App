import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import { useParams } from 'react-router-dom'
import { YoutubeAPI } from '../../../Assets/YoutubeAPI'
import { ChannelCard, VideoCard } from '../../'
import "./Channel.css"

const Channel = () => {
  const [channelVideos, setChannelVideos] = useState([])
  const [channelData, setChannelData] = useState(null);
  const { channelId } = useParams()

  useEffect(() => {
    YoutubeAPI(`channel?id=${channelId}&sort_by=newest`).then((data) => {
      setChannelVideos(data.data);
      setChannelData(data.meta)
    })
  }, [channelId])

  if (!channelData) return ""

  const { image } = channelData;

  const channelMainContainerBoxStyle = {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column"
  }

  const channelBannerStyle = {
    width: "100%",
    height: "170px",
    backgroundColor: "black",
    objectFit: "contain"
  }

  const videoBoxStyle = {
    width: "100%",
    flex: "1",
    display: "flex",
    flexWrap: "wrap",
    flexDirection: {
      xs: "column",
      sm: "row"
    }
  }

  return (
    <Box sx={channelMainContainerBoxStyle}>
      <Box sx={channelBannerStyle} component="img" src={image?.banner[0]?.url} />
      <Box sx={{ width: "100%", height: "80px" }}>
        <ChannelCard channelCardInfo={channelData} channelCardDirection="row" channelCardLogoSize="55px" />
      </Box>
      <Box sx={videoBoxStyle}>

        {
          channelVideos.map((videoElement, indx) => (
            <Box id="channelVideoCardContainer" key={`${videoElement?.type}_${indx}`}>
              <VideoCard videoInfo={videoElement} />
            </Box>
          ))
        }

      </Box>
    </Box>
  )

}

export default Channel
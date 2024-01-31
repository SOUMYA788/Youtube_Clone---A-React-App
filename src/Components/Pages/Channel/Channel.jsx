import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import { useParams } from 'react-router-dom'
import { ChannelCard, VideoCard } from '../../'
import "./Channel.css"
import { BiLogoYoutube } from 'react-icons/bi'
import { YoutubeAPI } from '../../../API/youtube'

export const Channel = () => {
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

  const videoBoxStyle = {
    width: "100%",
    flex: "1",
    display: "flex",
    flexWrap: "wrap",
    flexDirection: {
      xs: "column",
      sm: "row"
    },
    padding: "0 10px"
  }

  const channelVideoCardContainer = {
    width: {
      xs: "80%",
      sm: "31%"
    },
    margin: {
      xs: "5px auto",
      sm: "6px"
    },
    cursor: "pointer"
  }

  return (
    <div className='w-full h-full flex flex-col'>

      {
        image?.banner[0]?.url ? <img className='w-full h-44 bg-black object-contain' src={image.banner[0].url} /> : <BiLogoYoutube className='w-7 h-7 rounded-full' />
      }

      <div className='w-full h-20 my-3 p-3'>
        <ChannelCard channelCardInfo={channelData} cardDirection="row" cardLogoStyle="w-14 h-14 mt-3" />
      </div>

      <Box sx={videoBoxStyle}>
        {
          channelVideos.map((videoElement, indx) => (
            <Box sx={channelVideoCardContainer} key={`${videoElement?.type}_${indx}`}>
              <VideoCard videoInfo={videoElement} />
            </Box>
          ))
        }
      </Box>

    </div>
  )

}

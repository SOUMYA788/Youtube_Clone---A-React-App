import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { ChannelCard,  VideoCard, VideoCardWrapper} from "../Layouts"


import { BiLogoYoutube } from 'react-icons/bi'
import { YoutubeAPI } from '../../API/youtube'
import { ONLINE_STATUS } from '../../constants'


export const Channel = () => {
  const [channelVideos, setChannelVideos] = useState([])
  const [channelData, setChannelData] = useState({});
  const { channelId } = useParams()

  useEffect(() => {
    if (ONLINE_STATUS) {
      YoutubeAPI(`channel?id=${channelId}&sort_by=newest`).then((data) => {
        setChannelVideos(data?.data);
        setChannelData(data?.meta)
      }).catch((e) => {
        setChannelVideos([]);
        setChannelData(null);
      })
    }
  }, [channelId])



  // videos may or may not available in channel, but channel data must be exists there.
  if (channelData === null) return <h2 className='text-2xl text-slate-800 dark:text-slate-400 text-center p-2'> channel does not exist now. </h2>

  channelData.channelId = channelId;

  return (
    <>
      <div className='w-full h-fit flex flex-col justify-center items-center'>

        {
          channelData?.image?.banner[0]?.url && <img className='w-full h-44 bg-black object-contain' src={channelData.image.banner[0].url} />
        }

      </div>

      <div className='w-full my-2 p-3'>
        {channelData && <ChannelCard channelCardInfo={channelData} cardDirection="flex-row" cardLogoStyle="w-14 h-14 rounded-full mr-3" callingFrom="channel_page"/>}
      </div>

      <div className='w-full flex justify-center 600px:justify-normal flex-wrap 300px:gap-3 md:gap-7'>
        {
          (channelVideos?.length > 0) && channelVideos.map((video, videoIndex) => {
            video.channelTitle = channelData?.title;
            video.channelThumbnail = channelData?.image?.banner;
            video.channelId = channelId;
            return <VideoCardWrapper key={`channel_videos_${videoIndex}`}>
              <VideoCard videoInfo={video} />
            </VideoCardWrapper>
          })
        }
      </div>
    </>
  )
}

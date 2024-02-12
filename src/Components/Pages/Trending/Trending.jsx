import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { Video, VideoCard, VideoCardWrapper } from '../../Layouts';
import { YoutubeAPI } from '../../../API/youtube';


export const Trending = () => {
  const [trendingVideos, setTrendingVideos] = useState([]);
  const { trendingId } = useParams();

  useEffect(() => {
    YoutubeAPI(`trending?type=${trendingId}`).then((data) => { setTrendingVideos(data?.data) });
  }, [trendingId])

  const tredingItems = [
    "NOW", "MUSIC", "GAMMING", "MOVIES"
  ]


  console.log(trendingVideos);

  return (
    <div className='w-full h-full p-1'>

      <div className='w-full h-28 flex flex-row items-center' >
        <img src="https://www.youtube.com/img/trending/avatar/trending.png" alt="trending_page_logo" className='w-16 h-16 rounded-full mr-4' />
        <h2 className='text-2xl'>Trending</h2>
      </div>

      <div className='w-full flex flex-row items-center gap-3'>
        {
          tredingItems.map((trendingItemsElement, indx) => (
            <NavLink className="trendingLinks" to={`/trending/${trendingItemsElement.toLowerCase()}`} key={`${trendingItemsElement}_${indx}`}>
              <p className='text-base py-1 px-4'> {trendingItemsElement} </p>
            </NavLink>
          ))
        }
      </div>

      <div className='w-full flex justify-center 600px:justify-normal flex-wrap mt-4 300px:gap-3 md:gap-7'>

        {
          trendingVideos?.length > 0 && trendingVideos.map((video, videoIndex) => (<VideoCardWrapper key={`trending_videos_${videoIndex}`}>
            <VideoCard videoInfo={video} />
          </VideoCardWrapper>
          ))
        }
      </div>
    </div>
  )
}

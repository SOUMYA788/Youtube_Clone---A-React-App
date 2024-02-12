import React, { useState, useEffect } from 'react'
// import { Video } from "../"
import { Video } from '../Layouts';
import { YoutubeAPI } from '../../API/youtube'
import { ONLINE_STATUS } from '../../constants';
import Offline from './Offline';

export const Home = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    if (ONLINE_STATUS) {
      YoutubeAPI(`search?query=new&geo=IN&type=video&upload_date=month&sort_by=date`)
        .then(data => setVideos(data.data))
        .catch(() => setVideos([]))
    }
  }, [ONLINE_STATUS])

  return <Video videos={videos} />
}


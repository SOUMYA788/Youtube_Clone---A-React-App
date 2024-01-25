import axios from "axios"
import { ENV_CONFIG } from "../envConfig";
export const YoutubeAPI = async (url) => {
  const BASE_URL = 'https://youtube-v3-alternative.p.rapidapi.com';
  const {YOUTUBE_API_KEY} = ENV_CONFIG;
  console.log(YOUTUBE_API_KEY)
  const options = {
    headers: {
      'X-RapidAPI-Key': YOUTUBE_API_KEY,
      'X-RapidAPI-Host': 'youtube-v3-alternative.p.rapidapi.com'
    }
  };
  const { data } = await axios.get(`${BASE_URL}/${url}`, options);
  return data;
}
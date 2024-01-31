import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Video } from '../'
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import { Tune } from '@mui/icons-material';
import { YoutubeAPI } from '../../API/youtube';
import { FILTER_OPTIONS } from '../../constants';

import { MdTune } from 'react-icons/md';
import {CustomButton} from '../Layouts';
import { showErrorToast } from '../../utils/toastMethods';


export const Search = () => {
  const [searchVideos, setSearchVideos] = useState([]);
  const [filterStates, setFilterStates] = useState({
    type: "video",
    duration: "medium",
    feature: [],
    upload_date: null,
    sort_by: null
  })

  const [featureFilter, setFeatureFilter] = useState([])

  const [showFilter, setShowFilter] = useState(false)
  const { searchId } = useParams();


  const filterActive = (filterItem) => {
    return (filterStates.type === filterItem || filterStates.duration === filterItem || filterStates.upload_date === filterItem || filterStates.sort_by === filterItem || filterStates.feature.includes(filterItem))
  }


  const handleFilterOptionClick = (filterHeadding, filterItem) => {
    if (filterHeadding === "features") {

      setFilterStates((prev) => {
        if (prev.feature.includes(filterItem)) {
          return ({
            ...prev,
            feature: prev.feature.filter(value => value !== filterItem)
          })
        } else {
          return ({
            ...prev,
            feature: [...prev.feature, filterItem]
          })
        }
      })
    } else {
      setFilterStates((prev) => {
        return ({ ...prev, [filterHeadding]: filterItem })
      })
    }
  }

  const setFilter = () => {
    let filterLists = Object.entries(FILTER_OPTIONS);
    return (
      filterLists.map((filterElement, indx) => {
        let filterHeadding = filterElement[0];
        let filters = filterElement[1];
        return (
          <div key={`${filterHeadding}_${indx}`} className='mx-auto px-1'>
            <h2 className='text-base'>{filterHeadding.toUpperCase()}</h2>

            <div className='mt-4'>
              {
                filters.map((filterItem, indx) => (
                  <p className={`text-base cursor-pointer p-1 my-2 text-slate-800 hover:text-black focus:text-black dark:text-slate-400 dark:hover:text-slate-200 dark:focus:text-slate-200 transition-all ${filterActive(filterItem) ? "text-white border-b border-slate-800 dark:border-slate-400" : ""}`} key={`${filterItem}_${indx}`} title={filterItem} onClick={() => handleFilterOptionClick(filterHeadding, filterItem)}> {filterItem} </p>
                ))
              }
            </div>
          </div>
        )
      })
    )
  }

  const manageFilter = () => { setShowFilter(value => !value) }

  useEffect(() => {
    const paramsCondition = [];

    for (const key in filterStates) {
      const value = filterStates[key];
      if (["channel", "playlist"].includes(filterStates.type)) {
        if (["type", "sort_by"].includes(key.toLocaleLowerCase()) && value?.length > 0) {
          paramsCondition.push(`&${key}=${value}`)
        }
      } else {
        if (value?.length > 0) {
          paramsCondition.push(`&${key}=${value}`)
        }
      }
    }

    let url = `search?query=${searchId}${paramsCondition.join("")}`;

    console.log(url);
    if (url) { YoutubeAPI(url).then((data) => { setSearchVideos(data.data) }).catch(() => showErrorToast("Server Error")) }

  }, [searchId, filterStates, featureFilter])


  const filterBoxHeaddingStyle = {
    width: "100px",
    padding: "5px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "0.2s ease",
    borderRadius: "25px",
    border: "none",
    ":hover": {
      background: "#BFBFBF"
    }
  }

  return (
    <div className='w-full h-full select-none'>
      <div className='m-2 p-2'>

        <CustomButton className='w-24 flex items-center justify-center cursor-pointer transition-all rounded-full border-none text-slate-800 dark:text-slate-400 hover:text-black focus:text-black dark:hover:text-white dark:focus:text-white outline-none' onClick={manageFilter}>
          <MdTune className='text-base mr-2' />
          <p className='text-base'>FILTER</p>
        </CustomButton>

        <div className='h-0.5 w-full bg-slate-500 my-2' />

        {
          showFilter && <div className='w-11/12 mt-5 flex justify-between overflow-x-scroll scroll-smooth gap-1'>
            {setFilter()}
          </div>
        }
      </div>
      <Video videos={searchVideos} />
    </div>
  )
}


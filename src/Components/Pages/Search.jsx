import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { YoutubeAPI } from '../../Assets/YoutubeAPI';
import { FilterOptions } from '../../Assets/FilterOptions';
import { Video } from '../'
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import { Tune } from '@mui/icons-material';

export const Search = () => {
  const [searchVideos, setSearchVideos] = useState([]);
  const [filterStates, setFilterStates] = useState({
    type: "video",
    duration: "medium",
    upload_date: null,
    sort_by: null
  })
  const [featureFilter, setFeatureFilter] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const { searchId } = useParams();

  const filterOptionsStyle = {
    fontSize: "1em",
    cursor: "pointer",
    padding: "1%",
    margin: "10px 0",
    borderBottom: "1px solid transparent"
  }

  const filterOptionSxValue = (filterItem) => {
    if (filterStates.type === filterItem || filterStates.duration === filterItem || filterStates.upload_date === filterItem || filterStates.sort_by === filterItem || featureFilter.includes(filterItem)) {
      return ({
        ...filterOptionsStyle,
        borderBottom: "1px solid #bfbfbf"
      })
    }
    else {
      return ({
        ...filterOptionsStyle
      })
    }
  }

  const handleFilterOptionClick = (filterHeadding, filterItem) => {
    if (filterHeadding === "features") {
      setFeatureFilter((prev) => {
        // if feature is available in filter, then on click of that filter option, we will remove that, if not available then we adding that...
        if (featureFilter.includes(filterItem)) {
          return (prev.filter(prevItem => prevItem !== filterItem))
        } else {
          return ([...prev, filterItem])
        }
      })
    } else {
      setFilterStates((prev) => {
        return ({ ...prev, [filterHeadding]: filterItem })
      })
    }
  }

  const setFilter = () => {
    let filterLists = Object.entries(FilterOptions);
    return (
      filterLists.map((filterElement, indx) => {
        let filterHeadding = filterElement[0];
        let filters = filterElement[1];
        return (
          <Box key={`${filterHeadding}_${indx}`} sx={{ margin: "0 auto", padding: "0 5px" }}>
            <Typography component="h2" variant='h2' sx={{ fontSize: "1em" }}>
              {filterHeadding.toUpperCase()}
            </Typography>
            <Box sx={{ margin: "15px 0 0" }}>
              {
                filters.map((filterItem, indx) => (
                  <Typography component="p" variant='p' sx={filterOptionSxValue(filterItem)} key={`${filterItem}_${indx}`} title={filterItem}
                    onClick={() => handleFilterOptionClick(filterHeadding, filterItem)}>
                    {filterItem}
                  </Typography>
                ))
              }
            </Box>
          </Box>
        )
      })
    )
  }

  const manageFilter = () => {
    if (showFilter) {
      setShowFilter(false);
    } else {
      setShowFilter(true);
    }
  }

  useEffect(() => {
    let { type, duration, upload_date, sort_by } = filterStates;

    let queryParamsCondition1 = [
      type ? `&type=${type}` : "",
      sort_by ? `&sort_by=${sort_by}` : "",
    ].filter(queryParams => queryParams !== "")

    let queryParamsCondition2 = [
      ...queryParamsCondition1,
      duration ? `&duration=${duration}` : "",
      upload_date ? `&upload_date=${upload_date}` : "",
      featureFilter.length > 0 ? `&features=${featureFilter.toLocaleString()}` : ""
    ].filter(queryParams => queryParams !== "")

    function getUrl() {
      if (filterStates.type === "channel" || filterStates.type === "playlist" || filterStates.type === "movie") {
        return (`search?query=${searchId}${queryParamsCondition1.join("")}`)
      } else {
        return (`search?query=${searchId}${queryParamsCondition2.join("")}`)
      }
    }

    let url = getUrl();

    if (url) { YoutubeAPI(url).then((data) => { setSearchVideos(data.data) }) }

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
    <Box sx={{ width: '100%', height: "100%", userSelect: "none" }}>
      <Box sx={{ margin: "1%", padding: "1%" }}>
        <Box sx={filterBoxHeaddingStyle} onClick={manageFilter}>
          <Tune sx={{ fontSize: "1em", marginRight: "10px" }} />
          <Typography component="p" variant='p' fontSize="1em">
            FILTER
          </Typography>
        </Box>
        <Box component="div" variant="div" sx={{ height: "1px", width: "100%", background: "#bfbfbf", margin: "5px 0" }} />
        {
          showFilter && <Box sx={{ width: "90%", margin: "20px auto 0", display: "flex", flexDirection: "row", justifyContent: "space-between", overflowX: "scroll", scrollBehavior: "smooth", gap: "5px" }}>
            {setFilter()}
          </Box>
        }
      </Box>
      <Video videos={searchVideos} />
    </Box>
  )
}


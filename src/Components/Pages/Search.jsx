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

  const setFilter = () => {
    let filterLists = Object.entries(FilterOptions);
    return (
      filterLists.map((filterElement, indx) => {
        console.log(filterElement);
        let filterHeadding = filterElement[0];
        let filters = filterElement[1];
        return (
          <Box key={`${filterHeadding}_${indx}`} sx={{margin:"0 auto", padding:"0 5px"}}>
            <Typography component="h2" variant='h2' sx={{ fontSize: "1em" }}>
              {filterHeadding.toUpperCase()}
            </Typography>
            <Box sx={{ margin: "15px 0 0" }}>
              {
                filters.map((filterItem, indx) => (
                  <Typography
                    component="p"
                    variant='p'
                    sx={() => {

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
                    }}
                    key={`${filterItem}_${indx}`} title={filterItem}
                    onClick={() => {
                      let key = filterHeadding;
                      let value = filterItem;
                      console.log(`key : ${key}\nvalue : ${value}`)
                      if (key === "features") {
                        setFeatureFilter((prev) => {
                          if (featureFilter.includes(filterItem)) {
                            return (prev.map((prevItem) => {
                              if (prevItem !== filterItem) {
                                return (prevItem)
                              }
                            }))
                          } else {
                            return ([...prev, value])
                          }
                        })
                      } else {
                        setFilterStates((prev) => {
                          return ({ ...prev, [key]: value })
                        })
                      }
                    }}>

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
    let type = filterStates.type && `&type=${filterStates.type}`;
    let duration = filterStates.duration && `&duration=${filterStates.duration}`;
    let uploadDate = filterStates.upload_date && `&upload_date=${filterStates.upload_date}`
    let sortBy = filterStates.sort_by && `&sort_by=${filterStates.sort_by}`
    let featureList = featureFilter.length > 0 && `&features=${featureFilter.toLocaleString()}`

    let url = null;

    if (filterStates.type === "channel" || filterStates.type === "playlist" || filterStates.type === "movie") {
      url = `search?query=${searchId}${type || ""}${sortBy || ""}`
    } else {
      url = `search?query=${searchId}${type || ""}${duration || ""}${uploadDate || ""}${sortBy || ""}${featureList || ""}`
    }

    console.log("logging url")
    console.log(url)
    console.log("logging filters")
    console.log(filterStates)


    if (url) {
      YoutubeAPI(url).then((data) => { setSearchVideos(data.data) })
    }

  }, [searchId, filterStates, featureFilter])

  console.log(searchVideos);

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
        <Box
          sx={filterBoxHeaddingStyle}
          onClick={manageFilter}>
          <Tune sx={{ fontSize: "1em", marginRight: "10px" }} />
          <Typography component="p" variant='p' fontSize="1em">
            FILTER
          </Typography>
        </Box>

        <Box component="div" variant="div" sx={{ height: "1px", width: "100%", background: "#bfbfbf", margin: "5px 0" }} />

        {
          showFilter && <Box sx={{
            width: "90%",
            margin: "20px auto 0",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            overflowX:"scroll",
            scrollBehavior:"smooth",
            gap:"5px"
          }}>
            {setFilter()}
          </Box>
        }

      </Box>

      <Video videos={searchVideos} />
    </Box>
  )
}


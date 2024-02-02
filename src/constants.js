import { AccessTimeOutlined, HomeOutlined, HomeRounded, MusicNote, MusicNoteOutlined, Restore, RestoreOutlined, SlideshowRounded, Subscriptions, SubscriptionsOutlined, VideoLibrary, VideoLibraryOutlined, WhatshotOutlined, WhatshotRounded } from "@mui/icons-material"
import { FashionAndBuityIcon, FashionAndBuityIcon_Active, GamingIcon, GamingIcon_Active, HotspotIcon, HotspotIcon_Active, LearningIcon, LearningIcon_Active, MoviesIcon, MoviesIcon_Active, NewsIcon, NewsIcon_Active, ShortsIcon, ShortsIcon_Active, SportsIcon, SportsIcon_Active } from "./Assets/Icons"

export const SIDE_NAV_MAIN_LINKS = [
    {
        "icon": HomeOutlined,
        "active_icon": HomeRounded,
        "name": "home"
    },
    {
        "icon": ShortsIcon,
        "active_icon": ShortsIcon_Active,
        "name": "shorts"
    }
]

export const SIDE_NAV_USER_LINKS = [
    {
        "icon": SubscriptionsOutlined,
        "active_icon": Subscriptions,
        "name": "subscription"
    },
    {
        "icon": VideoLibraryOutlined,
        "active_icon": VideoLibrary,
        "name": "library"
    },
    {
        "icon": Restore,
        "active_icon": RestoreOutlined,
        "name": "history"
    },
    {
        "icon": SlideshowRounded,
        "active_icon": SlideshowRounded,
        "name": "Your Videos"
    },
    {
        "icon": AccessTimeOutlined,
        "name": "Watch Later"
    },
]

export const USER_DASHBOARD_LINKS =[
    {
        id:"user_dashboard_link_01",
        title:"watch list",
        url:"/dashboard/watchlist",
    },
    {
        id:"user_dashboard_link_02",
        title:"uploads",
        url:"/dashboard/uploads",
    },
    {
        id:"user_dashboard_link_03",
        title:"playlists",
        url:"/dashboard/playlists",
    },
    {
        id:"user_dashboard_link_04",
        title:"history",
        url:"/dashboard/history",
    },
]

export const VIDEO_CATEGORY_LINKS = [
    {
        "icon": WhatshotOutlined,
        "active_icon": WhatshotRounded,
        "name": "Trending"
    },
    {
        "icon": MusicNoteOutlined,
        "active_icon": MusicNote,
        "name": `Music`
    },
    {
        "icon": MoviesIcon,
        "active_icon": MoviesIcon_Active,
        "name": "Movies"
    },
    {
        "icon": HotspotIcon,
        "active_icon": HotspotIcon_Active,
        "name": "Live"
    },
    {
        "icon": GamingIcon,
        "active_icon": GamingIcon_Active,
        "name": "Gamming"
    },
    {
        "icon": NewsIcon,
        "active_icon": NewsIcon_Active,
        "name": "News"
    },
    {
        "icon": SportsIcon,
        "active_icon": SportsIcon_Active,
        "name": "Sports"
    },
    {
        "icon": LearningIcon,
        "active_icon": LearningIcon_Active,
        "name": "Learning"
    },
    {
        "icon": FashionAndBuityIcon,
        "active_icon": FashionAndBuityIcon_Active,
        "name": "Fashion & Buity"
    },
]

export const FILTER_OPTIONS = {
    "type": [
      "video",
      "channel",
      "playlist",
      "flim"
    ],
    "duration": [
      "short",
      "medium",
      "long"
    ],
    "features": [
      "Live",
      "HD",
      "subtitles",
      "CCommons",
      "3D",
      "purchased",
      "4K",
      "360",
      "Location",
      "HDR",
      "VR180"
    ],
    "upload date": [
      "hour",
      "today",
      "week",
      "month",
      "year"
    ],
    "sort by": [
      "relevance",
      "rating",
      "date",
      "views"
    ]
  }

export const ONLINE_STATUS = window.navigator.onLine;

export const OFFLINE_ALART_MESSAGE = "You Are Offline Now..."
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
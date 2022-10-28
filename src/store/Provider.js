import React, { useState } from 'react';
import { createContext } from 'react';
import {
    EmbedIcon,
    SendFrendIcon,
    ShareFacebookIcon,
    ShareWhatsAppIcon,
    CopyLinkIcon,
    ShareTwitterIcon,
    ShareLinkedlnIcon,
    ShareTelegramIcon,
    ShareEmailIcon,
    ShareLineIcon,
    SharePinterestIcon,
    SmallMessageIcon,
    SmallFlagIcon,
    SmallBlockIcon,
} from '~/components/icons/Icons';

const HookContext = createContext();

const Global = ({ children }) => {
    const [mutedGlobal, setMutedGlobal] = useState(true);
    const [volumeValueGlobal, setVolumeValueGlobal] = useState(1);
    const [lessSideBar, setLessSideBar] = useState(false);
    const [largeHeader, setLargeHeader] = useState(false);
    const [lessDefaultLayout, setlessDefaultLayout] = useState(false);
    const [marginContentDefault, setmarginContentDefault] = useState(true);

    const [showComment, setShowComment] = useState(false);

    const [currentVideo, setcurrentVideo] = useState({});
    const [currentListVideo, setcurrentListVideo] = useState([]);

    const [currentUser, setcurrentUser] = useState(null);
    const [login, setLogin] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setshowRegister] = useState(false);

    const SHARE_LIST = [
        {
            icon: <EmbedIcon />,
            title: 'Embed',
        },
        {
            icon: <SendFrendIcon />,
            title: 'Send to friends',
        },
        {
            icon: <ShareFacebookIcon />,
            title: 'Share to Facebook',
        },
        {
            icon: <ShareWhatsAppIcon />,
            title: 'Share to WhatsApp',
        },
        {
            icon: <CopyLinkIcon />,
            title: 'Copy link',
        },
        {
            icon: <ShareTwitterIcon />,
            title: 'Share to Twitter',
        },
        {
            icon: <ShareLinkedlnIcon />,
            title: 'Share to Linkedln',
        },
        {
            icon: <ShareTelegramIcon />,
            title: 'Share to Telegram',
        },
        {
            icon: <ShareEmailIcon />,
            title: 'Share to Email',
        },
        {
            icon: <ShareLineIcon />,
            title: 'Share to Line',
        },
        {
            icon: <SharePinterestIcon />,
            title: 'Share to Pinterest',
        },
    ];

    const EVALUTE_LIST = [
        {
            icon: <SmallMessageIcon />,
            title: 'Send message',
        },
        {
            icon: <SmallFlagIcon />,
            title: 'Report',
            separate: true,
        },
        {
            icon: <SmallBlockIcon />,
            title: 'Block',
            separate: true,
        },
    ];

    const handleChangeVideo = (list = [], type) => {
        let leng = list.length;
        for (let i = 0; i < leng; i++) {
            if (currentVideo.id === list[i].id) {
                if (type === 'next') {
                    if (i === leng - 1) {
                        setcurrentVideo(list[leng - 1]);
                    } else setcurrentVideo(list[i + 1]);
                }
                if (type === 'prev') {
                    if (i === 0) {
                        setcurrentVideo(list[0]);
                    } else setcurrentVideo(list[i - 1]);
                }
            }
        }
    };

    const value = {
        // -------------------------------------------list--------------------------------------------
        //Share list action
        SHARE_LIST,

        // Evalute list
        EVALUTE_LIST,

        //----------------------------------------------state-----------------------------------------
        //mute all video
        mutedGlobal,
        setMutedGlobal,

        // volume all video
        volumeValueGlobal,
        setVolumeValueGlobal,

        // turn-left sidebar
        lessSideBar,
        setLessSideBar,

        // header no padding()
        largeHeader,
        setLargeHeader,

        // set default layout larger
        lessDefaultLayout,
        setlessDefaultLayout,

        //set margin content fit with sidebar
        marginContentDefault,
        setmarginContentDefault,

        //show commentVideo componnent
        showComment,
        setShowComment,

        //current video
        currentVideo,
        setcurrentVideo,

        //current list
        currentListVideo,
        setcurrentListVideo,

        //login
        currentUser,
        setcurrentUser,
        login,
        setLogin,
        showLogin,
        setShowLogin,
        showRegister,
        setshowRegister,

        // ----------------------------------function--------------------------------------------
        handleChangeVideo,
    };

    return <HookContext.Provider value={value}>{children}</HookContext.Provider>;
};

export { HookContext, Global };

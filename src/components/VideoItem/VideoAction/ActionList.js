import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './VideoAction.module.scss';
import Button from '~/Button/Button';
import {
    HeartIcon,
    CommentIcon,
    ShareIcon,
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
} from '~/components/icons/Icons';

import ShareMenu from '~/components/Popper/ShareActionMenu/ShareMenu';
import { useHook } from '~/hooks/useHook';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const ActionList = ({ item, currentPage }) => {
    const { SHARE_LIST, currentUser, setShowLogin } = useHook();

    const [like, setLike] = useState(false);
    const [style, setStyle] = useState({});

    useEffect(() => {
        if (like == true) {
            setStyle({ color: '#fe2c55' });
        } else {
            setStyle({ color: 'currentColor' });
        }
    }, [like]);

    return (
        <div className={cx('action-list-wrapper')}>
            <Button
                circle
                topIcon={<HeartIcon />}
                onClick={() => {
                    setLike(!like);
                }}
                style={style}
            >
                {item.likes_count}
            </Button>
            {!!currentUser ? (
                <Link to={`@${item.user.nickname}/${item.id}/suggest/${currentPage}`}>
                    <Button circle topIcon={<CommentIcon />}>
                        {item.comments_count}
                    </Button>
                </Link>
            ) : (
                <Button circle topIcon={<CommentIcon />} onClick={() => setShowLogin(true)}>
                    {item.comments_count}
                </Button>
            )}
            <ShareMenu items={SHARE_LIST} footer>
                <Button circle topIcon={<ShareIcon />}>
                    {item.shares_count}
                </Button>
            </ShareMenu>
            {/* <Button circle topIcon={<ShareIcon />}>
                12
            </Button> */}
        </div>
    );
};

export default ActionList;

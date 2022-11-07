import React, { useEffect, useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import styles from './ShareActionMenu.module.scss';

import ShareActionItem from './ShareActionItem';
import Footer from './Footer';

const cx = classNames.bind(styles);

const ShareMenu = ({ children, items = [], footer = false }) => {
    const [moreAction, setMoreAction] = useState(false);
    const [sumOfActiom, setsumOfActiom] = useState(5);

    const renderItems = () => {
        return items.slice(0, sumOfActiom).map((item, index) => {
            return <ShareActionItem key={index} item={item} />;
        });
    };

    const renderResult = (attrs) => (
        <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
            <PopperWrapper className={cx('menu-popper')}>
                <div className={cx('menu-body')}>{renderItems()}</div>
                {footer && !moreAction && <Footer onClick={(e) => setMoreAction(true)} />}
            </PopperWrapper>
        </div>
    );

    const handleResetMenu = () => {
        setsumOfActiom(5);
        setMoreAction(false);
    };

    useEffect(() => {
        if (moreAction === true) {
            setsumOfActiom(items.length);
        } else {
            setsumOfActiom(5);
        }
    }, [moreAction]);

    return (
        <Tippy
            // visible
            offset={[-25, 0]}
            interactive
            delay={[0, 100]}
            placement="top-start"
            // hideOnClick={hideOnClick} thêm logic sau
            onHide={handleResetMenu}
            render={renderResult}
        >
            {children}
        </Tippy>
    );
};

export default ShareMenu;

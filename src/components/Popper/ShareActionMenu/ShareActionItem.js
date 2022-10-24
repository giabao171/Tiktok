import React from 'react';

import classNames from 'classnames/bind';
import styles from './ShareActionMenu.module.scss';
import Button from '~/Button/Button';

const cx = classNames.bind(styles);

const ShareActionItem = ({ item }) => {
    return (
        <div>
            <Button action leftIcon={item.icon}>
                {item.title}
            </Button>
        </div>
    );
};

export default ShareActionItem;

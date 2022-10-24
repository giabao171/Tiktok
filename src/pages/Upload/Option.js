import React from 'react';
import classNames from 'classnames/bind';
import styles from './Upload.module.scss';
import { MoreDownIcon } from '~/components/icons/Icons';

import Tippy from '@tippyjs/react/headless';

const cx = classNames.bind(styles);

const Option = ({ option, setOption }) => {
    return (
        <div className={cx('option-wrapper')}>
            <Tippy
                trigger="click"
                placement="bottom"
                interactive
                render={(attrs) => (
                    <div className={cx('menu-option')}>
                        <div
                            className={option === 'Public' ? cx('option-poper', 'active') : cx('option-poper')}
                            onClick={() => setOption('Public')}
                        >
                            <span>Public</span>
                        </div>
                        <div
                            className={option === 'Friend' ? cx('option-poper', 'active') : cx('option-poper')}
                            onClick={() => setOption('Friend')}
                        >
                            <span>Friend</span>
                        </div>
                        <div
                            className={option === 'Private' ? cx('option-poper', 'active') : cx('option-poper')}
                            onClick={() => setOption('Private')}
                        >
                            <span>Private</span>
                        </div>
                    </div>
                )}
            >
                <p className={cx('option-ing')}>
                    {option}
                    <span>
                        <MoreDownIcon />
                    </span>
                </p>
            </Tippy>
        </div>
    );
};

export default Option;

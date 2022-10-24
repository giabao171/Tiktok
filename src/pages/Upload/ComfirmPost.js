import React from 'react';
import classNames from 'classnames/bind';
import styles from './Upload.module.scss';
import { useHook } from '~/hooks/useHook';

import { useNavigate } from 'react-router-dom';
import config from '~/configs';
const cx = classNames.bind(styles);

const ComfirmPost = ({ confrimList, posted, setPosted, replaceFile, setConfrimModal }) => {
    const { currentUser } = useHook();

    const navigate = useNavigate();

    const toProfile = () => {
        navigate(`${config.routes.home}@${currentUser?.data.nickname}`);
        setPosted(false);
    };

    return (
        <div className={cx('overlay')}>
            <div className={cx('arlet-change-file')}>
                <div className={cx('confrim-replace')}>
                    <div className={cx('arlet-title')}>{confrimList.confrim_title}</div>
                    <div className={cx('arlet-desc')}>{confrimList.confrim_desc}</div>
                </div>
                <div
                    className={cx('replace', 'op')}
                    onClick={() => {
                        replaceFile();
                        setPosted(false);
                    }}
                >
                    {confrimList.option1}
                </div>

                {posted ? (
                    <div className={cx('continue-edit', 'op')} onClick={toProfile}>
                        {confrimList.option2}
                    </div>
                ) : (
                    <div
                        className={cx('continue-edit', 'op')}
                        onClick={() => {
                            setConfrimModal(false);
                            setPosted(false);
                        }}
                    >
                        {confrimList.option2}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ComfirmPost;

import React from 'react';
import classNames from 'classnames/bind';
import styles from './Hastag.module.scss';
import { HastagIconBorder } from '../icons/Icons';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faItunesNote } from '@fortawesome/free-brands-svg-icons';

const cx = classNames.bind(styles);

const Hastag = ({ border = false, music = false, hastg = false, className, children, to = '/hastag' }) => {
    let Comp = 'Link';

    const classes = cx('wrapper', {
        [className]: className,
        border,
        music,
        hastg,
    });

    return (
        <div className={classes}>
            <Link to={to} className={cx('content')}>
                {/* <strong className={cx('icon')}>
                    {border && <HastagIconBorder />}
                    {music && <FontAwesomeIcon icon={faItunesNote} />}
                </strong> */}
                {border && (
                    <strong className={cx('icon')}>
                        <HastagIconBorder />
                    </strong>
                )}
                {music && (
                    <strong className={cx('icon')}>
                        <FontAwesomeIcon icon={faItunesNote} />
                    </strong>
                )}
                <strong className={cx('title')}>
                    {!border && !music && `#`}
                    {children}
                </strong>
            </Link>
        </div>
    );
};

export default Hastag;

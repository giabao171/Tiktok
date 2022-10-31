import React from 'react';
import classNames from 'classnames/bind';
import styles from './SuggestAcounts.module.scss';
import Image from '~/components/images/Image';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';
import AcountPreview from './AcountPreview';
import config from '~/configs';

const cx = classNames.bind(styles);

const AcountItem = ({ onTippy, prop }) => {
    const renderPreview = (props) => {
        return (
            <div tabIndex="-1" {...props}>
                <PopperWrapper>
                    <AcountPreview propSuggest={prop} />
                </PopperWrapper>
            </div>
        );
    };

    return (
        <div>
            {onTippy ? (
                <Tippy
                    interactive
                    delay={[800, 0]}
                    render={renderPreview}
                    placement="bottom"
                    offset={[-20, 0]}
                    zIndex="9999999"
                >
                    <Link to={`/@${prop.nickname}`} className={cx('acount-wrapper')}>
                        <Image className={cx('avatar')} src={prop.avatar} alt={prop.nickname} />
                        <div className={cx('info')}>
                            <div className={cx('name')}>
                                <h4>{prop.nickname}</h4>
                                {prop.tick && <FontAwesomeIcon className={cx('check-icon')} icon={faCheckCircle} />}
                            </div>
                            <p className={cx('usename')}>{prop.first_name + ` ` + prop.last_name}</p>
                        </div>
                    </Link>
                </Tippy>
            ) : (
                <Link to={`/@${prop.nickname}`} className={cx('acount-wrapper')}>
                    <Image className={cx('avatar')} src={prop.avatar} alt={prop.nickname} />
                    <div className={cx('info')}>
                        <div className={cx('name')}>
                            <h4>{prop.nickname}</h4>
                            {prop.tick && <FontAwesomeIcon className={cx('check-icon')} icon={faCheckCircle} />}
                        </div>
                        <p className={cx('usename')}>{prop.first_name + ` ` + prop.last_name}</p>
                    </div>
                </Link>
            )}
        </div>
    );
};

export default AcountItem;

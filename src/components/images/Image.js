import React, { forwardRef, useState } from 'react';
import images from '~/assets/images';
import PropTypes from 'prop-types';

import styles from './image.module.scss';
import classNames from 'classnames/bind';

const Image = forwardRef(
    ({ className, src, alt, onMouseEnter, onMouseLeave, fallback: customFallBack = images.noImage, ...props }, ref) => {
        const [fallBack, setFallBack] = useState('');
        const handelError = () => {
            setFallBack(customFallBack);
        };

        return (
            <img
                className={classNames(styles.wrapper, className)}
                ref={ref}
                src={fallBack || src}
                alt={alt}
                {...props}
                onError={handelError}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            />
        );
    },
);

Image.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    className: PropTypes.string,
    // ref: PropTypes.string,
    fallBack: PropTypes.string,
};

export default Image;

import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './SuggestAcounts.module.scss';
import * as suggestAcountsService from '~/services/SuggestAcountService';
import AcountItem from './AcountItem';
import PropTypes from 'prop-types';
const cx = classNames.bind(styles);

const SuggestAcounts = ({ label, onTippy = false }) => {
    const [suggestAccountList, setSuggestAccountList] = useState([]);
    const [moreSuggestAcc, setmoreSuggestAcc] = useState(false);

    // useEffect(() => {
    //     const fetch = async () => {
    //         try {
    //             const result = await suggestAcountsService.suggestAcount(1);
    //             setSuggestAccountList(result);
    //         } catch (error) {
    //             setSuggestAccountList([]);
    //         }
    //     };

    //     fetch();
    // }, []);

    useEffect(() => {
        if (moreSuggestAcc) {
            let i = 2;
            while (i <= 5) {
                const fetch = async () => {
                    try {
                        const result = await suggestAcountsService.suggestAcount(i);
                        // setSuggestAccountList(result);
                        setSuggestAccountList((prev = []) => [...prev, ...result]);
                    } catch (error) {
                        // setSuggestAccountList([]);
                    }
                };

                fetch();
                i++;
                console.log(i);
            }
        } else {
            const fetch = async () => {
                try {
                    const result = await suggestAcountsService.suggestAcount(1);
                    setSuggestAccountList(result);
                } catch (error) {
                    setSuggestAccountList([]);
                }
            };

            fetch();
        }
    }, [moreSuggestAcc]);

    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>{label}</p>

            {suggestAccountList.map((acc, index) => (
                <AcountItem key={acc.id} prop={acc} onTippy={onTippy} />
            ))}

            {/* <AcountItem onTippy={onTippy} />
            <AcountItem onTippy={onTippy} />
            <AcountItem onTippy={onTippy} />
            <AcountItem onTippy={onTippy} />
            <AcountItem onTippy={onTippy} /> */}
            <p className={cx('more-btn')} onClick={() => setmoreSuggestAcc(!moreSuggestAcc)}>
                {!moreSuggestAcc ? `See all` : `See less`}
            </p>
        </div>
    );
};

SuggestAcounts.propTypes = {
    label: PropTypes.string.isRequired,
    onTippy: PropTypes.bool,
};

export default SuggestAcounts;

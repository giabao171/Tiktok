import TimeAgo from 'javascript-time-ago';
import ReactTimeAgo from 'react-time-ago';

import en from 'javascript-time-ago/locale/en.json';
import ru from 'javascript-time-ago/locale/ru.json';
import { round } from 'javascript-time-ago/steps';
TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

export const DateConvert = (day) => {
    const customLabels = {
        now: {
            now: {
                current: 'now',
                future: 'in a moment',
                past: 'just now',
            },
        },

        second: {
            past: {
                one: 'just now',
                other: 'just now',
            },
            future: {
                one: '{0}second later',
                other: '{0}second later',
            },
        },

        minute: {
            past: {
                one: 'just now',
                other: '{0}min later',
            },
            future: {
                one: '{0}minute later',
                other: '{0}minute later',
            },
        },

        hour: {
            past: {
                one: '{0}h ago',
                other: '{0}h ago',
            },
            future: {
                one: '{0}h later',
                other: '{0}h later',
            },
        },

        day: {
            past: {
                one: '{0}d ago',
                other: '{0}d ago',
            },
            future: {
                one: '{0}d later',
                other: '{0}d later',
            },
        },

        week: {
            past: {
                one: '{0}w ago',
                other: '{0}w ago',
            },
            future: {
                one: '{0}w later',
                other: '{0}w later',
            },
        },
    };

    const oneMonth = 2592000000;

    TimeAgo.addLabels('en', 'custom', customLabels);

    const customStyle = {
        steps: round,
        labels: 'custom',
    };

    return Number(Date.now()) - Number(new Date(day)) < oneMonth ? (
        <ReactTimeAgo date={Number(new Date(day))} locale="en-US" timeStyle={customStyle} />
    ) : (
        `${new Date(day).getMonth() + 1}-${new Date(day).getDate()}`
    );
};

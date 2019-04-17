'use strict'; // eslint-disable-line

import { Hf } from 'hyperflow';

export default Hf.Event.create({
    onEvents: [
        `switch-theme`,
        `switch-theme-shade`,
        `pause-moving-wave`,
        `play-moving-wave`
    ],
    doEvents: [
        `update-theme`,
        `pause-moving-wave`,
        `play-moving-wave`
    ]
});

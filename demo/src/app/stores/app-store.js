'use strict'; // eslint-disable-line

import { Hf } from 'hyperflow';

import DefaultTheme from '../../themes/default-theme';

import EVENT from '../events/app-event';

const AppStore = Hf.Store.augment({
    state: {
        shade: {
            value: `light`,
            oneOf: [ `light`, `dark` ]
        },
        Theme: {
            value: DefaultTheme
        },
        pauseMovingWave: false
    },
    setup (done) {
        const store = this;

        store.incoming(EVENT.DO.UPDATE_THEME).handle((updateTheme) => {
            store.reconfig(updateTheme);
        });

        store.incoming(EVENT.DO.PAUSE_MOVING_WAVE).handle(() => {
            store.reduce({
                pauseMovingWave: true
            });
        });
        store.incoming(EVENT.DO.PLAY_MOVING_WAVE).handle(() => {
            store.reduce({
                pauseMovingWave: false
            });
        });

        done();
    }
});
export default AppStore;

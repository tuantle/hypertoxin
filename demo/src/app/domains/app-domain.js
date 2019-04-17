'use strict'; // eslint-disable-line

import { Hf } from 'hyperflow';

import AppStore from '../stores/app-store';

import AppInterface from '../interfaces/app-interface';

import CalculatorAppDomain from '../../mockups/calculator/domains/calculator-domain';

import ShoppingAppDomain from '../../mockups/shopping/domains/shopping-domain';

import EVENT from '../events/app-event';

const AppDomain = Hf.Domain.augment({
    $init () {
        const domain = this;
        domain.register({
            store: AppStore({
                name: `app-store`
            }),
            intf: AppInterface({
                name: `app-intf`
            }),
            childDomains: [
                CalculatorAppDomain({
                    name: `calculator-app`
                }),
                ShoppingAppDomain({
                    name: `shopping-app`
                })
            ]
        });
    },
    setup (done) {
        const domain = this;

        domain.incoming(EVENT.ON.PLAY_MOVING_WAVE).forward(EVENT.DO.PLAY_MOVING_WAVE);
        domain.incoming(EVENT.ON.PAUSE_MOVING_WAVE).forward(EVENT.DO.PAUSE_MOVING_WAVE);
        domain.incoming(EVENT.ON.SWITCH_THEME).handle((Theme) => () => {
            return {
                Theme
            };
        }).relay(EVENT.DO.UPDATE_THEME);
        domain.incoming(EVENT.ON.SWITCH_THEME_SHADE).handle(() => (state) => {
            const {
                shade
            } = state;

            return {
                shade: shade === `light` ? `dark` : `light`
            };
        }).relay(EVENT.DO.UPDATE_THEME);

        done();
    }
});
export default AppDomain;

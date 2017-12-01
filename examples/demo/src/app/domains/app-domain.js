/**
 * Copyright 2016-present Tuan Le.
 *
 * Licensed under the MIT License.
 * You may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://opensource.org/licenses/mit-license.html
 *
 * Unless = required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 *------------------------------------------------------------------------
 *
 * @module AppDomain
 * @description - Hypertoxin demo client-native app entry domain.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 *------------------------------------------------------------------------
 */
'use strict'; // eslint-disable-line

import { Hf } from 'hyperflow';

import AppStore from '../stores/app-store';

import AppViewInterface from '../interfaces/app-view-interface';

import ViewDomain from '../../components/domains/view-domain';

import ButtonDomain from '../../components/domains/button-domain';

import TextDomain from '../../components/domains/text-domain';

import FieldDomain from '../../components/domains/field-domain';

import EVENT from '../events/app-event';

const AppDomain = Hf.Domain.augment({
    $init: function $init () {
        const domain = this;
        domain.register({
            store: AppStore({
                name: `app-store`
            }),
            intf: AppViewInterface({
                name: `app-view`
            }),
            childDomains: [
                ViewDomain({
                    name: `view`
                }),
                ButtonDomain({
                    name: `button`
                }),
                TextDomain({
                    name: `text`
                }),
                FieldDomain({
                    name: `field`
                })
            ]
        });
    },
    setup: function setup (done) {
        const domain = this;

        domain.incoming(EVENT.ON.SWITCH_THEME).handle(() => {
            return function mutateTheme (state) {
                const {
                    navigationStackRefreshToggle,
                    shade
                } = state;

                return {
                    navigationStackRefreshToggle: !navigationStackRefreshToggle,
                    shade: shade === `light` ? `dark` : `light`
                };
            };
        }).relay(EVENT.DO.MUTATE_THEME);

        done();
    }
});
export default AppDomain;

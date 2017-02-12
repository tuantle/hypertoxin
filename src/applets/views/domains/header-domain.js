/**
 * Copyright 2016-present Tuan Le.
 *
 * Licensed under the MIT License.
 * You may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://opensource.org/licenses/mit-license.html
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 *------------------------------------------------------------------------
 *
 * @module HeaderDomain
 * @description - Header applet domain.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 *------------------------------------------------------------------------
 */
'use strict'; // eslint-disable-line

import { Hf } from 'hyperflow';

import HeaderStore from '../stores/header-store';

import HeaderInterface from '../interfaces/header-interface';

import EVENT from '../events/header-event';

const HeaderDomain = Hf.Domain.augment({
    $init: function $init () {
        const domain = this;
        domain.register({
            store: HeaderStore({
                name: `header-store`
            }),
            intf: HeaderInterface({
                name: domain.name
            })
        });
    },
    setup: function setup (done) {
        const domain = this;

        domain.incoming(EVENT.ON.UPDATE_MINIMIZATION).forward(EVENT.DO.MUTATE_MINIMIZATION);

        done();
    }
});
export default HeaderDomain;

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
 * @module ViewDomain
 * @description - Hypertoxin demo client-native view domain.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 *------------------------------------------------------------------------
 */
'use strict'; // eslint-disable-line

import { Hf } from 'hyperflow';

import ViewStore from '../stores/view-store';

import ViewViewInterface from '../interfaces/view-view-interface';

import EVENT from '../events/view-event';

const ViewDomain = Hf.Domain.augment({
    $init: function $init () {
        const domain = this;
        domain.register({
            store: ViewStore({
                name: `view-store`
            }),
            intf: ViewViewInterface({
                name: `view-view`
            })
        });
    },
    setup: function setup (done) {
        const domain = this;

        domain.incoming(EVENT.ON.CHANGE_HEADER_SIZE).forward(EVENT.DO.MUTATE_HEADER_SIZE);

        done();
    }
});
export default ViewDomain;

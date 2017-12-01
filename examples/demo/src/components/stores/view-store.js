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
 * @module ViewStore
 * @description - Hypertoxin demo client-native view store.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 *------------------------------------------------------------------------
 */
'use strict'; // eslint-disable-line

import { Hf } from 'hyperflow';

import EVENT from '../events/view-event';

const ViewStore = Hf.Store.augment({
    state: {
        navigationStackRefreshToggle: {
            value: false
        }
    },
    setup: function setup (done) {
        const store = this;
        store.incoming(EVENT.DO.RESET).handle(() => {
            store.reduce({
                navigationStackRefreshToggle: false
            }, {
                suppressMutationEvent: true
            });
        });
        done();
    }
});
export default ViewStore;

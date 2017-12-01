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
 * @module ButtonDomain
 * @description - Hypertoxin demo client-native button domain.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 *------------------------------------------------------------------------
 */
'use strict'; // eslint-disable-line

import { Hf } from 'hyperflow';

import ButtonStore from '../stores/button-store';

import ButtonViewInterface from '../interfaces/button-view-interface';

import EVENT from '../events/button-event';

const ButtonDomain = Hf.Domain.augment({
    $init: function $init () {
        const domain = this;
        domain.register({
            store: ButtonStore({
                name: `button-store`
            }),
            intf: ButtonViewInterface({
                name: `button-view`
            })
        });
    },
    setup: function setup (done) {
        done();
    }
});
export default ButtonDomain;

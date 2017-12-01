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
 * @module FieldDomain
 * @description - Hypertoxin demo client-native field domain.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 *------------------------------------------------------------------------
 */
'use strict'; // eslint-disable-line

import { Hf } from 'hyperflow';

import FieldStore from '../stores/field-store';

import FieldViewInterface from '../interfaces/field-view-interface';

import EVENT from '../events/field-event';

const FieldDomain = Hf.Domain.augment({
    $init: function $init () {
        const domain = this;
        domain.register({
            store: FieldStore({
                name: `field-store`
            }),
            intf: FieldViewInterface({
                name: `field-view`
            })
        });
    },
    setup: function setup (done) {
        done();
    }
});
export default FieldDomain;

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
 * @module TextFieldDomain
 * @description - Text field applet domain.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 *------------------------------------------------------------------------
 */
'use strict'; // eslint-disable-line

import { Hf } from 'hyperflow';

import TextFieldStore from '../stores/text-field-store';

import TextFieldInterface from '../interfaces/text-field-interface';

import EVENT from '../events/text-field-event';

const TextFieldDomain = Hf.Domain.augment({
    $init: function $init () {
        const domain = this;
        domain.register({
            store: TextFieldStore({
                name: `text-field-store`
            }),
            intf: TextFieldInterface({
                name: domain.name
            })
        });
    },
    setup: function setup (done) {
        const domain = this;
        done();
    }
});
export default TextFieldDomain;

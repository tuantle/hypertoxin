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
 * @module FieldStore
 * @description - Field applet store.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 *------------------------------------------------------------------------
 */
'use strict'; // eslint-disable-line

import { Hf } from 'hyperflow';

import EVENT from '../events/field-event';

const FieldStore = Hf.Store.augment({
    state: {
        fieldInput: {
            value: {
                focused: false,
                validated: true,
                valueChanged: false,
                width: 0,
                height: 0,
                value: ``,
                status: ``
            },
            stronglyTyped: true
        }
    },
    setup: function setup (done) {
        const store = this;

        store.incoming(EVENT.DO.MUTATE_FIELD_INPUT_FOCUS).handle((focused) => {
            store.reduce({
                fieldInput: {
                    focused
                }
            });
        });
        store.incoming(EVENT.DO.MUTATE_FIELD_INPUT_VALIDATION).handle((validation) => {
            store.reduce({
                fieldInput: {
                    ...validation
                }
            });
        });
        store.incoming(EVENT.DO.MUTATE_FIELD_INPUT_WIDTH).handle((width) => {
            store.reduce({
                fieldInput: {
                    width
                }
            });
        });
        store.incoming(EVENT.DO.MUTATE_FIELD_INPUT_HEIGHT).handle((height) => {
            store.reduce({
                fieldInput: {
                    height
                }
            });
        });
        store.incoming(EVENT.DO.MUTATE_FIELD_INPUT_VALUE).handle((value) => {
            store.reduce({
                fieldInput: {
                    value
                }
            });
        });
        store.incoming(EVENT.DO.MUTATE_FIELD_INPUT_VALUE_CHANGED).handle((valueChanged) => {
            store.reduce({
                fieldInput: {
                    valueChanged
                }
            });
        });

        done();
    }
});
export default FieldStore;

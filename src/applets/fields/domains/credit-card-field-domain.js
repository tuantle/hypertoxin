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
 * @module CreditCardFieldDomain
 * @description - Credit card field applet domain.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 *------------------------------------------------------------------------
 */
'use strict'; // eslint-disable-line

import { Hf } from 'hyperflow';

import CreditCardFieldStore from '../stores/field-store';

import CreditCardFieldInterface from '../interfaces/credit-card-field-interface';

import EVENT from '../events/field-event';

const CreditCardFieldDomain = Hf.Domain.augment({
    $init: function $init () {
        const domain = this;
        domain.register({
            store: CreditCardFieldStore({
                name: `credit-card-field-store`
            }),
            intf: CreditCardFieldInterface({
                name: domain.name
            })
        });
    },
    setup: function setup (done) {
        const domain = this;

        domain.incoming(EVENT.ON.UPDATE_FIELD_INPUT_FOCUS).forward(EVENT.DO.MUTATE_FIELD_INPUT_FOCUS);
        domain.incoming(EVENT.ON.UPDATE_FIELD_INPUT_WIDTH).forward(EVENT.DO.MUTATE_FIELD_INPUT_WIDTH);
        domain.incoming(EVENT.ON.UPDATE_FIELD_INPUT_HEIGHT).forward(EVENT.DO.MUTATE_FIELD_INPUT_HEIGHT);
        domain.incoming(EVENT.ON.UPDATE_FIELD_INPUT_VALUE).forward(EVENT.DO.MUTATE_FIELD_INPUT_VALUE);
        domain.incoming(EVENT.ON.UPDATE_FIELD_INPUT_VALUE_CHANGED).forward(EVENT.DO.MUTATE_FIELD_INPUT_VALUE_CHANGED);
        domain.incoming(EVENT.ON.CLEAR_FIELD_INPUT_VALIDATION_STATUS).handle(() => {
            return {
                validated: false,
                status: ``
            };
        }).relay(EVENT.DO.MUTATE_FIELD_INPUT_VALIDATION);
        domain.incoming(EVENT.ON.UPDATE_FIELD_INPUT_VALIDATION).handle((validator) => {
            const {
                cardType,
                value,
                validate
            } = validator;
            const {
                validated,
                status
            } = Hf.fallback({
                validated: false,
                status: ``
            }).of(validate(value, cardType));

            return {
                validated,
                status
            };
        }).relay(EVENT.DO.MUTATE_FIELD_INPUT_VALIDATION);

        done();
    }
});
export default CreditCardFieldDomain;

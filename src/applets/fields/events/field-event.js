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
 * @description - Field applet event ids.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 *------------------------------------------------------------------------
 */
'use strict'; // eslint-disable-line

import { Hf } from 'hyperflow';

export default Hf.Event.create({
    onEvents: [
        `clear-field-input-validation-status`,
        `update-field-input-validation`,
        `update-field-input-focus`,
        `update-field-input-width`,
        `update-field-input-height`,
        `update-field-input-value`,
        `update-field-input-value-changed`
    ],
    doEvents: [
        `mutate-field-input-validation`,
        `mutate-field-input-focus`,
        `mutate-field-input-width`,
        `mutate-field-input-height`,
        `mutate-field-input-value`,
        `mutate-field-input-value-changed`
    ]
});

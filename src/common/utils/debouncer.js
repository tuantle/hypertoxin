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
 * @module debouncer
 * @description - Debouncer utility function.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 * @flow
 */
'use strict'; // eslint-disable-line

import { Hf } from 'hyperflow';

/**
 * @description - At event,  and after debounce for some time...
 *
 * @method debouncer
 * @param {number} ms
 * @return {object}
 */
const debouncer = function debouncer (ms) {
    if (Hf.DEVELOPMENT) {
        if (!Hf.isInteger(ms)) {
            Hf.log(`error`, `debouncer - Input wait time is invalid.`);
        }
    }

    if (ms < 1) {
        ms = 1;
        Hf.log(`warn1`, `debouncer - Input delay time should be greater than 0. Reset to 1ms.`);
    }

    let timeoutId = null;
    const debounce = function debounce (task) {
        if (Hf.DEVELOPMENT) {
            if (!Hf.isFunction(task)) {
                Hf.log(`error`, `debounce - Input task function is invalid.`);
            }
        }

        const context = this;
        const args = arguments;

        if (timeoutId !== null) {
            return;
        }

        timeoutId = setTimeout(() => {
            clearTimeout(timeoutId);
            timeoutId = null;
        }, ms);

        task.apply(context, args);
    };

    return debounce;
};

export default debouncer;

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
 * @description - Suggestive search applet event ids.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 * @flow
 */
'use strict'; // eslint-disable-line

import { Hf } from 'hyperflow';

export default Hf.Event.create({
    onEvents: [
        `clear-all-items-from-search-suggestion`,
        `clear-autocomplete-items-from-search-suggestion`,
        `add-items-to-search-suggestion`,

        `update-visibility`,
        `update-search-input-focus`,
        `update-search-input-item-value`,
        `update-search-input-item-value-changed`,
        `update-search-suggestion-visibility`,
        `update-search-suggestion-history-item-rollover-count`
    ],
    doEvents: [
        `mutate-visibility`,
        `mutate-search-input-focus`,
        `mutate-search-input-item-value`,
        `mutate-search-input-item-value-changed`,
        `mutate-search-suggestion`,
        `mutate-search-suggestion-visibility`,
        `mutate-search-suggestion-history-item-rollover-count`

    ]
});

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
 * @description - Search bar applet event ids.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 *------------------------------------------------------------------------
 */
'use strict'; // eslint-disable-line

import { Hf } from 'hyperflow';

const searchBarEventMap = {
    onEvents: [
        `clear-non-history-item-from-search-suggestion`,
        `add-history-items-to-search-suggestion`,
        `add-items-to-search-suggestion`,

        `update-clear-button-visibility`,
        `update-search-suggestion-visibility`,
        `update-search-bar-focus`
    ],
    doEvents: [
        `mutate-clear-button-visibility`,
        `mutate-search-suggestion-visibility`,
        `mutate-search-bar-focus`,
        `mutate-search-suggestion`
    ]
};

export default Hf.Event.create(searchBarEventMap);

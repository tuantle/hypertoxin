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
 * @module SearchBarStore
 * @description - Search bar applet store.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 *------------------------------------------------------------------------
 */
'use strict'; // eslint-disable-line

import { Hf } from 'hyperflow';

import EVENT from '../events/search-bar-event';

const SEARCH_SUGGESTION_MAX_COUNT = 8;

const SearchBarStore = Hf.Store.augment({
    state: {
        clearButtonVisible: {
            value: false,
            stronglyTyped: true
        },
        searchSuggestionVisible: {
            value: false,
            stronglyTyped: true
        },
        focus: {
            value: false,
            stronglyTyped: true
        },
        searchSuggestion: {
            value: {
                index: 0,
                items: Array(SEARCH_SUGGESTION_MAX_COUNT).fill({
                    historyType: true,
                    text: ``
                })
            },
            stronglyTyped: true
        }
    },
    setup: function setup (done) {
        const store = this;
        store.incoming(EVENT.DO.MUTATE_CLEAR_BUTTON_VISIBILITY).handle((clearButtonVisible) => {
            store.reduce({
                clearButtonVisible
            });
        });
        store.incoming(EVENT.DO.MUTATE_SEARCH_SUGGESTION_VISIBILITY).handle((searchSuggestionVisible) => {
            store.reduce({
                searchSuggestionVisible
            });
        });
        store.incoming(EVENT.DO.MUTATE_SEARCH_BAR_FOCUS).handle((focus) => {
            store.reduce({
                focus
            });
        });
        store.incoming(EVENT.DO.MUTATE_SEARCH_SUGGESTION).handle((mutateSearchSuggestion) => {
            store.reduce(mutateSearchSuggestion);
        });
        done();
    }
});
export default SearchBarStore;

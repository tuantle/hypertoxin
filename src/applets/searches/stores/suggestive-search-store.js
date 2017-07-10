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
 * @module SuggestiveSearchStore
 * @description - Suggestive search applet store.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 * @flow
 */
'use strict'; // eslint-disable-line

import { Hf } from 'hyperflow';

import EVENT from '../events/suggestive-search-event';

const SuggestiveSearchStore = Hf.Store.augment({
    state: {
        visible: {
            value: false,
            stronglyTyped: true
        },
        searchInput: {
            value: {
                focused: false,
                itemValueChanged: false,
                itemValue: ``
            },
            stronglyTyped: true
        },
        searchSuggestion: {
            value: {
                visible: false,
                historyItemIndex: 0,
                historyItemRollOverCount: 0,
                historyItems: [],
                autocompleteItems: []
            },
            stronglyTyped: true
        }
    },
    setup: function setup (done) {
        const store = this;
        store.incoming(EVENT.DO.MUTATE_VISIBILITY).handle((visible) => {
            store.reduce({
                visible
            });
        });
        store.incoming(EVENT.DO.MUTATE_SEARCH_INPUT_FOCUS).handle((focused) => {
            store.reduce({
                searchInput: {
                    focused
                }
            });
        });
        store.incoming(EVENT.DO.MUTATE_SEARCH_INPUT_ITEM_VALUE).handle((itemValue) => {
            store.reduce({
                searchInput: {
                    itemValue
                }
            });
        });
        store.incoming(EVENT.DO.MUTATE_SEARCH_INPUT_ITEM_VALUE_CHANGED).handle((itemValueChanged) => {
            store.reduce({
                searchInput: {
                    itemValueChanged
                }
            });
        });
        store.incoming(EVENT.DO.MUTATE_SEARCH_SUGGESTION_VISIBILITY).handle((visible) => {
            store.reduce({
                searchSuggestion: {
                    visible
                }
            });
        });
        store.incoming(EVENT.DO.MUTATE_SEARCH_SUGGESTION_HISTORY_ITEM_ROLLOVER_COUNT).handle((historyItemRollOverCount) => {
            store.reduce({
                searchSuggestion: {
                    historyItemRollOverCount
                }
            }, {
                suppressMutationEvent: true
            });
        });
        store.incoming(EVENT.DO.MUTATE_SEARCH_SUGGESTION).handle((mutateSearchSuggestion) => {
            store.reconfig(mutateSearchSuggestion);
        });
        done();
    }
});
export default SuggestiveSearchStore;

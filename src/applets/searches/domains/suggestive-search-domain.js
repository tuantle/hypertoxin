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
 * @module SuggestiveSearchDomain
 * @description - Suggestive search applet domain.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 *------------------------------------------------------------------------
 */
'use strict'; // eslint-disable-line

import { Hf } from 'hyperflow';

import SuggestiveSearchStore from '../stores/suggestive-search-store';

import SuggestiveSearchInterface from '../interfaces/suggestive-search-interface';

import EVENT from '../events/suggestive-search-event';

const SuggestiveSearchDomain = Hf.Domain.augment({
    $init: function $init () {
        const domain = this;
        domain.register({
            store: SuggestiveSearchStore({
                name: `suggestive-search-store`
            }),
            intf: SuggestiveSearchInterface({
                name: domain.name
            })
        });
    },
    setup: function setup (done) {
        const domain = this;

        domain.incoming(EVENT.ON.UPDATE_VISIBILITY).forward(EVENT.DO.MUTATE_VISIBILITY);
        domain.incoming(EVENT.ON.UPDATE_SEARCH_INPUT_FOCUS).forward(EVENT.DO.MUTATE_SEARCH_INPUT_FOCUS);
        domain.incoming(EVENT.ON.UPDATE_SEARCH_INPUT_ITEM_VALUE).forward(EVENT.DO.MUTATE_SEARCH_INPUT_ITEM_VALUE);
        domain.incoming(EVENT.ON.UPDATE_SEARCH_INPUT_ITEM_VALUE_CHANGED).forward(EVENT.DO.MUTATE_SEARCH_INPUT_ITEM_VALUE_CHANGED);
        domain.incoming(EVENT.ON.UPDATE_SEARCH_SUGGESTION_VISIBILITY).forward(EVENT.DO.MUTATE_SEARCH_SUGGESTION_VISIBILITY);
        domain.incoming(EVENT.ON.UPDATE_SEARCH_SUGGESTION_ROLLOVER_COUNT).forward(EVENT.DO.MUTATE_SEARCH_SUGGESTION_ROLLOVER_COUNT);

        domain.incoming(EVENT.ON.CLEAR_ALL_ITEMS_FROM_SEARCH_SUGGESTION).handle(() => {
            return function mutateSearchSuggestion (state) {
                let {
                    items
                } = state.searchSuggestion;
                return {
                    searchSuggestion: {
                        ...state.searchSuggestion,
                        items: items.map((item) => {
                            item.value = ``;
                            return item;
                        })
                    }
                };
            };
        }).relay(EVENT.DO.MUTATE_SEARCH_SUGGESTION);
        domain.incoming(EVENT.ON.CLEAR_NON_HISTORY_ITEMS_FROM_SEARCH_SUGGESTION).handle(() => {
            return function mutateSearchSuggestion (state) {
                let {
                    items
                } = state.searchSuggestion;
                return {
                    searchSuggestion: {
                        ...state.searchSuggestion,
                        items: items.map((item) => {
                            if (!item.historyType) {
                                item.value = ``;
                            }
                            return item;
                        })
                    }
                };
            };
        }).relay(EVENT.DO.MUTATE_SEARCH_SUGGESTION);
        domain.incoming(EVENT.ON.ADD_ITEMS_TO_SEARCH_SUGGESTION).handle((searchSuggestionItems) => {
            return function mutateSearchSuggestion (state) {
                let {
                    index,
                    rollOverCount,
                    items
                } = state.searchSuggestion;
                const filteredSearchSuggestionItems = searchSuggestionItems.filter((item) => !items.some((_item) => _item.value === item.value));

                if (!Hf.isEmpty(filteredSearchSuggestionItems)) {
                    filteredSearchSuggestionItems.forEach((item) => {
                        if (index === rollOverCount) {
                            index = 0;
                        }
                        if (index === items.length) {
                            items.push(item);
                        } else if (index < items.length) {
                            items[index] = item;
                        }
                        index++;
                    });
                    items = items.sort((itemA, itemB) => {
                        return itemB.timestamp - itemA.timestamp;
                    });
                    return {
                        searchSuggestion: {
                            ...state.searchSuggestion,
                            index,
                            items
                        }
                    };
                } else { // eslint-disable-line
                    return {
                        searchSuggestion: state.searchSuggestion
                    };
                }
            };
        }).relay(EVENT.DO.MUTATE_SEARCH_SUGGESTION);

        done();
    }
});
export default SuggestiveSearchDomain;

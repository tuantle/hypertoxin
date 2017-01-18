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
 * @module SearchBarDomain
 * @description - Search bar applet domain.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 *------------------------------------------------------------------------
 */
'use strict'; // eslint-disable-line

import { Hf } from 'hyperflow';

import SearchBarStore from '../stores/search-bar-store';

import SearchBarInterface from '../interfaces/search-bar-interface';

import EVENT from '../events/search-bar-event';

const SearchBarDomain = Hf.Domain.augment({
    $init: function $init () {
        const domain = this;
        domain.register({
            store: SearchBarStore({
                name: `search-bar-store`
            }),
            intf: SearchBarInterface({
                name: domain.name
            })
        });
    },
    setup: function setup (done) {
        const domain = this;

        domain.incoming(EVENT.ON.UPDATE_CLEAR_BUTTON_VISIBILITY).forward(EVENT.DO.MUTATE_CLEAR_BUTTON_VISIBILITY);
        domain.incoming(EVENT.ON.UPDATE_SEARCH_SUGGESTION_VISIBILITY).forward(EVENT.DO.MUTATE_SEARCH_SUGGESTION_VISIBILITY);

        domain.incoming(EVENT.ON.UPDATE_SEARCH_BAR_FOCUS).forward(EVENT.DO.MUTATE_SEARCH_BAR_FOCUS);
        // domain.incoming(EVENT.ON.CLEAR_NON_HISTORY_ITEM_FROM_SEARCH_SUGGESTION).handle(() => {
        //     return function mutateSearchSuggestion (state) {
        //         let {
        //             items
        //         } = state.searchSuggestion;
        //         const emptySearchSuggestion = items.every((item) => Hf.isEmpty(item.text));
        //
        //         if (!emptySearchSuggestion) {
        //             items = items.map((item) => {
        //                 if (!item.historyType) {
        //                     return {
        //                         historyType: true,
        //                         text: ``
        //                     }
        //                 } else {
        //                     return item;
        //                 }
        //             }).sort();//.sort((itemA, itemB) => itemB.text.length - itemA.text.length);
        //
        //             return {
        //                 searchSuggestion: {
        //                     items
        //                     // index: items.filter((item) => !Hf.isEmpty(item.text)).length
        //                 }
        //             };
        //         } else {
        //             return {
        //                 searchSuggestion: state.searchSuggestion
        //             };
        //         }
        //     };
        // }).relay(EVENT.DO.MUTATE_SEARCH_SUGGESTION);
        domain.incoming(EVENT.ON.ADD_ITEMS_TO_SEARCH_SUGGESTION).handle((searchSuggestionTexts) => {
            return function mutateSearchSuggestion (state) {
                let {
                    index,
                    items
                } = state.searchSuggestion;
                const emptySearchSuggestion = items.every((item) => Hf.isEmpty(item.text));
                let filteredSearchSuggestionTexts = searchSuggestionTexts.filter((text) => {
                    return emptySearchSuggestion ? true : !items.some((item) => item.text === text);
                });

                if (!Hf.isEmpty(filteredSearchSuggestionTexts)) {
                    filteredSearchSuggestionTexts.forEach((text) => {
                        items[index].historyType = false;
                        items[index].text = text;
                        index = index >= items.length - 1 ? 0 : index + 1;
                    });

                    return {
                        searchSuggestion: {
                            items,
                            index
                        }
                    };
                } else {
                    return {
                        searchSuggestion: state.searchSuggestion
                    };
                }
            };
        }).relay(EVENT.DO.MUTATE_SEARCH_SUGGESTION);
        domain.incoming(EVENT.ON.ADD_HISTORY_ITEMS_TO_SEARCH_SUGGESTION).handle((searchHistoryTexts) => {
            return function mutateSearchSuggestion (state) {
                let {
                    index,
                    items
                } = state.searchSuggestion;
                const emptySearchSuggestion = items.every((item) => Hf.isEmpty(item.text));
                let filteredSearchHistoryTexts = searchHistoryTexts.filter((text) => {
                    return emptySearchSuggestion ? true : !items.some((item) => item.text === text);
                });

                if (!Hf.isEmpty(filteredSearchHistoryTexts)) {
                    filteredSearchHistoryTexts.forEach((text) => {
                        items[index].historyType = true;
                        items[index].text = text;
                        index = index >= items.length - 1 ? 0 : index + 1;
                    });

                    return {
                        searchSuggestion: {
                            items,
                            index
                        }
                    };
                } else {
                    return {
                        searchSuggestion: state.searchSuggestion
                    };
                }
            };
        }).relay(EVENT.DO.MUTATE_SEARCH_SUGGESTION);

        done();
    }
});
export default SearchBarDomain;

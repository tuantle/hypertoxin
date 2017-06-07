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
 * @module SuggestiveSearchInterface
 * @description - Suggestive search applet android interface.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 *------------------------------------------------------------------------
 */
'use strict'; // eslint-disable-line

import { Hf } from 'hyperflow';

import React from 'react';

import ReactNative from 'react-native';

import { View as AnimatedView } from 'react-native-animatable';

import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard';

import { Ht } from '../../../hypertoxin';

import fontStyleTemplate from '../../../styles/templates/font-style-template';

import dropShadowStyleTemplate from '../../../styles/templates/drop-shadow-style-template';

import EVENT from '../events/suggestive-search-event';

const {
    Text,
    Image,
    View,
    FlatList,
    TextInput,
    TouchableOpacity,
    Dimensions
} = ReactNative;

const DEVICE_WIDTH = Dimensions.get(`window`).width;
const DEVICE_HEIGHT = Dimensions.get(`window`).height;

const SEARCH_SUGGESTION_UPDATE_DELAY_IN_MS = 100;

const DEFAULT_SUGGESTIVE_SEARCH_STYLE = {
    container: {
        position: `absolute`,
        alignItems: `stretch`,
        justifyContent: `flex-start`,
        zIndex: 10,
        elevation: 2,
        top: 0,
        width: DEVICE_WIDTH,
        marginBottom: 6,
        backgroundColor: `transparent`,
        overflow: `hidden`
    },
    searchInput: {
        flexGrow: 1,
        flexDirection: `row`,
        alignItems: `center`,
        justifyContent: `space-between`,
        height: 56
    },
    searchSuggestion: {
        flexShrink: 1,
        flexDirection: `column`,
        alignItems: `stretch`,
        justifyContent: `center`,
        maxHeight: DEVICE_HEIGHT / 2,
        paddingLeft: 12,
        marginVertical: 6
    },
    searchInputText: fontStyleTemplate.normalLarge,
    searchSuggestionText: fontStyleTemplate.normalLarge
};

const DEFAULT_SUGGESTIVE_SEARCH_ICON_STYLE = {
    icon: {
        small: {
            width: 16,
            height: 16,
            backgroundColor: `transparent`
        },
        normal: {
            width: 24,
            height: 24,
            backgroundColor: `transparent`
        },
        large: {
            width: 32,
            height: 32,
            backgroundColor: `transparent`
        }
    }
};

const SuggestiveSearchInterface = Hf.Interface.augment({
    composites: [
        Hf.React.ComponentComposite
    ],
    state: {
        shade: {
            value: Ht.Theme.suggestiveSearch.shade,
            oneOf: [ `light`, `dark` ],
            stronglyTyped: true
        },
        searchInputTextColor: {
            value: Ht.Theme.suggestiveSearch.searchInputTextColor,
            stronglyTyped: true
        },
        hintTextColor: {
            value: ``,
            stronglyTyped: true
        },
        searchSuggestionTextColor: {
            value: Ht.Theme.suggestiveSearch.searchSuggestionTextColor,
            stronglyTyped: true
        },
        iconColor: {
            value: Ht.Theme.suggestiveSearch.iconColor,
            stronglyTyped: true
        },
        // iconPreset: {
        //     value: ``,
        //     stronglyTyped: true
        // },
        iconSize: {
            value: Ht.Theme.suggestiveSearch.iconSize,
            oneOf: [ `small`, `normal`, `large` ],
            stronglyTyped: true
        },
        statusHeightOffset: {
            value: Ht.Theme.suggestiveSearch.statusHeightOffset,
            stronglyTyped: true
        },
        dropShadow: {
            value: Ht.Theme.suggestiveSearch.dropShadow,
            stronglyTyped: true
        },
        dropShadowIcon: {
            value: Ht.Theme.suggestiveSearch.dropShadowIcon,
            stronglyTyped: true
        },
        visibleInitially: {
            value: false,
            stronglyTyped: true
        },
        autoCorrect: {
            value: true,
            stronglyTyped: true
        },
        enableSearchSuggestion: {
            value: true,
            stronglyTyped: true
        },
        searchSuggestionHistoryItemRollOverCount: {
            value: 16,
            stronglyTyped: true
        },
        hint: {
            value: `Search...`,
            stronglyTyped: true
        },
        entryAnimation: {
            value: `from-left-side`,
            oneOf: [ `from-left-side`, `from-right-side` ],
            stronglyTyped: true
        },
        onGetSearchAutocompletions: {
            value: () => [],
            stronglyTyped: true
        },
        onSearch: {
            value: () => {},
            stronglyTyped: true
        },
        onSearchChange: {
            value: () => {},
            stronglyTyped: true
        },
        onFocus: {
            value: () => {},
            stronglyTyped: true
        },
        onBlur: {
            value: () => {},
            stronglyTyped: true
        },
        onHidden: {
            value: () => {},
            stronglyTyped: true
        },
        onVisible: {
            value: () => {},
            stronglyTyped: true
        }
    },
    setup: function setup (done) {
        const intf = this;

        intf.preMountStage((component) => {
            const {
                visibleInitially
            } = component.props;

            if (visibleInitially) {
                intf.outgoing(EVENT.ON.UPDATE_VISIBILITY).emit(() => true);
            }
        });

        intf.postUpdateStage((component) => {
            const {
                searchSuggestionHistoryItemRollOverCount,
                entryAnimation
            } = component.props;
            const {
                visible,
                searchInput,
                searchSuggestion
            } = component.state;
            const [
                searchTextInput,
                animatedSearchHeaderView,
                animatedSearchSuggestionView
            ] = component.lookupComponentRefs(
                `searchTextInput`,
                `animatedSearchHeaderView`,
                `animatedSearchSuggestionView`
            );

            if (searchInput.focused) {
                searchTextInput.focus();
            } else {
                searchTextInput.blur();
            }

            if (visible) {
                animatedSearchHeaderView.transitionTo({
                    opacity: 1,
                    translateX: 0
                });
            } else {
                if (entryAnimation === `from-right-side`) {
                    animatedSearchHeaderView.transitionTo({
                        opacity: 0,
                        translateX: DEVICE_WIDTH
                    });
                }
                if (entryAnimation === `from-left-side`) {
                    animatedSearchHeaderView.transitionTo({
                        opacity: 0,
                        translateX: -DEVICE_WIDTH
                    });
                }
            }

            if (searchSuggestion.visible) {
                animatedSearchSuggestionView.transitionTo({
                    opacity: 1,
                    translateY: 0
                });
            } else {
                animatedSearchSuggestionView.transitionTo({
                    opacity: 0,
                    translateY: DEVICE_HEIGHT
                });
            }

            intf.outgoing(EVENT.ON.UPDATE_SEARCH_SUGGESTION_HISTORY_ITEM_ROLLOVER_COUNT).emit(() => searchSuggestionHistoryItemRollOverCount);
        });

        done();
    },
    isHidden: function isHidden () {
        const component = this;
        const {
            visible
        } = component.state;

        return !visible;
    },
    hide: function hide () {
        const component = this;
        component.onHide();
    },
    show: function show () {
        const component = this;
        component.onShow();
    },
    clear: function clear () {
        const component = this;
        component.onClearSearchInput();
    },
    clearSearchSuggestion: function clearSearchSuggestion () {
        const component = this;
        component.onClearSearchSuggestion();
    },
    onHide: function onHide () {
        const component = this;
        const {
            onHidden
        } = component.props;
        const [
            searchTextInput
        ] = component.lookupComponentRefs(
            `searchTextInput`
        );

        component.outgoing(
            EVENT.ON.UPDATE_VISIBILITY,
            EVENT.ON.UPDATE_SEARCH_SUGGESTION_VISIBILITY,
            EVENT.ON.UPDATE_SEARCH_INPUT_FOCUS,
            EVENT.ON.UPDATE_SEARCH_INPUT_ITEM_VALUE_CHANGED
        ).emit(() => false);
        component.outgoing(EVENT.ON.CLEAR_AUTOCOMPLETE_ITEMS_FROM_SEARCH_SUGGESTION).emit();
        component.onDismissKeyboard();
        searchTextInput.clear();
        onHidden();
    },
    onShow: function onShow () {
        const component = this;
        const {
            onVisible
        } = component.props;

        component.outgoing(
            EVENT.ON.UPDATE_VISIBILITY,
            EVENT.ON.UPDATE_SEARCH_INPUT_FOCUS
        ).emit(() => true);
        onVisible();
    },
    onClearSearchSuggestion: function onClearSearchSuggestion () {
        const component = this;

        component.outgoing(EVENT.ON.CLEAR_ALL_ITEMS_FROM_SEARCH_SUGGESTION).emit();
    },
    onClearSearchInput: function onClearSearchInput () {
        const component = this;
        const [
            searchTextInput
        ] = component.lookupComponentRefs(
            `searchTextInput`
        );

        if (Hf.isDefined(searchTextInput)) {
            searchTextInput.clear();
            component.outgoing(EVENT.ON.UPDATE_SEARCH_INPUT_ITEM_VALUE).emit(() => ``);
            component.outgoing(EVENT.ON.UPDATE_SEARCH_INPUT_ITEM_VALUE_CHANGED).emit(() => false);
        }
    },
    onDismissKeyboard: function onDismissKeyboard () {
        const component = this;

        component.outgoing(EVENT.ON.UPDATE_SEARCH_INPUT_FOCUS).emit(() => false);
        dismissKeyboard();
    },
    renderSearchInput: function renderSearchInput (adjustedStyle) {
        const component = this;
        const {
            shade,
            hintTextColor,
            autoCorrect,
            hint,
            onGetSearchAutocompletions,
            onSearch,
            onSearchChange,
            onFocus,
            onBlur
        } = component.props;
        const {
            searchInput
        } = component.state;
        const hideIcon = Ht.Theme.icon[`goBack`];
        const clearIcon = Ht.Theme.icon[`close`];
        let themedhintTextColor;

        themedhintTextColor = Hf.isEmpty(hintTextColor) ? Ht.Theme.color.text.disabled[shade === `light` ? `dark` : `light`] : hintTextColor;

        return (
            <View style = { adjustedStyle.searchInput }>
                <View style = {{
                    flexDirection: `row`,
                    alignItems: `center`,
                    justifyContent: `center`,
                    minWidth: 46,
                    minHeight: 46,
                    backgroundColor: `transparent`
                }}>
                    <TouchableOpacity onPress = { component.onHide }>
                        <Image
                            resizeMode = 'cover'
                            source = { hideIcon }
                            style = { adjustedStyle.icon }
                        />
                    </TouchableOpacity>
                </View>
                <View style = {{
                    flexDirection: `row`,
                    alignSelf: `center`,
                    alignItems: `flex-start`,
                    justifyContent: `center`,
                    maxWidth: DEVICE_WIDTH - 92,
                    minHeight: 46,
                    backgroundColor: `transparent`
                }}>
                    <TextInput
                        ref = { component.assignComponentRef(`searchTextInput`) }
                        style = { adjustedStyle.searchInputText }
                        autoCorrect = { autoCorrect }
                        placeholder = { hint }
                        placeholderTextColor = { themedhintTextColor }
                        returnKeyType = 'search'
                        underlineColorAndroid = 'transparent'
                        onFocus = { onFocus }
                        onBlur = { onBlur }
                        onChange = {(event) => {
                            const fetchSearchAutocompletions = async function () {
                                const autocompleteTexts = await onGetSearchAutocompletions(event.nativeEvent.text);
                                if (Hf.isNonEmptyArray(autocompleteTexts)) {
                                    component.outgoing(EVENT.ON.ADD_ITEMS_TO_SEARCH_SUGGESTION).emit(() => {
                                        return [
                                            ...new Set(autocompleteTexts.filter((text) => Hf.isString(text)).map((text) => text.replace(/\s/g, ``)))
                                        ].map((text) => {
                                            return {
                                                historyType: false,
                                                value: text
                                            };
                                        });
                                    });
                                }
                            };
                            component.outgoing(EVENT.ON.UPDATE_SEARCH_INPUT_ITEM_VALUE).emit(() => event.nativeEvent.text);
                            component.outgoing(EVENT.ON.UPDATE_SEARCH_INPUT_FOCUS).emit(() => true);
                            component.outgoing(
                                EVENT.ON.UPDATE_SEARCH_INPUT_ITEM_VALUE_CHANGED,
                                EVENT.ON.UPDATE_SEARCH_SUGGESTION_VISIBILITY
                            ).emit(() => !Hf.isEmpty(event.nativeEvent.text));
                            onSearchChange(event.nativeEvent.text);
                            fetchSearchAutocompletions();
                        }}
                        onSubmitEditing = {(event) => {
                            if (!Hf.isEmpty(event.nativeEvent.text)) {
                                component.outgoing(EVENT.ON.ADD_ITEMS_TO_SEARCH_SUGGESTION).delay(SEARCH_SUGGESTION_UPDATE_DELAY_IN_MS).emit(() => {
                                    return [{
                                        historyType: true,
                                        value: event.nativeEvent.text,
                                        timestamp: new Date().getTime()
                                    }];
                                });
                            }
                            component.outgoing(
                                EVENT.ON.UPDATE_SEARCH_INPUT_FOCUS,
                                EVENT.ON.UPDATE_SEARCH_SUGGESTION_VISIBILITY
                            ).emit(() => false);
                            component.outgoing(EVENT.ON.CLEAR_AUTOCOMPLETE_ITEMS_FROM_SEARCH_SUGGESTION).emit();
                            onSearch(event.nativeEvent.text);
                        }}
                    />
                </View>
            {
                !searchInput.itemValueChanged ?
                <View style = {{
                    minWidth: 46,
                    minHeight: 46,
                    backgroundColor: `transparent`
                }}/> :
                <View style = {{
                    flexDirection: `row`,
                    alignItems: `center`,
                    justifyContent: `center`,
                    minWidth: 46,
                    minHeight: 46,
                    backgroundColor: `transparent`
                }}>
                    <TouchableOpacity onPress = { component.onClearSearchInput }>
                        <Image
                            resizeMode = 'cover'
                            source = { clearIcon }
                            style = { adjustedStyle.icon }
                        />
                    </TouchableOpacity>
                </View>
            }
            </View>
        );
    },
    renderSuggestions: function renderSuggestions (adjustedStyle) {
        const component = this;
        const {
            onSearchChange,
            onSearch
        } = component.props;
        const {
            searchInput,
            searchSuggestion
        } = component.state;
        const searchIcon = Ht.Theme.icon[`search`];
        const historyIcon = Ht.Theme.icon[`history`];
        const recallIcon = Ht.Theme.icon[`recall`];
        let searchSuggestionItems = searchSuggestion.historyItems.concat(searchSuggestion.autocompleteItems);

        searchSuggestionItems = searchSuggestionItems.filter((item) => {
            return !Hf.isEmpty(item.value) && !Hf.isEmpty(searchInput.itemValue) && item.value.toLowerCase().includes(searchInput.itemValue.toLowerCase());
        });

        return (
            <AnimatedView
                ref = { component.assignComponentRef(`animatedSearchSuggestionView`) }
                duration = { 300 }
                useNativeDriver = { true }
                style = { adjustedStyle.searchSuggestion }
            >
                <FlatList
                    data = { searchSuggestionItems }
                    renderItem = {(listItem) => {
                        const {
                            item,
                            index
                        } = listItem;

                        return (
                            <TouchableOpacity
                                key = { index }
                                onPress = {() => {
                                    const [
                                        searchTextInput
                                    ] = component.lookupComponentRefs(
                                        `searchTextInput`
                                    );
                                    searchTextInput.setNativeProps({
                                        text: item.value
                                    });
                                    component.outgoing(EVENT.ON.UPDATE_SEARCH_INPUT_ITEM_VALUE).emit(() => item.value);
                                    component.outgoing(EVENT.ON.UPDATE_SEARCH_INPUT_ITEM_VALUE_CHANGED).emit(() => true);
                                    component.outgoing(
                                        EVENT.ON.UPDATE_SEARCH_INPUT_FOCUS,
                                        EVENT.ON.UPDATE_SEARCH_SUGGESTION_VISIBILITY
                                    ).emit(() => false);
                                    component.outgoing(EVENT.ON.CLEAR_AUTOCOMPLETE_ITEMS_FROM_SEARCH_SUGGESTION).emit();
                                    onSearchChange(item.value);
                                    onSearch(item.value);
                                }}>
                                <View style = {{
                                    flexDirection: `row`,
                                    justifyContent: `center`,
                                    alignItems: `center`,
                                    backgroundColor: `transparent`
                                }}>
                                {
                                    item.historyType ?
                                    <Image
                                        resizeMode = 'cover'
                                        source = { historyIcon }
                                        style = { adjustedStyle.icon }
                                    /> :
                                    <Image
                                        resizeMode = 'cover'
                                        source = { searchIcon }
                                        style = { adjustedStyle.icon }
                                    />
                                }
                                    <Text style = { adjustedStyle.searchSuggestionText }>{ item.value }</Text>
                                    <View style = {{
                                        flexDirection: `row`,
                                        alignItems: `center`,
                                        justifyContent: `center`,
                                        minWidth: 46,
                                        minHeight: 46,
                                        backgroundColor: `transparent`
                                    }}>
                                        <TouchableOpacity onPress = {() => {
                                            const [
                                                searchTextInput
                                            ] = component.lookupComponentRefs(
                                                `searchTextInput`
                                            );
                                            searchTextInput.setNativeProps({
                                                text: item.value
                                            });
                                            searchTextInput.focus();
                                            component.outgoing(EVENT.ON.UPDATE_SEARCH_INPUT_ITEM_VALUE).emit(() => item.value);
                                            component.outgoing(EVENT.ON.UPDATE_SEARCH_INPUT_ITEM_VALUE_CHANGED).emit(() => true);
                                        }}>
                                            <Image
                                                resizeMode = 'cover'
                                                source = { recallIcon }
                                                style = { adjustedStyle.icon }
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                    style = {{
                        flexDirection: `column`,
                        backgroundColor: `transparent`
                    }}
                />
            </AnimatedView>
        );
    },
    render: function render () {
        const component = this;
        const {
            shade,
            searchInputTextColor,
            searchSuggestionTextColor,
            iconColor,
            iconSize,
            statusHeightOffset,
            enableSearchSuggestion,
            dropShadow,
            dropShadowIcon,
            visibleInitially,
            entryAnimation,
            style
        } = component.props;
        let adjustedStyle;
        let themedSearchInputTextColor;
        let themedSearchSuggestionTextColor;
        let themedIconColor;

        if (Ht.Theme.color.text.hasOwnProperty(searchInputTextColor)) {
            themedSearchInputTextColor = Ht.Theme.color.text[searchInputTextColor][shade === `light` ? `dark` : `light`];
        } else {
            themedSearchInputTextColor = searchInputTextColor;
        }

        if (Ht.Theme.color.text.hasOwnProperty(searchSuggestionTextColor)) {
            themedSearchSuggestionTextColor = Ht.Theme.color.text[searchSuggestionTextColor][shade === `light` ? `dark` : `light`];
        } else {
            themedSearchSuggestionTextColor = searchSuggestionTextColor;
        }

        if (Ht.Theme.color.button.icon.hasOwnProperty(iconColor)) {
            themedIconColor = Ht.Theme.color.button.icon[iconColor][shade === `light` ? `dark` : `light`];
        } else {
            themedIconColor = iconColor;
        }

        adjustedStyle = Hf.merge(DEFAULT_SUGGESTIVE_SEARCH_STYLE).with({
            container: dropShadow ? {
                ...dropShadowStyleTemplate,
                top: statusHeightOffset,
                transform: [{
                    translateX: (() => {
                        if (visibleInitially) {
                            return 0;
                        } else if (!visibleInitially && entryAnimation === `from-left-side`) {
                            return -DEVICE_WIDTH;
                        } else if (!visibleInitially && entryAnimation === `from-right-side`) {
                            return DEVICE_WIDTH;
                        }
                    })()
                }]
            } : {
                top: statusHeightOffset,
                transform: [{
                    translateX: (() => {
                        if (visibleInitially) {
                            return 0;
                        } else if (!visibleInitially && entryAnimation === `from-left-side`) {
                            return -DEVICE_WIDTH;
                        } else if (!visibleInitially && entryAnimation === `from-right-side`) {
                            return DEVICE_WIDTH;
                        }
                    })()
                }]
            },
            searchInput: {
                backgroundColor: Ht.Theme.color.body.container[shade]
            },
            searchSuggestion: dropShadow ? {
                ...dropShadowStyleTemplate,
                backgroundColor: Ht.Theme.color.body.container[shade]
            } : {
                backgroundColor: Ht.Theme.color.body.container[shade]
            },
            searchInputText: {
                flexGrow: 1,
                color: themedSearchInputTextColor
            },
            searchSuggestionText: {
                flexGrow: 1,
                color: themedSearchSuggestionTextColor
            },
            icon: dropShadowIcon ? Hf.merge(DEFAULT_SUGGESTIVE_SEARCH_ICON_STYLE.icon[iconSize]).with({
                ...dropShadowStyleTemplate,
                tintColor: themedIconColor
            }) : Hf.merge(DEFAULT_SUGGESTIVE_SEARCH_ICON_STYLE.icon[iconSize]).with({
                tintColor: themedIconColor
            })
        });

        adjustedStyle = Hf.isObject(style) ? Hf.merge(adjustedStyle).with(style) : adjustedStyle;

        return (
            <AnimatedView
                ref = { component.assignComponentRef(`animatedSearchHeaderView`) }
                style = { adjustedStyle.container }
                duration = { 300 }
                useNativeDriver = { true }
                onStartShouldSetResponder = { component.onDismissKeyboard }
            >
            {
                component.renderSearchInput(adjustedStyle)
            }
            {
                !enableSearchSuggestion ? null : component.renderSuggestions(adjustedStyle)
            }
            </AnimatedView>
        );
    }
});
export default SuggestiveSearchInterface;

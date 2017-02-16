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
 * @description - Suggestive search applet interface.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 *------------------------------------------------------------------------
 */
'use strict'; // eslint-disable-line

import { Hf } from 'hyperflow';

import React from 'react';

import ReactNative, { Dimensions } from 'react-native';

import { View as AnimatedView } from 'react-native-animatable';

import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard';

import theme from '../../../styles/theme';

import fontStyleTemplate from '../../../styles/templates/font-style-template';

import dropShadowStyleTemplate from '../../../styles/templates/drop-shadow-style-template';

import EVENT from '../events/suggestive-search-event';

const {
    Text,
    Image,
    View,
    ScrollView,
    TextInput,
    TouchableOpacity
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
        flexDirection: `row`,
        alignItems: `center`,
        justifyContent: `space-between`,
        height: 56
    },
    searchSuggestion: {
        flexDirection: `column`,
        alignItems: `stretch`,
        justifyContent: `center`,
        paddingLeft: 12,
        marginVertical: 6
    },
    searchInputText: fontStyleTemplate.normalLarger,
    searchSuggestionText: fontStyleTemplate.normalLarger
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
            value: `light`,
            oneOf: [ `light`, `dark` ],
            stronglyTyped: true
        },
        searchInputTextColor: {
            value: `default`,
            stronglyTyped: true
        },
        hintTextColor: {
            value: ``,
            stronglyTyped: true
        },
        searchSuggestionTextColor: {
            value: `default`,
            stronglyTyped: true
        },
        iconColor: {
            value: `default`,
            stronglyTyped: true
        },
        // iconPreset: {
        //     value: ``,
        //     stronglyTyped: true
        // },
        iconSize: {
            value: `normal`,
            oneOf: [ `small`, `normal`, `large` ],
            stronglyTyped: true
        },
        statusHeightOffet: {
            value: 21,
            stronglyTyped: true
        },
        dropShadow: {
            value: true,
            stronglyTyped: true
        },
        dropShadowIcon: {
            value: true,
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
        searchSuggestionRollOverCount: {
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
        onGetSearchSuggestions: {
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
                searchSuggestionRollOverCount,
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

            intf.outgoing(EVENT.ON.UPDATE_SEARCH_SUGGESTION_ROLLOVER_COUNT).emit(() => searchSuggestionRollOverCount);
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
        component.outgoing(EVENT.ON.CLEAR_NON_HISTORY_ITEMS_FROM_SEARCH_SUGGESTION).emit();
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
            onGetSearchSuggestions,
            onSearch,
            onSearchChange,
            onFocus,
            onBlur
        } = component.props;
        const {
            searchInput
        } = component.state;
        const hideIcon = theme.icon[`goBack`];
        const clearIcon = theme.icon[`close`];
        let themedhintTextColor;

        themedhintTextColor = Hf.isEmpty(hintTextColor) ? theme.color.text.disabled[shade === `light` ? `dark` : `light`] : hintTextColor;

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
                        onFocus = { onFocus }
                        onBlur = { onBlur }
                        onChange = {(event) => {
                            const searchSuggestions = onGetSearchSuggestions();
                            if (Hf.isNonEmptyArray(searchSuggestions)) {
                                component.outgoing(EVENT.ON.ADD_ITEMS_TO_SEARCH_SUGGESTION).emit(() => {
                                    return searchSuggestions.filter((text) => Hf.isString(text)).map((text) => {
                                        return {
                                            historyType: false,
                                            text
                                        };
                                    });
                                });
                            }
                            component.outgoing(EVENT.ON.UPDATE_SEARCH_INPUT_ITEM_VALUE).emit(() => event.nativeEvent.text);
                            component.outgoing(EVENT.ON.UPDATE_SEARCH_INPUT_FOCUS).emit(() => true);
                            component.outgoing(
                                EVENT.ON.UPDATE_SEARCH_INPUT_ITEM_VALUE_CHANGED,
                                EVENT.ON.UPDATE_SEARCH_SUGGESTION_VISIBILITY
                            ).emit(() => !Hf.isEmpty(event.nativeEvent.text));
                            onSearchChange(event.nativeEvent.text);
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
                            component.outgoing(EVENT.ON.CLEAR_NON_HISTORY_ITEMS_FROM_SEARCH_SUGGESTION).emit();
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
        const searchIcon = theme.icon[`search`];
        const historyIcon = theme.icon[`history`];
        const recallIcon = theme.icon[`recall`];

        return (
            <AnimatedView
                ref = { component.assignComponentRef(`animatedSearchSuggestionView`) }
                duration = { 300 }
                useNativeDriver = { true }
                style = { adjustedStyle.searchSuggestion }
            >
                <ScrollView style = {{
                    flexDirection: `column`,
                    backgroundColor: `transparent`
                }}>
                {
                    searchSuggestion.items.filter((item) => {
                        return !Hf.isEmpty(item.value) && !Hf.isEmpty(searchInput.itemValue) && item.value.toLowerCase().includes(searchInput.itemValue.toLowerCase());
                    }).map((item, index) => {
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
                                    component.outgoing(EVENT.ON.CLEAR_NON_HISTORY_ITEMS_FROM_SEARCH_SUGGESTION).emit();
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
                    })
                }
                </ScrollView>
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
            statusHeightOffet,
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

        if (theme.color.text.hasOwnProperty(searchInputTextColor)) {
            themedSearchInputTextColor = theme.color.text[searchInputTextColor][shade === `light` ? `dark` : `light`];
        } else {
            themedSearchInputTextColor = searchInputTextColor;
        }

        if (theme.color.text.hasOwnProperty(searchSuggestionTextColor)) {
            themedSearchSuggestionTextColor = theme.color.text[searchSuggestionTextColor][shade === `light` ? `dark` : `light`];
        } else {
            themedSearchSuggestionTextColor = searchSuggestionTextColor;
        }

        if (theme.color.button.icon.hasOwnProperty(iconColor)) {
            themedIconColor = theme.color.button.icon[iconColor][shade === `light` ? `dark` : `light`];
        } else {
            themedIconColor = iconColor;
        }

        adjustedStyle = Hf.merge(DEFAULT_SUGGESTIVE_SEARCH_STYLE).with({
            container: dropShadow ? {
                ...dropShadowStyleTemplate,
                top: statusHeightOffet,
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
                top: statusHeightOffet,
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
                backgroundColor: theme.color.body.container[shade]
            },
            searchSuggestion: dropShadow ? {
                ...dropShadowStyleTemplate,
                backgroundColor: theme.color.body.container[shade]
            } : {
                backgroundColor: theme.color.body.container[shade]
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

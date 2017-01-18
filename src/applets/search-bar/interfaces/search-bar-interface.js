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
 * @module SearchBarInterface
 * @description - Search bar applet interface.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 *------------------------------------------------------------------------
 */
'use strict'; // eslint-disable-line

import { Hf } from 'hyperflow';

import React from 'react';

import ReactNative from 'react-native';

import * as Animatable from 'react-native-animatable';

import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard';

import theme from '../../../styles/theme';

import fontStyleTemplate from '../../../styles/templates/font-style-template';

import dropShadowStyleTemplate from '../../../styles/templates/drop-shadow-style-template';

import EVENT from '../events/search-bar-event';

const {
    Text,
    Image,
    View,
    ScrollView,
    TextInput,
    TouchableOpacity
} = ReactNative;

const AnimatedScrollView = Animatable.createAnimatableComponent(ScrollView);

const DEFAULT_SEARCH_BAR_STYLE = {
    container: {
        flexDirection: `row`,
        alignItems: `center`,
        justifyContent: `center`,
        height: 36,
        margin: 8,
        paddingHorizontal: 8,
        borderWidth: 1,
        borderColor: `#f1e7e7`
    },
    textInput: {
        ...fontStyleTemplate.normalLarge,
        flexGrow: 1,
        textAlign: `left`,
        backgroundColor: `transparent`
    },
    textSearchSuggestion: {
        ...fontStyleTemplate.normalLarge,
        flexGrow: 1,
        textAlign: `left`,
        backgroundColor: `transparent`
    },
    icon: {
        width: 24,
        height: 24,
        backgroundColor: `transparent`
    }
};

const SearchBarInterface = Hf.Interface.augment({
    composites: [
        Hf.React.ComponentComposite
    ],
    state: {
        shade: {
            value: `light`,
            oneOf: [ `light`, `dark` ],
            stronglyTyped: true
        },
        color: {
            value: `default`,
            oneOf: [ `default`, `primary`, `secondary` ],
            stronglyTyped: true
        },
        customTextColor: {
            value: ``,
            stronglyTyped: true
        },
        customIconColor: {
            value: ``,
            stronglyTyped: true
        },
        outlineShape: {
            value: `square`,
            oneOf: [ `square`, `round` ],
            stronglyTyped: true
        },
        placeholder: {
            value: `Search...`,
            stronglyTyped: true
        },
        outlined: {
            value: true,
            stronglyTyped: true
        },
        dropShadowIcon: {
            value: true,
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
        // searchSuggestionSize: {
        //     value: 8,
        //     stronglyTyped: true
        // },
        onSetSearchSuggestion: {
            value: () => {},
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
        onClose: {
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
        }
    },
    setup: function setup (done) {
        const intf = this;

        intf.preUpdateStage((component) => {
            const {
                onSetSearchSuggestion
            } = component.props;
            const searchSuggestionTexts = onSetSearchSuggestion();
            if (Hf.isNonEmptyArray(searchSuggestionTexts)) {
                intf.outgoing(EVENT.ON.ADD_ITEMS_TO_SEARCH_SUGGESTION).emit(() => searchSuggestionTexts);
            }
        });

        done();
    },
    onClear: function onClear () {
        const component = this;
        const intf = component.getInterface();
        const [
            textInput
        ] = component.lookupComponentRefs(
            `textInput`
        );

        textInput.clear();
        intf.outgoing(EVENT.ON.UPDATE_CLEAR_BUTTON_VISIBILITY).emit(() => false);
    },
    onDismissKeyboard: function onDismissKeyboard () {
        dismissKeyboard();
    },
    render: function render () {
        const component = this;
        const intf = component.getInterface();
        const {
            shade,
            color,
            customIconColor,
            customTextColor,
            outlineShape,
            placeholder,
            outlined,
            dropShadowIcon,
            autoCorrect,
            enableSearchSuggestion,
            // searchSuggestionSize,
            style,
            onSearch,
            onSearchChange,
            onClose,
            onFocus,
            onBlur
        } = component.props;
        const {
            focus,
            clearButtonVisible,
            searchSuggestionVisible,
            searchSuggestion
        } = component.state;
        const emptySearchSuggestion = searchSuggestion.items.every((item) => Hf.isEmpty(item.text));
        const themedIconAndTextShade = shade === `light` ? `dark` : `light`;
        const themedIconColor = theme.color.icon.default[themedIconAndTextShade];
        const themedTextColor = theme.color.text[color][themedIconAndTextShade];
        let adjustedStyle = {
            container: outlined ? Hf.merge(DEFAULT_SEARCH_BAR_STYLE.container).with({
                borderWidth: 1,
                borderRadius: outlineShape === `square` ? 0 : 18,
                marginBottom: emptySearchSuggestion ? 8 : -1,
                backgroundColor: theme.color.body.container[shade]
            }) : DEFAULT_SEARCH_BAR_STYLE.container,
            textInput: Hf.merge(DEFAULT_SEARCH_BAR_STYLE.textInput).with({
                color: Hf.isEmpty(customTextColor) ? themedTextColor : customTextColor
            }),
            textSearchSuggestion: DEFAULT_SEARCH_BAR_STYLE.textSearchSuggestion,
            icon: dropShadowIcon ? Hf.merge(DEFAULT_SEARCH_BAR_STYLE.icon).with({
                ...dropShadowStyleTemplate,
                tintColor: Hf.isEmpty(customIconColor) ? themedIconColor : customIconColor
            }) : Hf.merge(DEFAULT_SEARCH_BAR_STYLE.icon).with({
                tintColor: Hf.isEmpty(customIconColor) ? themedIconColor : customIconColor
            })
        };

        adjustedStyle = Hf.isObject(style) ? Hf.merge(adjustedStyle).with(style) : adjustedStyle;

        return (
            <View
                onStartShouldSetResponder = { component.onDismissKeyboard }
                style = {{
                    flexShrink: 1,
                    flexDirection: `column`,
                    alignItems: `flex-start`,
                    justifyContent: `center`,
                    backgroundColor: `transparent`
                }}
            >
            {
                !focus ?
                <View style = {{
                    justifyContent: `center`,
                    alignItems: `center`,
                    height: 36,
                    width: 36,
                    margin: 8,
                    padding: 8,
                    borderRadius: 18,
                    backgroundColor: `transparent`
                }}>
                    <TouchableOpacity onPress = {() => {
                        intf.outgoing(EVENT.ON.UPDATE_SEARCH_BAR_FOCUS).emit(() => true);
                        intf.outgoing(EVENT.ON.UPDATE_SEARCH_SUGGESTION_VISIBILITY).emit(() => !emptySearchSuggestion);
                    }}>
                        <Image
                            resizeMode = 'cover'
                            source = { theme.icon.search }
                            style = { adjustedStyle.icon }
                        />
                    </TouchableOpacity>
                </View> :
                <View style = { adjustedStyle.container }>
                    <TouchableOpacity onPress = {() => {
                        intf.outgoing(
                            EVENT.ON.UPDATE_SEARCH_BAR_FOCUS,
                            EVENT.ON.UPDATE_CLEAR_BUTTON_VISIBILITY,
                            EVENT.ON.UPDATE_SEARCH_SUGGESTION_VISIBILITY
                        ).emit(() => false);
                        intf.outgoing(EVENT.ON.CLEAR_NON_HISTORY_ITEM_FROM_SEARCH_SUGGESTION).emit();
                        onClose();
                        component.onDismissKeyboard();
                    }}>
                        <Image
                            resizeMode = 'cover'
                            source = { theme.icon.goBack }
                            style = { adjustedStyle.icon }
                        />
                    </TouchableOpacity>
                    <TextInput
                        ref = { component.assignComponentRef(`textInput`) }
                        autoFocus = { true }
                        autoCorrect = { autoCorrect }
                        returnKeyType = 'search'
                        onFocus = { () => onFocus() }
                        onBlur = { () => onBlur() }
                        onChange = {(event) => {
                            intf.outgoing(EVENT.ON.CLEAR_NON_HISTORY_ITEM_FROM_SEARCH_SUGGESTION).emit();
                            intf.outgoing(EVENT.ON.UPDATE_CLEAR_BUTTON_VISIBILITY).emit(() => !Hf.isEmpty(event.nativeEvent.text));
                            intf.outgoing(EVENT.ON.UPDATE_SEARCH_SUGGESTION_VISIBILITY).emit(() => !emptySearchSuggestion && !Hf.isEmpty(event.nativeEvent.text));
                            onSearchChange(event);
                        }}
                        onSubmitEditing = {(event) => {
                            if (!Hf.isEmpty(event.nativeEvent.text)) {
                                intf.outgoing(EVENT.ON.ADD_HISTORY_ITEMS_TO_SEARCH_SUGGESTION).emit(() => [ event.nativeEvent.text ]);
                            }
                            intf.outgoing(EVENT.ON.UPDATE_SEARCH_SUGGESTION_VISIBILITY).emit(() => false);
                            onSearch(event);
                        }}
                        placeholder = { placeholder }
                        style = { adjustedStyle.textInput }
                    />
                    {
                        !clearButtonVisible ? null :
                        <TouchableOpacity onPress = { component.onClear }>
                            <Image
                                resizeMode = 'cover'
                                source = { theme.icon.close }
                                style = { adjustedStyle.icon }
                            />
                        </TouchableOpacity>
                    }
                </View>
            }
            {
                focus && enableSearchSuggestion ?
                <AnimatedScrollView
                    animation = { searchSuggestionVisible ? `fadeIn` : `fadeOut` }
                    duration = { 300 }
                    useNativeDriver = { true }
                    style = {{
                        flexDirection: `column`,
                        alignSelf: `stretch`,
                        marginHorizontal: 8,
                        paddingHorizontal: 8,
                        borderWidth: 1,
                        borderColor: `#f1e7e7`,
                        backgroundColor: `transparent`
                    }}>
                {
                    searchSuggestion.items.filter((item) => !Hf.isEmpty(item.text)).map((item, index) => {
                        return (
                            <TouchableOpacity
                                key = { index }
                                onPress = {() => {
                                    const [
                                        textInput
                                    ] = component.lookupComponentRefs(
                                        `textInput`
                                    );
                                    textInput.setNativeProps({
                                        text: item.text
                                    });
                                    intf.outgoing(EVENT.ON.UPDATE_CLEAR_BUTTON_VISIBILITY).emit(() => true);
                                    intf.outgoing(EVENT.ON.UPDATE_SEARCH_SUGGESTION_VISIBILITY).emit(() => false);
                                }}>
                                <View style = {{
                                    flexDirection: `row`,
                                    justifyContent: `center`,
                                    alignSelf: `flex-start`,
                                    alignItems: `center`,
                                    backgroundColor: `transparent`
                                }}>
                                {
                                    item.historyType ?
                                    <Image
                                        resizeMode = 'cover'
                                        source = { theme.icon.restore }
                                        style = { adjustedStyle.icon }
                                    /> :
                                    <Image
                                        resizeMode = 'cover'
                                        source = { theme.icon.search }
                                        style = { adjustedStyle.icon }
                                    />
                                }
                                    <Text style = { adjustedStyle.textSearchSuggestion }>{ item.text }</Text>
                                </View>
                            </TouchableOpacity>
                        );
                    })
                }
                </AnimatedScrollView> : null
            }
            </View>
        );
    }
});

export default SearchBarInterface;

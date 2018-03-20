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
 * @module SearchFieldComponent
 * @description - Search field input component.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 * @flow
 */
'use strict'; // eslint-disable-line

import { Hf } from 'hyperflow';

import { Ht } from '../../hypertoxin';

import React from 'react';

import ReactNative from 'react-native'; // eslint-disable-line

import PropTypes from 'prop-types';

import * as Animatable from 'react-native-animatable';

import { BlurView } from 'react-native-blur';

import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard';

import debouncer from '../../utils/debouncer';

const AnimatedView = Animatable.View;
const AnimatedBlurView = Animatable.createAnimatableComponent(BlurView);

const {
    Component
} = React;

const {
    FlatList
} = ReactNative;

const {
    Dimensions,
    View,
    TextInput
} = ReactNative;

const DEVICE_WIDTH = Dimensions.get(`window`).width;
const DEVICE_HEIGHT = Dimensions.get(`window`).height;

const DEFAULT_FIELD_DEBOUNCE_TIME_MS = 250;

const DEFAULT_ANIMATION_DURATION_MS = 300;

const DEFAULT_HISTORY_ENTRY_COUNT = 8;

const DEFAULT_SEARCH_FIELD_STYLE = {
    container: {
        flexDirection: `column`,
        alignItems: `stretch`,
        alignSelf: `flex-start`,
        justifyContent: `center`,
        maxWidth: DEVICE_WIDTH,
        backgroundColor: `transparent`,
        overflow: `hidden`
    },
    box: {
        ...Ht.Theme.general.dropShadow.shallow,
        flexShrink: 1,
        flexDirection: `row`,
        alignItems: `center`,
        justifyContent: `space-between`,
        minWidth: Ht.Theme.field.size.search.input * 1.25,
        height: Ht.Theme.field.size.search.input * 1.25,
        paddingVertical: 6,
        marginVertical: 6,
        marginHorizontal: DEVICE_WIDTH * 0.015
    },
    room: {
        contentLeft: {
            flexDirection: `row`,
            alignItems: `center`,
            justifyContent: `center`,
            minWidth: Ht.Theme.field.size.search.input,
            maxHeight: Ht.Theme.field.size.search.input,
            backgroundColor: `transparent`
        },
        actionLeft: {
            flexDirection: `row`,
            alignItems: `center`,
            justifyContent: `center`,
            minWidth: Ht.Theme.field.size.search.input,
            maxHeight: Ht.Theme.field.size.search.input,
            backgroundColor: `transparent`
        },
        actionRight: {
            flexDirection: `row`,
            alignItems: `center`,
            justifyContent: `center`,
            minWidth: Ht.Theme.field.size.search.input,
            maxHeight: Ht.Theme.field.size.search.input,
            backgroundColor: `transparent`
        },
        filler: {
            width: Ht.Theme.field.size.search.input,
            height: Ht.Theme.field.size.search.input,
            backgroundColor: `transparent`
        }
    },
    input: {
        ...Ht.Theme.field.font.search.input,
        flexGrow: 1,
        textAlign: `left`,
        minHeight: Ht.Theme.field.size.search.input,
        paddingVertical: 0,
        marginVertical: 0,
        backgroundColor: `transparent`
    },
    hint: {
        ...Ht.Theme.field.font.search.hint,
        textAlign: `left`,
        color: Ht.Theme.field.color.search.hint
    },
    suggestion: {
        ...Ht.Theme.general.dropShadow.shallow,
        flexShrink: 1,
        flexDirection: `column`,
        alignItems: `stretch`,
        justifyContent: `center`,
        maxHeight: DEVICE_HEIGHT / 3,
        height: 0,
        borderRadius: 4,
        marginHorizontal: 6
    }
};

const fetchAutocompletions = async function fetchAutocompletions (value, getAutocompletions) {
    const component = this;

    if (Hf.DEVELOPMENT) {
        if (!Hf.isString(value)) {
            Hf.log(`error`, `fetchAutocompletions - Input component reference name is invalid.`);
        } else if (!Hf.isFunction(getAutocompletions)) {
            Hf.log(`error`, `fetchAutocompletions - Input get autocompletions callback is invalid.`);
        }

        try {
            const autocompleteTexts = await getAutocompletions(value);

            if (Hf.isNonEmptyArray(autocompleteTexts)) {
                component.setState((prevState) => {
                    return {
                        suggestion: {
                            ...prevState.suggestion,
                            visible: true,
                            wasVisibled: prevState.suggestion.visible,
                            autocompletes: [
                                ...new Set(autocompleteTexts.filter((autocompleteText) => Hf.isString(autocompleteText)))
                            ].map((autocompleteText) => {
                                return {
                                    historyType: false,
                                    value: autocompleteText
                                };
                            })
                        }
                    };
                });
            } else {
                component.setState((prevState) => {
                    return {
                        suggestion: {
                            ...prevState.suggestion,
                            visible: false,
                            wasVisibled: prevState.suggestion.visible,
                            autocompletes: []
                        }
                    };
                });
            }
        } catch(error) {
            Hf.log(`warn1`, `SearchFieldComponent.onEditting.fetchAutocompletions - Error occured while awaiting for autocompletions.`);
        }
    } else {
        const autocompleteTexts = await getAutocompletions(value);

        if (Hf.isNonEmptyArray(autocompleteTexts)) {
            component.setState((prevState) => {
                return {
                    suggestion: {
                        ...prevState.suggestion,
                        visible: true,
                        wasVisibled: prevState.suggestion.visible,
                        autocompletes: [
                            ...new Set(autocompleteTexts.filter((autocompleteText) => Hf.isString(autocompleteText)))
                        ].map((autocompleteText) => {
                            return {
                                historyType: false,
                                value: autocompleteText
                            };
                        })
                    }
                };
            });
        } else {
            component.setState((prevState) => {
                return {
                    suggestion: {
                        ...prevState.suggestion,
                        visible: false,
                        wasVisibled: prevState.suggestion.visible,
                        autocompletes: []
                    }
                };
            });
        }
    }
};

export default class SearchFieldComponent extends Component {
    static propTypes = {
        shade: PropTypes.oneOf([ `light`, `dark` ]),
        overlay: PropTypes.oneOf([ `opaque`, `frosted`, `translucent` ]),
        corner: PropTypes.oneOf([ `round25`, `round50`, `square` ]),
        dropShadowed: PropTypes.bool,
        autoFocus: PropTypes.bool,
        autoCorrect: PropTypes.bool,
        suggestive: PropTypes.bool,
        initiallyHidden: PropTypes.bool,
        initiallyCollapsed: PropTypes.bool,
        hint: PropTypes.string,
        debounceTime: PropTypes.number,
        onSearch: PropTypes.func,
        onGetAutocompletions: PropTypes.func,
        onFocus: PropTypes.func,
        onBlur: PropTypes.func,
        onCollapse: PropTypes.func,
        onExpand: PropTypes.func
    }
    static defaultProps = {
        shade: Ht.Theme.field.search.shade,
        overlay: Ht.Theme.field.search.overlay,
        corner: Ht.Theme.field.search.corner,
        dropShadowed: Ht.Theme.field.search.dropShadowed,
        autoFocus: false,
        autoCorrect: true,
        suggestive: true,
        initiallyHidden: false,
        initiallyCollapsed: false,
        hint: ``,
        debounceTime: DEFAULT_FIELD_DEBOUNCE_TIME_MS,
        onSearch: () => null,
        onGetAutocompletions: () => null,
        onFocus: () => null,
        onBlur: () => null,
        onCollapse: () => null,
        onExpand: () => null,
        onHide: () => null,
        onShow: () => null,
        renderSuggestionEntry: (entry) => null // eslint-disable-line
    }
    constructor (property) {
        super(property);
        this.refCache = {};
        this.debounce = null;
        this.state = {
            hidden: property.initiallyHidden,
            collapsed: property.initiallyCollapsed,
            adjustedStyle: DEFAULT_SEARCH_FIELD_STYLE,
            input: {
                focused: false,
                value: ``
            },
            box: {
                width: 0,
                height: Ht.Theme.field.size.search.input * 1.25
            },
            suggestion: {
                visible: false,
                wasVisibled: false,
                supressedAutocompletion: false,
                historyEntryIndex: 0,
                historyEntryRollOverCount: 0,
                histories: [],
                autocompletes: []
            }
        };
    }
    /**
     * @description - Helper method to readjust current style.
     *
     * @method _readjustStyle
     * @param {object} newStyle
     * @returns {object}
     * @private
     */
    _readjustStyle = (newStyle = {
        shade: Ht.Theme.field.search.shade,
        overlay: Ht.Theme.field.search.overlay,
        corner: Ht.Theme.field.search.corner,
        dropShadowed: Ht.Theme.field.search.dropShadowed,
        hidden: false,
        collapsed: false
    }) => {
        const component = this;
        const {
            shade,
            overlay,
            corner,
            dropShadowed,
            hidden,
            collapsed,
            style
        } = Hf.fallback({
            shade: Ht.Theme.field.search.shade,
            overlay: Ht.Theme.field.search.overlay,
            corner: Ht.Theme.field.search.corner,
            dropShadowed: Ht.Theme.field.search.dropShadowed,
            hidden: false,
            collapsed: false
        }).of(newStyle);
        const {
            adjustedStyle: prevAdjustedStyle
        } = component.state;
        let themedColor;
        let themedInputColor;

        switch (overlay) { // eslint-disable-line
        case `opaque`:
            themedColor = Ht.Theme.field.color.search.box[shade];
            break;
        case `frosted`:
            themedColor = `transparent`;
            break;
        case `translucent`:
            themedColor = `${Ht.Theme.field.color.search.box[shade]}${Ht.Theme.field.color.search.opacity}`;
            break;
        }

        themedInputColor = Ht.Theme.field.color.search.input[shade];

        const adjustedStyle = Hf.merge(prevAdjustedStyle).with({
            box: {
                width: collapsed ? Ht.Theme.field.size.search.input * 1.25 : DEVICE_WIDTH * 0.97,
                borderRadius: Ht.Theme.field.corner.search[corner],
                opacity: hidden ? 0 : 1,
                shadowOpacity: dropShadowed ? Ht.Theme.general.dropShadow.shallow.shadowOpacity : 0,
                backgroundColor: themedColor
            },
            input: {
                color: themedInputColor
            },
            suggestion: {
                shadowOpacity: dropShadowed ? Ht.Theme.general.dropShadow.shallow.shadowOpacity : 0,
                backgroundColor: themedColor
            }
        });

        return Hf.isObject(style) ? Hf.merge(adjustedStyle).with({
            container: style
        }) : adjustedStyle;
    }
    /**
     * @description - Assign the registered component's reference object.
     *
     * @method assignComponentRef
     * @param {string} refName
     * @returns function
     */
    assignComponentRef = (refName) => {
        const component = this;

        if (Hf.DEVELOPMENT) {
            if (!Hf.isString(refName)) {
                Hf.log(`error`, `SearchFieldComponent.assignComponentRef - Input component reference name is invalid.`);
            }
        }

        /* helper function to set component ref */
        const setComponentRef = function setComponentRef (componentRef) {
            component.refCache[refName] = Hf.isDefined(componentRef) ? componentRef : null;
        };
        return setComponentRef;
    }
    /**
     * @description - Lookup the registered component's reference object.
     *
     * @method lookupComponentRefs
     * @param {array} refNames
     * @returns {array}
     */
    lookupComponentRefs = (...refNames) => {
        const component = this;
        let componentRefs = [];

        if (!Hf.isEmpty(refNames)) {
            if (Hf.DEVELOPMENT) {
                if (!refNames.every((refName) => Hf.isString(refName))) {
                    Hf.log(`error`, `SearchFieldComponent.lookupComponentRefs - Input component reference name is invalid.`);
                } else if (!refNames.every((refName) => component.refCache.hasOwnProperty(refName))) {
                    Hf.log(`error`, `SearchFieldComponent.lookupComponentRefs - Component reference is not found.`);
                }
            }

            componentRefs = Hf.collect(...refNames).from(component.refCache);
        } else {
            Hf.log(`error`, `SearchFieldComponent.lookupComponentRefs - Input component reference name array is empty.`);
        }

        return componentRefs;
    }
    isCollapsed = () => {
        const component = this;
        const {
            collapsed
        } = component.state;

        return collapsed;
    }
    isHidden = () => {
        const component = this;
        const {
            hidden
        } = component.state;

        return hidden;
    }
    collapse = (option = {
        duration: DEFAULT_ANIMATION_DURATION_MS,
        easing: `ease-out-cubic`
    }) => {
        const component = this;
        const {
            duration,
            easing
        } = Hf.fallback({
            duration: DEFAULT_ANIMATION_DURATION_MS,
            easing: `ease-out-cubic`
        }).of(option);
        const {
            onCollapse
        } = component.props;
        const {
            collapsed
        } = component.state;
        const [ animatedBoxView
        ] = component.lookupComponentRefs(`animated-box-view`);

        if (!collapsed) {
            animatedBoxView.transitionTo({
                width: Ht.Theme.field.size.search.input * 1.25
            }, duration, easing);
            component.setState((prevState) => {
                return {
                    collapsed: true,
                    suggestion: {
                        ...prevState.suggestion,
                        visible: false,
                        wasVisibled: prevState.suggestion.visible
                    }
                };
            }, () => {
                onCollapse();
            });
        }
    }
    expand = (option = {
        duration: DEFAULT_ANIMATION_DURATION_MS,
        easing: `ease-in-cubic`
    }) => {
        const component = this;
        const {
            duration,
            easing
        } = Hf.fallback({
            duration: DEFAULT_ANIMATION_DURATION_MS,
            easing: `ease-in-cubic`
        }).of(option);
        const {
            onExpand
        } = component.props;
        const {
            collapsed
        } = component.state;
        const [ animatedBoxView ] = component.lookupComponentRefs(`animated-box-view`);

        if (collapsed) {
            animatedBoxView.transitionTo({
                width: DEVICE_WIDTH * 0.97
            }, duration, easing);
            component.setState(() => {
                return {
                    collapsed: false
                };
            }, () => {
                onExpand();
            });
        }
    }
    show = (option = {
        duration: DEFAULT_ANIMATION_DURATION_MS,
        easing: `ease-in-cubic`
    }) => {
        const component = this;
        const {
            duration,
            easing
        } = Hf.fallback({
            duration: DEFAULT_ANIMATION_DURATION_MS,
            easing: `ease-in-cubic`
        }).of(option);
        const {
            onShow
        } = component.props;
        const {
            hidden
        } = component.state;
        const [ animatedBoxView ] = component.lookupComponentRefs(`animated-box-view`);

        if (hidden) {
            animatedBoxView.transitionTo({
                opacity: 1
            }, duration, easing);
            component.setState(() => {
                return {
                    hidden: false
                };
            }, () => {
                onShow();
            });
        }
    }
    hide = (option = {
        duration: DEFAULT_ANIMATION_DURATION_MS,
        easing: `ease-out-cubic`
    }) => {
        const component = this;
        const {
            duration,
            easing
        } = Hf.fallback({
            duration: DEFAULT_ANIMATION_DURATION_MS,
            easing: `ease-out-cubic`
        }).of(option);
        const {
            onHide
        } = component.props;
        const {
            hidden
        } = component.state;
        const [ animatedBoxView ] = component.lookupComponentRefs(`animated-box-view`);

        if (!hidden) {
            animatedBoxView.transitionTo({
                opacity: 0
            }, duration, easing);
            component.setState((prevState) => {
                return {
                    hidden: true,
                    suggestion: {
                        ...prevState.suggestion,
                        visible: false,
                        wasVisibled: prevState.suggestion.visible
                    }
                };
            }, () => {
                onHide();
            });
        }
    }
    clear = () => {
        const component = this;
        const [ textInput ] = component.lookupComponentRefs(`text-input`);

        component.setState((prevState) => {
            return {
                input: {
                    ...prevState.input,
                    value: ``
                },
                suggestion: {
                    ...prevState.suggestion,
                    visible: false,
                    wasVisibled: prevState.suggestion.visible
                }
            };
        }, () => {
            textInput.clear();
        });
    }
    clearSuggestion = () => {
        const component = this;

        component.setState(() => {
            return {
                suggestion: {
                    visible: false,
                    wasVisibled: false,
                    supressedAutocompletion: false,
                    historyEntryIndex: 0,
                    histories: [],
                    autocompletes: []
                }
            };
        });
    }
    onFocus = () => {
        const component = this;
        const {
            onFocus
        } = component.props;

        component.setState((prevState) => {
            return {
                input: {
                    ...prevState.input,
                    focused: true
                }
            };
        }, () => {
            onFocus();
        });
    }
    onBlur = () => {
        const component = this;
        const {
            onBlur
        } = component.props;

        component.setState((prevState) => {
            return {
                input: {
                    ...prevState.input,
                    focused: false
                }
            };
        }, () => {
            onBlur();
        });
    }
    onChangeText = (text) => {
        const component = this;
        const {
            suggestive,
            onGetAutocompletions
        } = component.props;
        const {
            suggestion
        } = component.state;
        const value = text;

        if (!Hf.isEmpty(value)) {
            if (suggestive && !suggestion.supressedAutocompletion) {
                fetchAutocompletions.call(component, value, onGetAutocompletions);
            }
            component.setState((prevState) => {
                return {
                    input: {
                        ...prevState.input,
                        value
                    },
                    suggestion: {
                        ...prevState.suggestion,
                        supressedAutocompletion: false
                    }
                };
            });
        } else {
            component.setState((prevState) => {
                return {
                    input: {
                        ...prevState.input,
                        value
                    },
                    suggestion: {
                        ...prevState.suggestion,
                        visible: false,
                        wasVisibled: prevState.suggestion.visible,
                        supressedAutocompletion: false
                    }
                };
            });
        }
    }
    onSubmitEditing = (event) => {
        const component = this;
        const {
            onSearch
        } = component.props;
        const {
            suggestion
        } = component.state;
        const value = event.nativeEvent.text;

        if (!Hf.isEmpty(value) && !suggestion.histories.some((entry) => entry.value === value)) {
            component.setState((prevState) => {
                let {
                    historyEntryIndex,
                    histories
                } = prevState.suggestion;

                if (historyEntryIndex === DEFAULT_HISTORY_ENTRY_COUNT) {
                    historyEntryIndex = 0;
                }
                if (historyEntryIndex === histories.length) {
                    histories.push({
                        historyType: true,
                        value,
                        timestamp: new Date().getTime()
                    });
                } else if (historyEntryIndex < histories.length) {
                    histories[historyEntryIndex] = {
                        historyType: true,
                        value,
                        timestamp: new Date().getTime()
                    };
                }
                historyEntryIndex++;
                histories = histories.sort((itemA, itemB) => itemB.timestamp - itemA.timestamp);

                return {
                    suggestion: {
                        ...prevState.suggestion,
                        visible: false,
                        wasVisibled: prevState.suggestion.visible,
                        supressedAutocompletion: true,
                        historyEntryIndex,
                        histories
                    }
                };
            }, () => {
                onSearch(value);
            });
        } else {
            component.setState((prevState) => {
                return {
                    suggestion: {
                        ...prevState.suggestion,
                        visible: false,
                        wasVisibled: prevState.suggestion.visible,
                        supressedAutocompletion: true
                    }
                };
            });
        }
    }
    onPressSelectAndSubmitSuggestionEntry = (entry) => {
        const component = this;
        const {
            suggestion
        } = component.state;

        if (suggestion.visible) {
            const {
                onSearch
            } = component.props;

            setTimeout(() => {
                if (!suggestion.histories.some((_entry) => _entry.value === entry.value)) {
                    component.setState((prevState) => {
                        let {
                            historyEntryIndex,
                            histories
                        } = prevState.suggestion;

                        if (historyEntryIndex === DEFAULT_HISTORY_ENTRY_COUNT) {
                            historyEntryIndex = 0;
                        }
                        if (historyEntryIndex === histories.length) {
                            histories.push({
                                historyType: true,
                                value: entry.value,
                                timestamp: new Date().getTime()
                            });
                        } else if (historyEntryIndex < histories.length) {
                            histories[historyEntryIndex] = {
                                historyType: true,
                                value: entry.value,
                                timestamp: new Date().getTime()
                            };
                        }
                        historyEntryIndex++;
                        histories = histories.sort((itemA, itemB) => itemB.timestamp - itemA.timestamp);

                        return {
                            input: {
                                ...prevState.input,
                                value: entry.value
                            },
                            suggestion: {
                                ...prevState.suggestion,
                                visible: false,
                                wasVisibled: prevState.suggestion.visible,
                                supressedAutocompletion: true,
                                historyEntryIndex,
                                histories
                            }
                        };
                    }, () => {
                        onSearch(entry.value);
                    });
                } else {
                    component.setState((prevState) => {
                        return {
                            input: {
                                ...prevState.input,
                                value: entry.value
                            },
                            suggestion: {
                                ...prevState.suggestion,
                                visible: false,
                                wasVisibled: prevState.suggestion.visible,
                                supressedAutocompletion: true,
                                autocompletes: []
                            }
                        };
                    }, () => {
                        onSearch(entry.value);
                    });
                }
            }, DEFAULT_ANIMATION_DURATION_MS);
        }
    }
    onPressSelectSuggestionEntry = (entry) => {
        const component = this;
        const {
            suggestion
        } = component.state;

        if (suggestion.visible) {
            component.setState((prevState) => {
                return {
                    input: {
                        ...prevState.input,
                        value: entry.value
                    },
                    suggestion: {
                        ...prevState.suggestion,
                        supressedAutocompletion: true
                    }
                };
            });
        }
    }
    componentWillMount () {
        const component = this;
        const {
            shade,
            overlay,
            corner,
            dropShadowed,
            initiallyHidden,
            initiallyCollapsed,
            debounceTime,
            style
        } = component.props;

        component.debounce = debouncer(debounceTime);
        component.setState(() => {
            return {
                hidden: initiallyHidden,
                collapsed: initiallyCollapsed,
                adjustedStyle: component._readjustStyle({
                    shade,
                    overlay,
                    corner,
                    dropShadowed,
                    hidden: initiallyHidden,
                    collapsed: initiallyCollapsed,
                    style
                })
            };
        });
    }
    componentDidUpdate () {
        const component = this;
        const {
            suggestive
        } = component.props;
        const {
            hidden,
            collapsed
        } = component.state;

        if (suggestive && !(collapsed || hidden)) {
            const [ animatedSuggestionView ] = component.lookupComponentRefs(`animated-suggestion-view`);
            const {
                suggestion
            } = component.state;

            if (suggestion.visible && !suggestion.wasVisibled) {
                animatedSuggestionView.transitionTo({
                    opacity: 1,
                    height: DEVICE_HEIGHT / 2
                }, DEFAULT_ANIMATION_DURATION_MS, `ease-in-cubic`);
            } else if (!suggestion.visible && suggestion.wasVisibled) {
                animatedSuggestionView.transitionTo({
                    opacity: 0,
                    height: 0
                }, DEFAULT_ANIMATION_DURATION_MS, `ease-out-cubic`);
            }
        }
    }
    componentWillUnMount () {
        const component = this;

        component.debounce = null;
        component.refCache = {};
    }
    componentWillReceiveProps () {
        const component = this;
        const {
            shade,
            overlay,
            corner,
            dropShadowed,
            style
        } = component.props;
        const {
            hidden,
            collapsed
        } = component.state;

        component.setState(() => {
            return {
                adjustedStyle: component._readjustStyle({
                    shade,
                    overlay,
                    corner,
                    dropShadowed,
                    hidden,
                    collapsed,
                    style
                })
            };
        }, () => {
            if (hidden) {
                component.hide();
            } else {
                component.show();
            }
            if (collapsed) {
                component.collapse();
            } else {
                component.expand();
            }
        });
    }
    renderInput () {
        const component = this;
        const {
            autoFocus,
            autoCorrect,
            hint
        } = component.props;

        const {
            hidden,
            collapsed,
            adjustedStyle,
            input
        } = component.state;

        return !(collapsed || hidden) ? (
            <TextInput
                ref = { component.assignComponentRef(`text-input`) }
                style = { adjustedStyle.input }
                keyboardType = 'default'
                returnKeyType = 'search'
                // underlineColorAndroid = 'transparent'
                autoFocus = { autoFocus }
                autoCorrect = { autoCorrect }
                defaultValue = { input.value }
                placeholder = { hint }
                placeholderTextColor = { adjustedStyle.hint.color }
                // placeholderColor = { adjustedStyle.hint.color }
                onFocus = { component.onFocus }
                onBlur = { component.onBlur }
                // onChangeText = { component.onChangeText }
                onChangeText = {(text) => component.debounce(component.onChangeText, text)}
                onSubmitEditing = { component.onSubmitEditing }
            />
        ) : null;
    }
    renderSuggestionEntries () {
        const component = this;
        const {
            suggestive,
            renderSuggestionEntry
        } = component.props;
        const {
            hidden,
            collapsed,
            adjustedStyle,
            input,
            suggestion
        } = component.state;
        let suggestionEntries = suggestion.histories.filter((entry) => {
            return entry.value.toLowerCase().charAt(0) === input.value.toLowerCase().charAt(0);
        }).concat(suggestion.autocompletes);

        suggestionEntries = suggestionEntries.map((entry, index) => {
            return {
                key: `${index}`,
                ...entry
            };
        });

        return suggestive && !(collapsed || hidden) ? (
            <AnimatedView
                ref = { component.assignComponentRef(`animated-suggestion-view`) }
                style = { adjustedStyle.suggestion }
                pointerEvents = 'box-none'
                duration = { DEFAULT_ANIMATION_DURATION_MS }
                useNativeDriver = { false }
            >
                <FlatList
                    data = { suggestionEntries }
                    style = {{
                        paddingVertical: 6,
                        backgroundColor: `transparent`
                    }}
                    renderItem = {(listData) => {
                        const entry = listData.item;

                        return renderSuggestionEntry(
                            entry,
                            () => component.debounce(component.onPressSelectAndSubmitSuggestionEntry, entry),
                            () => component.debounce(component.onPressSelectSuggestionEntry, entry),
                        );
                    }}
                />
            </AnimatedView>
        ) : null;
    }
    render () {
        const component = this;
        const {
            shade,
            overlay,
            autoFocus,
            onSearch,
            children
        } = component.props;
        const {
            hidden,
            collapsed,
            adjustedStyle,
            input
        } = component.state;
        const frosted = overlay === `frosted`;
        const fieldChildProperty = {
            shade
            // color: adjustedStyle.input.color
        };
        let fieldContentLeftChildren = null;
        let fieldActionLeftChildren = null;
        let fieldActionRightChildren = null;

        if (React.Children.count(children) > 0) {
            let fragments = React.Children.toArray(React.Children.map(children, (child) => {
                const {
                    room,
                    action
                } = child.props;

                if (child !== null) {
                    if (Hf.isString(room) && room === `content-left`) {
                        return React.cloneElement(child, fieldChildProperty);
                    } else if (Hf.isString(room) && Hf.isString(action) && (room === `action-left` || room === `action-right`)) {
                        switch (action) {
                        case `search`:
                            if (!(collapsed || hidden)) {
                                return React.cloneElement(child, {
                                    ...fieldChildProperty,
                                    onPress: () => component.debounce(onSearch)
                                });
                            } else {
                                return null;
                            }
                        case `clear`:
                            if (!Hf.isEmpty(input.value) && !(collapsed || hidden)) {
                                return React.cloneElement(child, {
                                    ...fieldChildProperty,
                                    onPress: () => component.debounce(component.clear)
                                });
                            } else {
                                return null;
                            }
                        case `expand`:
                            if (collapsed && !hidden) {
                                return React.cloneElement(child, {
                                    ...fieldChildProperty,
                                    onPress: () => component.debounce(component.expand)
                                });
                            } else {
                                return null;
                            }
                        case `collapse`:
                            if (!(collapsed || hidden)) {
                                return React.cloneElement(child, {
                                    ...fieldChildProperty,
                                    onPress: () => component.debounce(component.collapse)
                                });
                            } else {
                                return null;
                            }
                        case `show`:
                            if (collapsed && !hidden) {
                                return React.cloneElement(child, {
                                    ...fieldChildProperty,
                                    onPress: () => component.debounce(component.show)
                                });
                            } else {
                                return null;
                            }
                        case `hide`:
                            if (!(collapsed || hidden)) {
                                return React.cloneElement(child, {
                                    ...fieldChildProperty,
                                    onPress: () => component.debounce(component.hide)
                                });
                            } else {
                                return null;
                            }
                        default:
                            return null;
                        }
                    } else {
                        Hf.log(`warn1`, `SearchFieldComponent.render - Search field component requires children each to have a room and action propperties.`);
                        return null;
                    }
                } else {
                    return null;
                }
            }));
            fieldContentLeftChildren = fragments.filter((child) => {
                if (child !== null) {
                    const {
                        room
                    } = child.props;

                    return room === `content-left`;
                } else {
                    return false;
                }
            });
            fieldContentLeftChildren = Hf.isEmpty(fieldContentLeftChildren) ? null : fieldContentLeftChildren;

            fieldActionLeftChildren = fragments.filter((child) => {
                if (child !== null) {
                    const {
                        room
                    } = child.props;

                    return room === `action-left`;
                } else {
                    return false;
                }
            });
            fieldActionLeftChildren = Hf.isEmpty(fieldActionLeftChildren) ? null : fieldActionLeftChildren;

            fieldActionRightChildren = fragments.filter((child) => {
                if (child !== null) {
                    const {
                        room
                    } = child.props;

                    return room === `action-right`;
                } else {
                    return false;
                }
            });
            fieldActionRightChildren = Hf.isEmpty(fieldActionRightChildren) || collapsed ? null : fieldActionRightChildren;
        }

        if (frosted) {
            return (
                <View
                    ref = { component.assignComponentRef(`container-view`) }
                    style = { adjustedStyle.container }
                    onStartShouldSetResponder = {() => {
                        if (!autoFocus) {
                            dismissKeyboard();
                        }
                    }}
                >
                    <AnimatedBlurView
                        ref = { component.assignComponentRef(`animated-box-view`) }
                        style = { adjustedStyle.box }
                        blurType = { shade }
                        blurAmount = { Ht.Theme.general.frostLevel }
                        useNativeDriver = { false }
                    >
                        {
                            fieldContentLeftChildren === null ? <View style = {{
                                ...adjustedStyle.room.filler,
                                width: 0
                            }}/> : <View style = { adjustedStyle.room.contentLeft }>
                                {
                                    fieldContentLeftChildren
                                }
                            </View>
                        }
                        {
                            fieldActionLeftChildren === null ? <View style = { adjustedStyle.room.filler }/> : <View style = { adjustedStyle.room.actionLeft }>
                                {
                                    fieldActionLeftChildren
                                }
                            </View>
                        }
                        {
                            component.renderInput()
                        }
                        {
                            fieldActionRightChildren === null ? <View style = { adjustedStyle.room.filler }/> : <View style = { adjustedStyle.room.actionRight }>
                                {
                                    fieldActionRightChildren
                                }
                            </View>
                        }
                    </AnimatedBlurView>
                    {
                        component.renderSuggestionEntries()
                    }
                </View>
            );
        } else {
            return (
                <View
                    ref = { component.assignComponentRef(`container-view`) }
                    style = { adjustedStyle.container }
                    onStartShouldSetResponder = {() => {
                        if (!autoFocus) {
                            dismissKeyboard();
                        }
                    }}
                >
                    <AnimatedView
                        ref = { component.assignComponentRef(`animated-box-view`) }
                        style = { adjustedStyle.box }
                        duration = { DEFAULT_ANIMATION_DURATION_MS }
                        useNativeDriver = { false }
                    >
                        {
                            fieldActionLeftChildren === null ? <View style = { adjustedStyle.room.filler }/> : <View style = { adjustedStyle.room.actionLeft }>
                                {
                                    fieldActionLeftChildren
                                }
                            </View>
                        }
                        {
                            component.renderInput()
                        }
                        {
                            fieldActionRightChildren === null ? <View style = { adjustedStyle.room.filler }/> : <View style = { adjustedStyle.room.actionRight }>
                                {
                                    fieldActionRightChildren
                                }
                            </View>
                        }
                    </AnimatedView>
                    {
                        component.renderSuggestionEntries()
                    }
                </View>
            );
        }
    }
}

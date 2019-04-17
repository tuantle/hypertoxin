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
 * @module SearchField
 * @description - Search field input component.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 * @flow
 */
'use strict'; // eslint-disable-line

import React from 'react';

import ReactNative from 'react-native'; // eslint-disable-line

import PropTypes from 'prop-types';

import { View as AnimatedView } from 'react-native-animatable';

import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard';

import {
    DefaultTheme,
    DefaultThemeContext
} from '../../themes/default-theme';

const {
    FlatList
} = ReactNative;

const {
    Dimensions,
    TextInput
} = ReactNative;

const DEVICE_WIDTH = Dimensions.get(`window`).width;
const DEVICE_HEIGHT = Dimensions.get(`window`).height;

const DEFAULT_ANIMATION_DURATION_MS = 300;

const DEFAULT_SUGGESTION_HISTORY_ITEM_COUNT = 8;

const DEFAULT_DROP_SHADOW_STYLE = {
    shadowColor: DefaultTheme.color.palette.black,
    shadowRadius: 2,
    shadowOpacity: 0.3,
    shadowOffset: {
        width: 0,
        height: 1
    }
};

const DEFAULT_SEARCH_FIELD_STYLE = {
    small: {
        container: {
            flexShrink: 1,
            flexDirection: `column`,
            alignSelf: `stretch`,
            alignItems: `stretch`,
            justifyContent: `center`,
            width: `100%`,
            maxWidth: DEVICE_WIDTH,
            zIndex: 10,
            backgroundColor: `transparent`,
            overflow: `hidden`
        },
        box: {
            focused: {
                flexDirection: `row`,
                alignItems: `center`,
                justifyContent: `space-between`,
                height: DefaultTheme.field.size.search.input.small + 6,
                paddingVertical: 3,
                paddingHorizontal: 3
            },
            blurred: {
                flexDirection: `row`,
                alignItems: `center`,
                justifyContent: `space-between`,
                height: DefaultTheme.field.size.search.input.small + 6,
                paddingVertical: 3,
                paddingHorizontal: 3
            }
        },
        contentLeftRoom: {
            flexDirection: `row`,
            alignItems: `center`,
            justifyContent: `center`,
            backgroundColor: `transparent`
        },
        contentRightRoom: {
            flexDirection: `row`,
            alignItems: `center`,
            justifyContent: `center`,
            backgroundColor: `transparent`
        },
        input: {
            ...DefaultTheme.field.font.search.input.small,
            flexGrow: 1,
            textAlign: `left`,
            height: DefaultTheme.field.size.search.input.small,
            backgroundColor: `transparent`
        },
        suggestion: {
            position: `absolute`,
            flexDirection: `column`,
            alignItems: `stretch`,
            justifyContent: `center`,
            width: DEVICE_WIDTH,
            height: DEVICE_HEIGHT,
            zIndex: 10,
            transform: [{
                translateY: DEVICE_HEIGHT
            }]
        }
    },
    normal: {
        container: {
            flexShrink: 1,
            flexDirection: `column`,
            alignSelf: `stretch`,
            alignItems: `stretch`,
            justifyContent: `center`,
            width: `100%`,
            maxWidth: DEVICE_WIDTH,
            zIndex: 10,
            backgroundColor: `transparent`,
            overflow: `hidden`
        },
        box: {
            focused: {
                flexDirection: `row`,
                alignItems: `center`,
                justifyContent: `space-between`,
                height: DefaultTheme.field.size.search.input.normal + 6,
                paddingVertical: 3,
                paddingHorizontal: 3
            },
            blurred: {
                flexDirection: `row`,
                alignItems: `center`,
                justifyContent: `space-between`,
                height: DefaultTheme.field.size.search.input.normal + 6,
                paddingVertical: 3,
                paddingHorizontal: 3
            }
        },
        contentLeftRoom: {
            flexDirection: `row`,
            alignItems: `center`,
            justifyContent: `center`,
            backgroundColor: `transparent`
        },
        contentRightRoom: {
            flexDirection: `row`,
            alignItems: `center`,
            justifyContent: `center`,
            backgroundColor: `transparent`
        },
        input: {
            ...DefaultTheme.field.font.search.input.normal,
            flexGrow: 1,
            textAlign: `left`,
            height: DefaultTheme.field.size.search.input.normal,
            backgroundColor: `transparent`
        },
        suggestion: {
            position: `absolute`,
            flexDirection: `column`,
            alignItems: `stretch`,
            justifyContent: `center`,
            width: DEVICE_WIDTH,
            height: DEVICE_HEIGHT,
            zIndex: 10,
            transform: [{
                translateY: DEVICE_HEIGHT
            }]
        }
    },
    large: {
        container: {
            flexShrink: 1,
            flexDirection: `column`,
            alignSelf: `stretch`,
            alignItems: `stretch`,
            justifyContent: `center`,
            width: `100%`,
            maxWidth: DEVICE_WIDTH,
            zIndex: 10,
            backgroundColor: `transparent`,
            overflow: `hidden`
        },
        box: {
            focused: {
                flexDirection: `row`,
                alignItems: `center`,
                justifyContent: `space-between`,
                height: DefaultTheme.field.size.search.input.large + 6,
                paddingVertical: 3,
                paddingHorizontal: 3
            },
            blurred: {
                flexDirection: `row`,
                alignItems: `center`,
                justifyContent: `space-between`,
                height: DefaultTheme.field.size.search.input.large + 6,
                paddingVertical: 3,
                paddingHorizontal: 3
            }
        },
        contentLeftRoom: {
            flexDirection: `row`,
            alignItems: `center`,
            justifyContent: `center`,
            backgroundColor: `transparent`
        },
        contentRightRoom: {
            flexDirection: `row`,
            alignItems: `center`,
            justifyContent: `center`,
            backgroundColor: `transparent`
        },
        input: {
            ...DefaultTheme.field.font.search.input.large,
            flexGrow: 1,
            textAlign: `left`,
            height: DefaultTheme.field.size.search.input.large,
            backgroundColor: `transparent`
        },
        suggestion: {
            position: `absolute`,
            flexDirection: `column`,
            alignItems: `stretch`,
            justifyContent: `center`,
            width: DEVICE_WIDTH,
            height: DEVICE_HEIGHT,
            zIndex: 10,
            transform: [{
                translateY: DEVICE_HEIGHT
            }]
        }
    }
};

const isEmptyInputValue = (value) => {
    if (typeof value === `object`) {
        return Object.getOwnPropertyNames(value).length === 0;
    } else if (Array.isArray(value) || typeof value === `string`) {
        return value.length === 0;
    }
    return true;
};

const readjustStyle = (newStyle = {
    shade: `themed`,
    overlay: `themed`,
    corner: `themed`,
    margin: `themed`,
    dropShadowed: `themed`
}, prevAdjustedStyle = DEFAULT_SEARCH_FIELD_STYLE, Theme = DefaultTheme) => {
    const {
        shade,
        overlay,
        corner,
        margin,
        dropShadowed,
        style
    } = newStyle;
    const themedShade = shade === `themed` ? Theme.field.search.shade : shade;
    const themedOverlay = overlay === `themed` ? Theme.field.search.overlay : overlay;
    const themedSuggestionColor = Theme.field.color.search.box[themedShade];
    const nullMargin = {
        margin: null,
        marginTop: null,
        marginBottom: null,
        marginLeft: null,
        marginRight: null,
        marginHorizontal: null,
        marginVertical: null
    };
    const nullBorderRadius = {
        borderTopLeftRadius: null,
        borderTopRightRadius: null,
        borderBottomLeftRadius: null,
        borderBottomRightRadius: null
    };
    let themedColor;
    let themedBorderRadius;
    let themedBoxBorderWidth = 0;
    let themedBoxBorderFocusColor;
    let themedBoxBorderBlurColor;
    let themedInputColor;
    let themedFocusColor;
    let themedBlurColor;
    let dropShadow;
    let themedCorner;
    let themedMargin;

    themedFocusColor = Theme.field.color.search.focused[themedShade];
    themedBlurColor = Theme.field.color.search.blurred[themedShade];

    switch (themedOverlay) { // eslint-disable-line
    case `opaque`:
        themedColor = Theme.field.color.search.box[themedShade];
        themedBoxBorderFocusColor = `transparent`;
        themedBoxBorderBlurColor = `transparent`;
        break;
    case `translucent`:
        themedColor = `${Theme.field.color.search.box[themedShade]}${Theme.field.color.search.opacity}`;
        themedBoxBorderFocusColor = `transparent`;
        themedBoxBorderBlurColor = `transparent`;
        break;
    case `translucent-outline`:
        themedColor = `${Theme.field.color.search.box[themedShade]}${Theme.field.color.search.opacity}`;
        themedBoxBorderWidth = 1;
        themedBoxBorderFocusColor = themedFocusColor;
        themedBoxBorderBlurColor = themedBlurColor;
        break;
    case `transparent`:
        themedColor = `transparent`;
        themedBoxBorderFocusColor = `transparent`;
        themedBoxBorderBlurColor = `transparent`;
        break;
    case `transparent-outline`:
        themedColor = `transparent`;
        themedBoxBorderWidth = 1;
        themedBoxBorderFocusColor = themedFocusColor;
        themedBoxBorderBlurColor = themedBlurColor;
        break;
    }

    if (typeof corner === `string`) {
        if (corner === `themed`) {
            if (typeof Theme.field.search.corner === `string` && Theme.field.corner.search.hasOwnProperty(Theme.field.search.corner)) {
                themedCorner = Theme.field.corner.search[Theme.field.search.corner];
            } else {
                themedCorner = Theme.field.search.corner;
            }
        } else if (Theme.field.corner.search.hasOwnProperty(corner)) {
            themedCorner = Theme.field.corner.search[corner];
        } else {
            themedCorner = 0;
        }
    } else {
        themedCorner = corner;
    }
    if (typeof themedCorner === `number`) {
        themedBorderRadius = {
            small: {
                ...nullBorderRadius,
                borderRadius: (Math.floor(Theme.field.size.search.input.small + 6) * themedCorner)
            },
            normal: {
                ...nullBorderRadius,
                borderRadius: (Math.floor(Theme.field.size.search.input.normal + 6) * themedCorner)
            },
            large: {
                ...nullBorderRadius,
                borderRadius: (Math.floor(Theme.field.size.search.input.large + 6) * themedCorner)
            }
        };
    } else if (typeof themedCorner === `object`) {
        themedBorderRadius = Object.entries(themedCorner).reduce((_themedBorderRadius, [ key, value ]) => {
            let _borderRadius = {
                small: nullBorderRadius,
                normal: nullBorderRadius,
                large: nullBorderRadius
            };

            _borderRadius.small[`border${key.charAt(0).toUpperCase()}${key.slice(1)}Radius`] = Math.floor(Theme.field.size.search.input.small * value);
            _borderRadius.normal[`border${key.charAt(0).toUpperCase()}${key.slice(1)}Radius`] = Math.floor(Theme.field.size.search.input.normal * value);
            _borderRadius.large[`border${key.charAt(0).toUpperCase()}${key.slice(1)}Radius`] = Math.floor(Theme.field.size.search.input.large * value);

            _themedBorderRadius = {
                small: {
                    ..._themedBorderRadius.small,
                    ..._borderRadius.small
                },
                normal: {
                    ..._themedBorderRadius.normal,
                    ..._borderRadius.normal
                },
                large: {
                    ..._themedBorderRadius.large,
                    ..._borderRadius.large
                }
            };
            return _themedBorderRadius;
        }, {
            small: nullBorderRadius,
            normal: nullBorderRadius,
            large: nullBorderRadius
        });
    }

    if (typeof margin === `string`) {
        if (margin === `themed`) {
            if (typeof Theme.field.search.margin === `string` && Theme.field.margin.search.hasOwnProperty(Theme.field.search.margin)) {
                themedMargin = Theme.field.margin.search[Theme.field.search.margin];
            } else {
                themedMargin = Theme.field.search.margin;
            }
        } else if (Theme.field.margin.search.hasOwnProperty(margin)) {
            themedMargin = Theme.field.margin.search[margin];
        } else {
            themedMargin = 0;
        }
    } else {
        themedMargin = margin;
    }
    if (typeof themedMargin === `number`) {
        themedMargin = {
            ...nullMargin,
            margin: themedMargin
        };
    } else if (typeof themedMargin === `object`) {
        themedMargin = Object.entries(themedMargin).reduce((_themedMargin, [ key, value ]) => {
            let _margin = nullMargin;

            _margin[`margin${key.charAt(0).toUpperCase()}${key.slice(1)}`] = value;
            _themedMargin = {
                ..._themedMargin,
                ..._margin
            };
            return _themedMargin;
        }, nullMargin);
    }

    themedInputColor = Theme.field.color.search.input[themedShade];

    if ((typeof dropShadowed === `boolean` && dropShadowed) || (dropShadowed === `themed` && Theme.field.search.dropShadowed)) {
        dropShadow = DEFAULT_DROP_SHADOW_STYLE;
    } else {
        dropShadow = {
            ...DEFAULT_DROP_SHADOW_STYLE,
            shadowRadius: 0,
            shadowOpacity: 0,
            shadowOffset: {
                width: 0,
                height: 0
            }
        };
    }

    return {
        small: {
            container: {
                ...prevAdjustedStyle.small.container,
                ...themedMargin,
                ...(typeof style === `object` && style.hasOwnProperty(`container`) && typeof style.container === `object` ? style.container : {})
            },
            box: {
                focused: {
                    ...prevAdjustedStyle.small.box.focused,
                    ...dropShadow,
                    ...themedBorderRadius.small,
                    height: Theme.field.size.search.input.small + 6,
                    borderWidth: themedBoxBorderWidth,
                    borderColor: themedBoxBorderFocusColor,
                    backgroundColor: themedColor,
                    ...(typeof style === `object` && style.hasOwnProperty(`box`) &&
                        typeof style.box === `object` && style.box.hasOwnProperty(`focused`) && typeof style.box.focused === `object` ? style.box.focused : {})
                },
                blurred: {
                    ...prevAdjustedStyle.small.box.blurred,
                    ...dropShadow,
                    ...themedBorderRadius.small,
                    height: Theme.field.size.search.input.small + 6,
                    borderWidth: themedBoxBorderWidth,
                    borderColor: themedBoxBorderBlurColor,
                    backgroundColor: themedColor,
                    ...(typeof style === `object` && style.hasOwnProperty(`box`) &&
                        typeof style.box === `object` && style.box.hasOwnProperty(`blurred`) && typeof style.box.blurred === `object` ? style.box.blurred : {})
                }
            },
            contentLeftRoom: {
                ...prevAdjustedStyle.small.contentLeftRoom,
                ...(typeof style === `object` && style.hasOwnProperty(`contentLeftRoom`) && typeof style.contentLeftRoom ? style.contentLeftRoom : {})
            },
            contentRightRoom: {
                ...prevAdjustedStyle.small.contentRightRoom,
                ...(typeof style === `object` && style.hasOwnProperty(`contentRightRoom`) && typeof style.contentRightRoom ? style.contentRightRoom : {})
            },
            input: {
                ...prevAdjustedStyle.small.input,
                ...Theme.field.font.search.input.small,
                height: Theme.field.size.search.input.small,
                color: themedInputColor,
                ...(typeof style === `object` && style.hasOwnProperty(`input`) && typeof style.input === `object` ? style.input : {})
            },
            suggestion: {
                ...prevAdjustedStyle.small.suggestion,
                // ...dropShadow,
                backgroundColor: themedSuggestionColor,
                ...(typeof style === `object` && style.hasOwnProperty(`suggestion`) && typeof style.suggestion === `object` ? style.suggestion : {})
            }
        },
        normal: {
            container: {
                ...prevAdjustedStyle.normal.container,
                ...themedMargin,
                ...(typeof style === `object` && style.hasOwnProperty(`container`) && typeof style.container === `object` ? style.container : {})
            },
            box: {
                focused: {
                    ...prevAdjustedStyle.normal.box.focused,
                    ...dropShadow,
                    ...themedBorderRadius.normal,
                    height: Theme.field.size.search.input.normal + 6,
                    borderWidth: themedBoxBorderWidth,
                    borderColor: themedBoxBorderFocusColor,
                    backgroundColor: themedColor,
                    ...(typeof style === `object` && style.hasOwnProperty(`box`) &&
                        typeof style.box === `object` && style.box.hasOwnProperty(`focused`) && typeof style.box.focused === `object` ? style.box.focused : {})
                },
                blurred: {
                    ...prevAdjustedStyle.normal.box.blurred,
                    ...dropShadow,
                    ...themedBorderRadius.normal,
                    height: Theme.field.size.search.input.normal + 6,
                    borderWidth: themedBoxBorderWidth,
                    borderColor: themedBoxBorderBlurColor,
                    backgroundColor: themedColor,
                    ...(typeof style === `object` && style.hasOwnProperty(`box`) &&
                        typeof style.box === `object` && style.box.hasOwnProperty(`blurred`) && typeof style.box.blurred === `object` ? style.box.blurred : {})
                }
            },
            contentLeftRoom: {
                ...prevAdjustedStyle.normal.contentLeftRoom,
                ...(typeof style === `object` && style.hasOwnProperty(`contentLeftRoom`) && typeof style.contentLeftRoom ? style.contentLeftRoom : {})
            },
            contentRightRoom: {
                ...prevAdjustedStyle.normal.contentRightRoom,
                ...(typeof style === `object` && style.hasOwnProperty(`contentRightRoom`) && typeof style.contentRightRoom ? style.contentRightRoom : {})
            },
            input: {
                ...prevAdjustedStyle.normal.input,
                ...Theme.field.font.search.input.normal,
                height: Theme.field.size.search.input.normal,
                color: themedInputColor,
                ...(typeof style === `object` && style.hasOwnProperty(`input`) && typeof style.input === `object` ? style.input : {})
            },
            suggestion: {
                ...prevAdjustedStyle.normal.suggestion,
                // ...dropShadow,
                backgroundColor: themedSuggestionColor,
                ...(typeof style === `object` && style.hasOwnProperty(`suggestion`) && typeof style.suggestion === `object` ? style.suggestion : {})
            }
        },
        large: {
            container: {
                ...prevAdjustedStyle.large.container,
                ...themedMargin,
                ...(typeof style === `object` && style.hasOwnProperty(`container`) && typeof style.container === `object` ? style.container : {})
            },
            box: {
                focused: {
                    ...prevAdjustedStyle.large.box.focused,
                    ...dropShadow,
                    ...themedBorderRadius.large,
                    height: Theme.field.size.search.input.large + 6,
                    borderWidth: themedBoxBorderWidth,
                    borderColor: themedBoxBorderFocusColor,
                    backgroundColor: themedColor,
                    ...(typeof style === `object` && style.hasOwnProperty(`box`) &&
                        typeof style.box === `object` && style.box.hasOwnProperty(`focused`) && typeof style.box.focused === `object` ? style.box.focused : {})
                },
                blurred: {
                    ...prevAdjustedStyle.large.box.blurred,
                    ...dropShadow,
                    ...themedBorderRadius.large,
                    height: Theme.field.size.search.input.large + 6,
                    borderWidth: themedBoxBorderWidth,
                    borderColor: themedBoxBorderBlurColor,
                    backgroundColor: themedColor,
                    ...(typeof style === `object` && style.hasOwnProperty(`box`) &&
                        typeof style.box === `object` && style.box.hasOwnProperty(`blurred`) && typeof style.box.blurred === `object` ? style.box.blurred : {})
                }
            },
            contentLeftRoom: {
                ...prevAdjustedStyle.large.contentLeftRoom,
                ...(typeof style === `object` && style.hasOwnProperty(`contentLeftRoom`) && typeof style.contentLeftRoom ? style.contentLeftRoom : {})
            },
            contentRightRoom: {
                ...prevAdjustedStyle.large.contentRightRoom,
                ...(typeof style === `object` && style.hasOwnProperty(`contentRightRoom`) && typeof style.contentRightRoom ? style.contentRightRoom : {})
            },
            input: {
                ...prevAdjustedStyle.large.input,
                ...Theme.field.font.search.input.large,
                height: Theme.field.size.search.input.large,
                color: themedInputColor,
                ...(typeof style === `object` && style.hasOwnProperty(`input`) && typeof style.input === `object` ? style.input : {})
            },
            suggestion: {
                ...prevAdjustedStyle.large.suggestion,
                // ...dropShadow,
                backgroundColor: themedSuggestionColor,
                ...(typeof style === `object` && style.hasOwnProperty(`suggestion`) && typeof style.suggestion === `object` ? style.suggestion : {})
            }
        }
    };
};

async function fetchAutocompletionItems (value, getAutocompletionValues) {
    const component = this;

    if (!isEmptyInputValue(value)) {
        const autocompletionValues = await getAutocompletionValues(value);
        if (Array.isArray(autocompletionValues) && autocompletionValues.length > 0) {
            component.setState((prevState) => {
                return {
                    suggestion: {
                        ...prevState.suggestion,
                        autocompleteItems: [
                            ...new Set(autocompletionValues.filter((autocompleteText) => typeof autocompleteText === `string`))
                        ].map((autocompleteText) => {
                            return {
                                suggestionType: `autocompletion`,
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
                        autocompleteItems: []
                    }
                };
            });
        }
    } else {
        component.setState((prevState) => {
            return {
                suggestion: {
                    ...prevState.suggestion,
                    autocompleteItems: []
                }
            };
        });
    }
}

export default class SearchField extends React.Component {
    static contextType = DefaultThemeContext
    static propTypes = {
        exclusions: PropTypes.arrayOf(PropTypes.string),
        room: PropTypes.oneOf([
            `none`,
            `content-left`, `content-middle`, `content-right`,
            `content-bottom`, `content-top`,
            `media`
        ]),
        shade: PropTypes.oneOf([ `themed`, `light`, `dark` ]),
        overlay: PropTypes.oneOf([ `themed`, `opaque`, `translucent`, `translucent-outline`, `transparent`, `transparent-outline` ]),
        corner: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
            PropTypes.shape({
                topLeft: PropTypes.number,
                topRight: PropTypes.number,
                bottomLeft: PropTypes.number,
                bottomRight: PropTypes.number
            })
        ]),
        size: PropTypes.oneOf([ `themed`, `small`, `normal`, `large` ]),
        margin: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
            PropTypes.shape({
                top: PropTypes.number,
                bottom: PropTypes.number,
                left: PropTypes.number,
                right: PropTypes.number,
                horizontal: PropTypes.number,
                vertical: PropTypes.number
            })
        ]),
        dropShadowed: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.string
        ]),
        autoFocus: PropTypes.bool,
        autoCorrect: PropTypes.bool,
        suggestive: PropTypes.bool,
        pinnedSuggestionValues: PropTypes.arrayOf(PropTypes.oneOfType([ PropTypes.number, PropTypes.string, PropTypes.object ])),
        hint: PropTypes.string,
        initialAnimation: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.shape({
                refName: PropTypes.string,
                transitions: PropTypes.arrayOf(PropTypes.shape({
                    to: PropTypes.oneOfType([
                        PropTypes.func,
                        PropTypes.object
                    ]),
                    from: PropTypes.oneOfType([
                        PropTypes.func,
                        PropTypes.object
                    ]),
                    option: PropTypes.shape({
                        duration: PropTypes.number,
                        delay: PropTypes.number,
                        easing: PropTypes.string
                    })
                })),
                onTransitionBegin: PropTypes.func,
                onTransitionEnd: PropTypes.func,
                onAnimationBegin: PropTypes.func,
                onAnimationEnd: PropTypes.func
            })
        ]),
        onSearch: PropTypes.func,
        onGetAutocompletionValues: PropTypes.func,
        onFocus: PropTypes.func,
        onBlur: PropTypes.func,
        onCollapse: PropTypes.func,
        onExpand: PropTypes.func,
        onHide: PropTypes.func,
        onShow: PropTypes.func,
        onHideSuggestion: PropTypes.func,
        onShowSuggestion: PropTypes.func,
        onClear: PropTypes.func,
        onClearSuggestion: PropTypes.func,
        renderSuggestionItem: PropTypes.func
    }
    static defaultProps = {
        exclusions: [ `` ],
        room: `none`,
        shade: `themed`,
        overlay: `themed`,
        corner: `themed`,
        size: `themed`,
        margin: `themed`,
        dropShadowed: `themed`,
        autoFocus: false,
        autoCorrect: true,
        suggestive: true,
        pinnedSuggestionValues: [],
        hint: ``,
        initialAnimation: `themed`,
        onSearch: () => null,
        onGetAutocompletionValues: () => null,
        onFocus: () => null,
        onBlur: () => null,
        onCollapse: () => null,
        onExpand: () => null,
        onHide: () => null,
        onShow: () => null,
        onHideSuggestion: () => null,
        onShowSuggestion: () => null,
        onClear: () => null,
        onClearSuggestion: () => null,
        renderSuggestionItem: () => null // eslint-disable-line
    }
    static getDerivedStateFromProps (props, state) {
        const {
            shade,
            overlay,
            corner,
            margin,
            dropShadowed,
            style
        } = props;
        const {
            Theme
        } = state.context;

        return {
            adjustedStyle: readjustStyle({
                shade,
                overlay,
                corner,
                margin,
                dropShadowed,
                style
            }, state.adjustedStyle, Theme)
        };
    }
    constructor (props) {
        super(props);

        const component = this;
        const themedSize = props.size === `themed` ? DefaultTheme.field.search.size : props.size;

        component.refCache = {};
        component.state = {
            context: {
                Theme: DefaultTheme
            },
            visibility: {
                box: true,
                suggestion: false
            },
            collapsed: false,
            adjustedStyle: DEFAULT_SEARCH_FIELD_STYLE,
            container: {
                width: 0,
                height: DefaultTheme.field.size.search.input[themedSize] + 6,
                top: 0,
                left: 0
            },
            input: {
                focused: false,
                value: ``
            },
            suggestion: {
                historyItemIndex: 0,
                historyItems: [],
                autocompleteItems: []
            }
        };
    }
    isCollapsed = () => {
        const component = this;
        const {
            collapsed
        } = component.state;

        return collapsed;
    }
    isVisible = () => {
        const component = this;
        const {
            visibility
        } = component.state;

        return visibility.box;
    }
    isSuggestionVisible = () => {
        const component = this;
        const {
            visibility
        } = component.state;

        return visibility.suggestion;
    }
    isFocused = () => {
        const component = this;
        const textInput = component.refCache[`text-input`];

        if (textInput !== undefined) {
            return textInput.isFocused();
        }
        return false;
    }
    collapse = (animation = {
        transitions: null,
        onTransitionBegin: () => null,
        onTransitionEnd: () => null,
        onAnimationBegin: () => null,
        onAnimationEnd: () => null
    }) => {
        const component = this;
        const {
            size,
            onClear,
            onCollapse
        } = component.props;
        const {
            visibility,
            collapsed
        } = component.state;
        const {
            Theme
        } = component.context;
        const themedSize = size === `themed` ? Theme.field.search.size : size;

        if (typeof animation === `object`) {
            const {
                transitions,
                onTransitionBegin,
                onTransitionEnd,
                onAnimationBegin,
                onAnimationEnd
            } = animation;
            let animationPromises = [];

            if (!collapsed) {
                component.setState((prevState) => {
                    return {
                        collapsed: true,
                        visibility: {
                            ...prevState.visibility,
                            suggestion: false
                        },
                        input: {
                            ...prevState.input,
                            value: ``
                        },
                        suggestion: {
                            ...prevState.suggestion,
                            autocompleteItems: []
                        }
                    };
                }, () => {
                    animationPromises = component.animate({
                        refName: `animated-box-view`,
                        transitions: Array.isArray(transitions) ? transitions : [{
                            to: {
                                width: Theme.field.size.search.input[themedSize] + 6
                            },
                            option: {
                                duration: DEFAULT_ANIMATION_DURATION_MS,
                                delay: 0,
                                easing: `linear`
                            }
                        }],
                        onTransitionBegin,
                        onTransitionEnd,
                        onAnimationBegin,
                        onAnimationEnd
                    });
                    if (visibility.suggestion) {
                        component.animate({
                            refName: `animated-suggestion-view`,
                            transitions: [{
                                to: {
                                    opacity: 0,
                                    translateY: DEVICE_HEIGHT
                                },
                                option: {
                                    duration: DEFAULT_ANIMATION_DURATION_MS,
                                    delay: 0,
                                    easing: `linear`
                                }
                            }]
                        });
                    }
                    (typeof onCollapse === `function` ? onCollapse : () => null)();
                    (typeof onClear === `function` ? onClear : () => null)();
                });
                return animationPromises;
            }
        }
    }
    expand = (animation = {
        transitions: null,
        onTransitionBegin: () => null,
        onTransitionEnd: () => null,
        onAnimationBegin: () => null,
        onAnimationEnd: () => null
    }) => {
        const component = this;
        const {
            onExpand
        } = component.props;
        const {
            collapsed,
            container
        } = component.state;

        if (typeof animation === `object`) {
            const {
                transitions,
                onTransitionBegin,
                onTransitionEnd,
                onAnimationBegin,
                onAnimationEnd
            } = animation;
            let animationPromises = [];

            if (collapsed) {
                animationPromises = component.animate({
                    refName: `animated-box-view`,
                    transitions: Array.isArray(transitions) ? transitions : [{
                        to: {
                            width: container.width
                        },
                        option: {
                            duration: DEFAULT_ANIMATION_DURATION_MS,
                            delay: 0,
                            easing: `linear`
                        }
                    }],
                    onTransitionBegin,
                    onTransitionEnd,
                    onAnimationBegin,
                    onAnimationEnd: () => {
                        onAnimationEnd();
                        component.setState(() => {
                            return {
                                collapsed: false
                            };
                        }, () => {
                            (typeof onExpand === `function` ? onExpand : () => null)();
                        });
                    }
                });

                return animationPromises;
            }
        }
    }
    show = (animation = {
        transitions: null,
        onTransitionBegin: () => null,
        onTransitionEnd: () => null,
        onAnimationBegin: () => null,
        onAnimationEnd: () => null
    }) => {
        const component = this;
        const {
            onShow
        } = component.props;
        const {
            visibility
        } = component.state;

        if (typeof animation === `object`) {
            const {
                transitions,
                onTransitionBegin,
                onTransitionEnd,
                onAnimationBegin,
                onAnimationEnd
            } = animation;
            let animationPromises = [];

            if (!visibility.box) {
                animationPromises = component.animate({
                    refName: `animated-box-view`,
                    transitions: Array.isArray(transitions) ? transitions : [{
                        to: {
                            opacity: 1
                        },
                        option: {
                            duration: DEFAULT_ANIMATION_DURATION_MS,
                            delay: 0,
                            easing: `linear`
                        }
                    }],
                    onTransitionBegin,
                    onTransitionEnd,
                    onAnimationBegin,
                    onAnimationEnd
                });

                component.setState((prevState) => {
                    return {
                        visibility: {
                            ...prevState.visibility,
                            box: true
                        }
                    };
                }, () => {
                    (typeof onShow === `function` ? onShow : () => null)();
                });
                return animationPromises;
            }
        }
    }
    hide = (animation = {
        transitions: null,
        onTransitionBegin: () => null,
        onTransitionEnd: () => null,
        onAnimationBegin: () => null,
        onAnimationEnd: () => null
    }) => {
        const component = this;
        const {
            onHide
        } = component.props;
        const {
            visibility
        } = component.state;

        if (typeof animation === `object`) {
            const {
                transitions,
                onTransitionBegin,
                onTransitionEnd,
                onAnimationBegin,
                onAnimationEnd
            } = animation;
            let animationPromises = [];

            if (visibility.box) {
                animationPromises = component.animate({
                    refName: `animated-box-view`,
                    transitions: Array.isArray(transitions) ? transitions : [{
                        to: {
                            opacity: 0
                        },
                        option: {
                            duration: DEFAULT_ANIMATION_DURATION_MS,
                            delay: 0,
                            easing: `linear`
                        }
                    }],
                    onTransitionBegin,
                    onTransitionEnd,
                    onAnimationBegin,
                    onAnimationEnd
                });
                if (visibility.suggestion) {
                    component.animate({
                        refName: `animated-suggestion-view`,
                        transitions: [{
                            to: {
                                opacity: 0,
                                translateY: DEVICE_HEIGHT
                            },
                            option: {
                                duration: DEFAULT_ANIMATION_DURATION_MS,
                                delay: 0,
                                easing: `linear`
                            }
                        }]
                    });
                }

                component.setState((prevState) => {
                    return {
                        visibility: {
                            ...prevState.visibility,
                            box: false,
                            suggestion: false
                        }
                    };
                }, () => {
                    (typeof onHide === `function` ? onHide : () => null)();
                });
                return animationPromises;
            }
        }
    }
    focus = () => {
        const component = this;
        const textInput = component.refCache[`text-input`];

        if (textInput !== undefined && !textInput.isFocused()) {
            textInput.focus();
        }
    }
    blur = () => {
        const component = this;
        const textInput = component.refCache[`text-input`];

        if (textInput !== undefined && textInput.isFocused()) {
            textInput.blur();
        }
    }
    clear = () => {
        const component = this;
        const {
            onClear
        } = component.props;

        component.setState((prevState) => {
            return {
                input: {
                    ...prevState.input,
                    value: ``
                },
                suggestion: {
                    ...prevState.suggestion,
                    autocompleteItems: []
                }
            };
        }, () => {
            (typeof onClear === `function` ? onClear : () => null)();
        });
    }
    clearSuggestion = () => {
        const component = this;
        const {
            onClearSuggestion
        } = component.props;

        component.setState(() => {
            return {
                suggestion: {
                    historyItemIndex: 0,
                    historyItems: [],
                    autocompleteItems: []
                }
            };
        }, () => {
            (typeof onClearSuggestion === `function` ? onClearSuggestion : () => null)();
        });
    }
    onLayout = (event) => {
        const component = this;
        const {
            width,
            height,
            x: left,
            y: top
        } = event.nativeEvent.layout;

        component.setState(() => {
            return {
                container: {
                    width,
                    height,
                    top,
                    left
                }
            };
        });
    }
    onFocus = () => {
        const component = this;
        const {
            suggestive,
            onFocus,
            onShowSuggestion
        } = component.props;
        const {
            visibility,
            collapsed
        } = component.state;

        if (suggestive && !collapsed && visibility.box && !visibility.suggestion) {
            component.animate({
                refName: `animated-suggestion-view`,
                transitions: [{
                    to: {
                        opacity: 1,
                        translateY: 0
                    },
                    option: {
                        duration: DEFAULT_ANIMATION_DURATION_MS,
                        delay: 0,
                        easing: `linear`
                    }
                }]
            });
            component.setState((prevState) => {
                return {
                    visibility: {
                        ...prevState.visibility,
                        suggestion: true
                    }
                };
            }, () => {
                (typeof onShowSuggestion === `function` ? onShowSuggestion : () => null)();
            });
        }

        component.setState((prevState) => {
            return {
                input: {
                    ...prevState.input,
                    focused: true
                },
                suggestion: {
                    ...prevState.suggestion,
                    autocompleteItems: []
                }
            };
        }, () => {
            (typeof onFocus === `function` ? onFocus : () => null)();
        });
    }
    onBlur = () => {
        const component = this;
        const {
            suggestive,
            pinnedSuggestionValues,
            onBlur,
            onHideSuggestion
        } = component.props;
        const {
            visibility,
            collapsed,
            input
        } = component.state;

        if (suggestive && !collapsed && visibility.box && visibility.suggestion && isEmptyInputValue(input.value) && pinnedSuggestionValues.length === 0) {
            component.animate({
                refName: `animated-suggestion-view`,
                transitions: [{
                    to: {
                        opacity: 0,
                        translateY: DEVICE_HEIGHT
                    },
                    option: {
                        duration: DEFAULT_ANIMATION_DURATION_MS,
                        delay: 0,
                        easing: `linear`
                    }
                }]
            });
            component.setState((prevState) => {
                return {
                    visibility: {
                        ...prevState.visibility,
                        suggestion: false
                    }
                };
            }, () => {
                (typeof onHideSuggestion === `function` ? onHideSuggestion : () => null)();
            });
        }

        component.setState((prevState) => {
            return {
                input: {
                    ...prevState.input,
                    focused: false
                }
            };
        }, () => {
            (typeof onBlur === `function` ? onBlur : () => null)();
        });
    }
    onChangeText = (text) => {
        const component = this;
        const {
            suggestive,
            onGetAutocompletionValues
        } = component.props;
        const value = text;

        if (suggestive) {
            fetchAutocompletionItems.call(component, value, onGetAutocompletionValues);
        }
        component.setState((prevState) => {
            return {
                input: {
                    ...prevState.input,
                    value
                }
            };
        });
    }
    onSubmitEditing = (event) => {
        const component = this;
        const {
            suggestive,
            onHideSuggestion,
            onSearch
        } = component.props;
        const {
            visibility,
            collapsed,
            suggestion
        } = component.state;
        const value = event.nativeEvent.text;

        if (suggestive && !collapsed && visibility.box && visibility.suggestion) {
            component.animate({
                refName: `animated-suggestion-view`,
                transitions: [{
                    to: {
                        opacity: 0,
                        translateY: DEVICE_HEIGHT
                    },
                    option: {
                        duration: DEFAULT_ANIMATION_DURATION_MS,
                        delay: 0,
                        easing: `linear`
                    }
                }]
            });
            component.setState((prevState) => {
                return {
                    visibility: {
                        ...prevState.visibility,
                        suggestion: false
                    }
                };
            }, () => {
                (typeof onHideSuggestion === `function` ? onHideSuggestion : () => null)();
            });
        }

        if (!isEmptyInputValue(value) && !suggestion.historyItems.some((item) => item.value === value)) {
            component.setState((prevState) => {
                let {
                    historyItemIndex,
                    historyItems
                } = prevState.suggestion;

                if (historyItemIndex === DEFAULT_SUGGESTION_HISTORY_ITEM_COUNT) {
                    historyItemIndex = 0;
                }
                if (historyItemIndex === historyItems.length) {
                    historyItems.push({
                        suggestionType: `history`,
                        value,
                        timestamp: new Date().getTime()
                    });
                } else if (historyItemIndex < historyItems.length) {
                    historyItems[historyItemIndex] = {
                        suggestionType: `history`,
                        value,
                        timestamp: new Date().getTime()
                    };
                }
                historyItemIndex++;
                historyItems = historyItems.sort((itemA, itemB) => itemB.timestamp - itemA.timestamp);

                return {
                    suggestion: {
                        ...prevState.suggestion,
                        historyItemIndex,
                        historyItems
                    }
                };
            }, () => {
                (typeof onSearch === `function` ? onSearch : () => null)(value);
            });
        }
    }
    onPressSelectAndSubmitSuggestion = (item) => {
        const component = this;
        const {
            suggestive,
            onHideSuggestion,
            onSearch
        } = component.props;
        const {
            visibility,
            collapsed,
            suggestion
        } = component.state;

        if (suggestive && !collapsed && visibility.box && visibility.suggestion) {
            component.animate({
                refName: `animated-suggestion-view`,
                transitions: [{
                    to: {
                        opacity: 0,
                        translateY: DEVICE_HEIGHT
                    },
                    option: {
                        duration: DEFAULT_ANIMATION_DURATION_MS,
                        delay: 0,
                        easing: `linear`
                    }
                }]
            });
            component.setState((prevState) => {
                return {
                    visibility: {
                        ...prevState.visibility,
                        suggestion: false
                    }
                };
            }, () => {
                (typeof onHideSuggestion === `function` ? onHideSuggestion : () => null)();
            });
        }

        if (!suggestion.historyItems.some((_item) => _item.value === item.value)) {
            component.setState((prevState) => {
                let {
                    historyItemIndex,
                    historyItems
                } = prevState.suggestion;

                if (historyItemIndex === DEFAULT_SUGGESTION_HISTORY_ITEM_COUNT) {
                    historyItemIndex = 0;
                }
                if (historyItemIndex === historyItems.length) {
                    historyItems.push({
                        suggestionType: `history`,
                        value: item.value,
                        timestamp: new Date().getTime()
                    });
                } else if (historyItemIndex < historyItems.length) {
                    historyItems[historyItemIndex] = {
                        suggestionType: `history`,
                        value: item.value,
                        timestamp: new Date().getTime()
                    };
                }
                historyItemIndex++;
                historyItems = historyItems.sort((itemA, itemB) => itemB.timestamp - itemA.timestamp);

                return {
                    input: {
                        ...prevState.input,
                        value: item.value
                    },
                    suggestion: {
                        ...prevState.suggestion,
                        historyItemIndex,
                        historyItems
                    }
                };
            }, () => {
                (typeof onSearch === `function` ? onSearch : () => null)(item.value);
            });
        } else {
            component.setState((prevState) => {
                return {
                    input: {
                        ...prevState.input,
                        value: item.value
                    },
                    suggestion: {
                        ...prevState.suggestion,
                        autocompleteItems: []
                    }
                };
            }, () => {
                (typeof onSearch === `function` ? onSearch : () => null)(item.value);
            });
        }
    }
    onPressSelectSuggestion = (item) => {
        const component = this;

        component.setState((prevState) => {
            return {
                input: {
                    ...prevState.input,
                    value: item.value
                }
            };
        });
    }
    animate (animation = {
        onTransitionBegin: () => null,
        onTransitionEnd: () => null,
        onAnimationBegin: () => null,
        onAnimationEnd: () => null
    }) {
        const component = this;
        const {
            Theme
        } = component.context;

        if (typeof animation === `string` && animation !== `none`) {
            const animationName = animation.replace(/-([a-z])/g, (match, word) => word.toUpperCase());
            if (Theme.field.animation.search.hasOwnProperty(animationName)) {
                animation = Theme.field.animation.search[animationName];
            }
        }

        if (typeof animation === `object`) {
            const {
                refName,
                transitions,
                onTransitionBegin,
                onTransitionEnd,
                onAnimationBegin,
                onAnimationEnd
            } = animation;

            const componentRef = component.refCache[refName];
            if (componentRef !== undefined && Array.isArray(transitions)) {
                let transitionDuration = 0;

                const transitionPromises = transitions.map((transition, transitionIndex) => {
                    let transitionBeginPromise;
                    let transitionEndPromise;

                    if (typeof transition === `object`) {
                        let transitionType;
                        let componentRefTransition = {
                            from: {},
                            to: {}
                        };
                        let componentRefTransitionOption = {
                            duration: DEFAULT_ANIMATION_DURATION_MS,
                            delay: 0,
                            easing: `linear`
                        };

                        if (transition.hasOwnProperty(`from`)) {
                            let from = typeof transition.from === `function` ? transition.from(component.props, component.state, component.context) : transition.from;
                            componentRefTransition.from = typeof from === `object` ? from : {};
                            transitionType = `from`;
                        }
                        if (transition.hasOwnProperty(`to`)) {
                            let to = typeof transition.to === `function` ? transition.to(component.props, component.state, component.context) : transition.to;
                            componentRefTransition.to = typeof to === `object` ? to : {};
                            transitionType = transitionType === `from` ? `from-to` : `to`;
                        }
                        if (transition.hasOwnProperty(`option`) && typeof transition.option === `object`) {
                            componentRefTransitionOption = {
                                ...componentRefTransitionOption,
                                ...transition.option
                            };
                        }

                        transitionBeginPromise = new Promise((resolve) => {
                            setTimeout(() => {
                                if (transitionType === `to`) {
                                    componentRef.transitionTo(
                                        componentRefTransition.to,
                                        componentRefTransitionOption.duration,
                                        componentRefTransitionOption.easing,
                                        componentRefTransitionOption.delay
                                    );
                                } else if (transitionType === `from-to`) {
                                    setTimeout(() => {
                                        componentRef.transition(
                                            componentRefTransition.from,
                                            componentRefTransition.to,
                                            componentRefTransitionOption.duration,
                                            componentRefTransitionOption.easing
                                        );
                                    }, componentRefTransitionOption.delay);
                                }
                                (typeof onTransitionBegin === `function` ? onTransitionBegin : () => null)(transitionIndex);
                                resolve((_onTransitionBegin) => (typeof _onTransitionBegin === `function` ? _onTransitionBegin : () => null)(_onTransitionBegin));
                            }, transitionDuration + 5);
                        });

                        transitionDuration += componentRefTransitionOption.duration + componentRefTransitionOption.delay;

                        transitionEndPromise = new Promise((resolve) => {
                            setTimeout(() => {
                                (typeof onTransitionEnd === `function` ? onTransitionEnd : () => null)(transitionIndex);
                                resolve((_onTransitionEnd) => (typeof _onTransitionEnd === `function` ? _onTransitionEnd : () => null)(transitionIndex));
                            }, transitionDuration);
                        });
                    }

                    return [ transitionBeginPromise, transitionEndPromise ];
                });

                const animationBeginPromise = new Promise((resolve) => {
                    (typeof onAnimationBegin === `function` ? onAnimationBegin : () => null)();
                    resolve((_onAnimationBegin) => (typeof _onAnimationBegin === `function` ? _onAnimationBegin : () => null)());
                });
                const animationEndPromise = new Promise((resolve) => {
                    setTimeout(() => {
                        (typeof onAnimationEnd === `function` ? onAnimationEnd : () => null)();
                        resolve((_onAnimationEnd) => (typeof _onAnimationEnd === `function` ? _onAnimationEnd : () => null)());
                    }, transitionDuration + 5);
                });

                return Promise.all([
                    animationBeginPromise,
                    ...transitionPromises.flat(),
                    animationEndPromise
                ].filter((animationPromise) => animationPromise !== undefined));
            }
        }
    }
    componentDidMount () {
        const component = this;
        const {
            shade,
            overlay,
            corner,
            margin,
            dropShadowed,
            initialAnimation,
            style
        } = component.props;
        const {
            Theme
        } = component.context;

        component.setState((prevState) => {
            return {
                context: {
                    Theme
                },
                adjustedStyle: readjustStyle({
                    shade,
                    overlay,
                    corner,
                    margin,
                    dropShadowed,
                    style
                }, prevState.adjustedStyle, Theme)
            };
        }, () => {
            if ((typeof initialAnimation === `string` && initialAnimation !== `none`) || typeof initialAnimation === `object`) {
                component.animate(initialAnimation);
            }
        });
    }
    componentWillUnMount () {
        const component = this;

        component.refCache = {};
    }
    renderInput () {
        const component = this;
        const {
            size,
            autoFocus,
            autoCorrect,
            hint
        } = component.props;
        const {
            adjustedStyle,
            collapsed,
            input
        } = component.state;
        const {
            Theme
        } = component.context;
        const themedSize = size === `themed` ? Theme.field.search.size : size;

        if (!collapsed) {
            return (
                <TextInput
                    ref = {(componentRef) => {
                        component.refCache[`text-input`] = componentRef;
                    }}
                    style = { adjustedStyle[themedSize].input }
                    keyboardType = 'default'
                    returnKeyType = 'search'
                    autoFocus = { autoFocus }
                    autoCorrect = { autoCorrect }
                    defaultValue = { input.value }
                    value = { input.value }
                    placeholder = { hint }
                    placeholderTextColor = { Theme.field.color.search.hint }
                    onFocus = { component.onFocus }
                    onBlur = { component.onBlur }
                    onChangeText = { component.onChangeText }
                    // onEndEditing = { component.onEndEditing }
                    onSubmitEditing = { component.onSubmitEditing }
                />
            );
        }
        return null;
    }
    renderSuggestion () {
        const component = this;
        const {
            size,
            suggestive,
            pinnedSuggestionValues,
            renderSuggestionItem
        } = component.props;
        const {
            adjustedStyle,
            input,
            container,
            suggestion
        } = component.state;
        const {
            Theme
        } = component.context;
        const themedSize = size === `themed` ? Theme.field.search.size : size;

        if (suggestive) {
            const pinnedSuggestionItems = pinnedSuggestionValues.map((value) => {
                return {
                    suggestionType: `pin`,
                    value
                };
            });
            let suggestionItems = pinnedSuggestionItems.concat(suggestion.historyItems.filter((item) => {
                return item.value.toLowerCase().charAt(0) === input.value.toLowerCase().charAt(0);
            }).concat(suggestion.autocompleteItems));

            suggestionItems = suggestionItems.map((item, index) => {
                return {
                    key: `${index}`,
                    ...item
                };
            });

            return (
                <AnimatedView
                    key = 'search-field-animated-suggestion-view'
                    ref = {(componentRef) => {
                        component.refCache[`animated-suggestion-view`] = componentRef;
                    }}
                    style = {{
                        top: container.top + container.height,
                        left: container.left,
                        ...adjustedStyle[themedSize].suggestion
                    }}
                    pointerEvents = 'box-none'
                    useNativeDriver = { true }
                >
                    <FlatList
                        data = { suggestionItems }
                        style = {{
                            backgroundColor: `transparent`
                        }}
                        renderItem = {({
                            item
                        }) => {
                            return renderSuggestionItem(
                                item,
                                component.onPressSelectAndSubmitSuggestion,
                                component.onPressSelectSuggestion,
                            );
                        }}
                    />
                </AnimatedView>
            );
        }
        return null;
    }
    renderContentChildren (contentLeftChildren = null, contentRightChildren = null) {
        const component = this;
        const {
            size
        } = component.props;
        const {
            adjustedStyle,
            input
        } = component.state;
        const {
            Theme
        } = component.context;
        const themedSize = size === `themed` ? Theme.field.search.size : size;

        return (
            <AnimatedView
                ref = {(componentRef) => {
                    component.refCache[`animated-box-view`] = componentRef;
                }}
                style = {{
                    ...(input.focused ? adjustedStyle[themedSize].box.focused : adjustedStyle[themedSize].box.blurred)
                }}
                useNativeDriver = { false }
            >
                <AnimatedView
                    ref = {(componentRef) => {
                        component.refCache[`animated-content-left-room-view`] = componentRef;
                    }}
                    useNativeDriver = { true }
                    style = { adjustedStyle[themedSize].contentLeftRoom }
                >
                    {
                        contentLeftChildren
                    }
                </AnimatedView>
                {
                    component.renderInput()
                }
                <AnimatedView
                    ref = {(componentRef) => {
                        component.refCache[`animated-content-right-room-view`] = componentRef;
                    }}
                    useNativeDriver = { true }
                    style = { adjustedStyle[themedSize].contentRightRoom }
                >
                    {
                        contentRightChildren
                    }
                </AnimatedView>
            </AnimatedView>
        );
    }
    render () {
        const component = this;
        const {
            shade,
            size,
            autoFocus,
            onSearch,
            children
        } = component.props;
        const {
            visibility,
            collapsed,
            adjustedStyle,
            input
        } = component.state;
        const {
            Theme
        } = component.context;
        const themedSize = size === `themed` ? Theme.field.search.size : size;
        let contentLeftChildren = null;
        let contentRightChildren = null;

        if (React.Children.count(children) > 0) {
            let fragments = React.Children.toArray(React.Children.map(children, (child) => {
                if (child !== null) {
                    const {
                        exclusions,
                        room,
                        action
                    } = child.props;
                    let actionName = `none`;
                    let actionArgs = [];

                    if (typeof room === `string` && (room === `content-left` || room === `content-right`)) {
                        const inheritedProps = Array.isArray(exclusions) ? Object.entries({
                            shade,
                            size: themedSize,
                            margin: 0,
                            indentation: 0
                        }).filter(([
                            propName,
                            prop // eslint-disable-line
                        ]) => exclusions.every((exclusion) => propName !== exclusion)).reduce((_inheritedProps, [ propName, prop ]) => {
                            _inheritedProps[propName] = prop;
                            return _inheritedProps;
                        }, {}) : {
                            shade,
                            size: themedSize,
                            margin: 0,
                            indentation: 0
                        };

                        if (typeof action === `string`) {
                            actionName = action;
                        } else if (typeof action === `object` && action.hasOwnProperty(`name`)) {
                            actionName = action.name;
                            if (action.hasOwnProperty(`args`) && Array.isArray(action.args)) {
                                actionArgs = action.args;
                            }
                        }

                        switch (actionName) {  // eslint-disable-line
                        case `search`:
                            if (!collapsed && visibility.box) {
                                return React.cloneElement(child, {
                                    ...inheritedProps,
                                    onPress: () => (typeof onSearch === `function` ? onSearch : () => null)()
                                });
                            }
                            return null;
                        case `clear`:
                            if (!isEmptyInputValue(input.value) && !collapsed && visibility.box) {
                                return React.cloneElement(child, {
                                    ...inheritedProps,
                                    onPress: () => component.clear(...actionArgs)
                                });
                            }
                            return null;
                        case `expand`:
                            if (collapsed) {
                                return React.cloneElement(child, {
                                    ...inheritedProps,
                                    onPress: () => component.expand(...actionArgs)
                                });
                            }
                            return null;
                        case `collapse`:
                            if (!collapsed) {
                                return React.cloneElement(child, {
                                    ...inheritedProps,
                                    onPress: () => component.collapse(...actionArgs)
                                });
                            }
                            return null;
                        case `show`:
                            if (!visibility.box) {
                                return React.cloneElement(child, {
                                    ...inheritedProps,
                                    onPress: () => component.show(...actionArgs)
                                });
                            }
                            return null;
                        case `hide`:
                            if (visibility.box) {
                                return React.cloneElement(child, {
                                    ...inheritedProps,
                                    onPress: () => component.hide(...actionArgs)
                                });
                            }
                            return null;
                        default:
                            return React.cloneElement(child, inheritedProps);
                        }
                    }
                }
                return child;
            }));
            contentLeftChildren = fragments.filter((child) => {
                if (child !== null) {
                    const {
                        room
                    } = child.props;

                    return room === `content-left`;
                }
                return false;
            });
            contentLeftChildren = contentLeftChildren.length > 0 ? contentLeftChildren : null;

            contentRightChildren = fragments.filter((child) => {
                if (child !== null) {
                    const {
                        room
                    } = child.props;

                    return room === `content-right`;
                }
                return false;
            });
            contentRightChildren = contentRightChildren.length > 0 ? contentRightChildren : null;
        }

        return ([
            <AnimatedView
                key = 'search-field-animated-container-view'
                ref = {(componentRef) => {
                    component.refCache[`animated-container-view`] = componentRef;
                }}
                style = { adjustedStyle[themedSize].container }
                useNativeDriver = { true }
                onLayout = { component.onLayout }
                onStartShouldSetResponder = {() => {
                    if (!autoFocus) {
                        dismissKeyboard();
                    }
                }}
            >
                {
                    component.renderContentChildren(contentLeftChildren, contentRightChildren)
                }
            </AnimatedView>,
            component.renderSuggestion()
        ]);
    }
}

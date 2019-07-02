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
 * @module TextField
 * @description - Text field input component.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 * @flow
 */
'use strict'; // eslint-disable-line

import React from 'react';

import ReactNative from 'react-native'; // eslint-disable-line

import PropTypes from 'prop-types';

import { Text as AnimatedText, View as AnimatedView } from 'react-native-animatable';

import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard';

import {
    DefaultTheme,
    DefaultThemeContext
} from '../../themes/default-theme';

const {
    Dimensions,
    FlatList,
    Text,
    TextInput,
    View
} = ReactNative;

const DEVICE_WIDTH = Dimensions.get(`window`).width;
const DEVICE_HEIGHT = Dimensions.get(`window`).height;

const DEFAULT_ANIMATION_DURATION_MS = 300;

const DEFAULT_TEXT_FIELD_STYLE = {
    small: {
        container: {
            flexShrink: 1,
            flexDirection: `column`,
            alignSelf: `stretch`,
            alignItems: `stretch`,
            justifyContent: `center`,
            width: `100%`,
            maxWidth: DEVICE_WIDTH,
            padding: 3,
            backgroundColor: `transparent`
        },
        box: {
            focused: {
                flexDirection: `column`,
                alignItems: `flex-end`,
                justifyContent: `flex-end`,
                height: DefaultTheme.field.size.text.input.small * 1.65,
                paddingVertical: 3,
                paddingLeft: 6,
                overflow: `hidden`
            },
            blurred: {
                flexDirection: `column`,
                alignItems: `flex-end`,
                justifyContent: `flex-end`,
                height: DefaultTheme.field.size.text.input.small * 1.65,
                paddingVertical: 3,
                paddingLeft: 6,
                overflow: `hidden`
            }
        },
        contentLeftRoom: {
            flexDirection: `row`,
            alignItems: `center`,
            justifyContent: `center`,
            maxHeight: DefaultTheme.field.size.text.input.small - 6,
            backgroundColor: `transparent`
        },
        contentRightRoom: {
            flexDirection: `row`,
            alignItems: `center`,
            justifyContent: `center`,
            maxHeight: DefaultTheme.field.size.text.input.small - 6,
            backgroundColor: `transparent`
        },
        input: {
            ...DefaultTheme.field.font.text.input.small,
            flexGrow: 1,
            textAlign: `left`,
            alignSelf: `stretch`,
            alignItems: `stretch`,
            maxWidth: DEVICE_WIDTH,
            height: DefaultTheme.field.size.text.input.small,
            paddingLeft: 6,
            backgroundColor: `transparent`
        },
        helper: {
            ...DefaultTheme.field.font.text.helper,
            textAlign: `right`,
            paddingRight: 9
        },
        status: {
            ...DefaultTheme.field.font.text.status,
            textAlign: `left`,
            paddingLeft: 6,
            color: DefaultTheme.field.color.text.status
        },
        label: {
            focused: {
                ...DefaultTheme.field.font.text.label.focused.small,
                position: `absolute`,
                textAlign: `left`,
                paddingLeft: 6
            },
            blurred: {
                ...DefaultTheme.field.font.text.label.blurred.small,
                position: `absolute`,
                textAlign: `left`,
                paddingLeft: 6
            }
        },
        underline: {
            focused: {
                justifyContent: `flex-end`,
                height: DefaultTheme.field.size.text.underline.focused.small,
                transform: [{
                    scaleX: 0
                }]
            },
            blurred: {
                justifyContent: `flex-end`,
                height: DefaultTheme.field.size.text.underline.blurred.small
            }
        },
        selection: {
            position: `absolute`,
            flexDirection: `column`,
            alignItems: `stretch`,
            justifyContent: `center`,
            maxWidth: DEVICE_WIDTH,
            maxHeight: DEVICE_HEIGHT / 4,
            zIndex: 10,
            opacity: 0,
            transform: [{
                translateX: -DEVICE_WIDTH
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
            padding: 3,
            backgroundColor: `transparent`
        },
        box: {
            focused: {
                flexDirection: `column`,
                alignItems: `flex-end`,
                justifyContent: `flex-end`,
                height: DefaultTheme.field.size.text.input.normal * 1.65,
                paddingVertical: 3,
                paddingLeft: 6,
                overflow: `hidden`
            },
            blurred: {
                flexDirection: `column`,
                alignItems: `flex-end`,
                justifyContent: `flex-end`,
                height: DefaultTheme.field.size.text.input.normal * 1.65,
                paddingVertical: 3,
                paddingLeft: 6,
                overflow: `hidden`
            }
        },
        contentLeftRoom: {
            flexDirection: `row`,
            alignItems: `center`,
            justifyContent: `center`,
            maxHeight: DefaultTheme.field.size.text.input.normal - 6,
            backgroundColor: `transparent`
        },
        contentRightRoom: {
            flexDirection: `row`,
            alignItems: `center`,
            justifyContent: `center`,
            maxHeight: DefaultTheme.field.size.text.input.normal - 6,
            backgroundColor: `transparent`
        },
        input: {
            ...DefaultTheme.field.font.text.input.normal,
            flexGrow: 1,
            textAlign: `left`,
            alignSelf: `stretch`,
            alignItems: `stretch`,
            maxWidth: DEVICE_WIDTH,
            height: DefaultTheme.field.size.text.input.normal,
            paddingLeft: 6,
            backgroundColor: `transparent`
        },
        helper: {
            ...DefaultTheme.field.font.text.helper,
            textAlign: `right`,
            paddingRight: 9
        },
        status: {
            ...DefaultTheme.field.font.text.status,
            textAlign: `left`,
            paddingLeft: 6,
            color: DefaultTheme.field.color.text.status
        },
        label: {
            focused: {
                ...DefaultTheme.field.font.text.label.focused.normal,
                position: `absolute`,
                textAlign: `left`,
                paddingLeft: 6
            },
            blurred: {
                ...DefaultTheme.field.font.text.label.blurred.normal,
                position: `absolute`,
                textAlign: `left`,
                paddingLeft: 6
            }
        },
        underline: {
            focused: {
                justifyContent: `flex-end`,
                height: DefaultTheme.field.size.text.underline.focused.normal,
                transform: [{
                    scaleX: 0
                }]
            },
            blurred: {
                justifyContent: `flex-end`,
                height: DefaultTheme.field.size.text.underline.blurred.normal
            }
        },
        selection: {
            position: `absolute`,
            flexDirection: `column`,
            alignItems: `stretch`,
            justifyContent: `center`,
            maxWidth: DEVICE_WIDTH,
            maxHeight: DEVICE_HEIGHT / 4,
            zIndex: 10,
            opacity: 0,
            transform: [{
                translateX: -DEVICE_WIDTH
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
            padding: 3,
            backgroundColor: `transparent`
        },
        box: {
            focused: {
                flexDirection: `column`,
                alignItems: `flex-end`,
                justifyContent: `flex-end`,
                height: DefaultTheme.field.size.text.input.large * 1.65,
                paddingVertical: 3,
                paddingLeft: 6,
                overflow: `hidden`
            },
            blurred: {
                flexDirection: `column`,
                alignItems: `flex-end`,
                justifyContent: `flex-end`,
                height: DefaultTheme.field.size.text.input.large * 1.65,
                paddingVertical: 3,
                paddingLeft: 6,
                overflow: `hidden`
            }
        },
        contentLeftRoom: {
            flexDirection: `row`,
            alignItems: `center`,
            justifyContent: `center`,
            maxHeight: DefaultTheme.field.size.text.input.large - 6,
            backgroundColor: `transparent`
        },
        contentRightRoom: {
            flexDirection: `row`,
            alignItems: `center`,
            justifyContent: `center`,
            maxHeight: DefaultTheme.field.size.text.input.large - 6,
            backgroundColor: `transparent`
        },
        input: {
            ...DefaultTheme.field.font.text.input.large,
            flexGrow: 1,
            textAlign: `left`,
            alignSelf: `stretch`,
            alignItems: `stretch`,
            maxWidth: DEVICE_WIDTH,
            height: DefaultTheme.field.size.text.input.large,
            paddingLeft: 6,
            backgroundColor: `transparent`
        },
        helper: {
            ...DefaultTheme.field.font.text.helper,
            textAlign: `right`,
            paddingRight: 9
        },
        status: {
            ...DefaultTheme.field.font.text.status,
            textAlign: `left`,
            paddingLeft: 6,
            color: DefaultTheme.field.color.text.status
        },
        label: {
            focused: {
                ...DefaultTheme.field.font.text.label.focused.large,
                position: `absolute`,
                textAlign: `left`,
                paddingLeft: 6
            },
            blurred: {
                ...DefaultTheme.field.font.text.label.blurred.large,
                position: `absolute`,
                textAlign: `left`,
                paddingLeft: 6
            }
        },
        underline: {
            focused: {
                justifyContent: `flex-end`,
                height: DefaultTheme.field.size.text.underline.focused.large,
                transform: [{
                    scaleX: 0
                }]
            },
            blurred: {
                justifyContent: `flex-end`,
                height: DefaultTheme.field.size.text.underline.blurred.large
            }
        },
        selection: {
            position: `absolute`,
            flexDirection: `column`,
            alignItems: `stretch`,
            justifyContent: `center`,
            maxWidth: DEVICE_WIDTH,
            maxHeight: DEVICE_HEIGHT / 4,
            zIndex: 10,
            opacity: 0,
            transform: [{
                translateX: -DEVICE_WIDTH
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
    disabled: false
}, prevAdjustedStyle = DEFAULT_TEXT_FIELD_STYLE, Theme = DefaultTheme) => {
    const {
        shade,
        overlay,
        corner,
        margin,
        disabled,
        style
    } = newStyle;
    const themedShade = shade === `themed` ? Theme.field.text.shade : shade;
    const themedOverlay = overlay === `themed` ? Theme.field.text.overlay : overlay;
    const themedSelectionColor = Theme.field.color.text.box[themedShade];
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
    let themedBoxColor;
    let themedBoxBorderFocusColor;
    let themedBoxBorderBlurColor;
    let themedBorderRadius;
    let themedBorderWidth = 0;
    let themedInputColor;
    let themedHelperColor;
    let themedFocusColor;
    let themedBlurColor;
    let themedCorner;
    let themedMargin;

    if (disabled) {
        themedFocusColor = Theme.field.color.text.disabled[themedShade];
        themedBlurColor = themedFocusColor;
        themedInputColor = themedFocusColor;
    } else {
        themedFocusColor = Theme.field.color.text.focused[themedShade];
        themedBlurColor = Theme.field.color.text.blurred[themedShade];
        themedInputColor = Theme.field.color.text.input[themedShade];
    }

    themedHelperColor = Theme.field.color.text.helper[themedShade];

    switch (themedOverlay) { // eslint-disable-line
    case `opaque`:
        themedBoxColor = Theme.field.color.text.box[themedShade];
        themedBoxBorderFocusColor = `transparent`;
        themedBoxBorderBlurColor = `transparent`;
        break;
    case `translucent`:
        themedBoxColor = `${Theme.field.color.text.box[themedShade]}${Theme.field.color.text.opacity}`;
        themedBoxBorderFocusColor = `transparent`;
        themedBoxBorderBlurColor = `transparent`;
        break;
    case `translucent-outline`:
        themedBoxColor = `${Theme.field.color.text.box[themedShade]}${Theme.field.color.text.opacity}`;
        themedBoxBorderFocusColor = themedFocusColor;
        themedBoxBorderBlurColor = themedBlurColor;
        themedBorderWidth = 1;
        break;
    case `transparent`:
        themedBoxColor = `transparent`;
        themedBoxBorderFocusColor = `transparent`;
        themedBoxBorderBlurColor = `transparent`;
        break;
    case `transparent-outline`:
        themedBoxColor = `transparent`;
        themedBoxBorderFocusColor = themedFocusColor;
        themedBoxBorderBlurColor = themedBlurColor;
        themedBorderWidth = 1;
        break;
    }

    if (typeof corner === `string`) {
        if (corner === `themed`) {
            if (typeof Theme.field.text.corner === `string` && Theme.field.corner.text.hasOwnProperty(Theme.field.text.corner)) {
                themedCorner = Theme.field.corner.text[Theme.field.text.corner];
            } else {
                themedCorner = Theme.field.text.corner;
            }
        } else if (Theme.field.corner.text.hasOwnProperty(corner)) {
            themedCorner = Theme.field.corner.text[corner];
        } else {
            themedCorner = 0;
        }
    } else {
        themedCorner = corner;
    }
    if (typeof themedCorner === `number`) {
        themedBorderRadius = {
            small: {
                borderRadius: themedCorner
            },
            normal: {
                borderRadius: themedCorner
            },
            large: {
                borderRadius: themedCorner
            }
        };
    } else if (typeof themedCorner === `object`) {
        if (themedCorner.hasOwnProperty(`small`) && typeof themedCorner.small === `object` &&
            themedCorner.hasOwnProperty(`normal`) && typeof themedCorner.normal === `object` &&
            themedCorner.hasOwnProperty(`large`) && typeof themedCorner.large === `object`) {
            themedBorderRadius = {
                small: Object.entries(themedCorner.small).reduce((_themedBorderRadius, [ key, value ]) => {
                    let _borderRadius = nullBorderRadius;

                    _borderRadius[`border${key.charAt(0).toUpperCase()}${key.slice(1)}Radius`] = value;

                    return {
                        ..._themedBorderRadius,
                        ..._borderRadius
                    };
                }, nullBorderRadius),
                normal: Object.entries(themedCorner.normal).reduce((_themedBorderRadius, [ key, value ]) => {
                    let _borderRadius = nullBorderRadius;

                    _borderRadius[`border${key.charAt(0).toUpperCase()}${key.slice(1)}Radius`] = value;

                    return {
                        ..._themedBorderRadius,
                        ..._borderRadius
                    };
                }, nullBorderRadius),
                large: Object.entries(themedCorner.large).reduce((_themedBorderRadius, [ key, value ]) => {
                    let _borderRadius = nullBorderRadius;

                    _borderRadius[`border${key.charAt(0).toUpperCase()}${key.slice(1)}Radius`] = value;

                    return {
                        ..._themedBorderRadius,
                        ..._borderRadius
                    };
                }, nullBorderRadius)
            };
        } else if (themedCorner.hasOwnProperty(`small`) && typeof themedCorner.small === `number` &&
                   themedCorner.hasOwnProperty(`normal`) && typeof themedCorner.normal === `number` &&
                   themedCorner.hasOwnProperty(`large`) && typeof themedCorner.large === `number`) {
            themedBorderRadius = {
                small: {
                    borderRadius: themedCorner.small
                },
                normal: {
                    borderRadius: themedCorner.normal
                },
                large: {
                    borderRadius: themedCorner.large
                }
            };
        } else {
            themedBorderRadius = {
                small: {
                    ...nullBorderRadius,
                    ...themedCorner
                },
                normal: {
                    ...nullBorderRadius,
                    ...themedCorner
                },
                large: {
                    ...nullBorderRadius,
                    ...themedCorner
                }
            };
        }
    }

    if (typeof margin === `string`) {
        if (margin === `themed`) {
            if (typeof Theme.field.text.margin === `string` && Theme.field.margin.text.hasOwnProperty(Theme.field.text.margin)) {
                themedMargin = Theme.field.margin.text[Theme.field.text.margin];
            } else {
                themedMargin = Theme.field.text.margin;
            }
        } else if (Theme.field.margin.text.hasOwnProperty(margin)) {
            themedMargin = Theme.field.margin.text[margin];
        } else {
            themedMargin = 0;
        }
    } else {
        themedMargin = margin;
    }
    if (typeof themedMargin === `number`) {
        themedMargin = {
            small: {
                ...nullMargin,
                margin: themedMargin
            },
            normal: {
                ...nullMargin,
                margin: themedMargin
            },
            large: {
                ...nullMargin,
                margin: themedMargin
            }
        };
    } else if (typeof themedMargin === `object`) {
        themedMargin = Object.entries(themedMargin).reduce((_themedMargin, [ key, value ]) => {
            let _margin = nullMargin;

            _margin[`margin${key.charAt(0).toUpperCase()}${key.slice(1)}`] = value;
            _themedMargin = {
                small: {
                    ..._themedMargin.small,
                    ..._margin
                },
                normal: {
                    ..._themedMargin.normal,
                    ..._margin
                },
                large: {
                    ..._themedMargin.large,
                    ..._margin
                }
            };
            return _themedMargin;
        }, {
            small: nullMargin,
            normal: nullMargin,
            large: nullMargin
        });
    }

    return {
        small: {
            container: {
                ...prevAdjustedStyle.small.container,
                ...themedMargin.small,
                ...(typeof style === `object` && style.hasOwnProperty(`container`) && typeof style.container === `object` ? style.container : {})
            },
            box: {
                focused: {
                    ...prevAdjustedStyle.small.box.focused,
                    ...themedBorderRadius.small,
                    height: Theme.field.size.text.input.small * 1.65,
                    borderColor: themedBoxBorderFocusColor,
                    borderWidth: themedBorderWidth,
                    backgroundColor: themedBoxColor,
                    ...(typeof style === `object` && style.hasOwnProperty(`box`) &&
                        typeof style.box === `object` && style.box.hasOwnProperty(`focused`) && typeof style.box.focused === `object` ? style.box.focused : {})
                },
                blurred: {
                    ...prevAdjustedStyle.small.box.blurred,
                    ...themedBorderRadius.small,
                    height: Theme.field.size.text.input.small * 1.65,
                    borderColor: themedBoxBorderBlurColor,
                    borderWidth: themedBorderWidth,
                    backgroundColor: themedBoxColor,
                    ...(typeof style === `object` && style.hasOwnProperty(`box`) &&
                        typeof style.box === `object` && style.box.hasOwnProperty(`blurred`) && typeof style.box.blurred === `object` ? style.box.blurred : {})
                }
            },
            contentLeftRoom: {
                ...prevAdjustedStyle.small.contentLeftRoom,
                maxHeight: Theme.field.size.text.input.small - 6,
                ...(typeof style === `object` && style.hasOwnProperty(`contentLeftRoom`) && typeof style.contentLeftRoom === `object` ? style.contentLeftRoom : {})
            },
            contentRightRoom: {
                ...prevAdjustedStyle.small.contentRightRoom,
                maxHeight: Theme.field.size.text.input.small - 6,
                ...(typeof style === `object` && style.hasOwnProperty(`contentRightRoom`) && typeof style.contentRightRoom === `object` ? style.contentRightRoom : {})
            },
            input: {
                ...prevAdjustedStyle.small.input,
                ...Theme.field.font.text.input.small,
                height: Theme.field.size.text.input.small,
                color: themedInputColor,
                ...(typeof style === `object` && style.hasOwnProperty(`input`) && typeof style.input === `object` ? style.input : {})
            },
            helper: {
                ...prevAdjustedStyle.small.helper,
                ...Theme.field.font.text.helper,
                color: themedHelperColor,
                ...(typeof style === `object` && style.hasOwnProperty(`helper`) && typeof style.helper === `object` ? style.helper : {})
            },
            status: {
                ...prevAdjustedStyle.small.status,
                ...Theme.field.font.text.status,
                color: Theme.field.color.text.status,
                ...(typeof style === `object` && style.hasOwnProperty(`status`) && typeof style.status === `object` ? style.status : {})
            },
            label: {
                focused: {
                    ...prevAdjustedStyle.small.label.focused,
                    ...Theme.field.font.text.label.focused.small,
                    color: themedFocusColor,
                    ...(typeof style === `object` && style.hasOwnProperty(`label`) &&
                        typeof style.label === `object` && style.label.hasOwnProperty(`focused`) && typeof style.label.focused === `object` ? style.label.focused : {})
                },
                blurred: {
                    ...prevAdjustedStyle.small.label.blurred,
                    ...Theme.field.font.text.label.blurred.small,
                    color: themedFocusColor,
                    ...(typeof style === `object` && style.hasOwnProperty(`label`) &&
                        typeof style.label === `object` && style.label.hasOwnProperty(`blurred`) && typeof style.label.blurred === `object` ? style.label.blurred : {})
                }
            },
            underline: {
                focused: {
                    ...prevAdjustedStyle.small.underline.focused,
                    height: Theme.field.size.text.underline.focused.small,
                    backgroundColor: themedFocusColor,
                    ...(typeof style === `object` && style.hasOwnProperty(`underline`) &&
                        typeof style.underline === `object` && style.underline.hasOwnProperty(`focused`) && typeof style.underline.focused === `object` ? style.underline.focused : {})
                },
                blurred: {
                    ...prevAdjustedStyle.small.underline.blurred,
                    height: Theme.field.size.text.underline.blurred.small,
                    alignItems: overlay === `transparent` ? `flex-start` : `center`,
                    backgroundColor: themedBlurColor,
                    ...(typeof style === `object` && style.hasOwnProperty(`underline`) &&
                        typeof style.underline === `object` && style.underline.hasOwnProperty(`blurred`) && typeof style.underline.blurred === `object` ? style.underline.blurred : {})
                }
            },
            selection: {
                ...prevAdjustedStyle.small.selection,
                // ...dropShadow,
                ...themedBorderRadius.small,
                borderColor: themedBoxBorderBlurColor,
                borderWidth: themedBorderWidth,
                backgroundColor: themedSelectionColor,
                ...(typeof style === `object` && style.hasOwnProperty(`selection`) && typeof style.selection === `object` ? style.selection : {})
            }
        },
        normal: {
            container: {
                ...prevAdjustedStyle.normal.container,
                ...themedMargin.normal,
                ...(typeof style === `object` && style.hasOwnProperty(`container`) && typeof style.container === `object` ? style.container : {})
            },
            box: {
                focused: {
                    ...prevAdjustedStyle.normal.box.focused,
                    ...themedBorderRadius.normal,
                    height: Theme.field.size.text.input.normal * 1.65,
                    borderColor: themedBoxBorderFocusColor,
                    borderWidth: themedBorderWidth,
                    backgroundColor: themedBoxColor,
                    ...(typeof style === `object` && style.hasOwnProperty(`box`) &&
                        typeof style.box === `object` && style.box.hasOwnProperty(`focused`) && typeof style.box.focused === `object` ? style.box.focused : {})
                },
                blurred: {
                    ...prevAdjustedStyle.normal.box.blurred,
                    ...themedBorderRadius.normal,
                    height: Theme.field.size.text.input.normal * 1.65,
                    borderColor: themedBoxBorderBlurColor,
                    borderWidth: themedBorderWidth,
                    backgroundColor: themedBoxColor,
                    ...(typeof style === `object` && style.hasOwnProperty(`box`) &&
                        typeof style.box === `object` && style.box.hasOwnProperty(`blurred`) && typeof style.box.blurred === `object` ? style.box.blurred : {})
                }
            },
            contentLeftRoom: {
                ...prevAdjustedStyle.normal.contentLeftRoom,
                maxHeight: Theme.field.size.text.input.normal - 6,
                ...(typeof style === `object` && style.hasOwnProperty(`contentLeftRoom`) && typeof style.contentLeftRoom === `object` ? style.contentLeftRoom : {})
            },
            contentRightRoom: {
                ...prevAdjustedStyle.normal.contentRightRoom,
                maxHeight: Theme.field.size.text.input.normal - 6,
                ...(typeof style === `object` && style.hasOwnProperty(`contentRightRoom`) && typeof style.contentRightRoom === `object` ? style.contentRightRoom : {})
            },
            input: {
                ...prevAdjustedStyle.normal.input,
                ...Theme.field.font.text.input.normal,
                height: Theme.field.size.text.input.normal,
                color: themedInputColor,
                ...(typeof style === `object` && style.hasOwnProperty(`input`) && typeof style.input === `object` ? style.input : {})
            },
            helper: {
                ...prevAdjustedStyle.normal.helper,
                ...Theme.field.font.text.helper,
                color: themedHelperColor,
                ...(typeof style === `object` && style.hasOwnProperty(`helper`) && typeof style.helper === `object` ? style.helper : {})
            },
            status: {
                ...prevAdjustedStyle.normal.status,
                ...Theme.field.font.text.status,
                color: Theme.field.color.text.status,
                ...(typeof style === `object` && style.hasOwnProperty(`status`) && typeof style.status === `object` ? style.status : {})
            },
            label: {
                focused: {
                    ...prevAdjustedStyle.normal.label.focused,
                    ...Theme.field.font.text.label.focused.normal,
                    color: themedFocusColor,
                    ...(typeof style === `object` && style.hasOwnProperty(`label`) &&
                        typeof style.label === `object` && style.label.hasOwnProperty(`focused`) && typeof style.label.focused === `object` ? style.label.focused : {})
                },
                blurred: {
                    ...prevAdjustedStyle.normal.label.blurred,
                    ...Theme.field.font.text.label.blurred.normal,
                    color: themedFocusColor,
                    ...(typeof style === `object` && style.hasOwnProperty(`label`) &&
                        typeof style.label === `object` && style.label.hasOwnProperty(`blurred`) && typeof style.label.blurred === `object` ? style.label.blurred : {})
                }
            },
            underline: {
                focused: {
                    ...prevAdjustedStyle.normal.underline.focused,
                    height: Theme.field.size.text.underline.focused.normal,
                    backgroundColor: themedFocusColor,
                    ...(typeof style === `object` && style.hasOwnProperty(`underline`) &&
                        typeof style.underline === `object` && style.underline.hasOwnProperty(`focused`) && typeof style.underline.focused === `object` ? style.underline.focused : {})
                },
                blurred: {
                    ...prevAdjustedStyle.normal.underline.blurred,
                    height: Theme.field.size.text.underline.blurred.normal,
                    alignItems: overlay === `transparent` ? `flex-start` : `center`,
                    backgroundColor: themedBlurColor,
                    ...(typeof style === `object` && style.hasOwnProperty(`underline`) &&
                        typeof style.underline === `object` && style.underline.hasOwnProperty(`blurred`) && typeof style.underline.blurred === `object` ? style.underline.blurred : {})
                }
            },
            selection: {
                ...prevAdjustedStyle.normal.selection,
                // ...dropShadow,
                ...themedBorderRadius.normal,
                borderColor: themedBoxBorderBlurColor,
                borderWidth: themedBorderWidth,
                backgroundColor: themedSelectionColor,
                ...(typeof style === `object` && style.hasOwnProperty(`selection`) && typeof style.selection === `object` ? style.selection : {})
            }
        },
        large: {
            container: {
                ...prevAdjustedStyle.large.container,
                ...themedMargin.large,
                ...(typeof style === `object` && style.hasOwnProperty(`container`) && typeof style.container === `object` ? style.container : {})
            },
            box: {
                focused: {
                    ...prevAdjustedStyle.large.box.focused,
                    ...themedBorderRadius.large,
                    height: Theme.field.size.text.input.large * 1.65,
                    borderColor: themedBoxBorderFocusColor,
                    borderWidth: themedBorderWidth,
                    backgroundColor: themedBoxColor,
                    ...(typeof style === `object` && style.hasOwnProperty(`box`) &&
                        typeof style.box === `object` && style.box.hasOwnProperty(`focused`) && typeof style.box.focused === `object` ? style.box.focused : {})
                },
                blurred: {
                    ...prevAdjustedStyle.large.box.blurred,
                    ...themedBorderRadius.large,
                    height: Theme.field.size.text.input.large * 1.65,
                    borderColor: themedBoxBorderBlurColor,
                    borderWidth: themedBorderWidth,
                    backgroundColor: themedBoxColor,
                    ...(typeof style === `object` && style.hasOwnProperty(`box`) &&
                        typeof style.box === `object` && style.box.hasOwnProperty(`blurred`) && typeof style.box.blurred === `object` ? style.box.blurred : {})
                }
            },
            contentLeftRoom: {
                ...prevAdjustedStyle.large.contentLeftRoom,
                maxHeight: Theme.field.size.text.input.large - 6,
                ...(typeof style === `object` && style.hasOwnProperty(`contentLeftRoom`) && typeof style.contentLeftRoom === `object` ? style.contentLeftRoom : {})
            },
            contentRightRoom: {
                ...prevAdjustedStyle.large.contentRightRoom,
                maxHeight: Theme.field.size.text.input.large - 6,
                ...(typeof style === `object` && style.hasOwnProperty(`contentRightRoom`) && typeof style.contentRightRoom === `object` ? style.contentRightRoom : {})
            },
            input: {
                ...prevAdjustedStyle.large.input,
                ...Theme.field.font.text.input.large,
                height: Theme.field.size.text.input.large,
                color: themedInputColor,
                ...(typeof style === `object` && style.hasOwnProperty(`input`) && typeof style.input === `object` ? style.input : {})
            },
            helper: {
                ...prevAdjustedStyle.large.helper,
                ...Theme.field.font.text.helper,
                color: themedHelperColor,
                ...(typeof style === `object` && style.hasOwnProperty(`helper`) && typeof style.helper === `object` ? style.helper : {})
            },
            status: {
                ...prevAdjustedStyle.large.status,
                ...Theme.field.font.text.status,
                color: Theme.field.color.text.status,
                ...(typeof style === `object` && style.hasOwnProperty(`status`) && typeof style.status === `object` ? style.status : {})
            },
            label: {
                focused: {
                    ...prevAdjustedStyle.large.label.focused,
                    ...Theme.field.font.text.label.focused.large,
                    color: themedFocusColor,
                    ...(typeof style === `object` && style.hasOwnProperty(`label`) &&
                        typeof style.label === `object` && style.label.hasOwnProperty(`focused`) && typeof style.label.focused === `object` ? style.label.focused : {})
                },
                blurred: {
                    ...prevAdjustedStyle.large.label.blurred,
                    ...Theme.field.font.text.label.blurred.large,
                    color: themedFocusColor,
                    ...(typeof style === `object` && style.hasOwnProperty(`label`) &&
                        typeof style.label === `object` && style.label.hasOwnProperty(`blurred`) && typeof style.label.blurred === `object` ? style.label.blurred : {})
                }
            },
            underline: {
                focused: {
                    ...prevAdjustedStyle.large.underline.focused,
                    height: Theme.field.size.text.underline.focused.large,
                    backgroundColor: themedFocusColor,
                    ...(typeof style === `object` && style.hasOwnProperty(`underline`) &&
                        typeof style.underline === `object` && style.underline.hasOwnProperty(`focused`) && typeof style.underline.focused === `object` ? style.underline.focused : {})
                },
                blurred: {
                    ...prevAdjustedStyle.large.underline.blurred,
                    height: Theme.field.size.text.underline.blurred.large,
                    alignItems: overlay === `transparent` ? `flex-start` : `center`,
                    backgroundColor: themedBlurColor,
                    ...(typeof style === `object` && style.hasOwnProperty(`underline`) &&
                        typeof style.underline === `object` && style.underline.hasOwnProperty(`blurred`) && typeof style.underline.blurred === `object` ? style.underline.blurred : {})
                }
            },
            selection: {
                ...prevAdjustedStyle.large.selection,
                // ...dropShadow,
                ...themedBorderRadius.large,
                borderColor: themedBoxBorderBlurColor,
                borderWidth: themedBorderWidth,
                backgroundColor: themedSelectionColor,
                ...(typeof style === `object` && style.hasOwnProperty(`selection`) && typeof style.selection === `object` ? style.selection : {})
            }
        }
    };
};

export default class TextField extends React.Component {
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
        autoFocus: PropTypes.bool,
        autoCorrect: PropTypes.bool,
        secured: PropTypes.bool,
        underlined: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.string
        ]),
        disabled: PropTypes.bool,
        initialValue: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
        selectableValues: PropTypes.arrayOf(PropTypes.oneOfType([ PropTypes.number, PropTypes.string, PropTypes.object ])),
        label: PropTypes.string,
        hint: PropTypes.string,
        charLimit: PropTypes.number,
        lineLimit: PropTypes.number,
        inputType: PropTypes.oneOf([
            `default`,
            `numeric`, `monetary`, `phone-pad`,
            `email-address`,
            `credit-card-visa`, `credit-card-master`, `credit-card-discover`, `credit-card-american-express`
        ]),
        disableValidation: PropTypes.bool,
        disableFormatting: PropTypes.bool,
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
        onValidate: PropTypes.func,
        onReformat: PropTypes.func,
        onEditing: PropTypes.func,
        onDoneEdit: PropTypes.func,
        onSelect: PropTypes.func,
        onFocus: PropTypes.func,
        onBlur: PropTypes.func,
        onHideSelection: PropTypes.func,
        onShowSelection: PropTypes.func,
        onClear: PropTypes.func,
        renderSelectableItem: PropTypes.func
    }
    static defaultProps = {
        room: `none`,
        shade: `themed`,
        overlay: `themed`,
        corner: `themed`,
        size: `themed`,
        margin: `themed`,
        autoFocus: false,
        autoCorrect: false,
        secured: false,
        underlined: `themed`,
        disabled: false,
        initialValue: ``,
        selectableValues: [],
        label: ``,
        hint: ``,
        charLimit: -1,
        lineLimit: 1,
        inputType: `default`,
        disableValidation: false,
        disableFormatting: false,
        initialAnimation: `themed`,
        onValidate: (value, inputType) => {
            let regex;
            let validated = true;
            let status = ``;

            switch(inputType) {
            case `email-address`:
                regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

                validated = regex.test(value);
                status = validated ? `` : `Email is invalid`;
                break;
            case `phone-pad`:
                regex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

                validated = regex.test(value);
                status = validated ? `` : `Phone number is invalid`;
                break;
            case `credit-card-visa`:
                regex = /^4[0-9]{12}(?:[0-9]{3})?$/;

                validated = regex.test(value);
                status = validated ? `` : `Visa credit card number is invalid`;
                break;
            case `credit-card-master`:
                regex = /^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/;

                validated = regex.test(value);
                status = validated ? `` : `Master credit card number is invalid`;
                break;
            case `credit-card-discover`:
                regex = /^6(?:011|5[0-9]{2})[0-9]{12}$/;

                validated = regex.test(value);
                status = validated ? `` : `Discover credit card number is invalid`;
                break;
            case `credit-card-american-express`:
                regex = /^3[47][0-9]{13}$/;

                validated = regex.test(value);
                status = validated ? `` : `American Express credit card number is invalid`;
                break;
            case `default`:
                break;
            default:
                break;
            }

            return {
                validated,
                status
            };
        },
        onReformat: (value, inputType) => {
            let reformattedValue = value;

            switch(inputType) { //eslint-disable-line
            case `monetary`:
                reformattedValue = `${parseFloat(value).toFixed(2)}`;
                break;
            case `numeric`:
                reformattedValue = `${parseFloat(value)}`;
                break;
            case `phone-pad` || `credit-card-visa` || `credit-card-master` || `credit-card-discover` || `credit-card-american-express`:
                reformattedValue = `${parseInt(value, 10)}`;
                break;
            default:
                reformattedValue = value;
                break;
            }
            return reformattedValue;
        },
        onEditing: () => null,
        onDoneEdit: () => null,
        onSelect: () => null,
        onFocus: () => null,
        onBlur: () => null,
        onHideSelection: () => null,
        onShowSelection: () => null,
        onClear: () => null,
        renderSelectableItem: () => null // eslint-disable-line
    }
    static getDerivedStateFromProps (props, state) {
        const {
            shade,
            overlay,
            corner,
            margin,
            disabled,
            inputType,
            disableValidation,
            onValidate,
            style
        } = props;
        const {
            Theme
        } = state.context;

        if (disableValidation || !isEmptyInputValue(state.value)) {
            const {
                validated,
                status
            } = onValidate(state.value, inputType);

            return {
                adjustedStyle: readjustStyle({
                    shade,
                    overlay,
                    corner,
                    margin,
                    disabled,
                    style
                }, state.adjustedStyle, Theme),
                validation: {
                    validated,
                    status
                }
            };
        }
        return {
            adjustedStyle: readjustStyle({
                shade,
                overlay,
                corner,
                margin,
                disabled,
                style
            }, state.adjustedStyle, Theme)
        };
    }
    constructor (props) {
        super(props);

        const component = this;
        const {
            size
        } = props;
        const themedSize = size === `themed` ? DefaultTheme.field.text.size : size;

        component.refCache = {};
        component.state = {
            context: {
                Theme: DefaultTheme
            },
            visibility: {
                selection: false
            },
            adjustedStyle: DEFAULT_TEXT_FIELD_STYLE,
            container: {
                width: 0,
                height: DefaultTheme.field.size.text.input[themedSize] * 1.65,
                top: 0,
                left: 0
            },
            input: {
                focused: false,
                width: 0,
                height: DefaultTheme.field.size.text.input[themedSize],
                top: 0,
                left: 0,
                value: props.initialValue,
                lineCount: 1
            },
            validation: {
                validated: true,
                status: ``
            }
        };
    }
    isValidated = () => {
        const component = this;
        const {
            validation
        } = component.state;

        return validation.validated;
    }
    isSelectionVisible = () => {
        const component = this;
        const {
            visibility
        } = component.state;

        return visibility.selection;
    }
    isFocused = () => {
        const component = this;
        const textInput = component.refCache[`text-input`];

        if (textInput !== undefined) {
            return textInput.isFocused();
        }
        return false;
    }
    showSelection = (animation = {
        transitions: null,
        onTransitionBegin: () => null,
        onTransitionEnd: () => null,
        onAnimationBegin: () => null,
        onAnimationEnd: () => null
    }) => {
        const component = this;
        const {
            disabled,
            onShowSelection
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

            if (!disabled && !visibility.selection) {
                animationPromises = component.animate({
                    refName: `animated-selection-view`,
                    transitions: Array.isArray(transitions) ? transitions : [{
                        to: {
                            translateX: 0
                        },
                        option: {
                            duration: DEFAULT_ANIMATION_DURATION_MS / 2,
                            delay: 0,
                            easing: `linear`
                        }
                    }, {
                        to: {
                            opacity: 1
                        },
                        option: {
                            duration: DEFAULT_ANIMATION_DURATION_MS / 2,
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
                            selection: true
                        }
                    };
                }, () => {
                    onShowSelection();
                });
                return animationPromises;
            }
        }
    }
    hideSelection = (animation = {
        transitions: null,
        onTransitionBegin: () => null,
        onTransitionEnd: () => null,
        onAnimationBegin: () => null,
        onAnimationEnd: () => null
    }) => {
        const component = this;
        const {
            disabled,
            onHideSelection
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

            if (!disabled && visibility.selection) {
                animationPromises = component.animate({
                    refName: `animated-selection-view`,
                    transitions: Array.isArray(transitions) ? transitions : [{
                        to: {
                            opacity: 0
                        },
                        option: {
                            duration: DEFAULT_ANIMATION_DURATION_MS / 2,
                            delay: 0,
                            easing: `linear`
                        }
                    }, {
                        to: {
                            translateX: -DEVICE_WIDTH
                        },
                        option: {
                            duration: DEFAULT_ANIMATION_DURATION_MS / 2,
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
                            selection: false
                        }
                    };
                }, () => {
                    onHideSelection();
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
            size,
            disabled,
            hint,
            onClear
        } = component.props;
        const {
            input
        } = component.state;
        const {
            Theme
        } = component.context;
        const themedSize = size === `themed` ? Theme.field.text.size : size;

        if (!disabled) {
            if (hint.length === 0) {
                component.animate({
                    refName: `animated-label-text`,
                    transitions: [{
                        to: {
                            top: (input.top + Theme.field.font.text.label.focused[themedSize].fontSize),
                            fontSize: Theme.field.font.text.label.blurred[themedSize].fontSize
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
                    input: {
                        ...prevState.input,
                        height: Theme.field.size.text.input[themedSize],
                        value: ``,
                        lineCount: 1
                    },
                    validation: {
                        validated: true,
                        status: ``
                    }
                };
            }, () => {
                onClear();
            });
        }
    }
    onFocus = () => {
        const component = this;
        const {
            size,
            underlined,
            label,
            hint,
            onFocus
        } = component.props;
        const {
            input
        } = component.state;
        const {
            Theme
        } = component.context;
        const themedSize = size === `themed` ? Theme.field.text.size : size;

        if (label.length > 0 && hint.length === 0 && isEmptyInputValue(input.value)) {
            component.animate({
                refName: `animated-label-text`,
                transitions: [{
                    to: {
                        top: -(input.top + Theme.field.font.text.label.focused[themedSize].fontSize),
                        fontSize: Theme.field.font.text.label.focused[themedSize].fontSize
                    },
                    option: {
                        duration: DEFAULT_ANIMATION_DURATION_MS,
                        delay: 0,
                        easing: `linear`
                    }
                }]
            });
        }
        if (underlined) {
            component.animate({
                refName: `animated-underline-focused-view`,
                transitions: [{
                    from: {
                        scaleX: 0
                    },
                    to: {
                        scaleX: 1
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
            size,
            underlined,
            label,
            hint,
            onBlur
        } = component.props;
        const {
            input
        } = component.state;
        const {
            Theme
        } = component.context;
        const themedSize = size === `themed` ? Theme.field.text.size : size;

        if (label.length > 0 && hint.length === 0 && isEmptyInputValue(input.value)) {
            component.animate({
                refName: `animated-label-text`,
                transitions: [{
                    to: {
                        top: (input.top + Theme.field.font.text.label.focused[themedSize].fontSize),
                        fontSize: Theme.field.font.text.label.blurred[themedSize].fontSize
                    },
                    option: {
                        duration: DEFAULT_ANIMATION_DURATION_MS,
                        delay: 0,
                        easing: `linear`
                    }
                }]
            });
        }
        if (underlined) {
            component.animate({
                refName: `animated-underline-focused-view`,
                transitions: [{
                    from: {
                        scaleX: 1
                    },
                    to: {
                        scaleX: 0
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
                input: {
                    ...prevState.input,
                    focused: false
                }
            };
        }, () => {
            onBlur();
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
    onUpdateInputSize = (event) => {
        const component = this;
        const {
            size,
            lineLimit
        } = component.props;
        const {
            Theme
        } = component.context;
        const themedSize = size === `themed` ? Theme.field.text.size : size;
        const {
            width,
            height
        } = event.nativeEvent.contentSize;

        requestAnimationFrame(() => {
            if (lineLimit === -1 || lineLimit > 1) {
                component.setState((prevState) => {
                    let lineCount = Math.ceil(height / Theme.field.size.text.input[themedSize]);
                    return {
                        input: {
                            ...prevState.input,
                            width,
                            height: Theme.field.size.text.input[themedSize] * lineCount,
                            lineCount
                        }
                    };
                });
            }
        });
    }
    onChangeText = (text) => {
        const component = this;
        const {
            inputType,
            disableFormatting,
            onReformat,
            onEditing
        } = component.props;
        const value = text;

        if (isEmptyInputValue(value)) {
            component.setState((prevState) => {
                return {
                    input: {
                        ...prevState.input,
                        value: ``
                    }
                };
            }, () => {
                onEditing(value);
            });
        } else if (!disableFormatting) {
            const reformattedValue = onReformat(value, inputType);

            component.setState((prevState) => {
                return {
                    input: {
                        ...prevState.input,
                        value: reformattedValue
                    }
                };
            }, () => {
                onEditing(reformattedValue);
            });
        } else {
            component.setState((prevState) => {
                return {
                    input: {
                        ...prevState.input,
                        value
                    }
                };
            }, () => {
                onEditing(value);
            });
        }
    }
    onEndEditing = (event) => {
        const component = this;
        const {
            inputType,
            disableValidation,
            onValidate
        } = component.props;
        const value = event.nativeEvent.text;

        if (!disableValidation) {
            const {
                validated,
                status
            } = onValidate(value, inputType);

            component.setState(() => {
                return {
                    validation: {
                        validated,
                        status
                    }
                };
            });
        }
    }
    onSubmitEditing = (event) => {
        const component = this;
        const {
            lineLimit,
            inputType,
            disableValidation,
            onDoneEdit,
            onValidate
        } = component.props;
        const value = event.nativeEvent.text;

        if (!(lineLimit === -1 || lineLimit > 1)) {
            dismissKeyboard();
        }

        if (!disableValidation) {
            const {
                validated,
                status
            } = onValidate(value, inputType);

            component.setState(() => {
                return {
                    validation: {
                        validated,
                        status
                    }
                };
            }, () => {
                onDoneEdit(value);
            });
        } else {
            onDoneEdit(value);
        }
    }
    onPressSelect = (item) => {
        const component = this;
        const {
            size,
            disabled,
            label,
            hint,
            onDoneEdit,
            onSelect
        } = component.props;
        const {
            input
        } = component.state;
        const {
            Theme
        } = component.context;
        const themedSize = size === `themed` ? Theme.field.text.size : size;

        if (!disabled && !isEmptyInputValue(item.value)) {
            if (label.length > 0 && hint.length === 0 && isEmptyInputValue(input.value)) {
                component.animate({
                    refName: `animated-label-text`,
                    transitions: [{
                        to: {
                            top: -(input.top + Theme.field.font.text.label.focused[themedSize].fontSize),
                            fontSize: Theme.field.font.text.label.focused[themedSize].fontSize
                        },
                        option: {
                            duration: DEFAULT_ANIMATION_DURATION_MS,
                            delay: 0,
                            easing: `linear`
                        }
                    }],
                    onAnimationEnd: () => {
                        component.setState((prevState) => {
                            return {
                                input: {
                                    ...prevState.input,
                                    value: item.value
                                }
                            };
                        }, () => {
                            const textInput = component.refCache[`text-input`];
                            if (textInput !== undefined) {
                                textInput.setNativeProps({
                                    text: item.value
                                });
                            }
                            onDoneEdit(item.value);
                            onSelect(item.value);
                        });
                    }
                });
            } else {
                component.setState((prevState) => {
                    return {
                        input: {
                            ...prevState.input,
                            value: item.value
                        }
                    };
                }, () => {
                    const textInput = component.refCache[`text-input`];
                    if (textInput !== undefined) {
                        textInput.setNativeProps({
                            text: item.value
                        });
                    }
                    onDoneEdit(item.value);
                    onSelect(item.value);
                });
            }
        }
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
            if (Theme.field.animation.text.hasOwnProperty(animationName)) {
                animation = Theme.field.animation.text[animationName];
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
            disabled,
            initialAnimation,
            style
        } = component.props;
        const {
            Theme
        } = component.context;
        const textInput = component.refCache[`text-input`];

        requestAnimationFrame(() => {
            if (textInput !== undefined) {
                textInput.measure((
                    left,
                    top,
                    width,
                    height // eslint-disable-line
                ) => {
                    component.setState((prevState) => {
                        return {
                            input: {
                                ...prevState.input,
                                top,
                                left,
                                width
                            }
                        };
                    });
                });
            }
        });

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
                    disabled,
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
    renderFloatingLabel () {
        const component = this;
        const {
            size,
            label,
            hint
        } = component.props;
        const {
            adjustedStyle,
            input
        } = component.state;
        const {
            Theme
        } = component.context;
        const themedSize = size === `themed` ? Theme.field.text.size : size;

        if (hint.length === 0 && isEmptyInputValue(input.value)) {
            return (
                <AnimatedText
                    ref = {(componentRef) => {
                        component.refCache[`animated-label-text`] = componentRef;
                    }}
                    style = { input.focused ? {
                        ...adjustedStyle[themedSize].label.focused,
                        left: input.left
                    } : {
                        ...adjustedStyle[themedSize].label.blurred,
                        left: input.left
                    }}
                    duration = { DEFAULT_ANIMATION_DURATION_MS }
                    useNativeDriver = { false }
                >{ label }</AnimatedText>
            );
        }
        return (
            <AnimatedText
                ref = {(componentRef) => {
                    component.refCache[`animated-label-text`] = componentRef;
                }}
                style = { input.focused ? {
                    ...adjustedStyle[themedSize].label.focused,
                    top: -(input.top + Theme.field.font.text.label.focused[themedSize].fontSize),
                    left: input.left,
                    fontSize: Theme.field.font.text.label.focused[themedSize].fontSize
                } : {
                    ...adjustedStyle[themedSize].label.blurred,
                    top: -(input.top + Theme.field.font.text.label.focused[themedSize].fontSize),
                    left: input.left,
                    fontSize: Theme.field.font.text.label.focused[themedSize].fontSize
                }}
                duration = { DEFAULT_ANIMATION_DURATION_MS }
                useNativeDriver = { false }
            >{ label }</AnimatedText>
        );
    }
    renderUnderline () {
        const component = this;
        const {
            overlay,
            size,
            underlined
        } = component.props;
        const {
            adjustedStyle,
            container
        } = component.state;
        const {
            Theme
        } = component.context;
        const themedSize = size === `themed` ? Theme.field.text.size : size;

        if (underlined) {
            return (
                <View
                    ref = {(componentRef) => {
                        component.refCache[`underline-blurred-view`] = componentRef;
                    }}
                    style = { overlay !== `transparent` ? adjustedStyle[themedSize].underline.blurred : {
                        width: container.width - 6,
                        ...adjustedStyle[themedSize].underline.blurred
                    }}
                >
                    <AnimatedView
                        ref = {(componentRef) => {
                            component.refCache[`animated-underline-focused-view`] = componentRef;
                        }}
                        style = {{
                            width: container.width - 6,
                            ...adjustedStyle[themedSize].underline.focused
                        }}
                        duration = { DEFAULT_ANIMATION_DURATION_MS }
                        useNativeDriver = { true }
                    />
                </View>
            );
        }
        return null;
    }
    renderStatusAndHelper () {
        const component = this;
        const {
            size,
            charLimit
        } = component.props;
        const {
            adjustedStyle,
            input,
            validation
        } = component.state;
        const {
            Theme
        } = component.context;
        const themedSize = size === `themed` ? Theme.field.text.size : size;

        return (
            <View style = {{
                flexDirection: `row`,
                alignSelf: `stretch`,
                alignItems: `center`,
                justifyContent: `space-between`,
                backgroundColor: `transparent`
            }}>
                <View style = {{
                    alignSelf: `flex-start`,
                    alignItems: `center`,
                    justifyContent: `center`,
                    backgroundColor: `transparent`
                }}>
                    {
                        <Text style = { adjustedStyle[themedSize].status }>{ validation.status }</Text>
                    }
                </View>
                <View style = {{
                    alignSelf: `flex-end`,
                    alignItems: `center`,
                    justifyContent: `center`,
                    backgroundColor: `transparent`
                }}>
                    {
                        charLimit === -1 ? null : <Text style = { adjustedStyle[themedSize].helper }>{ `${input.value.length} / ${charLimit}` }</Text>
                    }
                </View>
            </View>
        );
    }
    renderInput () {
        const component = this;
        const {
            size,
            autoFocus,
            autoCorrect,
            secured,
            disabled,
            hint,
            charLimit,
            lineLimit,
            inputType
        } = component.props;
        const {
            adjustedStyle,
            input
        } = component.state;
        const {
            Theme
        } = component.context;
        const themedSize = size === `themed` ? Theme.field.text.size : size;

        let keyboardType = `default`;
        let returnKeyType = `default`;

        if (inputType === `numeric` || inputType === `monetary`) {
            keyboardType = `numeric`;
            returnKeyType = `done`;
        } else if (inputType === `phone-pad` ||
                   inputType === `credit-card-visa` ||
                   inputType === `credit-card-master` ||
                   inputType === `credit-card-discover` ||
                   inputType === `credit-card-american-express`
        ) {
            keyboardType = `phone-pad`;
            returnKeyType = `done`;
        } else {
            keyboardType = inputType;
        }

        return (
            <TextInput
                ref = {(componentRef) => {
                    component.refCache[`text-input`] = componentRef;
                }}
                style = {{
                    ...adjustedStyle[themedSize].input,
                    height: input.height
                }}
                keyboardType = { keyboardType }
                returnKeyType = { returnKeyType }
                autoFocus = { autoFocus }
                autoCorrect = { autoCorrect }
                secureTextEntry = { secured }
                blurOnSubmit = { !(lineLimit === -1 || lineLimit > 1) }
                multiline = { lineLimit === -1 || lineLimit > 1 }
                numberOfLines = { lineLimit }
                editable = { !disabled }
                maxLength = { charLimit }
                defaultValue = { input.value }
                value = { input.value }
                placeholder = { hint }
                placeholderTextColor = { Theme.field.color.text.hint }
                onFocus = { component.onFocus }
                onBlur = { component.onBlur }
                onContentSizeChange = { component.onUpdateInputSize }
                onChangeText = { component.onChangeText }
                onEndEditing = { component.onEndEditing }
                onSubmitEditing = { component.onSubmitEditing }
            />
        );
    }
    renderSelection () {
        const component = this;
        const {
            size,
            selectableValues,
            renderSelectableItem
        } = component.props;
        const {
            adjustedStyle,
            container,
            input
        } = component.state;
        const {
            Theme
        } = component.context;
        const themedSize = size === `themed` ? Theme.field.text.size : size;

        const selectable = selectableValues.length > 0;

        if (selectable) {
            const selectableItems = selectableValues.map((value, index) => {
                return {
                    key: `${index}`,
                    selected: typeof value === `object` && value.hasOwnProperty(`value`) ? value.value === input.value : value === input.value,
                    value
                };
            });

            return (
                <AnimatedView
                    key = 'text-field-animated-selection-view'
                    ref = {(componentRef) => {
                        component.refCache[`animated-selection-view`] = componentRef;
                    }}
                    style = {{
                        width: container.width - 6,
                        left: container.left + 3,
                        bottom: container.height - 6,
                        ...adjustedStyle[themedSize].selection
                    }}
                    pointerEvents = 'box-none'
                    useNativeDriver = { true }
                >
                    <FlatList
                        data = { selectableItems }
                        style = {{
                            backgroundColor: `transparent`
                        }}
                        renderItem = {({
                            item
                        }) => {
                            return renderSelectableItem(
                                item,
                                component.onPressSelect,
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
        const themedSize = size === `themed` ? Theme.field.text.size : size;

        return (
            <AnimatedView
                ref = {(componentRef) => {
                    component.refCache[`animated-box-view`] = componentRef;
                }}
                style = { input.focused ? {
                    ...adjustedStyle[themedSize].box.focused,
                    justifyContent: input.lineCount > 1 ? `flex-start` : `flex-end`,
                    height: Theme.field.size.text.input[themedSize] * 1.65 * input.lineCount,
                    paddingTop: input.lineCount > 1 ? 21 : 0
                } : {
                    ...adjustedStyle[themedSize].box.blurred,
                    justifyContent: input.lineCount > 1 ? `flex-start` : `flex-end`,
                    height: Theme.field.size.text.input[themedSize] * 1.65 * input.lineCount,
                    paddingTop: input.lineCount > 1 ? 21 : 0
                }}
                useNativeDriver = { false }
            >
                <View
                    style = {{
                        flexDirection: `row`,
                        alignItems: `center`,
                        justifyContent: `center`,
                        backgroundColor: `transparent`
                    }}
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
                        component.renderFloatingLabel()
                    }
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
                </View>
            </AnimatedView>
        );
    }
    render () {
        const component = this;
        const {
            shade,
            size,
            autoFocus,
            disabled,
            selectableValues,
            children
        } = component.props;
        const {
            adjustedStyle,
            visibility,
            input
        } = component.state;
        const {
            Theme
        } = component.context;
        const themedSize = size === `themed` ? Theme.field.text.size : size;
        const selectable = selectableValues.length > 0;

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
                            indentation: 0,
                            disabled
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
                            indentation: 0,
                            disabled
                        };

                        if (typeof action === `string`) {
                            actionName = action;
                        } else if (typeof action === `object` && action.hasOwnProperty(`name`)) {
                            actionName = action.name;
                            if (action.hasOwnProperty(`args`) && Array.isArray(action.args)) {
                                actionArgs = action.args;
                            }
                        }

                        switch (actionName) { // eslint-disable-line
                        case `clear`:
                            if (!isEmptyInputValue(input.value)) {
                                return React.cloneElement(child, {
                                    ...inheritedProps,
                                    onPress: () => component.clear(...actionArgs)
                                });
                            }
                            return null;
                        case `show-selection`:
                            if (selectable && !visibility.selection) {
                                return React.cloneElement(child, {
                                    ...inheritedProps,
                                    onPress: () => component.showSelection(...actionArgs)
                                });
                            }
                            return null;
                        case `hide-selection`:
                            if (selectable && visibility.selection) {
                                return React.cloneElement(child, {
                                    ...inheritedProps,
                                    onPress: () => component.hideSelection(...actionArgs)
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
                key = 'text-field-animated-container-view'
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
                {
                    component.renderUnderline()
                }
                {
                    component.renderStatusAndHelper()
                }
            </AnimatedView>,
            component.renderSelection()
        ]);
    }
}

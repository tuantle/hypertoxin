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
 * @module RaisedButton
 * @description - Raised button component.
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

import {
    DefaultTheme,
    DefaultThemeContext
} from '../../themes/default-theme';

const {
    Animated,
    Easing,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} = ReactNative;

const DEFAULT_TOUCH_PRESS_DEBOUNCE_TIME_MS = 250;

const DEFAULT_ANIMATION_DURATION_MS = 300;

const DEFAULT_DROP_SHADOW_STYLE = {
    shadowColor: DefaultTheme.color.palette.black,
    shadowRadius: 2,
    shadowOpacity: 0.3,
    shadowOffset: {
        width: 0,
        height: 1
    }
};

const DEFAULT_RAISED_BUTTON_STYLE = {
    small: {
        container: {
            ...DEFAULT_DROP_SHADOW_STYLE,
            flexDirection: `row`,
            justifyContent: `center`,
            alignItems: `center`,
            height: DefaultTheme.button.size.raised.small,
            padding: 3
        },
        contentLeftRoom: {
            flexDirection: `row`,
            alignItems: `center`,
            justifyContent: `center`,
            maxHeight: DefaultTheme.button.size.raised.small - 6,
            backgroundColor: `transparent`
        },
        contentMiddleRoom: {
            flexDirection: `row`,
            alignItems: `center`,
            justifyContent: `center`,
            minWidth: DefaultTheme.button.size.raised.small - 6,
            maxHeight: DefaultTheme.button.size.raised.small - 6,
            backgroundColor: `transparent`
        },
        contentRightRoom: {
            flexDirection: `row`,
            alignItems: `center`,
            justifyContent: `center`,
            maxHeight: DefaultTheme.button.size.raised.small - 6,
            backgroundColor: `transparent`
        },
        badgeRoom: {
            ...DEFAULT_DROP_SHADOW_STYLE,
            flexDirection: `row`,
            position: `absolute`,
            alignSelf: `stretch`,
            alignItems: `center`,
            justifyContent: `center`,
            minWidth: DefaultTheme.misc.size.badge.small,
            height: DefaultTheme.misc.size.badge.small,
            top: -9,
            right: -9,
            borderRadius: DefaultTheme.misc.size.badge.small / 2
        },
        activityIndicatorRoom: {
            flexDirection: `row`,
            alignItems: `center`,
            justifyContent: `center`,
            minWidth: DefaultTheme.button.size.raised.small - 6,
            maxHeight: DefaultTheme.button.size.raised.small - 6,
            backgroundColor: `transparent`
        },
        label: {
            ...DefaultTheme.button.font.raised.label.small,
            paddingHorizontal: 6
        },
        ripple: {
            position: `absolute`,
            width: DefaultTheme.button.size.raised.small,
            height: DefaultTheme.button.size.raised.small,
            borderRadius: DefaultTheme.button.size.raised.small / 2,
            overflow: `hidden`
        }
    },
    normal: {
        container: {
            ...DEFAULT_DROP_SHADOW_STYLE,
            flexDirection: `row`,
            justifyContent: `center`,
            alignItems: `center`,
            height: DefaultTheme.button.size.raised.normal,
            padding: 3
        },
        contentLeftRoom: {
            flexDirection: `row`,
            alignItems: `center`,
            justifyContent: `center`,
            maxHeight: DefaultTheme.button.size.raised.normal - 6,
            backgroundColor: `transparent`
        },
        contentMiddleRoom: {
            flexDirection: `row`,
            alignItems: `center`,
            justifyContent: `center`,
            minWidth: DefaultTheme.button.size.raised.normal - 6,
            maxHeight: DefaultTheme.button.size.raised.normal - 6,
            backgroundColor: `transparent`
        },
        contentRightRoom: {
            flexDirection: `row`,
            alignItems: `center`,
            justifyContent: `center`,
            maxHeight: DefaultTheme.button.size.raised.normal - 6,
            backgroundColor: `transparent`
        },
        badgeRoom: {
            ...DEFAULT_DROP_SHADOW_STYLE,
            flexDirection: `row`,
            position: `absolute`,
            alignSelf: `stretch`,
            alignItems: `center`,
            justifyContent: `center`,
            minWidth: DefaultTheme.misc.size.badge.normal,
            height: DefaultTheme.misc.size.badge.normal,
            top: -12,
            right: -12,
            borderRadius: DefaultTheme.misc.size.badge.normal / 2
        },
        activityIndicatorRoom: {
            flexDirection: `row`,
            alignItems: `center`,
            justifyContent: `center`,
            minWidth: DefaultTheme.button.size.raised.normal - 6,
            maxHeight: DefaultTheme.button.size.raised.normal - 6,
            backgroundColor: `transparent`
        },
        label: {
            ...DefaultTheme.button.font.raised.label.normal,
            paddingHorizontal: 6
        },
        ripple: {
            position: `absolute`,
            width: DefaultTheme.button.size.raised.normal,
            height: DefaultTheme.button.size.raised.normal,
            borderRadius: DefaultTheme.button.size.raised.normal / 2,
            overflow: `hidden`
        }
    },
    large: {
        container: {
            ...DEFAULT_DROP_SHADOW_STYLE,
            flexDirection: `row`,
            justifyContent: `center`,
            alignItems: `center`,
            height: DefaultTheme.button.size.raised.large,
            padding: 3
        },
        contentLeftRoom: {
            flexDirection: `row`,
            alignItems: `center`,
            justifyContent: `center`,
            maxHeight: DefaultTheme.button.size.raised.large - 6,
            backgroundColor: `transparent`
        },
        contentMiddleRoom: {
            flexDirection: `row`,
            alignItems: `center`,
            justifyContent: `center`,
            minWidth: DefaultTheme.button.size.raised.large - 6,
            maxHeight: DefaultTheme.button.size.raised.large - 6,
            backgroundColor: `transparent`
        },
        contentRightRoom: {
            flexDirection: `row`,
            alignItems: `center`,
            justifyContent: `center`,
            maxHeight: DefaultTheme.button.size.raised.large - 6,
            backgroundColor: `transparent`
        },
        badgeRoom: {
            ...DEFAULT_DROP_SHADOW_STYLE,
            flexDirection: `row`,
            position: `absolute`,
            alignSelf: `stretch`,
            alignItems: `center`,
            justifyContent: `center`,
            minWidth: DefaultTheme.misc.size.badge.large,
            height: DefaultTheme.misc.size.badge.large,
            top: -15,
            right: -15,
            borderRadius: DefaultTheme.misc.size.badge.large / 2
        },
        activityIndicatorRoom: {
            flexDirection: `row`,
            alignItems: `center`,
            justifyContent: `center`,
            minWidth: DefaultTheme.button.size.raised.large - 6,
            maxHeight: DefaultTheme.button.size.raised.large - 6,
            backgroundColor: `transparent`
        },
        label: {
            ...DefaultTheme.button.font.raised.label.large,
            paddingHorizontal: 6
        },
        ripple: {
            position: `absolute`,
            width: DefaultTheme.button.size.raised.large,
            height: DefaultTheme.button.size.raised.large,
            borderRadius: DefaultTheme.button.size.raised.large / 2,
            overflow: `hidden`
        }
    }
};

const readjustStyle = (newStyle = {
    shade: `themed`,
    corner: `themed`,
    margin: `themed`,
    disabled: false,
    busy: false,
    color: `primary`
}, prevAdjustedStyle = DEFAULT_RAISED_BUTTON_STYLE, Theme = DefaultTheme) => {
    const {
        shade,
        corner,
        margin,
        disabled,
        busy,
        color,
        style
    } = newStyle;
    const themedShade = shade === `themed` ? Theme.button.raised.shade : shade;
    const themedBadgeShade = shade === `themed` ? Theme.misc.badge.shade : shade;
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
    let themedLabelColor;
    let themedBadgeColor;
    let themedRippleColor;
    let themedBorderRadius;
    let themedCorner;
    let themedMargin;

    if (disabled) {
        themedColor = Theme.button.color.raised.disabled[themedShade];
    } else if (busy) {
        themedColor = Theme.button.color.raised.busy[themedShade];
    } else {
        if (color === `themed`) {
            if (Theme.button.color.raised.hasOwnProperty(Theme.button.raised.color)) {
                themedColor = Theme.button.color.raised[Theme.button.raised.color][themedShade];
            } else {
                themedColor = Theme.button.raised.color;
            }
        } else if (Theme.button.color.raised.hasOwnProperty(color)) {
            themedColor = Theme.button.color.raised[color][themedShade];
        } else {
            themedColor = color;
        }
    }

    if (typeof corner === `string`) {
        if (corner === `themed`) {
            if (typeof Theme.button.raised.corner === `string` && Theme.button.corner.raised.hasOwnProperty(Theme.button.raised.corner)) {
                themedCorner = Theme.button.corner.raised[Theme.button.raised.corner];
            } else {
                themedCorner = Theme.button.raised.corner;
            }
        } else if (Theme.button.corner.raised.hasOwnProperty(corner)) {
            themedCorner = Theme.button.corner.raised[corner];
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
                borderRadius: Math.floor(Theme.button.size.raised.small * themedCorner)
            },
            normal: {
                ...nullBorderRadius,
                borderRadius: Math.floor(Theme.button.size.raised.normal * themedCorner)
            },
            large: {
                ...nullBorderRadius,
                borderRadius: Math.floor(Theme.button.size.raised.large * themedCorner)
            }
        };
    } else if (typeof themedCorner === `object`) {
        themedBorderRadius = Object.entries(themedCorner).reduce((_themedBorderRadius, [ key, value ]) => {
            let _borderRadius = {
                small: nullBorderRadius,
                normal: nullBorderRadius,
                large: nullBorderRadius
            };

            _borderRadius.small[`border${key.charAt(0).toUpperCase()}${key.slice(1)}Radius`] = Math.floor(Theme.button.size.raised.small * value);
            _borderRadius.normal[`border${key.charAt(0).toUpperCase()}${key.slice(1)}Radius`] = Math.floor(Theme.button.size.raised.normal * value);
            _borderRadius.large[`border${key.charAt(0).toUpperCase()}${key.slice(1)}Radius`] = Math.floor(Theme.button.size.raised.large * value);

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
            if (typeof Theme.button.raised.margin === `string` && Theme.button.margin.raised.hasOwnProperty(Theme.button.raised.margin)) {
                themedMargin = Theme.button.margin.raised[Theme.button.raised.margin];
            } else {
                themedMargin = Theme.button.raised.margin;
            }
        } else if (Theme.button.margin.raised.hasOwnProperty(margin)) {
            themedMargin = Theme.button.margin.raised[margin];
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

    themedLabelColor = Theme.button.color.raised.label[themedShade];
    themedBadgeColor = Theme.misc.color.badge[themedBadgeShade];
    themedRippleColor = Theme.button.color.raised.ripple[themedShade];

    return {
        small: {
            container: {
                ...prevAdjustedStyle.small.container,
                height: Theme.button.size.raised.small,
                ...themedMargin.small,
                ...themedBorderRadius.small,
                backgroundColor: themedColor,
                ...(typeof style === `object` && style.hasOwnProperty(`container`) && typeof style.container === `object` ? style.container : {})
            },
            contentLeftRoom: {
                ...prevAdjustedStyle.small.contentLeftRoom,
                maxHeight: Theme.button.size.raised.small - 6,
                ...(typeof style === `object` && style.hasOwnProperty(`contentLeftRoom`) && typeof style.contentLeftRoom === `object` ? style.contentLeftRoom : {})
            },
            contentMiddleRoom: {
                ...prevAdjustedStyle.small.contentMiddleRoom,
                minWidth: Theme.button.size.raised.small - 6,
                maxHeight: Theme.button.size.raised.small - 6,
                ...(typeof style === `object` && style.hasOwnProperty(`contentMiddleRoom`) && typeof style.contentMiddleRoom === `object` ? style.contentMiddleRoom : {})
            },
            contentRightRoom: {
                ...prevAdjustedStyle.small.contentRightRoom,
                maxHeight: Theme.button.size.raised.small - 6,
                ...(typeof style === `object` && style.hasOwnProperty(`contentRightRoom`) && typeof style.contentRightRoom === `object` ? style.contentRightRoom : {})
            },
            badgeRoom: {
                ...prevAdjustedStyle.small.badgeRoom,
                minWidth: Theme.misc.size.badge.small,
                height: Theme.misc.size.badge.small,
                borderRadius: Theme.misc.size.badge.small / 2,
                backgroundColor: themedBadgeColor,
                ...(typeof style === `object` && style.hasOwnProperty(`badgeRoom`) && typeof style.badgeRoom === `object` ? style.badgeRoom : {})
            },
            activityIndicatorRoom: {
                ...prevAdjustedStyle.small.activityIndicatorRoom,
                minWidth: Theme.button.size.raised.small - 6,
                maxHeight: Theme.button.size.raised.small - 6,
                ...(typeof style === `object` && style.hasOwnProperty(`activityIndicatorRoom`) && typeof style.activityIndicatorRoom === `object` ? style.activityIndicatorRoom : {})
            },
            label: {
                ...prevAdjustedStyle.small.label,
                ...Theme.button.font.raised.label.small,
                color: themedLabelColor,
                ...(typeof style === `object` && style.hasOwnProperty(`label`) && typeof style.label === `object` ? style.label : {})
            },
            ripple: {
                ...prevAdjustedStyle.small.ripple,
                width: Theme.button.size.raised.small,
                height: Theme.button.size.raised.small,
                borderRadius: Theme.button.size.raised.small / 2,
                backgroundColor: themedRippleColor,
                ...(typeof style === `object` && style.hasOwnProperty(`ripple`) && typeof style.ripple === `object` ? style.ripple : {})
            }
        },
        normal: {
            container: {
                ...prevAdjustedStyle.normal.container,
                height: Theme.button.size.raised.normal,
                ...themedMargin.normal,
                ...themedBorderRadius.normal,
                backgroundColor: themedColor,
                ...(typeof style === `object` && style.hasOwnProperty(`container`) && typeof style.container === `object` ? style.container : {})
            },
            contentLeftRoom: {
                ...prevAdjustedStyle.normal.contentLeftRoom,
                maxHeight: Theme.button.size.raised.normal - 6,
                ...(typeof style === `object` && style.hasOwnProperty(`contentLeftRoom`) && typeof style.contentLeftRoom === `object` ? style.contentLeftRoom : {})
            },
            contentMiddleRoom: {
                ...prevAdjustedStyle.normal.contentMiddleRoom,
                minWidth: Theme.button.size.raised.normal - 6,
                maxHeight: Theme.button.size.raised.normal - 6,
                ...(typeof style === `object` && style.hasOwnProperty(`contentMiddleRoom`) && typeof style.contentMiddleRoom === `object` ? style.contentMiddleRoom : {})
            },
            contentRightRoom: {
                ...prevAdjustedStyle.normal.contentRightRoom,
                maxHeight: Theme.button.size.raised.normal - 6,
                ...(typeof style === `object` && style.hasOwnProperty(`contentRightRoom`) && typeof style.contentRightRoom === `object` ? style.contentRightRoom : {})
            },
            badgeRoom: {
                ...prevAdjustedStyle.normal.badgeRoom,
                minWidth: Theme.misc.size.badge.normal,
                height: Theme.misc.size.badge.normal,
                borderRadius: Theme.misc.size.badge.normal / 2,
                backgroundColor: themedBadgeColor,
                ...(typeof style === `object` && style.hasOwnProperty(`badgeRoom`) && typeof style.badgeRoom === `object` ? style.badgeRoom : {})
            },
            activityIndicatorRoom: {
                ...prevAdjustedStyle.normal.activityIndicatorRoom,
                minWidth: Theme.button.size.raised.normal - 6,
                maxHeight: Theme.button.size.raised.normal - 6,
                ...(typeof style === `object` && style.hasOwnProperty(`activityIndicatorRoom`) && typeof style.activityIndicatorRoom === `object` ? style.activityIndicatorRoom : {})
            },
            label: {
                ...prevAdjustedStyle.normal.label,
                ...Theme.button.font.raised.label.normal,
                color: themedLabelColor,
                ...(typeof style === `object` && style.hasOwnProperty(`label`) && typeof style.label === `object` ? style.label : {})
            },
            ripple: {
                ...prevAdjustedStyle.normal.ripple,
                width: Theme.button.size.raised.normal,
                height: Theme.button.size.raised.normal,
                borderRadius: Theme.button.size.raised.normal / 2,
                backgroundColor: themedRippleColor,
                ...(typeof style === `object` && style.hasOwnProperty(`ripple`) && typeof style.ripple === `object` ? style.ripple : {})
            }
        },
        large: {
            container: {
                ...prevAdjustedStyle.large.container,
                height: Theme.button.size.raised.large,
                ...themedMargin.large,
                ...themedBorderRadius.large,
                backgroundColor: themedColor,
                ...(typeof style === `object` && style.hasOwnProperty(`container`) && typeof style.container === `object` ? style.container : {})
            },
            contentLeftRoom: {
                ...prevAdjustedStyle.large.contentLeftRoom,
                maxHeight: Theme.button.size.raised.large - 6,
                ...(typeof style === `object` && style.hasOwnProperty(`contentLeftRoom`) && typeof style.contentLeftRoom === `object` ? style.contentLeftRoom : {})
            },
            contentMiddleRoom: {
                ...prevAdjustedStyle.large.contentMiddleRoom,
                minWidth: Theme.button.size.raised.large - 6,
                maxHeight: Theme.button.size.raised.large - 6,
                ...(typeof style === `object` && style.hasOwnProperty(`contentMiddleRoom`) && typeof style.contentMiddleRoom === `object` ? style.contentMiddleRoom : {})
            },
            contentRightRoom: {
                ...prevAdjustedStyle.large.contentRightRoom,
                maxHeight: Theme.button.size.raised.large - 6,
                ...(typeof style === `object` && style.hasOwnProperty(`contentRightRoom`) && typeof style.contentRightRoom === `object` ? style.contentRightRoom : {})
            },
            badgeRoom: {
                ...prevAdjustedStyle.large.badgeRoom,
                minWidth: Theme.misc.size.badge.large,
                height: Theme.misc.size.badge.large,
                borderRadius: Theme.misc.size.badge.large / 2,
                backgroundColor: themedBadgeColor,
                ...(typeof style === `object` && style.hasOwnProperty(`badgeRoom`) && typeof style.badgeRoom === `object` ? style.badgeRoom : {})
            },
            activityIndicatorRoom: {
                ...prevAdjustedStyle.large.activityIndicatorRoom,
                minWidth: Theme.button.size.raised.large - 6,
                maxHeight: Theme.button.size.raised.large - 6,
                ...(typeof style === `object` && style.hasOwnProperty(`activityIndicatorRoom`) && typeof style.activityIndicatorRoom === `object` ? style.activityIndicatorRoom : {})
            },
            label: {
                ...prevAdjustedStyle.large.label,
                ...Theme.button.font.raised.label.large,
                color: themedLabelColor,
                ...(typeof style === `object` && style.hasOwnProperty(`label`) && typeof style.label === `object` ? style.label : {})
            },
            ripple: {
                ...prevAdjustedStyle.large.ripple,
                width: Theme.button.size.raised.large,
                height: Theme.button.size.raised.large,
                borderRadius: Theme.button.size.raised.large / 2,
                backgroundColor: themedRippleColor,
                ...(typeof style === `object` && style.hasOwnProperty(`ripple`) && typeof style.ripple === `object` ? style.ripple : {})
            }
        }
    };
};

export default class RaisedButton extends React.Component {
    static contextType = DefaultThemeContext
    static propTypes = {
        exclusions: PropTypes.arrayOf(PropTypes.string),
        room: PropTypes.oneOf([
            `none`,
            `content-left`, `content-middle`, `content-right`,
            `content-bottom`, `content-top`,
            `media`
        ]),
        action: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.shape({
                name: PropTypes.string,
                args: PropTypes.array
            })
        ]),
        shade: PropTypes.oneOf([ `themed`, `light`, `dark` ]),
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
        disabled: PropTypes.bool,
        busy: PropTypes.bool,
        rippled: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.string
        ]),
        label: PropTypes.string,
        color: PropTypes.string,
        debounced: PropTypes.bool,
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
        onPress: PropTypes.func
    }
    static defaultProps = {
        exclusions: [ `` ],
        room: `none`,
        action: `none`,
        shade: `themed`,
        corner: `themed`,
        size: `themed`,
        margin: `themed`,
        disabled: false,
        busy: false,
        rippled: `themed`,
        label: ``,
        color: `themed`,
        debounced: false,
        initialAnimation: `themed`,
        onPress: () => null
    }
    static getDerivedStateFromProps (props, state) {
        const {
            shade,
            corner,
            size,
            margin,
            disabled,
            busy,
            color,
            style
        } = props;
        const {
            Theme
        } = state.context;
        const themedSize = size === `themed` ? Theme.button.raised.size : size;

        return {
            adjustedStyle: readjustStyle({
                shade,
                corner,
                margin,
                disabled,
                busy,
                color,
                style
            }, state.adjustedStyle, Theme),
            ripple: {
                ...state.ripple,
                radius: Theme.button.size.raised[themedSize] / 2
            }
        };
    }
    constructor (props) {
        super(props);

        const component = this;
        const {
            size
        } = props;
        const themedSize = size === `themed` ? DefaultTheme.button.raised.size : size;

        component.refCache = {};
        component.debounce = (() => {
            let timeoutId = null;
            const debounce = (task, ...args) => {
                const context = this;
                if (timeoutId === null) {
                    task.call(context, ...args);

                    timeoutId = setTimeout(() => {
                        clearTimeout(timeoutId);
                        timeoutId = null;
                    }, DEFAULT_TOUCH_PRESS_DEBOUNCE_TIME_MS);
                }
            };
            return debounce;
        })();
        component.state = {
            context: {
                Theme: DefaultTheme
            },
            adjustedStyle: DEFAULT_RAISED_BUTTON_STYLE,
            width: 0,
            height: DefaultTheme.button.size.raised[themedSize],
            animation: {
                ripple: {
                    animating: false,
                    animatedValue: new Animated.Value(0),
                    easing: {
                        in: Easing.in(Easing.ease),
                        out: Easing.out(Easing.ease)
                    },
                    duration: DEFAULT_ANIMATION_DURATION_MS,
                    delay: 0
                }
            },
            ripple: {
                scale: 0,
                radius: DefaultTheme.button.size.raised[themedSize] / 2,
                locationX: 0,
                locationY: 0
            }
        };
    }
    onLayout = (event) => {
        const component = this;
        const {
            width,
            height
        } = event.nativeEvent.layout;

        component.setState((prevState) => {
            if (prevState.animation.ripple.animating) {
                return null;
            }
            return {
                width,
                height
            };
        });
    }
    onPress = (event) => {
        const component = this;
        const {
            size,
            rippled,
            onPress
        } = component.props;
        const {
            adjustedStyle,
            animation,
            width,
            height
        } = component.state;
        const {
            Theme
        } = component.context;
        const themedSize = size === `themed` ? Theme.button.raised.size : size;

        if ((typeof rippled === `boolean` && rippled) || (rippled === `themed` && Theme.button.raised.rippled)) {
            const {
                locationX,
                locationY
            } = event.nativeEvent;
            component.setState((prevState) => {
                return {
                    animation: {
                        ripple: {
                            ...prevState.animation.ripple,
                            animating: true
                        }
                    },
                    ripple: {
                        ...prevState.ripple,
                        scale: 2 * Math.sqrt((Math.pow(width, 2) + Math.pow(height, 2)) / ((Math.pow(adjustedStyle[themedSize].ripple.width, 2) + Math.pow(adjustedStyle[themedSize].ripple.height, 2)))),
                        locationX,
                        locationY
                    }
                };
            }, () => {
                Animated.timing(animation.ripple.animatedValue, {
                    toValue: 1,
                    easing: animation.ripple.easing.out,
                    duration: animation.ripple.duration,
                    useNativeDriver: true
                }).start(() => {
                    animation.ripple.animatedValue.resetAnimation();
                    component.setState((prevState) => {
                        return {
                            animation: {
                                ripple: {
                                    ...prevState.animation.ripple,
                                    animating: false
                                }
                            },
                            ripple: {
                                animatedValue: new Animated.Value(0),
                                scale: 0,
                                radius: Theme.button.size.raised[themedSize] / 2,
                                locationX: 0,
                                locationY: 0
                            }
                        };
                    }, () => {
                        (typeof onPress === `function` ? onPress : () => null)(event);
                    });
                });
            });
        } else {
            (typeof onPress === `function` ? onPress : () => null)(event);
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
            if (Theme.button.animation.raised.hasOwnProperty(animationName)) {
                animation = Theme.button.animation.raised[animationName];
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
            corner,
            margin,
            disabled,
            busy,
            color,
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
                    corner,
                    margin,
                    disabled,
                    busy,
                    color,
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
        const {
            animation
        } = component.state;

        component.refCache = {};
        animation.ripple.animatedValue.removeAllListeners();
    }
    renderRipple () {
        const component = this;
        const {
            size
        } = component.props;
        const {
            adjustedStyle,
            animation,
            ripple,
            width
        } = component.state;
        const {
            Theme
        } = component.context;
        const themedSize = size === `themed` ? Theme.button.raised.size : size;

        if (animation.ripple.animating) {
            return (
                <View
                    style = {{
                        ...StyleSheet.absoluteFillObject,
                        borderRadius: adjustedStyle[themedSize].container.borderRadius,
                        backgroundColor: `transparent`,
                        overflow: `hidden`
                    }}
                    pointerEvents = 'box-only'
                >
                    <Animated.View style = {{
                        top: 0, // ripple.locationY,
                        left: width <= ripple.radius * 4 ? width / 2 - ripple.radius : ripple.locationX,
                        transform: [{
                            scale: animation.ripple.animatedValue.interpolate({
                                inputRange: [ 0, 1 ],
                                outputRange: [ 0, ripple.scale ]
                            })
                        }],
                        opacity: animation.ripple.animatedValue.interpolate({
                            inputRange: [ 0, 1 ],
                            outputRange: [ parseInt(Theme.button.color.raised.opacity, 16) / 255, 0 ]
                        }),
                        ...adjustedStyle[themedSize].ripple
                    }}/>
                </View>
            );
        }
        return null;
    }
    renderContentChildren (contentLeftChildren = null, activityIndicatorChildren = null, contentMiddleChildren = null, contentRightChildren = null) {
        const component = this;
        const {
            size,
            label
        } = component.props;
        const {
            adjustedStyle
        } = component.state;
        const {
            Theme
        } = component.context;
        const themedSize = size === `themed` ? Theme.button.area.size : size;

        if (activityIndicatorChildren !== null) {
            return ([
                <AnimatedView
                    ref = {(componentRef) => {
                        component.refCache[`animated-content-left-room-view`] = componentRef;
                    }}
                    useNativeDriver = { true }
                    key = 'animated-content-left-room-view'
                    style = { adjustedStyle[themedSize].contentLeftRoom }
                    pointerEvents = 'box-only'
                >
                    {
                        contentLeftChildren
                    }
                </AnimatedView>,
                <AnimatedView
                    ref = {(componentRef) => {
                        component.refCache[`animated-activity-indicator-room-view`] = componentRef;
                    }}
                    key = 'animated-activity-indicator-room-view'
                    style = { adjustedStyle[themedSize].activityIndicatorRoom } pointerEvents = 'box-only'
                    useNativeDriver = { true }
                >
                    {
                        activityIndicatorChildren
                    }
                </AnimatedView>,
                <AnimatedView
                    ref = {(componentRef) => {
                        component.refCache[`animated-content-middle-room-view`] = componentRef;
                    }}
                    useNativeDriver = { true }
                    key = 'animated-content-middle-room-view'
                    style = { adjustedStyle[themedSize].contentMiddleRoom }
                    pointerEvents = 'box-only'
                >
                    {
                        contentMiddleChildren !== null ? contentMiddleChildren : <Text style = { adjustedStyle[themedSize].label }>{ label }</Text>
                    }
                </AnimatedView>,
                <AnimatedView
                    ref = {(componentRef) => {
                        component.refCache[`animated-content-right-room-view`] = componentRef;
                    }}
                    useNativeDriver = { true }
                    key = 'animated-content-right-room-view'
                    style = { adjustedStyle[themedSize].contentRightRoom }
                    pointerEvents = 'box-only'
                >
                    {
                        contentRightChildren
                    }
                </AnimatedView>
            ]);
        }

        return ([
            <AnimatedView
                ref = {(componentRef) => {
                    component.refCache[`animated-content-left-room-view`] = componentRef;
                }}
                useNativeDriver = { true }
                key = 'animated-content-left-room-view'
                style = { adjustedStyle[themedSize].contentLeftRoom }
                pointerEvents = 'box-only'
            >
                {
                    contentLeftChildren
                }
            </AnimatedView>,
            <AnimatedView
                ref = {(componentRef) => {
                    component.refCache[`animated-content-middle-room-view`] = componentRef;
                }}
                useNativeDriver = { true }
                key = 'animated-content-middle-room-view'
                style = { adjustedStyle[themedSize].contentMiddleRoom }
                pointerEvents = 'box-only'
            >
                {
                    contentMiddleChildren !== null ? contentMiddleChildren : <Text style = { adjustedStyle[themedSize].label }>{ label }</Text>
                }
            </AnimatedView>,
            <AnimatedView
                ref = {(componentRef) => {
                    component.refCache[`animated-content-right-room-view`] = componentRef;
                }}
                useNativeDriver = { true }
                key = 'animated-content-right-room-view'
                style = { adjustedStyle[themedSize].contentRightRoom }
                pointerEvents = 'box-only'
            >
                {
                    contentRightChildren
                }
            </AnimatedView>
        ]);
    }
    render () {
        const component = this;
        const {
            shade,
            size,
            disabled,
            busy,
            debounced,
            children
        } = component.props;
        const {
            adjustedStyle
        } = component.state;
        const {
            Theme
        } = component.context;
        const themedSize = size === `themed` ? Theme.button.raised.size : size;
        let contentLeftChildren = null;
        let contentMiddleChildren = null;
        let contentRightChildren = null;
        let badgeChildren = null;
        let activityIndicatorChildren = null;

        if (React.Children.count(children) > 0) {
            let fragments = React.Children.toArray(React.Children.map(children, (child) => {
                if (child !== null) {
                    const {
                        exclusions,
                        room
                    } = child.props;

                    if (typeof room === `string` && (room === `content-left` || room === `content-middle` || room === `content-right` ||
                               room === `badge` || room === `activity-indicator`)) {
                        const inheritedProps = Array.isArray(exclusions) ? Object.entries({
                            shade,
                            size: room === `activity-indicator` ? `small` : themedSize,
                            margin: 0,
                            indentation: 0,
                            color: adjustedStyle[themedSize].label.color
                        }).filter(([
                            propName,
                            prop // eslint-disable-line
                        ]) => exclusions.every((exclusion) => propName !== exclusion)).reduce((_inheritedProps, [ propName, prop ]) => {
                            _inheritedProps[propName] = prop;
                            return _inheritedProps;
                        }, {}) : {
                            shade,
                            size: room === `activity-indicator` ? `small` : themedSize,
                            margin: 0,
                            indentation: 0,
                            color: adjustedStyle[themedSize].label.color
                        };
                        return React.cloneElement(child, inheritedProps);
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

            contentMiddleChildren = fragments.filter((child) => {
                if (child !== null) {
                    const {
                        room
                    } = child.props;

                    return room === `content-middle`;
                }
                return false;
            });
            contentMiddleChildren = contentMiddleChildren.length > 0 ? contentMiddleChildren : null;

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

            badgeChildren = fragments.filter((child) => {
                if (child !== null) {
                    const {
                        room
                    } = child.props;

                    return room === `badge`;
                }
                return false;
            });
            badgeChildren = badgeChildren.length > 0 ? badgeChildren : null;

            activityIndicatorChildren = fragments.filter((child) => {
                if (child !== null) {
                    const {
                        room
                    } = child.props;

                    return room === `activity-indicator`;
                }
                return false;
            });
            activityIndicatorChildren = busy && activityIndicatorChildren.length > 0 ? activityIndicatorChildren : null;
        }

        return (
            <AnimatedView
                ref = {(componentRef) => {
                    component.refCache[`animated-container-view`] = componentRef;
                }}
                useNativeDriver = { true }
            >
                <TouchableOpacity
                    style = { adjustedStyle[themedSize].container }
                    activeOpacity = { parseInt(Theme.button.color.raised.opacity, 16) / 255 }
                    disabled = { busy || disabled }
                    onLayout = { component.onLayout }
                    onPress = { busy || disabled ? () => null : (event) => debounced ? component.debounce(component.onPress, event) : component.onPress(event) }
                >
                    {
                        component.renderRipple()
                    }
                    {
                        component.renderContentChildren(contentLeftChildren, activityIndicatorChildren, contentMiddleChildren, contentRightChildren)
                    }
                    {
                        badgeChildren !== null ? <AnimatedView
                            ref = {(componentRef) => {
                                component.refCache[`animated-badge-room-view`] = componentRef;
                            }}
                            style = { adjustedStyle[themedSize].badgeRoom } pointerEvents = 'box-only'
                            useNativeDriver = { true }
                        >
                            {
                                badgeChildren
                            }
                        </AnimatedView> : null
                    }
                </TouchableOpacity>
            </AnimatedView>
        );
    }
}

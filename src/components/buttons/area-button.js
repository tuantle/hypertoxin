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
 * @module AreaButton
 * @description - Area button component.
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
    Dimensions,
    Animated,
    Easing,
    StyleSheet,
    TouchableOpacity,
    View
} = ReactNative;

const DEVICE_WIDTH = Dimensions.get(`window`).width;

const DEFAULT_TOUCH_PRESS_DEBOUNCE_TIME_MS = 250;

const DEFAULT_ANIMATION_DURATION_MS = 300;

const DEFAULT_AREA_BUTTON_STYLE = {
    small: {
        container: {
            flexShrink: 1,
            flexDirection: `row`,
            alignItems: `stretch`,
            justifyContent: `space-between`,
            maxWidth: DEVICE_WIDTH,
            height: DefaultTheme.button.size.area.small,
            paddingVertical: 3
        },
        contentLeftRoom: {
            flexShrink: 1,
            flexDirection: `column`,
            alignItems: `flex-start`,
            justifyContent: `center`,
            height: DefaultTheme.button.size.area.small,
            backgroundColor: `transparent`
        },
        contentRightRoom: {
            flexShrink: 1,
            flexDirection: `column`,
            alignItems: `flex-end`,
            justifyContent: `center`,
            height: DefaultTheme.button.size.area.small,
            backgroundColor: `transparent`
        },
        ripple: {
            position: `absolute`,
            width: DefaultTheme.button.size.area.small,
            height: DefaultTheme.button.size.area.small,
            borderRadius: DefaultTheme.button.size.area.small / 2,
            overflow: `hidden`
        }
    },
    normal: {
        container: {
            flexShrink: 1,
            flexDirection: `row`,
            alignItems: `stretch`,
            justifyContent: `space-between`,
            maxWidth: DEVICE_WIDTH,
            height: DefaultTheme.button.size.area.normal,
            paddingVertical: 3
        },
        contentLeftRoom: {
            flexShrink: 1,
            flexDirection: `column`,
            alignItems: `flex-start`,
            justifyContent: `center`,
            height: DefaultTheme.button.size.area.normal,
            backgroundColor: `transparent`
        },
        contentRightRoom: {
            flexShrink: 1,
            flexDirection: `column`,
            alignItems: `flex-end`,
            justifyContent: `center`,
            height: DefaultTheme.button.size.area.normal,
            backgroundColor: `transparent`
        },
        ripple: {
            position: `absolute`,
            width: DefaultTheme.button.size.area.normal,
            height: DefaultTheme.button.size.area.normal,
            borderRadius: DefaultTheme.button.size.area.normal / 2,
            overflow: `hidden`
        }
    },
    large: {
        container: {
            flexShrink: 1,
            flexDirection: `row`,
            alignItems: `stretch`,
            justifyContent: `space-between`,
            maxWidth: DEVICE_WIDTH,
            height: DefaultTheme.button.size.area.large,
            paddingVertical: 3
        },
        contentLeftRoom: {
            flexShrink: 1,
            flexDirection: `column`,
            alignItems: `flex-start`,
            justifyContent: `center`,
            height: DefaultTheme.button.size.area.large,
            backgroundColor: `transparent`
        },
        contentRightRoom: {
            flexShrink: 1,
            flexDirection: `column`,
            alignItems: `flex-end`,
            justifyContent: `center`,
            height: DefaultTheme.button.size.area.large,
            backgroundColor: `transparent`
        },
        ripple: {
            position: `absolute`,
            width: DefaultTheme.button.size.area.large,
            height: DefaultTheme.button.size.area.large,
            borderRadius: DefaultTheme.button.size.area.large / 2,
            overflow: `hidden`
        }
    }
};

const readjustStyle = (newStyle = {
    shade: `themed`,
    overlay: `themed`,
    margin: `themed`,
    disabled: false
}, prevAdjustedStyle = DEFAULT_AREA_BUTTON_STYLE, Theme = DefaultTheme) => {
    const {
        shade,
        overlay,
        margin,
        disabled,
        style
    } = newStyle;
    const themedShade = shade === `themed` ? Theme.button.area.shade : shade;
    const themedOverlay = overlay === `themed` ? Theme.button.area.overlay : overlay;
    const nullMargin = {
        margin: null,
        marginTop: null,
        marginBottom: null,
        marginLeft: null,
        marginRight: null,
        marginHorizontal: null,
        marginVertical: null
    };
    let themedColor;
    let themedRippleColor;
    let themedMargin;

    switch (themedOverlay) { // eslint-disable-line
    case `opaque`:
        if (disabled) {
            themedColor = Theme.button.color.area.disabled[themedShade];
        } else {
            themedColor = Theme.button.color.area[themedShade];
        }
        break;
    case `translucent`:
        if (disabled) {
            themedColor = `${Theme.button.color.area.disabled[themedShade]}${Theme.button.color.area.opacity}`;
        } else {
            themedColor = `${Theme.button.color.area[themedShade]}${Theme.button.color.area.opacity}`;
        }
        break;
    case `transparent`:
        themedColor = `transparent`;
        break;
    }
    themedRippleColor = Theme.button.color.area.ripple[themedShade];

    if (typeof margin === `string`) {
        if (margin === `themed`) {
            if (typeof Theme.button.area.margin === `string` && Theme.button.margin.area.hasOwnProperty(Theme.button.area.margin)) {
                themedMargin = Theme.button.margin.area[Theme.button.area.margin];
            } else {
                themedMargin = Theme.button.area.margin;
            }
        } else if (Theme.button.margin.area.hasOwnProperty(margin)) {
            themedMargin = Theme.button.margin.area[margin];
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
                height: Theme.button.size.area.small,
                ...themedMargin.small,
                backgroundColor: themedColor,
                ...(typeof style === `object` && style.hasOwnProperty(`container`) && typeof style.container === `object` ? style.container : {})
            },
            contentLeftRoom: {
                ...prevAdjustedStyle.small.contentLeftRoom,
                height: Theme.button.size.area.small,
                ...(typeof style === `object` && style.hasOwnProperty(`contentLeftRoom`) && typeof style.contentLeftRoom === `object` ? style.contentLeftRoom : {})
            },
            contentRightRoom: {
                ...prevAdjustedStyle.small.contentRightRoom,
                height: Theme.button.size.area.small,
                ...(typeof style === `object` && style.hasOwnProperty(`contentRightRoom`) && typeof style.contentRightRoom === `object` ? style.contentRightRoom : {})
            },
            ripple: {
                ...prevAdjustedStyle.small.ripple,
                width: Theme.button.size.area.small,
                height: Theme.button.size.area.small,
                borderRadius: Theme.button.size.area.small / 2,
                backgroundColor: themedRippleColor,
                ...(typeof style === `object` && style.hasOwnProperty(`ripple`) && typeof style.ripple === `object` ? style.ripple : {})
            }
        },
        normal: {
            container: {
                ...prevAdjustedStyle.normal.container,
                height: Theme.button.size.area.normal,
                ...themedMargin.normal,
                backgroundColor: themedColor,
                ...(typeof style === `object` && style.hasOwnProperty(`container`) && typeof style.container === `object` ? style.container : {})
            },
            contentLeftRoom: {
                ...prevAdjustedStyle.normal.contentLeftRoom,
                height: Theme.button.size.area.normal,
                ...(typeof style === `object` && style.hasOwnProperty(`contentLeftRoom`) && typeof style.contentLeftRoom === `object` ? style.contentLeftRoom : {})
            },
            contentRightRoom: {
                ...prevAdjustedStyle.normal.contentRightRoom,
                height: Theme.button.size.area.normal,
                ...(typeof style === `object` && style.hasOwnProperty(`contentRightRoom`) && typeof style.contentRightRoom === `object` ? style.contentRightRoom : {})
            },
            ripple: {
                ...prevAdjustedStyle.normal.ripple,
                width: Theme.button.size.area.normal,
                height: Theme.button.size.area.normal,
                borderRadius: Theme.button.size.area.normal / 2,
                backgroundColor: themedRippleColor,
                ...(typeof style === `object` && style.hasOwnProperty(`ripple`) && typeof style.ripple === `object` ? style.ripple : {})
            }
        },
        large: {
            container: {
                ...prevAdjustedStyle.large.container,
                height: Theme.button.size.area.large,
                ...themedMargin.large,
                backgroundColor: themedColor,
                ...(typeof style === `object` && style.hasOwnProperty(`container`) && typeof style.container === `object` ? style.container : {})
            },
            contentLeftRoom: {
                ...prevAdjustedStyle.large.contentLeftRoom,
                height: Theme.button.size.area.large,
                ...(typeof style === `object` && style.hasOwnProperty(`contentLeftRoom`) && typeof style.contentLeftRoom === `object` ? style.contentLeftRoom : {})
            },
            contentRightRoom: {
                ...prevAdjustedStyle.large.contentRightRoom,
                height: Theme.button.size.area.large,
                ...(typeof style === `object` && style.hasOwnProperty(`contentRightRoom`) && typeof style.contentRightRoom === `object` ? style.contentRightRoom : {})
            },
            ripple: {
                ...prevAdjustedStyle.large.ripple,
                width: Theme.button.size.area.large,
                height: Theme.button.size.area.large,
                borderRadius: Theme.button.size.area.large / 2,
                backgroundColor: themedRippleColor,
                ...(typeof style === `object` && style.hasOwnProperty(`ripple`) && typeof style.ripple === `object` ? style.ripple : {})
            }
        }
    };
};

export default class AreaButton extends React.Component {
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
        overlay: PropTypes.oneOf([ `themed`, `opaque`, `translucent`, `transparent` ]),
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
        rippled: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.string
        ]),
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
        overlay: `themed`,
        size: `themed`,
        margin: `themed`,
        disabled: false,
        rippled: `themed`,
        debounced: false,
        initialAnimation: `themed`,
        onPress: () => null
    }
    static getDerivedStateFromProps (props, state) {
        const {
            shade,
            overlay,
            size,
            margin,
            disabled,
            style
        } = props;
        const {
            Theme
        } = state.context;
        const themedSize = size === `themed` ? Theme.button.area.size : size;
        return {
            adjustedStyle: readjustStyle({
                shade,
                overlay,
                margin,
                disabled,
                style
            }, state.adjustedStyle, Theme),
            height: Theme.button.size.area[themedSize],
            ripple: {
                ...state.ripple,
                radius: Theme.button.size.area[themedSize] / 2
            }
        };
    }
    constructor (props) {
        super(props);

        const component = this;
        const {
            size
        } = props;
        const themedSize = size === `themed` ? DefaultTheme.button.area.size : size;

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
            adjustedStyle: DEFAULT_AREA_BUTTON_STYLE,
            width: 0,
            height: DefaultTheme.button.size.area[themedSize],
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
                radius: DefaultTheme.button.size.area[themedSize] / 2,
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
        const themedSize = size === `themed` ? Theme.button.area.size : size;

        if ((typeof rippled === `boolean` && rippled) || (rippled === `themed` && Theme.button.area.rippled)) {
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
                                radius: Theme.button.size.area[themedSize] / 2,
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
            if (Theme.button.animation.area.hasOwnProperty(animationName)) {
                animation = Theme.button.animation.area[animationName];
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
            margin,
            disabled,
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
        const themedSize = size === `themed` ? Theme.button.area.size : size;

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
                            outputRange: [ parseInt(Theme.button.color.area.opacity, 16) / 255, 0 ]
                        }),
                        ...adjustedStyle[themedSize].ripple
                    }}/>
                </View>
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
            adjustedStyle
        } = component.state;
        const {
            Theme
        } = component.context;
        const themedSize = size === `themed` ? Theme.button.area.size : size;

        return ([
            <AnimatedView
                key = 'animated-content-left-room-view'
                ref = {(componentRef) => {
                    component.refCache[`animated-content-left-room-view`] = componentRef;
                }}
                style = { adjustedStyle[themedSize].contentLeftRoom }
                pointerEvents = 'box-only'
                useNativeDriver = { true }
            >
                {
                    contentLeftChildren
                }
            </AnimatedView>,
            <AnimatedView
                key = 'animated-content-right-room-view'
                ref = {(componentRef) => {
                    component.refCache[`animated-content-right-room-view`] = componentRef;
                }}
                style = { adjustedStyle[themedSize].contentRightRoom }
                useNativeDriver = { true }
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
            debounced,
            children
        } = component.props;
        const {
            adjustedStyle
        } = component.state;
        const {
            Theme
        } = component.context;
        const themedSize = size === `themed` ? Theme.button.area.size : size;
        let contentLeftChildren = null;
        let contentRightChildren = null;

        if (React.Children.count(children) > 0) {
            let fragments = React.Children.toArray(React.Children.map(children, (child) => {
                if (child !== null) {
                    const {
                        exclusions,
                        room
                    } = child.props;

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

        return (
            <AnimatedView
                ref = {(componentRef) => {
                    component.refCache[`animated-container-view`] = componentRef;
                }}
                useNativeDriver = { true }
            >
                <TouchableOpacity
                    style = { adjustedStyle[themedSize].container }
                    activeOpacity = { parseInt(Theme.button.color.area.opacity, 16) / 255 }
                    onLayout = { component.onLayout }
                    onPress = { disabled ? () => null : (event) => debounced ? component.debounce(component.onPress, event) : component.onPress(event) }

                >
                    {
                        component.renderRipple()
                    }
                    {
                        component.renderContentChildren(contentLeftChildren, contentRightChildren)
                    }
                </TouchableOpacity>
            </AnimatedView>
        );
    }
}

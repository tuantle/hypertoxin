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
 * @module BodyScreen
 * @description - Body screen component.
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
    KeyboardAvoidingView,
    ImageBackground,
    View,
    ScrollView,
    PanResponder
} = ReactNative;

const DEVICE_WIDTH = Dimensions.get(`window`).width;
const DEVICE_HEIGHT = Dimensions.get(`window`).height;

const DEFAULT_ANIMATION_DURATION_MS = 300;

const DEFAULT_BODY_SCREEN_STYLE = {
    container: {
        flex: 1,
        flexDirection: `column`,
        justifyContent: `flex-start`,
        alignItems: `flex-start`,
        width: DEVICE_WIDTH,
        height: DEVICE_HEIGHT
    },
    contentTopRoom: {
        flexDirection: `column`,
        backgroundColor: `transparent`
    },
    contentMiddleRoom: {
        flexDirection: `column`,
        backgroundColor: `transparent`
    },
    contentBottomRoom: {
        flexDirection: `column`,
        backgroundColor: `transparent`
    }
};

const readjustStyle = (newStyle = {
    shade: `themed`,
    overlay: `themed`,
    color: `themed`,
    padding: `themed`,
    roomAlignment: `start`,
    contentTopRoomAlignment: `none`,
    contentMiddleRoomAlignment: `none`,
    contentBottomRoomAlignment: `none`
}, prevAdjustedStyle = DEFAULT_BODY_SCREEN_STYLE, Theme = DefaultTheme) => {
    const {
        shade,
        overlay,
        color,
        padding,
        roomAlignment,
        contentTopRoomAlignment,
        contentMiddleRoomAlignment,
        contentBottomRoomAlignment,
        style
    } = newStyle;
    const themedShade = shade === `themed` ? Theme.screen.body.shade : shade;
    const themedOverlay = overlay === `themed` ? Theme.screen.body.overlay : overlay;
    const nullPadding = {
        padding: null,
        paddingTop: null,
        paddingBottom: null,
        paddingLeft: null,
        paddingRight: null,
        paddingHorizontal: null,
        paddingVertical: null
    };
    let themedColor;
    let themedPadding;
    let themedRoomAlignment = {};
    let themedContentTopRoomAlignment = {};
    let themedContentMiddleRoomAlignment = {};
    let themedContentBottomRoomAlignment = {};

    if (color === `themed`) {
        if (Theme.screen.color.body.hasOwnProperty(Theme.screen.body.color)) {
            themedColor = Theme.screen.color.body[Theme.screen.body.color][themedShade];
        } else {
            themedColor = Theme.screen.body.color;
        }
    } else if (Theme.screen.color.body.hasOwnProperty(color)) {
        themedColor = Theme.screen.color.body[color][themedShade];
    } else {
        themedColor = color;
    }

    if (typeof padding === `string`) {
        if (padding === `themed`) {
            if (typeof Theme.screen.body.padding === `string` && Theme.screen.padding.bodyhasOwnProperty(Theme.screen.body.padding)) {
                themedPadding = Theme.screen.padding.body[Theme.screen.body.padding];
            } else {
                themedPadding = Theme.screen.body.padding;
            }
        } else if (Theme.screen.padding.bodyhasOwnProperty(padding)) {
            themedPadding = Theme.screen.padding.body[padding];
        } else {
            themedPadding = 0;
        }
    } else {
        themedPadding = padding;
    }
    if (typeof themedPadding === `number`) {
        themedPadding = {
            ...nullPadding,
            padding: themedPadding
        };
    } else if (typeof themedPadding === `object`) {
        themedPadding = Object.entries(themedPadding).reduce((_themedPadding, [ key, value ]) => {
            let _padding = nullPadding;

            _padding[`padding${key.charAt(0).toUpperCase()}${key.slice(1)}`] = value;
            _themedPadding = {
                ..._themedPadding,
                ..._padding
            };
            return _themedPadding;
        }, nullPadding);
    }

    switch (themedOverlay) { // eslint-disable-line
    case `opaque`:
        break;
    case `translucent`:
        themedColor = `${themedColor}${Theme.screen.color.body.opacity}`;
        break;
    case `transparent`:
        themedColor = `transparent`;
        break;
    }

    switch (roomAlignment) { // eslint-disable-line
    case `start`:
        themedRoomAlignment = {
            justifyContent: `flex-start`
        };
        break;
    case `center`:
        themedRoomAlignment = {
            justifyContent: `center`
        };
        break;
    case `end`:
        themedRoomAlignment = {
            justifyContent: `flex-end`
        };
        break;
    case `stretch`:
        themedRoomAlignment = {
            justifyContent: `space-between`
        };
        break;
    }

    switch (contentTopRoomAlignment) { // eslint-disable-line
    case `start`:
        themedContentTopRoomAlignment = {
            flexShrink: 1,
            justifyContent: `flex-start`,
            alignSelf: `flex-start`,
            alignItems: `flex-start`
        };
        break;
    case `center`:
        themedContentTopRoomAlignment = {
            flexShrink: 1,
            justifyContent: `center`,
            alignSelf: `center`,
            alignItems: `center`
        };
        break;
    case `end`:
        themedContentTopRoomAlignment = {
            flexShrink: 1,
            justifyContent: `flex-end`,
            alignSelf: `flex-end`,
            alignItems: `flex-end`
        };
        break;
    case `stretch`:
        themedContentTopRoomAlignment = {
            flexShrink: 1,
            justifyContent: `space-between`,
            alignSelf: `stretch`,
            alignItems: `stretch`
        };
        break;
    case `none`:
        break;
    }

    switch (contentMiddleRoomAlignment) { // eslint-disable-line
    case `start`:
        themedContentMiddleRoomAlignment = {
            flexShrink: 1,
            justifyContent: `flex-start`,
            alignSelf: `flex-start`,
            alignItems: `flex-start`
        };
        break;
    case `center`:
        themedContentMiddleRoomAlignment = {
            flexShrink: 1,
            justifyContent: `center`,
            alignSelf: `center`,
            alignItems: `center`
        };
        break;
    case `end`:
        themedContentMiddleRoomAlignment = {
            flexShrink: 1,
            justifyContent: `flex-end`,
            alignSelf: `flex-end`,
            alignItems: `flex-end`
        };
        break;
    case `stretch`:
        themedContentMiddleRoomAlignment = {
            flexShrink: 1,
            justifyContent: `space-between`,
            alignSelf: `stretch`,
            alignItems: `stretch`
        };
        break;
    case `none`:
        break;
    }

    switch (contentBottomRoomAlignment) { // eslint-disable-line
    case `start`:
        themedContentBottomRoomAlignment = {
            flexShrink: 1,
            justifyContent: `flex-start`,
            alignSelf: `flex-start`,
            alignItems: `flex-start`
        };
        break;
    case `center`:
        themedContentBottomRoomAlignment = {
            flexShrink: 1,
            justifyContent: `center`,
            alignSelf: `center`,
            alignItems: `center`
        };
        break;
    case `end`:
        themedContentBottomRoomAlignment = {
            flexShrink: 1,
            justifyContent: `flex-end`,
            alignSelf: `flex-end`,
            alignItems: `flex-end`
        };
        break;
    case `stretch`:
        themedContentBottomRoomAlignment = {
            flexShrink: 1,
            justifyContent: `space-between`,
            alignSelf: `stretch`,
            alignItems: `stretch`
        };
        break;
    case `none`:
        break;
    }

    return {
        container: {
            ...prevAdjustedStyle.container,
            ...themedRoomAlignment,
            ...themedPadding,
            backgroundColor: themedColor,
            ...(typeof style === `object` && style.hasOwnProperty(`container`) && typeof style.container === `object` ? style.container : {})
        },
        contentTopRoom: {
            ...prevAdjustedStyle.contentTopRoom,
            ...themedContentTopRoomAlignment,
            ...(typeof style === `object` && style.hasOwnProperty(`contentTopRoom`) && typeof style.contentTopRoom === `object` ? style.contentTopRoom : {})
        },
        contentMiddleRoom: {
            ...prevAdjustedStyle.contentMiddleRoom,
            ...themedContentMiddleRoomAlignment,
            ...(typeof style === `object` && style.hasOwnProperty(`contentMiddleRoom`) && typeof style.contentMiddleRoom === `object` ? style.contentMiddleRoom : {})
        },
        contentBottomRoom: {
            ...prevAdjustedStyle.contentBottomRoom,
            ...themedContentBottomRoomAlignment,
            ...(typeof style === `object` && style.hasOwnProperty(`contentBottomRoom`) && typeof style.contentBottomRoom === `object` ? style.contentBottomRoom : {})
        }
    };
};

const ImageURISourcePropType = PropTypes.shape({
    uri: PropTypes.string,
    bundle: PropTypes.string,
    method: PropTypes.string,
    headers: PropTypes.objectOf(PropTypes.string),
    body: PropTypes.string,
    cache: PropTypes.oneOf([
        `default`,
        `reload`,
        `force-cache`,
        `only-if-cached`
    ]),
    width: PropTypes.number,
    height: PropTypes.number,
    scale: PropTypes.number
});

export default class BodyScreen extends React.Component {
    static contextType = DefaultThemeContext
    static propTypes = {
        shade: PropTypes.oneOf([ `themed`, `light`, `dark` ]),
        overlay: PropTypes.oneOf([ `themed`, `opaque`, `translucent`, `transparent` ]),
        color: PropTypes.string,
        pading: PropTypes.oneOfType([
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
        coverImageSource: PropTypes.oneOfType([
            () => null,
            PropTypes.string,
            PropTypes.number,
            ImageURISourcePropType,
            PropTypes.arrayOf(ImageURISourcePropType)
        ]),
        roomAlignment: PropTypes.oneOf([ `start`, `center`, `end`, `stretch` ]),
        contentTopRoomAlignment: PropTypes.oneOf([ `none`, `start`, `center`, `end`, `stretch` ]),
        contentMiddleRoomAlignment: PropTypes.oneOf([ `none`, `start`, `center`, `end`, `stretch` ]),
        contentBottomRoomAlignment: PropTypes.oneOf([ `none`, `start`, `center`, `end`, `stretch` ]),
        scrollable: PropTypes.bool,
        keyboardAvoiding: PropTypes.bool,
        onScroll: PropTypes.func
    }
    static defaultProps = {
        shade: `themed`,
        overlay: `themed`,
        color: `themed`,
        pading: `themed`,
        coverImageSource: null,
        roomAlignment: `start`,
        contentTopRoomAlignment: `none`,
        contentMiddleRoomAlignment: `none`,
        contentBottomRoomAlignment: `none`,
        scrollable: false,
        keyboardAvoiding: false,
        onScroll: () => null
    }
    static getDerivedStateFromProps (props, state) {
        const {
            shade,
            overlay,
            color,
            pading,
            roomAlignment,
            contentTopRoomAlignment,
            contentMiddleRoomAlignment,
            contentBottomRoomAlignment,
            style
        } = props;
        const {
            Theme
        } = state.context;

        return {
            adjustedStyle: readjustStyle({
                shade,
                overlay,
                color,
                pading,
                roomAlignment,
                contentTopRoomAlignment,
                contentMiddleRoomAlignment,
                contentBottomRoomAlignment,
                style
            }, state.adjustedStyle, Theme)
        };
    }
    constructor (props) {
        super(props);

        const component = this;

        component.refCache = {};
        component.panResponder = PanResponder.create({
            onMoveShouldSetResponderCapture: () => false,
            onMoveShouldSetPanResponderCapture: () => false,
            onPanResponderMove: (event, gestureState) => {
                let scrollDirection = 0;

                if (gestureState.vy > 0) {
                    scrollDirection = 1;
                } else if (gestureState.vy < 0) {
                    scrollDirection = -1;
                }
                component.setState(() => {
                    return {
                        scrollEvent: {
                            direction: scrollDirection
                            // pageX: event.nativeEvent.pageX,
                            // pageY: event.nativeEvent.pageY,
                            // locationX: event.nativeEvent.locationX,
                            // locationY: event.nativeEvent.locationY
                        }
                    };
                });
            }
        });
        component.state = {
            context: {
                Theme: DefaultTheme
            },
            adjustedStyle: DEFAULT_BODY_SCREEN_STYLE,
            scrollEvent: 0
        };
    }
    getScrollEvent = () => {
        const component = this;
        const {
            scrollEvent
        } = component.state;

        return scrollEvent;
    }
    scrollTo = (destination = {
        x: 0,
        y: 0,
        animated: true
    }) => {
        const component = this;
        const {
            scrollable
        } = component.props;
        const scrollView = component.refCache[`scroll-view`];

        if (scrollable && scrollView !== undefined) {
            const {
                x,
                y,
                animated
            } = destination;

            scrollView.scrollTo({
                x,
                y,
                animated
            });
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
            if (Theme.screen.animation.body.hasOwnProperty(animationName)) {
                animation = Theme.screen.animation.body[animationName];
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
            color,
            pading,
            roomAlignment,
            contentTopRoomAlignment,
            contentMiddleRoomAlignment,
            contentBottomRoomAlignment,
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
                    color,
                    pading,
                    roomAlignment,
                    contentTopRoomAlignment,
                    contentMiddleRoomAlignment,
                    contentBottomRoomAlignment,
                    style
                }, prevState.adjustedStyle, Theme)
            };
        });
    }
    componentWillUnMount () {
        const component = this;

        component.panResponder = null;
        component.refCache = {};
    }
    renderContentChildren (contentTopChildren = null, contentMiddleChildren = null, contentBottomChildren = null) {
        const component = this;
        const {
            adjustedStyle
        } = component.state;

        return ([
            <AnimatedView
                key = 'animated-content-top-room-view'
                ref = {(componentRef) => {
                    component.refCache[`animated-content-top-room-view`] = componentRef;
                }}
                useNativeDriver = { true }
                style = { adjustedStyle.contentTopRoom }
            >
                {
                    contentTopChildren
                }
            </AnimatedView>,
            <AnimatedView
                key = 'animated-content-middle-room-view'
                ref = {(componentRef) => {
                    component.refCache[`animated-content-middle-room-view`] = componentRef;
                }}
                useNativeDriver = { true }
                style = { adjustedStyle.contentMiddleRoom }
            >
                {
                    contentMiddleChildren
                }
            </AnimatedView>,
            <AnimatedView
                key = 'animated-content-bottom-room-view'
                ref = {(componentRef) => {
                    component.refCache[`animated-content-bottom-room-view`] = componentRef;
                }}
                useNativeDriver = { true }
                style = { adjustedStyle.contentBottomRoom }
            >
                {
                    contentBottomChildren
                }
            </AnimatedView>
        ]);
    }
    render () {
        const component = this;
        const {
            shade,
            coverImageSource,
            scrollable,
            keyboardAvoiding,
            onScroll,
            children
        } = component.props;
        const {
            adjustedStyle,
            scrollEvent
        } = component.state;
        let contentTopChildren = null;
        let contentMiddleChildren = null;
        let contentBottomChildren = null;

        if (React.Children.count(children) > 0) {
            let fragments = React.Children.toArray(React.Children.map(children, (child) => {
                if (child !== null) {
                    const {
                        exclusions,
                        room
                    } = child.props;

                    if (typeof room === `string` && (room === `content-top` || room === `content-middle` || room === `content-bottom`)) {
                        const inheritedProps = Array.isArray(exclusions) ? Object.entries({
                            shade
                        }).filter(([
                            propName,
                            prop // eslint-disable-line
                        ]) => exclusions.every((exclusion) => propName !== exclusion)).reduce((_inheritedProps, [ propName, prop ]) => {
                            _inheritedProps[propName] = prop;
                            return _inheritedProps;
                        }, {}) : {
                            shade
                        };
                        return React.cloneElement(child, inheritedProps);
                    }
                }
                return child;
            }));

            contentTopChildren = fragments.filter((child) => {
                if (child !== null) {
                    const {
                        room
                    } = child.props;

                    return room === `content-top`;
                }
                return false;
            });
            contentTopChildren = contentTopChildren.length > 0 ? contentTopChildren : null;

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

            contentBottomChildren = fragments.filter((child) => {
                if (child !== null) {
                    const {
                        room
                    } = child.props;

                    return room === `content-bottom`;
                }
                return false;
            });
            contentBottomChildren = contentBottomChildren.length > 0 ? contentBottomChildren : null;
        }

        if (keyboardAvoiding) {
            if (scrollable) {
                if (coverImageSource !== null) {
                    return (
                        <ImageBackground
                            style = { adjustedStyle.container }
                            source = {
                                typeof coverImageSource === `string` ? {
                                    uri: coverImageSource,
                                    cache: `only-if-cached`
                                } : coverImageSource
                            }
                            resizeMode = 'cover'
                        >
                            <KeyboardAvoidingView
                                style = {{
                                    backgroundColor: `transparent`
                                }}
                                behavior = 'padding'
                                keyboardVerticalOffset = { 0 }
                            >
                                <ScrollView
                                    ref = {(componentRef) => {
                                        component.refCache[`scroll-view`] = componentRef;
                                    }}
                                    style = {{
                                        backgroundColor: `transparent`
                                    }}
                                    directionalLockEnabled = { true }
                                    scrollEventThrottle = { 16 }
                                    onScroll = {() => {
                                        onScroll(scrollEvent);
                                    }}
                                    { ...component.panResponder.panHandlers }
                                >
                                    {
                                        component.renderContentChildren(contentTopChildren, contentMiddleChildren, contentBottomChildren)
                                    }
                                </ScrollView>
                            </KeyboardAvoidingView>
                        </ImageBackground>
                    );
                }
                return (
                    <KeyboardAvoidingView
                        style = { adjustedStyle.container }
                        behavior = 'padding'
                        keyboardVerticalOffset = { 0 }
                    >
                        <ScrollView
                            ref = {(componentRef) => {
                                component.refCache[`scroll-view`] = componentRef;
                            }}
                            directionalLockEnabled = { true }
                            scrollEventThrottle = { 16 }
                            onScroll = {() => {
                                onScroll(scrollEvent);
                            }}
                            { ...component.panResponder.panHandlers }
                        >
                            {
                                component.renderContentChildren(contentTopChildren, contentMiddleChildren, contentBottomChildren)
                            }
                        </ScrollView>
                    </KeyboardAvoidingView>
                );
            }
            if (coverImageSource !== null) {
                return (
                    <ImageBackground
                        style = { adjustedStyle.container }
                        source = {
                            typeof coverImageSource === `string` ? {
                                uri: coverImageSource,
                                cache: `only-if-cached`
                            } : coverImageSource
                        }
                        resizeMode = 'cover'
                    >
                        <KeyboardAvoidingView
                            style = {{
                                backgroundColor: `transparent`
                            }}
                            behavior = 'padding'
                            keyboardVerticalOffset = { 0 }
                        >
                            {
                                component.renderContentChildren(contentTopChildren, contentMiddleChildren, contentBottomChildren)
                            }
                        </KeyboardAvoidingView>
                    </ImageBackground>
                );
            }
            return (
                <KeyboardAvoidingView
                    style = { adjustedStyle.container }
                    behavior = 'padding'
                    keyboardVerticalOffset = { 0 }
                >
                    {
                        component.renderContentChildren(contentTopChildren, contentMiddleChildren, contentBottomChildren)
                    }
                </KeyboardAvoidingView>
            );
        }
        if (scrollable) {
            if (coverImageSource !== null) {
                return (
                    <ImageBackground
                        style = { adjustedStyle.container }
                        source = {
                            typeof coverImageSource === `string` ? {
                                uri: coverImageSource,
                                cache: `only-if-cached`
                            } : coverImageSource
                        }
                        resizeMode = 'cover'
                    >
                        <ScrollView
                            ref = {(componentRef) => {
                                component.refCache[`scroll-view`] = componentRef;
                            }}
                            style = {{
                                backgroundColor: `transparent`
                            }}
                            directionalLockEnabled = { true }
                            scrollEventThrottle = { 16 }
                            onScroll = {() => {
                                onScroll(scrollEvent);
                            }}
                            { ...component.panResponder.panHandlers }
                        >
                            {
                                component.renderContentChildren(contentTopChildren, contentMiddleChildren, contentBottomChildren)
                            }
                        </ScrollView>
                    </ImageBackground>
                );
            }
            return (
                <View style = { adjustedStyle.container }>
                    <ScrollView
                        ref = {(componentRef) => {
                            component.refCache[`scroll-view`] = componentRef;
                        }}
                        style = {{
                            backgroundColor: `transparent`
                        }}
                        directionalLockEnabled = { true }
                        scrollEventThrottle = { 16 }
                        onScroll = {() => {
                            onScroll(scrollEvent);
                        }}
                        { ...component.panResponder.panHandlers }
                    >
                        {
                            component.renderContentChildren(contentTopChildren, contentMiddleChildren, contentBottomChildren)
                        }
                    </ScrollView>
                </View>
            );
        }
        if (coverImageSource !== null) {
            return (
                <ImageBackground
                    style = { adjustedStyle.container }
                    source = {
                        typeof coverImageSource === `string` ? {
                            uri: coverImageSource,
                            cache: `only-if-cached`
                        } : coverImageSource
                    }
                    resizeMode = 'cover'
                >
                    {
                        component.renderContentChildren(contentTopChildren, contentMiddleChildren, contentBottomChildren)
                    }
                </ImageBackground>
            );
        }
        return (
            <View style = { adjustedStyle.container }>
                {
                    component.renderContentChildren(contentTopChildren, contentMiddleChildren, contentBottomChildren)
                }
            </View>
        );
    }
}

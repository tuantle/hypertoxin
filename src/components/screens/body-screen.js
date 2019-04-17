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

import * as Animatable from 'react-native-animatable';

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

const AnimatedView = Animatable.View;

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
    contentTopRoomAlignment: `none`,
    contentMiddleRoomAlignment: `none`,
    contentBottomRoomAlignment: `none`
}, prevAdjustedStyle = DEFAULT_BODY_SCREEN_STYLE, Theme = DefaultTheme) => {
    const {
        shade,
        contentTopRoomAlignment,
        contentMiddleRoomAlignment,
        contentBottomRoomAlignment,
        style
    } = newStyle;
    const themedShade = shade === `themed` ? Theme.screen.body.shade : shade;
    const themedColor = Theme.screen.color.body[themedShade];
    let themedContentTopRoomAlignment = {};
    let themedContentMiddleRoomAlignment = {};
    let themedContentBottomRoomAlignment = {};

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
        coverImageSource: PropTypes.oneOfType([
            () => null,
            PropTypes.string,
            PropTypes.number,
            ImageURISourcePropType,
            PropTypes.arrayOf(ImageURISourcePropType)
        ]),
        contentTopRoomAlignment: PropTypes.oneOf([ `none`, `start`, `center`, `end`, `stretch` ]),
        contentMiddleRoomAlignment: PropTypes.oneOf([ `none`, `start`, `center`, `end`, `stretch` ]),
        contentBottomRoomAlignment: PropTypes.oneOf([ `none`, `start`, `center`, `end`, `stretch` ]),
        scrollable: PropTypes.bool,
        keyboardAvoiding: PropTypes.bool,
        onScroll: PropTypes.func
    }
    static defaultProps = {
        shade: `themed`,
        coverImageSource: null,
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
    animate (definition = {
        onAnimationTransitionBegin: () => null,
        onAnimationTransitionEnd: () => null,
        onAnimationBegin: () => null,
        onAnimationEnd: () => null
    }) {
        const component = this;
        const {
            Theme
        } = component.context;
        const {
            refName,
            animations,
            onAnimationTransitionBegin,
            onAnimationTransitionEnd,
            onAnimationBegin,
            onAnimationEnd
        } = definition;

        const componentRef = component.refCache[refName];
        if (componentRef !== undefined && Array.isArray(animations)) {
            let transitionDuration = 0;

            const animationPromises = animations.map((animation, transitionIndex) => {
                let animationTransitionBeginPromise;
                let animationTransitionEndPromise;

                if (typeof animation === `string` && animation !== `none`) {
                    const animationName = animation.replace(/-([a-z])/g, (match, word) => word.toUpperCase());
                    if (Theme.screen.animation.hasOwnProperty(animationName)) {
                        animation = Theme.screen.animation[animationName];
                    }
                }

                if (typeof animation === `object`) {
                    let transitionType;
                    let componentRefAnimation = {
                        from: {},
                        to: {}
                    };
                    let componentRefAnimationOption = {
                        duration: DEFAULT_ANIMATION_DURATION_MS,
                        delay: 0,
                        easing: `linear`
                    };

                    if (animation.hasOwnProperty(`from`)) {
                        let from = typeof animation.from === `function` ? animation.from(component.props, component.state, component.context) : animation.from;
                        componentRefAnimation.from = typeof from === `object` ? from : {};
                        transitionType = `from`;
                    }
                    if (animation.hasOwnProperty(`to`)) {
                        let to = typeof animation.to === `function` ? animation.to(component.props, component.state, component.context) : animation.to;
                        componentRefAnimation.to = typeof to === `object` ? to : {};
                        transitionType = transitionType === `from` ? `from-to` : `to`;
                    }
                    if (animation.hasOwnProperty(`option`) && typeof animation.option === `object`) {
                        componentRefAnimationOption = {
                            ...componentRefAnimationOption,
                            ...animation.option
                        };
                    }

                    animationTransitionBeginPromise = new Promise((resolve) => {
                        setTimeout(() => {
                            (typeof onAnimationTransitionBegin === `function` ? onAnimationTransitionBegin : () => null)(transitionIndex);
                            resolve((_onAnimationTransitionBegin) => (typeof _onAnimationTransitionBegin === `function` ? _onAnimationTransitionBegin : () => null)(_onAnimationTransitionBegin));
                        }, transitionDuration);
                    });

                    if (transitionType === `to`) {
                        componentRef.transitionTo(
                            componentRefAnimation.to,
                            componentRefAnimationOption.duration,
                            componentRefAnimationOption.easing,
                            componentRefAnimationOption.delay
                        );
                    } else if (transitionType === `from-to`) {
                        setTimeout(() => {
                            componentRef.transition(
                                componentRefAnimation.from,
                                componentRefAnimation.to,
                                componentRefAnimationOption.duration,
                                componentRefAnimationOption.easing
                            );
                        }, componentRefAnimationOption.delay);
                    }

                    transitionDuration += componentRefAnimationOption.duration + componentRefAnimationOption.delay;

                    animationTransitionEndPromise = new Promise((resolve) => {
                        setTimeout(() => {
                            (typeof onAnimationTransitionEnd === `function` ? onAnimationTransitionEnd : () => null)(transitionIndex);
                            resolve((_onAnimationTransitionEnd) => (typeof _onAnimationTransitionEnd === `function` ? _onAnimationTransitionEnd : () => null)(transitionIndex));
                        }, transitionDuration);
                    });
                }

                return [ animationTransitionBeginPromise, animationTransitionEndPromise ];
            });

            const animationBeginPromise = new Promise((resolve) => {
                (typeof onAnimationBegin === `function` ? onAnimationBegin : () => null)();
                resolve((_onAnimationBegin) => (typeof _onAnimationBegin === `function` ? _onAnimationBegin : () => null)());
            });
            const animationEndPromise = new Promise((resolve) => {
                setTimeout(() => {
                    (typeof onAnimationEnd === `function` ? onAnimationEnd : () => null)();
                    resolve((_onAnimationEnd) => (typeof _onAnimationEnd === `function` ? _onAnimationEnd : () => null)());
                }, transitionDuration);
            });

            return Promise.all([
                animationBeginPromise,
                ...animationPromises.flat(),
                animationEndPromise
            ].filter((animationPromise) => animationPromise !== undefined));
        }
    }
    componentDidMount () {
        const component = this;
        const {
            shade,
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
                                        (typeof onScroll === `function` ? onScroll : () => null)(scrollEvent);
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
                                (typeof onScroll === `function` ? onScroll : () => null)(scrollEvent);
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
                                (typeof onScroll === `function` ? onScroll : () => null)(scrollEvent);
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
                            (typeof onScroll === `function` ? onScroll : () => null)(scrollEvent);
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

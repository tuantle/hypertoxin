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
 * @module RowLayout
 * @description - Row layout view component.
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
    ScrollView,
    PanResponder
} = ReactNative;

const DEVICE_WIDTH = Dimensions.get(`window`).width;
const DEVICE_HEIGHT = Dimensions.get(`window`).height;

const DEFAULT_ANIMATION_DURATION_MS = 300;

const DEFAULT_DROP_SHADOW_STYLE = {
    shadowColor: `#000000`,
    shadowRadius: 1,
    shadowOpacity: 0.25,
    shadowOffset: {
        width: 0,
        height: 1
    }
};

const DEFAULT_ROW_LAYOUT_STYLE = {
    container: {
        flexDirection: `column`,
        maxWidth: DEVICE_WIDTH,
        maxHeight: DEVICE_HEIGHT
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
    corner: `themed`,
    padding: `themed`,
    margin: `themed`,
    color: `themed`,
    dropShadowed: `themed`,
    roomAlignment: `start`,
    contentTopRoomAlignment: `none`,
    contentMiddleRoomAlignment: `none`,
    contentBottomRoomAlignment: `none`
}, prevAdjustedStyle = DEFAULT_ROW_LAYOUT_STYLE, Theme = DefaultTheme) => {
    const {
        shade,
        overlay,
        corner,
        padding,
        margin,
        color,
        dropShadowed,
        roomAlignment,
        contentTopRoomAlignment,
        contentMiddleRoomAlignment,
        contentBottomRoomAlignment,
        style
    } = newStyle;
    const themedShade = shade === `themed` ? Theme.layout.row.shade : shade;
    const themedOverlay = overlay === `themed` ? Theme.layout.row.overlay : overlay;
    const nullPadding = {
        padding: null,
        paddingTop: null,
        paddingBottom: null,
        paddingLeft: null,
        paddingRight: null,
        paddingHorizontal: null,
        paddingVertical: null
    };
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
    let themedRoomAlignment = {};
    let themedContentTopRoomAlignment = {};
    let themedContentMiddleRoomAlignment = {};
    let themedContentBottomRoomAlignment = {};
    let themedColor;
    let themedBorderColor = `transparent`;
    let themedBorderRadius;
    let themedBorderWidth = 0;
    let themedCorner;
    let themedPadding;
    let themedMargin;
    let dropShadow;

    if ((typeof dropShadowed === `boolean` && dropShadowed) || (dropShadowed === `themed` && Theme.layout.row.dropShadowed)) {
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

    if (color === `themed`) {
        if (Theme.layout.color.row.hasOwnProperty(Theme.layout.row.color)) {
            themedColor = Theme.layout.color.row[Theme.layout.row.color][themedShade];
        } else {
            themedColor = Theme.layout.row.color;
        }
    } else if (Theme.layout.color.row.hasOwnProperty(color)) {
        themedColor = Theme.layout.color.row[color][themedShade];
    } else {
        themedColor = color;
    }

    if (typeof corner === `string`) {
        if (corner === `themed`) {
            if (typeof Theme.layout.row.corner === `string` && Theme.layout.corner.row.hasOwnProperty(Theme.layout.row.corner)) {
                themedCorner = Theme.layout.corner.row[Theme.layout.row.corner];
            } else {
                themedCorner = Theme.layout.row.corner;
            }
        } else if (Theme.layout.corner.row.hasOwnProperty(corner)) {
            themedCorner = Theme.layout.corner.row[corner];
        } else {
            themedCorner = 0;
        }
    } else {
        themedCorner = corner;
    }
    if (typeof themedCorner === `number`) {
        themedBorderRadius = {
            borderRadius: themedCorner
        };
    } else if (typeof themedCorner === `object`) {
        themedBorderRadius = Object.entries(themedCorner).reduce((_themedBorderRadius, [ key, value ]) => {
            let _borderRadius = nullBorderRadius;

            _borderRadius[`border${key.charAt(0).toUpperCase()}${key.slice(1)}Radius`] = value;

            _themedBorderRadius = {
                ..._themedBorderRadius,
                ..._borderRadius
            };
            return _themedBorderRadius;
        }, nullBorderRadius);
    }

    if (typeof padding === `string`) {
        if (padding === `themed`) {
            if (typeof Theme.layout.row.padding === `string` && Theme.layout.padding.row.hasOwnProperty(Theme.layout.row.padding)) {
                themedPadding = Theme.layout.padding.row[Theme.layout.row.padding];
            } else {
                themedPadding = Theme.layout.row.padding;
            }
        } else if (Theme.layout.padding.row.hasOwnProperty(padding)) {
            themedPadding = Theme.layout.padding.row[padding];
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

    if (typeof margin === `string`) {
        if (margin === `themed`) {
            if (typeof Theme.layout.row.margin === `string` && Theme.layout.margin.row.hasOwnProperty(Theme.layout.row.margin)) {
                themedMargin = Theme.layout.margin.row[Theme.layout.row.margin];
            } else {
                themedMargin = Theme.layout.row.margin;
            }
        } else if (Theme.layout.margin.row.hasOwnProperty(margin)) {
            themedMargin = Theme.layout.margin.row[margin];
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

    switch (themedOverlay) { // eslint-disable-line
    case `opaque`:
        themedBorderColor = `transparent`;
        break;
    case `translucent`:
        themedBorderColor = `transparent`;
        themedColor = `${themedColor}${Theme.layout.color.row.opacity}`;
        break;
    case `translucent-outline`:
        themedBorderColor = themedColor;
        themedBorderWidth = 1;
        themedColor = `${themedColor}${Theme.layout.color.row.opacity}`;
        break;
    case `transparent`:
        themedBorderColor = `transparent`;
        themedColor = `transparent`;
        break;
    case `transparent-outline`:
        themedBorderColor = themedColor;
        themedBorderWidth = 1;
        themedColor = `transparent`;
        break;
    }

    switch (roomAlignment) { // eslint-disable-line
    case `start`:
        themedRoomAlignment = {
            flexShrink: 1,
            justifyContent: `flex-start`,
            alignItems: `flex-start`
        };
        break;
    case `center`:
        themedRoomAlignment = {
            flexShrink: 1,
            justifyContent: `center`,
            alignItems: `center`
        };
        break;
    case `end`:
        themedRoomAlignment = {
            flexShrink: 1,
            justifyContent: `flex-end`,
            alignItems: `flex-end`
        };
        break;
    case `stretch`:
        themedRoomAlignment = {
            flexShrink: 1,
            justifyContent: `space-between`,
            alignItems: `stretch`
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
            ...dropShadow,
            ...themedRoomAlignment,
            ...themedPadding,
            ...themedMargin,
            ...themedBorderRadius,
            borderWidth: themedBorderWidth,
            borderColor: themedBorderColor,
            backgroundColor: themedColor,
            ...(typeof style === `object` && style.hasOwnProperty(`container`) && typeof style.container === `object` ? style.container : {})
        },
        contentTopRoom: {
            ...prevAdjustedStyle.contentTopRoom,
            ...themedRoomAlignment,
            ...themedContentTopRoomAlignment,
            ...(typeof style === `object` && style.hasOwnProperty(`contentTopRoom`) && typeof style.contentTopRoom === `object` ? style.contentTopRoom : {})
        },
        contentMiddleRoom: {
            ...prevAdjustedStyle.contentMiddleRoom,
            ...themedRoomAlignment,
            ...themedContentMiddleRoomAlignment,
            ...(typeof style === `object` && style.hasOwnProperty(`contentMiddleRoom`) && typeof style.contentMiddleRoom === `object` ? style.contentMiddleRoom : {})
        },
        contentBottomRoom: {
            ...prevAdjustedStyle.contentBottomRoom,
            ...themedRoomAlignment,
            ...themedContentBottomRoomAlignment,
            ...(typeof style === `object` && style.hasOwnProperty(`contentBottomRoom`) && typeof style.contentBottomRoom === `object` ? style.contentBottomRoom : {})
        }
    };
};

export default class RowLayout extends React.Component {
    static contextType = DefaultThemeContext
    static propTypes = {
        exclusions: PropTypes.arrayOf(PropTypes.string),
        room: PropTypes.oneOf([
            `none`,
            `content-left`, `content-middle`, `content-right`,
            `content-bottom`, `content-top`,
            `media`, `badge`, `activity-indicator`
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
        color: PropTypes.string,
        dropShadowed: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.string
        ]),
        roomAlignment: PropTypes.oneOf([ `start`, `center`, `end`, `stretch` ]),
        contentTopRoomAlignment: PropTypes.oneOf([ `none`, `start`, `center`, `end`, `stretch` ]),
        contentMiddleRoomAlignment: PropTypes.oneOf([ `none`, `start`, `center`, `end`, `stretch` ]),
        contentBottomRoomAlignment: PropTypes.oneOf([ `none`, `start`, `center`, `end`, `stretch` ]),
        scrollable: PropTypes.bool,
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
        onScroll: PropTypes.func
    }
    static defaultProps = {
        exclusions: [ `` ],
        room: `none`,
        shade: `themed`,
        overlay: `themed`,
        corner: `themed`,
        pading: `themed`,
        margin: `themed`,
        color: `themed`,
        dropShadowed: `themed`,
        roomAlignment: `start`,
        contentTopRoomAlignment: `none`,
        contentMiddleRoomAlignment: `none`,
        contentBottomRoomAlignment: `none`,
        scrollable: false,
        initialAnimation: `themed`,
        onScroll: () => null
    }
    static getDerivedStateFromProps (props, state) {
        const {
            shade,
            overlay,
            corner,
            padding,
            margin,
            color,
            dropShadowed,
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
                corner,
                padding,
                margin,
                color,
                dropShadowed,
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
            adjustedStyle: DEFAULT_ROW_LAYOUT_STYLE,
            scrollEvent: {
                direction: 0,
                pageX: 0,
                pageY: 0,
                locationX: 0,
                locationY: 0
            }
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
            if (Theme.layout.animation.row.hasOwnProperty(animationName)) {
                animation = Theme.layout.animation.row[animationName];
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
            padding,
            margin,
            color,
            dropShadowed,
            roomAlignment,
            contentTopRoomAlignment,
            contentMiddleRoomAlignment,
            contentBottomRoomAlignment,
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
                    padding,
                    margin,
                    color,
                    dropShadowed,
                    roomAlignment,
                    contentTopRoomAlignment,
                    contentMiddleRoomAlignment,
                    contentBottomRoomAlignment,
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
                key = 'animated-content-top-room-view`'
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
                key = 'animated-content-middle-room-view`'
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
                key = 'animated-content-bottom-room-view`'
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
            scrollable,
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

        if (scrollable) {
            return (
                <AnimatedView
                    ref = {(componentRef) => {
                        component.refCache[`animated-container-view`] = componentRef;
                    }}
                    style = { adjustedStyle.container }
                    useNativeDriver = { true }
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
                </AnimatedView>
            );
        }
        return (
            <AnimatedView
                ref = {(componentRef) => {
                    component.refCache[`animated-container-view`] = componentRef;
                }}
                style = { adjustedStyle.container }
                useNativeDriver = { true }
            >
                {
                    component.renderContentChildren(contentTopChildren, contentMiddleChildren, contentBottomChildren)
                }
            </AnimatedView>
        );
    }
}

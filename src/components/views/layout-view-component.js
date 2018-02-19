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
 * @module LayoutViewComponent
 * @description - Layout view component.
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

const {
    Component
} = React;

const {
    Dimensions,
    ScrollView,
    PanResponder,
    View
} = ReactNative;

const AnimatedView = Animatable.View;
const AnimatedBlurView = Animatable.createAnimatableComponent(BlurView);

const DEVICE_WIDTH = Dimensions.get(`window`).width;

const DEFAULT_ANIMATION_DURATION_MS = 300;

const DEFAULT_LAYOUT_VIEW_STYLE = {
    container: {
        flexShrink: 1,
        flexDirection: `column`,
        justifyContent: `center`,
        alignItems: `stretch`,
        maxWidth: DEVICE_WIDTH
        // overflow: `hidden`
    },
    horizontal: {
        flexShrink: 1,
        flexDirection: `column`,
        borderColor: `transparent`,
        backgroundColor: `transparent`
    },
    vertical: {
        flexShrink: 1,
        flexDirection: `row`,
        borderColor: `transparent`,
        backgroundColor: `transparent`
    }
};

export default class LayoutViewComponent extends Component {
    static propTypes = {
        cId: PropTypes.string,
        room: PropTypes.oneOf([
            `none`,
            `content-left`, `content-center`, `content-right`,
            `media`, `overlay`
        ]),
        shade: PropTypes.oneOf([ `light`, `dark` ]),
        overlay: PropTypes.oneOf([ `opaque`, `frosted`, `translucent`, `transparent` ]),
        orientation: PropTypes.oneOf([ `horizontal`, `vertical` ]),
        selfAlignment: PropTypes.oneOf([ `auto`, `start`, `center`, `end`, `stretch` ]),
        alignment: PropTypes.oneOf([ `start`, `center`, `end`, `stretch` ]),
        scrollable: PropTypes.bool,
        onScroll: PropTypes.func
    }
    static defaultProps = {
        cId: ``,
        room: `none`,
        shade: Ht.Theme.view.layout.shade,
        overlay: Ht.Theme.view.layout.overlay,
        orientation: `horizontal`,
        selfAlignment: `auto`,
        alignment: `center`,
        scrollable: false,
        onScroll: () => null
    }
    constructor (property) {
        super(property);
        this.refCache = {};
        this.panResponder = null;
        this.state = {
            adjustedStyle: DEFAULT_LAYOUT_VIEW_STYLE,
            scrollDirection: null
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
        shade: Ht.Theme.view.layout.shade,
        overlay: Ht.Theme.view.layout.overlay,
        selfAlignment: `auto`,
        alignment: `center`
    }) => {
        const component = this;
        const {
            shade,
            overlay,
            selfAlignment,
            alignment,
            style
        } = Hf.fallback({
            shade: Ht.Theme.view.layout.shade,
            overlay: Ht.Theme.view.layout.overlay,
            selfAlignment: `auto`,
            alignment: `center`
        }).of(newStyle);
        const {
            adjustedStyle: prevAdjustedStyle
        } = component.state;
        let themedColor;

        switch (overlay) { // eslint-disable-line
        case `opaque`:
            themedColor = Ht.Theme.view.color.layout[shade];
            break;
        case `translucent`:
            themedColor = `${Ht.Theme.view.color.layout[shade]}${Ht.Theme.view.color.layout.opacity}`;
            break;
        case `frosted`:
            themedColor = `transparent`;
            break;
        case `transparent`:
            themedColor = `transparent`;
            break;
        }

        const adjustedStyle = Hf.merge(prevAdjustedStyle).with({
            container: {
                backgroundColor: themedColor,
                alignSelf: (() => {
                    switch (selfAlignment) { // eslint-disable-line
                    case `auto`:
                        return `auto`;
                    case `start`:
                        return `flex-start`;
                    case `center`:
                        return `center`;
                    case `end`:
                        return `flex-end`;
                    case `stretch`:
                        return `stretch`;
                    }
                })()
            },
            horizontal: (() => {
                switch (alignment) { // eslint-disable-line
                case `start`:
                    if (selfAlignment === `stretch`) {
                        return {
                            justifyContent: `space-between`,
                            alignItems: `flex-start`
                        };
                    } else {
                        return {
                            justifyContent: `flex-start`,
                            alignItems: `flex-start`
                        };
                    }
                case `center`:
                    if (selfAlignment === `stretch`) {
                        return {
                            justifyContent: `space-between`,
                            alignItems: `center`
                        };
                    } else {
                        return {
                            justifyContent: `center`,
                            alignItems: `center`
                        };
                    }
                case `end`:
                    if (selfAlignment === `stretch`) {
                        return {
                            justifyContent: `space-between`,
                            alignItems: `flex-end`
                        };
                    } else {
                        return {
                            justifyContent: `flex-end`,
                            alignItems: `flex-end`
                        };
                    }
                case `stretch`:
                    return {
                        justifyContent: `space-between`,
                        alignItems: `stretch`
                    };
                }
            })(),
            vertical: (() => {
                switch (alignment) { // eslint-disable-line
                case `start`:
                    if (selfAlignment === `stretch`) {
                        return {
                            justifyContent: `space-between`,
                            alignItems: `flex-start`
                        };
                    } else {
                        return {
                            justifyContent: `flex-start`,
                            alignItems: `flex-start`
                        };
                    }
                case `center`:
                    if (selfAlignment === `stretch`) {
                        return {
                            justifyContent: `space-between`,
                            alignItems: `center`
                        };
                    } else {
                        return {
                            justifyContent: `center`,
                            alignItems: `center`
                        };
                    }
                case `end`:
                    if (selfAlignment === `stretch`) {
                        return {
                            justifyContent: `space-between`,
                            alignItems: `flex-end`
                        };
                    } else {
                        return {
                            justifyContent: `flex-end`,
                            alignItems: `flex-end`
                        };
                    }
                case `stretch`:
                    return {
                        justifyContent: `space-between`,
                        alignItems: `stretch`
                    };
                }
            })()
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
                Hf.log(`error`, `LayoutViewComponent.assignComponentRef - Input component reference name is invalid.`);
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
                    Hf.log(`error`, `LayoutViewComponent.lookupComponentRefs - Input component reference name is invalid.`);
                } else if (!refNames.every((refName) => component.refCache.hasOwnProperty(refName))) {
                    Hf.log(`error`, `LayoutViewComponent.lookupComponentRefs - Component reference is not found.`);
                }
            }

            componentRefs = Hf.collect(...refNames).from(component.refCache);
        } else {
            Hf.log(`error`, `LayoutViewComponent.lookupComponentRefs - Input component reference name array is empty.`);
        }

        return componentRefs;
    }
    getScrollDirection = () => {
        const component = this;
        const {
            scrollable
        } = component.props;
        const {
            scrollDirection
        } = component.state;

        if (scrollable) {
            return scrollDirection;
        } else {
            return null;
        }
    }
    scrollTo = (destination = {
        x: 0,
        y: 0,
        animated: true
    }) => {
        const component = this;
        const {
            cId,
            scrollable
        } = component.props;

        if (scrollable) {
            const [ scrollView ] = component.lookupComponentRefs(`scroll-view${cId}`);
            const {
                x,
                y,
                animated
            } = Hf.fallback({
                x: 0,
                y: 0,
                animated: true
            }).of(destination);

            scrollView.scrollTo({
                x,
                y,
                animated
            });
        }
    }
    animate = (option = {
        loopCount: -1,
        duration: DEFAULT_ANIMATION_DURATION_MS,
        delay: 0,
        easing: `ease`
    }) => {
        const component = this;
        const {
            cId
        } = component.props;
        const [ animatedView ] = component.lookupComponentRefs(`animated-view${cId}`);
        const {
            from,
            to,
            loopCount,
            duration,
            delay,
            easing
        } = Hf.fallback({
            loopCount: -1,
            duration: DEFAULT_ANIMATION_DURATION_MS,
            delay: 0,
            easing: `ease`
        }).of(option);
        let intervalId;
        let count = loopCount;

        if (Hf.isObject(from) && Hf.isObject(to)) {
            if (delay > 0) {
                setTimeout(() => {
                    intervalId = setInterval(() => {
                        if (count >= 0) {
                            if (count === 0) {
                                clearInterval(intervalId);
                            } else {
                                animatedView.transition(from, to, duration, easing);
                                count--;
                            }
                        }
                    }, duration);
                }, delay);
            } else {
                intervalId = setInterval(() => {
                    if (count >= 0) {
                        if (count === 0) {
                            clearInterval(intervalId);
                        } else {
                            animatedView.transition(from, to, duration, easing);
                            count--;
                        }
                    }
                }, duration);
            }
        } else if (!Hf.isObject(from) && Hf.isObject(to)) {
            if (delay > 0) {
                setTimeout(() => {
                    intervalId = setInterval(() => {
                        if (count >= 0) {
                            if (count === 0) {
                                clearInterval(intervalId);
                            } else {
                                animatedView.transitionTo(to, duration, easing);
                                count--;
                            }
                        }
                    }, duration);
                }, delay);
            } else {
                intervalId = setInterval(() => {
                    if (count >= 0) {
                        if (count === 0) {
                            clearInterval(intervalId);
                        } else {
                            animatedView.transitionTo(to, duration, easing);
                            count--;
                        }
                    }
                }, duration);
            }
        }
    }
    componentWillMount () {
        const component = this;
        const {
            shade,
            overlay,
            selfAlignment,
            alignment,
            scrollable,
            style
        } = component.props;

        if (scrollable) {
            component.panResponder = PanResponder.create({
                onMoveShouldSetResponderCapture: () => true,
                onMoveShouldSetPanResponderCapture: () => true,
                onPanResponderMove: (event, gestureState) => {
                    let scrollDirection;

                    if (gestureState.vy === 0) {
                        scrollDirection = 0;
                    } else if (gestureState.vy > 0) {
                        scrollDirection = 1;
                    } else if (gestureState.vy < 0) {
                        scrollDirection = -1;
                    }
                    component.setState(() => {
                        return {
                            scrollDirection
                        };
                    });
                }
            });
        }
        component.setState(() => {
            return {
                adjustedStyle: component._readjustStyle({
                    shade,
                    overlay,
                    selfAlignment,
                    alignment,
                    style
                })
            };
        });
    }
    componentWillUnMount () {
        const component = this;

        component.panResponder = null;
        component.refCache = {};
    }
    componentWillReceiveProps (nextProperty) {
        const component = this;
        const {
            shade,
            overlay,
            selfAlignment,
            alignment,
            style
        } = nextProperty;

        component.setState(() => {
            return {
                scrollDirection: 0,
                adjustedStyle: component._readjustStyle({
                    shade,
                    overlay,
                    selfAlignment,
                    alignment,
                    style
                })
            };
        });
    }
    render () {
        const component = this;
        const {
            cId,
            shade,
            overlay,
            orientation,
            scrollable,
            onScroll,
            children
        } = component.props;
        const {
            adjustedStyle,
            scrollDirection
        } = component.state;
        const frosted = overlay === `frosted`;
        const layoutViewChildProperty = {
            shade
        };
        let layoutViewChildren = null;

        if (React.Children.count(children) > 0) {
            let fragments = React.Children.toArray(React.Children.map(children, (child) => {
                if (child !== null) {
                    return React.cloneElement(child, layoutViewChildProperty);
                } else {
                    return null;
                }
            }));
            layoutViewChildren = Hf.isEmpty(fragments) ? null : fragments;
        }

        if (scrollable) {
            if (frosted) {
                return (
                    <AnimatedBlurView
                        ref = { component.assignComponentRef(`animated-view${cId}`) }
                        style = { adjustedStyle.container }
                        blurType = { shade }
                        blurAmount = { Ht.Theme.general.frostLevel }
                        useNativeDriver = { true }
                    >
                        <ScrollView
                            ref = { component.assignComponentRef(`scroll-view${cId}`) }
                            directionalLockEnabled = { true }
                            scrollEventThrottle = { 16 }
                            onScroll = {(event) => {
                                onScroll(event, scrollDirection);
                            }}
                            { ...component.panResponder.panHandlers }
                        >
                            <View style = { adjustedStyle[orientation] }>
                                {
                                    layoutViewChildren
                                }
                            </View>
                        </ScrollView>
                    </AnimatedBlurView>
                );
            }
            return (
                <AnimatedView
                    ref = { component.assignComponentRef(`animated-view${cId}`) }
                    style = { adjustedStyle.container }
                    useNativeDriver = { true }
                >
                    <ScrollView
                        ref = { component.assignComponentRef(`scroll-view${cId}`) }
                        directionalLockEnabled = { true }
                        scrollEventThrottle = { 16 }
                        onScroll = {(event) => {
                            onScroll(event, scrollDirection);
                        }}
                        { ...component.panResponder.panHandlers }
                    >
                        <View style = { adjustedStyle[orientation] }>
                            {
                                layoutViewChildren
                            }
                        </View>
                    </ScrollView>
                </AnimatedView>
            );
        } else {
            if (frosted) {
                return (
                    <AnimatedBlurView
                        ref = { component.assignComponentRef(`animated-view${cId}`) }
                        style = { adjustedStyle.container }
                        blurType = { shade }
                        blurAmount = { Ht.Theme.general.frostLevel }
                        useNativeDriver = { true }
                    >
                        <View style = { adjustedStyle[orientation] }>
                            {
                                layoutViewChildren
                            }
                        </View>
                    </AnimatedBlurView>
                );
            }
            return (
                <AnimatedView
                    ref = { component.assignComponentRef(`animated-view${cId}`) }
                    style = { adjustedStyle.container }
                    useNativeDriver = { true }
                >
                    <View style = { adjustedStyle[orientation] }>
                        {
                            layoutViewChildren
                        }
                    </View>
                </AnimatedView>
            );
        }
    }
}

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
 * @module ItemViewComponent
 * @description - Item view component.
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

import debouncer from '../../utils/debouncer';

const {
    Component
} = React;

const {
    Animated,
    // Dimensions,
    Easing,
    StyleSheet,
    TouchableOpacity,
    View
} = ReactNative;

const AnimatedView = Animatable.View;

// const DEVICE_WIDTH = Dimensions.get(`window`).width;

const DEFAULT_ITEM_PRESS_DEBOUNCE_TIME_MS = 250;

const DEFAULT_ANIMATION_DURATION_MS = 300;

const DEFAULT_ITEM_VIEW_STYLE = {
    container: {
        flexDirection: `row`,
        alignItems: `center`,
        alignSelf: `stretch`,
        justifyContent: `space-between`,
        // width: DEVICE_WIDTH,
        width: `100%`,
        height: Ht.Theme.view.size.item,
        paddingVertical: 6,
        marginVertical: 6
    },
    room: {
        contentLeft: {
            flexGrow: 1,
            flexDirection: `column`,
            alignItems: `flex-start`,
            justifyContent: `center`,
            height: Ht.Theme.view.size.item,
            backgroundColor: `transparent`
        },
        actionRight: {
            flexShrink: 1,
            flexDirection: `column`,
            alignItems: `flex-end`,
            justifyContent: `center`,
            height: Ht.Theme.view.size.item,
            backgroundColor: `transparent`
        },
        filler: {
            height: Ht.Theme.view.size.item,
            backgroundColor: `transparent`
        }
    },
    ripple: {
        position: `absolute`,
        width: Ht.Theme.view.size.item,
        height: Ht.Theme.view.size.item,
        borderRadius: Ht.Theme.view.size.item / 2,
        overflow: `hidden`
    }
};

export default class ItemViewComponent extends Component {
    static propTypes = {
        cId: PropTypes.string,
        shade: PropTypes.oneOf([ `light`, `dark` ]),
        overlay: PropTypes.oneOf([ `opaque`, `translucent`, `transparent` ]),
        disabled: PropTypes.bool,
        rippled: PropTypes.bool,
        debounceTime: PropTypes.number,
        onPress: PropTypes.func
    }
    static defaultProps = {
        cId: ``,
        shade: Ht.Theme.view.item.shade,
        overlay: Ht.Theme.view.item.overlay,
        disabled: false,
        rippled: Ht.Theme.view.item.rippled,
        debounceTime: DEFAULT_ITEM_PRESS_DEBOUNCE_TIME_MS,
        onPress: () => null
    }
    constructor (property) {
        super(property);
        this.refCache = {};
        this.debounce = null;
        this.state = {
            adjustedStyle: DEFAULT_ITEM_VIEW_STYLE,
            width: 0,
            height: Ht.Theme.view.size.item,
            animation: {
                animating: false,
                animatedValue: new Animated.Value(0),
                easing: {
                    in: Easing.in(Easing.ease),
                    out: Easing.out(Easing.ease)
                },
                duration: DEFAULT_ANIMATION_DURATION_MS * 2,
                delay: 0
                // style: {
                //     opactity: {
                //         from: 1,
                //         to: 1
                //     }
                // }
            },
            ripple: {
                scale: 0,
                radius: Ht.Theme.view.size.item / 2,
                locationX: 0,
                locationY: 0
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
        shade: Ht.Theme.view.item.shade,
        overlay: Ht.Theme.view.item.overlay
    }) => {
        const component = this;
        const {
            shade,
            overlay,
            style
        } = Hf.fallback({
            shade: Ht.Theme.view.item.shade,
            overlay: Ht.Theme.view.item.overlay
        }).of(newStyle);
        const {
            adjustedStyle: prevAdjustedStyle
        } = component.state;
        let themedColor;
        let themedRippleColor;

        switch (overlay) { // eslint-disable-line
        case `opaque`:
            themedColor = Ht.Theme.view.color.item[shade];
            themedRippleColor = Ht.Theme.view.color.item.ripple.dark;
            break;
        case `translucent`:
            themedColor = `${Ht.Theme.view.color.item[shade]}${Ht.Theme.view.color.item.opacity}`;
            themedRippleColor = Ht.Theme.view.color.item.ripple.dark;
            break;
        case `transparent`:
            themedColor = `transparent`;
            themedRippleColor = Ht.Theme.view.color.item.ripple[shade];
            break;
        }

        const adjustedStyle = Hf.merge(prevAdjustedStyle).with({
            container: {
                backgroundColor: themedColor
            },
            ripple: {
                backgroundColor: themedRippleColor
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
                Hf.log(`error`, `ItemViewComponent.assignComponentRef - Input component reference name is invalid.`);
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
                    Hf.log(`error`, `ItemViewComponent.lookupComponentRefs - Input component reference name is invalid.`);
                } else if (!refNames.every((refName) => component.refCache.hasOwnProperty(refName))) {
                    Hf.log(`error`, `ItemViewComponent.lookupComponentRefs - Component reference is not found.`);
                }
            }

            componentRefs = Hf.collect(...refNames).from(component.refCache);
        } else {
            Hf.log(`error`, `ItemViewComponent.lookupComponentRefs - Input component reference name array is empty.`);
        }

        return componentRefs;
    }
    animate (refName, option = {
        loopCount: -1,
        duration: DEFAULT_ANIMATION_DURATION_MS,
        delay: 0,
        easing: `ease`
    }) {
        const component = this;
        const {
            cId,
            disabled
        } = component.props;

        if (!disabled) {
            const [ animatedView ] = component.lookupComponentRefs(`${refName}${cId}`);
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
    }
    onLayout = (event) => {
        const component = this;
        const {
            width,
            height
        } = event.nativeEvent.layout;

        component.setState((prevState) => {
            if (prevState.animation.animating) {
                return null;
            } else {
                return {
                    width,
                    height
                };
            }
        });
    }
    onPress = (event) => {
        const component = this;
        const {
            rippled,
            onPress
        } = component.props;
        const {
            adjustedStyle,
            animation,
            width,
            height
        } = component.state;

        if (rippled) {
            const {
                locationX,
                locationY
            } = event.nativeEvent;
            component.setState((prevState) => {
                return {
                    animation: {
                        ...prevState.animation,
                        animating: true
                    },
                    ripple: {
                        ...prevState.ripple,
                        scale: 2 * Math.sqrt((Math.pow(width, 2) + Math.pow(height, 2)) / ((Math.pow(adjustedStyle.ripple.width, 2) + Math.pow(adjustedStyle.ripple.height, 2)))),
                        locationX,
                        locationY
                    }
                };
            }, () => {
                Animated.timing(animation.animatedValue, {
                    toValue: 1,
                    easing: animation.easing.out,
                    duration: animation.duration,
                    useNativeDriver: true
                }).start(() => {
                    animation.animatedValue.resetAnimation();
                    component.setState((prevState) => {
                        return {
                            animation: {
                                ...prevState.animation,
                                animating: false
                            },
                            ripple: {
                                animatedValue: new Animated.Value(0),
                                scale: 0,
                                radius: Ht.Theme.view.size.item / 2,
                                locationX: 0,
                                locationY: 0
                            }
                        };
                    }, () => {
                        onPress(event);
                    });
                });
            });
        }
    }
    componentWillMount () {
        const component = this;
        const {
            shade,
            overlay,
            debounceTime,
            style
        } = component.props;

        component.debounce = debouncer(debounceTime);
        component.setState(() => {
            return {
                adjustedStyle: component._readjustStyle({
                    shade,
                    overlay,
                    style
                })
            };
        });
    }
    componentWillUnMount () {
        const component = this;
        const {
            animation
        } = component.state;

        component.debounce = null;
        component.refCache = {};
        animation.animatedValue.removeAllListeners();
    }
    componentWillReceiveProps (nextProperty) {
        const component = this;
        const {
            shade,
            overlay,
            debounceTime,
            style
        } = nextProperty;

        component.debounce = debouncer(debounceTime);
        component.setState(() => {
            return {
                adjustedStyle: component._readjustStyle({
                    shade,
                    overlay,
                    style
                })
            };
        });
    }
    renderRipple () {
        const component = this;
        const {
            adjustedStyle,
            animation,
            ripple,
            width
        } = component.state;

        if (animation.animating) {
            return (
                <View
                    style = {{
                        ...StyleSheet.absoluteFillObject,
                        borderRadius: adjustedStyle.container.borderRadius,
                        backgroundColor: `transparent`,
                        overflow: `hidden`
                    }}
                    pointerEvents = 'box-only'
                >
                    <Animated.View style = {{
                        ...adjustedStyle.ripple,
                        top: 0, // ripple.locationY,
                        left: width <= ripple.radius * 4 ? width / 2 - ripple.radius : ripple.locationX,
                        transform: [{
                            scale: animation.animatedValue.interpolate({
                                inputRange: [ 0, 1 ],
                                outputRange: [ 0, ripple.scale ]
                            })
                        }],
                        opacity: animation.animatedValue.interpolate({
                            inputRange: [ 0, 1 ],
                            outputRange: [ parseInt(Ht.Theme.view.color.item.opacity, 16) / 255, 0 ]
                        })
                    }}/>
                </View>
            );
        } else {
            return null;
        }
    }
    render () {
        const component = this;
        const {
            cId,
            shade,
            disabled,
            rippled,
            children
        } = component.props;
        const {
            adjustedStyle
        } = component.state;
        const itemViewContentChildProperty = {
            shade
        };
        const itemViewActionChildProperty = {
            shade,
            disabled
        };
        let itemContentLeftChildren = null;
        let itemActionRightChildren = null;

        if (React.Children.count(children) > 0) {
            let fragments = React.Children.toArray(React.Children.map(children, (child) => {
                const {
                    room
                } = child.props;

                if (child !== null) {
                    if (Hf.isString(room) && room === `content-left`) {
                        return React.cloneElement(child, itemViewContentChildProperty);
                    } else if (Hf.isString(room) && room === `action-right`) {
                        return React.cloneElement(child, itemViewActionChildProperty);
                    } else {
                        Hf.log(`warn1`, `ItemViewComponent.render - Item view component requires children each to have a room propperty.`);
                        return null;
                    }
                } else {
                    return null;
                }
            }));

            itemContentLeftChildren = fragments.filter((child) => {
                if (child !== null) {
                    const {
                        room
                    } = child.props;

                    return room === `content-left`;
                } else {
                    return false;
                }
            });
            itemContentLeftChildren = Hf.isEmpty(itemContentLeftChildren) ? null : itemContentLeftChildren;

            itemActionRightChildren = fragments.filter((child) => {
                if (child !== null) {
                    const {
                        room
                    } = child.props;

                    return room === `action-right`;
                } else {
                    return false;
                }
            });
            itemActionRightChildren = Hf.isEmpty(itemActionRightChildren) ? null : itemActionRightChildren;
        }

        return (
            <AnimatedView
                ref = { component.assignComponentRef(`animated-view${cId}`) }
                useNativeDriver = { true }
            >
                <TouchableOpacity
                    style = { adjustedStyle.container }
                    activeOpacity = { parseInt(Ht.Theme.view.color.item.opacity, 16) / 255 }
                    onLayout = { component.onLayout }
                    onPress = { disabled ? null : (event) => component.debounce(component.onPress, event) }
                >
                    {
                        rippled ? component.renderRipple() : null
                    }
                    <AnimatedView
                        ref = { component.assignComponentRef(`animated-content-left-view${cId}`) }
                        style = { adjustedStyle.room.contentLeft }
                        pointerEvents = 'box-only'
                        useNativeDriver = { true }
                    >
                        {
                            itemContentLeftChildren !== null ? itemContentLeftChildren : <View style = { adjustedStyle.room.filler }/>
                        }
                    </AnimatedView>
                    <AnimatedView
                        ref = { component.assignComponentRef(`animated-action-right-view${cId}`) }
                        style = { adjustedStyle.room.actionRight }
                        useNativeDriver = { true }
                    >
                        {
                            itemActionRightChildren !== null ? itemActionRightChildren : <View style = { adjustedStyle.room.filler }/>
                        }
                    </AnimatedView>
                </TouchableOpacity>
            </AnimatedView>
        );
    }
}

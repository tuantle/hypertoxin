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

import debouncer from '../../common/utils/debouncer';

const {
    Component
} = React;

const {
    Animated,
    Dimensions,
    Easing,
    StyleSheet,
    TouchableOpacity,
    View
} = ReactNative;

const AnimatedView = Animatable.View;

const DEVICE_WIDTH = Dimensions.get(`window`).width;

const DEFAULT_ITEM_PRESS_DEBOUNCE_TIME_MS = 250;

const DEFAULT_ITEM_VIEW_STYLE = {
    container: {
        flexDirection: `row`,
        alignItems: `stretch`,
        alignSelf: `stretch`,
        justifyContent: `space-around`,
        width: DEVICE_WIDTH,
        height: Ht.Theme.view.size.item,
        padding: 3,
        marginVertical: 6
    },
    room: {
        contentLeft: {
            flexGrow: 1,
            flexDirection: `column`,
            alignSelf: `center`,
            alignItems: `center`,
            justifyContent: `center`,
            maxWidth: (5 * DEVICE_WIDTH) / 6,
            height: Ht.Theme.view.size.item,
            backgroundColor: `transparent`
        },
        actionRight: {
            flexShrink: 1,
            flexDirection: `column`,
            alignSelf: `center`,
            alignItems: `center`,
            justifyContent: `center`,
            maxWidth: DEVICE_WIDTH / 6,
            height: Ht.Theme.view.size.item,
            backgroundColor: `transparent`
        },
        filler: {
            maxWidth: DEVICE_WIDTH / 6,
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
        room: `none`,
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
            height: Ht.Theme.button.size.flat,
            ripple: {
                animating: false,
                progress: new Animated.Value(0),
                scale: 0,
                locationX: 0,
                locationY: 0
            }
        };
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
    readjustStyle = (newStyle = {
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
    animate (refName, option = {
        loopCount: -1,
        duration: 300,
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
                duration: 300,
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
    animateRipple (locationX, locationY) {
        const component = this;
        const {
            adjustedStyle,
            width,
            height
        } = component.state;
        let ripple = {
            animating: true,
            progress: new Animated.Value(0),
            scale: 2 * Math.sqrt((Math.pow(width, 2) + Math.pow(height, 2)) / ((Math.pow(adjustedStyle.ripple.width, 2) + Math.pow(adjustedStyle.ripple.height, 2)))),
            locationX,
            locationY
        };

        Animated.timing(ripple.progress, {
            toValue: 1,
            easing: Easing.out(Easing.ease),
            duration: 600,
            useNativeDriver: true
        }).start(() => {
            component.setState(() => {
                return {
                    ripple: {
                        animating: false,
                        progress: new Animated.Value(0),
                        scale: 0,
                        locationX: 0,
                        locationY: 0
                    }
                };
            });
        });

        component.setState(() => {
            return {
                ripple
            };
        });
    }
    onLayout = (event) => {
        const component = this;
        const {
            width,
            height
        } = event.nativeEvent.layout;

        component.setState((prevState) => {
            if (prevState.ripple.animating) {
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

        if (rippled) {
            const {
                locationX,
                locationY
            } = event.nativeEvent;
            requestAnimationFrame(() => onPress(event));
            component.animateRipple(locationX, locationY);
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
                adjustedStyle: component.readjustStyle({
                    shade,
                    overlay,
                    style
                })
            };
        });
    }
    componentWillUnMount () {
        const component = this;

        component.debounce = null;
        component.refCache = {};
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
                adjustedStyle: component.readjustStyle({
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
            ripple
        } = component.state;

        if (ripple.animating) {
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
                        left: ripple.locationX,
                        transform: [{
                            scale: ripple.progress.interpolate({
                                inputRange: [ 0, 1 ],
                                outputRange: [ 0, ripple.scale ]
                            })
                        }],
                        opacity: ripple.progress.interpolate({
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
            disabled,
            rippled,
            children
        } = component.props;
        const {
            adjustedStyle
        } = component.state;
        let itemContentLeftChildren = null;
        let itemActionRightChildren = null;

        if (React.Children.count(children) > 0) {
            let fragments = React.Children.toArray(React.Children.map(children, (child) => {
                const {
                    room
                } = child.props;
                if (Hf.isString(room) && room === `action-right`) {
                    return React.cloneElement(child, {
                        disabled,
                        onPress: () => component.debounce(component.onClearInput)
                    });
                } else {
                    return React.cloneElement(child);
                }
            }));

            itemContentLeftChildren = fragments.filter((child) => {
                const {
                    room
                } = child.props;
                if (!Hf.isString(room)) {
                    Hf.log(`warn1`, `ItemViewComponent.render - Item view component requires children each to have a room propperty.`);
                    return false;
                } else {
                    return room === `content-left`;
                }
            });
            itemContentLeftChildren = Hf.isEmpty(itemContentLeftChildren) ? null : itemContentLeftChildren;

            itemActionRightChildren = fragments.filter((child) => {
                const {
                    room
                } = child.props;
                if (!Hf.isString(room)) {
                    Hf.log(`warn1`, `ItemViewComponent.render - Item view component requires children each to have a room propperty.`);
                    return false;
                } else {
                    return room === `action-right`;
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
                        pointerEvents = 'box-only'
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

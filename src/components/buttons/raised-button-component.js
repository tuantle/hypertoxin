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
 * @module RaisedButtonComponent
 * @description - Raised button component.
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

import { View as AnimatedView } from 'react-native-animatable';

import debouncer from '../../common/utils/debouncer';

const {
    Component
} = React;

const {
    Animated,
    ActivityIndicator,
    Easing,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} = ReactNative;

const DEFAULT_BUTTON_PRESS_DEBOUNCE_TIME_MS = 250;

const DEFAULT_ANIMATION_DURATION_MS = 300;

const DEFAULT_RAISED_BUTTON_STYLE = {
    container: {
        ...Ht.Theme.general.dropShadow.shallow,
        flexDirection: `row`,
        justifyContent: `center`,
        alignItems: `center`,
        height: Ht.Theme.button.size.raised,
        margin: 9,
        padding: 6
    },
    room: {
        contentLeft: {
            flexDirection: `row`,
            alignItems: `center`,
            justifyContent: `center`,
            maxHeight: Ht.Theme.button.size.raised,
            backgroundColor: `transparent`
        },
        contentCenter: {
            flexDirection: `row`,
            alignItems: `center`,
            justifyContent: `center`,
            maxHeight: Ht.Theme.button.size.raised,
            backgroundColor: `transparent`
        },
        contentRight: {
            flexDirection: `row`,
            alignItems: `center`,
            justifyContent: `center`,
            maxHeight: Ht.Theme.button.size.raised,
            backgroundColor: `transparent`
        },
        badge: {
            ...Ht.Theme.general.dropShadow.shallow,
            flexDirection: `row`,
            position: `absolute`,
            alignItems: `center`,
            justifyContent: `center`,
            minWidth: Ht.Theme.misc.size.badge,
            height: Ht.Theme.misc.size.badge,
            top: -4,
            right: -6,
            borderRadius: Ht.Theme.misc.size.badge / 2,
            backgroundColor: Ht.Theme.misc.color.badge
        }
    },
    label: {
        ...Ht.Theme.button.font.label,
        marginHorizontal: 6
    },
    ripple: {
        position: `absolute`,
        width: Ht.Theme.button.size.raised,
        height: Ht.Theme.button.size.raised,
        borderRadius: Ht.Theme.button.size.raised / 2,
        overflow: `hidden`
    }
};

export default class RaisedButtonComponent extends Component {
    static propTypes = {
        cId: PropTypes.string,
        room: PropTypes.oneOf([
            `none`,
            `action-left`, `action-right`
        ]),
        action: PropTypes.oneOf([
            `none`,
            `clear`,
            `expand`, `collapse`,
            `show`, `hide`,
            `close`, `open`
        ]),
        shade: PropTypes.oneOf([ `light`, `dark` ]),
        corner: PropTypes.oneOf([ `round25`, `round50`, `square` ]),
        disabled: PropTypes.bool,
        busy: PropTypes.bool,
        rippled: PropTypes.bool,
        uppercasedLabel: PropTypes.bool,
        label: PropTypes.string,
        color: PropTypes.string,
        debounceTime: PropTypes.number,
        onPress: PropTypes.func
    }
    static defaultProps = {
        cId: ``,
        room: `none`,
        action: `none`,
        shade: Ht.Theme.button.raised.shade,
        corner: Ht.Theme.button.raised.corner,
        disabled: false,
        busy: false,
        rippled: Ht.Theme.button.raised.rippled,
        uppercasedLabel: Ht.Theme.button.raised.uppercasedLabel,
        label: `Button`,
        color: Ht.Theme.button.raised.color,
        debounceTime: DEFAULT_BUTTON_PRESS_DEBOUNCE_TIME_MS,
        onPress: () => null
    }
    constructor (property) {
        super(property);
        this.refCache = {};
        this.debounce = null;
        this.state = {
            adjustedStyle: DEFAULT_RAISED_BUTTON_STYLE,
            width: 0,
            height: Ht.Theme.button.size.raised,
            ripple: {
                animating: false,
                animatedValue: new Animated.Value(0),
                scale: 0,
                radius: Ht.Theme.button.size.raised / 2,
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
                Hf.log(`error`, `RaisedButtonComponent.assignComponentRef - Input component reference name is invalid.`);
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
                    Hf.log(`error`, `RaisedButtonComponent.lookupComponentRefs - Input component reference name is invalid.`);
                } else if (!refNames.every((refName) => component.refCache.hasOwnProperty(refName))) {
                    Hf.log(`error`, `RaisedButtonComponent.lookupComponentRefs - Component reference is not found.`);
                }
            }

            componentRefs = Hf.collect(...refNames).from(component.refCache);
        } else {
            Hf.log(`error`, `RaisedButtonComponent.lookupComponentRefs - Input component reference name array is empty.`);
        }

        return componentRefs;
    }
    readjustStyle = (newStyle = {
        shade: Ht.Theme.button.raised.shade,
        corner: Ht.Theme.button.raised.corner,
        disabled: false,
        busy: false,
        color: Ht.Theme.button.raised.color
    }) => {
        const component = this;
        const {
            shade,
            corner,
            disabled,
            busy,
            color,
            style
        } = Hf.fallback({
            shade: Ht.Theme.button.raised.shade,
            corner: Ht.Theme.button.raised.corner,
            disabled: false,
            busy: false,
            color: Ht.Theme.button.raised.color
        }).of(newStyle);
        const {
            adjustedStyle: prevAdjustedStyle
        } = component.state;
        let themedColor;
        let themedLabelColor;
        let themedRippleColor;

        if (Ht.Theme.button.color.raised.hasOwnProperty(color)) {
            themedColor = busy || disabled ? Ht.Theme.button.color.raised.disabled[shade] : Ht.Theme.button.color.raised[color][shade];
        } else {
            themedColor = busy || disabled ? Ht.Theme.button.color.raised.disabled[shade] : color;
        }

        themedLabelColor = Ht.Theme.button.color.raised.label[shade];
        themedRippleColor = Ht.Theme.button.color.raised.ripple[shade];

        const adjustedStyle = Hf.merge(prevAdjustedStyle).with({
            container: {
                borderRadius: Ht.Theme.button.corner[corner],
                backgroundColor: themedColor
            },
            label: {
                color: themedLabelColor
            },
            ripple: {
                backgroundColor: themedRippleColor
            }
        });

        return Hf.isObject(style) ? Hf.merge(adjustedStyle).with({
            container: style
        }) : adjustedStyle;
    }
    animate = (option = {
        loopCount: -1,
        duration: DEFAULT_ANIMATION_DURATION_MS,
        delay: 0,
        easing: `ease`
    }) => {
        const component = this;
        const {
            cId,
            disabled
        } = component.props;

        if (!disabled) {
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
    }
    animateRipple (locationX, locationY) {
        const component = this;
        const {
            adjustedStyle,
            ripple,
            width,
            height
        } = component.state;

        Animated.timing(ripple.animatedValue, {
            toValue: 1,
            easing: Easing.out(Easing.ease),
            duration: 600,
            useNativeDriver: true
        }).start(() => {
            ripple.animatedValue.resetAnimation();
            component.setState(() => {
                return {
                    ripple: {
                        animating: false,
                        animatedValue: new Animated.Value(0),
                        scale: 0,
                        radius: Ht.Theme.button.size.raised / 2,
                        locationX: 0,
                        locationY: 0
                    }
                };
            });
        });

        component.setState((prevState) => {
            return {
                ripple: {
                    ...prevState.ripple,
                    animating: true,
                    scale: 2 * Math.sqrt((Math.pow(width, 2) + Math.pow(height, 2)) / ((Math.pow(adjustedStyle.ripple.width, 2) + Math.pow(adjustedStyle.ripple.height, 2)))),
                    locationX,
                    locationY
                }
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
            corner,
            disabled,
            busy,
            color,
            debounceTime,
            style
        } = component.props;

        component.debounce = debouncer(debounceTime);
        component.setState(() => {
            return {
                adjustedStyle: component.readjustStyle({
                    shade,
                    corner,
                    disabled,
                    busy,
                    color,
                    style
                })
            };
        });
    }
    componentWillUnMount () {
        const component = this;
        const {
            ripple
        } = component.state;

        component.debounce = null;
        component.refCache = {};
        ripple.animatedValue.removeAllListeners();
    }
    componentWillReceiveProps (nextProperty) {
        const component = this;
        const {
            shade,
            corner,
            disabled,
            busy,
            color,
            debounceTime,
            style
        } = nextProperty;

        component.debounce = debouncer(debounceTime);
        component.setState(() => {
            return {
                adjustedStyle: component.readjustStyle({
                    shade,
                    corner,
                    disabled,
                    busy,
                    color,
                    style
                })
            };
        });
    }
    renderRipple () {
        const component = this;
        const {
            adjustedStyle,
            ripple,
            width
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
                        left: width <= ripple.radius * 4 ? width / 2 - ripple.radius : ripple.locationX,
                        transform: [{
                            scale: ripple.animatedValue.interpolate({
                                inputRange: [ 0, 1 ],
                                outputRange: [ 0, ripple.scale ]
                            })
                        }],
                        opacity: ripple.animatedValue.interpolate({
                            inputRange: [ 0, 1 ],
                            outputRange: [ parseInt(Ht.Theme.button.color.raised.opacity, 16) / 255, 0 ]
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
            busy,
            rippled,
            uppercasedLabel,
            label,
            children
        } = component.props;
        const {
            adjustedStyle
        } = component.state;
        const buttonChildProperty = {
            shade,
            uppercased: uppercasedLabel,
            color: adjustedStyle.label.color
        };
        let buttonContentLeftChildren = null;
        let buttonContentCenterChildren = null;
        let buttonContentRightChildren = null;
        let buttonBadgeChildren = null;

        if (React.Children.count(children) > 0) {
            let fragments = React.Children.toArray(React.Children.map(children, (child) => {
                const {
                    room
                } = child.props;

                if (child !== null) {
                    if (Hf.isString(room) && (room === `content-left` || room === `content-center` || room === `content-right` || room === `badge`)) {
                        return React.cloneElement(child, buttonChildProperty);
                    } else {
                        Hf.log(`warn1`, `RaisedButtonComponent.render - Raised button component requires children each to have a room propperties.`);
                        return null;
                    }
                } else {
                    return null;
                }
            }));
            buttonContentLeftChildren = fragments.filter((child) => {
                if (child !== null) {
                    const {
                        room
                    } = child.props;

                    return room === `content-left`;
                } else {
                    return false;
                }
            });
            buttonContentLeftChildren = Hf.isEmpty(buttonContentLeftChildren) ? null : buttonContentLeftChildren;

            buttonContentCenterChildren = fragments.filter((child) => {
                if (child !== null) {
                    const {
                        room
                    } = child.props;

                    return room === `content-center`;
                } else {
                    return false;
                }
            });
            buttonContentCenterChildren = Hf.isEmpty(buttonContentCenterChildren) ? null : buttonContentCenterChildren;

            buttonContentRightChildren = fragments.filter((child) => {
                if (child !== null) {
                    const {
                        room
                    } = child.props;

                    return room === `content-right`;
                } else {
                    return false;
                }
            });
            buttonContentRightChildren = Hf.isEmpty(buttonContentRightChildren) ? null : buttonContentRightChildren;

            buttonBadgeChildren = fragments.filter((child) => {
                if (child !== null) {
                    const {
                        room
                    } = child.props;

                    return room === `badge`;
                } else {
                    return false;
                }
            });
            buttonBadgeChildren = Hf.isEmpty(buttonBadgeChildren) ? null : buttonBadgeChildren;
        }

        return (
            <AnimatedView
                ref = { component.assignComponentRef(`animated-view${cId}`) }
                useNativeDriver = { true }
            >
                <TouchableOpacity
                    style = { adjustedStyle.container }
                    activeOpacity = { parseInt(Ht.Theme.button.color.raised.opacity, 16) / 255 }
                    disabled = { busy || disabled }
                    onLayout = { component.onLayout }
                    onPress = { busy || disabled ? null : (event) => component.debounce(component.onPress, event) }
                >
                    {
                        rippled ? component.renderRipple() : null
                    }
                    <View style = { adjustedStyle.room.contentLeft } pointerEvents = 'box-only' >
                        {
                            buttonContentLeftChildren
                        }
                    </View>
                    <View style = { adjustedStyle.room.contentCenter } pointerEvents = 'box-only' >
                        {
                            buttonContentCenterChildren !== null ? buttonContentCenterChildren : <Text style = { adjustedStyle.label }>
                                {
                                    uppercasedLabel ? label.toUpperCase() : label
                                }
                            </Text>
                        }
                    </View>
                    <View style = { adjustedStyle.room.contentRight } pointerEvents = 'box-only' >
                        {
                            buttonContentRightChildren
                        }
                    </View>
                    {
                        busy ? <ActivityIndicator size = 'small' /> : null
                    }
                    {
                        buttonBadgeChildren !== null ? <View style = { adjustedStyle.room.badge } pointerEvents = 'box-only' >
                            {
                                buttonBadgeChildren
                            }
                        </View> : null
                    }
                </TouchableOpacity>
            </AnimatedView>
        );
    }
}
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
 * @module FlatButtonComponent
 * @description - Floating action button component.
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
    ActivityIndicator,
    Text,
    TouchableOpacity,
    View
} = ReactNative;

const DEFAULT_BUTTON_PRESS_DEBOUNCE_TIME_MS = 250;

const DEFAULT_FLAT_BUTTON_STYLE = {
    container: {
        flexDirection: `row`,
        justifyContent: `center`,
        alignItems: `center`,
        height: Ht.Theme.button.size.flat,
        borderWidth: 1,
        margin: 9,
        padding: 9,
        backgroundColor: `transparent`
    },
    room: {
        left: {
            flexDirection: `row`,
            alignItems: `center`,
            justifyContent: `center`,
            maxHeight: Ht.Theme.button.size.flat,
            backgroundColor: `transparent`
        },
        center: {
            flexDirection: `row`,
            alignItems: `center`,
            justifyContent: `center`,
            maxHeight: Ht.Theme.button.size.flat,
            backgroundColor: `transparent`
        },
        right: {
            flexDirection: `row`,
            alignItems: `center`,
            justifyContent: `center`,
            maxHeight: Ht.Theme.button.size.flat,
            backgroundColor: `transparent`
        },
        badge: {
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
    }
};

export default class FlatButtonInterface extends Component {
    static propTypes = {
        cId: PropTypes.string,
        room: PropTypes.oneOf([
            `none`,
            `left`, `right`,
            `action`,
            `action-clear`,
            `action-primary`, `action-secondary`
        ]),
        shade: PropTypes.oneOf([ `light`, `dark` ]),
        overlay: PropTypes.oneOf([ `opaque`, `translucent`, `transparent`, `transparent-outlined` ]),
        corner: PropTypes.oneOf([ `round25`, `round50`, `square` ]),
        disabled: PropTypes.bool,
        busy: PropTypes.bool,
        label: PropTypes.string,
        color: PropTypes.string,
        debounceTime: PropTypes.number,
        onPress: PropTypes.func
    }
    static defaultProps = {
        cId: ``,
        room: `none`,
        shade: Ht.Theme.view.layout.shade,
        overlay: Ht.Theme.button.flat.overlay,
        corner: Ht.Theme.button.flat.corner,
        disabled: false,
        busy: false,
        label: `BUTTON`,
        color: Ht.Theme.button.flat.color,
        debounceTime: DEFAULT_BUTTON_PRESS_DEBOUNCE_TIME_MS,
        onPress: () => null
    }
    constructor (property) {
        super(property);
        this.refCache = {};
        this.debounce = null;
        this.state = {
            adjustedStyle: DEFAULT_FLAT_BUTTON_STYLE
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
                Hf.log(`error`, `FlatButtonInterface.assignComponentRef - Input component reference name is invalid.`);
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
                    Hf.log(`error`, `FlatButtonInterface.lookupComponentRefs - Input component reference name is invalid.`);
                } else if (!refNames.every((refName) => component.refCache.hasOwnProperty(refName))) {
                    Hf.log(`error`, `FlatButtonInterface.lookupComponentRefs - Component reference is not found.`);
                }
            }

            componentRefs = Hf.collect(...refNames).from(component.refCache);
        } else {
            Hf.log(`error`, `FlatButtonInterface.lookupComponentRefs - Input component reference name array is empty.`);
        }

        return componentRefs;
    }
    readjustStyle = (newStyle = {
        shade: Ht.Theme.view.layout.shade,
        overlay: Ht.Theme.button.flat.overlay,
        corner: Ht.Theme.button.flat.corner,
        disabled: false,
        busy: false,
        color: Ht.Theme.button.flat.color
    }) => {
        const component = this;
        const {
            shade,
            overlay,
            corner,
            disabled,
            busy,
            color,
            style
        } = Hf.fallback({
            shade: Ht.Theme.view.layout.shade,
            overlay: Ht.Theme.button.flat.overlay,
            corner: Ht.Theme.button.flat.corner,
            disabled: false,
            busy: false,
            color: Ht.Theme.button.flat.color
        }).of(newStyle);
        const {
            adjustedStyle: prevAdjustedStyle
        } = component.state;
        let themedColor;
        let themedBorderColor;
        let themedLabelColor;

        if (Ht.Theme.button.color.flat.hasOwnProperty(color)) {
            themedColor = busy || disabled ? Ht.Theme.button.color.flat.disabled[shade] : Ht.Theme.button.color.flat[color][shade];
        } else {
            themedColor = busy || disabled ? Ht.Theme.button.color.flat.disabled[shade] : color;
        }

        switch (overlay) { // eslint-disable-line
        case `opaque`:
            themedLabelColor = Ht.Theme.button.color.flat.label[shade];
            themedBorderColor = `transparent`;
            break;
        case `translucent`:
            themedLabelColor = Ht.Theme.button.color.flat.label[shade];
            themedBorderColor = `transparent`;
            break;
        case `transparent`:
            themedLabelColor = themedColor;
            themedBorderColor = `transparent`;
            themedColor = `transparent`;
            break;
        case `transparent-outlined`:
            themedLabelColor = themedColor;
            themedBorderColor = themedColor;
            themedColor = `transparent`;
            break;
        }

        const adjustedStyle = Hf.merge(prevAdjustedStyle).with({
            container: {
                borderRadius: Ht.Theme.button.corner[corner],
                borderColor: themedBorderColor,
                backgroundColor: themedColor
            },
            label: {
                color: themedLabelColor
            }
        });

        return Hf.isObject(style) ? Hf.merge(adjustedStyle).with({
            container: style
        }) : adjustedStyle;
    }
    animate = (option = {
        loopCount: -1,
        duration: 300,
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
    componentWillMount () {
        const component = this;
        const {
            shade,
            overlay,
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
                    overlay,
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

        component.debounce = null;
        component.refCache = {};
    }
    componentWillReceiveProps (nextProperty) {
        const component = this;
        const {
            shade,
            overlay,
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
                    overlay,
                    corner,
                    disabled,
                    busy,
                    color,
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
            disabled,
            busy,
            label,
            children,
            onPress
        } = component.props;
        const {
            adjustedStyle
        } = component.state;
        const buttonChildProperty = {
            shade,
            color: adjustedStyle.label.color
        };
        let buttonLeftChildren = null;
        let buttonCenterChildren = null;
        let buttonRightChildren = null;
        let buttonBadgeChildren = null;

        if (React.Children.count(children) > 0) {
            let fragments = React.Children.toArray(React.Children.map(children, (child) => {
                return React.cloneElement(child, buttonChildProperty);
            }));
            buttonLeftChildren = fragments.filter((child) => {
                const {
                    room
                } = child.props;
                if (!Hf.isString(room)) {
                    return false;
                } else {
                    return room === `left`;
                }
            });
            buttonLeftChildren = Hf.isEmpty(buttonLeftChildren) ? null : buttonLeftChildren;

            buttonCenterChildren = fragments.filter((child) => {
                const {
                    room
                } = child.props;
                if (!Hf.isString(room)) {
                    Hf.log(`warn1`, `FlatButtonComponent.render - Button component requires children each to have a center room propperty.`);
                    return false;
                } else {
                    return room === `center`;
                }
            });
            buttonCenterChildren = Hf.isEmpty(buttonCenterChildren) ? null : buttonCenterChildren;

            buttonRightChildren = fragments.filter((child) => {
                const {
                    room
                } = child.props;
                if (!Hf.isString(room)) {
                    return false;
                } else {
                    return room === `right`;
                }
            });
            buttonRightChildren = Hf.isEmpty(buttonRightChildren) ? null : buttonRightChildren;

            buttonBadgeChildren = fragments.filter((child) => {
                const {
                    room
                } = child.props;
                if (!Hf.isString(room)) {
                    return false;
                } else {
                    return room === `badge`;
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
                    disabled = { busy || disabled }
                    onPress = { busy || disabled ? null : () => component.debounce(onPress) }
                >
                    <View style = { adjustedStyle.room.left }>
                        {
                            buttonLeftChildren
                        }
                    </View>
                    <View style = { adjustedStyle.room.center }>
                        {
                            buttonCenterChildren !== null ? buttonCenterChildren : <Text style = { adjustedStyle.label }>{ label }</Text>
                        }
                    </View>
                    <View style = { adjustedStyle.room.right }>
                        {
                            buttonRightChildren
                        }
                    </View>
                    {
                        busy ? <ActivityIndicator size = 'small'/> : null
                    }
                    {
                        buttonBadgeChildren !== null ? <View style = { adjustedStyle.room.badge }>
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

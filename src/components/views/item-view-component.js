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

import { BlurView } from 'react-native-blur';

import debouncer from '../../common/utils/debouncer';

const {
    Component
} = React;

const {
    View,
    TouchableOpacity,
    Dimensions
} = ReactNative;

const AnimatedView = Animatable.View;
const AnimatedBlurView = Animatable.createAnimatableComponent(BlurView);

const DEVICE_WIDTH = Dimensions.get(`window`).width;

const DEFAULT_ITEM_PRESS_DEBOUNCE_TIME_MS = 250;

const DEFAULT_ITEM_VIEW_STYLE = {
    container: {
        flexDirection: `row`,
        alignItems: `stretch`,
        alignSelf: `stretch`,
        justifyContent: `center`,
        maxWidth: DEVICE_WIDTH,
        padding: 3,
        backgroundColor: `transparent`
    },
    room: {
        media: {
            flexGrow: 1,
            flexDirection: `column`,
            alignSelf: `center`,
            alignItems: `center`,
            justifyContent: `flex-start`,
            maxWidth: (5 * DEVICE_WIDTH) / 6,
            backgroundColor: `transparent`
        },
        action: {
            flexShrink: 1,
            flexDirection: `column`,
            alignSelf: `center`,
            alignItems: `center`,
            justifyContent: `flex-end`,
            maxWidth: DEVICE_WIDTH / 6,
            backgroundColor: `transparent`
        },
        filler: {
            maxWidth: DEVICE_WIDTH / 6,
            backgroundColor: `transparent`
        }
    }
};

export default class ItemViewComponent extends Component {
    static propTypes = {
        cId: PropTypes.string,
        shade: PropTypes.oneOf([ `light`, `dark` ]),
        overlay: PropTypes.oneOf([ `opaque`, `frosted`, `translucent`, `transparent` ]),
        disabled: PropTypes.bool,
        debounceTime: PropTypes.number,
        onPress: PropTypes.func
    }
    static defaultProps = {
        cId: ``,
        room: `none`,
        shade: Ht.Theme.view.item.shade,
        overlay: Ht.Theme.view.item.overlay,
        disabled: false,
        debounceTime: DEFAULT_ITEM_PRESS_DEBOUNCE_TIME_MS,
        onPress: () => null
    }
    constructor (property) {
        super(property);
        this.refCache = {};
        this.debounce = null;
        this.state = {
            adjustedStyle: DEFAULT_ITEM_VIEW_STYLE
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
        const adjustedStyle = Hf.merge(prevAdjustedStyle).with({
            container: {
                backgroundColor: (() => {
                    switch (overlay) { // eslint-disable-line
                    case `opaque`:
                        return Ht.Theme.view.color.item[shade];
                    case `translucent`:
                        return `${Ht.Theme.view.color.item[shade]}${Ht.Theme.view.color.item.opacity}`;
                    case `frosted`:
                        return `transparent`;
                    case `transparent`:
                        return `transparent`;
                    }
                })()
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
    render () {
        const component = this;
        const {
            cId,
            shade,
            overlay,
            disabled,
            onPress,
            children
        } = component.props;
        const {
            adjustedStyle
        } = component.state;
        let frosted = overlay === `frosted`;
        let itemMediaChildren = null;
        let itemActionChildren = null;

        if (React.Children.count(children) > 0) {
            let fragments = React.Children.toArray(React.Children.map(children, (child) => {
                const {
                    room
                } = child.props;
                if (Hf.isString(room) && room === `action`) {
                    return React.cloneElement(child, {
                        disabled,
                        onPress: () => component.debounce(component.onClearInput)
                    });
                } else {
                    return React.cloneElement(child);
                }
            }));

            itemMediaChildren = fragments.filter((child) => {
                const {
                    room
                } = child.props;
                if (!Hf.isString(room)) {
                    Hf.log(`warn1`, `ItemViewComponent.render - Item view component requires children each to have a room propperty.`);
                    return false;
                } else {
                    return room === `media`;
                }
            });
            itemMediaChildren = Hf.isEmpty(itemMediaChildren) ? null : itemMediaChildren;

            itemActionChildren = fragments.filter((child) => {
                const {
                    room
                } = child.props;
                if (!Hf.isString(room)) {
                    Hf.log(`warn1`, `ItemViewComponent.render - Item view component requires children each to have a room propperty.`);
                    return false;
                } else {
                    return room === `action`;
                }
            });
            itemActionChildren = Hf.isEmpty(itemActionChildren) ? null : itemActionChildren;
        }

        if (frosted) {
            return (
                <AnimatedBlurView
                    ref = { component.assignComponentRef(`animated-view${cId}`) }
                    blurType = { shade }
                    blurAmount = { Ht.Theme.general.frostLevel }
                    useNativeDriver = { true }
                >
                    <TouchableOpacity
                        style = { adjustedStyle.container }
                        onPress = { disabled ? null : () => component.debounce(onPress) }
                    >
                        <AnimatedView
                            ref = { component.assignComponentRef(`animated-media-view${cId}`) }
                            style = { adjustedStyle.room.media }
                            useNativeDriver = { true }
                        >
                            {
                                itemMediaChildren !== null ? itemMediaChildren : <View style = { adjustedStyle.room.filler }/>
                            }
                        </AnimatedView>
                        <AnimatedView
                            ref = { component.assignComponentRef(`animated-action-view${cId}`) }
                            style = { adjustedStyle.room.action }
                            useNativeDriver = { true }
                        >
                            {
                                itemActionChildren !== null ? itemActionChildren : <View style = { adjustedStyle.room.filler }/>
                            }
                        </AnimatedView>
                    </TouchableOpacity>
                </AnimatedBlurView>
            );
        } else {
            return (
                <AnimatedView
                    ref = { component.assignComponentRef(`animated-view${cId}`) }
                    useNativeDriver = { true }
                >
                    <TouchableOpacity
                        style = { adjustedStyle.container }
                        onPress = { disabled ? null : () => component.debounce(onPress) }
                    >
                        <AnimatedView
                            ref = { component.assignComponentRef(`animated-media-view${cId}`) }
                            style = { adjustedStyle.room.media }
                            useNativeDriver = { true }
                        >
                            {
                                itemMediaChildren !== null ? itemMediaChildren : <View style = { adjustedStyle.room.filler }/>
                            }
                        </AnimatedView>
                        <AnimatedView
                            ref = { component.assignComponentRef(`animated-action-view${cId}`) }
                            style = { adjustedStyle.room.action }
                            useNativeDriver = { true }
                        >
                            {
                                itemActionChildren !== null ? itemActionChildren : <View style = { adjustedStyle.room.filler }/>
                            }
                        </AnimatedView>
                    </TouchableOpacity>
                </AnimatedView>
            );
        }
    }
}

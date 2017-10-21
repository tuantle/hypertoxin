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
 * @module HeaderViewComponent
 * @description - Header view ios component.
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

import { BlurView } from 'react-native-blur';

const {
    Component
} = React;

const {
    Dimensions,
    StatusBar,
    Text,
    View
} = ReactNative;

const DEVICE_WIDTH = Dimensions.get(`window`).width;

const DEFAULT_HEADER_VIEW_STYLE = {
    container: {
        flexDirection: `column`,
        alignItems: `stretch`,
        justifyContent: `center`,
        width: DEVICE_WIDTH,
        backgroundColor: `transparent`,
        overflow: `hidden`
    },
    status: {
        ...Ht.Theme.general.dropShadow.deep,
        position: `absolute`,
        zIndex: 12,
        elevation: 4,
        width: DEVICE_WIDTH,
        height: Ht.Theme.view.size.header.status,
        top: 0,
        left: 0
    },
    navigation: {
        ...Ht.Theme.general.dropShadow.deep,
        flexDirection: `row`,
        alignItems: `stretch`,
        justifyContent: `space-between`,
        width: DEVICE_WIDTH,
        height: Ht.Theme.view.size.header.normal,
        zIndex: 10,
        elevation: 2,
        marginTop: Ht.Theme.view.size.header.status,
        marginBottom: 6
    },
    room: {
        left: {
            flexDirection: `row`,
            alignItems: `center`,
            justifyContent: `flex-start`,
            maxWidth: DEVICE_WIDTH / 6,
            maxHeight: Ht.Theme.view.size.header.normal,
            backgroundColor: `transparent`
        },
        center: {
            flexDirection: `column`,
            alignItems: `center`,
            justifyContent: `center`,
            maxWidth: DEVICE_WIDTH,
            maxHeight: Ht.Theme.view.size.header.normal,
            backgroundColor: `transparent`
        },
        right: {
            flexDirection: `row`,
            alignItems: `center`,
            justifyContent: `flex-start`,
            maxWidth: DEVICE_WIDTH / 6,
            maxHeight: Ht.Theme.view.size.header.normal,
            backgroundColor: `transparent`
        },
        filler: {
            width: DEVICE_WIDTH / 7,
            height: Ht.Theme.view.size.header.normal,
            backgroundColor: `transparent`
        }
    },
    label: {
        ...Ht.Theme.view.font.header.label
    }
};

export default class HeaderViewComponent extends Component {
    static propTypes = {
        cId: PropTypes.string,
        shade: PropTypes.oneOf([ `light`, `dark` ]),
        overlay: PropTypes.oneOf([ `opaque`, `frosted`, `translucent`, `transparent` ]),
        oversized: PropTypes.bool,
        dropShadowed: PropTypes.bool,
        label: PropTypes.string,
        onMinimized: PropTypes.func,
        onMaximized: PropTypes.func
    }
    static defaultProps = {
        cId: ``,
        shade: Ht.Theme.view.header.shade,
        overlay: Ht.Theme.view.header.overlay,
        oversized: Ht.Theme.view.header.oversized,
        dropShadowed: Ht.Theme.view.header.dropShadowed,
        label: `Header`,
        onMinimized: () => null,
        onMaximized: () => null
    }
    constructor (property) {
        super(property);
        this.refCache = {};
        this.state = {
            minimized: false,
            adjustedStyle: DEFAULT_HEADER_VIEW_STYLE
        };
    }
    isMinimized = () => {
        const component = this;
        const {
            minimized
        } = component.state;

        return minimized;
    }
    minimize = (minimized = false) => {
        const component = this;

        minimized = Hf.isBoolean(minimized) ? minimized : false;

        component.setState(() => {
            return {
                minimized
            };
        });
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
                Hf.log(`error`, `HeaderViewComponent.assignComponentRef - Input component reference name is invalid.`);
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
                    Hf.log(`error`, `HeaderViewComponent.lookupComponentRefs - Input component reference name is invalid.`);
                } else if (!refNames.every((refName) => component.refCache.hasOwnProperty(refName))) {
                    Hf.log(`error`, `HeaderViewComponent.lookupComponentRefs - Component reference is not found.`);
                }
            }

            componentRefs = Hf.collect(...refNames).from(component.refCache);
        } else {
            Hf.log(`error`, `HeaderViewComponent.lookupComponentRefs - Input component reference name array is empty.`);
        }

        return componentRefs;
    }
    readjustStyle = (newStyle = {
        shade: Ht.Theme.view.header.shade,
        overlay: Ht.Theme.view.header.overlay,
        oversized: Ht.Theme.view.header.oversized,
        dropShadowed: Ht.Theme.view.header.dropShadowed
    }) => {
        const component = this;
        const {
            shade,
            overlay,
            oversized,
            dropShadowed,
            style
        } = Hf.fallback({
            shade: Ht.Theme.view.header.shade,
            overlay: Ht.Theme.view.header.overlay,
            oversized: Ht.Theme.view.header.oversized,
            dropShadowed: Ht.Theme.view.header.dropShadowed
        }).of(newStyle);
        const {
            adjustedStyle: prevAdjustedStyle
        } = component.state;
        let themedStatusColor;
        let themedNavigationColor;
        let themedLabelColor;

        switch (overlay) { // eslint-disable-line
        case `opaque`:
            themedStatusColor = Ht.Theme.view.color.header.status[shade];
            themedNavigationColor = Ht.Theme.view.color.header.navigation[shade];
            break;
        case `translucent`:
            themedStatusColor = `${Ht.Theme.view.color.header.status[shade]}${Ht.Theme.view.color.header.opacity}`;
            themedNavigationColor = `${Ht.Theme.view.color.header.navigation[shade]}${Ht.Theme.view.color.header.opacity}`;
            break;
        case `frosted`:
            themedStatusColor = `transparent`;
            themedNavigationColor = `transparent`;
            break;
        case `transparent`:
            themedStatusColor = `transparent`;
            themedNavigationColor = `transparent`;
            break;
        }

        themedLabelColor = Ht.Theme.view.color.header.label[shade === `dark` ? `light` : `dark`];

        const adjustedStyle = Hf.merge(prevAdjustedStyle).with({
            navigation: {
                height: oversized ? Ht.Theme.view.size.header.oversize : Ht.Theme.view.size.header.normal,
                shadowOpacity: dropShadowed ? Ht.Theme.general.dropShadow.deep.shadowOpacity : 0,
                backgroundColor: themedNavigationColor
            },
            room: {
                center: {
                    alignSelf: oversized ? `flex-start` : `center`
                }
            },
            status: {
                shadowOpacity: 0,
                backgroundColor: themedStatusColor
            },
            label: {
                color: themedLabelColor
            }
        });

        return Hf.isObject(style) ? Hf.merge(adjustedStyle).with({
            container: style
        }) : adjustedStyle;
    }
    animate = (refName, option = {
        loopCount: -1,
        duration: 300,
        delay: 0,
        easing: `ease`
    }) => {
        const component = this;
        const {
            cId
        } = component.props;
        const {
            minimized
        } = component.state;

        if (!minimized) {
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
            oversized,
            dropShadowed,
            style
        } = component.props;

        component.setState(() => {
            return {
                adjustedStyle: component.readjustStyle({
                    shade,
                    overlay,
                    oversized,
                    dropShadowed,
                    style
                })
            };
        });
    }
    componentWillUnMount () {
        const component = this;

        component.refCache = {};
    }
    componentWillReceiveProps (nextProperty) {
        const component = this;
        const {
            shade,
            overlay,
            oversized,
            dropShadowed,
            style
        } = nextProperty;

        component.setState(() => {
            return {
                adjustedStyle: component.readjustStyle({
                    shade,
                    overlay,
                    oversized,
                    dropShadowed,
                    style
                })
            };
        });
    }
    componentDidUpdate () {
        const component = this;
        const {
            cId,
            oversized
        } = component.props;
        const {
            minimized
        } = component.state;
        const [
            animatedStatusView,
            animatedNavigationView
        ] = component.lookupComponentRefs(
            `animated-status-view${cId}`,
            `animated-navigation-view${cId}`
        );

        if (minimized) {
            animatedStatusView.transitionTo({
                shadowOpacity: Ht.Theme.general.dropShadow.deep.shadowOpacity
            }, 300, `ease-in`);
            animatedNavigationView.transitionTo({
                opacity: 0,
                height: 0,
                translateY: oversized ? -Ht.Theme.view.size.header.oversize : -Ht.Theme.view.size.header.normal
            }, 300, `ease-out-cubic`);
        } else {
            animatedStatusView.transitionTo({
                shadowOpacity: 0
            }, 300, `ease-out`);
            animatedNavigationView.transitionTo({
                opacity: 1,
                height: oversized ? Ht.Theme.view.size.header.oversize : Ht.Theme.view.size.header.normal,
                translateY: 0
            }, 300, `ease-in-cubic`);
        }
    }
    render () {
        const component = this;
        const {
            cId,
            shade,
            overlay,
            label,
            children,
            onMinimized,
            onMaximized
        } = component.props;
        const {
            minimized,
            adjustedStyle
        } = component.state;
        const frosted = overlay === `frosted`;
        const headerChildProperty = {
            shade,
            color: adjustedStyle.label.color
        };
        let headerLeftChildren = null;
        let headerCenterChildren = null;
        let headerRightChildren = null;

        if (React.Children.count(children) > 0) {
            let fragments = React.Children.toArray(React.Children.map(children, (child) => {
                return React.cloneElement(child, headerChildProperty);
            }));

            headerLeftChildren = fragments.filter((child) => {
                const {
                    room
                } = child.props;
                if (!Hf.isString(room)) {
                    return false;
                } else {
                    return room === `left`;
                }
            });
            headerLeftChildren = Hf.isEmpty(headerLeftChildren) ? null : headerLeftChildren;

            headerCenterChildren = fragments.filter((child) => {
                const {
                    room
                } = child.props;
                if (!Hf.isString(room)) {
                    Hf.log(`warn1`, `HeaderViewComponent.render - Header view component requires children each to have a center room propperty.`);
                    return false;
                } else {
                    return room === `center`;
                }
            });
            headerCenterChildren = Hf.isEmpty(headerCenterChildren) ? null : headerCenterChildren;

            headerRightChildren = fragments.filter((child) => {
                const {
                    room
                } = child.props;
                if (!Hf.isString(room)) {
                    return false;
                } else {
                    return room === `right`;
                }
            });
            headerRightChildren = Hf.isEmpty(headerRightChildren) ? null : headerRightChildren;
        }

        if (frosted) {
            return (
                <BlurView
                    style = { adjustedStyle.container }
                    blurType = { shade }
                    blurAmount = { Ht.Theme.general.frostLevel }
                >
                    <AnimatedView
                        ref = { component.assignComponentRef(`animated-status-view${cId}`) }
                        style = { adjustedStyle.status }
                        duration = { 300 }
                        useNativeDriver = { false }
                    >
                        <StatusBar
                            barStyle = { shade === `dark` ? `light-content` : `dark-content` }
                            networkActivityIndicatorVisible = { false }
                        />
                    </AnimatedView>
                    <AnimatedView
                        ref = { component.assignComponentRef(`animated-navigation-view${cId}`) }
                        style = { adjustedStyle.navigation }
                        duration = { 300 }
                        useNativeDriver = { false }
                        onAnimationEnd = {() => minimized ? onMinimized() : onMaximized()}
                    >
                        <AnimatedView
                            ref = { component.assignComponentRef(`animated-navigation-left-view${cId}`) }
                            style = { adjustedStyle.room.left }
                        >
                            {
                                headerLeftChildren !== null ? headerLeftChildren : <View style = { adjustedStyle.room.filler }/>
                            }
                        </AnimatedView>
                        <AnimatedView
                            ref = { component.assignComponentRef(`animated-navigation-center-view${cId}`) }
                            style = { adjustedStyle.room.center }
                        >
                            {
                                headerCenterChildren !== null ? headerCenterChildren : <Text style = { adjustedStyle.label }>{ label }</Text>
                            }
                        </AnimatedView>
                        <AnimatedView
                            ref = { component.assignComponentRef(`animated-navigation-right-view${cId}`) }
                            style = { adjustedStyle.room.right }
                        >
                            {
                                headerRightChildren !== null ? headerRightChildren : <View style = { adjustedStyle.room.filler }/>
                            }
                        </AnimatedView>
                    </AnimatedView>
                </BlurView>
            );
        } else {
            return (
                <View style = { adjustedStyle.container }>
                    <AnimatedView
                        ref = { component.assignComponentRef(`animated-status-view${cId}`) }
                        style = { adjustedStyle.status }
                        duration = { 300 }
                        useNativeDriver = { false }
                    >
                        <StatusBar
                            barStyle = { shade === `dark` ? `light-content` : `dark-content` }
                            networkActivityIndicatorVisible = { false }
                        />
                    </AnimatedView>
                    <AnimatedView
                        ref = { component.assignComponentRef(`animated-navigation-view${cId}`) }
                        style = { adjustedStyle.navigation }
                        duration = { 300 }
                        useNativeDriver = { false }
                        onAnimationEnd = {() => minimized ? onMinimized() : onMaximized()}
                    >
                        <AnimatedView
                            ref = { component.assignComponentRef(`animated-navigation-left-view${cId}`) }
                            style = { adjustedStyle.room.left }
                        >
                            {
                                headerLeftChildren !== null ? headerLeftChildren : <View style = { adjustedStyle.room.filler }/>
                            }
                        </AnimatedView>
                        <AnimatedView
                            ref = { component.assignComponentRef(`animated-navigation-center-view${cId}`) }
                            style = { adjustedStyle.room.center }
                        >
                            {
                                headerCenterChildren !== null ? headerCenterChildren : <Text style = { adjustedStyle.label }>{ label }</Text>
                            }
                        </AnimatedView>
                        <AnimatedView
                            ref = { component.assignComponentRef(`animated-navigation-right-view${cId}`) }
                            style = { adjustedStyle.room.right }
                        >
                            {
                                headerRightChildren !== null ? headerRightChildren : <View style = { adjustedStyle.room.filler }/>
                            }
                        </AnimatedView>
                    </AnimatedView>
                </View>
            );
        }
    }
}

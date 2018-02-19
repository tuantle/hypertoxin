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

const DEFAULT_ANIMATION_DURATION_MS = 300;

const DEFAULT_HEADER_VIEW_STYLE = {
    container: {
        flexDirection: `column`,
        alignItems: `stretch`,
        justifyContent: `center`,
        width: DEVICE_WIDTH,
        // width: `100%`,
        backgroundColor: `transparent`
    },
    status: {
        ...Ht.Theme.general.dropShadow.shallow,
        position: `absolute`,
        top: 0,
        left: 0,
        width: DEVICE_WIDTH,
        // width: `100%`,
        height: Ht.Theme.view.size.header.status
    },
    navigation: {
        ...Ht.Theme.general.dropShadow.shallow,
        flexDirection: `row`,
        alignItems: `stretch`,
        justifyContent: `space-between`,
        width: DEVICE_WIDTH,
        height: Ht.Theme.view.size.header.normal,
        marginTop: Ht.Theme.view.size.header.status
    },
    room: {
        actionLeft: {
            flexDirection: `row`,
            alignItems: `center`,
            justifyContent: `flex-start`,
            backgroundColor: `transparent`
        },
        contentCenter: {
            flexGrow: 1,
            flexDirection: `row`,
            alignItems: `center`,
            backgroundColor: `transparent`
        },
        actionRight: {
            flexDirection: `row`,
            alignItems: `center`,
            justifyContent: `center`,
            backgroundColor: `transparent`
        },
        filler: {
            width: 0,
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
        offcenteredLabel: PropTypes.bool,
        uppercasedLabel: PropTypes.bool,
        initiallyCollapsed: PropTypes.bool,
        label: PropTypes.string,
        onCollapse: PropTypes.func,
        onExpand: PropTypes.func
    }
    static defaultProps = {
        cId: ``,
        shade: Ht.Theme.view.header.shade,
        overlay: Ht.Theme.view.header.overlay,
        oversized: Ht.Theme.view.header.oversized,
        dropShadowed: Ht.Theme.view.header.dropShadowed,
        offcenteredLabel: Ht.Theme.view.header.offcenteredLabel,
        uppercasedLabel: Ht.Theme.view.header.uppercasedLabel,
        initiallyCollapsed: false,
        label: `Header`,
        onCollapse: () => null,
        onExpand: () => null
    }
    constructor (property) {
        super(property);
        this.refCache = {};
        this.state = {
            collapsed: property.initiallyCollapsed,
            adjustedStyle: DEFAULT_HEADER_VIEW_STYLE,
            filler: {
                width: 0
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
        shade: Ht.Theme.view.header.shade,
        overlay: Ht.Theme.view.header.overlay,
        oversized: Ht.Theme.view.header.oversized,
        dropShadowed: Ht.Theme.view.header.dropShadowed,
        offcenteredLabel: Ht.Theme.view.header.offcenteredLabel,
        collapsed: false
    }) => {
        const component = this;
        const {
            shade,
            overlay,
            oversized,
            dropShadowed,
            offcenteredLabel,
            collapsed,
            style
        } = Hf.fallback({
            shade: Ht.Theme.view.header.shade,
            overlay: Ht.Theme.view.header.overlay,
            oversized: Ht.Theme.view.header.oversized,
            dropShadowed: Ht.Theme.view.header.dropShadowed,
            offcenteredLabel: Ht.Theme.view.header.offcenteredLabel,
            collapsed: false
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
            navigation: collapsed ? {
                opacity: 0,
                height: 0,
                shadowOpacity: 0,
                backgroundColor: themedNavigationColor
            } : {
                height: oversized ? Ht.Theme.view.size.header.oversize : Ht.Theme.view.size.header.normal,
                shadowOpacity: dropShadowed ? Ht.Theme.general.dropShadow.shallow.shadowOpacity : 0,
                backgroundColor: themedNavigationColor
            },
            room: {
                contentCenter: {
                    justifyContent: offcenteredLabel ? `flex-start` : `center`
                }
            },
            status: collapsed ? {
                shadowOpacity: Ht.Theme.general.dropShadow.shallow.shadowOpacity,
                backgroundColor: themedStatusColor
            } : {
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
    animate = (refName, option = {
        loopCount: -1,
        duration: DEFAULT_ANIMATION_DURATION_MS,
        delay: 0,
        easing: `ease`
    }) => {
        const component = this;
        const {
            cId
        } = component.props;
        const {
            collapsed
        } = component.state;

        if (!collapsed) {
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
    isCollapsed = () => {
        const component = this;
        const {
            collapsed
        } = component.state;

        return collapsed;
    }
    collapse = (option = {
        duration: DEFAULT_ANIMATION_DURATION_MS,
        easing: `ease-out-cubic`
    }) => {
        const component = this;
        const {
            duration,
            easing
        } = Hf.fallback({
            duration: DEFAULT_ANIMATION_DURATION_MS,
            easing: `ease-out-cubic`
        }).of(option);
        const {
            cId,
            onCollapse
        } = component.props;
        const {
            collapsed
        } = component.state;
        const [
            animatedStatusView,
            animatedNavigationView
        ] = component.lookupComponentRefs(
            `animated-status-view${cId}`,
            `animated-navigation-view${cId}`
        );

        if (!collapsed) {
            animatedStatusView.transitionTo({
                shadowOpacity: Ht.Theme.general.dropShadow.shallow.shadowOpacity
            }, duration, `ease-in`);
            animatedNavigationView.transitionTo({
                opacity: 0,
                height: 0
            }, duration, easing);
            component.setState(() => {
                return {
                    collapsed: true
                };
            }, () => {
                onCollapse();
            });
        }
    }
    expand = (option = {
        duration: DEFAULT_ANIMATION_DURATION_MS,
        easing: `ease-in-cubic`
    }) => {
        const component = this;
        const {
            duration,
            easing
        } = Hf.fallback({
            duration: DEFAULT_ANIMATION_DURATION_MS,
            easing: `ease-in-cubic`
        }).of(option);
        const {
            cId,
            oversized,
            onExpand
        } = component.props;
        const {
            collapsed
        } = component.state;
        const [
            animatedStatusView,
            animatedNavigationView
        ] = component.lookupComponentRefs(
            `animated-status-view${cId}`,
            `animated-navigation-view${cId}`
        );

        if (collapsed) {
            animatedStatusView.transitionTo({
                shadowOpacity: 0
            }, duration, `ease-out`);
            animatedNavigationView.transitionTo({
                opacity: 1,
                height: oversized ? Ht.Theme.view.size.header.oversize : Ht.Theme.view.size.header.normal
            }, duration, easing);
            component.setState(() => {
                return {
                    collapsed: false
                };
            }, () => {
                onExpand();
            });
        }
    }
    onLayout = (event) => {
        const component = this;
        const {
            filler
        } = component.state;
        const {
            width
        } = event.nativeEvent.layout;

        if (filler.width === 0) {
            component.setState(() => {
                return {
                    filler: {
                        width
                    }
                };
            });
        }
    }
    componentWillMount () {
        const component = this;
        const {
            shade,
            overlay,
            oversized,
            dropShadowed,
            offcenteredLabel,
            initiallyCollapsed,
            style
        } = component.props;

        component.setState(() => {
            return {
                collapsed: initiallyCollapsed,
                adjustedStyle: component._readjustStyle({
                    shade,
                    overlay,
                    oversized,
                    dropShadowed,
                    offcenteredLabel,
                    collapsed: initiallyCollapsed,
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
            offcenteredLabel,
            style
        } = nextProperty;
        const {
            collapsed
        } = component.state;

        component.setState(() => {
            return {
                adjustedStyle: component._readjustStyle({
                    shade,
                    overlay,
                    oversized,
                    dropShadowed,
                    offcenteredLabel,
                    collapsed,
                    style
                })
            };
        }, () => {
            if (collapsed) {
                component.collapse();
            } else {
                component.expand();
            }
        });
    }
    render () {
        const component = this;
        const {
            cId,
            shade,
            overlay,
            uppercasedLabel,
            label,
            children
        } = component.props;
        const {
            adjustedStyle,
            filler
        } = component.state;
        const frosted = overlay === `frosted`;
        const headerViewActionChildProperty = {
            shade,
            color: adjustedStyle.label.color
        };
        const headerViewContentChildProperty = {
            shade,
            uppercased: uppercasedLabel,
            color: adjustedStyle.label.color
        };
        let headerViewActionLeftChildren = null;
        let headerViewContentCenterChildren = null;
        let headerViewActionRightChildren = null;

        if (React.Children.count(children) > 0) {
            let fragments = React.Children.toArray(React.Children.map(children, (child) => {
                const {
                    room
                } = child.props;

                if (child !== null) {
                    if (Hf.isString(room) && (room === `action-left` || room === `action-right`)) {
                        return React.cloneElement(child, headerViewActionChildProperty);
                    } else if (Hf.isString(room) && room === `content-center`) {
                        return React.cloneElement(child, headerViewContentChildProperty);
                    } else {
                        Hf.log(`warn1`, `HeaderViewComponent.render - Header view component requires children each to have a center room propperty.`);
                        return null;
                    }
                } else {
                    return null;
                }
            }));

            headerViewActionLeftChildren = fragments.filter((child) => {
                if (child !== null) {
                    const {
                        room
                    } = child.props;

                    return room === `action-left`;
                } else {
                    return false;
                }
            });
            headerViewActionLeftChildren = Hf.isEmpty(headerViewActionLeftChildren) ? null : headerViewActionLeftChildren;

            headerViewContentCenterChildren = fragments.filter((child) => {
                if (child !== null) {
                    const {
                        room
                    } = child.props;

                    return room === `content-center`;
                } else {
                    return false;
                }
            });
            headerViewContentCenterChildren = Hf.isEmpty(headerViewContentCenterChildren) ? null : headerViewContentCenterChildren;

            headerViewActionRightChildren = fragments.filter((child) => {
                if (child !== null) {
                    const {
                        room
                    } = child.props;

                    return room === `action-right`;
                } else {
                    return false;
                }
            });
            headerViewActionRightChildren = Hf.isEmpty(headerViewActionRightChildren) ? null : headerViewActionRightChildren;
        }

        if (frosted) {
            return (
                <BlurView
                    style = { adjustedStyle.container }
                    blurType = { shade }
                    blurAmount = { Ht.Theme.general.frostLevel }
                >
                    <AnimatedView
                        ref = { component.assignComponentRef(`animated-navigation-view${cId}`) }
                        style = { adjustedStyle.navigation }
                        duration = { DEFAULT_ANIMATION_DURATION_MS }
                        useNativeDriver = { false }
                    >
                        <AnimatedView
                            ref = { component.assignComponentRef(`animated-navigation-action-left-view${cId}`) }
                            onLayout = { component.onLayout }
                            style = { adjustedStyle.room.actionLeft }
                        >
                            {
                                headerViewActionLeftChildren !== null ? headerViewActionLeftChildren : <View style = {{
                                    ...adjustedStyle.room.filler,
                                    width: filler.width
                                }}/>
                            }
                        </AnimatedView>
                        <AnimatedView
                            ref = { component.assignComponentRef(`animated-navigation-content-center-view${cId}`) }
                            style = { adjustedStyle.room.contentCenter }
                        >
                            {
                                headerViewContentCenterChildren !== null ? headerViewContentCenterChildren : <Text style = { adjustedStyle.label }>
                                    {
                                        uppercasedLabel ? label.toUpperCase() : label
                                    }
                                </Text>
                            }
                        </AnimatedView>
                        <AnimatedView
                            ref = { component.assignComponentRef(`animated-navigation-action-right-view${cId}`) }
                            onLayout = { component.onLayout }
                            style = { adjustedStyle.room.actionRight }
                        >
                            {
                                headerViewActionRightChildren !== null ? headerViewActionRightChildren : <View style = {{
                                    ...adjustedStyle.room.filler,
                                    width: filler.width
                                }}/>
                            }
                        </AnimatedView>
                    </AnimatedView>
                    <AnimatedView
                        ref = { component.assignComponentRef(`animated-status-view${cId}`) }
                        style = { adjustedStyle.status }
                        duration = { DEFAULT_ANIMATION_DURATION_MS }
                        useNativeDriver = { false }
                    >
                        <StatusBar
                            barStyle = { `${shade}-content` }
                            networkActivityIndicatorVisible = { false }
                        />
                    </AnimatedView>
                </BlurView>
            );
        } else {
            return (
                <View style = { adjustedStyle.container }>
                    <AnimatedView
                        ref = { component.assignComponentRef(`animated-navigation-view${cId}`) }
                        style = { adjustedStyle.navigation }
                        duration = { DEFAULT_ANIMATION_DURATION_MS }
                        useNativeDriver = { false }
                    >
                        <AnimatedView
                            ref = { component.assignComponentRef(`animated-navigation-action-left-view${cId}`) }
                            onLayout = { component.onLayout }
                            style = { adjustedStyle.room.actionLeft }
                        >
                            {
                                headerViewActionLeftChildren !== null ? headerViewActionLeftChildren : <View style = {{
                                    ...adjustedStyle.room.filler,
                                    width: filler.width
                                }}/>
                            }
                        </AnimatedView>
                        <AnimatedView
                            ref = { component.assignComponentRef(`animated-navigation-content-center-view${cId}`) }
                            style = { adjustedStyle.room.contentCenter }
                        >
                            {
                                headerViewContentCenterChildren !== null ? headerViewContentCenterChildren : <Text style = { adjustedStyle.label }>
                                    {
                                        uppercasedLabel ? label.toUpperCase() : label
                                    }
                                </Text>
                            }
                        </AnimatedView>
                        <AnimatedView
                            ref = { component.assignComponentRef(`animated-navigation-action-right-view${cId}`) }
                            onLayout = { component.onLayout }
                            style = { adjustedStyle.room.actionRight }
                        >
                            {
                                headerViewActionRightChildren !== null ? headerViewActionRightChildren : <View style = {{
                                    ...adjustedStyle.room.filler,
                                    width: filler.width
                                }}/>
                            }
                        </AnimatedView>
                    </AnimatedView>
                    <AnimatedView
                        ref = { component.assignComponentRef(`animated-status-view${cId}`) }
                        style = { adjustedStyle.status }
                        duration = { DEFAULT_ANIMATION_DURATION_MS }
                        useNativeDriver = { false }
                    >
                        <StatusBar
                            barStyle = { `${shade}-content` }
                            networkActivityIndicatorVisible = { false }
                        />
                    </AnimatedView>
                </View>
            );
        }
    }
}

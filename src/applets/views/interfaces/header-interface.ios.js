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
 * @module HeaderViewInterface
 * @description - Header view interface.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 *------------------------------------------------------------------------
 */
'use strict'; // eslint-disable-line

import { Hf } from 'hyperflow';

import React from 'react';

import ReactNative, { Dimensions } from 'react-native';

import createFragment from 'react-addons-create-fragment';

import { View as AnimatedView } from 'react-native-animatable';

import { BlurView } from 'react-native-blur';

import theme from '../../../styles/theme';

import fontStyleTemplate from '../../../styles/templates/font-style-template';

import dropShadowStyleTemplate from '../../../styles/templates/drop-shadow-style-template';

import EVENT from '../events/header-event';

const {
    Text,
    View
} = ReactNative;

const DEVICE_WIDTH = Dimensions.get(`window`).width;

const STATUS_WIDTH = DEVICE_WIDTH;
const STATUS_HEIGHT = 25;
const NAVIGATION_WIDTH = DEVICE_WIDTH;
const NAVIGATION_HEIGHT = 56;
const NAVIGATION_OVERSIZE_HEIGHT = 148;
const NAVIGATION_CHILD_MIN_WIDTH = 46;
const NAVIGATION_CHILD_MIN_HEIGHT = 46;

const DEFAULT_HEADER_VIEW_STYLE = {
    container: {
        flexDirection: `column`,
        alignItems: `stretch`,
        justifyContent: `flex-start`,
        width: DEVICE_WIDTH,
        backgroundColor: `transparent`,
        overflow: `hidden`
    },
    status: {
        position: `absolute`,
        zIndex: 10,
        elevation: 2,
        width: STATUS_WIDTH,
        height: STATUS_HEIGHT,
        top: 0,
        left: 0
    },
    navigation: {
        flexDirection: `row`,
        alignItems: `center`,
        justifyContent: `space-between`,
        width: NAVIGATION_WIDTH,
        height: NAVIGATION_HEIGHT,
        marginTop: STATUS_HEIGHT,
        marginBottom: 6
    },
    room: {
        left: {
            flexDirection: `row`,
            alignItems: `center`,
            justifyContent: `center`,
            minWidth: NAVIGATION_CHILD_MIN_WIDTH,
            minHeight: NAVIGATION_CHILD_MIN_HEIGHT,
            backgroundColor: `transparent`
        },
        center: {
            flexDirection: `column`,
            alignSelf: `center`,
            alignItems: `flex-start`,
            justifyContent: `center`,
            maxWidth: NAVIGATION_WIDTH - (NAVIGATION_CHILD_MIN_WIDTH * 2),
            minHeight: NAVIGATION_CHILD_MIN_HEIGHT,
            backgroundColor: `transparent`
        },
        right: {
            flexDirection: `row`,
            alignItems: `center`,
            justifyContent: `center`,
            minWidth: NAVIGATION_CHILD_MIN_WIDTH,
            minHeight: NAVIGATION_CHILD_MIN_HEIGHT,
            backgroundColor: `transparent`
        },
        filler: {
            minWidth: NAVIGATION_CHILD_MIN_WIDTH,
            minHeight: NAVIGATION_CHILD_MIN_HEIGHT,
            backgroundColor: `transparent`
        }
    },
    label: {
        ...fontStyleTemplate.boldLarge,
        backgroundColor: `transparent`
    }
};

const HeaderViewInterface = Hf.Interface.augment({
    composites: [
        Hf.React.ComponentComposite
    ],
    state: {
        shade: {
            value: `light`,
            oneOf: [ `light`, `dark` ],
            stronglyTyped: true
        },
        overlay: {
            value: `opaque`,
            oneOf: [ `opaque`, `transparent`, `translucent-clear`, `translucent-frosted` ],
            stronglyTyped: true
        },
        oversize: {
            value: false,
            stronglyTyped: true
        },
        minimizedInitially: {
            value: false,
            stronglyTyped: true
        },
        dropShadow: {
            value: false,
            stronglyTyped: true
        },
        label: {
            value: ``,
            stronglyTyped: true
        },
        onMinimized: {
            value: () => {},
            stronglyTyped: true
        },
        onMaximized: {
            value: () => {},
            stronglyTyped: true
        }
    },
    setup: function setup (done) {
        const intf = this;

        intf.preMountStage((component) => {
            const {
                minimizedInitially
            } = component.props;

            if (minimizedInitially) {
                intf.outgoing(EVENT.ON.UPDATE_MINIMIZATION).emit(() => true);
            }
        });
        intf.postUpdateStage((component) => {
            const {
                minimized
            } = component.state;
            const [
                animatedNavigationView
            ] = component.lookupComponentRefs(
                `animatedNavigationView`,
            );

            if (minimized) {
                animatedNavigationView.transitionTo({
                    opacity: 0,
                    height: 0,
                    translateY: -100
                });
            } else {
                animatedNavigationView.transitionTo({
                    opacity: 1,
                    height: NAVIGATION_HEIGHT,
                    translateY: 0
                });
            }
        });

        done();
    },
    isMinimized: function isMinimized () {
        const component = this;
        const {
            minimized
        } = component.state;

        return minimized;
    },
    minimize: function minimize () {
        const component = this;
        component.outgoing(EVENT.ON.UPDATE_MINIMIZATION).emit(() => true);
    },
    maximize: function minimize () {
        const component = this;
        component.outgoing(EVENT.ON.UPDATE_MINIMIZATION).emit(() => false);
    },
    render: function render () {
        const component = this;
        const {
            shade,
            overlay,
            oversize,
            minimizedInitially,
            dropShadow,
            label,
            style,
            children,
            onMinimized,
            onMaximized
        } = component.props;
        const {
            minimized
        } = component.state;
        const frosted = overlay === `translucent-frosted`;
        let adjustedStyle = Hf.merge(DEFAULT_HEADER_VIEW_STYLE).with({
            navigation: (() => {
                let backgroundColor;

                switch (overlay) { // eslint-disable-line
                case `opaque`:
                    backgroundColor = theme.color.header.container[shade];
                    break;
                case `translucent-clear`:
                    backgroundColor = `${theme.color.header.container[shade]}${theme.color.opacity}`;
                    break;
                case `translucent-frosted`:
                    backgroundColor = `transparent`;
                    break;
                case `transparent`:
                    backgroundColor = `transparent`;
                    break;
                }
                if (minimizedInitially) {
                    return {
                        height: 0
                    };
                } else {
                    return dropShadow ? {
                        ...dropShadowStyleTemplate,
                        height: oversize ? NAVIGATION_OVERSIZE_HEIGHT : DEFAULT_HEADER_VIEW_STYLE.room.height,
                        backgroundColor
                    } : {
                        height: oversize ? NAVIGATION_OVERSIZE_HEIGHT : DEFAULT_HEADER_VIEW_STYLE.room.height,
                        backgroundColor
                    };
                }
            })(),
            room: {
                center: {
                    alignSelf: oversize ? `flex-start` : `center`
                }
            },
            status: (() => {
                let backgroundColor;
                switch (overlay) { // eslint-disable-line
                case `opaque`:
                    backgroundColor = theme.color.header.status[shade];
                    break;
                case `translucent-clear`:
                    backgroundColor = `${theme.color.header.status[shade]}${theme.color.opacity}`;
                    break;
                case `translucent-frosted`:
                    backgroundColor = `transparent`;
                    break;
                case `transparent`:
                    backgroundColor = `transparent`;
                    break;
                }
                return minimized && dropShadow ? {
                    ...dropShadowStyleTemplate,
                    backgroundColor
                } : {
                    backgroundColor
                };
            })(),
            label: {
                color: theme.color.header.label[shade]
            }
        });
        let headerLeftChildren = null;
        let headerCenterChildren = null;
        let headerRightChildren = null;
        let interfaceFragment = {
            header: {
                left: {
                    part: (<View style = { adjustedStyle.room.filler }/>)
                },
                center: {
                    part: (<Text style = { adjustedStyle.label }>{ label }</Text>)
                },
                right: {
                    part: (<View style = { adjustedStyle.room.filler }/>)
                }
            }
        };
        if (React.Children.count(children) > 0) {
            interfaceFragment = React.Children.toArray(children).reduce((_interfaceFragment, child) => {
                const {
                    room
                } = child.props;
                if (!Hf.isString(room)) {
                    Hf.log(`warn1`, `HeaderViewInterface - Header view interface requires children each to have a room propperty.`);
                } else {
                    switch (room) { // eslint-disable-line
                    case `header-left`:
                        _interfaceFragment.header.left.part = child;
                        break;
                    case `header-center`:
                        _interfaceFragment.header.center.part = child;
                        break;
                    case `header-right`:
                        _interfaceFragment.header.right.part = child;
                        break;
                    case `none`:
                        break;
                    }
                }
                return _interfaceFragment;
            }, interfaceFragment);
        }

        headerLeftChildren = createFragment(interfaceFragment.header.left);
        headerCenterChildren = createFragment(interfaceFragment.header.center);
        headerRightChildren = createFragment(interfaceFragment.header.right);

        adjustedStyle = Hf.isObject(style) ? Hf.merge(adjustedStyle).with(style) : adjustedStyle;

        if (frosted) {
            return (
                <BlurView
                    style = { adjustedStyle.container }
                    blurType = { shade }
                    blurAmount = { 95 }
                >
                    <View style = { adjustedStyle.status }/>
                    <AnimatedView
                        ref = { component.assignComponentRef(`animatedNavigationView`) }
                        style = { adjustedStyle.navigation }
                        duration = { 300 }
                        useNativeDriver = { false }
                        onAnimationEnd = { () => minimized ? onMinimized() : onMaximized() }
                    >
                        <View style = { adjustedStyle.room.left }>
                        {
                            headerLeftChildren
                        }
                            <View style = { adjustedStyle.room.center }>
                            {
                                headerCenterChildren
                            }
                            </View>
                        </View>
                        <View style = { adjustedStyle.room.right }>
                        {
                            headerRightChildren
                        }
                        </View>
                    </AnimatedView>
                </BlurView>
            );
        } else {
            return (
                <View style = { adjustedStyle.container }>
                    <View style = { adjustedStyle.status }/>
                    <AnimatedView
                        ref = { component.assignComponentRef(`animatedNavigationView`) }
                        style = { adjustedStyle.navigation }
                        duration = { 300 }
                        useNativeDriver = { false }
                        onAnimationEnd = { () => minimized ? onMinimized() : onMaximized() }
                    >
                        <View style = { adjustedStyle.room.left }>
                        {
                            headerLeftChildren
                        }
                            <View style = { adjustedStyle.room.center }>
                            {
                                headerCenterChildren
                            }
                            </View>
                        </View>
                        <View style = { adjustedStyle.room.right }>
                        {
                            headerRightChildren
                        }
                        </View>
                    </AnimatedView>
                </View>
            );
        }
    }
});

export default HeaderViewInterface;

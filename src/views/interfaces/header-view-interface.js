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

import * as Animatable from 'react-native-animatable';

import { BlurView } from 'react-native-blur';

import theme from '../../styles/theme';

import fontStyleTemplate from '../../styles/templates/font-style-template';

import dropShadowStyleTemplate from '../../styles/templates/drop-shadow-style-template';

const {
    Text,
    View
} = ReactNative;

const AnimatedView = Animatable.View;
const AnimatedBlurView = Animatable.createAnimatableComponent(BlurView);

const STATUS_BAR_HEIGHT = 25;
const NAVIGATION_BAR_HEIGHT = 56;
const HEADER_BAR_OVERSIZE_HEIGHT = 148;

const DEVICE_WIDTH = Dimensions.get(`window`).width;

Animatable.initializeRegistryWithDefinitions({
    headerSideIn: {
        from: {
            height: 0,
            translateY: -100
        },
        to: {
            height: NAVIGATION_BAR_HEIGHT,
            translateY: 0
        }
    },
    headerSideOut: {
        from: {
            height: NAVIGATION_BAR_HEIGHT,
            translateY: 0
        },
        to: {
            height: 0,
            translateY: -100
        }
    },
    headerFadeIn: {
        from: {
            opacity: 0,
            height: 0,
            translateY: -100
        },
        to: {
            opacity: 1,
            height: NAVIGATION_BAR_HEIGHT,
            translateY: 0
        }
    },
    headerFadeOut: {
        from: {
            opacity: 1,
            height: NAVIGATION_BAR_HEIGHT,
            translateY: 0
        },
        to: {
            opacity: 0,
            height: 0,
            translateY: -100
        }
    }
});

const DEFAULT_HEADER_VIEW_STYLE = {
    container: {
        flexDirection: `column`,
        alignItems: `stretch`,
        justifyContent: `flex-start`,
        width: DEVICE_WIDTH,
        backgroundColor: `transparent`,
        overflow: `hidden`
    },
    navigation: {
        flexDirection: `row`,
        alignItems: `stretch`,
        justifyContent: `space-between`,
        height: NAVIGATION_BAR_HEIGHT,
        marginTop: STATUS_BAR_HEIGHT,
        marginBottom: 6
    },
    room: {
        left: {
            flexDirection: `row`,
            alignItems: `flex-start`,
            justifyContent: `center`,
            minWidth: 46,
            backgroundColor: `transparent`
        },
        center: {
            flexDirection: `column`,
            alignSelf: `center`,
            alignItems: `flex-start`,
            justifyContent: `center`,
            minWidth: 46,
            backgroundColor: `transparent`
        },
        right: {
            flexDirection: `row`,
            alignItems: `flex-start`,
            justifyContent: `center`,
            minWidth: 46,
            backgroundColor: `transparent`
        },
        filler: {
            width: 46,
            height: 46,
            backgroundColor: `transparent`
        }
    },
    status: {
        position: `absolute`,
        width: DEVICE_WIDTH,
        height: STATUS_BAR_HEIGHT,
        top: 0,
        left: 0
    },
    label: fontStyleTemplate.boldLarge
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
        dropShadow: {
            value: false,
            stronglyTyped: true
        },
        animation: {
            value: `none`,
            oneOf: [
                `none`,
                `slide-in`, `slide-out`,
                `fade-in`, `fade-out`
            ],
            stronglyTyped: true
        },
        animationSpeed: {
            value: `normal`,
            oneOf: [ `slow`, `normal`, `fast` ],
            stronglyTyped: true
        },
        label: {
            value: ``,
            stronglyTyped: true
        }
    },
    pureRender: function pureRender (property) {
        const {
            animatableComponentRef,
            shade,
            overlay,
            oversize,
            dropShadow,
            animation,
            animationSpeed,
            label,
            style,
            children
        } = Hf.fallback({
            shade: `light`,
            overlay: `opaque`,
            oversize: false,
            dropShadow: false,
            animation: `none`,
            animationSpeed: `normal`,
            label: ``
        }).of(property);
        const animated = animation !== `none`;
        const frosted = overlay === `translucent-frosted`;
        let animationType;
        let animationDuration;
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
                return dropShadow ? {
                    ...dropShadowStyleTemplate,
                    height: oversize ? HEADER_BAR_OVERSIZE_HEIGHT : DEFAULT_HEADER_VIEW_STYLE.room.height,
                    backgroundColor
                } : {
                    height: oversize ? HEADER_BAR_OVERSIZE_HEIGHT : DEFAULT_HEADER_VIEW_STYLE.room.height,
                    backgroundColor
                };
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
                return dropShadow ? {
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

        switch (animation) { // eslint-disable-line
        case `slide-in`:
            animationType = `headerSlideIn`;
            break;
        case `slide-out`:
            animationType = `headerSlideOut`;
            break;
        case `fade-in`:
            animationType = `headerFadeIn`;
            break;
        case `fade-out`:
            animationType = `headerFadeOut`;
            break;
        }

        switch (animationSpeed) { // eslint-disable-line
        case `slow`:
            animationDuration = 500;
            break;
        case `normal`:
            animationDuration = 300;
            break;
        case `fast`:
            animationDuration = 200;
            break;
        }

        if (animated) {
            if (frosted) {
                return (
                    <View style = { adjustedStyle.container }>
                        <AnimatedBlurView
                            ref = { animatableComponentRef }
                            style = { adjustedStyle.navigation }
                            duration = { animationDuration }
                            animation = { animationType }
                            blurType = { shade }
                            useNativeDriver = { true }
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
                        </AnimatedBlurView>
                        <View style = { adjustedStyle.status }/>
                    </View>
                );
            } else {
                return (
                    <View style = { adjustedStyle.container }>
                        <AnimatedView
                            ref = { animatableComponentRef }
                            style = { adjustedStyle.navigation }
                            duration = { animationDuration }
                            animation = { animationType }
                            useNativeDriver = { true }
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
                        <View style = { adjustedStyle.status }/>
                    </View>
                );
            }
        } else {
            if (frosted) {
                return (
                    <View style = { adjustedStyle.container }>
                        <BlurView
                            style = { adjustedStyle.navigation }
                            blurType = { shade }
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
                        </BlurView>
                        <View style = { adjustedStyle.status }/>
                    </View>
                );
            } else {
                return (
                    <View style = { adjustedStyle.container }>
                        <View style = { adjustedStyle.navigation } >
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
                        </View>
                        <View style = { adjustedStyle.status }/>
                    </View>
                );
            }
        }
    }
});

export default HeaderViewInterface;

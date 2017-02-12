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
 *------------------------------------------------------------------------
 */
'use strict'; // eslint-disable-line

import { Hf } from 'hyperflow';

import React from 'react';

import ReactNative, { Dimensions } from 'react-native';

import * as Animatable from 'react-native-animatable';

import { BlurView } from 'react-native-blur';

const {
    View,
    ScrollView
} = ReactNative;

const AnimatedView = Animatable.View;
const AnimatedBlurView = Animatable.createAnimatableComponent(BlurView);

import theme from '../../styles/theme';

const DEVICE_WIDTH = Dimensions.get(`window`).width;

const DEFAULT_LAYOUT_VIEW_STYLE = {
    container: {
        flexShrink: 1,
        flexDirection: `column`,
        justifyContent: `center`,
        alignItems: `stretch`,
        maxWidth: DEVICE_WIDTH,
        overflow: `hidden`
    },
    horizontal: {
        flexShrink: 1,
        flexDirection: `column`,
        maxWidth: DEVICE_WIDTH,
        backgroundColor: `transparent`
    },
    vertical: {
        flexShrink: 1,
        flexDirection: `row`,
        maxWidth: DEVICE_WIDTH,
        backgroundColor: `transparent`
    }
};

const LayoutViewInterface = Hf.Interface.augment({
    composites: [
        Hf.React.ComponentComposite
    ],
    state: {
        room: {
            value: `none`,
            oneOf: [
                `none`,
                `header-left`, `header-center`, `header-right`,
                `item-media`, `item-action`,
                `card-header-left`, `card-header-right`,
                `card-media`, `card-overlay`,
                `card-body`,
                `card-action-primary`, `card-action-secondary`
            ],
            stronglyTyped: true
        },
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
        orientation: {
            value: `horizontal`,
            oneOf: [ `horizontal`, `vertical` ],
            stronglyTyped: true
        },
        selfAlignment: {
            value: `auto`,
            oneOf: [ `auto`, `start`, `center`, `end`, `stretch` ],
            stronglyTyped: true
        },
        alignment: {
            value: `center`,
            oneOf: [ `start`, `center`, `end`, `stretch` ],
            stronglyTyped: true
        },
        scrollable: {
            value: false,
            stronglyTyped: true
        }
    },
    pureRender: function pureRender (property) {
        const {
            scrollableRef,
            animatableRef,
            shade,
            overlay,
            orientation,
            selfAlignment,
            alignment,
            scrollable,
            style,
            children
        } = Hf.fallback({
            shade: `light`,
            overlay: `opaque`,
            orientation: `horizontal`,
            selfAlignment: `auto`,
            alignment: `center`,
            scrollable: false
        }).of(property);
        const animated = false;
        let frosted = false;
        let adjustedStyle = Hf.merge(DEFAULT_LAYOUT_VIEW_STYLE).with({
            container: {
                backgroundColor: (() => {
                    switch (overlay) { // eslint-disable-line
                    case `opaque`:
                        return theme.color.layout.container[shade];
                    case `translucent-clear`:
                        return `${theme.color.layout.container[shade]}${theme.color.opacity}`;
                    case `translucent-frosted`:
                        frosted = true;
                        return `transparent`;
                    case `transparent`:
                        return `transparent`;
                    }
                })(),
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
            horizontal: {
                justifyContent: (() => {
                    switch (alignment) { // eslint-disable-line
                    case `start`:
                        return `flex-start`;
                    case `center`:
                        return `center`;
                    case `end`:
                        return `flex-end`;
                    case `stretch`:
                        return `space-between`;
                    }
                })(),
                alignItems: (() => {
                    switch (alignment) { // eslint-disable-line
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
            vertical: {
                justifyContent: (() => {
                    switch (alignment) { // eslint-disable-line
                    case `start`:
                        return `flex-start`;
                    case `center`:
                        return `center`;
                    case `end`:
                        return `flex-end`;
                    case `stretch`:
                        return `space-between`;
                    }
                })(),
                alignItems: (() => {
                    switch (alignment) { // eslint-disable-line
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
            }
        });

        adjustedStyle = Hf.isObject(style) ? Hf.merge(adjustedStyle).with(style) : adjustedStyle;

        if (scrollable) {
            if (animated) {
                if (frosted) {
                    return (
                        <AnimatedBlurView
                            ref = { animatableRef }
                            style = { adjustedStyle.container }
                            blurType = { shade }
                            blurAmount = { 95 }
                            useNativeDriver = { true }
                        >
                            <ScrollView ref = { scrollableRef }>
                                <View style = { adjustedStyle[orientation] }>
                                {
                                    children
                                }
                                </View>
                            </ScrollView>
                        </AnimatedBlurView>
                    );
                }
                return (
                    <AnimatedView
                        ref = { animatableRef }
                        style = { adjustedStyle.container }
                        useNativeDriver = { true }
                    >
                        <ScrollView ref = { scrollableRef }>
                            <View style = { adjustedStyle[orientation] }>
                            {
                                children
                            }
                            </View>
                        </ScrollView>
                    </AnimatedView>
                );
            } else {
                if (frosted) {
                    return (
                        <BlurView
                            style = { adjustedStyle.container }
                            blurType = { shade }
                            blurAmount = { 95 }
                        >
                            <ScrollView ref = { scrollableRef }>
                                <View style = { adjustedStyle[orientation] }>
                                {
                                    children
                                }
                                </View>
                            </ScrollView>
                        </BlurView>
                    );
                }
                return (
                    <View style = { adjustedStyle.container }>
                        <ScrollView ref = { scrollableRef }>
                            <View style = { adjustedStyle[orientation] }>
                            {
                                children
                            }
                            </View>
                        </ScrollView>
                    </View>
                );
            }
        } else {
            if (animated) {
                if (frosted) {
                    return (
                        <AnimatedBlurView
                            ref = { animatableRef }
                            style = { adjustedStyle.container }
                            blurType = { shade }
                            blurAmount = { 95 }
                            useNativeDriver = { true }
                        >
                            <View style = { adjustedStyle[orientation] }>
                            {
                                children
                            }
                            </View>
                        </AnimatedBlurView>
                    );
                }
                return (
                    <AnimatedView
                        ref = { animatableRef }
                        style = { adjustedStyle.container }
                        useNativeDriver = { true }
                    >
                        <View style = { adjustedStyle[orientation] }>
                        {
                            children
                        }
                        </View>
                    </AnimatedView>
                );
            } else {
                if (frosted) {
                    return (
                        <BlurView
                            style = { adjustedStyle.container }
                            blurType = { shade }
                            blurAmount = { 95 }
                        >
                            <View style = { adjustedStyle[orientation] }>
                            {
                                children
                            }
                            </View>
                        </BlurView>
                    );
                }
                return (
                    <View style = { adjustedStyle.container }>
                        <View style = { adjustedStyle[orientation] }>
                        {
                            children
                        }
                        </View>
                    </View>
                );
            }
        }
    }
});

const LayoutViewComponent = LayoutViewInterface({
    name: `layout-view`
}).registerComponentLib({
    React,
    ReactNative
}).toPureComponent();

export default LayoutViewComponent;

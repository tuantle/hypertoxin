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

import ReactNative from 'react-native';

import * as Animatable from 'react-native-animatable';

import { BlurView } from 'react-native-blur';

import { Ht } from '../../hypertoxin';

const {
    View,
    ScrollView,
    Dimensions
} = ReactNative;

const AnimatedView = Animatable.View;
const AnimatedBlurView = Animatable.createAnimatableComponent(BlurView);

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
            value: Ht.Theme.view.layout.shade,
            oneOf: [ `light`, `dark` ],
            stronglyTyped: true
        },
        overlay: {
            value: Ht.Theme.view.layout.overlay,
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
    animate: function animate (definition) {
        const component = this;
        const [
            animatedView
        ] = component.lookupComponentRefs(
            `animatedView`
        );
        const {
            from,
            to,
            duration,
            easing
        } = Hf.fallback({
            duration: 300,
            easing: `ease`
        }).of(definition);

        if (Hf.isDefined(animatedView)) {
            if (Hf.isObject(from) && Hf.isObject(to)) {
                animatedView.transition(from, to, duration, easing);
            } else if (!Hf.isObject(from) && Hf.isObject(to)) {
                animatedView.transitionTo(to, duration, easing);
            }
        }
    },
    scrollTo: function scrollTo (destination) {
        const component = this;
        const [
            scrollView
        ] = component.lookupComponentRefs(
            `scrollView`
        );
        const {
            x,
            y,
            animated
        } = Hf.fallback({
            x: 0,
            y: 0,
            animated: true
        }).of(destination);

        if (Hf.isDefined(scrollView)) {
            scrollView.scrollTo({
                x,
                y,
                animated
            });
        }
    },
    render: function render () {
        const component = this;
        const {
            shade,
            overlay,
            orientation,
            selfAlignment,
            alignment,
            scrollable,
            style,
            children
        } = component.props;
        let frosted = false;
        let adjustedStyle = Hf.merge(DEFAULT_LAYOUT_VIEW_STYLE).with({
            container: {
                backgroundColor: (() => {
                    switch (overlay) { // eslint-disable-line
                    case `opaque`:
                        return Ht.Theme.color.layout.container[shade];
                    case `translucent-clear`:
                        return `${Ht.Theme.color.layout.container[shade]}${Ht.Theme.color.opacity}`;
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
            if (frosted) {
                return (
                    <AnimatedBlurView
                        ref = { component.assignComponentRef(`animatedView`) }
                        style = { adjustedStyle.container }
                        blurType = { shade }
                        blurAmount = { Ht.Theme.misc.frostLevel }
                        useNativeDriver = { true }
                    >
                        <ScrollView ref = { component.assignComponentRef(`scrollView`) }>
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
                    ref = { component.assignComponentRef(`animatedView`) }
                    style = { adjustedStyle.container }
                    useNativeDriver = { true }
                >
                    <ScrollView ref = { component.assignComponentRef(`scrollView`) }>
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
                    <AnimatedBlurView
                        ref = { component.assignComponentRef(`animatedView`) }
                        style = { adjustedStyle.container }
                        blurType = { shade }
                        blurAmount = { Ht.Theme.misc.frostLevel }
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
                    ref = { component.assignComponentRef(`animatedView`) }
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
        }
    }
});

const LayoutViewComponent = LayoutViewInterface({
    name: `layout-view`
}).registerComponentLib({
    React,
    ReactNative
}).toComponent(null, {
    alwaysUpdateAsParent: true,
    componentMethodAndPropertyInclusions: [
        `animate`,
        `scrollTo`
    ]
});

export default LayoutViewComponent;

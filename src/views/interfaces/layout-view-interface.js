/**
 * Copyright (c) 2016-present, Boki, Inc. All rights reserved.
 *
 * Licensed TBA
 *
 *------------------------------------------------------------------------
 *
 * @module LayoutViewInterface
 * @description - Layout view interface.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 *------------------------------------------------------------------------
 */
'use strict'; // eslint-disable-line

import { Hf } from 'hyperflow';

import React from 'react';

import ReactNative from 'react-native';

import {
    View as AnimatedView,
    createAnimatableComponent
} from 'react-native-animatable';

import { BlurView } from 'react-native-blur';

const AnimatedBlurView = createAnimatableComponent(BlurView);

import theme from '../../styles/theme';

const DEFSULT_LAYOUT_VIEW_STYLE = {
    container: {
        flexShrink: 1,
        flexDirection: `column`,
        justifyContent: `center`,
        alignItems: `stretch`,
        overflow: `hidden`
        // marginHorizontal: 3,
        // paddingHorizontal: 3
    },
    content: {
        horizontal: {
            flexShrink: 1,
            flexDirection: `column`,
            backgroundColor: `transparent`
        },
        vertical: {
            flexShrink: 1,
            flexDirection: `row`,
            backgroundColor: `transparent`
        }
    }
};

const LayoutViewInterface = Hf.Interface.augment({
    composites: [
        Hf.React.ComponentComposite
    ],
    state: {
        scollableComponentRef: {
            value: null
        },
        animatableComponentRef: {
            value: null
        },
        room: {
            value: `none`,
            oneOf: [
                `none`,
                `header-center`,
                `card-header-left`, `card-header-right`,
                `card-media`, `card-overlay`,
                `card-body`
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
        animation: {
            value: `none`,
            oneOf: [
                `none`,
                `bounce`, `rubber-band`,
                `slide-in-right`, `slide-out-right`,
                `flip-in-y`, `flip-out-y`
            ],
            stronglyTyped: true
        },
        animationSpeed: {
            value: `normal`,
            oneOf: [ `slow`, `normal`, `fast` ],
            stronglyTyped: true
        },
        scrollable: {
            value: false,
            stronglyTyped: true
        },
        style: {
            value: null
        }
    },
    pureRender: function pureRender (property) {
        const {
            View,
            ScrollView
        } = ReactNative;
        const {
            scollableComponentRef,
            animatableComponentRef,
            shade,
            overlay,
            orientation,
            selfAlignment,
            alignment,
            animation,
            animationSpeed,
            scrollable,
            style,
            children
        } = Hf.fallback({
            shade: `light`,
            overlay: `opaque`,
            orientation: `horizontal`,
            selfAlignment: `auto`,
            alignment: `center`,
            animation: `none`,
            animationSpeed: `normal`,
            scrollable: false
        }).of(property);
        const animated = animation !== `none`;
        let animationType;
        let animationDuration;
        let frosted = false;
        let adjustedStyle = Hf.merge(DEFSULT_LAYOUT_VIEW_STYLE).with({
            container: {
                backgroundColor: (() => {
                    switch (overlay) { // eslint-disable-line
                    case `opaque`:
                        return theme.layout.container[shade];
                    case `translucent-clear`:
                        return `${theme.layout.container[shade]}${theme.opacity}`;
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
            content: {
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
            }
        });

        adjustedStyle = Hf.isObject(style) ? Hf.merge(adjustedStyle).with(style) : adjustedStyle;

        switch (animation) { // eslint-disable-line
        case `bounce`:
            animationType = `bounce`;
            break;
        case `rubber-band`:
            animationType = `bounce`;
            break;
        case `slide-in-right`:
            animationType = `slideInRight`;
            break;
        case `slide-out-right`:
            animationType = `slideOutRight`;
            break;
        case `flip-in-y`:
            animationType = `flipInY`;
            break;
        case `flip-out-y`:
            animationType = `flipOutY`;
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

        if (scrollable) {
            if (animated) {
                if (frosted) {
                    return (
                        <AnimatedBlurView
                            ref = { animatableComponentRef }
                            style = { adjustedStyle.container }
                            animation = { animationType }
                            duration = { animationDuration }
                            blurType = { shade }
                        >
                            <ScrollView ref = { scollableComponentRef }>
                                <View style = { adjustedStyle.content[orientation] }>
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
                        ref = { animatableComponentRef }
                        style = { adjustedStyle.container }
                        duration = { animationDuration }
                        animation = { animationType }
                    >
                        <ScrollView ref = { scollableComponentRef }>
                            <View style = { adjustedStyle.content[orientation] }>
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
                        >
                            <ScrollView ref = { scollableComponentRef }>
                                <View style = { adjustedStyle.content[orientation] }>
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
                        <ScrollView ref = { scollableComponentRef }>
                            <View style = { adjustedStyle.content[orientation] }>
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
                            ref = { animatableComponentRef }
                            style = { adjustedStyle.container }
                            animation = { animationType }
                            duration = { animationDuration }
                            blurType = { shade }
                        >
                            <View style = { adjustedStyle.content[orientation] }>
                            {
                                children
                            }
                            </View>
                        </AnimatedBlurView>
                    );
                }
                return (
                    <AnimatedView
                        ref = { animatableComponentRef }
                        style = { adjustedStyle.container }
                        animation = { animationType }
                        duration = { animationDuration }
                    >
                        <View style = { adjustedStyle.content[orientation] }>
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
                        >
                            <View style = { adjustedStyle.content[orientation] }>
                            {
                                children
                            }
                            </View>
                        </BlurView>
                    );
                }
                return (
                    <View style = { adjustedStyle.container }>
                        <View style = { adjustedStyle.content[orientation] }>
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

export default LayoutViewInterface;

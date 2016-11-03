/**
 * Copyright (c) 2016-present, Boki, Inc. All rights reserved.
 *
 * Licensed TBA
 *
 *------------------------------------------------------------------------
 *
 * @module IconImageInterface
 * @description - Icon image interface.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 *------------------------------------------------------------------------
 */
'use strict'; // eslint-disable-line

import { Hf } from 'hyperflow';

import React from 'react';

import ReactNative from 'react-native';

import { Image as AnimatedImage } from 'react-native-animatable';

import theme from '../../styles/theme';

const DEFAULT_ICON_IMAGE_STYLE = {
    small: {
        width: 16,
        height: 16,
        margin: 3,
        padding: 3
    },
    normal: {
        width: 24,
        height: 24,
        margin: 3,
        padding: 3
    },
    large: {
        width: 36,
        height: 36,
        margin: 3,
        padding: 3
    }
};

const IconImageInterface = Hf.Interface.augment({
    composites: [
        Hf.React.ComponentComposite
    ],
    state: {
        animatableComponentRef: {
            value: null
        },
        room: {
            value: `none`,
            oneOf: [
                `none`,
                `header-center`,
                `card-header-left`, `card-header-right`,
                `card-media`, `card-overlay`, `card-body`
            ],
            stronglyTyped: true
        },
        shade: {
            value: `dark`,
            oneOf: [ `light`, `dark` ],
            stronglyTyped: true
        },
        color: {
            value: `default`,
            oneOf: [ `default`, `primary`, `secondary` ],
            stronglyTyped: true
        },
        customColor: {
            value: ``,
            stronglyTyped: true
        },
        size: {
            value: `normal`,
            oneOf: [ `small`, `normal`, `large` ],
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
        source: {
            value: null
        },
        defaultSource: {
            value: null
        },
        style: {
            value: null
        }
    },
    pureRender: function pureRender (property) {
        const {
            Image
        } = ReactNative;
        const {
            animatableComponentRef,
            shade,
            color,
            customColor,
            size,
            animation,
            animationSpeed,
            source,
            defaultSource,
            style
        } = Hf.fallback({
            shade: `dark`,
            color: `default`,
            customColor: ``,
            size: `normal`,
            animation: `none`,
            animationSpeed: `normal`
        }).of(property);
        const animated = animation !== `none`;
        let adjustedStyle = Hf.merge(DEFAULT_ICON_IMAGE_STYLE[size]).with({
            tintColor: Hf.isEmpty(customColor) ? theme.icon[color][shade] : customColor,
            backgroundColor: `transparent`
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

        if (animated) {
            return (
                <AnimatedImage
                    ref = { animatableComponentRef }
                    style = { adjustedStyle }
                    source = {
                        Hf.isString(source) ? {
                            uri: source
                        } : source
                    }
                    defaultSource = {
                        Hf.isString(defaultSource) ? {
                            uri: defaultSource
                        } : defaultSource
                    }
                    resizeMode = 'cover'
                    animation = { animationType }
                    duration = { animationDuration }
                />
            );
        } else {
            return (
                <Image
                    style = { adjustedStyle }
                    source = {
                        Hf.isString(source) ? {
                            uri: source
                        } : source
                    }
                    defaultSource = {
                        Hf.isString(defaultSource) ? {
                            uri: defaultSource
                        } : defaultSource
                    }
                    resizeMode = 'cover'
                />
            );
        }
    }
});

export default IconImageInterface;

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
 * @module AvatarImageInterface
 * @description - Avatar image interface.
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

const DEFAULT_AVATAR_IMAGE_STYLE = {
    small: {
        width: 36,
        height: 36,
        borderRadius: 18,
        margin: 3,
        padding: 3
    },
    normal: {
        width: 48,
        height: 48,
        borderRadius: 24,
        margin: 3,
        padding: 3
    },
    large: {
        width: 56,
        height: 56,
        borderRadius: 28,
        margin: 3,
        padding: 3
    }
};

const AvatarImageInterface = Hf.Interface.augment({
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
                `card-header-left`,
                `card-media`, `card-overlay`, `card-body`
            ],
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
            size,
            animation,
            animationSpeed,
            source,
            defaultSource,
            style
        } = Hf.fallback({
            size: `normal`
            animation: `none`
            animationSpeed: `normal`
        }).of(property);
        const animated = animation !== `none`;
        let adjustedStyle = DEFAULT_AVATAR_IMAGE_STYLE[size];

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

export default AvatarImageInterface;

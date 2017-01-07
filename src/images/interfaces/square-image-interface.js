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
 * @module SquareImageInteface
 * @description - Square image interface.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 *------------------------------------------------------------------------
 */
'use strict'; // eslint-disable-line

import { Hf } from 'hyperflow';

import React from 'react';

import ReactNative, { Dimensions } from 'react-native';

import { Image as AnimatedImage } from 'react-native-animatable';

import dropShadowStyleTemplate from '../../styles/templates/drop-shadow-style-template';

const {
    Image,
    View
} = ReactNative;

const DEVICE_WIDTH = Dimensions.get(`window`).width;

const DEFAULT_SQUARE_IMAGE_STYLE = {
    smallest: {
        flexDirection: `column`,
        alignItems: `stretch`,
        justifyContent: `center`,
        width: DEVICE_WIDTH * 0.1425,
        height: DEVICE_WIDTH * 0.1425
    },
    smaller: {
        flexDirection: `column`,
        alignItems: `stretch`,
        justifyContent: `center`,
        width: DEVICE_WIDTH * 0.2,
        height: DEVICE_WIDTH * 0.2
    },
    small: {
        flexDirection: `column`,
        alignItems: `stretch`,
        justifyContent: `center`,
        width: DEVICE_WIDTH * 0.3375,
        height: DEVICE_WIDTH * 0.3375
    },
    normal: {
        flexDirection: `column`,
        alignItems: `stretch`,
        justifyContent: `center`,
        width: DEVICE_WIDTH * 0.5,
        height: DEVICE_WIDTH * 0.5
    },
    large: {
        flexDirection: `column`,
        alignItems: `stretch`,
        justifyContent: `center`,
        width: DEVICE_WIDTH * 0.675,
        height: DEVICE_WIDTH * 0.675
    },
    larger: {
        flexDirection: `column`,
        alignItems: `stretch`,
        justifyContent: `center`,
        width: DEVICE_WIDTH * 0.75,
        height: DEVICE_WIDTH * 0.75
    },
    largest: {
        flexDirection: `column`,
        alignItems: `stretch`,
        justifyContent: `center`,
        width: DEVICE_WIDTH,
        height: DEVICE_WIDTH
    }
};

const SquareImageInteface = Hf.Interface.augment({
    composites: [
        Hf.React.ComponentComposite
    ],
    state: {
        room: {
            value: `none`,
            oneOf: [
                `none`,
                `item-media`,
                `card-media`
            ],
            stronglyTyped: true
        },
        size: {
            value: `normal`,
            oneOf: [ `smallest`, `smaller`, `small`, `normal`, `large`, `larger`, `largest` ],
            stronglyTyped: true
        },
        resizeMode: {
            value: `cover`,
            oneOf: [ `cover`, `contain`, `stretch`, `repeat`, `center` ],
            stronglyTyped: true
        },
        dropShadow: {
            value: true,
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
        }
    },
    pureRender: function pureRender (property) {
        const {
            animatableComponentRef,
            size,
            resizeMode,
            dropShadow,
            animation,
            animationSpeed,
            source,
            defaultSource,
            style,
            children
        } = Hf.fallback({
            size: `normal`,
            resizeMode: `cover`,
            dropShadow: false,
            animation: `none`,
            animationSpeed: `normal`,
            source: null,
            defaultSource: null
        }).of(property);
        const animated = animation !== `none`;
        let animationType;
        let animationDuration;
        let adjustedStyle = DEFAULT_SQUARE_IMAGE_STYLE[size];

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
            if (dropShadow) {
                return (
                    <View style = {{ ...dropShadowStyleTemplate }}>
                        <AnimatedImage
                            ref = { animatableComponentRef }
                            style = { adjustedStyle }
                            source = {
                                Hf.isString(source) ? {
                                    uri: source,
                                    cache: `only-if-cached`
                                } : source
                            }
                            defaultSource = {
                                Hf.isString(defaultSource) ? {
                                    uri: defaultSource
                                } : defaultSource
                            }
                            resizeMode = { resizeMode }
                            animation = { animationType }
                            duration = { animationDuration }
                        >
                        {
                            children
                        }
                        </AnimatedImage>
                    </View>
                );
            } else {
                return (
                    <AnimatedImage
                        ref = { animatableComponentRef }
                        style = { adjustedStyle }
                        source = {
                            Hf.isString(source) ? {
                                uri: source,
                                cache: `only-if-cached`
                            } : source
                        }
                        defaultSource = {
                            Hf.isString(defaultSource) ? {
                                uri: defaultSource
                            } : defaultSource
                        }
                        resizeMode = { resizeMode }
                        animation = { animationType }
                        duration = { animationDuration }
                    >
                    {
                        children
                    }
                    </AnimatedImage>
                );
            }
        } else {
            if (dropShadow) {
                return (
                    <View style = {{ ...dropShadowStyleTemplate }}>
                        <Image
                            style = { adjustedStyle }
                            source = {
                                Hf.isString(source) ? {
                                    uri: source,
                                    cache: `only-if-cached`
                                } : source
                            }
                            defaultSource = {
                                Hf.isString(defaultSource) ? {
                                    uri: defaultSource
                                } : defaultSource
                            }
                            resizeMode = { resizeMode }
                        >
                        {
                            children
                        }
                        </Image>
                    </View>
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
                        resizeMode = { resizeMode }
                    >
                    {
                        children
                    }
                    </Image>
                );
            }
        }
    }
});

export default SquareImageInteface;

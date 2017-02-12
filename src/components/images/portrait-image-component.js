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
 * @module PortraitImageComponent
 * @description - Portrait image component.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 *------------------------------------------------------------------------
 */
'use strict'; // eslint-disable-line
'use strict'; // eslint-disable-line

import { Hf } from 'hyperflow';

import React from 'react';

import ReactNative from 'react-native';

import { Image as AnimatedImage } from 'react-native-animatable';

import dropShadowStyleTemplate from '../../styles/templates/drop-shadow-style-template';

const {
    Image,
    View
} = ReactNative;

const DEVICE_WIDTH = ReactNative.Dimensions.get(`window`).width;
const DEVICE_HEIGHT = ReactNative.Dimensions.get(`window`).height;

const DEFAULT_PORTRAIT_IMAGE_STYLE = {
    smallest: {
        flexDirection: `column`,
        alignItems: `stretch`,
        justifyContent: `center`,
        width: DEVICE_WIDTH * 0.0585,
        height: DEVICE_HEIGHT * 0.0525
    },
    smaller: {
        flexDirection: `column`,
        alignItems: `stretch`,
        justifyContent: `center`,
        width: DEVICE_WIDTH * 0.09,
        height: DEVICE_HEIGHT * 0.07
    },
    small: {
        flexDirection: `column`,
        alignItems: `stretch`,
        justifyContent: `center`,
        width: DEVICE_WIDTH * 0.2,
        height: DEVICE_HEIGHT * 0.1425
    },
    normal: {
        flexDirection: `column`,
        alignItems: `stretch`,
        justifyContent: `center`,
        width: DEVICE_WIDTH * 0.5,
        height: DEVICE_HEIGHT * 0.3375
    },
    large: {
        flexDirection: `column`,
        alignItems: `stretch`,
        justifyContent: `center`,
        width: DEVICE_WIDTH * 0.75,
        height: DEVICE_HEIGHT * 0.45
    },
    larger: {
        flexDirection: `column`,
        alignItems: `stretch`,
        justifyContent: `center`,
        width: DEVICE_WIDTH * 0.8,
        height: DEVICE_HEIGHT * 0.675
    },
    largest: {
        flexDirection: `column`,
        alignItems: `stretch`,
        justifyContent: `center`,
        width: DEVICE_WIDTH * 0.835,
        height: DEVICE_HEIGHT * 0.75
    }
};

const PortraitImageInterface = Hf.Interface.augment({
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
            value: false,
            stronglyTyped: true
        }
    },
    pureRender: function pureRender (property) {
        const {
            animatableRef,
            size,
            resizeMode,
            dropShadow,
            source,
            defaultSource,
            style,
            children
        } = Hf.fallback({
            size: `normal`,
            resizeMode: `cover`,
            dropShadow: false
        }).of(property);
        const animated = false;
        let adjustedStyle = DEFAULT_PORTRAIT_IMAGE_STYLE[size];

        adjustedStyle = Hf.isObject(style) ? Hf.merge(adjustedStyle).with(style) : adjustedStyle;

        if (animated) {
            if (dropShadow) {
                return (
                    <View style = {{ ...dropShadowStyleTemplate }}>
                        <AnimatedImage
                            ref = { animatableRef }
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
                            useNativeDriver = { true }
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
                        ref = { animatableRef }
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
                        useNativeDriver = { true }
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
                );
            }
        }
    }
});

const PortraitImageComponent = PortraitImageInterface({
    name: `portrait-image`
}).registerComponentLib({
    React,
    ReactNative
}).toPureComponent();

export default PortraitImageComponent;

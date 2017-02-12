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
 * @module AvatarImageComponent
 * @description - Avatar image component.
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

import dropShadowStyleTemplate from '../../styles/templates/drop-shadow-style-template';

const {
    Image,
    View
} = ReactNative;

const DEFAULT_AVATAR_IMAGE_STYLE = {
    small: {
        width: 36,
        height: 36,
        margin: 3,
        padding: 3,
        borderRadius: 18,
        backgroundColor: `transparent`
    },
    normal: {
        width: 48,
        height: 48,
        margin: 3,
        padding: 3,
        borderRadius: 24,
        backgroundColor: `transparent`
    },
    large: {
        width: 56,
        height: 56,
        margin: 3,
        padding: 3,
        borderRadius: 28,
        backgroundColor: `transparent`
    }
};

const AvatarImageInterface = Hf.Interface.augment({
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
                `card-media`, `card-overlay`, `card-body`
            ],
            stronglyTyped: true
        },
        size: {
            value: `normal`,
            oneOf: [ `small`, `normal`, `large` ],
            stronglyTyped: true
        },
        dropShadow: {
            value: true,
            stronglyTyped: true
        }
    },
    pureRender: function pureRender (property) {
        const {
            animatableRef,
            size,
            dropShadow,
            source,
            defaultSource,
            style
        } = Hf.fallback({
            size: `normal`,
            dropShadow: true
        }).of(property);
        const animated = false;
        let adjustedStyle = DEFAULT_AVATAR_IMAGE_STYLE[size];

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
                            resizeMode = 'cover'
                            useNativeDriver = { true }
                        />
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
                        resizeMode = 'cover'
                        useNativeDriver = { true }
                    />
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
                            resizeMode = 'cover'
                        />
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
                        resizeMode = 'cover'
                    />
                );
            }
        }
    }
});

const AvatarImageComponent = AvatarImageInterface({
    name: `avatar-image`
}).registerComponentLib({
    React,
    ReactNative
}).toPureComponent();

export default AvatarImageComponent;

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
 * @module SquareImageComponent
 * @description - Square image component.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 *------------------------------------------------------------------------
 */
'use strict'; // eslint-disable-line
'use strict'; // eslint-disable-line

import { Hf } from 'hyperflow';

import React from 'react';

import ReactNative, { Dimensions } from 'react-native';

import { Image as AnimatedImage } from 'react-native-animatable';

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

const SquareImageInterface = Hf.Interface.augment({
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
        }
    },
    // bounce: function bounce () {
    //
    // },
    animate: function animate (definition) {
        const component = this;
        const [
            animatedImage
        ] = component.lookupComponentRefs(
            `animatedImage`
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

        if (Hf.isDefined(animatedImage)) {
            if (Hf.isObject(from) && Hf.isObject(to)) {
                animatedImage.transition(from, to, duration, easing);
            } else if (!Hf.isObject(from) && Hf.isObject(to)) {
                animatedImage.transitionTo(to, duration, easing);
            }
        }
    },
    render: function render () {
        const component = this;
        const {
            size,
            resizeMode,
            source,
            defaultSource,
            style,
            children
        } = component.props;
        let adjustedStyle = DEFAULT_SQUARE_IMAGE_STYLE[size];

        adjustedStyle = Hf.isObject(style) ? Hf.merge(adjustedStyle).with(style) : adjustedStyle;

        return (
            <AnimatedImage
                ref = { component.assignComponentRef(`animatedImage`) }
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
});

const SquareImageComponent = SquareImageInterface({
    name: `square-image`
}).registerComponentLib({
    React,
    ReactNative
}).toComponent(null, {
    componentMethodAndPropertyInclusions: [
        `animate`
    ]
});

export default SquareImageComponent;

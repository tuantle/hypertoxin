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
 * @module LandscapeImageComponent
 * @description - Landscape image ios component.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 * @flow
 */
'use strict'; // eslint-disable-line

import { Hf } from 'hyperflow';

import React from 'react';

import ReactNative from 'react-native';

import PropTypes from 'prop-types';

import CreateReactClass from 'create-react-class';

import { Image as AnimatedImage } from 'react-native-animatable';

import { Ht } from '../../hypertoxin';

const {
    Dimensions
} = ReactNative;

const DEVICE_WIDTH = Dimensions.get(`window`).width;
const DEVICE_HEIGHT = Dimensions.get(`window`).height;

const DEFAULT_LANDSCAPE_IMAGE_STYLE = {
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
        width: DEVICE_WIDTH * 0.3375,
        height: DEVICE_HEIGHT * 0.1425
    },
    normal: {
        flexDirection: `column`,
        alignItems: `stretch`,
        justifyContent: `center`,
        width: DEVICE_WIDTH * 0.5,
        height: DEVICE_HEIGHT * 0.2
    },
    large: {
        flexDirection: `column`,
        alignItems: `stretch`,
        justifyContent: `center`,
        width: DEVICE_WIDTH * 0.675,
        height: DEVICE_HEIGHT * 0.3375
    },
    larger: {
        flexDirection: `column`,
        alignItems: `stretch`,
        justifyContent: `center`,
        width: DEVICE_WIDTH * 0.75,
        height: DEVICE_HEIGHT * 0.5
    },
    largest: {
        flexDirection: `column`,
        alignItems: `stretch`,
        justifyContent: `center`,
        width: DEVICE_WIDTH * 0.8,
        height: DEVICE_HEIGHT * 0.675
    }
};

const LandscapeImageInterface = Hf.Interface.augment({
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
            value: Ht.Theme.image.landscape.size,
            oneOf: [ `smallest`, `smaller`, `small`, `normal`, `large`, `larger`, `largest` ],
            stronglyTyped: true
        },
        resizeMode: {
            value: Ht.Theme.image.landscape.resizeMode,
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
        let adjustedStyle = DEFAULT_LANDSCAPE_IMAGE_STYLE[size];

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

const LandscapeImageComponent = LandscapeImageInterface({
    name: `landscape-image`
}).registerComponentLib({
    React,
    ReactNative,
    PropTypes,
    CreateReactClass
}).toComponent(null, {
    alwaysUpdateAsParent: true,
    componentMethodAndPropertyInclusions: [
        `animate`
    ]
});

export default LandscapeImageComponent;

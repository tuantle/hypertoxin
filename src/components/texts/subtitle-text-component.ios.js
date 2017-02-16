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
 * @module SubtitleTextComponent
 * @description - Subtitle text component.
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

import { Text as AnimatedText } from 'react-native-animatable';

import { Ht } from '../../hypertoxin';

import fontStyleTemplate from '../../styles/templates/font-style-template';

const DEFAULT_SUBTITLE_TEXT_STYLE = {
    small: fontStyleTemplate.normalSmall,
    normal: fontStyleTemplate.normal,
    large: fontStyleTemplate.normalLarge
};

const SubtitleTextInterface = Hf.Interface.augment({
    composites: [
        Hf.React.ComponentComposite
    ],
    state: {
        room: {
            value: `none`,
            oneOf: [
                `none`,
                `header-center`,
                `item-media`,
                `card-header-left`, `card-header-right`,
                `card-media`, `card-overlay`,
                `card-body`
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
            stronglyTyped: true
        },
        size: {
            value: `normal`,
            oneOf: [ `small`, `normal`, `large` ],
            stronglyTyped: true
        },
        alignment: {
            value: `center`,
            oneOf: [ `left`, `center`, `right` ],
            stronglyTyped: true
        },
        decoration: {
            value: `none`,
            oneOf: [ `none`, `underline`, `line-through` ],
            stronglyTyped: true
        }
    },
    // bounce: function bounce () {
    //
    // },
    animate: function animate (definition) {
        const component = this;
        const [
            animatedText
        ] = component.lookupComponentRefs(
            `animatedText`
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

        if (Hf.isDefined(animatedText)) {
            if (Hf.isObject(from) && Hf.isObject(to)) {
                animatedText.transition(from, to, duration, easing);
            } else if (!Hf.isObject(from) && Hf.isObject(to)) {
                animatedText.transitionTo(to, duration, easing);
            }
        }
    },
    render: function redner () {
        const component = this;
        const {
            shade,
            color,
            size,
            alignment,
            decoration,
            style,
            children
        } = component.props;
        let themeTextColor;
        let adjustedStyle;

        if (Ht.Theme.color.text.hasOwnProperty(color)) {
            themeTextColor = Ht.Theme.color.text[color][shade];
        } else {
            themeTextColor = color;
        }

        adjustedStyle = Hf.merge(DEFAULT_SUBTITLE_TEXT_STYLE[size]).with({
            flexWrap: `wrap`,
            textAlign: alignment,
            textDecorationLine: decoration,
            color: themeTextColor,
            backgroundColor: `transparent`
        });

        adjustedStyle = Hf.isObject(style) ? Hf.merge(adjustedStyle).with(style) : adjustedStyle;

        return (
            <AnimatedText
                ref = { component.assignComponentRef(`animatedText`) }
                style = { adjustedStyle }
                useNativeDriver = { true }
                ellipsizeMode = 'tail'
                numberOfLines = { 1 }
            >
            {
                children
            }
            </AnimatedText>
        );
    }
});

const SubtitleTextComponent = SubtitleTextInterface({
    name: `subtitle-text`
}).registerComponentLib({
    React,
    ReactNative
}).toComponent(null, {
    componentMethodAndPropertyInclusions: [
        `animate`
    ]
});

export default SubtitleTextComponent;
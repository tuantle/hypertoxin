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
 * @module TitleTextComponent
 * @description - Title text component.
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

import theme from '../../styles/theme';

import fontStyleTemplate from '../../styles/templates/font-style-template';

const {
    Text
} = ReactNative;

const DEFAULT_TITLE_TEXT_STYLE = {
    small: fontStyleTemplate.boldSmall,
    normal: fontStyleTemplate.bold,
    large: fontStyleTemplate.boldLarge
};

const TitleTextInterface = Hf.Interface.augment({
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
    pureRender: function pureRender (property) {
        const {
            shade,
            color,
            size,
            alignment,
            decoration,
            style,
            children
        } = Hf.fallback({
            shade: `dark`,
            color: `default`,
            size: `normal`,
            alignment: `center`,
            decoration: `none`
        }).of(property);
        let themeTextColor;
        let adjustedStyle;

        if (theme.color.text.hasOwnProperty(color)) {
            themeTextColor = theme.color.text[color][shade];
        } else {
            themeTextColor = color;
        }

        adjustedStyle = Hf.merge(DEFAULT_TITLE_TEXT_STYLE[size]).with({
            flexWrap: `wrap`,
            textAlign: alignment,
            textDecorationLine: decoration,
            color: themeTextColor,
            backgroundColor: `transparent`
        });

        adjustedStyle = Hf.isObject(style) ? Hf.merge(adjustedStyle).with(style) : adjustedStyle;

        return (
            <Text
                style = { adjustedStyle }
                ellipsizeMode = 'tail'
                numberOfLines = { 1 }
            >
            {
                children
            }
            </Text>
        );
    }
});

const TitleTextComponent = TitleTextInterface({
    name: `title-text`
}).registerComponentLib({
    React,
    ReactNative
}).toPureComponent();

export default TitleTextComponent;

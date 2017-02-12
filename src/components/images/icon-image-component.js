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
 * @module IconImageComponent
 * @description - Icon image component.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 *------------------------------------------------------------------------
 */
'use strict'; // eslint-disable-line

import { Hf } from 'hyperflow';

import React from 'react';

import ReactNative from 'react-native';

import { Imagw as AnimatedImage } from 'react-native-animatable';

import dropShadowStyleTemplate from '../../styles/templates/drop-shadow-style-template';

import theme from '../../styles/theme';

const {
    Image
} = ReactNative;

const DEFAULT_ICON_IMAGE_STYLE = {
    small: {
        width: 16,
        height: 16,
        margin: 3,
        padding: 3,
        backgroundColor: `transparent`
    },
    normal: {
        width: 24,
        height: 24,
        margin: 3,
        padding: 3,
        backgroundColor: `transparent`
    },
    large: {
        width: 32,
        height: 32,
        margin: 3,
        padding: 3,
        backgroundColor: `transparent`
    }
};

const IconImageInterface = Hf.Interface.augment({
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
        shade: {
            value: `dark`,
            oneOf: [ `light`, `dark` ],
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
        },
        iconColor: {
            value: `default`,
            stronglyTyped: true
        },
        iconPreset: {
            value: ``,
            stronglyTyped: true
        }
    },
    pureRender: function pureRender (property) {
        const {
            animatableRef,
            shade,
            size,
            dropShadow,
            iconColor,
            iconPreset,
            customIcon,
            style
        } = Hf.fallback({
            shade: `dark`,
            size: `normal`,
            dropShadow: true,
            iconColor: `default`,
            iconPreset: ``,
            customIcon: null
        }).of(property);
        const animated = false;
        let icon = customIcon;
        let themedIconColor;
        let adjustedStyle;

        if (theme.color.icon.hasOwnProperty(iconColor)) {
            themedIconColor = theme.color.icon[iconColor][shade];
        } else {
            themedIconColor = iconColor;
        }

        if (!Hf.isEmpty(iconPreset) && !Hf.isDefined(icon)) {
            if (theme.icon.hasOwnProperty(Hf.dashToCamelcase(iconPreset))) {
                icon = theme.icon[Hf.dashToCamelcase(iconPreset)];
            } else {
                Hf.log(`warn1`, `IconImageInterface - Icon preset:${iconPreset} is not found.`);
            }
        }

        adjustedStyle = dropShadow ? Hf.merge(DEFAULT_ICON_IMAGE_STYLE[size]).with({
            ...dropShadowStyleTemplate,
            tintColor: themedIconColor
        }) : Hf.merge(DEFAULT_ICON_IMAGE_STYLE[size]).with({
            tintColor: themedIconColor
        });

        adjustedStyle = Hf.isObject(style) ? Hf.merge(adjustedStyle).with(style) : adjustedStyle;

        if (animated) {
            return (
                <AnimatedImage
                    ref = { animatableRef }
                    style = { adjustedStyle }
                    source = {
                        Hf.isString(icon) ? {
                            uri: icon,
                            isStatic: true
                        } : icon
                    }
                    resizeMode = 'cover'
                    useNativeDriver = { true }
                />
            );
        } else {
            return (
                <Image
                    style = { adjustedStyle }
                    source = {
                        Hf.isString(icon) ? {
                            uri: icon,
                            isStatic: true
                        } : icon
                    }
                    resizeMode = 'cover'
                />
            );
        }
    }
});

const IconImageComponent = IconImageInterface({
    name: `icon-image`
}).registerComponentLib({
    React,
    ReactNative
}).toPureComponent();

export default IconImageComponent;

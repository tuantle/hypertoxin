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
        },
        iconPreset: {
            value: ``,
            stronglyTyped: true
        }
    },
    pureRender: function pureRender (property) {
        const {
            animatableComponentRef,
            shade,
            color,
            customColor,
            size,
            dropShadow,
            animation,
            animationSpeed,
            iconPreset,
            customIcon,
            style
        } = Hf.fallback({
            shade: `dark`,
            color: `default`,
            customColor: ``,
            size: `normal`,
            dropShadow: true,
            animation: `none`,
            animationSpeed: `normal`,
            iconPreset: ``,
            customIcon: null
        }).of(property);
        const animated = animation !== `none`;
        const themedIconColor = theme.color.icon[color][shade];
        let animationType;
        let animationDuration;
        let icon = customIcon;
        let adjustedStyle = dropShadow ? Hf.merge(DEFAULT_ICON_IMAGE_STYLE[size]).with({
            ...dropShadowStyleTemplate,
            tintColor: Hf.isEmpty(customColor) ? themedIconColor : customColor
        }) : Hf.merge(DEFAULT_ICON_IMAGE_STYLE[size]).with({
            tintColor: Hf.isEmpty(customColor) ? themedIconColor : customColor
        });

        adjustedStyle = Hf.isObject(style) ? Hf.merge(adjustedStyle).with(style) : adjustedStyle;

        if (!Hf.isEmpty(iconPreset) && icon === null) {
            if (theme.icon.hasOwnProperty(Hf.dashToCamelcase(iconPreset))) {
                icon = theme.icon[Hf.dashToCamelcase(iconPreset)];
            } else {
                Hf.log(`warn1`, `IconImageInterface - Icon preset:${iconPreset} is not found.`);
            }
        }

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
                        Hf.isString(icon) ? {
                            uri: icon,
                            isStatic: true
                        } : icon
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

export default IconImageInterface;

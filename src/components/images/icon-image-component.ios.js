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

import { Ht } from '../../hypertoxin';

import dropShadowStyleTemplate from '../../styles/templates/drop-shadow-style-template';

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
            shade,
            size,
            dropShadow,
            iconColor,
            iconPreset,
            customIcon,
            style
        } = component.props;
        let icon = Hf.isDefined(customIcon) ? customIcon : null;
        let themedIconColor;
        let adjustedStyle;

        if (Ht.Theme.color.icon.hasOwnProperty(iconColor)) {
            themedIconColor = Ht.Theme.color.icon[iconColor][shade];
        } else {
            themedIconColor = iconColor;
        }

        if (!Hf.isEmpty(iconPreset) && !Hf.isDefined(icon)) {
            if (Ht.Theme.icon.hasOwnProperty(Hf.dashToCamelcase(iconPreset))) {
                icon = Ht.Theme.icon[Hf.dashToCamelcase(iconPreset)];
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

        return (
            <AnimatedImage
                ref = { component.assignComponentRef(`animatedImage`) }
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
    }
});

const IconImageComponent = IconImageInterface({
    name: `icon-image`
}).registerComponentLib({
    React,
    ReactNative
}).toComponent(null, {
    componentMethodAndPropertyInclusions: [
        `animate`
    ]
});

export default IconImageComponent;

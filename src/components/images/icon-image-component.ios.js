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
 * @description - Icon image ios component.
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
            value: Ht.Theme.image.icon.shade,
            oneOf: [ `light`, `dark` ],
            stronglyTyped: true
        },
        size: {
            value: Ht.Theme.image.icon.size,
            oneOf: [ `small`, `normal`, `large` ],
            stronglyTyped: true
        },
        dropShadow: {
            value: Ht.Theme.image.icon.dropShadow,
            stronglyTyped: true
        },
        color: {
            value: Ht.Theme.image.icon.color,
            stronglyTyped: true
        },
        preset: {
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
            color,
            preset,
            customIcon,
            style
        } = component.props;
        let icon = Hf.isDefined(customIcon) ? customIcon : null;
        let themedColor;
        let adjustedStyle;

        if (Ht.Theme.color.icon.hasOwnProperty(color)) {
            themedColor = Ht.Theme.color.icon[color][shade];
        } else {
            themedColor = color;
        }

        if (!Hf.isEmpty(preset) && icon === null) {
            if (Ht.Theme.icon.hasOwnProperty(Hf.dashToCamelcase(preset))) {
                icon = Ht.Theme.icon[Hf.dashToCamelcase(preset)];
            } else {
                Hf.log(`warn1`, `IconImageInterface - Icon preset:${preset} is not found.`);
            }
        }

        adjustedStyle = dropShadow ? Hf.merge(DEFAULT_ICON_IMAGE_STYLE[size]).with({
            ...dropShadowStyleTemplate,
            tintColor: themedColor
        }) : Hf.merge(DEFAULT_ICON_IMAGE_STYLE[size]).with({
            tintColor: themedColor
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
    ReactNative,
    PropTypes,
    CreateReactClass
}).toComponent(null, {
    componentMethodAndPropertyInclusions: [
        `animate`
    ]
});

export default IconImageComponent;

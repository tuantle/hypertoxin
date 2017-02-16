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
 * @module IconButtonComponent
 * @description - Icon button component.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 *------------------------------------------------------------------------
 */
'use strict'; // eslint-disable-line

import { Hf } from 'hyperflow';

import React from 'react';

import ReactNative from 'react-native';

import { View as AnimatedView } from 'react-native-animatable';

import { Ht } from '../../hypertoxin';

import dropShadowStyleTemplate from '../../styles/templates/drop-shadow-style-template';

const {
    Image,
    TouchableOpacity
} = ReactNative;

const DEFAULT_ICON_BUTTON_STYLE = {
    container: {
        justifyContent: `center`,
        alignItems: `center`,
        height: 36,
        width: 36,
        margin: 8,
        padding: 8,
        borderRadius: 18,
        backgroundColor: `transparent`
    }
};

const DEFAULT_ICON_BUTTON_ICON_STYLE = {
    icon: {
        small: {
            width: 16,
            height: 16,
            backgroundColor: `transparent`
        },
        normal: {
            width: 24,
            height: 24,
            backgroundColor: `transparent`
        },
        large: {
            width: 32,
            height: 32,
            backgroundColor: `transparent`
        }
    }
};

const IconButtonInterface = Hf.Interface.augment({
    composites: [
        Hf.React.ComponentComposite
    ],
    state: {
        room: {
            value: `none`,
            oneOf: [
                `none`,
                `header-left`, `header-right`,
                `item-action`,
                `card-header-left`, `card-header-right`,
                `card-action-primary`, `card-action-secondary`
            ],
            stronglyTyped: true
        },
        shade: {
            value: `dark`,
            oneOf: [ `light`, `dark` ],
            stronglyTyped: true
        },
        disabled: {
            value: false,
            stronglyTyped: true
        },
        dropShadowIcon: {
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
        },
        iconSize: {
            value: `normal`,
            oneOf: [ `small`, `normal`, `large` ],
            stronglyTyped: true
        },
        onPress: {
            value: () => {},
            stronglyTyped: true
        }
    },
    // bounce: function bounce () {
    //
    // },
    animate: function animate (definition) {
        const component = this;
        const [
            animatedView
        ] = component.lookupComponentRefs(
            `animatedView`
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

        if (Hf.isDefined(animatedView)) {
            if (Hf.isObject(from) && Hf.isObject(to)) {
                animatedView.transition(from, to, duration, easing);
            } else if (!Hf.isObject(from) && Hf.isObject(to)) {
                animatedView.transitionTo(to, duration, easing);
            }
        }
    },
    render: function render () {
        const component = this;
        const {
            shade,
            disabled,
            dropShadowIcon,
            iconColor,
            iconPreset,
            iconSize,
            customIcon,
            style,
            onPress
        } = component.props;
        let icon = Hf.isDefined(customIcon) ? customIcon : null;
        let themedIconColor;
        let adjustedStyle;

        if (Ht.Theme.color.button.icon.hasOwnProperty(iconColor)) {
            themedIconColor = !disabled ? Ht.Theme.color.button.icon[iconColor][shade] : Ht.Theme.color.button.icon.disabled[shade];
        } else {
            themedIconColor = !disabled ? iconColor : Ht.Theme.color.button.icon.disabled[shade];
        }

        if (!Hf.isEmpty(iconPreset) && icon === null) {
            if (Ht.Theme.icon.hasOwnProperty(Hf.dashToCamelcase(iconPreset))) {
                icon = Ht.Theme.icon[Hf.dashToCamelcase(iconPreset)];
            } else {
                Hf.log(`warn1`, `IconButtonInterface - Icon preset:${iconPreset} is not found.`);
            }
        }

        adjustedStyle = Hf.merge(DEFAULT_ICON_BUTTON_STYLE).with({
            icon: dropShadowIcon ? Hf.merge(DEFAULT_ICON_BUTTON_ICON_STYLE.icon[iconSize]).with({
                ...dropShadowStyleTemplate,
                tintColor: themedIconColor
            }) : Hf.merge(DEFAULT_ICON_BUTTON_ICON_STYLE.icon[iconSize]).with({
                tintColor: themedIconColor
            })
        });

        adjustedStyle = Hf.isObject(style) ? Hf.merge(adjustedStyle).with(style) : adjustedStyle;

        return (
            <AnimatedView
                ref = { component.assignComponentRef(`animatedView`) }
                style = { adjustedStyle.container }
                useNativeDriver = { true }
            >
                <TouchableOpacity
                    style = {{
                        justifyContent: `center`,
                        alignItems: `center`
                    }}
                    onPress = { !disabled ? onPress : null }
                >
                    <Image
                        style = { adjustedStyle.icon }
                        source = {
                            Hf.isString(icon) ? {
                                uri: icon,
                                isStatic: true
                            } : icon
                        }
                        resizeMode = 'cover'
                    />
                </TouchableOpacity>
            </AnimatedView>
        );
    }
});

const IconButtonComponent = IconButtonInterface({
    name: `icon-button`
}).registerComponentLib({
    React,
    ReactNative
}).toComponent(null, {
    componentMethodAndPropertyInclusions: [
        `animate`
    ]
});

export default IconButtonComponent;
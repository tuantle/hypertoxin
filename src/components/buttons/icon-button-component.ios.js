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

import dropShadowStyleTemplate from '../../styles/templates/drop-shadow-style-template';

import theme from '../../styles/theme';

const {
    Image,
    View,
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
    pureRender: function pureRender (property) {
        const {
            animatableRef,
            shade,
            disabled,
            dropShadowIcon,
            iconColor,
            iconPreset,
            iconSize,
            customIcon,
            style,
            onPress
        } = Hf.fallback({
            shade: `dark`,
            disabled: false,
            dropShadowIcon: true,
            iconColor: `default`,
            iconPreset: ``,
            iconSize: `normal`,
            customIcon: null
        }).of(property);
        const animated = false;
        let icon = customIcon;
        let themedIconColor;
        let adjustedStyle;

        if (theme.color.button.icon.hasOwnProperty(iconColor)) {
            themedIconColor = !disabled ? theme.color.button.icon[iconColor][shade] : theme.color.button.icon.disabled[shade];
        } else {
            themedIconColor = !disabled ? iconColor : theme.color.button.icon.disabled[shade];
        }

        if (!Hf.isEmpty(iconPreset) && icon === null) {
            if (theme.icon.hasOwnProperty(Hf.dashToCamelcase(iconPreset))) {
                icon = theme.icon[Hf.dashToCamelcase(iconPreset)];
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

        if (animated) {
            return (
                <AnimatedView
                    ref = { animatableRef }
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
        } else {
            return (
                <View style = { adjustedStyle.container }>
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
                </View>
            );
        }
    }
});

const IconButtonComponent = IconButtonInterface({
    name: `icon-button`
}).registerComponentLib({
    React,
    ReactNative
}).toPureComponent();

export default IconButtonComponent;

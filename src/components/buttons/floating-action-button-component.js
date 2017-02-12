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
 * @module FloatingActionButtonComponent
 * @description - Floating action button component.
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

import theme from '../../styles/theme';

import dropShadowStyleTemplate from '../../styles/templates/drop-shadow-style-template';

const {
    Image,
    View,
    TouchableOpacity
} = ReactNative;

const DEFAULT_FLOATING_ACTION_BUTTON_STYLE = {
    container: {
        mini: {
            ...dropShadowStyleTemplate,
            justifyContent: `center`,
            alignItems: `center`,
            width: 40,
            height: 40,
            margin: 8,
            padding: 8,
            borderRadius: 20,
            backgroundColor: `transparent`
        },
        normal: {
            ...dropShadowStyleTemplate,
            justifyContent: `center`,
            alignItems: `center`,
            width: 48,
            height: 48,
            margin: 8,
            padding: 8,
            borderRadius: 24,
            backgroundColor: `transparent`
        }
    }
};

const DEFAULT_FLOATING_ACTION_BUTTON_ICON_STYLE = {
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

const FloatingActionButtonInterface = Hf.Interface.augment({
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
                `card-action-primary`, `card-action-secondary`
            ],
            stronglyTyped: true
        },
        shade: {
            value: `dark`,
            oneOf: [ `light`, `dark` ],
            stronglyTyped: true
        },
        mini: {
            value: false,
            stronglyTyped: true
        },
        disabled: {
            value: false,
            stronglyTyped: true
        },
        color: {
            value: `default`,
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
            mini,
            disabled,
            color,
            iconColor,
            iconPreset,
            iconSize,
            customIcon,
            style,
            onPress
        } = Hf.fallback({
            shade: `light`,
            mini: false,
            disabled: false,
            color: `default`,
            iconColor: `default`,
            iconPreset: ``,
            iconSize: `normal`,
            customIcon: null
        }).of(property);
        const animated = false;
        let icon = customIcon;
        let themedColor;
        let themedIconColor;
        let adjustedStyle;

        if (theme.color.button.floatingAction.container.hasOwnProperty(color)) {
            themedColor = !disabled ? theme.color.button.floatingAction.container[color][shade] : theme.color.button.floatingAction.container.disabled[shade];
        } else {
            themedColor = !disabled ? color : theme.color.button.floatingAction.container.disabled[shade];
        }

        if (theme.color.button.floatingAction.icon.hasOwnProperty(iconColor)) {
            themedIconColor = !disabled ? theme.color.button.floatingAction.icon[color][shade] : theme.color.button.floatingAction.icon.disabled[shade];
        } else {
            themedIconColor = !disabled ? iconColor : theme.color.button.floatingAction.icon.disabled[shade];
        }

        if (!Hf.isEmpty(iconPreset) && icon === null) {
            if (theme.icon.hasOwnProperty(Hf.dashToCamelcase(iconPreset))) {
                icon = theme.icon[Hf.dashToCamelcase(iconPreset)];
            } else {
                Hf.log(`warn1`, `FloatingActionButtonInterface - Icon preset:${iconPreset} is not found.`);
            }
        }

        adjustedStyle = {
            container: mini ? Hf.merge(DEFAULT_FLOATING_ACTION_BUTTON_STYLE.container.mini).with({
                backgroundColor: themedColor
            }) : Hf.merge(DEFAULT_FLOATING_ACTION_BUTTON_STYLE.container.normal).with({
                backgroundColor: themedColor
            }),
            icon: Hf.merge(DEFAULT_FLOATING_ACTION_BUTTON_ICON_STYLE.icon[iconSize]).with({
                tintColor: themedIconColor
            })
        };

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

const FloatingActionButtonComponent = FloatingActionButtonInterface({
    name: `floating-action-button`
}).registerComponentLib({
    React,
    ReactNative
}).toPureComponent();

export default FloatingActionButtonComponent;

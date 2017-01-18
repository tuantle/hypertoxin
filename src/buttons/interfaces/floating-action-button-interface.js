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
 * @module FloatingActionButtonInterface
 * @description -  Floating action button interface.
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
    },
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
        color: {
            value: `default`,
            oneOf: [ `default`, `primary`, `secondary` ],
            stronglyTyped: true
        },
        customColor: {
            value: ``,
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
            animatableComponentRef,
            color,
            customColor,
            mini,
            disabled,
            animation,
            animationSpeed,
            iconPreset,
            iconSize,
            customIcon,
            style,
            onPress
        } = Hf.fallback({
            color: `default`,
            customColor: ``,
            mini: false,
            disabled: false,
            animation: `none`,
            animationSpeed: `normal`,
            iconPreset: ``,
            iconSize: `normal`,
            customIcon: null
        }).of(property);
        const themedColor = !disabled ? theme.color.button.floatingAction.container[color] : theme.color.button.floatingAction.container.disabled;
        const themedIconColor = !disabled ? theme.color.button.floatingAction.icon[color] : theme.color.button.floatingAction.icon.disabled;
        const animated = animation !== `none`;
        let animationType;
        let animationDuration;
        let icon = customIcon;
        let adjustedStyle = {
            container: mini ? Hf.merge(DEFAULT_FLOATING_ACTION_BUTTON_STYLE.container.mini).with({
                backgroundColor: Hf.isEmpty(customColor) ? themedColor : customColor
            }) : Hf.merge(DEFAULT_FLOATING_ACTION_BUTTON_STYLE.container.normal).with({
                backgroundColor: Hf.isEmpty(customColor) ? themedColor : customColor
            }),
            icon: Hf.merge(DEFAULT_FLOATING_ACTION_BUTTON_STYLE.icon[iconSize]).with({
                tintColor: themedIconColor
            })
        };

        adjustedStyle = Hf.isObject(style) ? Hf.merge(adjustedStyle).with(style) : adjustedStyle;

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

        if (!Hf.isEmpty(iconPreset) && icon === null) {
            if (theme.icon.hasOwnProperty(Hf.dashToCamelcase(iconPreset))) {
                icon = theme.icon[Hf.dashToCamelcase(iconPreset)];
            } else {
                Hf.log(`warn1`, `FloatingActionButtonInterface - Icon preset:${iconPreset} is not found.`);
            }
        }

        if (animated) {
            return (
                <AnimatedView
                    ref = { animatableComponentRef }
                    style = { adjustedStyle.container }
                    animation = { animationType }
                    duration = { animationDuration }
                    useNativeDriver = { true }
                >
                    <TouchableOpacity onPress = { !disabled ? onPress : null }>
                        <View style = { adjustedStyle.container }>
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
                        </View>
                    </TouchableOpacity>
                </AnimatedView>
            );
        } else {
            return (
                <TouchableOpacity onPress = { !disabled ? onPress : null }>
                    <View style = { adjustedStyle.container }>
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
                    </View>
                </TouchableOpacity>
            );
        }
    }
});

export default FloatingActionButtonInterface;

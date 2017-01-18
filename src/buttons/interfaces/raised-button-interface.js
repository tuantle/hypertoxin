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
 * @module RaisedButtonInterface
 * @description - Raised button interface.
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

import fontStyleTemplate from '../../styles/templates/font-style-template';

import dropShadowStyleTemplate from '../../styles/templates/drop-shadow-style-template';

const {
    Text,
    Image,
    View,
    ActivityIndicator,
    TouchableOpacity
} = ReactNative;

const DEFAULT_RAISED_BUTTON_STYLE = {
    container: {
        ...dropShadowStyleTemplate,
        flexDirection: `row`,
        justifyContent: `center`,
        alignItems: `center`,
        height: 36,
        margin: 8,
        padding: 8,
        borderRadius: 2
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
    },
    label: {
        ...fontStyleTemplate.normalLarge,
        marginHorizontal: 8,
        backgroundColor: `transparent`
    }
};

const RaisedButtonInterface = Hf.Interface.augment({
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
        shape: {
            value: `square`,
            oneOf: [ `square`, `round` ],
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
        busy: {
            value: false,
            stronglyTyped: true
        },
        label: {
            value: ``,
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
            shape,
            disabled,
            animation,
            animationSpeed,
            busy,
            label,
            iconPreset,
            iconSize,
            customIcon,
            style,
            onPress
        } = Hf.fallback({
            shade: `dark`,
            color: `default`,
            customColor: ``,
            shape: `square`,
            disabled: false,
            animation: `none`,
            animationSpeed: `normal`,
            busy: false,
            label: `Raised Button`,
            iconPreset: ``,
            iconSize: `normal`,
            customIcon: null
        }).of(property);
        const themedColor = !disabled ? theme.color.button.raised.container[color] : theme.color.button.raised.container.disabled;
        const themedLabelColor = !disabled ? theme.color.button.raised.label[color] : theme.color.button.raised.label.disabled;
        const themedIconColor = !disabled ? theme.color.button.raised.icon[color] : theme.color.button.raised.icon.disabled;
        const animated = animation !== `none`;
        let animationType;
        let animationDuration;
        let icon = customIcon;
        let adjustedStyle = {
            container: Hf.merge(DEFAULT_RAISED_BUTTON_STYLE.container).with({
                borderRadius: shape === `square` ? 2 : 18,
                backgroundColor: Hf.isEmpty(customColor) ? themedColor : customColor
            }),
            label: Hf.merge(DEFAULT_RAISED_BUTTON_STYLE.label).with({
                color: themedLabelColor
            }),
            icon: Hf.merge(DEFAULT_RAISED_BUTTON_STYLE.icon[iconSize]).with({
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
                Hf.log(`warn1`, `RaisedButtonInterface - Icon preset:${iconPreset} is not found.`);
            }
        }

        if (animated) {
            return (
                <AnimatedView
                    ref = { animatableComponentRef }
                    animation = { animationType }
                    duration = { animationDuration }
                    useNativeDriver = { true }
                >
                    <TouchableOpacity onPress = { !disabled ? onPress : null }>
                    {
                        busy ? <ActivityIndicator size = 'small'/> :
                        <View style = { adjustedStyle.container }>
                        {
                            icon === null ? null :
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
                        }
                            <Text style = { adjustedStyle.label }>{ label }</Text>
                        </View>
                    }
                    </TouchableOpacity>
                </AnimatedView>
            );
        } else {
            return (
                <TouchableOpacity onPress = { !disabled ? onPress : null }>
                {
                    busy ? <ActivityIndicator size = 'small'/> :
                    <View style = { adjustedStyle.container }>
                    {
                        icon === null ? null :
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
                    }
                        <Text style = { adjustedStyle.label }>{ label }</Text>
                    </View>
                }
                </TouchableOpacity>
            );
        }
    }
});

export default RaisedButtonInterface;

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
 * @module IconButtonInterface
 * @description -  Icon button interface.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 *------------------------------------------------------------------------
 */
'use strict'; // eslint-disable-line

import { Hf } from 'hyperflow';

import React from 'react';

import ReactNative from 'react-native';

import { MKButton } from 'react-native-material-kit';

import { View as AnimatedView } from 'react-native-animatable';

import dropShadowStyleTemplate from '../../styles/templates/drop-shadow-style-template';

import theme from '../../styles/theme';

const {
    Image
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
        color: {
            value: `default`,
            oneOf: [ `default`, `primary`, `secondary` ],
            stronglyTyped: true
        },
        customColor: {
            value: ``,
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
        customIcon: {
            value: null
        },
        style: {
            value: null
        },
        onPress: {
            value: () => {},
            stronglyTyped: true
        }
    },
    pureRender: function pureRender (property) {
        const {
            shade,
            color,
            customColor,
            disabled,
            dropShadowIcon,
            animation,
            animationSpeed,
            iconPreset,
            iconSize,
            customIcon,
            style,
            onPress
        } = Hf.fallback({
            shade: `dark`,
            color: `default`,
            customColor: ``,
            disabled: false,
            dropShadowIcon: true,
            animation: `none`,
            animationSpeed: `normal`,
            iconPreset: ``,
            iconSize: `normal`
        }).of(property);
        const themedIconColor = !disabled ? theme.color.button.icon[color][shade] : theme.color.button.icon.disabled[shade];
        const animated = animation !== `none`;
        let animationType;
        let animationDuration;
        let icon = customIcon;
        let adjustedStyle = {
            container: DEFAULT_ICON_BUTTON_STYLE.container,
            icon: dropShadowIcon ? Hf.merge(DEFAULT_ICON_BUTTON_STYLE.icon[iconSize]).with({
                ...dropShadowStyleTemplate,
                tintColor: Hf.isEmpty(customColor) ? themedIconColor : customColor
            }) : Hf.merge(DEFAULT_ICON_BUTTON_STYLE.icon[iconSize]).with({
                tintColor: Hf.isEmpty(customColor) ? themedIconColor : customColor
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
                Hf.log(`warn1`, `IconButtonInterface - Icon preset:${iconPreset} is not found.`);
            }
        }

        const MKIconButton = new MKButton.Builder()
                                         .withStyle(adjustedStyle.container)
                                         .withBackgroundColor(`transparent`)
                                         .withFab(true)
                                         .withAccent(false)
                                         .withRippleLocation(`center`)
                                         .build();

        if (animated) {
            return (
                <AnimatedView
                    ref = { animatableComponentRef }
                    animation = { animationType }
                    duration = { animationDuration }
                >
                    <MKIconButton onPress = { !disabled ? onPress : null }>
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
                    </MKIconButton>
                </AnimatedView>
            );
        } else {
            return (
                <MKIconButton onPress = { !disabled ? onPress : null }>
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
                </MKIconButton>
            );
        }
    }
});

export default IconButtonInterface;

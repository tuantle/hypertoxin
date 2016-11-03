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
 * @module FlatButtonInterface
 * @description - Flat button interface.
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

import theme from '../../styles/theme';

import fontStyleTemplate from '../../styles/templates/font-style-template';

const DEFAULT_FLAT_BUTTON_STYLE = {
    container: {
        justifyContent: `center`,
        alignItems: `center`,
        height: 36,
        margin: 8,
        padding: 8,
        borderRadius: 2
    },
    icon: {
        width: 24,
        height: 24
    },
    label: {
        ...fontStyleTemplate.norlal,
        marginHorizontal: 8
    }
};

const FlatButtonInterface = Hf.Interface.augment({
    composites: [
        Hf.React.ComponentComposite
    ],
    state: {
        room: {
            value: `none`,
            oneOf: [
                `none`,
                `header-left`, `header-right`,
                `card-action`
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
        disabled: {
            value: false,
            stronglyTyped: true
        },
        busy: {
            value: false,
            stronglyTyped: true
        },
        label: {
            value: `Flat Button`,
            stronglyTyped: true
        },
        icon: {
            value: null
        },
        // animation: {
        //     value: `none`,
        //     oneOf: [
        //         `none`,
        //         `ripple`, `bounce`, `rubber-band`, `shake`, `pulse`, `flash`,
        //     ],
        //     stronglyTyped: true
        // },
        // animationSpeed: {
        //     value: `normal`,
        //     oneOf: [ `slow`, `normal`, `fast` ],
        //     stronglyTyped: true
        // },
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
            Text,
            Image,
            View,
            ActivityIndicator
        } = ReactNative;
        const {
            shade,
            color,
            disabled,
            busy,
            label,
            icon,
            style,
            onPress
        } = Hf.fallback({
            shade: `dark`,
            color: `default`,
            disabled: false,
            busy: false,
            label: `Flat Button`
        }).of(property);
        let adjustedStyle = Hf.merge(DEFAULT_FLAT_BUTTON_STYLE).with({
            container: {
                backgroundColor: `transparent`
            },
            label: {
                color: !disabled ? theme.button.flat.label[color][shade] : theme.button.flat.label.disabled[shade],
                backgroundColor: `transparent`
            },
            icon: {
                tintColor: !disabled ? theme.button.flat.icon[color][shade] : theme.button.flat.icon.disabled[shade],
                backgroundColor: `transparent`
            }
        });

        adjustedStyle = Hf.isObject(style) ? Hf.merge(adjustedStyle).with(style) : adjustedStyle;

        const MKFlatButton = MKButton.accentColoredFlatButton()
                                     .withStyle(adjustedStyle.container)
                                     .withMaskBorderRadius(adjustedStyle.container.borderRadius)
                                     .build();

        return (
            <MKFlatButton onPress = { !disabled ? onPress : null }>
            {
                busy ? <ActivityIndicator size = 'small'/> :
                <View
                    style = {{
                        flexDirection: `row`,
                        alignItems: `center`,
                        justifyContent: `space-between`
                    }}
                >
                    {
                        icon === null ? null :
                        <Image
                            style = { adjustedStyle.icon }
                            source = {
                                Hf.isString(icon) ? {
                                    uri: icon
                                } : icon
                            }
                            resizeMode = 'cover'
                        />
                    }
                    <Text style = { adjustedStyle.label }>{ label }</Text>
                </View>
            }
            </MKFlatButton>
        );
    }
});

export default FlatButtonInterface;

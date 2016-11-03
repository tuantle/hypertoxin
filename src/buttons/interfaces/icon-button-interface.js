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

import theme from '../../styles/theme';

const DEFAULT_ICON_BUTTON_STYLE = {
    container: {
        justifyContent: `center`,
        alignItems: `center`,
        height: 36,
        width: 36,
        margin: 8,
        padding: 8,
        borderRadius: 18
    },
    icon: {
        width: 24,
        height: 24
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
        icon: {
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
            Image
        } = ReactNative;
        const {
            shade,
            color,
            disabled,
            icon,
            style,
            onPress
        } = Hf.fallback({
            shade: `dark`,
            color: `default`,
            disabled: false
        }).of(property);
        let adjustedStyle = Hf.merge(DEFAULT_ICON_BUTTON_STYLE).with({
            container: {
                backgroundColor: `transparent`
            },
            icon: {
                tintColor: !disabled ? theme.button.icon[color][shade] : theme.button.icon.disabled[shade],
                backgroundColor: `transparent`
            }
        });

        adjustedStyle = Hf.isObject(style) ? Hf.merge(adjustedStyle).with(style) : adjustedStyle;

        const MKIconButton = new MKButton.Builder()
                                         .withStyle(adjustedStyle.container)
                                         .withBackgroundColor(`transparent`)
                                         .withFab(true)
                                         .withAccent(false)
                                         .withRippleLocation(`center`)
                                         .build();
        return (
            <MKIconButton onPress = { !disabled ? onPress : null }>
                <Image
                    style = { adjustedStyle.icon }
                    source = {
                        Hf.isString(icon) ? {
                            uri: icon
                        } : icon
                    }
                    resizeMode = 'cover'
                />
            </MKIconButton>
        );
    }
});

export default IconButtonInterface;

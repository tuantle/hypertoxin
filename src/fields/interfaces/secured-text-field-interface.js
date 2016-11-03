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
 * @module SecureTextFieldInterface
 * @description - Secure text field input interface.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 *------------------------------------------------------------------------
 */
'use strict'; // eslint-disable-line

import { Hf } from 'hyperflow';

import React from 'react';

import ReactNative from 'react-native';

import { MKTextField } from 'react-native-material-kit';

import theme from '../../styles/theme';

import fontStyleTemplate from '../../styles/templates/font-style-template';

const DEFAULT_TEXT_FIELD_STYLE = {
    container: {
        flexDirection: `column`,
        alignItems: `stretch`,
        justifyContent: `center`,
        backgroundColor: `transparent`,
        margin: 8,
        padding: 8
    },
    floating: {
        height: 48
    },
    status: {
        ...fontStyleTemplate.italic,
        textAlign: `left`,
        color: theme.palette.red
    },
    textField: {
        small: {
            ...fontStyleTemplate.normal,
            textAlign: `left`
        },
        normal: {
            ...fontStyleTemplate.normalLarge,
            textAlign: `left`
        },
        large: {
            ...fontStyleTemplate.normalLarger,
            textAlign: `left`
        }
    }
};
const SecureTextFieldInterface = Hf.Interface.augment({
    composites: [
        Hf.React.ComponentComposite
    ],
    state: {
        room: {
            value: `none`,
            oneOf: [
                `none`,
                `card-media`, `card-body`
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
        size: {
            value: `normal`,
            oneOf: [ `small`, `normal`, `large` ],
            stronglyTyped: true
        },
        returnKeyType: {
            value: `next`,
            oneOf: [ `next`, `search`, `done`, `send` ],
            stronglyTyped: true
        },
        editable: {
            value: true,
            stronglyTyped: true
        },
        focus: {
            value: false,
            stronglyTyped: true
        },
        placeholder: {
            value: ``,
            stronglyTyped: true
        },
        defaultValue: {
            value: ``,
            stronglyTyped: true
        },
        status: {
            value: ``,
            stronglyTyped: true
        },
        style: {
            value: null
        },
        componentRef: {
            value: null
        },
        onSubmitEdit: {
            value: () => {},
            stronglyTyped: true
        },
        onFocus: {
            value: () => {},
            stronglyTyped: true
        },
        onBlur: {
            value: () => {},
            stronglyTyped: true
        }
    },
    pureRender: function pureRender (property) {
        const {
            Text,
            View
        } = ReactNative;
        const {
            shade,
            color,
            customColor,
            size,
            returnKeyType,
            editable,
            focus,
            placeholder,
            defaultValue,
            status,
            style,
            componentRef,
            onSubmitEdit,
            onFocus,
            onBlur
        } = Hf.fallback({
            shade: `dark`,
            color: `default`,
            customColor: ``,
            size: `normal`,
            returnKeyType: `next`,
            editable: true,
            focus: false,
            placeholder: ``,
            defaultValue: ``,
            status: ``
        }).of(property);
        let adjustedStyle = Hf.merge(DEFAULT_TEXT_FIELD_STYLE).with({
            textField: {
                small: {
                    color: Hf.isEmpty(customColor) ? theme.text[color][shade] : customColor
                },
                normal: {
                    color: Hf.isEmpty(customColor) ? theme.text[color][shade] : customColor
                },
                large: {
                    color: Hf.isEmpty(customColor) ? theme.text[color][shade] : customColor
                }
            }
        });

        adjustedStyle = Hf.isObject(style) ? Hf.merge(adjustedStyle).with(style) : adjustedStyle;

        const Textfield = MKTextField.textfieldWithFloatingLabel()
                                     .withPassword(true)
                                     .withFloatingLabelEnabled(Hf.isEmpty(defaultValue))
                                     .withPlaceholder(placeholder)
                                     .withDefaultValue(defaultValue)
                                     .withStyle(adjustedStyle.floating)
                                     .withTextInputStyle(adjustedStyle.textField[size])
                                     .withHighlightColor(adjustedStyle.textField[size].color)
                                     .withFloatingLabelFont(adjustedStyle.textField[size])
                                     .withUnderlineSize(1)
                                     .withOnEndEditing((event) => onSubmitEdit(event.nativeEvent.text))
                                     .withOnSubmitEditing((event) => onSubmitEdit(event.nativeEvent.text))
                                     .withOnFocus(onFocus)
                                     .withOnBlur(onBlur)
                                     .build();

        return (
            <View style = { adjustedStyle.container }>
                <Textfield
                    ref = { componentRef }
                    editable = { editable }
                    focus = { focus }
                    keyboardType = 'default'
                    returnKeyType = { returnKeyType }
                />
                <Text style = { adjustedStyle.status }>{ status }</Text>
            </View>
        );
    }
});

export default SecureTextFieldInterface;

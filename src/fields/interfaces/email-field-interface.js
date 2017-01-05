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
 * @module EmailFieldInterface
 * @description - Email field input interface.
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

const {
    Text,
    View
} = ReactNative;

const DEFAULT_TEXT_FIELD_STYLE = {
    container: {
        flexGrow: 1,
        flexDirection: `column`,
        alignItems: `stretch`,
        justifyContent: `center`,
        backgroundColor: `transparent`,
        marginHorizontal: 8,
        paddingHorizontal: 8,
        marginVertical: 3,
        paddingVertical: 3
    },
    floating: {
        height: 48,
        marginTop: 10
    },
    status: {
        ...fontStyleTemplate.italicSmall,
        textAlign: `left`,
        color: theme.color.palette.red
    },
    textField: {
        small: {
            ...fontStyleTemplate.normal,
            textAlign: `left`,
            height: 24
        },
        normal: {
            ...fontStyleTemplate.normalLarge,
            textAlign: `left`,
            height: 26
        },
        large: {
            ...fontStyleTemplate.normalLarger,
            textAlign: `left`,
            height: 28
        }
    }
};
const EmailFieldInterface = Hf.Interface.augment({
    composites: [
        Hf.React.ComponentComposite
    ],
    state: {
        room: {
            value: `none`,
            oneOf: [
                `none`,
                `item-media`,
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
            value: `default`,
            oneOf: [ `default`, `next`, `done` ],
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
        onDoneEdit: {
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
            onDoneEdit,
            onFocus,
            onBlur
        } = Hf.fallback({
            shade: `dark`,
            color: `default`,
            customColor: ``,
            size: `normal`,
            returnKeyType: `default`,
            editable: true,
            focus: false,
            placeholder: ``,
            defaultValue: ``,
            status: ``
        }).of(property);
        let adjustedStyle = {
            container: DEFAULT_TEXT_FIELD_STYLE.container,
            floating: DEFAULT_TEXT_FIELD_STYLE.floating,
            status: DEFAULT_TEXT_FIELD_STYLE.status,
            textField: Hf.merge(DEFAULT_TEXT_FIELD_STYLE.textField[size]).with({
                color: Hf.isEmpty(customColor) ? theme.color.text[color][shade] : customColor
            })
        };

        adjustedStyle = Hf.isObject(style) ? Hf.merge(adjustedStyle).with(style) : adjustedStyle;

        const Textfield = MKTextField.textfieldWithFloatingLabel()
                                     .withFloatingLabelEnabled(Hf.isEmpty(defaultValue))
                                     .withPlaceholder(placeholder)
                                     .withDefaultValue(defaultValue)
                                     .withStyle(adjustedStyle.floating)
                                     .withTextInputStyle(adjustedStyle.textField)
                                     .withHighlightColor(adjustedStyle.textField.color)
                                     .withFloatingLabelFont(adjustedStyle.textField)
                                     .withUnderlineSize(1)
                                     .withOnEndEditing((event) => onDoneEdit(event.nativeEvent.text))
                                     .withOnFocus(onFocus)
                                     .withOnBlur(onBlur)
                                     .build();

        return (
            <View style = { adjustedStyle.container }>
                <Textfield
                    ref = { componentRef }
                    editable = { editable }
                    focus = { focus }
                    keyboardType = 'email-address'
                    clearButtonMode = 'while-editing'
                    returnKeyType = { returnKeyType }
                />
                <Text style = { adjustedStyle.status }>{ status }</Text>
            </View>
        );
    }
});

export default EmailFieldInterface;

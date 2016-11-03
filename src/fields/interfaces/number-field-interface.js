/**
 * Copyright (c) 2016-present, Boki, Inc. All rights reserved.
 *
 * Licensed TBA
 *
 *------------------------------------------------------------------------
 *
 * @module NumberFieldInterface
 * @description - Number field input interface.
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
const NumberFieldInterface = Hf.Interface.augment({
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
            oneOf: [ `next`, `done` ],
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
        monetary: {
            value: false,
            stronglyTyped: true
        },
        placeholder: {
            value: 0,
            stronglyTyped: true
        },
        defaultValue: {
            value: 0,
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
            monetary,
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
            monetary: false,
            decimalPlaces: 0,
            placeholder: 0,
            defaultValue: 0,
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
                                     .withPassword(false)
                                     .withFloatingLabelEnabled(Hf.isEmpty(`${defaultValue}`))
                                     .withPlaceholder(monetary ? `$${placeholder.toFixed(2)}` : `${placeholder}`)
                                     .withDefaultValue(monetary ? `$${defaultValue.toFixed(2)}` : `${defaultValue}`)
                                     .withStyle(adjustedStyle.floating)
                                     .withTextInputStyle(adjustedStyle.textField[size])
                                     .withHighlightColor(adjustedStyle.textField[size].color)
                                     .withFloatingLabelFont(adjustedStyle.textField[size])
                                     .withUnderlineSize(1)
                                     .withOnEndEditing((event) => {
                                         const text = !Hf.isEmpty(event.nativeEvent.text) ? event.nativeEvent.text : `0`;
                                         if (monetary && text.charAt(0) === `$`) {
                                             onSubmitEdit(parseFloat(text.substring(1)));
                                         } else {
                                             onSubmitEdit(parseFloat(text));
                                         }
                                     })
                                     .withOnSubmitEditing((event) => {
                                         const text = !Hf.isEmpty(event.nativeEvent.text) ? event.nativeEvent.text : `0`;
                                         if (monetary && text.charAt(0) === `$`) {
                                             onSubmitEdit(parseFloat(text.substring(1)));
                                         } else {
                                             onSubmitEdit(parseFloat(text));
                                         }
                                     })
                                     .withOnFocus(onFocus)
                                     .withOnBlur(onBlur)
                                     .build();

        return (
            <View style = { adjustedStyle.container }>
                <Textfield
                    ref = { componentRef }
                    editable = { editable }
                    focus = { focus }
                    keyboardType = 'numeric'
                    returnKeyType = { returnKeyType }
                />
                <Text style = { adjustedStyle.status }>{ status }</Text>
            </View>
        );
    }
});

export default NumberFieldInterface;

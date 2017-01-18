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
 * @module TextFieldInterface
 * @description - Text field input interface.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 *------------------------------------------------------------------------
 */
'use strict'; // eslint-disable-line

import { Hf } from 'hyperflow';

import React from 'react';

import ReactNative from 'react-native';

import theme from '../../styles/theme';

import fontStyleTemplate from '../../styles/templates/font-style-template';

const {
    Text,
    View,
    TextInput
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
    status: {
        ...fontStyleTemplate.italic,
        textAlign: `left`,
        color: theme.color.palette.red
    },
    label: {
        small: {
            ...fontStyleTemplate.normal,
            textAlign: `left`,
            textAlignVertical: `top`,
            height: 28,
            lineHeight: 8
        },
        normal: {
            ...fontStyleTemplate.normalLarge,
            textAlign: `left`,
            textAlignVertical: `top`,
            height: 34,
            lineHeight: 12
        },
        large: {
            ...fontStyleTemplate.normalLarger,
            textAlign: `left`,
            textAlignVertical: `top`,
            height: 40,
            lineHeight: 14
        }
    },
    textInput: {
        small: {
            ...fontStyleTemplate.normal,
            textAlign: `left`,
            textAlignVertical: `top`,
            height: 28,
            lineHeight: 8
        },
        normal: {
            ...fontStyleTemplate.normalLarge,
            textAlign: `left`,
            textAlignVertical: `top`,
            height: 34,
            lineHeight: 12
        },
        large: {
            ...fontStyleTemplate.normalLarger,
            textAlign: `left`,
            textAlignVertical: `top`,
            height: 40,
            lineHeight: 14
        }
    }
};
const TextFieldInterface = Hf.Interface.augment({
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
        customHighlightColor: {
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
            oneOf: [ `default`, `next`, `done`, `search` ],
            stronglyTyped: true
        },
        focus: {
            value: false,
            stronglyTyped: true
        },
        editable: {
            value: true,
            stronglyTyped: true
        },
        multiline: {
            value: false,
            stronglyTyped: true
        },
        label: {
            value: ``,
            stronglyTyped: true
        },
        onValidate: {
            value: () => {},
            stronglyTyped: true
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
    render: function render () {
        const {
            shade,
            color,
            customColor,
            customHighlightColor,
            size,
            returnKeyType,
            focus,
            editable,
            multiline,
            label,
            style,
            onValidate,
            onDoneEdit,
            onFocus,
            onBlur
        } = component.props;
        const {
            height,
            textInput,
        } = component.state;
        let adjustedStyle = {
            container: DEFAULT_TEXT_FIELD_STYLE.container,
            status: DEFAULT_TEXT_FIELD_STYLE.status,
            label: DEFAULT_TEXT_FIELD_STYLE.label[size],
            textInput: Hf.merge(DEFAULT_TEXT_FIELD_STYLE.textInput[size]).with({
                color: Hf.isEmpty(customColor) ? theme.color.text[color][shade] : customColor,
                height: multiline ? DEFAULT_TEXT_FIELD_STYLE.textInput[size].height * 4 : DEFAULT_TEXT_FIELD_STYLE.textInput[size].height
            })
        };

        adjustedStyle = Hf.isObject(style) ? Hf.merge(adjustedStyle).with(style) : adjustedStyle;

        return (
            <View style = { adjustedStyle.container }>
                <TextInput
                    { ...component.props }
                    style = { adjustedStyle.textInput }
                    editable = { editable }
                    multiline = { multiline }
                    keyboardType = 'default'
                    clearButtonMode = 'while-editing'
                    returnKeyType = { returnKeyType }
                    onFocus = {() => {
                        this.setState({isFocused: true});
                        onFocus && onFocus();
                    }}
                    onBlur  = {() => {
                        this.setState({isFocused: false});
                        onBlur && onBlur();
                    }}
                    onChangeText = {(text) => {
                        this.setState({text});
                        onChangeText && onChangeText(text);
                    }}
                    onChange={(event) => {
                        if(autoGrow){
                            this.setState({height: event.nativeEvent.contentSize.height});
                        }
                        onChange && onChange(event);
                    }}
                    onEndEditing = { ((event) => onDoneEdit(event.nativeEvent.text)) }
                    value = { textInput.value }
                />
                <TextInput
                    ref = { component.assignComponentRef(`textInput`) }
                    multiline = { multiline }
                    autoGrow = { multiline }
                    editable = { editable }
                    focus = { focus }
                    label = { label }
                    keyboardType = 'default'
                    clearButtonMode = 'while-editing'
                    returnKeyType = { returnKeyType }
                    highlightColor = { Hf.isEmpty(customHighlightColor) ? theme.color.accent : customHighlightColor }
                    inputStyle = { adjustedStyle.textInput }
                    onEndEditing = { ((event) => onDoneEdit(event.nativeEvent.text)) }
                    onFocus = { onFocus }
                    onBlur = { onBlur }
                />
                <Text style = { adjustedStyle.label }>{ label }</Text>
                {
                    Hf.isEmpty(status) ? null : <Text style = { adjustedStyle.status }>{ status }</Text>
                }
            </View>
        );
    }
});

export default TextFieldInterface;

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
 * @description - Text field input android interface.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 * @flow
 */
'use strict'; // eslint-disable-line

import { Hf } from 'hyperflow';

import React from 'react';

import ReactNative from 'react-native';

import * as Animatable from 'react-native-animatable';

import { Ht } from '../../../hypertoxin';

import fontStyleTemplate from '../../../styles/templates/font-style-template';

import dropShadowStyleTemplate from '../../../styles/templates/drop-shadow-style-template';

import EVENT from '../events/field-event';

const {
    Text,
    Image,
    View,
    TextInput,
    TouchableOpacity
} = ReactNative;

const {
    Text: AnimatedText,
    View: AnimatedView
} = Animatable;

const DEFAULT_TEXT_FIELD_STYLE = {
    container: {
        flexShrink: 1,
        flexDirection: `row`,
        alignItems: `center`,
        justifyContent: `center`,
        marginHorizontal: 8,
        paddingHorizontal: 8,
        marginVertical: 8,
        paddingVertical: 3,
        backgroundColor: `transparent`
    },
    fieldInput: {
        flexDirection: `row`,
        alignItems: `center`,
        justifyContent: `space-between`,
        backgroundColor: `transparent`
    },
    fieldInputText: {
        ...fontStyleTemplate.normalLarge,
        flexGrow: 1,
        textAlign: `left`,
        textAlignVertical: `top`,
        height: 36,
        lineHeight: 4,
        paddingTop: 12
    },
    helperText: {
        ...fontStyleTemplate.normal,
        textAlign: `right`
    },
    hintText: {
        ...fontStyleTemplate.normalLarge,
        textAlign: `left`
    },
    statusText: {
        ...fontStyleTemplate.italic,
        textAlign: `left`
    },
    label: {
        focused: {
            ...fontStyleTemplate.normalLarge,
            position: `absolute`,
            textAlign: `left`,
            textAlignVertical: `top`,
            height: 36,
            lineHeight: 4,
            paddingTop: 12
        },
        blurred: {
            ...fontStyleTemplate.normalLarge,
            position: `absolute`,
            textAlign: `left`,
            textAlignVertical: `top`,
            height: 36,
            lineHeight: 4,
            paddingTop: 26
        }
    },
    underline: {
        focused: {
            height: 2
        },
        blurred: {
            height: 1
        }
    }
};

const DEFAULT_TEXT_FIELD_ICON_STYLE = {
    icon: {
        small: {
            width: 16,
            height: 16,
            marginRight: 8,
            backgroundColor: `transparent`
        },
        normal: {
            width: 24,
            height: 24,
            marginRight: 12,
            backgroundColor: `transparent`
        },
        large: {
            width: 32,
            height: 32,
            marginRight: 16,
            backgroundColor: `transparent`
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
            value: Ht.Theme.field.text.shade,
            oneOf: [ `light`, `dark` ],
            stronglyTyped: true
        },
        fieldInputTextColor: {
            value: Ht.Theme.field.text.fieldInputTextColor,
            stronglyTyped: true
        },
        helperTextColor: {
            value: ``,
            stronglyTyped: true
        },
        hintTextColor: {
            value: ``,
            stronglyTyped: true
        },
        statusTextColor: {
            value: ``,
            stronglyTyped: true
        },
        labelFocusedColor: {
            value: ``,
            stronglyTyped: true
        },
        labelBlurredColor: {
            value: ``,
            stronglyTyped: true
        },
        underlineFocusedColor: {
            value: ``,
            stronglyTyped: true
        },
        underlineBlurredColor: {
            value: ``,
            stronglyTyped: true
        },
        iconFocusedColor: {
            value: ``,
            stronglyTyped: true
        },
        iconBlurredColor: {
            value: ``,
            stronglyTyped: true
        },
        iconPreset: {
            value: ``,
            stronglyTyped: true
        },
        iconSize: {
            value: Ht.Theme.field.text.iconSize,
            oneOf: [ `small`, `normal`, `large` ],
            stronglyTyped: true
        },
        dropShadowIcon: {
            value: Ht.Theme.field.text.dropShadowIcon,
            stronglyTyped: true
        },
        fixedFloatingLabel: {
            value: false,
            stronglyTyped: true
        },
        autoCorrect: {
            value: true,
            stronglyTyped: true
        },
        secured: {
            value: false,
            stronglyTyped: true
        },
        multiline: {
            value: false,
            stronglyTyped: true
        },
        disabled: {
            value: false,
            stronglyTyped: true
        },
        charLimit: {
            value: -1,
            stronglyTyped: true
        },
        initialValue: {
            value: ``,
            stronglyTyped: true
        },
        hint: {
            value: ``,
            stronglyTyped: true
        },
        label: {
            value: ``,
            stronglyTyped: true
        },
        returnKeyType: {
            value: `default`,
            oneOf: [ `default`, `next`, `done` ],
            stronglyTyped: true
        },
        onValidate: {
            value: () => {
                return {
                    validated: false,
                    status: ``
                };
            },
            stronglyTyped: true
        },
        onEditing: {
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
    setup: function setup (done) {
        const intf = this;

        intf.preMountStage(() => {
            intf.outgoing(EVENT.ON.UPDATE_FIELD_INPUT_HEIGHT).emit(() => DEFAULT_TEXT_FIELD_STYLE.fieldInputText.height);
        });

        intf.postMountStage((component) => {
            const [
                fieldInput
            ] = component.lookupComponentRefs(
                `fieldInput`
            );
            const {
                initialValue
            } = component.props;

            if (!Hf.isEmpty(initialValue)) {
                intf.outgoing(EVENT.ON.UPDATE_FIELD_INPUT_VALUE).emit(() => initialValue);
            }

            requestAnimationFrame(() => {
                if (fieldInput !== null) {
                    fieldInput.measure((left, top, width, height) => { // eslint-disable-line
                        intf.outgoing(EVENT.ON.UPDATE_FIELD_INPUT_WIDTH).emit(() => width);
                    });
                }
            });
        });

        intf.preUpdateStage((component) => {
            const {
                fixedFloatingLabel,
                label
            } = component.props;

            if (!fixedFloatingLabel && !Hf.isEmpty(label)) {
                const [
                    animatedLabel,
                    animatedUnderline
                ] = component.lookupComponentRefs(
                    `animatedLabel`,
                    `animatedUnderline`
                );
                const {
                    fieldInput
                } = component.state;

                if (fieldInput.focused) {
                    animatedLabel.transitionTo({
                        top: -12,
                        fontSize: fontStyleTemplate.normal.fontSize,
                        paddingTop: 12
                    });
                    animatedUnderline.transitionTo({
                        maxWidth: fieldInput.width
                    });
                } else {
                    if (Hf.isEmpty(fieldInput.value)) {
                        animatedLabel.transitionTo({
                            top: 0,
                            fontSize: fontStyleTemplate.normalLarge.fontSize,
                            paddingTop: 26
                        });
                    }
                    animatedUnderline.transitionTo({
                        maxWidth: 0
                    });
                }
            }
        });

        done();
    },
    isValidated: function isValidated () {
        const component = this;
        const {
            fieldInput
        } = component.state;
        return fieldInput.validated;
    },
    focus: function focus () {
        const component = this;
        const [
            fieldTextInput
        ] = component.lookupComponentRefs(
            `fieldTextInput`
        );
        fieldTextInput.focus();
    },
    blur: function shoblurw () {
        const component = this;
        const [
            fieldTextInput
        ] = component.lookupComponentRefs(
            `fieldTextInput`
        );
        fieldTextInput.blur();
    },
    clear: function clear () {
        const component = this;
        component.onClearFieldInput();
    },
    onClearFieldInput: function onClearFieldInput () {
        const component = this;
        const {
            disabled
        } = component.props;

        if (!disabled) {
            const [
                fieldTextInput
            ] = component.lookupComponentRefs(
                `fieldTextInput`
            );

            if (Hf.isDefined(fieldTextInput)) {
                fieldTextInput.clear();
                component.outgoing(EVENT.ON.UPDATE_FIELD_INPUT_HEIGHT).emit(() => DEFAULT_TEXT_FIELD_STYLE.fieldInputText.height);
                component.outgoing(EVENT.ON.UPDATE_FIELD_INPUT_VALUE).emit(() => ``);
                component.outgoing(EVENT.ON.UPDATE_FIELD_INPUT_VALUE_CHANGED).emit(() => false);
                component.outgoing(EVENT.ON.CLEAR_FIELD_INPUT_VALIDATION_STATUS).emit();
            }
        }
    },
    renderHintAndFloatingLabel: function renderHintAndFloatingLabel (adjustedStyle) {
        const component = this;
        const {
            hint,
            label
        } = component.props;
        const {
            fieldInput
        } = component.state;

        if (!Hf.isEmpty(label)) {
            return (
                <AnimatedText
                    ref = { component.assignComponentRef(`animatedLabel`) }
                    style = { fieldInput.focused ? adjustedStyle.label.focused : adjustedStyle.label.blurred }
                    duration = { 300 }
                    useNativeDriver = { true }
                >
                {
                    label
                }
                    <Text style = { adjustedStyle.hintText }>{ `\t${hint}` }</Text>
                </AnimatedText>
            );
        } else {
            return null;
        }
    },
    renderUnderline: function renderUnderline (adjustedStyle) {
        const component = this;

        return (
            <View style = { adjustedStyle.underline.blurred }>
                <AnimatedView
                    ref = { component.assignComponentRef(`animatedUnderline`) }
                    style = { adjustedStyle.underline.focused }
                    duration = { 300 }
                    useNativeDriver = { true }
                />
            </View>
        );
    },
    renderStatusAndHelper: function renderStatusAndHelper (adjustedStyle) {
        const component = this;
        const {
            charLimit
        } = component.props;
        const {
            fieldInput
        } = component.state;

        return (
            <View style = {{
                flexDirection: `row`,
                alignItems: `center`,
                justifyContent: `space-between`,
                backgroundColor: `transparent`
            }}>
                <View style = {{
                    alignItems: `flex-start`,
                    justifyContent: `center`,
                    backgroundColor: `transparent`
                }}>
                {
                    fieldInput.validated ? null : <Text style = { adjustedStyle.statusText }>{ fieldInput.status }</Text>
                }
                </View>
                <View style = {{
                    alignItems: `flex-end`,
                    justifyContent: `center`,
                    backgroundColor: `transparent`
                }}>
                {
                    charLimit === -1 ? null : <Text style = { adjustedStyle.helperText }>{ `${fieldInput.value.length} / ${charLimit}` }</Text>
                }
                </View>
            </View>
        );
    },
    renderFieldInput: function renderFieldInput (adjustedStyle) {
        const component = this;
        const {
            autoCorrect,
            secured,
            multiline,
            disabled,
            charLimit,
            hint,
            label,
            returnKeyType,
            onValidate,
            onEditing,
            onDoneEdit,
            onFocus,
            onBlur
        } = component.props;
        const {
            fieldInput
        } = component.state;
        const clearIcon = Ht.Theme.icon[`close`];

        return (
            <View
                ref = { component.assignComponentRef(`fieldInput`) }
                style = { adjustedStyle.fieldInput }
            >
                <TextInput
                    ref = { component.assignComponentRef(`fieldTextInput`) }
                    style = { adjustedStyle.fieldInputText }
                    keyboardType = 'default'
                    underlineColorAndroid = 'transparent'
                    autoCorrect = { autoCorrect }
                    secureTextEntry = { secured }
                    multiline = { multiline }
                    editable = { !disabled }
                    maxLength = { charLimit }
                    defaultValue = { fieldInput.value }
                    placeholder = { Hf.isEmpty(label) ? hint : `` }
                    placeholderTextColor = { adjustedStyle.hintText.color }
                    returnKeyType = { returnKeyType }
                    onFocus = {() => {
                        component.outgoing(EVENT.ON.UPDATE_FIELD_INPUT_FOCUS).emit(() => true);
                        onFocus();
                    }}
                    onBlur = {() => {
                        component.outgoing(EVENT.ON.UPDATE_FIELD_INPUT_FOCUS).emit(() => false);
                        onBlur();
                    }}
                    onChange = {(event) => {
                        if (multiline && !Hf.isEmpty(event.nativeEvent.text)) {
                            component.outgoing(EVENT.ON.UPDATE_FIELD_INPUT_HEIGHT).emit(() => {
                                return DEFAULT_TEXT_FIELD_STYLE.fieldInputText.height * Math.ceil(event.nativeEvent.contentSize.height / DEFAULT_TEXT_FIELD_STYLE.fieldInputText.height);
                            });
                        } else {
                            component.outgoing(EVENT.ON.UPDATE_FIELD_INPUT_HEIGHT).emit(() => DEFAULT_TEXT_FIELD_STYLE.fieldInputText.height);
                        }
                        component.outgoing(EVENT.ON.UPDATE_FIELD_INPUT_VALUE).emit(() => event.nativeEvent.text);
                        component.outgoing(EVENT.ON.UPDATE_FIELD_INPUT_VALUE_CHANGED).emit(() => !Hf.isEmpty(event.nativeEvent.text));

                        if (Hf.isEmpty(event.nativeEvent.text)) {
                            component.outgoing(EVENT.ON.CLEAR_FIELD_INPUT_VALIDATION_STATUS).emit();
                        }

                        onEditing(event.nativeEvent.text);
                    }}
                    onSubmitEditing = {(event) => {
                        component.outgoing(EVENT.ON.UPDATE_FIELD_INPUT_VALIDATION).emit(() => {
                            return {
                                value: event.nativeEvent.text,
                                validate: onValidate
                            };
                        });
                        onDoneEdit(event.nativeEvent.text);
                    }}
                />
                {
                    !fieldInput.valueChanged ?
                    <View style = {{
                        minWidth: 46,
                        minHeight: 46,
                        backgroundColor: `transparent`
                    }}/> :
                    <View style = {{
                        flexDirection: `row`,
                        alignItems: `center`,
                        justifyContent: `center`,
                        minWidth: 46,
                        minHeight: 46,
                        backgroundColor: `transparent`
                    }}>
                        <TouchableOpacity onPress = { component.onClearFieldInput }>
                            <Image
                                style = { fieldInput.focused ? adjustedStyle.icon.focused : adjustedStyle.icon.blurred }
                                resizeMode = 'cover'
                                source = { clearIcon }
                            />
                        </TouchableOpacity>
                    </View>
                }
            </View>
        );
    },
    render: function render () {
        const component = this;
        const {
            shade,
            fieldInputTextColor,
            helperTextColor,
            hintTextColor,
            statusTextColor,
            labelFocusedColor,
            labelBlurredColor,
            underlineFocusedColor,
            underlineBlurredColor,
            iconFocusedColor,
            iconBlurredColor,
            iconPreset,
            customIcon,
            iconSize,
            dropShadowIcon,
            fixedFloatingLabel,
            multiline,
            disabled,
            initialValue,
            style
        } = component.props;
        const {
            fieldInput
        } = component.state;
        let icon = Hf.isDefined(customIcon) ? customIcon : null;
        let adjustedStyle;
        let themedFieldInputTextColor;
        let themedHelperTextColor;
        let themedHintTextColor;
        let themedStatusTextColor;
        let themedLabelFocusedColor;
        let themedLabelBlurredColor;
        let themedUnderlineFocusedColor;
        let themedUnderlineBlurredColor;
        let themedIconFocusedColor;
        let themedIconBlurredColor;

        if (disabled) {
            themedFieldInputTextColor = Ht.Theme.color.text.disabled[shade === `light` ? `dark` : `light`];

            themedLabelFocusedColor = Ht.Theme.color.textField.label.disabled[shade === `light` ? `dark` : `light`];
            themedLabelBlurredColor = themedLabelFocusedColor;

            themedUnderlineFocusedColor = Ht.Theme.color.textField.underline.disabled[shade === `light` ? `dark` : `light`];
            themedUnderlineBlurredColor = themedUnderlineFocusedColor;

            themedIconFocusedColor = Ht.Theme.color.textField.icon.disabled[shade === `light` ? `dark` : `light`];
            themedIconBlurredColor = themedIconFocusedColor;
        } else {
            if (Ht.Theme.color.text.hasOwnProperty(fieldInputTextColor)) {
                themedFieldInputTextColor = Ht.Theme.color.text[fieldInputTextColor][shade === `light` ? `dark` : `light`];
            } else {
                themedFieldInputTextColor = fieldInputTextColor;
            }

            themedLabelFocusedColor = Hf.isEmpty(labelFocusedColor) ? Ht.Theme.color.textField.label.focused[shade === `light` ? `dark` : `light`] : labelFocusedColor;
            themedLabelBlurredColor = Hf.isEmpty(labelBlurredColor) ? Ht.Theme.color.textField.label.blurred[shade === `light` ? `dark` : `light`] : labelBlurredColor;

            themedUnderlineFocusedColor = Hf.isEmpty(underlineFocusedColor) ? Ht.Theme.color.textField.underline.focused[shade === `light` ? `dark` : `light`] : underlineFocusedColor;
            themedUnderlineBlurredColor = Hf.isEmpty(underlineBlurredColor) ? Ht.Theme.color.textField.underline.blurred[shade === `light` ? `dark` : `light`] : underlineBlurredColor;

            themedIconFocusedColor = Hf.isEmpty(iconFocusedColor) ? Ht.Theme.color.textField.icon.focused[shade === `light` ? `dark` : `light`] : iconFocusedColor;
            themedIconBlurredColor = Hf.isEmpty(iconBlurredColor) ? Ht.Theme.color.textField.icon.blurred[shade === `light` ? `dark` : `light`] : iconBlurredColor;
        }

        themedHelperTextColor = Hf.isEmpty(helperTextColor) ? Ht.Theme.color.textField.helper : helperTextColor;
        themedHintTextColor = Hf.isEmpty(hintTextColor) ? Ht.Theme.color.textField.hint : hintTextColor;
        themedStatusTextColor = Hf.isEmpty(statusTextColor) ? Ht.Theme.color.textField.status : statusTextColor;

        if (!Hf.isEmpty(iconPreset) && icon === null) {
            if (Ht.Theme.icon.hasOwnProperty(Hf.dashToCamelcase(iconPreset))) {
                icon = Ht.Theme.icon[Hf.dashToCamelcase(iconPreset)];
            } else {
                Hf.log(`warn1`, `TextFieldInterface - Icon preset:${iconPreset} is not found.`);
            }
        }

        adjustedStyle = Hf.merge(DEFAULT_TEXT_FIELD_STYLE).with({
            fieldInputText: {
                height: multiline ? fieldInput.height : DEFAULT_TEXT_FIELD_STYLE.fieldInputText.height,
                color: themedFieldInputTextColor
            },
            helperText: {
                color: themedHelperTextColor
            },
            hintText: {
                color: themedHintTextColor
            },
            statusText: {
                color: themedStatusTextColor
            },
            label: fixedFloatingLabel ? {
                focused: {
                    top: -12,
                    fontSize: fontStyleTemplate.normal.fontSize,
                    paddingTop: 12,
                    color: themedLabelFocusedColor
                },
                blurred: {
                    top: -12,
                    fontSize: fontStyleTemplate.normal.fontSize,
                    paddingTop: 12,
                    color: themedLabelBlurredColor
                }
            } : {
                focused: {
                    color: themedLabelFocusedColor
                },
                blurred: Hf.isEmpty(initialValue) ? {
                    color: themedLabelBlurredColor
                } : {
                    top: -12,
                    fontSize: fontStyleTemplate.normal.fontSize,
                    paddingTop: 12,
                    color: themedLabelBlurredColor
                }
            },
            underline: {
                focused: {
                    backgroundColor: themedUnderlineFocusedColor
                },
                blurred: {
                    backgroundColor: themedUnderlineBlurredColor
                }
            },
            icon: {
                focused: dropShadowIcon ? Hf.merge(DEFAULT_TEXT_FIELD_ICON_STYLE.icon[iconSize]).with({
                    ...dropShadowStyleTemplate,
                    tintColor: themedIconFocusedColor
                }) : Hf.merge(DEFAULT_TEXT_FIELD_ICON_STYLE.icon[iconSize]).with({
                    tintColor: themedIconFocusedColor
                }),
                blurred: dropShadowIcon ? Hf.merge(DEFAULT_TEXT_FIELD_ICON_STYLE.icon[iconSize]).with({
                    ...dropShadowStyleTemplate,
                    tintColor: themedIconBlurredColor
                }) : Hf.merge(DEFAULT_TEXT_FIELD_ICON_STYLE.icon[iconSize]).with({
                    tintColor: themedIconBlurredColor
                })
            }
        });

        adjustedStyle = Hf.isObject(style) ? Hf.merge(adjustedStyle).with(style) : adjustedStyle;

        return (
            <View style = { adjustedStyle.container }>
            {
                icon === null ? null :
                <Image
                    style = { fieldInput.focused ? adjustedStyle.icon.focused : adjustedStyle.icon.blurred }
                    resizeMode = 'cover'
                    source = {
                        Hf.isString(icon) ? {
                            uri: icon,
                            isStatic: true
                        } : icon
                    }
                />
            }
                <View style = {{
                    flexGrow: 1,
                    flexDirection: `column`,
                    justifyContent: `center`,
                    backgroundColor: `transparent`
                }}>
                {
                    component.renderHintAndFloatingLabel(adjustedStyle)
                }
                {
                    component.renderFieldInput(adjustedStyle)
                }
                {
                    component.renderUnderline(adjustedStyle)
                }
                {
                    component.renderStatusAndHelper(adjustedStyle)
                }
                </View>
            </View>
        );
    }
});

export default TextFieldInterface;

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
 * @module TextFieldComponent
 * @description - Text field input component.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 * @flow
 */
'use strict'; // eslint-disable-line

import { Hf } from 'hyperflow';

import { Ht } from '../../hypertoxin';

import React from 'react';

import ReactNative from 'react-native'; // eslint-disable-line

import PropTypes from 'prop-types';

import * as Animatable from 'react-native-animatable';

import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard';

import debouncer from '../../utils/debouncer';

const {
    Component
} = React;

const {
    Dimensions,
    Text,
    TextInput,
    View
} = ReactNative;

const {
    Text: AnimatedText,
    View: AnimatedView
} = Animatable;

const DEVICE_WIDTH = Dimensions.get(`window`).width;

const DEFAULT_FIELD_DEBOUNCE_TIME_MS = 250;

const DEFAULT_ANIMATION_DURATION_MS = 300;

const DEFAULT_TEXT_FIELD_STYLE = {
    container: {
        flexGrow: 1,
        flexDirection: `column`,
        alignItems: `stretch`,
        alignSelf: `stretch`,
        justifyContent: `center`,
        maxWidth: DEVICE_WIDTH,
        paddingTop: 6,
        paddingHorizontal: 6,
        marginTop: 6,
        marginHorizontal: 6,
        backgroundColor: `transparent`
    },
    box: {
        focused: {
            flexDirection: `column`,
            alignItems: `stretch`,
            justifyContent: `flex-end`,
            height: Ht.Theme.field.size.text.input * 1.55,
            borderWidth: 1,
            borderRadius: 4
        },
        blurred: {
            flexDirection: `column`,
            alignItems: `stretch`,
            justifyContent: `flex-end`,
            height: Ht.Theme.field.size.text.input * 1.55,
            borderWidth: 1,
            borderRadius: 4
        }
    },
    singleLine: {
        flexDirection: `row`,
        alignItems: `center`,
        justifyContent: `center`,
        backgroundColor: `transparent`
    },
    multiLine: {
        flexDirection: `row`,
        alignItems: `flex-end`,
        justifyContent: `center`,
        backgroundColor: `transparent`
    },
    room: {
        contentLeft: {
            flexDirection: `row`,
            alignItems: `center`,
            justifyContent: `center`,
            minWidth: Ht.Theme.field.size.text.input,
            maxHeight: Ht.Theme.field.size.text.input,
            backgroundColor: `transparent`
        },
        actionRight: {
            flexDirection: `row`,
            alignItems: `center`,
            justifyContent: `center`,
            minWidth: Ht.Theme.field.size.text.input,
            maxHeight: Ht.Theme.field.size.text.input,
            backgroundColor: `transparent`
        },
        filler: {
            width: 0,
            height: Ht.Theme.field.size.text.input,
            backgroundColor: `transparent`
        }
    },
    input: {
        ...Ht.Theme.field.font.text.input,
        flexGrow: 1,
        textAlign: `left`,
        minHeight: Ht.Theme.field.size.text.input,
        lineHeight: Ht.Theme.field.size.text.line,
        paddingVertical: 0,
        marginHorizontal: 6,
        marginVertical: 0
    },
    helper: {
        ...Ht.Theme.field.font.text.helper,
        textAlign: `right`,
        paddingRight: 9
    },
    hint: {
        ...Ht.Theme.field.font.text.hint,
        textAlign: `left`,
        paddingRight: 3,
        color: Ht.Theme.field.color.text.hint
    },
    status: {
        ...Ht.Theme.field.font.text.status,
        textAlign: `left`,
        paddingLeft: 6,
        color: Ht.Theme.field.color.text.status
    },
    label: {
        focused: {
            ...Ht.Theme.field.font.text.label.focused,
            position: `absolute`,
            textAlign: `left`,
            lineHeight: Ht.Theme.field.size.text.line,
            paddingTop: 26,
            paddingVertical: 0,
            marginVertical: 0,
            opacity: 0
        },
        blurred: {
            ...Ht.Theme.field.font.text.label.blurred,
            position: `absolute`,
            textAlign: `left`,
            lineHeight: Ht.Theme.field.size.text.line,
            paddingTop: 44,
            paddingVertical: 0,
            marginVertical: 0,
            opacity: 0
        }
    },
    underline: {
        focused: {
            height: Ht.Theme.field.size.text.underline.focused
        },
        blurred: {
            justifyContent: `center`,
            height: Ht.Theme.field.size.text.underline.blurred
        }
    }
};

export default class TextFieldComponent extends Component {
    static propTypes = {
        room: PropTypes.oneOf([
            `none`,
            `content-left`, `content-center`, `content-right`,
            `media`, `overlay`
        ]),
        shade: PropTypes.oneOf([ `light`, `dark` ]),
        overlay: PropTypes.oneOf([ `opaque`, `translucent`, `transparent`, `transparent-outlined` ]),
        focusColor: PropTypes.string,
        blurColor: PropTypes.string,
        autoFocus: PropTypes.bool,
        autoCorrect: PropTypes.bool,
        secured: PropTypes.bool,
        underlined: PropTypes.bool,
        disabled: PropTypes.bool,
        initialValue: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
        label: PropTypes.string,
        hint: PropTypes.string,
        charLimit: PropTypes.number,
        lineLimit: PropTypes.number,
        inputType: PropTypes.oneOf([
            `default`,
            `numeric`, `monetary`, `phone-pad`,
            `email-address`,
            `credit-card-visa`, `credit-card-master`, `credit-card-discover`, `credit-card-american-express`
        ]),
        debounceTime: PropTypes.number,
        onValidate: PropTypes.func,
        onEditing: PropTypes.func,
        onDoneEdit: PropTypes.func,
        onFocus: PropTypes.func,
        onBlur: PropTypes.func
    }
    static defaultProps = {
        room: `none`,
        shade: Ht.Theme.field.text.shade,
        overlay: Ht.Theme.field.text.overlay,
        focusColor: ``,
        blurColor: ``,
        autoFocus: false,
        autoCorrect: false,
        secured: false,
        underlined: Ht.Theme.field.text.underlined,
        disabled: false,
        initialValue: ``,
        label: ``,
        hint: ``,
        charLimit: -1,
        lineLimit: 1,
        inputType: `default`,
        debounceTime: DEFAULT_FIELD_DEBOUNCE_TIME_MS,
        onValidate: (value, inputType) => {
            let regex;
            let status = ``;
            let validated = false;

            switch(inputType) {
            case `email-address`:
                regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

                if (Hf.isEmpty(value)) {
                    status = `Email cannot be empty`;
                } else {
                    validated = regex.test(value);
                    status = validated ? `` : `Email is invalid`;
                }
                break;
            case `phone-pad`:
                regex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

                if (!Hf.isNumeric(value)) {
                    status = `Phone number is invalid`;
                } else {
                    validated = regex.test(`${value}`);
                    status = validated ? `` : `Phone number is invalid`;
                }
                break;
            case `credit-card-visa`:
                regex = /^4[0-9]{12}(?:[0-9]{3})?$/;

                if (!Hf.isNumeric(value)) {
                    status = `Credit card number is invalid`;
                } else {
                    validated = regex.test(`${value}`);
                    status = validated ? `` : `Visa credit card number is invalid`;
                }
                break;
            case `credit-card-master`:
                regex = /^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/;

                if (!Hf.isNumeric(value)) {
                    status = `Credit card number is invalid`;
                } else {
                    validated = regex.test(`${value}`);
                    status = validated ? `` : `Master credit card number is invalid`;
                }
                break;
            case `credit-card-discover`:
                regex = /^6(?:011|5[0-9]{2})[0-9]{12}$/;

                if (!Hf.isNumeric(value)) {
                    status = `Credit card number is invalid`;
                } else {
                    validated = regex.test(`${value}`);
                    status = validated ? `` : `Discover credit card number is invalid`;
                }
                break;
            case `credit-card-american-express`:
                regex = /^3[47][0-9]{13}$/;

                if (!Hf.isNumeric(value)) {
                    status = `Credit card number is invalid`;
                } else {
                    validated = regex.test(`${value}`);
                    status = validated ? `` : `American Express credit card number is invalid`;
                }
                break;
            case `default`:
                break;
            default:
                break;
            }

            return {
                validated,
                status
            };
        },
        onEditing: () => null,
        onDoneEdit: () => null,
        onFocus: () => null,
        onBlur: () => null
    }
    constructor (property) {
        super(property);
        this.refCache = {};
        this.debounce = null;
        this.state = {
            adjustedStyle: DEFAULT_TEXT_FIELD_STYLE,
            input: {
                focused: false,
                left: 0,
                width: 0,
                height: Ht.Theme.field.size.text.input,
                value: ``,
                lineCount: 1
            },
            box: {
                width: 0,
                height: Ht.Theme.field.size.text.input * 1.55
            },
            validation: {
                validated: true,
                status: ``
            }
        };
    }
    /**
     * @description - Helper method to readjust current style.
     *
     * @method _readjustStyle
     * @param {object} newStyle
     * @returns {object}
     * @private
     */
    _readjustStyle = (newStyle = {
        shade: Ht.Theme.field.text.shade,
        overlay: Ht.Theme.field.text.overlay,
        focusColor: ``,
        blurColor: ``,
        disabled: false,
        lineLimit: 1
    }) => {
        const component = this;
        const {
            shade,
            overlay,
            focusColor,
            blurColor,
            disabled,
            lineLimit,
            style
        } = Hf.fallback({
            shade: Ht.Theme.field.text.shade,
            overlay: Ht.Theme.field.text.overlay,
            focusColor: ``,
            blurColor: ``,
            disabled: false,
            lineLimit: 1
        }).of(newStyle);
        const {
            adjustedStyle: prevAdjustedStyle
        } = component.state;
        let themedBoxColor;
        let themedBoxBorderFocusColor;
        let themedBoxBorderBlurColor;
        let themedInputColor;
        let themedHelperColor;
        let themedFocusColor;
        let themedBlurColor;

        if (disabled) {
            themedFocusColor = Ht.Theme.field.color.text.disabled[shade];
            themedBlurColor = themedFocusColor;
            themedInputColor = themedFocusColor;
        } else {
            themedFocusColor = Hf.isEmpty(focusColor) ? Ht.Theme.field.color.text.focused[shade] : focusColor;
            themedBlurColor = Hf.isEmpty(blurColor) ? Ht.Theme.field.color.text.blurred[shade] : blurColor;
            themedInputColor = Ht.Theme.field.color.text.input[shade];
        }

        themedHelperColor = Ht.Theme.field.color.text.helper[shade];

        switch (overlay) { // eslint-disable-line
        case `opaque`:
            themedBoxColor = Ht.Theme.field.color.text.box[shade];
            themedBoxBorderFocusColor = `transparent`;
            themedBoxBorderBlurColor = `transparent`;
            break;
        case `translucent`:
            themedBoxColor = Ht.Theme.field.color.text.box[shade];
            themedBoxBorderFocusColor = `transparent`;
            themedBoxBorderBlurColor = `transparent`;
            break;
        case `transparent`:
            themedBoxColor = `transparent`;
            themedBoxBorderFocusColor = `transparent`;
            themedBoxBorderBlurColor = `transparent`;
            break;
        case `transparent-outlined`:
            themedBoxColor = `transparent`;
            themedBoxBorderFocusColor = themedFocusColor;
            themedBoxBorderBlurColor = themedBlurColor;
            break;
        }

        const adjustedStyle = Hf.merge(prevAdjustedStyle).with({
            box: {
                focused: {
                    borderColor: themedBoxBorderFocusColor,
                    backgroundColor: themedBoxColor
                },
                blurred: {
                    borderColor: themedBoxBorderBlurColor,
                    backgroundColor: themedBoxColor
                }
            },
            input: {
                paddingTop: lineLimit === -1 || lineLimit > 1 ? 9 : 0,
                color: themedInputColor
            },
            helper: {
                color: themedHelperColor
            },
            label: {
                focused: {
                    color: themedFocusColor
                },
                blurred: {
                    color: themedBlurColor
                }
            },
            underline: {
                focused: {
                    backgroundColor: themedFocusColor
                },
                blurred: {
                    alignItems: overlay === `transparent` ? `flex-start` : `center`,
                    backgroundColor: themedBlurColor
                }
            }
        });

        return Hf.isObject(style) ? Hf.merge(adjustedStyle).with({
            container: style
        }) : adjustedStyle;
    }
    /**
     * @description - Assign the registered component's reference object.
     *
     * @method assignComponentRef
     * @param {string} refName
     * @returns function
     */
    assignComponentRef = (refName) => {
        const component = this;

        if (Hf.DEVELOPMENT) {
            if (!Hf.isString(refName)) {
                Hf.log(`error`, `TextFieldComponent.assignComponentRef - Input component reference name is invalid.`);
            }
        }

        /* helper function to set component ref */
        const setComponentRef = function setComponentRef (componentRef) {
            component.refCache[refName] = Hf.isDefined(componentRef) ? componentRef : null;
        };
        return setComponentRef;
    }
    /**
     * @description - Lookup the registered component's reference object.
     *
     * @method lookupComponentRefs
     * @param {array} refNames
     * @returns {array}
     */
    lookupComponentRefs = (...refNames) => {
        const component = this;
        let componentRefs = [];

        if (!Hf.isEmpty(refNames)) {
            if (Hf.DEVELOPMENT) {
                if (!refNames.every((refName) => Hf.isString(refName))) {
                    Hf.log(`error`, `TextFieldComponent.lookupComponentRefs - Input component reference name is invalid.`);
                } else if (!refNames.every((refName) => component.refCache.hasOwnProperty(refName))) {
                    Hf.log(`error`, `TextFieldComponent.lookupComponentRefs - Component reference is not found.`);
                }
            }

            componentRefs = Hf.collect(...refNames).from(component.refCache);
        } else {
            Hf.log(`error`, `TextFieldComponent.lookupComponentRefs - Input component reference name array is empty.`);
        }

        return componentRefs;
    }
    isValidated = () => {
        const component = this;
        const {
            validation
        } = component.state;
        return validation.validated;
    }
    clear = () => {
        const component = this;
        const {
            disabled
        } = component.props;

        if (!disabled) {
            const [ textInput ] = component.lookupComponentRefs(`text-input`);

            component.setState((prevState) => {
                return {
                    input: {
                        ...prevState.input,
                        value: ``,
                        lineCount: 1
                    },
                    box: {
                        ...prevState.box,
                        height: Ht.Theme.field.size.text.input * 1.55
                    },
                    validation: {
                        validated: true,
                        status: ``
                    }
                };
            }, () => {
                textInput.clear();
            });
        }
    }
    onFocus = () => {
        const component = this;
        const {
            onFocus
        } = component.props;

        component.setState((prevState) => {
            return {
                input: {
                    ...prevState.input,
                    focused: true
                }
            };
        }, () => {
            onFocus();
        });
    }
    onBlur = () => {
        const component = this;
        const {
            onBlur
        } = component.props;

        component.setState((prevState) => {
            return {
                input: {
                    ...prevState.input,
                    focused: false
                }
            };
        }, () => {
            onBlur();
        });
    }
    onUpdateInputSize = (event) => {
        const component = this;
        const {
            lineLimit
        } = component.props;
        const {
            input
        } = component.state;
        const {
            width,
            height
        } = event.nativeEvent.contentSize;

        if ((lineLimit === -1 || lineLimit > 1) && !Hf.isEmpty(input.value)) {
            component.setState((prevState) => {
                let boxWidth = prevState.box.width;
                let boxHeight = prevState.box.height;
                let lineCount = prevState.input.lineCount;

                if (prevState.input.height < height) {
                    if (lineLimit === -1 || lineCount <= lineLimit) {
                        boxHeight += Ht.Theme.field.size.text.input * 0.55;
                        lineCount++;
                    }
                } else if (prevState.input.height > height) {
                    if (lineCount > 1) {
                        boxHeight -= Ht.Theme.field.size.text.input * 0.55;
                        lineCount--;
                    }
                }
                return {
                    input: {
                        ...prevState.input,
                        width,
                        height
                    },
                    box: {
                        width: boxWidth,
                        height: boxHeight
                    }
                };
            });
        }
    }
    onChangeText = (text) => {
        const component = this;
        const {
            inputType,
            onEditing
        } = component.props;
        const value = text;

        if (Hf.isEmpty(value)) {
            component.setState((prevState) => {
                return {
                    input: {
                        ...prevState.input,
                        value: ``
                    },
                    validation: {
                        validated: true,
                        status: ``
                    }
                };
            }, () => {
                onEditing(value);
            });
        } else {
            component.setState((prevState) => {
                return {
                    input: {
                        ...prevState.input,
                        value
                    }
                };
            }, () => {
                if (inputType === `monetary`) {
                    onEditing(parseFloat(value).toFixed(2));
                } else if (inputType === `numeric`) {
                    onEditing(parseFloat(value));
                } else if (inputType === `phone-pad` ||
                           inputType === `credit-card-visa` ||
                           inputType === `credit-card-master` ||
                           inputType === `credit-card-discover` ||
                           inputType === `credit-card-american-express`
                ) {
                    onEditing(parseInt(value, 10));
                } else {
                    onEditing(value);
                }
            });
        }
    }
    onEndEditting = (event) => {
        const component = this;
        const {
            inputType
        } = component.props;
        const value = event.nativeEvent.text;

        if (!Hf.isEmpty(value)) {
            if (inputType === `monetary`) {
                component.setState((prevState) => {
                    return {
                        input: {
                            ...prevState.input,
                            value: `${parseFloat(value).toFixed(2)}`
                        }
                    };
                });
            } else if (inputType === `numeric`) {
                component.setState((prevState) => {
                    return {
                        input: {
                            ...prevState.input,
                            value: `${parseFloat(value)}`
                        }
                    };
                });
            } else if (inputType === `phone-pad` ||
                       inputType === `credit-card-visa` ||
                       inputType === `credit-card-master` ||
                       inputType === `credit-card-discover` ||
                       inputType === `credit-card-american-express`
            ) {
                component.setState((prevState) => {
                    return {
                        input: {
                            ...prevState.input,
                            value: `${parseInt(value, 10)}`
                        }
                    };
                });
            }
        }
    }
    onSubmitEditing = (event) => {
        const component = this;
        const {
            inputType,
            onDoneEdit,
            onValidate
        } = component.props;
        const value = event.nativeEvent.text;

        if (inputType === `monetary`) {
            const {
                validated,
                status
            } = Hf.fallback({
                validated: false,
                status: ``
            }).of(onValidate(parseFloat(value).toFixed(2), inputType));

            component.setState(() => {
                return {
                    validation: {
                        validated,
                        status
                    }
                };
            }, () => {
                onDoneEdit(parseFloat(value).toFixed(2));
            });
        } else if (inputType === `phone-pad` ||
                   inputType === `credit-card-visa` ||
                   inputType === `credit-card-master` ||
                   inputType === `credit-card-discover` ||
                   inputType === `credit-card-american-express`
        ) {
            const {
                validated,
                status
            } = Hf.fallback({
                validated: false,
                status: ``
            }).of(onValidate(parseInt(value, 10), inputType));

            component.setState(() => {
                return {
                    validation: {
                        validated,
                        status
                    }
                };
            }, () => {
                onDoneEdit(parseInt(value, 10));
            });
        } else if (inputType === `numeric`) {
            const {
                validated,
                status
            } = Hf.fallback({
                validated: false,
                status: ``
            }).of(onValidate(parseFloat(value), inputType));

            component.setState(() => {
                return {
                    validation: {
                        validated,
                        status
                    }
                };
            }, () => {
                onDoneEdit(parseFloat(value));
            });
        } else {
            const {
                validated,
                status
            } = Hf.fallback({
                validated: false,
                status: ``
            }).of(onValidate(value, inputType));

            component.setState(() => {
                return {
                    validation: {
                        validated,
                        status
                    }
                };
            }, () => {
                onDoneEdit(value);
            });
        }
        dismissKeyboard();
    }
    componentWillMount () {
        const component = this;
        const {
            shade,
            overlay,
            focusColor,
            blurColor,
            disabled,
            initialValue,
            lineLimit,
            inputType,
            debounceTime,
            onValidate,
            style
        } = component.props;

        component.debounce = debouncer(debounceTime);

        if (!Hf.isEmpty(initialValue)) {
            if (inputType === `monetary`) {
                const {
                    validated,
                    status
                } = Hf.fallback({
                    validated: false,
                    status: ``
                }).of(onValidate(parseFloat(initialValue).toFixed(2), inputType));

                component.setState((prevState) => {
                    return {
                        adjustedStyle: component._readjustStyle({
                            shade,
                            overlay,
                            focusColor,
                            blurColor,
                            disabled,
                            lineLimit,
                            style
                        }),
                        input: {
                            ...prevState.input,
                            value: initialValue.toFixed(2)
                        },
                        validation: {
                            validated,
                            status
                        }
                    };
                });
            } else if (inputType === `phone-pad` ||
                       inputType === `credit-card-visa` ||
                       inputType === `credit-card-master` ||
                       inputType === `credit-card-discover` ||
                       inputType === `credit-card-american-express`
            ) {
                const {
                    validated,
                    status
                } = Hf.fallback({
                    validated: false,
                    status: ``
                }).of(onValidate(parseInt(initialValue, 10), inputType));

                component.setState((prevState) => {
                    return {
                        adjustedStyle: component._readjustStyle({
                            shade,
                            overlay,
                            focusColor,
                            blurColor,
                            disabled,
                            lineLimit,
                            style
                        }),
                        input: {
                            ...prevState.input,
                            value: initialValue.toFixed(0)
                        },
                        validation: {
                            validated,
                            status
                        }
                    };
                });
            } else if (inputType === `numeric`) {
                const {
                    validated,
                    status
                } = Hf.fallback({
                    validated: false,
                    status: ``
                }).of(onValidate(parseFloat(initialValue), inputType));

                component.setState((prevState) => {
                    return {
                        adjustedStyle: component._readjustStyle({
                            shade,
                            overlay,
                            focusColor,
                            blurColor,
                            disabled,
                            lineLimit,
                            style
                        }),
                        input: {
                            ...prevState.input,
                            value: initialValue
                        },
                        validation: {
                            validated,
                            status
                        }
                    };
                });
            } else {
                const {
                    validated,
                    status
                } = Hf.fallback({
                    validated: false,
                    status: ``
                }).of(onValidate(initialValue, inputType));

                component.setState((prevState) => {
                    return {
                        adjustedStyle: component._readjustStyle({
                            shade,
                            overlay,
                            focusColor,
                            blurColor,
                            disabled,
                            lineLimit,
                            style
                        }),
                        input: {
                            ...prevState.input,
                            value: initialValue
                        },
                        validation: {
                            validated,
                            status
                        }
                    };
                });
            }
        } else {
            component.setState(() => {
                return {
                    adjustedStyle: component._readjustStyle({
                        shade,
                        overlay,
                        focusColor,
                        blurColor,
                        disabled,
                        lineLimit,
                        style
                    })
                };
            });
        }
    }
    componentDidMount () {
        const component = this;
        const [
            textInput,
            animatedLabel,
            boxView
        ] = component.lookupComponentRefs(
            `text-input`,
            `animated-label`,
            `box-view`
        );
        const {
            label,
            hint,
            lineLimit
        } = component.props;
        const {
            input
        } = component.state;

        requestAnimationFrame(() => {
            textInput.measure((
                textInputLeft, textInputTop,
                textInputWidth, textInputHeight // eslint-disable-line
            ) => {
                boxView.measure((
                    boxViewLeft, boxViewTop,
                    boxViewWidth, boxViewHeight // eslint-disable-line
                ) => {
                    if (!Hf.isEmpty(label)) {
                        if (lineLimit === -1 || lineLimit > 1) {
                            if (Hf.isEmpty(hint) && Hf.isEmpty(input.value)) {
                                animatedLabel.transitionTo({
                                    top: 0,
                                    left: textInputLeft + 6,
                                    paddingTop: 44,
                                    opacity: 1
                                });
                            } else {
                                animatedLabel.transitionTo({
                                    top: -6,
                                    left: textInputLeft + 6,
                                    paddingTop: 26,
                                    fontSize: Ht.Theme.field.font.text.label.focused.fontSize,
                                    opacity: 1
                                });
                            }
                        } else {
                            if (Hf.isEmpty(hint) && Hf.isEmpty(input.value)) {
                                animatedLabel.transitionTo({
                                    top: 0,
                                    left: textInputLeft,
                                    paddingTop: 44,
                                    opacity: 1
                                });
                            } else {
                                animatedLabel.transitionTo({
                                    top: -6,
                                    left: textInputLeft,
                                    paddingTop: 26,
                                    fontSize: Ht.Theme.field.font.text.label.focused.fontSize,
                                    opacity: 1
                                });
                            }
                        }
                    }
                    setTimeout(() => {
                        component.setState((prevState) => {
                            return {
                                input: {
                                    ...prevState.input,
                                    left: textInputLeft,
                                    width: textInputWidth
                                },
                                box: {
                                    ...prevState.box,
                                    width: boxViewWidth
                                }
                            };
                        });
                    }, DEFAULT_ANIMATION_DURATION_MS);
                });
            });
        });
    }
    componentDidUpdate () {
        const component = this;
        const [
            animatedLabel,
            animatedUnderlineFocusedView
        ] = component.lookupComponentRefs(
            `animated-label`,
            `animated-underline-focused-view`
        );
        const {
            underlined,
            disabled,
            label,
            hint
        } = component.props;
        const {
            input,
            box
        } = component.state;

        if (!disabled && !Hf.isEmpty(label)) {
            if (input.focused) {
                if (Hf.isEmpty(hint) && Hf.isEmpty(input.value)) {
                    animatedLabel.transitionTo({
                        top: -6,
                        paddingTop: 26,
                        fontSize: Ht.Theme.field.font.text.label.focused.fontSize,
                        opacity: 1
                    });
                }
            } else {
                if (Hf.isEmpty(hint) && Hf.isEmpty(input.value)) {
                    animatedLabel.transitionTo({
                        top: 0,
                        paddingTop: 44,
                        fontSize: Ht.Theme.field.font.text.label.blurred.fontSize,
                        opacity: 1
                    });
                }
            }
        }

        if (underlined) {
            if (!disabled && input.focused) {
                animatedUnderlineFocusedView.transitionTo({
                    width: box.width
                });
            } else {
                animatedUnderlineFocusedView.transitionTo({
                    width: 0
                });
            }
        }
    }
    componentWillUnMount () {
        const component = this;

        component.debounce = null;
        component.refCache = {};
    }
    componentWillReceiveProps (nextProperty) {
        const component = this;
        const {
            shade,
            overlay,
            focusColor,
            blurColor,
            disabled,
            lineLimit,
            debounceTime,
            style
        } = nextProperty;

        component.debounce = debouncer(debounceTime);
        component.setState(() => {
            return {
                adjustedStyle: component._readjustStyle({
                    shade,
                    overlay,
                    focusColor,
                    blurColor,
                    disabled,
                    lineLimit,
                    style
                })
            };
        });
    }
    renderFloatingLabel () {
        const component = this;
        const {
            label
        } = component.props;
        const {
            adjustedStyle,
            input
        } = component.state;

        return (
            <AnimatedText
                ref = { component.assignComponentRef(`animated-label`) }
                style = { input.focused ? adjustedStyle.label.focused : adjustedStyle.label.blurred }
                duration = { DEFAULT_ANIMATION_DURATION_MS }
                useNativeDriver = { false }
            >{ label }</AnimatedText>
        );
    }
    renderUnderline () {
        const component = this;
        const {
            overlay
        } = component.props;
        const {
            adjustedStyle,
            box
        } = component.state;

        return (
            <View
                ref = { component.assignComponentRef(`underline-blurred-view`) }
                style = { overlay !== `transparent` ? adjustedStyle.underline.blurred : {
                    ...adjustedStyle.underline.blurred,
                    width: box.width
                }}
            >
                <AnimatedView
                    ref = { component.assignComponentRef(`animated-underline-focused-view`) }
                    style = { adjustedStyle.underline.focused }
                    duration = { DEFAULT_ANIMATION_DURATION_MS }
                    useNativeDriver = { false }
                />
            </View>
        );
    }
    renderStatusAndHelper () {
        const component = this;
        const {
            charLimit
        } = component.props;
        const {
            adjustedStyle,
            input,
            validation
        } = component.state;

        return (
            <View style = {{
                flexDirection: `row`,
                alignItems: `center`,
                alignSelf: `stretch`,
                justifyContent: `space-between`,
                backgroundColor: `transparent`
            }}>
                <View style = {{
                    alignItems: `center`,
                    alignSelf: `flex-start`,
                    justifyContent: `center`,
                    backgroundColor: `transparent`
                }}>
                    {
                        <Text style = { adjustedStyle.status }>{ validation.status }</Text>
                    }
                </View>
                <View style = {{
                    alignItems: `center`,
                    alignSelf: `flex-end`,
                    justifyContent: `center`,
                    backgroundColor: `transparent`
                }}>
                    {
                        charLimit === -1 ? null : <Text style = { adjustedStyle.helper }>{ `${input.value.length} / ${charLimit}` }</Text>
                    }
                </View>
            </View>
        );
    }
    renderInput () {
        const component = this;
        const {
            autoFocus,
            autoCorrect,
            secured,
            disabled,
            hint,
            charLimit,
            lineLimit,
            inputType
        } = component.props;
        const {
            adjustedStyle,
            input
        } = component.state;
        let keyboardType = `default`;
        let returnKeyType = `default`;

        if (inputType === `numeric` || inputType === `monetary`) {
            keyboardType = `numeric`;
            returnKeyType = `done`;
        } else if (inputType === `phone-pad` ||
                   inputType === `credit-card-visa` ||
                   inputType === `credit-card-master` ||
                   inputType === `credit-card-discover` ||
                   inputType === `credit-card-american-express`
        ) {
            keyboardType = `phone-pad`;
            returnKeyType = `done`;
        } else {
            keyboardType = inputType;
        }

        return (
            <TextInput
                ref = { component.assignComponentRef(`text-input`) }
                style = { !(lineLimit === -1 || lineLimit > 1) ? adjustedStyle.input : {
                    ...adjustedStyle.input,
                    width: input.width,
                    height: input.height
                }}
                keyboardType = { keyboardType }
                returnKeyType = { returnKeyType }
                autoFocus = { autoFocus }
                autoCorrect = { autoCorrect }
                secureTextEntry = { secured }
                multiline = { lineLimit === -1 || lineLimit > 1 }
                editable = { !disabled }
                maxLength = { charLimit }
                defaultValue = { input.value }
                placeholder = { hint }
                placeholderTextColor = { adjustedStyle.hint.color }
                // placeholderColor = { adjustedStyle.hint.color }
                onFocus = { component.onFocus }
                onBlur = { component.onBlur }
                onContentSizeChange = { component.onUpdateInputSize }
                onChangeText = {(text) => component.debounce(component.onChangeText, text)}
                onEndEditing = { component.onEndEditting }
                onSubmitEditing = { component.onSubmitEditing }
            />
        );
    }
    render () {
        const component = this;
        const {
            shade,
            autoFocus,
            underlined,
            disabled,
            lineLimit,
            children
        } = component.props;
        const {
            adjustedStyle,
            input,
            box
        } = component.state;
        const fieldChildProperty = {
            shade,
            disabled
            // color: adjustedStyle.input.color // input.focused ? adjustedStyle.label.focused.color : adjustedStyle.input.color
        };
        let fieldContentLeftChildren = null;
        let fieldActionRightChildren = null;

        if (React.Children.count(children) > 0) {
            let fragments = React.Children.toArray(React.Children.map(children, (child) => {
                const {
                    room,
                    action
                } = child.props;

                if (child !== null) {
                    if (Hf.isString(room) && room === `content-left`) {
                        return React.cloneElement(child, fieldChildProperty);
                    } else if (Hf.isString(room) && Hf.isString(action) && room === `action-right`) {
                        switch (action) {
                        case `clear`:
                            if (!Hf.isEmpty(input.value)) {
                                return React.cloneElement(child, {
                                    ...fieldChildProperty,
                                    onPress: () => component.debounce(component.clear)
                                });
                            } else {
                                return null;
                            }
                        default:
                            return null;
                        }
                    } else {
                        Hf.log(`warn1`, `TextFieldComponent.render - Text field component requires children each to have a room and action propperties.`);
                        return null;
                    }
                } else {
                    return null;
                }
            }));
            fieldContentLeftChildren = fragments.filter((child) => {
                if (child !== null) {
                    const {
                        room
                    } = child.props;

                    return room === `content-left`;
                } else {
                    return false;
                }
            });
            fieldContentLeftChildren = Hf.isEmpty(fieldContentLeftChildren) ? null : fieldContentLeftChildren;

            fieldActionRightChildren = fragments.filter((child) => {
                if (child !== null) {
                    const {
                        room
                    } = child.props;

                    return room === `action-right`;
                } else {
                    return false;
                }
            });
            fieldActionRightChildren = Hf.isEmpty(fieldActionRightChildren) ? null : fieldActionRightChildren;
        }

        return (
            <View
                style = { adjustedStyle.container }
                onStartShouldSetResponder = {() => {
                    if (!autoFocus) {
                        dismissKeyboard();
                    }
                }}
            >
                <View
                    ref = { component.assignComponentRef(`box-view`) }
                    style = {{
                        ...(input.focused ? adjustedStyle.box.focused : adjustedStyle.box.blurred),
                        minWidth: box.width,
                        height: box.height
                    }}
                >
                    {
                        component.renderFloatingLabel()
                    }
                    <View style = { !(lineLimit === -1 || lineLimit > 1) ? adjustedStyle.singleLine : {
                        ...adjustedStyle.multiLine,
                        width: box.width,
                        height: box.height
                    }}>
                        {
                            fieldContentLeftChildren === null ? <View style = { adjustedStyle.room.filler }/> : <View style = { adjustedStyle.room.contentLeft }>
                                {
                                    fieldContentLeftChildren
                                }
                            </View>
                        }
                        {
                            component.renderInput()
                        }
                        {
                            fieldActionRightChildren === null ? <View style = { adjustedStyle.room.filler }/> : <View style = { adjustedStyle.room.actionRight }>
                                {
                                    fieldActionRightChildren
                                }
                            </View>
                        }
                    </View>
                    {
                        underlined ? component.renderUnderline() : null
                    }
                </View>
                {
                    component.renderStatusAndHelper()
                }
            </View>
        );
    }
}

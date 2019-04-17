'use strict'; // eslint-disable-line

import { Ht } from 'hypertoxin';

import React from 'react';

import ReactNative from 'react-native'; // eslint-disable-line

import PropTypes from 'prop-types';

import DefaultTheme from '../../../themes/default-theme';

const {
    BodyScreen,
    HeaderScreen,
    RowLayout,
    FlatButton,
    RaisedButton,
    IconImage,
    TextField,
    HeadlineText,
    TitleText,
    SubtitleText
} = Ht;

export default class ShoppingCheckoutPaymentView extends React.Component {
    static propTypes = {
        Theme: PropTypes.object,
        shade: PropTypes.oneOf([ `light`, `dark` ]),
        shippingInfoForm: PropTypes.object,
        onPaymentSubmitted: PropTypes.func,
        onReset: PropTypes.func
    }
    static defaultProps = {
        Theme: DefaultTheme,
        shade: `light`,
        shippingInfoForm: {
            email: ``,
            address: ``,
            city: ``,
            state: ``,
            zipCode: ``,
            phoneNumber: ``
        },
        onPaymentSubmitted: () => null,
        onReset: () => null
    }
    constructor (props) {
        super(props);
        this.creditCardNumberTextFieldRef = null;
        this.creditCardExpDateTextFieldRef = null;
        this.state = {
            paymentSubmitted: false,
            paymentInfoCompleted: false,
            paymentInfoForm: {
                creditCardNumber: ``,
                creditCardExpDate: ``
            }
        };
    }
    render () {
        const component = this;
        const {
            shade,
            navigation,
            shippingInfoForm,
            onPaymentSubmitted,
            onReset
        } = component.props;
        const {
            paymentSubmitted,
            paymentInfoCompleted
        } = component.state;

        return ([
            <HeaderScreen
                key = 'header-screen'
                ref = {(componentRef) => {
                    component.headerScreenRef = componentRef;
                }}
                shade = { shade }
                label = { !paymentSubmitted ? `CHECKOUT - PAYMENT` : ``}
            >
                {
                    !paymentSubmitted ? <FlatButton
                        room = 'content-left'
                        overlay = 'transparent'
                        corner = 'circular'
                        onPress = {() => navigation.goBack()}
                    >
                        <IconImage
                            room = 'content-middle'
                            size = 'large'
                            source = 'go-back'
                        />
                    </FlatButton> : null
                }
                {
                    !paymentSubmitted ? <FlatButton
                        room = 'content-right'
                        overlay = 'transparent'
                        corner = 'circular'
                        label = 'CANCEL'
                        onPress = {() => {
                            component.setState(() => {
                                return {
                                    paymentSubmitted: false,
                                    paymentInfoCompleted: false,
                                    paymentInfoForm: {
                                        creditCardNumber: ``,
                                        creditCardExpDate: ``
                                    }
                                };
                            }, () => navigation.navigate(`shoppingCart`));
                        }}
                    /> : null
                }
            </HeaderScreen>,
            <BodyScreen
                key = 'body-screen'
                shade = { shade }
                contentTopRoomAlignment = 'stretch'
                keyboardAvoiding = { true }
            >
                {
                    !paymentSubmitted ? <RowLayout
                        room = 'content-top'
                        shade = { shade }
                        roomAlignment = 'stretch'
                        contentTopRoomAlignment = 'stretch'
                        contentMiddleRoomAlignment = 'stretch'
                        scrollable = { true }
                        margin = {{
                            top: 150,
                            horizontal: 10
                        }}
                    >
                        <TextField
                            ref = {(componentRef) => {
                                component.creditCardNumberTextFieldRef = componentRef;
                            }}
                            room = 'content-top'
                            label = 'VISA'
                            secured = { true }
                            inputType = 'credit-card-visa'
                            disableValidation = { true }
                            onDoneEdit = {(value) => {
                                component.setState((prevState) => {
                                    const paymentInfoForm = {
                                        ...prevState.paymentInfoForm,
                                        creditCardNumber: value
                                    };
                                    return {
                                        paymentInfoCompleted: Object.values(paymentInfoForm).reduce((completed, _value) => {
                                            completed = completed && _value !== ``;
                                            return completed;
                                        }, true),
                                        paymentInfoForm
                                    };
                                }, () => {
                                    if (component.creditCardExpDateTextFieldRef !== null) {
                                        component.creditCardExpDateTextFieldRef.focus();
                                    }
                                });
                            }}
                        >
                            <IconImage
                                room = 'content-left'
                                source = 'credit-card'
                            />
                            <FlatButton
                                overlay = 'transparent'
                                room = 'content-right'
                                action = 'clear'
                                corner = 'circular'
                            >
                                <IconImage
                                    room = 'content-middle'
                                    source = 'cancel'
                                />
                            </FlatButton>
                        </TextField>
                        <TextField
                            ref = {(componentRef) => {
                                component.creditCardExpDateTextFieldRef = componentRef;
                            }}
                            room = 'content-top'
                            label = 'EXP DATE'
                            hint = 'mm/dd/yy'
                            inputType = 'numeric'
                            charLimit = { 8 }
                            onFormat = {(value) => {
                                return value.split(``).filter((char) => char !== `/`).map((char, index) => {
                                    return index === 2 || index === 4 ? `/${char}` : char;
                                }).join(``);
                            }}
                            onDoneEdit = {(value) => {
                                component.setState((prevState) => {
                                    const paymentInfoForm = {
                                        ...prevState.paymentInfoForm,
                                        creditCardExpDate: value
                                    };
                                    return {
                                        paymentInfoCompleted: Object.values(paymentInfoForm).reduce((completed, _value) => {
                                            completed = completed && _value !== ``;
                                            return completed;
                                        }, true),
                                        paymentInfoForm
                                    };
                                });
                            }}
                        >
                            <FlatButton
                                overlay = 'transparent'
                                room = 'content-right'
                                action = 'clear'
                                corner = 'circular'
                            >
                                <IconImage
                                    room = 'content-middle'
                                    source = 'cancel'
                                    size = 'small'
                                />
                            </FlatButton>
                        </TextField>
                        <RaisedButton
                            room = 'content-middle'
                            label = 'SUBMIT PAYMENT'
                            color = 'accent'
                            disabled = { !paymentInfoCompleted }
                            onPress = {() => {
                                component.setState(() => {
                                    return {
                                        paymentSubmitted: true
                                    };
                                }, () => {
                                    onPaymentSubmitted();
                                });
                            }}
                            margin = {{
                                right: 10,
                                vertical: 10
                            }}
                        />
                    </RowLayout> : <RowLayout
                        room = 'content-top'
                        shade = { shade }
                        roomAlignment = 'stretch'
                        contentTopRoomAlignment = 'center'
                        contentMiddleRoomAlignment = 'center'
                        contentBottomRoomAlignment = 'stretch'
                        scrollable = { true }
                        margin = {{
                            top: 150,
                            horizontal: 10
                        }}
                    >
                        <HeadlineText room = 'content-top' color = 'primary' size = 'large' > Thank you!!! </HeadlineText>
                        <SubtitleText room = 'content-middle' size = 'small' > Your orders will be shipped to </SubtitleText>
                        <TitleText room = 'content-middle' size = 'small' >{ shippingInfoForm.address }</TitleText>
                        <TitleText room = 'content-middle' size = 'small' >{ `${shippingInfoForm.city}, ${shippingInfoForm.state} ${shippingInfoForm.zipCode}` }</TitleText>
                        <RaisedButton
                            room = 'content-bottom'
                            label = 'BACK TO SHOPPING'
                            color = 'accent'
                            margin = {{
                                top: 50
                            }}
                            onPress = {() => {
                                onReset();
                                navigation.navigate(`shoppingHome`);
                            }}
                        />
                    </RowLayout>
                }
            </BodyScreen>
        ]);
    }
}

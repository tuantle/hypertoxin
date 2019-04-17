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
    ColumnLayout,
    FlatButton,
    RaisedButton,
    AreaButton,
    IconImage,
    TextField,
    InfoText
} = Ht;

const US_STATES = [
    { name: `Alabama`, value: `AL` },
    { name: `Alaska`, value: `AK` },
    { name: `Arizona`, value: `AZ` },
    { name: `Arkansas`, value: `AR` },
    { name: `California`, value: `CA` },
    { name: `Colorado`, value: `CO` },
    { name: `Connecticut`, value: `CT` },
    { name: `Delaware`, value: `DE` },
    { name: `District of Columbia`, value: `DC` },
    { name: `Florida`, value: `FL` },
    { name: `Georgia`, value: `GA` },
    { name: `Hawaii`, value: `HI` },
    { name: `Idaho`, value: `ID` },
    { name: `Illinois`, value: `IL` },
    { name: `Indiana`, value: `IN` },
    { name: `Iowa`, value: `IA` },
    { name: `Kansas`, value: `KS` },
    { name: `Kentucky`, value: `KY` },
    { name: `Louisiana`, value: `LA` },
    { name: `Maine`, value: `ME` },
    { name: `Montana`, value: `MT` },
    { name: `Nebraska`, value: `NE` },
    { name: `Nevada`, value: `NV` },
    { name: `New Hampshire`, value: `NH` },
    { name: `New Jersey`, value: `NJ` },
    { name: `New Mexico`, value: `NM` },
    { name: `New York`, value: `NY` },
    { name: `North Carolina`, value: `NC` },
    { name: `North Dakota`, value: `ND` },
    { name: `Ohio`, value: `OH` },
    { name: `Oklahoma`, value: `OK` },
    { name: `Oregon`, value: `OR` },
    { name: `Maryland`, value: `MD` },
    { name: `Massachusetts`, value: `MA` },
    { name: `Michigan`, value: `MI` },
    { name: `Minnesota`, value: `MN` },
    { name: `Mississippi`, value: `MS` },
    { name: `Missouri`, value: `MO` },
    { name: `Pennsylvania`, value: `PA` },
    { name: `Rhode Island`, value: `RI` },
    { name: `South Carolina`, value: `SC` },
    { name: `South Dakota`, value: `SD` },
    { name: `Tennessee`, value: `TN` },
    { name: `Texas`, value: `TX` },
    { name: `Utah`, value: `UT` },
    { name: `Vermont`, value: `VT` },
    { name: `Virginia`, value: `VA` },
    { name: `Washington`, value: `WA` },
    { name: `West Virginia`, value: `WV` },
    { name: `Wisconsin`, value: `WI` },
    { name: `Wyoming`, value: `WY` }
];

export default class ShoppingCheckoutShippingView extends React.Component {
    static propTypes = {
        Theme: PropTypes.object,
        shade: PropTypes.oneOf([ `light`, `dark` ]),
        onShippingInfoFormSubmitted: PropTypes.func
    }
    static defaultProps = {
        Theme: DefaultTheme,
        shade: `light`,
        onShippingInfoFormSubmitted: () => null
    }
    constructor (props) {
        super(props);
        this.headerScreenRef = null;
        this.emailTextFieldRef = null;
        this.addressTextFieldRef = null;
        this.cityTextFieldRef = null;
        this.stateTextFieldRef = null;
        this.zipCodeTextFieldRef = null;
        this.phoneNumberTextFieldRef = null;
        this.state = {
            shippingInfoCompleted: false,
            shippingInfoForm: {
                email: ``,
                address: ``,
                city: ``,
                state: ``,
                zipCode: ``,
                phoneNumber: ``
            }
        };
    }
    render () {
        const component = this;
        const {
            shade,
            navigation,
            onShippingInfoFormSubmitted
        } = component.props;
        const {
            shippingInfoCompleted
        } = component.state;

        return ([
            <HeaderScreen
                key = 'header-screen'
                ref = {(componentRef) => {
                    component.headerScreenRef = componentRef;
                }}
                shade = { shade }
                label = 'CHECKOUT - SHIPPING'
            >
                <FlatButton
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
                </FlatButton>
                <FlatButton
                    room = 'content-right'
                    overlay = 'transparent'
                    corner = 'circular'
                    label = 'CANCEL'
                    onPress = {() => {
                        component.setState(() => {
                            return {
                                shippingInfoCompleted: false,
                                shippingInfoForm: {
                                    email: ``,
                                    address: ``,
                                    city: ``,
                                    state: ``,
                                    zipCode: ``,
                                    phoneNumber: ``
                                }
                            };
                        }, () => navigation.navigate(`shoppingCart`));
                    }}
                />
                <ColumnLayout
                    room = 'media'
                    shade = 'light'
                    exclusions = {[ `shade`, `color` ]}
                    overlay = 'opaque'
                    roomAlignment = 'stretch'
                    contentLeftRoomAlignment = 'center'
                    corner = 'sharp'
                >
                    <RaisedButton
                        room = 'content-right'
                        label = 'PAYMENT METHOD'
                        color = 'accent'
                        disabled = { !shippingInfoCompleted }
                        onPress = {() => {
                            const {
                                shippingInfoForm
                            } = component.state;
                            onShippingInfoFormSubmitted(shippingInfoForm);
                            navigation.navigate(`shoppingCheckoutPayment`);
                        }}
                        margin = {{
                            right: 10,
                            vertical: 10
                        }}
                    />
                </ColumnLayout>
            </HeaderScreen>,
            <BodyScreen
                key = 'body-screen'
                shade = { shade }
                contentTopRoomAlignment = 'stretch'
                keyboardAvoiding = { true }
            >
                <RowLayout
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
                            component.emailTextFieldRef = componentRef;
                        }}
                        room = 'content-top'
                        hint = 'user@gmail.com'
                        label = 'EMAIL'
                        inputType = 'email-address'
                        onDoneEdit = {(value) => {
                            component.setState((prevState) => {
                                const shippingInfoForm = {
                                    ...prevState.shippingInfoForm,
                                    email: value
                                };
                                return {
                                    shippingInfoCompleted: Object.values(shippingInfoForm).reduce((completed, _value) => {
                                        completed = completed && _value !== ``;
                                        return completed;
                                    }, true),
                                    shippingInfoForm
                                };
                            }, () => {
                                if (component.addressTextFieldRef !== null) {
                                    component.addressTextFieldRef.focus();
                                }
                            });
                        }}
                    >
                        <IconImage
                            room = 'content-left'
                            source = 'email'
                            size = 'small'
                        />
                        <FlatButton
                            room = 'content-right'
                            overlay = 'transparent'
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
                    <TextField
                        ref = {(componentRef) => {
                            component.addressTextFieldRef = componentRef;
                        }}
                        room = 'content-top'
                        label = 'ADDRESS'
                        onDoneEdit = {(value) => {
                            component.setState((prevState) => {
                                const shippingInfoForm = {
                                    ...prevState.shippingInfoForm,
                                    address: value
                                };
                                return {
                                    shippingInfoCompleted: Object.values(shippingInfoForm).reduce((completed, _value) => {
                                        completed = completed && _value !== ``;
                                        return completed;
                                    }, true),
                                    shippingInfoForm
                                };
                            }, () => {
                                if (component.cityTextFieldRef !== null) {
                                    component.cityTextFieldRef.focus();
                                }
                            });
                        }}
                    >
                        <IconImage
                            room = 'content-left'
                            source = 'home'
                            size = 'small'
                        />
                        <FlatButton
                            room = 'content-right'
                            overlay = 'transparent'
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
                    <TextField
                        ref = {(componentRef) => {
                            component.cityTextFieldRef = componentRef;
                        }}
                        room = 'content-top'
                        label = 'CITY'
                        onFormat = {(value) => `${value.charAt(0).toUpperCase()}${value.slice(1)}`}
                        onDoneEdit = {(value) => {
                            component.setState((prevState) => {
                                const shippingInfoForm = {
                                    ...prevState.shippingInfoForm,
                                    city: value
                                };
                                return {
                                    shippingInfoCompleted: Object.values(shippingInfoForm).reduce((completed, _value) => {
                                        completed = completed && _value !== ``;
                                        return completed;
                                    }, true),
                                    shippingInfoForm
                                };
                            }, () => {
                                if (component.stateTextFieldRef !== null) {
                                    component.stateTextFieldRef.focus();
                                }
                            });
                        }}
                    >
                        <FlatButton
                            room = 'content-right'
                            overlay = 'transparent'
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
                    <ColumnLayout
                        room = 'content-middle'
                        roomAlignment = 'stretch'
                        contentMiddleRoomAlignment = 'stretch'
                    >
                        <TextField
                            ref = {(componentRef) => {
                                component.stateTextFieldRef = componentRef;
                            }}
                            room = 'content-middle'
                            label = 'STATE'
                            initialValue = ''
                            selectableValues = { US_STATES }
                            onDoneEdit = {(value) => {
                                component.setState((prevState) => {
                                    const shippingInfoForm = {
                                        ...prevState.shippingInfoForm,
                                        state: value
                                    };
                                    return {
                                        shippingInfoCompleted: Object.values(shippingInfoForm).reduce((completed, _value) => {
                                            completed = completed && _value !== ``;
                                            return completed;
                                        }, true),
                                        shippingInfoForm
                                    };
                                }, () => {
                                    if (component.zipCodeTextFieldRef !== null) {
                                        component.zipCodeTextFieldRef.focus();
                                    }
                                });
                            }}
                            onFormat = {(value) => value.toUpperCase()}
                            renderSelectableItem = {(item, onPressSelect) => {
                                return (
                                    <AreaButton
                                        shade = { shade }
                                        overlay = 'transparent'
                                        onPress = { () => {
                                            onPressSelect({
                                                value: item.value.value
                                            });
                                        }}
                                        contentRightRoomAlignment = 'start'
                                        margin = {{
                                            horizontal: 10
                                        }}
                                    >
                                        <InfoText
                                            room = 'content-left'
                                            color = { item.selected ? `accent` : `default`}
                                        >{ `${item.value.name}, ${item.value.value}` }</InfoText>
                                    </AreaButton>
                                );
                            }}
                        >
                            <FlatButton
                                room = 'content-right'
                                overlay = 'transparent'
                                action = 'show-selection'
                                corner = 'circular'
                            >
                                <IconImage
                                    room = 'content-middle'
                                    source = 'collapse'
                                />
                            </FlatButton>
                            <FlatButton
                                room = 'content-right'
                                overlay = 'transparent'
                                action = 'hide-selection'
                                corner = 'circular'
                            >
                                <IconImage
                                    room = 'content-middle'
                                    source = 'expand'
                                />
                            </FlatButton>
                        </TextField>
                        <TextField
                            ref = {(componentRef) => {
                                component.zipCodeTextFieldRef = componentRef;
                            }}
                            room = 'content-middle'
                            label = 'ZIPCODE'
                            charLimit = { 5 }
                            inputType = 'numeric'
                            onDoneEdit = {(value) => {
                                component.setState((prevState) => {
                                    const shippingInfoForm = {
                                        ...prevState.shippingInfoForm,
                                        zipCode: value
                                    };
                                    return {
                                        shippingInfoCompleted: Object.values(shippingInfoForm).reduce((completed, _value) => {
                                            completed = completed && _value !== ``;
                                            return completed;
                                        }, true),
                                        shippingInfoForm
                                    };
                                }, () => {
                                    if (component.phoneNumberTextFieldRef !== null) {
                                        component.phoneNumberTextFieldRef.focus();
                                    }
                                });
                            }}
                        >
                            <FlatButton
                                room = 'content-right'
                                overlay = 'transparent'
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
                    </ColumnLayout>
                    <TextField
                        ref = {(componentRef) => {
                            component.phoneNumberTextFieldRef = componentRef;
                        }}
                        room = 'content-middle'
                        label = 'PHONE NUMBER'
                        inputType = 'phone-pad'
                        charLimit = { 12 }
                        onFormat = {(value) => {
                            return value.split(``).filter((char) => char !== `-`).map((char, index) => {
                                return index === 2 || index === 5 ? `${char}-` : char;
                            }).join(``);
                        }}
                        onDoneEdit = {(value) => {
                            component.setState((prevState) => {
                                const shippingInfoForm = {
                                    ...prevState.shippingInfoForm,
                                    phoneNumber: value
                                };
                                return {
                                    shippingInfoCompleted: Object.values(shippingInfoForm).reduce((completed, _value) => {
                                        completed = completed && _value !== ``;
                                        return completed;
                                    }, true),
                                    shippingInfoForm
                                };
                            });
                        }}
                    >
                        <FlatButton
                            room = 'content-right'
                            overlay = 'transparent'
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
                </RowLayout>
            </BodyScreen>
        ]);
    }
}

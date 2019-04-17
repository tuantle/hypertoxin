'use strict'; // eslint-disable-line

import { Ht } from 'hypertoxin';

import React from 'react';

import ReactNative from 'react-native'; // eslint-disable-line

import PropTypes from 'prop-types';

import DefaultTheme from '../../themes/default-theme';

const {
    RowLayout,
    TextField,
    FlatButton,
    IconImage,
    HeadlineText
} = Ht;

export default class LoginTextFieldView extends React.Component {
    static propTypes = {
        Theme: PropTypes.object,
        shade: PropTypes.oneOf([ `light`, `dark` ])
    }
    static defaultProps = {
        Theme: DefaultTheme,
        shade: `light`
    }
    constructor (props) {
        super(props);
        this.emailTextFieldRef = null;
        this.passwordTextFieldRef = null;
    }
    render () {
        const component = this;
        const {
            shade
        } = component.props;
        return (
            <RowLayout
                shade = { shade }
                roomAlignment = 'center'
                contentTopRoomAlignment = 'center'
                contentMiddleRoomAlignment = 'stretch'
                margin = {{
                    horizontal: 10
                }}
            >
                <HeadlineText room = 'content-top' > TextField Login Example </HeadlineText>
                <TextField
                    ref = {(componentRef) => {
                        component.emailTextFieldRef = componentRef;
                    }}
                    room = 'content-middle'
                    label = 'EMAIL'
                    hint = 'user@gmail.com'
                    inputType = 'email-address'
                    onDoneEdit = {() => {
                        if (component.passwordTextFieldRef !== null) {
                            component.passwordTextFieldRef.focus();
                        }
                    }}
                >
                    <IconImage
                        room = 'content-left'
                        source = 'email'
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
                        />
                    </FlatButton>
                </TextField>
                <TextField
                    ref = {(componentRef) => {
                        component.passwordTextFieldRef = componentRef;
                    }}
                    room = 'content-middle'
                    secured = { true }
                    label = 'PASSWORD'
                >
                    <IconImage
                        room = 'content-left'
                        source = 'lock'
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
                        />
                    </FlatButton>
                </TextField>
            </RowLayout>
        );
    }
}

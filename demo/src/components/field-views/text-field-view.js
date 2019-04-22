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
    AreaButton,
    IconImage,
    HeadlineText,
    InfoText,
    CaptionText
} = Ht;

export default class TextFieldView extends React.Component {
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
    }
    render () {
        const component = this;
        const {
            shade
        } = component.props;
        return (
            <RowLayout
                shade = { shade }
                roomAlignment = 'stretch'
                contentTopRoomAlignment = 'center'
                contentTopRoomAlignment = 'center'
                scrollable = { true }
                margin = {{
                    horizontal: 10
                }}
            >
                <HeadlineText room = 'content-top' > TextField </HeadlineText>
                <CaptionText room = 'content-middle' size = 'large' > Default setting & style </CaptionText>
                <TextField
                    room = 'content-middle'
                    label = 'SMALL'
                    size = 'small'
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
                        />
                    </FlatButton>
                </TextField>
                <TextField
                    room = 'content-middle'
                    label = 'NORMAL'
                    size = 'normal'
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
                        />
                    </FlatButton>
                </TextField>
                <TextField
                    room = 'content-middle'
                    label = 'LARGE'
                    size = 'large'
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
                        />
                    </FlatButton>
                </TextField>
                <CaptionText room = 'content-middle' size = 'large' > With icon & hint </CaptionText>
                <TextField
                    room = 'content-middle'
                    label = 'LABEL'
                    hint = 'Type here!'
                >
                    <IconImage
                        room = 'content-left'
                        source = 'exclamation'
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
                <CaptionText room = 'content-middle' size = 'large' > With formatting & validation (i.e. phone number) </CaptionText>
                <TextField
                    room = 'content-middle'
                    label = 'PHONE NUMBER'
                    inputType = 'phone-pad'
                    charLimit = { 14 }
                    onValidate = {(value, inputType) => {
                        let regex;
                        let validated = true;
                        let status = ``;

                        if (value !== `` && inputType === `phone-pad`) {
                            regex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

                            validated = regex.test(value);
                            status = validated ? `` : `Phone number is invalid`;
                        }
                        return {
                            validated,
                            status
                        };
                    }}
                    onFormat = {(value) => {
                        return value.split(``).filter((char) => char !== `-` && char !== `(` && char !== `)` && char !== ` `).map((char, index) => {
                            if (index === 0) {
                                return `(${char}`;
                            }
                            if (index === 2) {
                                return `${char}) `;
                            }
                            if (index === 5) {
                                return `${char}-`;
                            }
                            return char;
                        }).join(``);
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
                        />
                    </FlatButton>
                </TextField>
                <CaptionText room = 'content-middle' size = 'large' > With selectable popup </CaptionText>
                <TextField
                    room = 'content-middle'
                    label = 'LABEL'
                    selectableValues = {[
                        `VALUE A`,
                        `VALUE B`,
                        `VALUE C`
                    ]}
                    renderSelectableItem = {(item, onPressSelect) => {
                        return (
                            <AreaButton
                                shade = { shade }
                                overlay = 'transparent'
                                size = 'small'
                                onPress = {() => onPressSelect(item)}
                                contentRightRoomAlignment = 'start'
                                margin = {{
                                    horizontal: 10
                                }}
                            >
                                <InfoText room = 'content-left' indentation = { 10 }>{ item.value }</InfoText>
                                {
                                    item.selected ? <IconImage
                                        room = 'content-right'
                                        source = 'check'
                                    /> : null
                                }
                            </AreaButton>
                        );
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
                        />
                    </FlatButton>
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
            </RowLayout>
        );
    }
}

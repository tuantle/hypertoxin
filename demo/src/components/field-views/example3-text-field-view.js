'use strict'; // eslint-disable-line

import { Ht } from 'hypertoxin';

import React from 'react';

import ReactNative from 'react-native'; // eslint-disable-line

import PropTypes from 'prop-types';

// import DefaultTheme from '../../themes/default-theme';

const {
    RowLayout,
    ColumnLayout,
    TextField,
    FlatButton,
    AreaButton,
    IconImage,
    HeadlineText,
    InfoText
} = Ht;

const RegistrationTextFieldView = (props) => {
    const {
        shade
    } = props;

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
            <HeadlineText room = 'content-top' > Registration Example </HeadlineText>
            <TextField
                room = 'content-middle'
                hint = 'user@gmail.com'
                label = 'EMAIL'
                inputType = 'email-address'
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
            <ColumnLayout
                room = 'content-middle'
                roomAlignment = 'center'
                contentLeftRoomAlignment = 'stretch'
                contentRightRoomAlignment = 'stretch'
            >
                <TextField
                    room = 'content-left'
                    initialValue = 'Fantastic'
                    label = 'FIRST NAME'
                    charLimit = { 10 }
                >
                    <IconImage
                        room = 'content-left'
                        source = 'profile'
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
                    room = 'content-right'
                    initialValue = 'Fox'
                    label = 'LAST NAME'
                    charLimit = { 10 }
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
            </ColumnLayout>
            <ColumnLayout
                room = 'content-middle'
                roomAlignment = 'stretch'
                contentMiddleRoomAlignment = 'stretch'
            >
                <TextField
                    room = 'content-middle'
                    label = 'AGE'
                    inputType = 'numeric'
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
                    label = 'GENDER'
                    initialValue = 'NA'
                    selectableValues = {[
                        `NA`,
                        `MALE`,
                        `FEMALE`
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
                                <ColumnLayout
                                    room = 'content-left'
                                    roomAlignment = 'center'
                                >
                                    <IconImage
                                        room = 'content-left'
                                        source = 'profile'
                                    />
                                    <InfoText room = 'content-right' indentation = { 10 }>{ item.value }</InfoText>
                                </ColumnLayout>
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
            </ColumnLayout>
            <TextField
                room = 'content-middle'
                label = 'PHONE NUMBER'
                inputType = 'phone-pad'
                charLimit = { 12 }
                onFormat = {(value) => {
                    return value.split(``).filter((char) => char !== `-`).map((char, index) => {
                        return index === 2 || index === 5 ? `${char}-` : char;
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
        </RowLayout>
    );
};

RegistrationTextFieldView.propTypes = {
    Theme: PropTypes.object,
    shade: PropTypes.oneOf([ `light`, `dark` ])
};

export default RegistrationTextFieldView;

'use strict'; // eslint-disable-line

import { Ht } from 'hypertoxin';

import React from 'react';

import ReactNative from 'react-native'; // eslint-disable-line

import PropTypes from 'prop-types';

// import DefaultTheme from '../../themes/default-theme';

const {
    RowLayout,
    TextField,
    FlatButton,
    IconImage,
    HeadlineText
} = Ht;

const NoteTextFieldView = (props) => {
    const {
        shade
    } = props;

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
            <HeadlineText room = 'content-top' > TextField </HeadlineText>
            <HeadlineText room = 'content-top' > Payment Example </HeadlineText>
            <TextField
                room = 'content-middle'
                label = 'COST'
                inputType = 'monetary'
            >
                <IconImage
                    room = 'content-left'
                    source = 'money'
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
                room = 'content-middle'
                label = 'VISA'
                secured = { true }
                inputType = 'credit-card-visa'
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
                room = 'content-middle'
                label = 'EXP DATE'
                hint = 'mm/dd/yy'
                inputType = 'numeric'
                charLimit = { 8 }
                onFormat = {(value) => {
                    return value.split(``).filter((char) => char !== `/`).map((char, index) => {
                        return index === 2 || index === 4 ? `/${char}` : char;
                    }).join(``);
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
            <TextField
                room = 'content-middle'
                label = 'ADD NOTE'
                charLimit = { 128 }
                lineLimit = { 5 }
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
                    />
                </FlatButton>
            </TextField>
        </RowLayout>
    );
};

NoteTextFieldView.propTypes = {
    Theme: PropTypes.object,
    shade: PropTypes.oneOf([ `light`, `dark` ])
};

export default NoteTextFieldView;

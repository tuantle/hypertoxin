'use strict'; // eslint-disable-line

import { Ht } from 'hypertoxin';

import React from 'react';

import ReactNative from 'react-native'; // eslint-disable-line

import PropTypes from 'prop-types';

// import DefaultTheme from '../../themes/default-theme';

const {
    RowLayout,
    ColumnLayout,
    HeadlineText,
    TitleText,
    SubtitleText,
    InfoText,
    AvatarImage,
    HorizontalDivider
} = Ht;

const Example1TextView = (props) => {
    const {
        Theme,
        shade
    } = props;

    return (
        <RowLayout
            shade = { shade }
            roomAlignment = 'start'
            contentTopRoomAlignment = 'center'
            contentMiddleRoomAlignment = 'stretch'
        >
            <ColumnLayout
                room = 'content-top'
                roomAlignment = 'center'
                margin = {{
                    horizontal: 10
                }}
            >
                <AvatarImage room = 'content-left' size = 'large' overlay = 'transparent' source = {{
                    uri: `https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/320px-React-icon.svg.png`
                }}/>
                <HeadlineText
                    room = 'content-middle'
                    size = 'large'
                    color = { Theme.color.palette.teal }
                > React </HeadlineText>
            </ColumnLayout>
            <RowLayout
                room = 'content-middle'
                roomAlignment = 'start'
                margin = {{
                    horizontal: 10
                }}
            >
                <HeadlineText
                    room = 'content-top'
                    size = 'small'
                > A JS library </HeadlineText>
                <HeadlineText
                    room = 'content-top'
                    size = 'small'
                > for building user interfaces </HeadlineText>
            </RowLayout>
            <HorizontalDivider room = 'content-middle' edgeToEdge = { true }/>
            <RowLayout
                room = 'content-middle'
                contentTopRoomAlignment = 'center'
                contentMiddleRoomAlignment = 'start'
                margin = {{
                    top: 20,
                    horizontal: 10
                }}
            >
                <TitleText
                    room = 'content-top'
                    size = 'small'
                    color = { Theme.color.palette.grey }
                > Learn Once, Write Anywhere </TitleText>
                <InfoText room = 'content-middle' >{
                    `\tWe don’t make assumptions about the rest of your technology stack, so you can develop new features in React without rewriting existing code. React can also render on the server using Node and power mobile apps using React Native.`
                }</InfoText>
            </RowLayout>
            <ColumnLayout
                room = 'content-middle'
                roomAlignment = 'start'
                margin = {{
                    top: 15,
                    horizontal: 10
                }}
            >
                <RowLayout
                    room = 'content-left'
                    margin = {{
                        top: 15
                    }}
                >
                    <SubtitleText
                        room = 'content-top'
                        color = { Theme.color.palette.grey }
                        size = 'small'
                    > Component-Based </SubtitleText>
                    <InfoText room = 'content-middle' size = 'small' >{
                        `\tBuild encapsulated components that manage their own state, then compose them to make complex UIs. Since component logic is written in JavaScript instead of templates, you can easily pass rich data through your app and keep state out of the DOM.`
                    }</InfoText>
                </RowLayout>
                <RowLayout
                    room = 'content-right'
                    margin = {{
                        top: 15
                    }}
                >
                    <SubtitleText
                        room = 'content-top'
                        color = { Theme.color.palette.grey }
                        size = 'small'
                    > Declarative </SubtitleText>
                    <InfoText room = 'content-middle' size = 'small' >{
                        `\tReact makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes. Declarative views make your code more predictable and easier to debug.`
                    }</InfoText>
                </RowLayout>
            </ColumnLayout>
        </RowLayout>
    );
};

Example1TextView.propTypes = {
    Theme: PropTypes.object,
    shade: PropTypes.oneOf([ `light`, `dark` ])
};

export default Example1TextView;

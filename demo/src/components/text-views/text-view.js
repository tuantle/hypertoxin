'use strict'; // eslint-disable-line

import { Ht } from 'hypertoxin';

import React from 'react';

import ReactNative from 'react-native'; // eslint-disable-line

import PropTypes from 'prop-types';

const {
    RowLayout,
    HeadlineText,
    TitleText,
    SubtitleText,
    InfoText,
    CaptionText,
    HorizontalDivider
} = Ht;

const TextView = (props) => {
    const {
        shade
    } = props;

    return (
        <RowLayout
            shade = { shade }
            roomAlignment = 'stretch'
        >
            <RowLayout
                room = 'content-middle'
                roomAlignment = 'center'
                margin = {{
                    horizontal: 10
                }}
            >
                <HeadlineText
                    room = 'content-middle'
                    size = 'large'
                    color = 'default'
                > Headline Large </HeadlineText>
                <HeadlineText
                    room = 'content-middle'
                    size = 'normal'
                    color = 'primary'
                > Headline Normal </HeadlineText>
                <HeadlineText
                    room = 'content-middle'
                    size = 'small'
                    color = 'secondary'
                > Headline Small </HeadlineText>
            </RowLayout>
            <HorizontalDivider room = 'content-middle' edgeToEdge = { true }/>
            <RowLayout
                room = 'content-middle'
                roomAlignment = 'center'
                margin = {{
                    horizontal: 10
                }}
            >
                <TitleText
                    room = 'content-middle'
                    size = 'large'
                    color = 'default'
                > Title Large </TitleText>
                <TitleText
                    room = 'content-middle'
                    size = 'normal'
                    color = 'primary'
                > Title Normal </TitleText>
                <TitleText
                    room = 'content-middle'
                    size = 'small'
                    color = 'secondary'
                > Title Small </TitleText>
            </RowLayout>
            <HorizontalDivider room = 'content-middle' edgeToEdge = { true }/>
            <RowLayout
                room = 'content-middle'
                roomAlignment = 'center'
                margin = {{
                    horizontal: 10
                }}
            >
                <SubtitleText
                    room = 'content-middle'
                    size = 'large'
                    color = 'default'
                > Subtitle Large </SubtitleText>
                <SubtitleText
                    room = 'content-middle'
                    size = 'normal'
                    color = 'primary'
                > Subtitle Normal </SubtitleText>
                <SubtitleText
                    room = 'content-middle'
                    size = 'small'
                    color = 'secondary'
                > Subtitle Small </SubtitleText>
            </RowLayout>
            <HorizontalDivider room = 'content-middle'edgeToEdge = { true } />
            <RowLayout
                room = 'content-middle'
                roomAlignment = 'center'
                margin = {{
                    horizontal: 10
                }}
            >
                <InfoText
                    room = 'content-middle'
                    size = 'large'
                    color = 'default'
                > Info Large </InfoText>
                <InfoText
                    room = 'content-middle'
                    size = 'normal'
                    color = 'primary'
                > Info Normal </InfoText>
                <InfoText
                    room = 'content-middle'
                    size = 'small'
                    color = 'secondary'
                > Info Small </InfoText>
            </RowLayout>
            <HorizontalDivider room = 'content-middle' edgeToEdge = { true }/>
            <RowLayout
                room = 'content-middle'
                roomAlignment = 'center'
                margin = {{
                    horizontal: 10
                }}
            >
                <CaptionText
                    room = 'content-middle'
                    size = 'large'
                    color = 'default'
                > Caption Large </CaptionText>
                <CaptionText
                    room = 'content-middle'
                    size = 'normal'
                    color = 'primary'
                > Caption Normal </CaptionText>
                <CaptionText
                    room = 'content-middle'
                    size = 'small'
                    color = 'secondary'
                > Caption Small </CaptionText>
            </RowLayout>
        </RowLayout>
    );
};

TextView.propTypes = {
    Theme: PropTypes.object,
    shade: PropTypes.oneOf([ `light`, `dark` ])
};

export default TextView;

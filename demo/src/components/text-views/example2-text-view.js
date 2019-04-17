'use strict'; // eslint-disable-line

import { Ht } from 'hypertoxin';

import React from 'react';

import ReactNative from 'react-native'; // eslint-disable-line

import PropTypes from 'prop-types';

// import DefaultTheme from '../../themes/default-theme';

const {
    Dimensions
} = ReactNative;

const {
    RowLayout,
    ColumnLayout,
    FlatButton,
    HeadlineText,
    TitleText,
    SubtitleText,
    InfoText,
    CaptionText,
    AvatarImage,
    CoverImage
} = Ht;

const DEVICE_WIDTH = Dimensions.get(`window`).width;

const Example2TextView = (props) => {
    const {
        Theme,
        shade
    } = props;

    return (
        <RowLayout
            shade = { shade }
            roomAlignment = 'start'
            contentTopRoomAlignment = 'center'
        >
            <CoverImage
                room = 'content-top'
                resizeMode = 'cover'
                source = { require(`../../../assets/images/sunset-lake-wallpaper.jpg`) }
                width = { DEVICE_WIDTH }
                height = { 150 }
            >
                <RowLayout
                    room = 'content-middle'
                    roomAlignment = 'center'
                    margin = {{
                        top: 5,
                        horizontal: 10
                    }}
                >
                    <HeadlineText
                        room = 'content-top'
                        size = 'large'
                        color = { Theme.color.palette.white }
                    > Animal Daily Blogs </HeadlineText>
                    <HeadlineText
                        room = 'content-middle'
                        size = 'small'
                        color = { Theme.color.palette.white }
                        indentation = { 5 }
                    > Daily life of animals </HeadlineText>
                </RowLayout>
            </CoverImage>
            <RowLayout
                room = 'content-middle'
                roomAlignment = 'start'
                margin = {{
                    horizontal: 10
                }}
            >
                <TitleText
                    room = 'content-top'
                    size = 'small'
                    color = { Theme.color.palette.darkGrey }
                > About Foxes </TitleText>
                <SubtitleText
                    room = 'content-top'
                    size = 'small'
                > Why foxes are so fantastic. </SubtitleText>
                <ColumnLayout
                    room = 'content-top'
                    roomAlignment = 'start'
                    margin = {{
                        top: 20,
                        bottom: 25
                    }}
                >
                    <AvatarImage
                        room = 'content-left'
                        size = 'small'
                        source = { require(`../../../assets/images/fox.png`) }
                    />
                    <RowLayout
                        room = 'content-middle'
                        roomAlignment = 'start'
                    >
                        <HeadlineText
                            room = 'content-top'
                            size = 'small'
                            color = { Theme.color.palette.teal }
                        > Mr. Fantastic Fox </HeadlineText>
                        <CaptionText room = 'content-middle' > Published 02/18/2018 </CaptionText>
                    </RowLayout>
                    <FlatButton
                        room = 'content-right'
                        overlay = 'transparent-outline'
                        corner = 'circular'
                        size = 'small'
                        label = 'FOLLOW'
                    />
                </ColumnLayout>
                <InfoText room = 'content-middle' >{
                    `\tFoxes are part of the Canidae family, which means they're related to wolves, jackals, and dogs. They're medium-sized, between 7 and 15 pounds, with pointy faces, lithe frames, and bushy tails. But unlike their relatives, foxes are not pack animals.`
                }</InfoText>
                <InfoText room = 'content-middle' >{
                    `\tWhen raising their young, they live in small families—called a "leash of foxes" or a "skulk of foxes"—in underground burrows. Otherwise, they hunt and sleep alone.`
                }</InfoText>
            </RowLayout>
        </RowLayout>
    );
};

Example2TextView.propTypes = {
    Theme: PropTypes.object,
    shade: PropTypes.oneOf([ `light`, `dark` ])
};

export default Example2TextView;

'use strict'; // eslint-disable-line

import { Ht } from 'hypertoxin';

import React from 'react';

import ReactNative from 'react-native'; // eslint-disable-line

import PropTypes from 'prop-types';

// import DefaultTheme from '../../themes/default-theme';

const {
    Dimensions,
    FlatList
} = ReactNative;

const {
    RowLayout,
    ColumnLayout,
    FlatButton,
    AvatarImage,
    CoverImage,
    IconImage,
    InfoText,
    CaptionText,
    HorizontalDivider
} = Ht;

const DEVICE_WIDTH = Dimensions.get(`window`).width;
const DEVICE_HEIGHT = Dimensions.get(`window`).height;

const GALLERY_IMAGES = [
    {
        key: `0`,
        name: `Cat May`,
        date: `02/08/2019`,
        avatarImage: require(`../../../assets/images/cat.png`),
        galleryImage: require(`../../../assets/gallery/image-1.png`)
    },
    {
        key: `1`,
        name: `Mister Piggy`,
        date: `12/06/2018`,
        avatarImage: require(`../../../assets/images/pig.png`),
        galleryImage: require(`../../../assets/gallery/image-2.png`)
    },
    {
        key: `2`,
        name: `Owlo`,
        date: `11/23/2018`,
        avatarImage: require(`../../../assets/images/owl.png`),
        galleryImage: require(`../../../assets/gallery/image-3.png`)
    },
    {
        key: `3`,
        name: `Mr. Fantastic`,
        date: `05/01/2014`,
        avatarImage: require(`../../../assets/images/fox.png`),
        galleryImage: require(`../../../assets/gallery/image-4.png`)
    },
    {
        key: `4`,
        name: `Gentelman Penguin`,
        date: `19/08/2018`,
        avatarImage: require(`../../../assets/images/penguin.png`),
        galleryImage: require(`../../../assets/gallery/image-5.png`)
    },
    {
        key: `5`,
        name: `Doggo`,
        date: `07/06/2018`,
        avatarImage: require(`../../../assets/images/dog.png`),
        galleryImage: require(`../../../assets/gallery/image-6.png`)
    },
    {
        key: `6`,
        name: `Ham`,
        date: `09/03/2018`,
        avatarImage: require(`../../../assets/images/hamster.png`),
        galleryImage: require(`../../../assets/gallery/image-7.png`)
    },
    {
        key: `7`,
        name: `Creepy Froggy`,
        date: `19/08/2018`,
        avatarImage: require(`../../../assets/images/frog.png`),
        galleryImage: require(`../../../assets/gallery/image-8.png`)
    },
    {
        key: `8`,
        name: `Rabbita`,
        date: `14/04/2012`,
        avatarImage: require(`../../../assets/images/rabbit.png`),
        galleryImage: require(`../../../assets/gallery/image-9.png`)
    }
];

const ImageView = (props) => {
    const {
        Theme,
        shade
    } = props;

    return (
        <FlatList
            room = 'content-middle'
            data = { GALLERY_IMAGES }
            extraData = { props }
            renderItem = {({
                item,
                index
            }) => {
                return ([
                    <ColumnLayout
                        key = { `${index}-1` }
                        room = 'content-top'
                        roomAlignment = 'stretch'
                        contentLeftRoomAlignment = 'center'
                        contentRightRoomAlignment = 'end'
                        shade = { shade }
                        margin = {{
                            vertical: 5
                        }}
                    >
                        <AvatarImage
                            room = 'content-left'
                            overlay = 'transparent'
                            source = { item.avatarImage }
                            dropShadowed = { false }
                            margin = {{
                                left: 10
                            }}
                        />
                        <InfoText room = 'content-left' indentation = { 5 }>{ item.name }</InfoText>
                        <FlatButton
                            room = 'content-right'
                            overlay = 'transparent'
                            size = 'small'
                            corner = 'circular'
                            margin = {{
                                right: 10
                            }}
                        >
                            <IconImage
                                room = 'content-middle'
                                source = 'ellipsis'
                                dropShadowed = { false }
                            />
                        </FlatButton>
                    </ColumnLayout>,
                    <CoverImage
                        key = { `${index}-2` }
                        room = 'content-middle'
                        shade = { shade }
                        resizeMode = 'cover'
                        source = { item.galleryImage }
                        corner = 'sharp'
                        width = { DEVICE_WIDTH }
                        height = { DEVICE_HEIGHT * 0.4 }
                    />,
                    <RowLayout
                        key = { `${index}-3` }
                        room = 'content-bottom'
                        roomAlignment = 'stretch'
                        contentTopRoomAlignment = 'stretch'
                        shade = { shade }
                        margin = {{
                            vertical: 5
                        }}
                    >
                        <ColumnLayout
                            room = 'content-top'
                            roomAlignment = 'stretch'
                        >
                            <FlatButton
                                room = 'content-left'
                                overlay = 'transparent'
                                size = 'small'
                                corner = 'circular'
                                margin = {{
                                    left: 10
                                }}
                            >
                                <IconImage
                                    room = 'content-middle'
                                    source = 'favorite-outline'
                                    dropShadowed = { false }
                                />
                            </FlatButton>
                            <FlatButton
                                room = 'content-left'
                                overlay = 'transparent'
                                size = 'small'
                                corner = 'circular'
                            >
                                <IconImage
                                    room = 'content-middle'
                                    source = 'social-share'
                                    dropShadowed = { false }
                                />
                            </FlatButton>
                            <FlatButton
                                room = 'content-left'
                                overlay = 'transparent'
                                size = 'small'
                                corner = 'circular'
                            >
                                <IconImage
                                    room = 'content-middle'
                                    source = 'email'
                                    dropShadowed = { false }
                                />
                            </FlatButton>
                            <FlatButton
                                room = 'content-right'
                                overlay = 'transparent'
                                size = 'small'
                                corner = 'circular'
                                margin = {{
                                    right: 10
                                }}
                            >
                                <IconImage
                                    room = 'content-middle'
                                    source = 'copyright'
                                    dropShadowed = { false }
                                />
                            </FlatButton>
                        </ColumnLayout>
                        <CaptionText
                            room = 'content-middle'
                            size = 'small'
                            color = { Theme.color.palette.grey }
                            indentation = { 10 }
                        >{ item.date }</CaptionText>
                        <HorizontalDivider
                            room = 'content-middle'
                            thickness = { 1 }
                            edgeToEdge = { true }
                            margin = {{
                                vertical: 10
                            }}
                        />
                    </RowLayout>
                ]);
            }}
            keyExtractor={(item, index) => index.toString()}
            style = {{
                flexShrink: 1,
                width: DEVICE_WIDTH,
                backgroundColor: `transparent`
            }}
        />
    );
};

ImageView.propTypes = {
    Theme: PropTypes.object,
    shade: PropTypes.oneOf([ `light`, `dark` ])
};

export default ImageView;

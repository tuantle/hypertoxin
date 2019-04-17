'use strict'; // eslint-disable-line

import { Ht } from 'hypertoxin';

import React from 'react';

import ReactNative from 'react-native'; // eslint-disable-line

import PropTypes from 'prop-types';

// import DefaultTheme from '../../themes/default-theme';

const {
    RowLayout,
    ColumnLayout,
    AvatarImage,
    // CoverImage,
    IconImage,
    HeadlineText,
    CaptionText,
    HorizontalDivider
} = Ht;

const ImageView = (props) => {
    const {
        shade
    } = props;

    return (
        <RowLayout
            overlay = 'opaque'
            shade = { shade }
            roomAlignment = 'center'
        >
            <HeadlineText room = 'content-middle' > Avatar Image </HeadlineText>
            <ColumnLayout
                room = 'content-middle'
                roomAlignment = 'center'
                margin = { 10 }
            >
                <AvatarImage
                    room = 'content-left'
                    source = { require(`../../../assets/images/fox.png`) }
                    size = 'small'
                    color = 'default'
                    dropShadowed = { true }
                    margin = { 10 }
                />
                <AvatarImage
                    room = 'content-middle'
                    source = { require(`../../../assets/images/fox.png`) }
                    size = 'normal'
                    color = 'primary'
                    dropShadowed = { true }
                    margin = { 10 }
                />
                <AvatarImage
                    room = 'content-right'
                    source = { require(`../../../assets/images/fox.png`) }
                    size = 'large'
                    color = 'secondary'
                    dropShadowed = { true }
                    margin = { 10 }
                />
            </ColumnLayout>
            <ColumnLayout
                room = 'content-middle'
                roomAlignment = 'center'
                margin = { 10 }
            >
                <AvatarImage
                    room = 'content-left'
                    overlay = 'transparent-outline'
                    source = { require(`../../../assets/images/rabbit.png`) }
                    size = 'small'
                    color = 'accent'
                    dropShadowed = { false }
                    margin = { 10 }
                />
                <AvatarImage
                    room = 'content-middle'
                    overlay = 'transparent-outline'
                    source = { require(`../../../assets/images/rabbit.png`) }
                    size = 'normal'
                    color = 'primary'
                    dropShadowed = { false }
                    margin = { 10 }
                />
                <AvatarImage
                    room = 'content-right'
                    overlay = 'transparent-outline'
                    source = { require(`../../../assets/images/rabbit.png`) }
                    size = 'large'
                    color = 'secondary'
                    dropShadowed = { false }
                    margin = { 10 }
                />
            </ColumnLayout>
            <HorizontalDivider room = 'content-middle' edgeToEdge = { true }/>
            <HeadlineText room = 'content-middle' > Icon Image </HeadlineText>
            <CaptionText room = 'content-middle' size = 'large' > Using material icons preset </CaptionText>
            <ColumnLayout
                room = 'content-middle'
                roomAlignment = 'center'
                margin = { 10 }
            >
                <IconImage
                    room = 'content-left'
                    source = 'socialShare'
                    color = 'default'
                    dropShadowed = { false }
                    margin = { 10 }
                />
                <IconImage
                    room = 'content-left'
                    source = 'facebook'
                    color = 'default'
                    dropShadowed = { false }
                    margin = { 10 }
                />
                <IconImage
                    room = 'content-middle'
                    source = 'twitter'
                    color = 'primary'
                    dropShadowed = { false }
                    margin = { 10 }
                />
                <IconImage
                    room = 'content-middle'
                    source = 'googlePlus'
                    color = 'primary'
                    dropShadowed = { false }
                    margin = { 10 }
                />
                <IconImage
                    room = 'content-right'
                    source = 'github'
                    color = 'secondary'
                    dropShadowed = { false }
                    margin = { 10 }
                />
                <IconImage
                    room = 'content-right'
                    source = 'home'
                    color = 'secondary'
                    dropShadowed = { false }
                    margin = { 10 }
                />
                <IconImage
                    room = 'content-left'
                    source = 'profile'
                    color = 'accent'
                    dropShadowed = { false }
                    margin = { 10 }
                />
                <IconImage
                    room = 'content-left'
                    source = 'ellipsis'
                    color = 'accent'
                    dropShadowed = { false }
                    margin = { 10 }
                />
            </ColumnLayout>
            <CaptionText room = 'content-middle' size = 'large' > With randomized colors </CaptionText>
            <ColumnLayout
                room = 'content-middle'
                roomAlignment = 'center'
                margin = { 10 }
            >
                <IconImage
                    room = 'content-middle'
                    source = 'edit'
                    color = { `#${(Math.random() * (1 << 24) | 0).toString(16)}00000`.slice(0, 7) }
                    dropShadowed = { false }
                    margin = { 10 }
                />
                <IconImage
                    room = 'content-middle'
                    source = 'star'
                    color = { `#${(Math.random() * (1 << 24) | 0).toString(16)}00000`.slice(0, 7) }
                    dropShadowed = { false }
                    margin = { 10 }
                />
                <IconImage
                    room = 'content-right'
                    source = 'menu'
                    color = { `#${(Math.random() * (1 << 24) | 0).toString(16)}00000`.slice(0, 7) }
                    dropShadowed = { false }
                    margin = { 10 }
                />
                <IconImage
                    room = 'content-right'
                    source = 'close'
                    color = { `#${(Math.random() * (1 << 24) | 0).toString(16)}00000`.slice(0, 7) }
                    dropShadowed = { false }
                    margin = { 10 }
                />
                <IconImage
                    room = 'content-left'
                    source = 'cancel'
                    color = { `#${(Math.random() * (1 << 24) | 0).toString(16)}00000`.slice(0, 7) }
                    dropShadowed = { false }
                    margin = { 10 }
                />
                <IconImage
                    room = 'content-left'
                    source = 'goBack'
                    color = { `#${(Math.random() * (1 << 24) | 0).toString(16)}00000`.slice(0, 7) }
                    dropShadowed = { false }
                    margin = { 10 }
                />
                <IconImage
                    room = 'content-middle'
                    source = 'goForward'
                    color = { `#${(Math.random() * (1 << 24) | 0).toString(16)}00000`.slice(0, 7) }
                    dropShadowed = { false }
                    margin = { 10 }
                />
                <IconImage
                    room = 'content-middle'
                    source = 'expand'
                    color = { `#${(Math.random() * (1 << 24) | 0).toString(16)}00000`.slice(0, 7) }
                    dropShadowed = { false }
                    margin = { 10 }
                />
            </ColumnLayout>
            <ColumnLayout
                room = 'content-middle'
                roomAlignment = 'center'
                margin = { 10 }
            >
                <IconImage
                    room = 'content-right'
                    source = 'collapse'
                    color = { `#${(Math.random() * (1 << 24) | 0).toString(16)}00000`.slice(0, 7) }
                    dropShadowed = { false }
                    margin = { 10 }
                />
                <IconImage
                    room = 'content-right'
                    source = 'add'
                    color = { `#${(Math.random() * (1 << 24) | 0).toString(16)}00000`.slice(0, 7) }
                    dropShadowed = { false }
                    margin = { 10 }
                />
                <IconImage
                    room = 'content-left'
                    source = 'delete'
                    color = { `#${(Math.random() * (1 << 24) | 0).toString(16)}00000`.slice(0, 7) }
                    dropShadowed = { false }
                    margin = { 10 }
                />
                <IconImage
                    room = 'content-left'
                    source = 'check'
                    color = { `#${(Math.random() * (1 << 24) | 0).toString(16)}00000`.slice(0, 7) }
                    dropShadowed = { false }
                    margin = { 10 }
                />
                <IconImage
                    room = 'content-middle'
                    source = 'tag'
                    color = { `#${(Math.random() * (1 << 24) | 0).toString(16)}00000`.slice(0, 7) }
                    dropShadowed = { false }
                    margin = { 10 }
                />
                <IconImage
                    room = 'content-middle'
                    source = 'untag'
                    color = { `#${(Math.random() * (1 << 24) | 0).toString(16)}00000`.slice(0, 7) }
                    dropShadowed = { false }
                    margin = { 10 }
                />
                <IconImage
                    room = 'content-right'
                    source = 'exclamation'
                    color = { `#${(Math.random() * (1 << 24) | 0).toString(16)}00000`.slice(0, 7) }
                    dropShadowed = { false }
                    margin = { 10 }
                />
                <IconImage
                    room = 'content-right'
                    source = 'smileyFace'
                    color = { `#${(Math.random() * (1 << 24) | 0).toString(16)}00000`.slice(0, 7) }
                    dropShadowed = { false }
                    margin = { 10 }
                />
            </ColumnLayout>
            <ColumnLayout
                room = 'content-middle'
                roomAlignment = 'center'
                margin = { 10 }
            >
                <IconImage
                    room = 'content-left'
                    source = 'currentLocation'
                    color = { `#${(Math.random() * (1 << 24) | 0).toString(16)}00000`.slice(0, 7) }
                    dropShadowed = { false }
                    margin = { 10 }
                />
                <IconImage
                    room = 'content-left'
                    source = 'info'
                    color = { `#${(Math.random() * (1 << 24) | 0).toString(16)}00000`.slice(0, 7) }
                    dropShadowed = { false }
                    margin = { 10 }
                />
                <IconImage
                    room = 'content-middle'
                    source = 'camera'
                    color = { `#${(Math.random() * (1 << 24) | 0).toString(16)}00000`.slice(0, 7) }
                    dropShadowed = { false }
                    margin = { 10 }
                />
                <IconImage
                    room = 'content-middle'
                    source = 'tune'
                    color = { `#${(Math.random() * (1 << 24) | 0).toString(16)}00000`.slice(0, 7) }
                    dropShadowed = { false }
                    margin = { 10 }
                />
                <IconImage
                    room = 'content-right'
                    source = 'favorite'
                    color = { `#${(Math.random() * (1 << 24) | 0).toString(16)}00000`.slice(0, 7) }
                    dropShadowed = { false }
                    margin = { 10 }
                />
                <IconImage
                    room = 'content-right'
                    source = 'setting'
                    color = { `#${(Math.random() * (1 << 24) | 0).toString(16)}00000`.slice(0, 7) }
                    dropShadowed = { false }
                    margin = { 10 }
                />
                <IconImage
                    room = 'content-right'
                    source = 'notification'
                    color = { `#${(Math.random() * (1 << 24) | 0).toString(16)}00000`.slice(0, 7) }
                    dropShadowed = { false }
                    margin = { 10 }
                />
                <IconImage
                    room = 'content-right'
                    source = 'creditCard'
                    color = { `#${(Math.random() * (1 << 24) | 0).toString(16)}00000`.slice(0, 7) }
                    dropShadowed = { false }
                    margin = { 10 }
                />
            </ColumnLayout>
        </RowLayout>
    );
};

ImageView.propTypes = {
    Theme: PropTypes.object,
    shade: PropTypes.oneOf([ `light`, `dark` ])
};

export default ImageView;

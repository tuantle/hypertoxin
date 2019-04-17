'use strict'; // eslint-disable-line

import { Ht } from 'hypertoxin';

import React from 'react';

import ReactNative from 'react-native'; // eslint-disable-line

import PropTypes from 'prop-types';

import DefaultTheme from '../../themes/default-theme';

const {
    BodyScreen,
    HeaderScreen,
    RowLayout,
    ColumnLayout,
    FlatButton,
    HeadlineText,
    TitleText,
    SubtitleText,
    CaptionText,
    AvatarImage,
    IconImage
} = Ht;

export default class Example2HeaderScreenView extends React.Component {
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
        this.headerScreenRef = null;
        this.state = {
            headerNavigationVisible: false,
            headerMediaVisible: true
        };
    }
    render () {
        const component = this;
        const {
            Theme,
            shade,
            navigation
        } = component.props;
        // const {
        //     headerNavigationVisible,
        //     headerMediaVisible
        // } = component.state;

        return ([
            <HeaderScreen
                key = 'header-screen'
                ref = {(componentRef) => {
                    component.headerScreenRef = componentRef;
                }}
                overlay = 'transparent'
                coverImageSource = { require(`../../../assets/images/geometric-wallpaper.png`) }
                label = 'PROFILE'
                shade = { shade }
            >
                <FlatButton
                    room = 'content-left'
                    overlay = 'transparent'
                    corner = 'circular'
                    onPress = {() => navigation.toggleDrawer()}
                >
                    <IconImage
                        room = 'content-middle'
                        source = 'menu'
                    />
                </FlatButton>
                <ColumnLayout
                    room = 'media'
                    shade = 'dark'
                    exclusions = {[ `shade` ]}
                    overlay = 'transparent'
                    roomAlignment = 'center'
                    corner = 'sharp'
                >
                    <AvatarImage
                        room = 'content-left'
                        source = { require(`../../../assets/images/fox.png`) }
                        size = 'large'
                        dropShadowed = { false }
                        margin = {{
                            vertical: 5,
                            right: 10
                        }}
                    />
                    <RowLayout
                        room = 'content-left'
                        overlay = 'transparent'
                        margin = {{
                            vertical: 5,
                            right: 10
                        }}
                    >
                        <TitleText
                            room = 'content-top'
                            shade = 'light'
                            size = 'small'
                        > Mr. Fantastic Fox </TitleText>
                        <SubtitleText
                            room = 'content-middle'
                        > A cool fox! </SubtitleText>
                    </RowLayout>
                    <FlatButton
                        room = 'content-right'
                        overlay = 'transparent-outline'
                        corner = 'circular'
                        size = 'small'
                        label = 'LIKE'
                        color = { Theme.color.palette.teal }
                        margin = {{
                            right: 10,
                            vertical: 5
                        }}
                    />
                </ColumnLayout>
                <FlatButton
                    room = 'content-right'
                    overlay = 'transparent'
                    corner = 'circular'
                >
                    <IconImage
                        room = 'content-middle'
                        size = 'large'
                        source = 'info'
                    />
                </FlatButton>
            </HeaderScreen>,
            <BodyScreen
                key = 'body-screen'
                shade = { shade }
                contentTopRoomAlignment = 'center'
                contentMiddleRoomAlignment = 'stretch'
                style = {{
                    container: {
                        paddingTop: 180
                    }
                }}
            >
                <HeadlineText room = 'content-top' > Header Screen Example 2 </HeadlineText>
                <CaptionText room = 'content-top' size = 'large' > With profile media section.  </CaptionText>
            </BodyScreen>
        ]);
    }
}

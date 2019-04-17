'use strict'; // eslint-disable-line

import { Ht } from 'hypertoxin';

import React from 'react';

import ReactNative from 'react-native'; // eslint-disable-line

import PropTypes from 'prop-types';

import DefaultTheme from '../../themes/default-theme';

const {
    BodyScreen,
    HeaderScreen,
    SearchField,
    FlatButton,
    IconImage,
    HeadlineText,
    CaptionText
} = Ht;

export default class Example1HeaderScreenView extends React.Component {
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
                <SearchField
                    ref = {(componentRef) => {
                        component.searchFieldRef = componentRef;
                    }}
                    room = 'content-middle'
                    exclusions = {[ `size` ]}
                    size = 'small'
                    hint = 'Search...'
                    dropShadowed = { false }
                    initiallyCollapsed = { false }
                    suggestive = { false }
                >
                    <FlatButton
                        room = 'content-left'
                        overlay = 'transparent'
                        corner = 'circular'
                    >
                        <IconImage
                            room = 'content-middle'
                            source = 'search'
                        />
                    </FlatButton>
                    <FlatButton
                        room = 'content-right'
                        action = 'clear'
                        overlay = 'transparent'
                        corner = 'circular'
                    >
                        <IconImage
                            room = 'content-middle'
                            source = 'cancel'
                        />
                    </FlatButton>
                </SearchField>
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
                        paddingTop: 100
                    }
                }}
            >
                <HeadlineText room = 'content-top' > Header Screen Example 1 </HeadlineText>
                <CaptionText room = 'content-top' size = 'large' > With search field and buttons.  </CaptionText>
            </BodyScreen>
        ]);
    }
}

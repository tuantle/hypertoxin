'use strict'; // eslint-disable-line

import { Ht } from 'hypertoxin';

import React from 'react';

import ReactNative from 'react-native'; // eslint-disable-line

import { createMaterialTopTabNavigator } from 'react-navigation';

import ImageView from '../image-views/image-view';
import Example1ImageView from '../image-views/example1-image-view';

import DefaultTheme from '../../themes/default-theme';

const {
    Dimensions
} = ReactNative;

const {
    BodyScreen,
    HeaderScreen,
    FlatButton,
    IconImage
} = Ht;

const DEVICE_WIDTH = Dimensions.get(`window`).width;

const ImageTopTabNavigator = createMaterialTopTabNavigator({
    image: {
        screen: ({
            screenProps
        }) => {
            const {
                component
            } = screenProps;
            const {
                Theme,
                shade
            } = component.state;

            return (
                <ImageView
                    Theme = { Theme }
                    shade = { shade }
                />
            );
        },
        navigationOptions: () => {
            return {
                tabBarVisible: true,
                tabBarLabel: `IMAGE`
            };
        }
    },
    example1: {
        screen: ({
            screenProps
        }) => {
            const {
                component
            } = screenProps;
            const {
                Theme,
                shade
            } = component.state;

            return (
                <Example1ImageView
                    Theme = { Theme }
                    shade = { shade }
                />
            );
        },
        navigationOptions: () => {
            return {
                tabBarVisible: true,
                tabBarLabel: `EXAMPLE 1`
            };
        }
    }
}, {
    swipeEnabled: true,
    animationEnabled: true,
    lazy: true,
    initialRouteName: `image`,
    tabBarPosition: `top`,
    tabBarOptions: {
        scrollEnabled: true,
        activeTintColor: DefaultTheme.color.palette.red,
        inactiveTintColor: DefaultTheme.color.palette.blue,
        activeBackgroundColor: `transparent`,
        inactiveBackgroundColor: `transparent`,
        labelStyle: {
            ...DefaultTheme.font.smaller,
            flexWrap: `nowrap`
        },
        tabStyle: {
            justifyContent: `center`,
            alignItems: `center`,
            width: DEVICE_WIDTH / 2
        },
        indicatorStyle: {
            borderBottomColor: DefaultTheme.color.palette.red,
            borderBottomWidth: 2
        },
        style: {
            flexShrink: 1,
            flexDirection: `column`,
            justifyContent: `flex-start`,
            alignItems: `flex-start`,
            width: DEVICE_WIDTH,
            height: 45,
            backgroundColor: `transparent`
        }
    }
});

export default class ImageTopTabNavigatorWrapper extends React.Component {
    static router = ImageTopTabNavigator.router;
    constructor (props) {
        super(props);
    }
    render () {
        const component = this;
        const {
            navigation,
            screenProps
        } = component.props;
        const {
            shade
        } = screenProps.component.state;

        return ([
            <HeaderScreen
                key = 'header-screen'
                size = 'small'
                shade = { shade }
                label = 'IMAGES'
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
            </HeaderScreen>,
            <BodyScreen
                key = 'body-screen'
                shade = { shade }
                contentMiddleRoomAlignment = 'start'
                style = {{
                    container: {
                        paddingTop: 75
                    }
                }}
            >
                <ImageTopTabNavigator
                    key = 'image-top-tab-navigator'
                    room = 'content-middle'
                    { ...component.props }
                />
            </BodyScreen>
        ]);
    }
}

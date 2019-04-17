'use strict'; // eslint-disable-line

import { Ht } from 'hypertoxin';

import React from 'react';

import ReactNative from 'react-native'; // eslint-disable-line

import { createMaterialTopTabNavigator } from 'react-navigation';

import ClearButtonView from '../button-views/clear-button-view';
import FlatButtonView from '../button-views/flat-button-view';
import RaisedButtonView from '../button-views/raised-button-view';
import AreaButtonView from '../button-views/area-button-view';

import DefaultTheme from '../../themes/default-theme';

const {
    Dimensions
} = ReactNative;

const {
    HeaderScreen,
    BodyScreen,
    FlatButton,
    IconImage
} = Ht;

const DEVICE_WIDTH = Dimensions.get(`window`).width;
// const DEVICE_HEIGHT = Dimensions.get(`window`).height;

const ButtonTopTabNavigator = createMaterialTopTabNavigator({
    clearButton: {
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
                <ClearButtonView
                    Theme = { Theme }
                    shade = { shade }
                />
            );
        },
        navigationOptions: () => {
            return {
                tabBarVisible: true,
                tabBarLabel: `CLEAR BUTTON`
            };
        }
    },
    flatButton: {
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
                <FlatButtonView
                    Theme = { Theme }
                    shade = { shade }
                />
            );
        },
        navigationOptions: () => {
            return {
                tabBarVisible: true,
                tabBarLabel: `FLAT BUTTON`
            };
        }
    },
    raisedButton: {
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
                <RaisedButtonView
                    Theme = { Theme }
                    shade = { shade }
                />
            );
        },
        navigationOptions: () => {
            return {
                tabBarVisible: true,
                tabBarLabel: `RAISED BUTTON`
            };
        }
    },
    areaButton: {
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
                <AreaButtonView
                    Theme = { Theme }
                    shade = { shade }
                />
            );
        },
        navigationOptions: () => {
            return {
                tabBarVisible: true,
                tabBarLabel: `AREA BUTTON`
            };
        }
    }
}, {
    swipeEnabled: true,
    animationEnabled: true,
    lazy: true,
    initialRouteName: `clearButton`,
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
            width: DEVICE_WIDTH / 3
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
            height: 50,
            backgroundColor: `transparent`
        }
    }
});

export default class ButtonTopTabNavigatorWrapper extends React.Component {
    static router = ButtonTopTabNavigator.router;
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
                shade = { shade }
                label = 'BUTTONS'
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
                style = {{
                    container: {
                        paddingTop: 90
                    }
                }}
            >
                <ButtonTopTabNavigator
                    key = 'button-top-tab-navigator'
                    room = 'content-middle'
                    { ...component.props }
                />
            </BodyScreen>
        ]);
    }
}

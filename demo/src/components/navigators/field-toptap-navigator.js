'use strict'; // eslint-disable-line

import { Ht } from 'hypertoxin';

import React from 'react';

import ReactNative from 'react-native'; // eslint-disable-line

import { createMaterialTopTabNavigator } from 'react-navigation';

import TextFieldView from '../field-views/text-field-view';
import SearchFieldView from '../field-views/search-field-view';
import Example1TextFieldView from '../field-views/example1-text-field-view';
import Example2TextFieldView from '../field-views/example2-text-field-view';
import Example3TextFieldView from '../field-views/example3-text-field-view';

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

const FieldTopTabNavigator = createMaterialTopTabNavigator({
    textField: {
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
                <TextFieldView
                    Theme = { Theme }
                    shade = { shade }
                />
            );
        },
        navigationOptions: () => {
            return {
                tabBarVisible: true,
                tabBarLabel: `TEXT FIELD`
            };
        }
    },
    searchField: {
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
                <SearchFieldView
                    Theme = { Theme }
                    shade = { shade }
                />
            );
        },
        navigationOptions: () => {
            return {
                tabBarVisible: true,
                tabBarLabel: `SEARCH FIELD`
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
                <Example1TextFieldView
                    Theme = { Theme }
                    shade = { shade }
                />
            );
        },
        navigationOptions: () => {
            return {
                tabBarVisible: true,
                tabBarLabel: `EXAMPLE1`
            };
        }
    },
    example2: {
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
                <Example2TextFieldView
                    Theme = { Theme }
                    shade = { shade }
                />
            );
        },
        navigationOptions: () => {
            return {
                tabBarVisible: true,
                tabBarLabel: `EXAMPLE2`
            };
        }
    },
    example3: {
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
                <Example3TextFieldView
                    Theme = { Theme }
                    shade = { shade }
                />
            );
        },
        navigationOptions: () => {
            return {
                tabBarVisible: true,
                tabBarLabel: `EXAMPLE3`
            };
        }
    }
}, {
    swipeEnabled: true,
    animationEnabled: true,
    lazy: true,
    initialRouteName: `textField`,
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

export default class FieldTabNavigatorWrapper extends React.Component {
    static router = FieldTopTabNavigator.router;
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
                label = 'FIELDS'
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
                keyboardAvoiding = { true }
                coverImageSource = { shade === `light` ? require(`../../../assets/images/light-background-with-logo.png`) : require(`../../../assets/images/dark-background-with-logo.png`) }
                style = {{
                    container: {
                        paddingTop: 90
                    }
                }}
            >
                <FieldTopTabNavigator
                    key = 'field-top-tab-navigator'
                    room = 'content-middle'
                    { ...component.props }
                />
            </BodyScreen>
        ]);
    }
}

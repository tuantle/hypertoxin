'use strict'; // eslint-disable-line

import { Ht } from 'hypertoxin';

import React from 'react';

import ReactNative from 'react-native'; // eslint-disable-line

import { createMaterialTopTabNavigator } from 'react-navigation';

import RowLayoutView from '../layout-views/row-layout-view';
import ColumnLayoutView from '../layout-views/column-layout-view';

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

const LayoutTopTabNavigator = createMaterialTopTabNavigator({
    rowLayout: {
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
                <RowLayoutView
                    Theme = { Theme }
                    shade = { shade }
                />
            );
        },
        navigationOptions: () => {
            return {
                tabBarVisible: true,
                tabBarLabel: `ROW LAYOUT`
            };
        }
    },
    columnLayout: {
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
                <ColumnLayoutView
                    Theme = { Theme }
                    shade = { shade }
                />
            );
        },
        navigationOptions: () => {
            return {
                tabBarVisible: true,
                tabBarLabel: `COLUMN LAYOUT`
            };
        }
    }
}, {
    swipeEnabled: true,
    animationEnabled: true,
    lazy: true,
    initialRouteName: `rowLayout`,
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
            height: 50,
            backgroundColor: `transparent`
        }
    }
});

export default class LayoutTopTabNavigatorWrapper extends React.Component {
    static router = LayoutTopTabNavigator.router;
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
                label = 'LAYOUTS'
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
                <LayoutTopTabNavigator
                    key = 'text-top-tab-navigator'
                    room = 'content-top'
                    { ...component.props }
                />
            </BodyScreen>
        ]);
    }
}

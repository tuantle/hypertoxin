'use strict'; // eslint-disable-line

import React from 'react';

import ReactNative from 'react-native'; // eslint-disable-line

import { createBottomTabNavigator } from 'react-navigation';

import HeaderScreenView from '../header-screen-views/header-screen-view';
import Example1HeaderScreenView from '../header-screen-views/example1-header-screen-view';
import Example2HeaderScreenView from '../header-screen-views/example2-header-screen-view';

import DefaultTheme from '../../themes/default-theme';

const HeaderScreenTabNavigator = createBottomTabNavigator({
    headerScreen: {
        screen: ({
            navigation,
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
                <HeaderScreenView
                    Theme = { Theme }
                    shade = { shade }
                    navigation = { navigation }
                />
            );
        },
        navigationOptions: () => {
            return {
                tabBarVisible: true,
                tabBarLabel: `HEADER SCREEN`
            };
        }
    },
    example1: {
        screen: ({
            navigation,
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
                <Example1HeaderScreenView
                    Theme = { Theme }
                    shade = { shade }
                    navigation = { navigation }
                />
            );
        },
        navigationOptions: () => {
            return {
                tabBarVisible: true,
                tabBarLabel: `EXAMPLE 1`
            };
        }
    },
    example2: {
        screen: ({
            navigation,
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
                <Example2HeaderScreenView
                    Theme = { Theme }
                    shade = { shade }
                    navigation = { navigation }
                />
            );
        },
        navigationOptions: () => {
            return {
                tabBarVisible: true,
                tabBarLabel: `EXAMPLE 2`
            };
        }
    }
}, {
    tabBarOptions: {
        activeTintColor: DefaultTheme.color.palette.red,
        inactiveTintColor: DefaultTheme.color.palette.blue
    }
});

export default class HeaderTabNavigatorWrapper extends React.Component {
    static router = HeaderScreenTabNavigator.router;
    constructor (props) {
        super(props);
    }
    render () {
        const component = this;

        return (
            <HeaderScreenTabNavigator
                {...component.props }
            />
        );
    }
}

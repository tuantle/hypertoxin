'use strict'; // eslint-disable-line

import React from 'react';

import ReactNative from 'react-native'; // eslint-disable-line

import { createBottomTabNavigator } from 'react-navigation';

import Example1AnimationView from '../animation-views/example1-animation-view';
import Example2AnimationView from '../animation-views/example2-animation-view';
// import Example3AnimationView from '../animation-views/example3-animation-view';

import DefaultTheme from '../../themes/default-theme';

const AnimationTabNavigator = createBottomTabNavigator({
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
                <Example1AnimationView
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
                <Example2AnimationView
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
    // example3: {
    //     screen: ({
    //         navigation,
    //         screenProps
    //     }) => {
    //         const {
    //             component
    //         } = screenProps;
    //         const {
    //             shade
    //         } = component.state;
    //
    //         return (
    //             <Example3AnimationView
    //                 shade = { shade }
    //                 navigation = { navigation }
    //             />
    //         );
    //     },
    //     navigationOptions: () => {
    //         return {
    //             tabBarVisible: true,
    //             tabBarLabel: `EXAMPLE 3`
    //         };
    //     }
    // }
}, {
    tabBarOptions: {
        activeTintColor: DefaultTheme.color.palette.red,
        inactiveTintColor: DefaultTheme.color.palette.blue
    }
});

export default class HeaderTabNavigatorWrapper extends React.Component {
    static router = AnimationTabNavigator.router;
    constructor (props) {
        super(props);
    }
    render () {
        const component = this;

        return (
            <AnimationTabNavigator
                {...component.props }
            />
        );
    }
}

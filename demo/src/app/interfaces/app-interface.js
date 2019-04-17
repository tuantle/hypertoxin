'use strict'; // eslint-disable-line

import { Hf } from 'hyperflow';

import { Ht, ThemeContext } from 'hypertoxin';

import React from 'react';

import ReactNative from 'react-native'; // eslint-disable-line

import {
    createAppContainer,
    createDrawerNavigator,
    createStackNavigator
} from 'react-navigation';

import ButtonComponentsTopTapNavigator from '../../components/navigators/button-toptap-navigator';

import TextComponentsTopTapNavigator from '../../components/navigators/text-toptap-navigator';

import ImageComponentsTopTapNavigator from '../../components/navigators/image-toptap-navigator';

import FieldComponentsTopTabNavigator from '../../components/navigators/field-toptap-navigator';

import LayoutComponentsTopTapNavigator from '../../components/navigators/layout-toptap-navigator';

import HeaderScreenComponentsTapNavigator from '../../components/navigators/header-screen-tap-navigator';

import AnimationComponentsTapNavigator from '../../components/navigators/animation-tap-navigator';

import MovingWave from '../../components/misc/moving-wave';

import DefaultTheme from '../../themes/default-theme';

import BubbleTheme from '../../themes/bubble-theme';

import WireTheme from '../../themes/wire-theme';

import CoffeeTheme from '../../themes/coffee-theme';

import EVENT from '../events/app-event';

const {
    Dimensions,
    WebView
} = ReactNative;

const {
    BodyScreen,
    HeaderScreen,
    RowLayout,
    FlatButton,
    RaisedButton,
    IconImage,
    HeadlineText,
    TitleText,
    SubtitleText
} = Ht;

const DEVICE_WIDTH = Dimensions.get(`window`).width;
// const DEVICE_HEIGHT = Dimensions.get(`window`).width;

let AppContainer;

const AppInterface = Hf.Interface.augment({
    composites: [
        Hf.React.ComponentComposite
    ],
    setup (done) {
        const intf = this;
        const [
            CalculatorIntf,
            ShoppingIntf
        ] = intf.getComponentComposites(
            `calculator-intf`,
            `shopping-intf`
        );

        const MockupAppsStackNavigator = createStackNavigator({
            mockupAppsHome: {
                screen: ({
                    navigation,
                    screenProps
                }) => {
                    const {
                        component
                    } = screenProps;
                    const {
                        shade
                    } = component.state;

                    return ([
                        <HeaderScreen
                            key = 'header-screen'
                            shade = { shade }
                            label = 'MOCKUP APPS'
                        >
                            <FlatButton
                                room = 'content-left'
                                overlay = 'transparent'
                                corner = 'circular'
                                onPress = {() => navigation.toggleDrawer()}
                            >
                                <IconImage
                                    room = 'content-middle'
                                    size = 'large'
                                    source = 'menu'
                                />
                            </FlatButton>
                        </HeaderScreen>,
                        <BodyScreen
                            key = 'body-screen'
                            shade = { shade }
                            contentMiddleRoomAlignment = 'stretch'
                            coverImageSource = { shade === `light` ? require(`../../../assets/images/light-background-with-logo.png`) : require(`../../../assets/images/dark-background-with-logo.png`) }
                        >
                            <RowLayout
                                room = 'content-middle'
                                roomAlignment = 'center'
                                margin = {{
                                    top: 100
                                }}
                            >
                                <HeadlineText
                                    room = 'content-top'
                                    size = 'large'
                                >  </HeadlineText>
                                <TitleText room = 'content-top' > Mockup App Showcases </TitleText>
                                <SubtitleText room = 'content-top' size = 'small' >
                                    Showing how Hypertoxing is been
                                </SubtitleText>
                                <SubtitleText room = 'content-top' size = 'small' >
                                    use for various apps.
                                </SubtitleText>
                            </RowLayout>
                            <RowLayout
                                room = 'content-middle'
                                roomAlignment = 'stretch'
                                margin = {{
                                    top: 25,
                                    horizontal: 10
                                }}
                            >
                                <RaisedButton
                                    room = 'content-top'
                                    label = 'CALCULATOR APP'
                                    onPress = {() => {
                                        navigation.navigate(`calculatorApp`);
                                    }}
                                />
                                <RaisedButton
                                    room = 'content-top'
                                    label = 'SHOPPING APP'
                                    onPress = {() => {
                                        navigation.navigate(`shoppingApp`);
                                    }}
                                />
                            </RowLayout>
                        </BodyScreen>
                    ]);
                }
            },
            calculatorApp: {
                screen: CalculatorIntf,
                navigationOptions: () => {
                    return {
                        header: {
                            visible: false
                        }
                    };
                }
            },
            shoppingApp: {
                screen: ShoppingIntf,
                navigationOptions: () => {
                    return {
                        header: {
                            visible: false
                        }
                    };
                }
            }
        }, {
            initialRouteName: `mockupAppsHome`,
            mode: `card`,
            headerMode: `none`,
            cardStyle: {
                backgroundColor: `transparent`
            }
        });

        const AppDrawerNavigator = createDrawerNavigator({
            main: {
                screen: ({
                    navigation,
                    screenProps
                }) => {
                    const {
                        component
                    } = screenProps;
                    const {
                        Theme,
                        shade,
                        pauseMovingWave
                    } = component.state;

                    return ([
                        <HeaderScreen
                            key = 'header-screen'
                            shade = { shade }
                            label = 'HYPERTOXIN DEMO'
                        >
                            <FlatButton
                                room = 'content-left'
                                overlay = 'transparent'
                                corner = 'circular'
                                onPress = {() => navigation.toggleDrawer()}
                            >
                                <IconImage
                                    room = 'content-middle'
                                    size = 'large'
                                    source = 'menu'
                                />
                            </FlatButton>
                        </HeaderScreen>,
                        <BodyScreen
                            key = 'body-screen'
                            shade = { shade }
                            contentMiddleRoomAlignment = 'stretch'
                            coverImageSource = { shade === `light` ? require(`../../../assets/images/light-background-with-logo.png`) : require(`../../../assets/images/dark-background-with-logo.png`) }
                        >
                            {
                                pauseMovingWave ? null : <MovingWave
                                    room = 'content-bottom'
                                    waves = {[{
                                        color: Theme.color.palette.cyan,
                                        opacity: 0.3,
                                        lineThickness: 6,
                                        amplitude: 50,
                                        phase: 45,
                                        verticalOffset: 5
                                    }, {
                                        color: Theme.color.palette.teal,
                                        opacity: 0.25,
                                        lineThickness: 3,
                                        amplitude: 40,
                                        phase: 90,
                                        verticalOffset: 15
                                    }, {
                                        color: Theme.color.palette.deepBlue,
                                        opacity: 0.2,
                                        lineThickness: 8,
                                        amplitude: 30,
                                        phase: 120,
                                        verticalOffset: 20
                                    }]}
                                />
                            }
                            <RowLayout
                                room = 'content-middle'
                                roomAlignment = 'center'
                                margin = {{
                                    top: 100
                                }}
                            >
                                <HeadlineText
                                    room = 'content-top'
                                    size = 'large'
                                > Hypertoxin </HeadlineText>
                                <TitleText room = 'content-top' > Demo and Showcase </TitleText>
                                <SubtitleText room = 'content-top' size = 'small' > A themeable ReactNative </SubtitleText>
                                <SubtitleText room = 'content-top' size = 'small' > component library! </SubtitleText>
                            </RowLayout>
                            <RowLayout
                                room = 'content-middle'
                                roomAlignment = 'stretch'
                                margin = {{
                                    top: 50,
                                    horizontal: 10
                                }}
                            >
                                <RaisedButton
                                    room = 'content-top'
                                    label = 'USE DEFAULT THEME'
                                    disabled = { Theme.name === `default` }
                                    onPress = {() => {
                                        component.outgoing(EVENT.ON.SWITCH_THEME).emit(() => DefaultTheme);
                                    }}
                                />
                                <RaisedButton
                                    room = 'content-top'
                                    label = 'USE BUBBLE THEME'
                                    disabled = { Theme.name === `bubble` }
                                    onPress = {() => {
                                        component.outgoing(EVENT.ON.SWITCH_THEME).emit(() => BubbleTheme);
                                    }}
                                />
                                <RaisedButton
                                    room = 'content-top'
                                    label = 'USE WIRE THEME'
                                    disabled = { Theme.name === `wire` }
                                    onPress = {() => {
                                        component.outgoing(EVENT.ON.SWITCH_THEME).emit(() => WireTheme);
                                    }}
                                />
                                <RaisedButton
                                    room = 'content-top'
                                    label = 'USE COFFEE THEME'
                                    disabled = { Theme.name === `coffee` }
                                    onPress = {() => {
                                        component.outgoing(EVENT.ON.SWITCH_THEME).emit(() => CoffeeTheme);
                                    }}
                                />
                                <RaisedButton
                                    room = 'content-bottom'
                                    label = { shade === `light` ? `TOGGLE DARK THEME` : `TOGGLE LIGHT THEME` }
                                    onPress = {() => {
                                        component.outgoing(EVENT.ON.SWITCH_THEME_SHADE).emit();
                                    }}
                                    style = {{
                                        container: {
                                            marginTop: 25
                                        }
                                    }}
                                />
                            </RowLayout>
                        </BodyScreen>
                    ]);
                },
                navigationOptions: () => {
                    return {
                        drawerLabel: `HOME`,
                        drawerIcon: ({ tintColor }) => {
                            return (
                                <IconImage
                                    source = 'home'
                                    color = { tintColor }
                                />
                            );
                        }
                    };
                }
            },
            buttonComponent: {
                screen: ButtonComponentsTopTapNavigator,
                navigationOptions: () => {
                    return {
                        drawerLabel: `BUTTON COMPONENTS`
                    };
                }
            },
            textComponent: {
                screen: TextComponentsTopTapNavigator,
                navigationOptions: () => {
                    return {
                        drawerLabel: `TEXT COMPONENTS`
                    };
                }
            },
            fieldComponent: {
                screen: FieldComponentsTopTabNavigator,
                navigationOptions: () => {
                    return {
                        drawerLabel: `FIELD COMPONENTS`
                    };
                }
            },
            headerScreenComponent: {
                screen: HeaderScreenComponentsTapNavigator,
                navigationOptions: () => {
                    return {
                        drawerLabel: `HEADER SCREEN COMPONENTS`
                    };
                }
            },
            imageComponent: {
                screen: ImageComponentsTopTapNavigator,
                navigationOptions: () => {
                    return {
                        drawerLabel: `IMAGE COMPONENTS`
                    };
                }
            },
            layoutComponent: {
                screen: LayoutComponentsTopTapNavigator,
                navigationOptions: () => {
                    return {
                        drawerLabel: `LAYOUT COMPONENTS`
                    };
                }
            },
            animation: {
                screen: AnimationComponentsTapNavigator,
                navigationOptions: () => {
                    return {
                        drawerLabel: `ANIMATIONS`
                    };
                }
            },
            mockupApps: {
                screen: MockupAppsStackNavigator,
                navigationOptions: () => {
                    return {
                        drawerLabel: `MOCKUP APPS`
                    };
                }
            },
            github: {
                screen: ({
                    navigation,
                    screenProps
                }) => {
                    const {
                        component
                    } = screenProps;
                    const {
                        shade
                    } = component.state;

                    return ([
                        <HeaderScreen
                            key = 'header-screen'
                            room = 'none'
                            shade = { shade }
                            size = 'small'
                            label = 'HYPERTOXIN GITHUB'
                        >
                            <FlatButton
                                room = 'content-left'
                                overlay = 'transparent'
                                corner = 'circular'
                                onPress = {() => navigation.toggleDrawer()}
                            >
                                <IconImage
                                    room = 'content-middle'
                                    size = 'small'
                                    source = 'menu'
                                />
                            </FlatButton>
                        </HeaderScreen>,
                        <WebView
                            key = 'web-view'
                            source = {{
                                uri: `https://github.com/tuantle/hypertoxin/blob/develop/README.md`
                            }}
                            style = {{
                                marginTop: 75,
                                backgroundColor: `transparent`
                            }}
                        >
                        </WebView>
                    ]);
                },
                navigationOptions: () => {
                    return {
                        drawerLabel: `GITHUB`,
                        drawerIcon: ({ tintColor }) => {
                            return (
                                <IconImage
                                    source = 'github'
                                    color = { tintColor }
                                />
                            );
                        }
                    };
                }
            }
        }, {
            drawerWidth: DEVICE_WIDTH * 0.75,
            drawerPosition: `left`,
            drawerBackgroundColor: DefaultTheme.color.palette.white
        });

        AppContainer = createAppContainer(AppDrawerNavigator);

        done();
    },
    render () {
        const component = this;
        const {
            Theme,
            pauseMovingWave
        } = component.state;

        function getActiveRouteName (navigationState) {
            if (!navigationState) {
                return null;
            }
            const route = navigationState.routes[navigationState.index];
            // dive into nested navigators
            if (route.routes) {
                return getActiveRouteName(route);
            }
            return route.routeName;
        }

        return (
            <ThemeContext.Provider value = {{
                Theme
            }}>
                <AppContainer
                    screenProps = {{
                        component
                    }}
                    onNavigationStateChange={(prevState, currentState) => {
                        const currentScreen = getActiveRouteName(currentState);
                        const prevScreen = getActiveRouteName(prevState);

                        if (currentScreen === `main` && pauseMovingWave) {
                            component.outgoing(EVENT.ON.PLAY_MOVING_WAVE).emit();
                        } else if (currentScreen !== `main` && !pauseMovingWave) {
                            component.outgoing(EVENT.ON.PAUSE_MOVING_WAVE).emit();
                        }

                        if (prevScreen !== currentScreen) {
                            Hf.log(`info1`, `Going to ${currentScreen} from ${prevScreen}`);
                        }
                    }}
                />
            </ThemeContext.Provider>
        );
    }
});
export default AppInterface;

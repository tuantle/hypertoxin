/**
 * Copyright 2016-present Tuan Le.
 *
 * Licensed under the MIT License.
 * You may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://opensource.org/licenses/mit-license.html
 *
 * Unless = required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 *------------------------------------------------------------------------
 *
 * @module TextViewInterface
 * @description - Hypertoxin demo client-native text view interface.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 *------------------------------------------------------------------------
 */
'use strict'; // eslint-disable-line

import { Hf } from 'hyperflow';

import { Ht } from 'hypertoxin';

import React from 'react';

import ReactNative from 'react-native'; // eslint-disable-line

import { TabNavigator, TabBarTop } from 'react-navigation';

const {
    Dimensions
} = ReactNative;

const {
    ScreenView,
    HeaderView,
    BodyView,
    LayoutView
} = Ht.View;

const {
    FlatButton
} = Ht.Button;

const {
    IconImage
} = Ht.Image;

const {
    HeadlineText,
    TitleText,
    SubtitleText,
    InfoText,
    CaptionText
} = Ht.Text;

const DEVICE_WIDTH = Dimensions.get(`window`).width;

const TextTabNavigator = TabNavigator({
    headline: {
        screen: (props) => {
            const {
                screenProps
            } = props;
            const {
                component
            } = screenProps;
            const {
                shade
            } = component.props;

            return (
                <BodyView
                    shade = { shade }
                    scrollable = { true }
                    style = {{
                        paddingTop: 35
                    }}
                >
                    <LayoutView
                        orientation = 'horizontal'
                        alignment = 'start'
                        selfAlignment = 'stretch'
                        style = {{
                            paddingHorizontal: 10
                        }}
                    >
                        <HeadlineText
                            size = 'large'
                        > HeadlineText </HeadlineText>
                        <HeadlineText
                            size = 'normal'
                        > HeadlineText </HeadlineText>
                        <HeadlineText
                            size = 'small'
                        > HeadlineText </HeadlineText>
                    </LayoutView>
                </BodyView>
            );
        },
        navigationOptions: () => {
            return {
                tabBarVisible: true,
                tabBarLabel: `HEADLINE`
            };
        }
    },
    title: {
        screen: (props) => {
            const {
                screenProps
            } = props;
            const {
                component
            } = screenProps;
            const {
                shade
            } = component.props;

            return (
                <BodyView
                    shade = { shade }
                    scrollable = { true }
                    style = {{
                        paddingTop: 35
                    }}
                >
                    <LayoutView
                        orientation = 'horizontal'
                        alignment = 'start'
                        selfAlignment = 'stretch'
                        style = {{
                            paddingHorizontal: 10
                        }}
                    >
                        <TitleText
                            size = 'large'
                        > TitleText </TitleText>
                        <TitleText
                            size = 'normal'
                        > TitleText </TitleText>
                        <TitleText
                            size = 'small'
                        > TitleText </TitleText>
                    </LayoutView>
                </BodyView>
            );
        },
        navigationOptions: () => {
            return {
                tabBarVisible: true,
                tabBarLabel: `TITLE`
            };
        }
    },
    subtitle: {
        screen: (props) => {
            const {
                screenProps
            } = props;
            const {
                component
            } = screenProps;
            const {
                shade
            } = component.props;

            return (
                <BodyView
                    shade = { shade }
                    scrollable = { true }
                    style = {{
                        paddingTop: 35
                    }}
                >
                    <LayoutView
                        orientation = 'horizontal'
                        alignment = 'start'
                        selfAlignment = 'stretch'
                        style = {{
                            paddingHorizontal: 10
                        }}
                    >
                        <SubtitleText
                            size = 'large'
                        > SubtitleText </SubtitleText>
                        <SubtitleText
                            size = 'normal'
                        > SubtitleText </SubtitleText>
                        <SubtitleText
                            size = 'small'
                        > SubtitleText </SubtitleText>
                    </LayoutView>
                </BodyView>
            );
        },
        navigationOptions: () => {
            return {
                tabBarVisible: true,
                tabBarLabel: `SUBTITLE`
            };
        }
    },
    info: {
        screen: (props) => {
            const {
                screenProps
            } = props;
            const {
                component
            } = screenProps;
            const {
                shade
            } = component.props;

            return (
                <BodyView
                    shade = { shade }
                    scrollable = { true }
                    style = {{
                        paddingTop: 35
                    }}
                >
                    <LayoutView
                        orientation = 'horizontal'
                        alignment = 'start'
                        selfAlignment = 'stretch'
                        style = {{
                            paddingHorizontal: 10
                        }}
                    >
                        <InfoText
                            size = 'large'
                        > InfoText </InfoText>
                        <InfoText
                            size = 'normal'
                        > InfoText </InfoText>
                        <InfoText
                            size = 'small'
                        > InfoText </InfoText>
                    </LayoutView>
                </BodyView>
            );
        },
        navigationOptions: () => {
            return {
                tabBarVisible: true,
                tabBarLabel: `INFO`
            };
        }
    },
    caption: {
        screen: (props) => {
            const {
                screenProps
            } = props;
            const {
                component
            } = screenProps;
            const {
                shade
            } = component.props;

            return (
                <BodyView
                    shade = { shade }
                    scrollable = { true }
                    style = {{
                        paddingTop: 35
                    }}
                >
                    <LayoutView
                        orientation = 'horizontal'
                        alignment = 'start'
                        selfAlignment = 'stretch'
                        style = {{
                            paddingHorizontal: 10
                        }}
                    >
                        <CaptionText
                            size = 'large'
                        > CaptionText </CaptionText>
                        <CaptionText
                            size = 'normal'
                        > CaptionText </CaptionText>
                        <CaptionText
                            size = 'small'
                        > CaptionText </CaptionText>
                    </LayoutView>
                </BodyView>
            );
        },
        navigationOptions: () => {
            return {
                tabBarVisible: true,
                tabBarLabel: `CAPTION`
            };
        }
    }
}, {
    swipeEnabled: true,
    animationEnabled: true,
    initialRouteName: `headline`,
    tabBarComponent: TabBarTop,
    tabBarPosition: `top`,
    tabBarOptions: {
        scrollEnabled: true,
        activeTintColor: Ht.Theme.palette.red,
        inactiveTintColor: Ht.Theme.palette.blue,
        activeBackgroundColor: `transparent`,
        inactiveBackgroundColor: `transparent`,
        labelStyle: {
            ...Ht.Theme.font.smallBold,
            flexWrap: `nowrap`
        },
        tabStyle: {
            justifyContent: `center`,
            alignItems: `center`,
            width: DEVICE_WIDTH / 3
        },
        indicatorStyle: {
            borderBottomColor: Ht.Theme.palette.red,
            borderBottomWidth: 2
        },
        style: {
            zIndex: 10,
            justifyContent: `center`,
            alignItems: `stretch`,
            backgroundColor: `transparent`
        }
    }
});

const TextViewInterface = Hf.Interface.augment({
    composites: [
        Hf.React.ComponentComposite
    ],
    state: {
        shade: {
            value: `light`,
            oneOf: [ `light`, `dark` ]
        }
    },
    setup: function setup (done) {
        done();
    },
    render: function render () {
        const component = this;
        const {
            navigation,
            shade
        } = component.props;

        return (
            <ScreenView shade = { shade }>
                <HeaderView
                    cId = 'h0'
                    ref = { component.assignComponentRef(`animated-header`) }
                    label = 'TEXTS'
                >
                    <FlatButton
                        room = 'action-left'
                        overlay = 'transparent'
                        corner = 'round50'
                        onPress = {() => navigation.navigate(`DrawerToggle`)}
                    >
                        <IconImage
                            room = 'content-center'
                            size = 'large'
                            source = 'menu'
                        />
                    </FlatButton>
                </HeaderView>
                <TextTabNavigator
                    screenProps = {{
                        component
                    }}
                />
            </ScreenView>
        );
    }
});
export default TextViewInterface;

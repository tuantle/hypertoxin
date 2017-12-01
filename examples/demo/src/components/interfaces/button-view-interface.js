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
 * @module ButtonViewInterface
 * @description - Hypertoxin demo client-native button view interface.
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
    HeadlineText,
    InfoText
} = Ht.Text;

const {
    FlatButton,
    RaisedButton
} = Ht.Button;

const {
    IconImage
} = Ht.Image;

const Divider = Ht.Divider;

const DEVICE_WIDTH = Dimensions.get(`window`).width;

const ButtonTabNavigator = TabNavigator({
    clear: {
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
                    <HeadlineText> Default Clear Buttons </HeadlineText>
                    <LayoutView
                        shade = { shade }
                        orientation = 'horizontal'
                        style = {{
                            paddingHorizontal: 10
                        }}
                    >
                        <LayoutView
                            shade = { shade }
                            orientation = 'vertical'
                        >
                            <FlatButton overlay = 'transparent' label = 'PRIMARY' color = 'primary' />
                            <FlatButton overlay = 'transparent' label = 'SECONDARY' color = 'secondary' />
                            <FlatButton overlay = 'transparent' label = 'DISABLED' disabled = { true }/>
                        </LayoutView>
                        <LayoutView
                            shade = { shade }
                            alignment = 'start'
                            orientation = 'horizontal'
                        >
                            <FlatButton overlay = 'transparent' label = 'HOME PRIMARY' color = 'primary' >
                                <IconImage
                                    room = 'content-left'
                                    source = 'home'
                                    size = 'small'
                                />
                            </FlatButton>
                            <FlatButton overlay = 'transparent' label = 'HOME SECONDARY' color = 'secondary' >
                                <IconImage
                                    room = 'content-left'
                                    source = 'home'
                                    size = 'small'
                                />
                            </FlatButton>
                            <FlatButton overlay = 'transparent' label = 'HOME DISABLED' disabled = { true } >
                                <IconImage
                                    room = 'content-left'
                                    source = 'home'
                                    size = 'small'
                                />
                            </FlatButton>
                        </LayoutView>
                    </LayoutView>
                    <Divider/>
                    <HeadlineText> Clear Buttons with Badges </HeadlineText>
                    <LayoutView
                        shade = { shade }
                        orientation = 'vertical'
                        style = {{
                            paddingHorizontal: 10
                        }}
                    >
                        <FlatButton overlay = 'transparent' label = 'PRIMARY' color = 'primary' >
                            <InfoText size = 'small' room = 'badge' style = {{ color: `white` }} >0</InfoText>
                        </FlatButton>
                        <FlatButton overlay = 'transparent' label = 'SECONDARY' color = 'secondary' >
                            <InfoText size = 'small' room = 'badge' style = {{ color: `white` }} >1</InfoText>
                        </FlatButton>
                        <FlatButton overlay = 'transparent' label = 'DISABLED' disabled = { true } >
                            <InfoText size = 'small' room = 'badge' style = {{ color: `white` }} >2</InfoText>
                        </FlatButton>
                    </LayoutView>
                </BodyView>
            );
        },
        navigationOptions: () => {
            return {
                tabBarVisible: true,
                tabBarLabel: `CLEAR`
            };
        }
    },
    flat: {
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
                    <HeadlineText> Default Flat Buttons </HeadlineText>
                    <LayoutView
                        shade = { shade }
                        orientation = 'horizontal'
                        style = {{
                            paddingHorizontal: 10
                        }}
                    >
                        <LayoutView orientation = 'vertical' >
                            <FlatButton label = 'PRIMARY' color = 'primary' />
                            <FlatButton label = 'SECONDARY' color = 'secondary' />
                            <FlatButton label = 'DISABLED' disabled = { true }/>
                        </LayoutView>
                        <LayoutView alignment = 'start' orientation = 'horizontal' >
                            <FlatButton label = 'FAVORITE PRIMARY' color = 'primary' >
                                <IconImage
                                    room = 'content-left'
                                    source = 'favorite'
                                    size = 'small'
                                />
                            </FlatButton>
                            <FlatButton label = 'FAVORITE SECONDARY' color = 'secondary' >
                                <IconImage
                                    room = 'content-left'
                                    source = 'favorite'
                                    size = 'small'
                                />
                            </FlatButton>
                            <FlatButton label = 'FAVORITE DISABLED' disabled = { true } >
                                <IconImage
                                    room = 'content-left'
                                    source = 'favorite'
                                    size = 'small'
                                />
                            </FlatButton>

                            <FlatButton label = 'FAVORITE PRIMARY' color = 'primary' corner = 'round25' >
                                <IconImage
                                    room = 'content-left'
                                    source = 'favorite'
                                    size = 'small'
                                />
                            </FlatButton>
                            <FlatButton label = 'FAVORITE SECONDARY' color = 'secondary' corner = 'round25' >
                                <IconImage
                                    room = 'content-left'
                                    source = 'favorite'
                                    size = 'small'
                                />
                            </FlatButton>
                            <FlatButton label = 'FAVORITE DISABLED' disabled = { true } corner = 'round25' >
                                <IconImage
                                    room = 'content-left'
                                    source = 'favorite'
                                    size = 'small'
                                />
                            </FlatButton>

                            <FlatButton overlay = 'transparent-outlined' label = 'Profile Primary' color = 'primary' corner = 'round50' >
                                <IconImage
                                    room = 'content-left'
                                    source = 'profile'
                                    size = 'small'
                                />
                            </FlatButton>
                            <FlatButton overlay = 'transparent-outlined' label = 'Profile Secondary' color = 'secondary' corner = 'round50' >
                                <IconImage
                                    room = 'content-left'
                                    source = 'profile'
                                    size = 'small'
                                />
                            </FlatButton>
                            <FlatButton overlay = 'transparent-outlined' label = 'Profile Disabled' disabled = { true } corner = 'round50' >
                                <IconImage
                                    room = 'content-left'
                                    source = 'profile'
                                    size = 'small'
                                />
                            </FlatButton>
                        </LayoutView>
                    </LayoutView>
                    <Divider/>
                    <HeadlineText> Flat Buttons with Badges </HeadlineText>
                    <LayoutView
                        shade = { shade }
                        orientation = 'horizontal'
                        style = {{
                            paddingHorizontal: 10
                        }}
                    >
                        <LayoutView alignment = 'start' orientation = 'horizontal' >
                            <FlatButton overlay = 'transparent-outlined' label = 'Profile Primary' color = 'primary' corner = 'square' >
                                <IconImage
                                    room = 'content-left'
                                    source = 'profile'
                                    size = 'small'
                                />
                                <InfoText size = 'small' room = 'badge' style = {{ color: `white` }} >0</InfoText>
                            </FlatButton>
                            <FlatButton overlay = 'transparent-outlined' label = 'Profile Secondary' color = 'secondary' corner = 'round25' >
                                <IconImage
                                    room = 'content-left'
                                    source = 'profile'
                                    size = 'small'
                                />
                                <InfoText size = 'small' room = 'badge' style = {{ color: `white` }} >1</InfoText>
                            </FlatButton>
                            <FlatButton overlay = 'transparent-outlined' label = 'Profile Disabled' disabled = { true } corner = 'round50' >
                                <IconImage
                                    room = 'content-left'
                                    source = 'profile'
                                    size = 'small'
                                />
                                <InfoText size = 'small' room = 'badge' style = {{ color: `white` }} >2</InfoText>
                            </FlatButton>
                        </LayoutView>
                    </LayoutView>
                </BodyView>
            );
        },
        navigationOptions: () => {
            return {
                tabBarVisible: true,
                tabBarLabel: `FLAT`
            };
        }
    },
    raised: {
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
                    <HeadlineText> Default Raised Buttons </HeadlineText>
                    <LayoutView
                        orientation = 'horizontal'
                        style = {{
                            paddingHorizontal: 10
                        }}
                    >
                        <LayoutView orientation = 'vertical' >
                            <RaisedButton label = 'PRIMARY' color = 'primary' />
                            <RaisedButton label = 'SECONDARY' color = 'secondary' />
                            <RaisedButton label = 'DISABLED' disabled = { true }/>
                        </LayoutView>
                        <LayoutView alignment = 'start' orientation = 'horizontal' >
                            <RaisedButton label = 'STAR PRIMARY' color = 'primary' >
                                <IconImage
                                    room = 'content-left'
                                    source = 'star'
                                    size = 'small'
                                />
                            </RaisedButton>
                            <RaisedButton label = 'STAR SECONDARY' color = 'secondary' >
                                <IconImage
                                    room = 'content-left'
                                    source = 'star'
                                    size = 'small'
                                />
                            </RaisedButton>
                            <RaisedButton label = 'STAR DISABLED' disabled = { true } >
                                <IconImage
                                    room = 'content-left'
                                    source = 'star'
                                    size = 'small'
                                />
                            </RaisedButton>

                            <RaisedButton label = 'SMILE PRIMARY' color = 'primary' corner = 'round25' >
                                <IconImage
                                    room = 'content-left'
                                    source = 'smileyFace'
                                    size = 'small'
                                />
                            </RaisedButton>
                            <RaisedButton label = 'SMILE SECONDARY' color = 'secondary' corner = 'round25' >
                                <IconImage
                                    room = 'content-left'
                                    source = 'smileyFace'
                                    size = 'small'
                                />
                            </RaisedButton>
                            <RaisedButton label = 'SMILE DISABLED' disabled = { true } corner = 'round25' >
                                <IconImage
                                    room = 'content-left'
                                    source = 'smileyFace'
                                    size = 'small'
                                />
                            </RaisedButton>

                            <RaisedButton label = 'SMILE PRIMARY' color = 'primary' corner = 'round50' >
                                <IconImage
                                    room = 'content-left'
                                    source = 'smileyFace'
                                    size = 'small'
                                />
                            </RaisedButton>
                            <RaisedButton label = 'SMILE SECONDARY' color = 'secondary' corner = 'round50' >
                                <IconImage
                                    room = 'content-left'
                                    source = 'smileyFace'
                                    size = 'small'
                                />
                            </RaisedButton>
                            <RaisedButton label = 'SMILE DISABLED' disabled = { true } corner = 'round50' >
                                <IconImage
                                    room = 'content-left'
                                    source = 'smileyFace'
                                    size = 'small'
                                />
                            </RaisedButton>
                        </LayoutView>
                    </LayoutView>
                    <Divider/>
                    <HeadlineText> Raised Buttons with Badges </HeadlineText>
                    <LayoutView
                        shade = { shade }
                        orientation = 'horizontal'
                        style = {{
                            paddingHorizontal: 10
                        }}
                    >
                        <LayoutView alignment = 'start' orientation = 'horizontal' >
                            <RaisedButton label = 'SMILE PRIMARY' color = 'primary' corner = 'square' >
                                <IconImage
                                    room = 'content-left'
                                    source = 'smileyFace'
                                    size = 'small'
                                />
                                <InfoText size = 'small' room = 'badge' style = {{ color: `white` }} >0</InfoText>
                            </RaisedButton>
                            <RaisedButton label = 'SMILE SECONDARY' color = 'secondary' corner = 'round25' >
                                <IconImage
                                    room = 'content-left'
                                    source = 'smileyFace'
                                    size = 'small'
                                />
                                <InfoText size = 'small' room = 'badge' style = {{ color: `white` }} >1</InfoText>
                            </RaisedButton>
                            <RaisedButton label = 'SMILE DISABLED' disabled = { true } corner = 'round50' >
                                <IconImage
                                    room = 'content-left'
                                    source = 'smileyFace'
                                    size = 'small'
                                />
                                <InfoText size = 'small' room = 'badge' style = {{ color: `white` }} >2</InfoText>
                            </RaisedButton>
                        </LayoutView>
                    </LayoutView>
                </BodyView>
            );
        },
        navigationOptions: () => {
            return {
                tabBarVisible: true,
                tabBarLabel: `RAISED`
            };
        }
    }
}, {
    swipeEnabled: true,
    animationEnabled: true,
    initialRouteName: `clear`,
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

const ButtonViewInterface = Hf.Interface.augment({
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
                    label = 'BUTTONS'
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
                <ButtonTabNavigator
                    screenProps = {{
                        component
                    }}
                />
            </ScreenView>
        );
    }
});
export default ButtonViewInterface;

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
 * @module AppViewInterface
 * @description - Hypertoxin demo client-native app view interface.
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

import { DrawerNavigator } from 'react-navigation';

import EVENT from '../events/app-event';

const {
    Dimensions,
    WebView
} = ReactNative;

const {
    ScreenView,
    HeaderView,
    BodyView,
    LayoutView
} = Ht.View;

const {
    FlatButton,
    RaisedButton
} = Ht.Button;

const {
    IconImage,
    WallpaperImage
} = Ht.Image;

const {
    HeadlineText,
    TitleText
} = Ht.Text;

const DEVICE_WIDTH = Dimensions.get(`window`).width;

const AppDrawerNavigator = DrawerNavigator({
    home: {
        screen: (props) => {
            const {
                navigation,
                screenProps
            } = props;
            const {
                component
            } = screenProps;
            const {
                shade
            } = component.state;

            return (
                <ScreenView shade = { shade }>
                    <WallpaperImage resizeMode = 'center' source = { Ht.Theme.image.hypertoxinLogo }>
                        <HeaderView
                            cId = 'h0'
                            ref = { component.assignComponentRef(`animated-header`) }
                            shade = { shade }
                            label = 'HYPERTOXIN DEMO'
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
                        <BodyView
                            shade = { shade }
                            overlay = 'transparent'
                        >
                            <HeadlineText
                                size = 'large'
                            > Hypertoxin </HeadlineText>
                            <TitleText> Demo and Showcase </TitleText>
                            <LayoutView
                                overlay = 'transparent'
                                orientation = 'horizontal'
                                alignment = 'stretch'
                                selfAlignment = 'stretch'
                                style = {{
                                    marginTop: 400,
                                    paddingHorizontal: 10
                                }}
                            >
                                <RaisedButton
                                    label = { shade === `light` ? `Toggle Dark Theme` : `Toggle Light Theme` }
                                    onPress = {() => {
                                        component.outgoing(EVENT.ON.SWITCH_THEME).emit();
                                    }}
                                />
                            </LayoutView>
                        </BodyView>
                    </WallpaperImage>
                </ScreenView>
            );
        },
        navigationOptions: () => {
            return {
                drawerLabel: `HOME`
            };
        }
    },
    view: {
        screen: (props) => {
            const {
                screenProps
            } = props;
            const {
                component
            } = screenProps;
            const {
                shade
            } = component.state;
            const [
                ViewView
            ] = component.getComponentComposites(
                `view-view`
            );
            return (
                <ViewView
                    shade = { shade }
                    { ...props }
                />
            );
        },
        navigationOptions: () => {
            return {
                drawerLabel: `VIEWS`
            };
        }
    },
    button: {
        screen: (props) => {
            const {
                screenProps
            } = props;
            const {
                component
            } = screenProps;
            const {
                shade
            } = component.state;
            const [
                ButtonView
            ] = component.getComponentComposites(
                `button-view`
            );
            return (
                <ButtonView
                    shade = { shade }
                    { ...props }
                />
            );
        },
        navigationOptions: () => {
            return {
                drawerLabel: `BUTTONS`
            };
        }
    },
    text: {
        screen: (props) => {
            const {
                screenProps
            } = props;
            const {
                component
            } = screenProps;
            const {
                shade
            } = component.state;
            const [
                TextView
            ] = component.getComponentComposites(
                `text-view`
            );
            return (
                <TextView
                    shade = { shade }
                    { ...props }
                />
            );
        },
        navigationOptions: () => {
            return {
                drawerLabel: `TEXTS`
            };
        }
    },
    field: {
        screen: (props) => {
            const {
                screenProps
            } = props;
            const {
                component
            } = screenProps;
            const {
                shade
            } = component.state;
            const [
                FieldView
            ] = component.getComponentComposites(
                `field-view`
            );
            return (
                <FieldView
                    shade = { shade }
                    { ...props }
                />
            );
        },
        navigationOptions: () => {
            return {
                drawerLabel: `FIELDS`
            };
        }
    },
    about: {
        screen: (props) => {
            const {
                navigation,
                screenProps
            } = props;
            const {
                component
            } = screenProps;
            const {
                shade
            } = component.state;
            return (
                <ScreenView shade = { shade }>
                    <HeaderView
                        cId = 'h0'
                        ref = { component.assignComponentRef(`animated-header`) }
                        shade = { shade }
                        label = 'ABOUT'
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
                    <WebView source = {{
                        uri: `https://github.com/tuantle/hypertoxin/blob/develop/README.md`
                    }}/>
                </ScreenView>
            );
        },
        navigationOptions: () => {
            return {
                drawerLabel: `ABOUT`
            };
        }
    }
}, {
    drawerWidth: DEVICE_WIDTH / 2,
    drawerPosition: `left`,
    drawerBackgroundColor: Ht.Theme.palette.white
});

const AppViewInterface = Hf.Interface.augment({
    composites: [
        Hf.React.ComponentComposite
    ],
    $init: function $init () {
    },
    setup: function setup (done) {
        done();
    },
    render: function render () {
        const component = this;

        return (
            <AppDrawerNavigator
                screenProps = {{
                    component
                }}
            />
        );
    }
});
export default AppViewInterface;

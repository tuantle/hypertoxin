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
 * @module ViewViewInterface
 * @description - Hypertoxin demo client-native view view interface.
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

import { StackNavigator } from 'react-navigation';

import HeaderViewViewInterface from './header-view-view-interface';

import LayoutViewViewInterface from './layout-view-view-interface';

import ItemViewViewInterface from './item-view-view-interface';

import CardViewViewInterface from './card-view-view-interface';

import EVENT from '../events/view-event';

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
    IconImage
} = Ht.Image;

const ViewStackNavigator = StackNavigator({
    main: {
        screen: (props) => {
            const {
                screenProps,
                navigation
            } = props;
            const {
                drawerNavigation,
                component
            } = screenProps;
            const {
                shade
            } = component.props;

            return (
                <ScreenView shade = { shade }>
                    <HeaderView
                        cId = 'h0'
                        ref = { component.assignComponentRef(`animated-header`) }
                        label = 'VIEWS'
                    >
                        <FlatButton
                            room = 'action-left'
                            overlay = 'transparent'
                            corner = 'round50'
                            onPress = {() => drawerNavigation.navigate(`DrawerToggle`)}
                        >
                            <IconImage
                                room = 'content-center'
                                size = 'large'
                                source = 'menu'
                            />
                        </FlatButton>
                    </HeaderView>
                    <BodyView
                        alignment = 'center'
                        style = {{
                            paddingTop: 35,
                            paddingHorizontal: 10
                        }}
                    >
                        <LayoutView
                            orientation = 'horizontal'
                            alignment = 'stretch'
                            selfAlignment = 'stretch'
                        >
                            <RaisedButton
                                cId = 'rb0'
                                ref = { component.assignComponentRef(`animated-button0`) }
                                label = 'HEADER VIEW'
                                onPress = {() => {
                                    navigation.navigate(`headerView`);
                                }}
                            />
                            <RaisedButton
                                cId = 'rb1'
                                ref = { component.assignComponentRef(`animated-button1`) }
                                label = 'LAYOUT VIEW'
                                onPress = {() => {
                                    navigation.navigate(`layoutView`);
                                }}
                            />
                            <RaisedButton
                                cId = 'rb2'
                                ref = { component.assignComponentRef(`animated-button2`) }
                                label = 'ITEM VIEW'
                                onPress = {() => {
                                    navigation.navigate(`itemView`);
                                }}
                            />
                            <RaisedButton
                                cId = 'rb3'
                                ref = { component.assignComponentRef(`animated-button3`) }
                                label = 'CARD VIEW'
                                onPress = {() => {
                                    navigation.navigate(`cardView`);
                                }}
                            />
                        </LayoutView>
                    </BodyView>
                </ScreenView>
            );
        },
        navigationOptions: {
            header: {
                visible: false
            }
        }
    },
    headerView: {
        screen: (props) => {
            const {
                component
            } = props.screenProps;
            const {
                shade
            } = component.props;
            const {
                header
            } = component.state;
            const [
                HeaderViewView
            ] = component.getComponentComposites(`header-view-view`);
            return (
                <HeaderViewView
                    shade = { shade }
                    header = { header }
                    { ...props }
                />
            );
        },
        navigationOptions: {
            header: {
                visible: false
            }
        }
    },
    layoutView: {
        screen: (props) => {
            const {
                component
            } = props.screenProps;
            const {
                shade
            } = component.props;
            const [
                LayoutViewView
            ] = component.getComponentComposites(`layout-view-view`);

            return (
                <LayoutViewView
                    shade = { shade }
                    { ...props }
                />
            );
        },
        navigationOptions: {
            header: {
                visible: false
            }
        }
    },
    itemView: {
        screen: (props) => {
            const {
                component
            } = props.screenProps;
            const {
                shade
            } = component.props;
            const [
                ItemViewView
            ] = component.getComponentComposites(`item-view-view`);

            return (
                <ItemViewView
                    shade = { shade }
                    { ...props }
                />
            );
        },
        navigationOptions: {
            header: {
                visible: false
            }
        }
    },
    cardView: {
        screen: (props) => {
            const {
                component
            } = props.screenProps;
            const {
                shade
            } = component.props;
            const [
                CardViewView
            ] = component.getComponentComposites(`card-view-view`);

            return (
                <CardViewView
                    shade = { shade }
                    { ...props }
                />
            );
        },
        navigationOptions: {
            header: {
                visible: false
            }
        }
    }
}, {
    initialRouteName: `main`,
    mode: `card`,
    headerMode: `none`,
    cardStyle: {
        backgroundColor: `transparent`
    }
});

const ViewViewInterface = Hf.Interface.augment({
    composites: [
        Hf.React.ComponentComposite
    ],
    state: {
        shade: {
            value: `light`,
            oneOf: [ `light`, `dark` ]
        }
    },
    $init: function $init () {
        const intf = this;

        intf.composedOf(
            HeaderViewViewInterface({
                name: `header-view-view`
            }),
            LayoutViewViewInterface({
                name: `layout-view-view`
            }),
            ItemViewViewInterface({
                name: `item-view-view`
            }),
            CardViewViewInterface({
                name: `card-view-view`
            })
        );
    },
    setup: function setup (done) {
        const intf = this;

        intf.incoming(EVENT.ON.CHANGE_HEADER_SIZE).repeat();

        done();
    },
    render: function render () {
        const component = this;
        const {
            navigation
        } = component.props;
        const {
            navigationStackRefreshToggle
        } = component.state;

        return (
            <ViewStackNavigator
                screenProps = {{
                    component,
                    drawerNavigation: navigation,
                    navigationStackRefreshToggle
                }}
                onNavigationStateChange = {(prevState, currentState) => {
                    if (prevState.index === 1 && currentState.index === 0) {
                        // component.renderButtonEntryAnimation(200);
                        navigation.setParams({
                            tabBarVisible: true
                        });
                    } else {
                        navigation.setParams({
                            tabBarVisible: false
                        });
                    }
                }}
            />
        );
    }
});
export default ViewViewInterface;

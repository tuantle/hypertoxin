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
 * @module FieldViewInterface
 * @description - Hypertoxin demo client-native field view interface.
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
    LayoutView,
    ItemView
} = Ht.View;

const {
    TextField,
    SearchField
} = Ht.Field;

const {
    FlatButton,
    RaisedButton
} = Ht.Button;

const {
    IconImage,
    WallpaperImage
} = Ht.Image;

const {
    SubtitleText
} = Ht.Text;

const DEVICE_WIDTH = Dimensions.get(`window`).width;

const FieldTabNavigator = TabNavigator({
    login: {
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
                    alignment = 'stretch'
                    style = {{
                        paddingTop: 35
                    }}
                >
                    <LayoutView
                        orientation = 'horizontal'
                        alignment = 'stretch'
                        selfAlignment = 'stretch'
                        style = {{
                            paddingHorizontal: 10
                        }}
                    >
                        <TextField
                            label = 'EMAIL'
                            hint = 'user@gmail.com'
                            inputType = 'email-address'
                        >
                            <IconImage
                                room = 'content-left'
                                source = 'email'
                                size = 'small'
                            />
                            <FlatButton
                                overlay = 'transparent'
                                room = 'action-right'
                                action = 'clear'
                            >
                                <IconImage
                                    room = 'content-center'
                                    source = 'close'
                                    size = 'small'
                                />
                            </FlatButton>
                        </TextField>
                        <TextField
                            secured = { true }
                            label = 'PASSWORD'
                        >
                            <IconImage
                                room = 'content-left'
                                source = 'lock'
                                size = 'small'
                            />
                            <FlatButton
                                overlay = 'transparent'
                                room = 'action-right'
                                action = 'clear'
                            >
                                <IconImage
                                    room = 'content-center'
                                    source = 'close'
                                    size = 'small'
                                />
                            </FlatButton>
                        </TextField>
                        <RaisedButton label = 'SUBMIT' corner = 'square' >
                            <IconImage
                                room = 'content-left'
                                source = 'smileyFace'
                                size = 'small'
                            />
                        </RaisedButton>
                    </LayoutView>
                </BodyView>
            );
        },
        navigationOptions: () => {
            return {
                tabBarVisible: true,
                tabBarLabel: `LOGIN`
            };
        }
    },
    registration: {
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
                    keyboardAvoiding = { true }
                    alignment = 'stretch'
                    style = {{
                        paddingTop: 35
                    }}
                >
                    <LayoutView
                        orientation = 'horizontal'
                        alignment = 'stretch'
                        selfAlignment = 'stretch'
                        style = {{
                            paddingHorizontal: 10
                        }}
                    >
                        <TextField
                            overlay = 'opaque'
                            hint = 'user@gmail.com'
                            label = 'EMAIL'
                            inputType = 'email-address'
                        >
                            <IconImage
                                room = 'content-left'
                                source = 'email'
                                size = 'small'
                            />
                            <FlatButton
                                overlay = 'transparent'
                                room = 'action-right'
                                action = 'clear'
                            >
                                <IconImage
                                    room = 'content-center'
                                    source = 'close'
                                    size = 'small'
                                />
                            </FlatButton>
                        </TextField>
                        <LayoutView
                            orientation = 'vertical'
                            alignment = 'center'
                            selfAlignment = 'stretch'
                        >
                            <TextField
                                overlay = 'transparent'
                                initialValue = 'Tuan'
                                label = 'FIRST NAME'
                                charLimit = { 10 }
                            >
                                <IconImage
                                    room = 'content-left'
                                    source = 'profile'
                                    size = 'small'
                                />
                                <FlatButton
                                    overlay = 'transparent'
                                    room = 'action-right'
                                    action = 'clear'
                                >
                                    <IconImage
                                        room = 'content-center'
                                        source = 'close'
                                        size = 'small'
                                    />
                                </FlatButton>
                            </TextField>
                            <TextField
                                overlay = 'transparent'
                                disabled = { true }
                                initialValue = 'Le'
                                label = 'LAST NAME'
                                charLimit = { 10 }
                            >
                                <FlatButton
                                    overlay = 'transparent'
                                    room = 'action-right'
                                    action = 'clear'
                                >
                                    <IconImage
                                        room = 'content-center'
                                        source = 'close'
                                        size = 'small'
                                    />
                                </FlatButton>
                            </TextField>
                        </LayoutView>
                        <TextField
                            overlay = 'translucent'
                            label = 'AGE'
                            inputType = 'numeric'
                        >
                            <FlatButton
                                overlay = 'transparent'
                                room = 'action-right'
                                action = 'clear'
                            >
                                <IconImage
                                    room = 'content-center'
                                    source = 'close'
                                    size = 'small'
                                />
                            </FlatButton>
                        </TextField>
                        <TextField
                            overlay = 'translucent'
                            label = 'PHONE NUMBER'
                            inputType = 'phone-pad'
                        >
                            <FlatButton
                                overlay = 'transparent'
                                room = 'action-right'
                                action = 'clear'
                            >
                                <IconImage
                                    room = 'content-center'
                                    source = 'close'
                                    size = 'small'
                                />
                            </FlatButton>
                        </TextField>
                        <RaisedButton label = 'SUBMIT' corner = 'square' >
                            <IconImage
                                room = 'content-left'
                                source = 'smileyFace'
                                size = 'small'
                            />
                        </RaisedButton>
                    </LayoutView>
                </BodyView>
            );
        },
        navigationOptions: () => {
            return {
                tabBarVisible: true,
                tabBarLabel: `REGISTRATION`
            };
        }
    },
    note: {
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
                    keyboardAvoiding = { true }
                    alignment = 'stretch'
                    style = {{
                        paddingTop: 35
                    }}
                >
                    <LayoutView
                        orientation = 'horizontal'
                        alignment = 'stretch'
                        selfAlignment = 'stretch'
                        style = {{
                            paddingHorizontal: 10
                        }}
                    >
                        <TextField
                            overlay = 'translucent'
                            label = 'NOTEPAD'
                            charLimit = { 128 }
                            lineLimit = { 5 }
                        >
                            <FlatButton
                                overlay = 'transparent'
                                room = 'action-right'
                                action = 'clear'
                            >
                                <IconImage
                                    room = 'content-center'
                                    source = 'close'
                                    size = 'small'
                                />
                            </FlatButton>
                        </TextField>
                    </LayoutView>
                </BodyView>
            );
        },
        navigationOptions: () => {
            return {
                tabBarVisible: true,
                tabBarLabel: `NOTE`
            };
        }
    },
    ordering: {
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
                    alignment = 'stretch'
                    style = {{
                        paddingTop: 35
                    }}
                >
                    <LayoutView
                        orientation = 'horizontal'
                        alignment = 'stretch'
                        selfAlignment = 'stretch'
                        style = {{
                            paddingHorizontal: 10
                        }}
                    >
                        <TextField
                            label = 'COST'
                            inputType = 'monetary'
                        >
                            <IconImage
                                room = 'content-left'
                                source = 'money'
                                size = 'small'
                            />
                            <FlatButton
                                overlay = 'transparent'
                                room = 'action-right'
                                action = 'clear'
                            >
                                <IconImage
                                    room = 'content-center'
                                    source = 'close'
                                    size = 'small'
                                />
                            </FlatButton>
                        </TextField>
                        <TextField
                            label = 'VISA'
                            secured = { true }
                            inputType = 'credit-card-visa'
                        >
                            <IconImage
                                room = 'content-left'
                                source = 'credit-card'
                                size = 'small'
                            />
                            <FlatButton
                                overlay = 'transparent'
                                room = 'action-right'
                                action = 'clear'
                            >
                                <IconImage
                                    room = 'content-center'
                                    source = 'close'
                                    size = 'small'
                                />
                            </FlatButton>
                        </TextField>
                        <RaisedButton label = 'PURCHASE' corner = 'square' >
                            <IconImage
                                room = 'content-left'
                                source = 'smileyFace'
                                size = 'small'
                            />
                        </RaisedButton>
                    </LayoutView>
                </BodyView>
            );
        },
        navigationOptions: () => {
            return {
                tabBarVisible: true,
                tabBarLabel: `ORDERING`
            };
        }
    },
    search: {
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
                <WallpaperImage source = { Ht.Theme.image.geometricWallpaper }>
                    <SearchField
                        ref = { component.assignComponentRef(`search-field`) }
                        overlay = 'translucent'
                        corner = 'round50'
                        hint = 'Ask Minh Anything'
                        initiallyCollapsed = { true }
                        onGetAutocompletions = {async (text) => {
                            if (text) {
                                const response = await fetch(`http://suggestqueries.google.com/complete/search?client=firefox&q=${text}`, {
                                    method: `get`
                                });
                                const data = await response.json();
                                return data[1].slice(0, 6);
                            } else {
                                return [];
                            }
                        }}
                        renderSuggestionEntry = {(entry, onPressSelectAndSubmit, onPressSelect) => {
                            return (
                                <ItemView
                                    overlay = 'transparent'
                                    shade = { shade }
                                    onPress = { onPressSelectAndSubmit }
                                    style = {{
                                        paddingVertical: 0,
                                        marginVertical: 0
                                    }}
                                >
                                    <LayoutView
                                        room = 'content-left'
                                        overlay = 'transparent'
                                        orientation = 'vertical'
                                        alignment = 'center'
                                        selfAlignment = 'start'
                                    >
                                        <IconImage
                                            source = { entry.historyType ? `history` : `search` }
                                            style = {{
                                                marginLeft: 6,
                                                marginRight: 9
                                            }}
                                        />
                                        <SubtitleText color = { Ht.Theme.palette.grey } >{ entry.value }</SubtitleText>
                                    </LayoutView>
                                    <FlatButton
                                        room = 'action-right'
                                        overlay = 'transparent'
                                        corner = 'round50'
                                        onPress = { onPressSelect }
                                    >
                                        <IconImage
                                            room = 'content-center'
                                            source = 'recall'
                                            size = 'small'
                                        />
                                    </FlatButton>
                                </ItemView>
                            );
                        }}
                    >
                        <FlatButton
                            room = 'action-left'
                            action = 'expand'
                            overlay = 'transparent'
                            corner = 'round50'
                        >
                            <IconImage
                                room = 'content-center'
                                source = 'search'
                            />
                        </FlatButton>
                        <FlatButton
                            room = 'action-left'
                            action = 'collapse'
                            overlay = 'transparent'
                            corner = 'round50'
                        >
                            <IconImage
                                room = 'content-center'
                                source = 'go-back'
                            />
                        </FlatButton>
                        <FlatButton
                            room = 'action-right'
                            action = 'clear'
                            overlay = 'transparent'
                            corner = 'round50'
                        >
                            <IconImage
                                room = 'content-center'
                                source = 'close'
                            />
                        </FlatButton>
                    </SearchField>
                    <BodyView
                        shade = { shade }
                        overlay = 'transparent'
                        alignment = 'stretch'
                        scrollable = { true }
                        style = {{
                            paddingHorizontal: 10
                        }}
                    >
                        <LayoutView
                            overlay = 'transparent'
                            orientation = 'horizontal'
                            alignment = 'stretch'
                            selfAlignment = 'stretch'
                        >
                            <RaisedButton
                                label = 'TOGGLE VISIBILITY'
                                corner = 'square'
                                onPress = {() => {
                                    const [ searchField ] = component.lookupComponentRefs(`search-field`);

                                    if (searchField.isHidden()) {
                                        searchField.show();
                                    } else {
                                        searchField.hide();
                                    }
                                }}
                            />
                        </LayoutView>
                    </BodyView>
                </WallpaperImage>
            );
        },
        navigationOptions: () => {
            return {
                tabBarVisible: true,
                tabBarLabel: `SEARCH`
            };
        }
    }
}, {
    swipeEnabled: true,
    animationEnabled: true,
    initialRouteName: `login`,
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

const FieldViewInterface = Hf.Interface.augment({
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
                    label = 'FIELDS'
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
                <FieldTabNavigator
                    screenProps = {{
                        component
                    }}
                />
            </ScreenView>
        );
    }
});
export default FieldViewInterface;

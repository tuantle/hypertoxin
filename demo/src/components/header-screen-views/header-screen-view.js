'use strict'; // eslint-disable-line

import { Ht } from 'hypertoxin';

import React from 'react';

import ReactNative from 'react-native'; // eslint-disable-line

import PropTypes from 'prop-types';

import DefaultTheme from '../../themes/default-theme';

const {
    Dimensions,
    FlatList,
    View
} = ReactNative;

const {
    BodyScreen,
    HeaderScreen,
    RowLayout,
    ColumnLayout,
    FlatButton,
    HeadlineText,
    InfoText,
    CaptionText,
    IconImage,
    HorizontalDivider
} = Ht;

const DEVICE_WIDTH = Dimensions.get(`window`).width;

export default class HeaderScreenView extends React.Component {
    static propTypes = {
        Theme: PropTypes.object,
        shade: PropTypes.oneOf([ `light`, `dark` ])
    }
    static defaultProps = {
        Theme: DefaultTheme,
        shade: `light`
    }
    constructor (props) {
        super(props);
        this.headerScreenRef = null;
        this.state = {
            headerNavigationVisible: true,
            headerMediaVisible: true,
            headerSize: `normal`
        };
    }
    render () {
        const component = this;
        const {
            Theme,
            shade,
            navigation
        } = component.props;
        const {
            headerNavigationVisible,
            headerMediaVisible,
            headerSize
        } = component.state;

        return ([
            <HeaderScreen
                key = 'header-screen'
                ref = {(componentRef) => {
                    component.headerScreenRef = componentRef;
                }}
                shade = { shade }
                size = { headerSize }
                label = 'HEADER SCREEN'
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
                <ColumnLayout
                    room = 'media'
                    shade = 'light'
                    exclusions = {[ `shade` ]}
                    overlay = 'opaque'
                    roomAlignment = 'center'
                    corner = 'sharp'
                >
                    <HeadlineText
                        room = 'content-left'
                        shade = 'light'
                        size = 'small'
                        indentation = { 10 }
                    > Media section </HeadlineText>
                    <FlatButton
                        room = 'content-right'
                        overlay = 'transparent-outline'
                        corner = 'circular'
                        size = 'small'
                        label = 'BUTTON A'
                        color = { Theme.color.palette.teal }
                        margin = { 10 }
                    />
                    <FlatButton
                        room = 'content-right'
                        overlay = 'transparent-outline'
                        corner = 'circular'
                        size = 'small'
                        label = 'BUTTON B'
                        color = { Theme.color.palette.teal }
                        margin = { 10 }
                    />
                </ColumnLayout>
            </HeaderScreen>,
            <BodyScreen
                key = 'body-screen'
                shade = { shade }
                contentTopRoomAlignment = 'center'
                contentMiddleRoomAlignment = 'stretch'
                style = {{
                    container: {
                        paddingTop: (() => {
                            if (headerNavigationVisible && headerMediaVisible) {
                                return 150;
                            } else if (!headerNavigationVisible && headerMediaVisible) {
                                return 100;
                            } else if (headerNavigationVisible && !headerMediaVisible) {
                                return 100;
                            }
                            return 30;
                        })()
                    }
                }}
            >
                <ColumnLayout
                    room = 'content-middle'
                    roomAlignment = 'center'
                    margin = {{
                        horizontal: 10,
                        vertical: 20
                    }}
                >
                    <FlatButton room = 'content-left' overlay = 'transparent' label = 'SMALL' disabled = { !headerNavigationVisible || headerSize === `small` } onPress = {() => {
                        component.setState(() => {
                            return {
                                headerSize: `small`
                            };
                        });
                    }}/>
                    <FlatButton room = 'content-middle' overlay = 'transparent' label = 'NORMAL' disabled = { !headerNavigationVisible || headerSize === `normal` } onPress = {() => {
                        component.setState(() => {
                            return {
                                headerSize: `normal`
                            };
                        });
                    }}/>
                    <FlatButton room = 'content-right' overlay = 'transparent' label = 'LARGE' disabled = { !headerNavigationVisible || headerSize === `large` } onPress = {() => {
                        component.setState(() => {
                            return {
                                headerSize: `large`
                            };
                        });
                    }}/>
                </ColumnLayout>
                <HorizontalDivider room = 'content-middle' edgeToEdge = { true }/>
                <ColumnLayout
                    room = 'content-middle'
                    roomAlignment = 'center'
                    margin = {{
                        horizontal: 10,
                        vertical: 20
                    }}
                >
                    <FlatButton room = 'content-left' overlay = 'transparent' label = { headerNavigationVisible ? `HIDE NAVIGATOR` : `SHOW NAVIGATOR` } onPress = {() => {
                        if (!component.headerScreenRef.isNavigationVisible()) {
                            component.setState(() => {
                                return {
                                    headerNavigationVisible: true
                                };
                            }, () => {
                                component.headerScreenRef.showNavigation();
                            });
                        } else {
                            component.setState(() => {
                                return {
                                    headerNavigationVisible: false
                                };
                            }, () => {
                                component.headerScreenRef.hideNavigation();
                            });
                        }
                    }}/>
                    <FlatButton room = 'content-right' overlay = 'transparent' label = { headerMediaVisible ? `HIDE MEDIA` : `SHOW MEDIA` } onPress = {() => {
                        if (!component.headerScreenRef.isMediaVisible()) {
                            component.setState(() => {
                                return {
                                    headerMediaVisible: true
                                };
                            }, () => {
                                component.headerScreenRef.showMedia();
                            });
                        } else {
                            component.setState(() => {
                                return {
                                    headerMediaVisible: false
                                };
                            }, () => {
                                component.headerScreenRef.hideMedia();
                            });
                        }
                    }}/>
                </ColumnLayout>
                <HorizontalDivider room = 'content-middle' edgeToEdge = { true }/>
                <CaptionText room = 'content-middle' indentation = { 10 } size = 'large' > Scroll Up To Show Header Navigation & media. </CaptionText>
                <CaptionText room = 'content-middle' indentation = { 10 } size = 'large' > Scroll Down To Hide Header Navigation & Media. </CaptionText>
                <RowLayout
                    room = 'content-middle'
                    roomAlignment = 'center'
                    scrollable = { true }
                    onScroll = {(scrollEvent) => {
                        if (scrollEvent.direction === -1) {
                            if (component.headerScreenRef.isNavigationVisible()) {
                                component.setState(() => {
                                    return {
                                        headerNavigationVisible: false
                                    };
                                }, () => {
                                    component.headerScreenRef.hideNavigation();
                                });
                            }
                            // if (component.headerScreenRef.isMediaVisible()) {
                            //     component.headerScreenRef.hideMedia();
                            // }
                        }
                        if (scrollEvent.direction === 1) {
                            if (!component.headerScreenRef.isNavigationVisible()) {
                                component.setState(() => {
                                    return {
                                        headerNavigationVisible: true
                                    };
                                }, () => {
                                    component.headerScreenRef.showNavigation();
                                });
                            }
                            // if (!component.headerScreenRef.isMediaVisible()) {
                            //     component.headerScreenRef.showMedia();
                            // }
                        }
                    }}
                    margin = {{
                        horizontal: 10,
                        vertical: 20
                    }}
                >
                    <FlatList
                        room = 'content-middle'
                        data = { Array.from(Array(25).keys()) }
                        renderItem = {(listData) => {
                            return (
                                <View
                                    style = {{
                                        width: DEVICE_WIDTH - 100,
                                        height: 50,
                                        borderRadius: 5,
                                        margin: 5,
                                        paddingHorizontal: 10,
                                        backgroundColor: `#${(Math.random() * (1 << 24) | 0).toString(16)}00000`.slice(0, 7)
                                    }}
                                >
                                    <InfoText color = { Theme.color.palette.white } >{ `Item ${listData.item}`}</InfoText>
                                </View>
                            );
                        }}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </RowLayout>
            </BodyScreen>
        ]);
    }
}

'use strict'; // eslint-disable-line

import { Ht } from 'hypertoxin';

import React from 'react';

import ReactNative from 'react-native'; // eslint-disable-line

import PropTypes from 'prop-types';

import DefaultTheme from '../../themes/default-theme';

const {
    Dimensions
} = ReactNative;

const {
    RowLayout,
    ColumnLayout,
    FlatButton,
    HeadlineText,
    InfoText,
    CaptionText,
    HorizontalDivider
} = Ht;

const DEVICE_HEIGHT = Dimensions.get(`window`).height;

export default class RowLayoutView extends React.Component {
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
        this.state = {
            roomAlignment: `center`,
            contentTopRoomAlignment: `center`,
            contentMiddleRoomAlignment: `center`,
            contentBottomRoomAlignment: `center`
        };
    }
    render () {
        const component = this;
        const {
            Theme,
            shade
        } = component.props;
        const {
            roomAlignment,
            contentTopRoomAlignment,
            contentMiddleRoomAlignment,
            contentBottomRoomAlignment
        } = component.state;

        return (
            <RowLayout
                shade = { shade }
                roomAlignment = 'center'
                contentTopRoomAlignment = 'center'
                contentMiddleRoomAlignment = 'stretch'
            >
                <HeadlineText room = 'content-top' > Row Layout Demotration </HeadlineText>
                <ColumnLayout
                    room = 'content-top'
                    roomAlignment = 'start'
                    margin = { 5 }
                >
                    <FlatButton
                        room = 'content-left'
                        overlay = 'transparent'
                        size = 'small'
                        label = 'START'
                        color = { roomAlignment === `start` ? `primary` : `secondary` }
                        onPress = {() => {
                            component.setState(() => {
                                return {
                                    roomAlignment: `start`
                                };
                            });
                        }}
                    />
                    <FlatButton
                        room = 'content-left'
                        overlay = 'transparent'
                        size = 'small'
                        label = 'CENTER'
                        color = { roomAlignment === `center` ? `primary` : `secondary` }
                        onPress = {() => {
                            component.setState(() => {
                                return {
                                    roomAlignment: `center`
                                };
                            });
                        }}
                    />
                    <FlatButton
                        room = 'content-left'
                        overlay = 'transparent'
                        size = 'small'
                        label = 'END'
                        color = { roomAlignment === `end` ? `primary` : `secondary` }
                        onPress = {() => {
                            component.setState(() => {
                                return {
                                    roomAlignment: `end`
                                };
                            });
                        }}
                    />
                    <FlatButton
                        room = 'content-left'
                        overlay = 'transparent'
                        size = 'small' label = 'STRETCH'
                        color = { roomAlignment === `stretch` ? `primary` : `secondary` }
                        onPress = {() => {
                            component.setState(() => {
                                return {
                                    roomAlignment: `stretch`
                                };
                            });
                        }}
                    />
                </ColumnLayout>
                <CaptionText room = 'content-top' size = 'large' > Room Property </CaptionText>
                <HorizontalDivider room = 'content-top' />
                <ColumnLayout
                    room = 'content-top'
                    roomAlignment = 'start'
                    margin = { 5 }
                >
                    <FlatButton
                        room = 'content-left'
                        overlay = 'transparent'
                        size = 'small'
                        label = 'START'
                        color = { contentTopRoomAlignment === `start` ? `primary` : `secondary` }
                        onPress = {() => {
                            component.setState(() => {
                                return {
                                    contentTopRoomAlignment: `start`
                                };
                            });
                        }}
                    />
                    <FlatButton
                        room = 'content-left'
                        overlay = 'transparent'
                        size = 'small'
                        label = 'CENTER'
                        color = { contentTopRoomAlignment === `center` ? `primary` : `secondary` }
                        onPress = {() => {
                            component.setState(() => {
                                return {
                                    contentTopRoomAlignment: `center`
                                };
                            });
                        }}
                    />
                    <FlatButton
                        room = 'content-left'
                        overlay = 'transparent'
                        size = 'small'
                        label = 'END'
                        color = { contentTopRoomAlignment === `end` ? `primary` : `secondary` }
                        onPress = {() => {
                            component.setState(() => {
                                return {
                                    contentTopRoomAlignment: `end`
                                };
                            });
                        }}
                    />
                    <FlatButton
                        room = 'content-left'
                        overlay = 'transparent'
                        size = 'small' label = 'STRETCH'
                        color = { contentTopRoomAlignment === `stretch` ? `primary` : `secondary` }
                        onPress = {() => {
                            component.setState(() => {
                                return {
                                    contentTopRoomAlignment: `stretch`
                                };
                            });
                        }}
                    />
                </ColumnLayout>
                <HorizontalDivider room = 'content-top' />
                <CaptionText room = 'content-top' size = 'large' > Content Top Room Property </CaptionText>
                <ColumnLayout
                    room = 'content-top'
                    roomAlignment = 'start'
                    margin = { 5 }
                >
                    <FlatButton
                        room = 'content-left'
                        overlay = 'transparent'
                        size = 'small'
                        label = 'START'
                        color = { contentMiddleRoomAlignment === `start` ? `primary` : `secondary` }
                        onPress = {() => {
                            component.setState(() => {
                                return {
                                    contentMiddleRoomAlignment: `start`
                                };
                            });
                        }}
                    />
                    <FlatButton
                        room = 'content-left'
                        overlay = 'transparent'
                        size = 'small'
                        label = 'CENTER'
                        color = { contentMiddleRoomAlignment === `center` ? `primary` : `secondary` }
                        onPress = {() => {
                            component.setState(() => {
                                return {
                                    contentMiddleRoomAlignment: `center`
                                };
                            });
                        }}
                    />
                    <FlatButton
                        room = 'content-left'
                        overlay = 'transparent'
                        size = 'small'
                        label = 'END'
                        color = { contentMiddleRoomAlignment === `end` ? `primary` : `secondary` }
                        onPress = {() => {
                            component.setState(() => {
                                return {
                                    contentMiddleRoomAlignment: `end`
                                };
                            });
                        }}
                    />
                    <FlatButton
                        room = 'content-left'
                        overlay = 'transparent'
                        size = 'small' label = 'STRETCH'
                        color = { contentMiddleRoomAlignment === `stretch` ? `primary` : `secondary` }
                        onPress = {() => {
                            component.setState(() => {
                                return {
                                    contentMiddleRoomAlignment: `stretch`
                                };
                            });
                        }}
                    />
                </ColumnLayout>
                <CaptionText room = 'content-top' size = 'large' > Content Middle Room Property </CaptionText>
                <HorizontalDivider room = 'content-top' />
                <ColumnLayout
                    room = 'content-top'
                    roomAlignment = 'start'
                    margin = { 5 }
                >
                    <FlatButton
                        room = 'content-left'
                        overlay = 'transparent'
                        size = 'small'
                        label = 'START'
                        color = { contentBottomRoomAlignment === `start` ? `primary` : `secondary` }
                        onPress = {() => {
                            component.setState(() => {
                                return {
                                    contentBottomRoomAlignment: `start`
                                };
                            });
                        }}
                    />
                    <FlatButton
                        room = 'content-left'
                        overlay = 'transparent'
                        size = 'small'
                        label = 'CENTER'
                        color = { contentBottomRoomAlignment === `center` ? `primary` : `secondary` }
                        onPress = {() => {
                            component.setState(() => {
                                return {
                                    contentBottomRoomAlignment: `center`
                                };
                            });
                        }}
                    />
                    <FlatButton
                        room = 'content-left'
                        overlay = 'transparent'
                        size = 'small'
                        label = 'END'
                        color = { contentBottomRoomAlignment === `end` ? `primary` : `secondary` }
                        onPress = {() => {
                            component.setState(() => {
                                return {
                                    contentBottomRoomAlignment: `end`
                                };
                            });
                        }}
                    />
                    <FlatButton
                        room = 'content-left'
                        overlay = 'transparent'
                        size = 'small' label = 'STRETCH'
                        color = { contentBottomRoomAlignment === `stretch` ? `primary` : `secondary` }
                        onPress = {() => {
                            component.setState(() => {
                                return {
                                    contentBottomRoomAlignment: `stretch`
                                };
                            });
                        }}
                    />
                </ColumnLayout>
                <CaptionText room = 'content-top' size = 'large' > Content Bottom Room Property </CaptionText>
                <RowLayout
                    room = 'content-middle'
                    roomAlignment = { roomAlignment }
                    contentTopRoomAlignment = { contentTopRoomAlignment }
                    contentMiddleRoomAlignment = { contentMiddleRoomAlignment }
                    contentBottomRoomAlignment = { contentBottomRoomAlignment }
                    overlay = 'opaque'
                    color = { Theme.color.palette.silver }
                    dropShadowed = { true }
                    margin = { 10 }
                    style = {{
                        container: {
                            height: DEVICE_HEIGHT / 3
                        }
                    }}
                >
                    <RowLayout
                        room = 'content-top'
                        overlay = 'translucent-outline'
                        roomAlignment = 'center'
                        contentMiddleRoomAlignment = 'center'
                        color = { Theme.color.palette.red }
                        margin = { 2 }
                        style = {{
                            container: {
                                minWidth: 50,
                                minHeight: 50
                            }
                        }}
                    >
                        <InfoText room = 'content-middle' color = { Theme.color.palette.white }> Child A </InfoText>
                    </RowLayout>
                    <RowLayout
                        room = 'content-middle'
                        overlay = 'translucent-outline'
                        roomAlignment = 'center'
                        contentMiddleRoomAlignment = 'center'
                        color = { Theme.color.palette.green }
                        margin = { 2 }
                        style = {{
                            container: {
                                minWidth: 50,
                                minHeight: 50
                            }
                        }}
                    >
                        <InfoText room = 'content-middle' color = { Theme.color.palette.white }> Child B </InfoText>
                    </RowLayout>
                    <RowLayout
                        room = 'content-bottom'
                        overlay = 'translucent-outline'
                        roomAlignment = 'center'
                        contentMiddleRoomAlignment = 'center'
                        color = { Theme.color.palette.blue }
                        margin = { 2 }
                        style = {{
                            container: {
                                minWidth: 50,
                                minHeight: 50
                            }
                        }}
                    >
                        <InfoText room = 'content-middle' color = { Theme.color.palette.white }> Child C </InfoText>
                    </RowLayout>
                </RowLayout>
            </RowLayout>
        );
    }
}

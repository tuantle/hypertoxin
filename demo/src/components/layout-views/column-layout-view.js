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

export default class ColumnLayoutView extends React.Component {
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
            contentLeftRoomAlignment: `center`,
            contentMiddleRoomAlignment: `center`,
            contentRightRoomAlignment: `center`
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
            contentLeftRoomAlignment,
            contentMiddleRoomAlignment,
            contentRightRoomAlignment
        } = component.state;

        return (
            <RowLayout
                shade = { shade }
                roomAlignment = 'center'
                contentTopRoomAlignment = 'center'
                contentMiddleRoomAlignment = 'stretch'
            >
                <HeadlineText room = 'content-top' > Column Layout Demotration </HeadlineText>
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
                        color = { contentLeftRoomAlignment === `start` ? `primary` : `secondary` }
                        onPress = {() => {
                            component.setState(() => {
                                return {
                                    contentLeftRoomAlignment: `start`
                                };
                            });
                        }}
                    />
                    <FlatButton
                        room = 'content-left'
                        overlay = 'transparent'
                        size = 'small'
                        label = 'CENTER'
                        color = { contentLeftRoomAlignment === `center` ? `primary` : `secondary` }
                        onPress = {() => {
                            component.setState(() => {
                                return {
                                    contentLeftRoomAlignment: `center`
                                };
                            });
                        }}
                    />
                    <FlatButton
                        room = 'content-left'
                        overlay = 'transparent'
                        size = 'small'
                        label = 'END'
                        color = { contentLeftRoomAlignment === `end` ? `primary` : `secondary` }
                        onPress = {() => {
                            component.setState(() => {
                                return {
                                    contentLeftRoomAlignment: `end`
                                };
                            });
                        }}
                    />
                    <FlatButton
                        room = 'content-left'
                        overlay = 'transparent'
                        size = 'small' label = 'STRETCH'
                        color = { contentLeftRoomAlignment === `stretch` ? `primary` : `secondary` }
                        onPress = {() => {
                            component.setState(() => {
                                return {
                                    contentLeftRoomAlignment: `stretch`
                                };
                            });
                        }}
                    />
                </ColumnLayout>
                <CaptionText room = 'content-top' size = 'large' > Content Top Room Property </CaptionText>
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
                        color = { contentRightRoomAlignment === `start` ? `primary` : `secondary` }
                        onPress = {() => {
                            component.setState(() => {
                                return {
                                    contentRightRoomAlignment: `start`
                                };
                            });
                        }}
                    />
                    <FlatButton
                        room = 'content-left'
                        overlay = 'transparent'
                        size = 'small'
                        label = 'CENTER'
                        color = { contentRightRoomAlignment === `center` ? `primary` : `secondary` }
                        onPress = {() => {
                            component.setState(() => {
                                return {
                                    contentRightRoomAlignment: `center`
                                };
                            });
                        }}
                    />
                    <FlatButton
                        room = 'content-left'
                        overlay = 'transparent'
                        size = 'small'
                        label = 'END'
                        color = { contentRightRoomAlignment === `end` ? `primary` : `secondary` }
                        onPress = {() => {
                            component.setState(() => {
                                return {
                                    contentRightRoomAlignment: `end`
                                };
                            });
                        }}
                    />
                    <FlatButton
                        room = 'content-left'
                        overlay = 'transparent'
                        size = 'small' label = 'STRETCH'
                        color = { contentRightRoomAlignment === `stretch` ? `primary` : `secondary` }
                        onPress = {() => {
                            component.setState(() => {
                                return {
                                    contentRightRoomAlignment: `stretch`
                                };
                            });
                        }}
                    />
                </ColumnLayout>
                <CaptionText room = 'content-top' size = 'large' > Content Right Room Property </CaptionText>
                <HorizontalDivider room = 'content-top' />
                <ColumnLayout
                    room = 'content-middle'
                    roomAlignment = { roomAlignment }
                    contentLeftRoomAlignment = { contentLeftRoomAlignment }
                    contentMiddleRoomAlignment = { contentMiddleRoomAlignment }
                    contentRightRoomAlignment = { contentRightRoomAlignment }
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
                    <ColumnLayout
                        room = 'content-left'
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
                    </ColumnLayout>
                    <ColumnLayout
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
                    </ColumnLayout>
                    <ColumnLayout
                        room = 'content-right'
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
                    </ColumnLayout>
                </ColumnLayout>
            </RowLayout>
        );
    }
}

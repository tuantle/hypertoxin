'use strict'; // eslint-disable-line

import { Ht } from 'hypertoxin';

import React from 'react';

import ReactNative from 'react-native'; // eslint-disable-line

import PropTypes from 'prop-types';

import DefaultTheme from '../../themes/default-theme';

const {
    RowLayout,
    ColumnLayout,
    HeadlineText,
    InfoText,
    CaptionText,
    RaisedButton,
    IconImage,
    HorizontalDivider
} = Ht;

export default class RaisedButtonView extends React.Component {
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
            badgeCount: 0
        };
    }
    render () {
        const component = this;
        const {
            shade
        } = component.props;
        const {
            badgeCount
        } = component.state;

        return (
            <RowLayout
                shade = { shade }
                roomAlignment = 'center'
                contentTopRoomAlignment = 'center'
            >
                <HeadlineText room = 'content-top' > Raised Buttons </HeadlineText>
                <CaptionText room = 'content-top' size = 'large' > With color themes </CaptionText>
                <ColumnLayout
                    room = 'content-top'
                    roomAlignment = 'start'
                    margin = { 10 }
                >
                    <RaisedButton room = 'content-left' label = 'BUTTON' color = 'default' />
                    <RaisedButton room = 'content-left' label = 'BUTTON' color = 'primary' />
                    <RaisedButton room = 'content-middle' label = 'BUTTON' color = 'secondary' />
                    <RaisedButton room = 'content-right' label = 'BUTTON' color = 'accent' />
                </ColumnLayout>
                <CaptionText room = 'content-top' size = 'large' > With corner styles </CaptionText>
                <ColumnLayout
                    room = 'content-top'
                    roomAlignment = 'start'
                    margin = { 10 }
                >
                    <RaisedButton room = 'content-left' label = 'BUTTON' color = 'primary' corner = 'sharp' />
                    <RaisedButton room = 'content-middle' label = 'BUTTON' color = 'secondary' corner = 'round' />
                    <RaisedButton room = 'content-right' label = 'BUTTON' color = 'accent' corner = 'circular' />
                </ColumnLayout>
                <CaptionText room = 'content-top' size = 'large' > With 3 sizes & icon to the left </CaptionText>
                <ColumnLayout
                    room = 'content-top'
                    roomAlignment = 'center'
                    margin = { 10 }
                >
                    <RaisedButton room = 'content-middle' size = 'small' label = 'SMALL' color = 'primary' >
                        <IconImage
                            room = 'content-left'
                            source = 'home'
                        />
                    </RaisedButton>
                    <RaisedButton room = 'content-middle' size = 'normal' label = 'NORMAL' color = 'secondary' >
                        <IconImage
                            room = 'content-left'
                            source = 'home'
                        />
                    </RaisedButton>
                    <RaisedButton room = 'content-middle' size = 'large' label = 'LARGE' color = 'accent' >
                        <IconImage
                            room = 'content-left'
                            source = 'home'
                        />
                    </RaisedButton>
                </ColumnLayout>
                <CaptionText room = 'content-top' size = 'large' > With 3 sizes & icon to the right  </CaptionText>
                <ColumnLayout
                    room = 'content-top'
                    roomAlignment = 'center'
                    margin = { 10 }
                >
                    <RaisedButton room = 'content-middle' size = 'small' label = 'SMALL' color = 'primary' >
                        <IconImage
                            room = 'content-right'
                            source = 'profile'
                        />
                    </RaisedButton>
                    <RaisedButton room = 'content-middle' size = 'normal' label = 'NORMAL' color = 'secondary' >
                        <IconImage
                            room = 'content-right'
                            source = 'profile'
                        />
                    </RaisedButton>
                    <RaisedButton room = 'content-middle' size = 'large' label = 'LARGE' color = 'accent' >
                        <IconImage
                            room = 'content-right'
                            source = 'profile'
                        />
                    </RaisedButton>
                </ColumnLayout>
                <CaptionText room = 'content-top' size = 'large' > With badges  </CaptionText>
                <RaisedButton
                    room = 'content-top'
                    size = 'normal'
                    label = 'BUTTON'
                    onPress = {() => {
                        component.setState((prevState) => {
                            return {
                                badgeCount: prevState.badgeCount < 10 ? prevState.badgeCount + 1 : 0
                            };
                        });
                    }}
                >
                    <IconImage
                        room = 'content-left'
                        source = 'home'
                    />
                    <InfoText room = 'badge' exclusions = {[ `color` ]} color = 'white' >{ badgeCount }</InfoText>
                </RaisedButton>
                <CaptionText room = 'content-top' size = 'large' > Disabled button  </CaptionText>
                <RaisedButton room = 'content-top' size = 'normal' label = 'DISABLED' disabled = { true } >
                    <IconImage
                        room = 'content-left'
                        source = 'home'
                    />
                </RaisedButton>
                <HorizontalDivider room = 'content-middle' edgeToEdge = { true }/>
                <HeadlineText room = 'content-middle' > Raised FAB Buttons </HeadlineText>
                <ColumnLayout
                    room = 'content-middle'
                    margin = { 10 }
                >
                    <RaisedButton room = 'content-left' color = 'primary' corner = 'circular' size = 'large' >
                        <IconImage
                            room = 'content-middle'
                            source = 'add'
                        />
                    </RaisedButton>
                    <RaisedButton room = 'content-middle' color = 'secondary' corner = 'circular' size = 'large' >
                        <IconImage
                            room = 'content-middle'
                            source = 'edit'
                        />
                    </RaisedButton>
                    <RaisedButton room = 'content-right' color = 'accent' corner = 'circular' size = 'large' >
                        <IconImage
                            room = 'content-middle'
                            source = 'star'
                        />
                    </RaisedButton>
                </ColumnLayout>
            </RowLayout>
        );
    }
}

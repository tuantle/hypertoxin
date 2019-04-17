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
    FlatButton,
    IconImage,
    HorizontalDivider
} = Ht;

export default class FlatButtonView extends React.Component {
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
                <HeadlineText room = 'content-top' > Flat Buttons </HeadlineText>
                <CaptionText room = 'content-top' size = 'large' > With color themes </CaptionText>
                <ColumnLayout
                    room = 'content-top'
                    roomAlignment = 'start'
                    margin = { 10 }
                >
                    <FlatButton room = 'content-left' overlay = 'opaque' label = 'BUTTON' color = 'default' />
                    <FlatButton room = 'content-left' overlay = 'opaque' label = 'BUTTON' color = 'primary' />
                    <FlatButton room = 'content-middle' overlay = 'opaque' label = 'BUTTON' color = 'secondary' />
                    <FlatButton room = 'content-right' overlay = 'opaque' label = 'BUTTON' color = 'accent' />
                </ColumnLayout>
                <CaptionText room = 'content-top' size = 'large' > With corner styles </CaptionText>
                <ColumnLayout
                    room = 'content-top'
                    roomAlignment = 'start'
                    margin = { 10 }
                >
                    <FlatButton room = 'content-left' overlay = 'opaque' label = 'BUTTON' color = 'primary' corner = 'sharp' />
                    <FlatButton room = 'content-middle' overlay = 'opaque' label = 'BUTTON' color = 'secondary' corner = 'round' />
                    <FlatButton room = 'content-right' overlay = 'opaque' label = 'BUTTON' color = 'accent' corner = 'circular' />
                </ColumnLayout>
                <CaptionText room = 'content-top' size = 'large' > With 3 sizes & icon to the left </CaptionText>
                <ColumnLayout
                    room = 'content-top'
                    roomAlignment = 'center'
                    margin = { 10 }
                >
                    <FlatButton room = 'content-middle' overlay = 'opaque' size = 'small' label = 'SMALL' color = 'primary' >
                        <IconImage
                            room = 'content-left'
                            source = 'home'
                        />
                    </FlatButton>
                    <FlatButton room = 'content-middle' overlay = 'opaque' size = 'normal' label = 'NORMAL' color = 'secondary' >
                        <IconImage
                            room = 'content-left'
                            source = 'home'
                        />
                    </FlatButton>
                    <FlatButton room = 'content-middle' overlay = 'opaque' size = 'large' label = 'LARGE' color = 'accent' >
                        <IconImage
                            room = 'content-left'
                            source = 'home'
                        />
                    </FlatButton>
                </ColumnLayout>
                <CaptionText room = 'content-top' size = 'large' > With 3 sizes & icon to the right  </CaptionText>
                <ColumnLayout
                    room = 'content-top'
                    roomAlignment = 'center'
                    margin = { 10 }
                >
                    <FlatButton room = 'content-middle' overlay = 'opaque' size = 'small' label = 'SMALL' color = 'primary' >
                        <IconImage
                            room = 'content-right'
                            source = 'profile'
                        />
                    </FlatButton>
                    <FlatButton room = 'content-middle' overlay = 'opaque' size = 'normal' label = 'NORMAL' color = 'secondary' >
                        <IconImage
                            room = 'content-right'
                            source = 'profile'
                        />
                    </FlatButton>
                    <FlatButton room = 'content-middle' overlay = 'opaque' size = 'large' label = 'LARGE' color = 'accent' >
                        <IconImage
                            room = 'content-right'
                            source = 'profile'
                        />
                    </FlatButton>
                </ColumnLayout>
                <CaptionText room = 'content-top' size = 'large' > With badges  </CaptionText>
                <FlatButton
                    room = 'content-top'
                    overlay = 'opaque'
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
                </FlatButton>
                <CaptionText room = 'content-top' size = 'large' > Disabled button  </CaptionText>
                <FlatButton room = 'content-top' overlay = 'opaque' size = 'normal' label = 'DISABLED' disabled = { true } >
                    <IconImage
                        room = 'content-left'
                        source = 'home'
                    />
                </FlatButton>
                <HorizontalDivider room = 'content-middle' edgeToEdge = { true }/>
                <HeadlineText room = 'content-middle' > Flat Outlined Buttons </HeadlineText>
                <CaptionText room = 'content-middle' size = 'large' > With different sizes & stylings  </CaptionText>
                <ColumnLayout
                    room = 'content-middle'
                    roomAlignment = 'start'
                    margin = { 10 }
                >
                    <FlatButton room = 'content-left' overlay = 'transparent-outline' size = 'small' label = 'BUTTON' color = 'primary' corner = 'sharp' >
                        <IconImage
                            room = 'content-left'
                            source = 'star'
                        />
                    </FlatButton>
                    <FlatButton room = 'content-middle' overlay = 'transparent-outline' size = 'normal' label = 'BUTTON' color = 'secondary' corner = 'round' >
                        <IconImage
                            room = 'content-right'
                            source = 'star'
                        />
                    </FlatButton>
                    <FlatButton room = 'content-right' overlay = 'transparent-outline' size = 'large' label = 'BUTTON' color = 'accent' corner = 'circular' />
                </ColumnLayout>
            </RowLayout>
        );
    }
}

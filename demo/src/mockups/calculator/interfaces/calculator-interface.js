'use strict'; // eslint-disable-line

import { Hf } from 'hyperflow';

import { Ht } from 'hypertoxin';

import React from 'react';

import ReactNative from 'react-native'; // eslint-disable-line

import EVENT from '../events/calculator-event';

const KEYPADLABELS = [
    [ `C`, `7`, `4`, `1`, `0` ],
    [ `±`, `8`, `5`, `2` ],
    [ `Pi`, `9`, `6`, `3`, `.` ],
    [ `÷`, `×`, `-`, `+`, `=` ]
];

const {
    BodyScreen,
    HeaderScreen,
    RowLayout,
    ColumnLayout,
    FlatButton,
    IconImage,
    HeadlineText,
    SubtitleText,
    CaptionText
} = Ht;

const CalculatorInterface = Hf.Interface.augment({
    composites: [
        Hf.React.ComponentComposite
    ],
    setup (done) {
        done();
    },
    render () {
        const component = this;
        const {
            navigation,
            screenProps
        } = component.props;
        const {
            Theme,
            shade
        } = screenProps.component.state;
        const {
            displayResult,
            displayComputes
        } = component.state;

        return ([
            <HeaderScreen
                key = 'header-screen'
                shade = { shade }
                label = 'CALCULATOR APP'
            >
                <FlatButton
                    room = 'content-left'
                    overlay = 'transparent'
                    corner = 'circular'
                    onPress = {() => {
                        component.outgoing(EVENT.ON.RESET).emit();
                        navigation.navigate(`mockupAppsHome`);
                    }}
                >
                    <IconImage
                        room = 'content-middle'
                        size = 'large'
                        source = 'go-back'
                    />
                </FlatButton>
            </HeaderScreen>,
            <BodyScreen
                key = 'body-screen'
                shade = { shade }
                contentTopRoomAlignment = 'stretch'
                coverImageSource = { shade === `light` ? require(`../../../../assets/images/light-background-with-logo.png`) : require(`../../../../assets/images/dark-background-with-logo.png`) }
            >
                <ColumnLayout
                    room = 'content-top'
                    overlay = 'transparent-outline'
                    roomAlignment = 'end'
                    color = 'accent'
                    corner = 'circular'
                    margin = {{
                        top: 150,
                        horizontal: 20,
                        right: 10
                    }}
                >
                    <HeadlineText room = 'content-right' size = 'large' indentation = { -10 } color = { Theme.color.palette.white }>{ displayResult }</HeadlineText>
                </ColumnLayout>
                <RowLayout
                    room = 'content-middle'
                    roomAlignment = 'stretch'
                    margin = {{
                        horizontal: 20
                    }}
                >
                    <RowLayout
                        room = 'content-top'
                        overlay = 'transparent'
                        roomAlignment = 'end'
                        margin = {{
                            bottom: 30
                        }}
                    >
                        <SubtitleText room = 'content-middle' size = 'small' color = { Theme.color.palette.grey }>{ `${displayComputes}` }</SubtitleText>
                        <CaptionText room = 'content-middle' > Version: 0.6 </CaptionText>
                    </RowLayout>
                    <ColumnLayout
                        room = 'content-middle'
                        overlay = 'transparent'
                        roomAlignment = 'start'
                        margin = {{
                            horizontal: 40,
                            bottom: 30
                        }}
                    >
                        {
                            KEYPADLABELS.map((cellLabels, col) => {
                                return (
                                    <RowLayout
                                        key = { col }
                                        room = 'content-middle'
                                        overlay = 'transparent'
                                        roomAlignment = 'center'
                                        margin = {{
                                            horizontal: 10
                                        }}
                                    >
                                        {
                                            cellLabels.map((cellLabel, row) => {
                                                return (
                                                    <FlatButton
                                                        room = 'content-middle'
                                                        key = { cellLabel }
                                                        label = { cellLabel }
                                                        size = 'large'
                                                        corner = 'round'
                                                        overlay = 'opaque'
                                                        color = {(() => {
                                                            if (row === 0 && col < 3) {
                                                                return `secondary`;
                                                            } else if (col === 3) {
                                                                return `accent`;
                                                            }
                                                            return `primary`;
                                                        })()}
                                                        onPress = {() => {
                                                            if (cellLabel === `C`) {
                                                                component.outgoing(EVENT.ON.RESET).emit();
                                                            } else if (cellLabel === `÷` || cellLabel === `×` || cellLabel === `+` || cellLabel === `-`) {
                                                                component.outgoing(EVENT.ON.OPERATION).emit(() => cellLabel);
                                                            } else if (Hf.isNumeric(cellLabel) || cellLabel === `.` || cellLabel === `Pi` || cellLabel === `±`) {
                                                                component.outgoing(EVENT.ON.OPERAND).emit(() => cellLabel);
                                                            } else if (cellLabel === `=`) {
                                                                component.outgoing(EVENT.ON.COMPUTE).emit();
                                                            }
                                                        }}
                                                    />
                                                );
                                            })
                                        }
                                    </RowLayout>
                                );
                            })
                        }
                    </ColumnLayout>
                </RowLayout>
            </BodyScreen>
        ]);
    }
});
export default CalculatorInterface;

/**
 * Copyright (c) 2017-present, Virida YEAwareness, Org. All rights reserved.
 *
 *------------------------------------------------------------------------
 *
 * @module MovingWave
 * @description - Virida client-native app decorative moving wave component.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 *------------------------------------------------------------------------
 * @flow
 */
'use strict'; // eslint-disable-line

import React from 'react';

import ReactNative from 'react-native'; // eslint-disable-line

import PropTypes from 'prop-types';

import Svg, { Path } from 'react-native-svg';

const {
    Dimensions,
    View
} = ReactNative;

const DEVICE_WIDTH = Dimensions.get(`window`).width;

const sineCurveSegments = Array.from(Array(20), (x, index) => index * 0.5).map((index) => {
    return {
        x: index * 50,
        y: 0
    };
});

export default class MovingWave extends React.Component {
    static propTypes = {
        waves: PropTypes.arrayOf(PropTypes.shape({
            color: PropTypes.string,
            opacity: PropTypes.number,
            lineThickness: PropTypes.number,
            amplitude: PropTypes.number,
            phase: PropTypes.number,
            verticalOffset: PropTypes.number
        }))
    }
    static defaultProps = {
        waves: [{
            color: `white`,
            opacity: 1,
            lineThickness: 3,
            amplitude: 100,
            phase: 0,
            verticalOffset: 120
        }]
    }
    constructor (props) {
        super(props);
        this.state = {
            t: Math.random(),
            intervalId: null
        };
    }
    componentDidMount () {
        const component = this;
        const intervalId = setInterval(() => {
            component.setState((prevState) => {
                return {
                    intervalId,
                    t: prevState.t + 0.008
                };
            });
        }, 18);
    }
    componentWillUnmount () {
        const component = this;
        const {
            intervalId
        } = component.state;
        if (intervalId !== null) {
            clearInterval(intervalId);
            component.setState(() => {
                return {
                    intervalId: null,
                    t: 0
                };
            });
        }
    }
    renderWaves () {
        const component = this;
        const {
            waves
        } = component.props;
        const {
            t
        } = component.state;
        const calcSineCurve = function calcSineCurve ({
            amplitude,
            phase,
            verticalOffset
        }) {
            verticalOffset += amplitude;
            return sineCurveSegments.map((segment) => {
                return {
                    x: segment.x,
                    y: amplitude * Math.sin(t + segment.x + phase) + verticalOffset
                };
            }).reduce((sineCurve, segment) => {
                return `${sineCurve} L ${segment.x} ${segment.y}`;
            }, `M ${0} ${amplitude * Math.sin(t + phase) + verticalOffset}`);
        };
        return waves.map((wave, index) => {
            return (
                <Path
                    key = { `${index}` }
                    fill = 'none'
                    stroke = { wave.color }
                    strokeWidth = { wave.lineThickness }
                    strokeOpacity = { wave.opacity }
                    strokeMiterlimit = { 10 }
                    d = { calcSineCurve(wave) }
                />
            );
        });
    }
    render () {
        const component = this;
        const {
            waves
        } = component.props;
        const height = 2.25 * Math.max.apply(Math, waves.map((wave) => wave.amplitude)) + Math.max.apply(Math, waves.map((wave) => wave.verticalOffset));
        return (
            <View style = {{
                position: `absolute`,
                flexDirection: `column`,
                justifyContent: `center`,
                alignItems: `center`,
                width: DEVICE_WIDTH,
                height,
                top: 0,
                backgroundColor: `transparent`
            }}>
                <Svg
                    width = { DEVICE_WIDTH }
                    height = { height }
                >
                    {
                        component.renderWaves()
                    }
                </Svg>
            </View>
        );
    }
}

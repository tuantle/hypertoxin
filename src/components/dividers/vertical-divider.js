/**
 * Copyright 2016-present Tuan Le.
 *
 * Licensed under the MIT License.
 * You may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://opensource.org/licenses/mit-license.html
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 *------------------------------------------------------------------------
 *
 * @module VerticalDivider
 * @description - A vertical divider component.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 * @flow
 */
'use strict'; // eslint-disable-line

import React from 'react';

import ReactNative from 'react-native'; // eslint-disable-line

import PropTypes from 'prop-types';

import {
    DefaultTheme,
    DefaultThemeContext
} from '../../themes/default-theme';

const {
    Dimensions,
    View
} = ReactNative;

const DEVICE_HEIGHT = Dimensions.get(`window`).height;

const DEFAULT_VERITICAL_DIVIDER_STYLE = {
    flexShrink: 1,
    alignSelf: `stretch`,
    width: DefaultTheme.misc.size.divider.vertical,
    maxHeight: DEVICE_HEIGHT
};

const VerticalDivider = (props) => {
    const {
        shade,
        thickness,
        edgeToEdge,
        margin,
        color,
        style
    } = props;
    return (
        <DefaultThemeContext.Consumer>
            {
                (context = {
                    Theme: DefaultTheme
                }) => {
                    const {
                        Theme
                    } = context;
                    const themedShade = shade === `themed` ? Theme.misc.divider.vertical.shade : shade;
                    const nullMargin = {
                        margin: null,
                        marginTop: null,
                        marginBottom: null,
                        marginLeft: null,
                        marginRight: null,
                        marginHorizontal: null,
                        marginVertical: null
                    };
                    let themedWH = {};
                    let themedMargin;

                    if (typeof margin === `string`) {
                        if (margin === `themed`) {
                            if (typeof Theme.misc.divider.vertical.margin === `string` && Theme.misc.margin.divider.vertical.hasOwnProperty(Theme.misc.divider.vertical.margin)) {
                                themedMargin = Theme.misc.margin.divider.vertical[Theme.misc.divider.vertical.margin];
                            } else {
                                themedMargin = Theme.misc.divider.vertical.margin;
                            }
                        } else if (Theme.misc.margin.divider.vertical.hasOwnProperty(margin)) {
                            themedMargin = Theme.misc.margin.divider.vertical[margin];
                        } else {
                            themedMargin = 0;
                        }
                    } else {
                        themedMargin = margin;
                    }
                    if (typeof themedMargin === `number`) {
                        themedMargin = {
                            ...nullMargin,
                            margin: themedMargin
                        };
                    } else if (typeof themedMargin === `object`) {
                        themedMargin = Object.entries(themedMargin).reduce((_themedMargin, [ key, value ]) => {
                            let _margin = nullMargin;

                            _margin[`margin${key.charAt(0).toUpperCase()}${key.slice(1)}`] = value;
                            _themedMargin = {
                                ..._themedMargin,
                                ..._margin
                            };
                            return _themedMargin;
                        }, nullMargin);
                    }

                    if (edgeToEdge) {
                        themedWH = {
                            width: typeof thickness !== `number` ? Theme.misc.size.divider.vertical : thickness,
                            height: DEVICE_HEIGHT
                        };
                    } else {
                        themedWH = {
                            width: typeof thickness !== `number` ? Theme.misc.size.divider.vertical : thickness
                        };
                    }

                    return (
                        <View style = {{
                            ...DEFAULT_VERITICAL_DIVIDER_STYLE,
                            ...themedWH,
                            ...themedMargin,
                            backgroundColor: color === `themed` ? Theme.misc.color.divider.vertical[themedShade] : color,
                            ...(typeof style === `object` ? style : {})
                        }}/>
                    );
                }
            }
        </DefaultThemeContext.Consumer>
    );
};

VerticalDivider.propTypes = {
    exclusions: PropTypes.arrayOf(PropTypes.string),
    room: PropTypes.oneOf([
        `none`,
        `content-left`, `content-middle`, `content-right`,
        `content-bottom`, `content-top`,
        `media`
    ]),
    shade: PropTypes.oneOf([ `themed`, `light`, `dark` ]),
    thickness: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    edgeToEdge: PropTypes.bool,
    margin: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.shape({
            top: PropTypes.number,
            bottom: PropTypes.number,
            left: PropTypes.number,
            right: PropTypes.number,
            horizontal: PropTypes.number,
            vertical: PropTypes.number
        })
    ]),
    color: PropTypes.string
};

VerticalDivider.defaultProps = {
    exclusions: [ `` ],
    room: `none`,
    shade: `themed`,
    thickness: `themed`,
    edgeToEdge: false,
    margin: `themed`,
    color: `themed`
};

export default VerticalDivider;

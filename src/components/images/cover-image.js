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
 * @module CoverImage
 * @description - Cover image component.
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
    ImageBackground
} = ReactNative;

const DEVICE_WIDTH = Dimensions.get(`window`).width;
const DEVICE_HEIGHT = Dimensions.get(`window`).height;

const DEFAULT_DROP_SHADOW_STYLE = {
    shadowColor: `#000000`,
    shadowRadius: 2,
    shadowOpacity: 0.3,
    shadowOffset: {
        width: 0,
        height: 1
    }
};

const DEFAULT_COVER_IMAGE_STYLE = {
    flexDirection: `column`,
    justifyContent: `center`,
    alignItems: `center`,
    maxWidth: DEVICE_WIDTH,
    maxHeight: DEVICE_HEIGHT
};

const CoverImage = (props) => {
    const {
        exclusions,
        shade,
        width,
        height,
        corner,
        margin,
        resizeMode,
        dropShadowed,
        source,
        defaultSource,
        style,
        children
    } = props;
    let contentChildren = null;

    if (React.Children.count(children) > 0) {
        contentChildren = React.Children.toArray(React.Children.map(children, (child) => {
            if (child !== null) {
                const inheritedProps = Array.isArray(exclusions) ? Object.entries({
                    shade
                }).filter(([
                    propName,
                    prop // eslint-disable-line
                ]) => exclusions.every((exclusion) => propName !== exclusion)).reduce((_inheritedProps, [ propName, prop ]) => {
                    _inheritedProps[propName] = prop;
                    return _inheritedProps;
                }, {}) : {
                    shade
                };
                return React.cloneElement(child, inheritedProps);
            }
            return null;
        }));
    }

    return (
        <DefaultThemeContext.Consumer>
            {
                (context = {
                    Theme: DefaultTheme
                }) => {
                    const {
                        Theme
                    } = context;
                    const size = Math.min(width, height);
                    const nullMargin = {
                        margin: null,
                        marginTop: null,
                        marginBottom: null,
                        marginLeft: null,
                        marginRight: null,
                        marginHorizontal: null,
                        marginVertical: null
                    };
                    const nullBorderRadius = {
                        borderTopLeftRadius: null,
                        borderTopRightRadius: null,
                        borderBottomLeftRadius: null,
                        borderBottomRightRadius: null
                    };
                    let dropShadow;
                    let themedBorderRadius;
                    let themedCorner;
                    let themedMargin;

                    if (typeof corner === `string`) {
                        if (corner === `themed`) {
                            if (typeof Theme.image.cover.corner === `string` && Theme.image.corner.cover.hasOwnProperty(Theme.image.cover.corner)) {
                                themedCorner = Theme.image.corner.cover[Theme.image.cover.corner];
                            } else {
                                themedCorner = Theme.image.cover.corner;
                            }
                        } else if (Theme.image.corner.cover.hasOwnProperty(corner)) {
                            themedCorner = Theme.image.corner.cover[corner];
                        } else {
                            themedCorner = 0;
                        }
                    } else {
                        themedCorner = corner;
                    }
                    if (typeof themedCorner === `number`) {
                        themedBorderRadius = {
                            ...nullBorderRadius,
                            borderRadius: Math.floor(themedCorner * size)
                        };
                    } else if (typeof themedCorner === `object`) {
                        themedBorderRadius = Object.entries(themedCorner).reduce((_themedBorderRadius, [ key, value ]) => {
                            let _borderRadius = nullBorderRadius;

                            _borderRadius[`border${key.charAt(0).toUpperCase()}${key.slice(1)}Radius`] = Math.floor(size * value);

                            _themedBorderRadius = {
                                ..._themedBorderRadius,
                                ..._borderRadius
                            };
                            return _themedBorderRadius;
                        }, nullBorderRadius);
                    }

                    if (typeof margin === `string`) {
                        if (margin === `themed`) {
                            if (typeof Theme.image.cover.margin === `string` && Theme.image.margin.cover.hasOwnProperty(Theme.image.cover.margin)) {
                                themedMargin = Theme.image.margin.cover[Theme.image.cover.margin];
                            } else {
                                themedMargin = Theme.image.cover.margin;
                            }
                        } else if (Theme.image.margin.cover.hasOwnProperty(margin)) {
                            themedMargin = Theme.image.margin.cover[margin];
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

                    if ((typeof dropShadowed === `boolean` && dropShadowed) || (dropShadowed === `themed` && Theme.image.cover.dropShadowed)) {
                        dropShadow = DEFAULT_DROP_SHADOW_STYLE;
                    } else {
                        dropShadow = {
                            ...DEFAULT_DROP_SHADOW_STYLE,
                            shadowRadius: 0,
                            shadowOpacity: 0,
                            shadowOffset: {
                                width: 0,
                                height: 0
                            }
                        };
                    }
                    return (
                        <ImageBackground
                            style = {{
                                ...DEFAULT_COVER_IMAGE_STYLE,
                                ...dropShadow,
                                width,
                                height,
                                ...themedMargin,
                                ...themedBorderRadius,
                                ...(typeof style === `object` ? style : {})
                            }}
                            imageStyle = {{
                                ...themedBorderRadius
                            }}
                            source = {
                                typeof source === `string` ? {
                                    uri: source,
                                    cache: `only-if-cached`
                                } : source
                            }
                            defaultSource = {
                                typeof source === `string` ? {
                                    uri: defaultSource
                                } : defaultSource
                            }
                            resizeMode = { resizeMode }
                        >
                            {
                                contentChildren
                            }
                        </ImageBackground>
                    );
                }
            }
        </DefaultThemeContext.Consumer>
    );
};

const ImageURISourcePropType = PropTypes.shape({
    uri: PropTypes.string,
    bundle: PropTypes.string,
    method: PropTypes.string,
    headers: PropTypes.objectOf(PropTypes.string),
    body: PropTypes.string,
    cache: PropTypes.oneOf([
        `default`,
        `reload`,
        `force-cache`,
        `only-if-cached`
    ]),
    width: PropTypes.number,
    height: PropTypes.number,
    scale: PropTypes.number
});

CoverImage.propTypes = {
    exclusions: PropTypes.arrayOf(PropTypes.string),
    room: PropTypes.oneOf([
        `none`,
        `content-left`, `content-middle`, `content-right`,
        `content-bottom`, `content-top`,
        `media`, `activity-indicator`
    ]),
    shade: PropTypes.oneOf([ `themed`, `light`, `dark` ]),
    width: PropTypes.number,
    height: PropTypes.number,
    corner: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.shape({
            topLeft: PropTypes.number,
            topRight: PropTypes.number,
            bottomLeft: PropTypes.number,
            bottomRight: PropTypes.number
        })
    ]),
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
    resizeMode: PropTypes.oneOf([ `cover`, `contain`, `stretch`, `repeat`, `center` ]),
    dropShadowed: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.string
    ]),
    source: PropTypes.oneOfType([
        () => null,
        PropTypes.string,
        PropTypes.number,
        ImageURISourcePropType,
        PropTypes.arrayOf(ImageURISourcePropType)
    ]),
    defaultSource: PropTypes.oneOfType([
        () => null,
        PropTypes.string,
        PropTypes.number,
        ImageURISourcePropType,
        PropTypes.arrayOf(ImageURISourcePropType)
    ])
};

CoverImage.defaultProps = {
    exclusions: [ `` ],
    room: `none`,
    shade: `themed`,
    width: 0,
    height: 0,
    corner: `themed`,
    margin: `themed`,
    resizeMode: `contain`,
    dropShadowed: `themed`,
    source: null,
    defaultSource: null
};

export default CoverImage;

/**
 * Copyright (c) 2016-present, Boki, Inc. All rights reserved.
 *
 * Licensed TBA
 *
 *------------------------------------------------------------------------
 *
 * @description - Font style template.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 *------------------------------------------------------------------------
 */

'use strict'; //eslint-disable-line

import { Dimensions, PixelRatio } from 'react-native';

// const DEVICE_WIDTH = Dimensions.get(`window`).width;
// const DEVICE_HEIGHT = Dimensions.get(`window`).height;

/* calculating ratio from iPhone breakpoints */
// const RATIO_X = DEVICE_WIDTH < 375 ? (DEVICE_WIDTH < 320 ? 0.75 : 0.875) : 1 ; // eslint-disable-line
// const RATIO_Y = DEVICE_HEIGHT < 568 ? (DEVICE_HEIGHT < 480 ? 0.75 : 0.875) : 1 ; //eslint-disable-line

/* base font size value */
const BASE_FONT_SCALING_UNIT = 8;

/* changing font size according to ratio */
const FONT_SCALING_UNIT = BASE_FONT_SCALING_UNIT * PixelRatio.get();

const FONT_SIZE = FONT_SCALING_UNIT;
const FONT_SIZE_SMALLEST = FONT_SCALING_UNIT * 0.625;
const FONT_SIZE_SMALLER = FONT_SCALING_UNIT * 0.75;
const FONT_SIZE_SMALL = FONT_SCALING_UNIT * 0.875;
const FONT_SIZE_LARGE = FONT_SCALING_UNIT * 1.25;
const FONT_SIZE_LARGER = FONT_SCALING_UNIT * 1.5;
const FONT_SIZE_LARGEST = FONT_SCALING_UNIT * 1.75;

const normalFontSmallestTemplate = {
    fontSize: FONT_SIZE_SMALLEST,
    fontWeight: `200`,
    margin: 3,
    padding: 3
};

const boldFontSmallestTemplate = {
    fontSize: FONT_SIZE_SMALLEST,
    fontWeight: `500`,
    margin: 3,
    padding: 3
};

const italicFontSmallestTemplate = {
    fontSize: FONT_SIZE_SMALLEST,
    fontWeight: `200`,
    fontStyle: `italic`,
    margin: 3,
    padding: 3
};

const normalFontSmallerTemplate = {
    fontSize: FONT_SIZE_SMALLER,
    fontWeight: `200`,
    margin: 3,
    padding: 3
};

const boldFontSmallerTemplate = {
    fontSize: FONT_SIZE_SMALLER,
    fontWeight: `500`,
    margin: 3,
    padding: 3
};

const italicFontSmallerTemplate = {
    fontSize: FONT_SIZE_SMALLER,
    fontWeight: `200`,
    fontStyle: `italic`,
    margin: 3,
    padding: 3
};

const normalFontSmallTemplate = {
    fontSize: FONT_SIZE_SMALL,
    fontWeight: `200`,
    margin: 3,
    padding: 3
};

const boldFontSmallTemplate = {
    fontSize: FONT_SIZE_SMALL,
    fontWeight: `500`,
    margin: 3,
    padding: 3
};

const italicFontSmallTemplate = {
    fontSize: FONT_SIZE_SMALL,
    fontWeight: `200`,
    fontStyle: `italic`,
    margin: 3,
    padding: 3
};

const normalFontTemplate = {
    fontSize: FONT_SIZE,
    fontWeight: `200`,
    margin: 3,
    padding: 3
};

const boldFontTemplate = {
    fontSize: FONT_SIZE,
    fontWeight: `500`,
    margin: 3,
    padding: 3
};

const italicFontTemplate = {
    fontSize: FONT_SIZE,
    fontWeight: `200`,
    fontStyle: `italic`,
    margin: 3,
    padding: 3
};

const normalFontLargeTemplate = {
    fontSize: FONT_SIZE_LARGE,
    fontWeight: `200`,
    margin: 3,
    padding: 3
};

const boldFontLargeTemplate = {
    fontSize: FONT_SIZE_LARGE,
    fontWeight: `500`,
    margin: 3,
    padding: 3
};

const italicFontLargeTemplate = {
    fontSize: FONT_SIZE_LARGE,
    fontWeight: `200`,
    fontStyle: `italic`,
    margin: 3,
    padding: 3
};

const normalFontLargerTemplate = {
    fontSize: FONT_SIZE_LARGER,
    fontWeight: `200`,
    margin: 3,
    padding: 3
};

const boldFontLargerTemplate = {
    fontSize: FONT_SIZE_LARGER,
    fontWeight: `500`,
    margin: 3,
    padding: 3
};

const italicFontLargerTemplate = {
    fontSize: FONT_SIZE_LARGER,
    fontWeight: `200`,
    fontStyle: `italic`,
    margin: 3,
    padding: 3
};

const normalFontLargestTemplate = {
    fontSize: FONT_SIZE_LARGEST,
    fontWeight: `200`,
    margin: 3,
    padding: 3
};

const boldFontLargestTemplate = {
    fontSize: FONT_SIZE_LARGEST,
    fontWeight: `500`,
    margin: 3,
    padding: 3
};

const italicFontLargestTemplate = {
    fontSize: FONT_SIZE_LARGEST,
    fontWeight: `200`,
    fontStyle: `italic`,
    margin: 3,
    padding: 3
};

export default {
    normalSmallest: normalFontSmallestTemplate,
    boldSmallest: boldFontSmallestTemplate,
    italicSmallest: italicFontSmallestTemplate,

    normalSmaller: normalFontSmallerTemplate,
    boldSmaller: boldFontSmallerTemplate,
    italicSmaller: italicFontSmallerTemplate,

    normalSmall: normalFontSmallTemplate,
    boldSmall: boldFontSmallTemplate,
    italicSmall: italicFontSmallTemplate,

    normal: normalFontTemplate,
    bold: boldFontTemplate,
    italic: italicFontTemplate,

    normalLarge: normalFontLargeTemplate,
    boldLarge: boldFontLargeTemplate,
    italicLarge: italicFontLargeTemplate,

    normalLarger: normalFontLargerTemplate,
    boldLarger: boldFontLargerTemplate,
    italicLarger: italicFontLargerTemplate,

    normalLargest: normalFontLargestTemplate,
    boldLargest: boldFontLargestTemplate,
    italicLargest: italicFontLargestTemplate
};

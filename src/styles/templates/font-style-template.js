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
 * @description - Font style template.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 *------------------------------------------------------------------------
 */

'use strict'; //eslint-disable-line

import { PixelRatio } from 'react-native';

/* base font size value */
const BASE_FONT_SCALING_UNIT = PixelRatio.get() >= 3 ? 8 : 6;

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

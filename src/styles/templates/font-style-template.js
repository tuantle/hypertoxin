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

const FONT_SIZE_SMALLEST = FONT_SCALING_UNIT * 0.625;
const FONT_SIZE_SMALLER = FONT_SCALING_UNIT * 0.75;
const FONT_SIZE_SMALL = FONT_SCALING_UNIT * 0.875;
const FONT_SIZE_NORMAL = FONT_SCALING_UNIT * 1.0;
const FONT_SIZE_LARGE = FONT_SCALING_UNIT * 1.25;
const FONT_SIZE_LARGER = FONT_SCALING_UNIT * 2.50;
const FONT_SIZE_LARGEST = FONT_SCALING_UNIT * 3.75;

const FONT_WEIGHT_THIN = `200`;
const FONT_WEIGHT_NORMAL = `400`;
const FONT_WEIGHT_BOLD = `600`;

const thinFontSmallestTemplate = {
    fontSize: FONT_SIZE_SMALLEST,
    fontWeight: FONT_WEIGHT_THIN,
    marginVertical: 3,
    paddingVertical: 3
};

const normalFontSmallestTemplate = {
    fontSize: FONT_SIZE_SMALLEST,
    fontWeight: FONT_WEIGHT_NORMAL,
    marginVertical: 3,
    paddingVertical: 3
};

const boldFontSmallestTemplate = {
    fontSize: FONT_SIZE_SMALLEST,
    fontWeight: FONT_WEIGHT_BOLD,
    marginVertical: 3,
    paddingVertical: 3
};

const italicFontSmallestTemplate = {
    fontSize: FONT_SIZE_SMALLEST,
    fontWeight: FONT_WEIGHT_NORMAL,
    fontStyle: `italic`,
    marginVertical: 3,
    paddingVertical: 3
};

const thinFontSmallerTemplate = {
    fontSize: FONT_SIZE_SMALLER,
    fontWeight: FONT_WEIGHT_THIN,
    marginVertical: 3,
    paddingVertical: 3
};

const normalFontSmallerTemplate = {
    fontSize: FONT_SIZE_SMALLER,
    fontWeight: FONT_WEIGHT_NORMAL,
    marginVertical: 3,
    paddingVertical: 3
};

const boldFontSmallerTemplate = {
    fontSize: FONT_SIZE_SMALLER,
    fontWeight: FONT_WEIGHT_BOLD,
    marginVertical: 3,
    paddingVertical: 3
};

const italicFontSmallerTemplate = {
    fontSize: FONT_SIZE_SMALLER,
    fontWeight: FONT_WEIGHT_NORMAL,
    fontStyle: `italic`,
    marginVertical: 3,
    paddingVertical: 3
};

const thinFontSmallTemplate = {
    fontSize: FONT_SIZE_SMALL,
    fontWeight: FONT_WEIGHT_THIN,
    marginVertical: 3,
    paddingVertical: 3
};

const normalFontSmallTemplate = {
    fontSize: FONT_SIZE_SMALL,
    fontWeight: FONT_WEIGHT_NORMAL,
    marginVertical: 3,
    paddingVertical: 3
};

const boldFontSmallTemplate = {
    fontSize: FONT_SIZE_SMALL,
    fontWeight: FONT_WEIGHT_BOLD,
    marginVertical: 3,
    paddingVertical: 3
};

const italicFontSmallTemplate = {
    fontSize: FONT_SIZE_SMALL,
    fontWeight: FONT_WEIGHT_NORMAL,
    fontStyle: `italic`,
    marginVertical: 3,
    paddingVertical: 3
};

const thinFontTemplate = {
    fontSize: FONT_SIZE_NORMAL,
    fontWeight: FONT_WEIGHT_THIN,
    marginVertical: 3,
    paddingVertical: 3
};

const normalFontTemplate = {
    fontSize: FONT_SIZE_NORMAL,
    fontWeight: FONT_WEIGHT_NORMAL,
    marginVertical: 3,
    paddingVertical: 3
};

const boldFontTemplate = {
    fontSize: FONT_SIZE_NORMAL,
    fontWeight: FONT_WEIGHT_BOLD,
    marginVertical: 3,
    paddingVertical: 3
};

const italicFontTemplate = {
    fontSize: FONT_SIZE_NORMAL,
    fontWeight: FONT_WEIGHT_NORMAL,
    fontStyle: `italic`,
    marginVertical: 3,
    paddingVertical: 3
};

const thinFontLargeTemplate = {
    fontSize: FONT_SIZE_LARGE,
    fontWeight: FONT_WEIGHT_THIN,
    marginVertical: 3,
    paddingVertical: 3
};

const normalFontLargeTemplate = {
    fontSize: FONT_SIZE_LARGE,
    fontWeight: FONT_WEIGHT_NORMAL,
    marginVertical: 3,
    paddingVertical: 3
};

const boldFontLargeTemplate = {
    fontSize: FONT_SIZE_LARGE,
    fontWeight: FONT_WEIGHT_BOLD,
    marginVertical: 3,
    paddingVertical: 3
};

const italicFontLargeTemplate = {
    fontSize: FONT_SIZE_LARGE,
    fontWeight: FONT_WEIGHT_NORMAL,
    fontStyle: `italic`,
    marginVertical: 3,
    paddingVertical: 3
};

const thinFontLargerTemplate = {
    fontSize: FONT_SIZE_LARGER,
    fontWeight: FONT_WEIGHT_THIN,
    marginVertical: 3,
    paddingVertical: 3
};

const normalFontLargerTemplate = {
    fontSize: FONT_SIZE_LARGER,
    fontWeight: FONT_WEIGHT_NORMAL,
    marginVertical: 3,
    paddingVertical: 3
};

const boldFontLargerTemplate = {
    fontSize: FONT_SIZE_LARGER,
    fontWeight: FONT_WEIGHT_BOLD,
    marginVertical: 3,
    paddingVertical: 3
};

const italicFontLargerTemplate = {
    fontSize: FONT_SIZE_LARGER,
    fontWeight: FONT_WEIGHT_NORMAL,
    fontStyle: `italic`,
    marginVertical: 3,
    paddingVertical: 3
};

const thinFontLargestTemplate = {
    fontSize: FONT_SIZE_LARGEST,
    fontWeight: FONT_WEIGHT_THIN,
    marginVertical: 3,
    paddingVertical: 3
};

const normalFontLargestTemplate = {
    fontSize: FONT_SIZE_LARGEST,
    fontWeight: FONT_WEIGHT_NORMAL,
    marginVertical: 3,
    paddingVertical: 3
};

const boldFontLargestTemplate = {
    fontSize: FONT_SIZE_LARGEST,
    fontWeight: FONT_WEIGHT_BOLD,
    marginVertical: 3,
    paddingVertical: 3
};

const italicFontLargestTemplate = {
    fontSize: FONT_SIZE_LARGEST,
    fontWeight: FONT_WEIGHT_NORMAL,
    fontStyle: `italic`,
    marginVertical: 3,
    paddingVertical: 3
};

export default {
    thinSmallest: thinFontSmallestTemplate,
    normalSmallest: normalFontSmallestTemplate,
    boldSmallest: boldFontSmallestTemplate,
    italicSmallest: italicFontSmallestTemplate,

    thinSmaller: thinFontSmallerTemplate,
    normalSmaller: normalFontSmallerTemplate,
    boldSmaller: boldFontSmallerTemplate,
    italicSmaller: italicFontSmallerTemplate,

    thinSmall: thinFontSmallTemplate,
    normalSmall: normalFontSmallTemplate,
    boldSmall: boldFontSmallTemplate,
    italicSmall: italicFontSmallTemplate,

    thin: thinFontTemplate,
    normal: normalFontTemplate,
    bold: boldFontTemplate,
    italic: italicFontTemplate,

    thinLarge: thinFontLargeTemplate,
    normalLarge: normalFontLargeTemplate,
    boldLarge: boldFontLargeTemplate,
    italicLarge: italicFontLargeTemplate,

    thinLarger: thinFontLargerTemplate,
    normalLarger: normalFontLargerTemplate,
    boldLarger: boldFontLargerTemplate,
    italicLarger: italicFontLargerTemplate,

    thinLargest: thinFontLargestTemplate,
    normalLargest: normalFontLargestTemplate,
    boldLargest: boldFontLargestTemplate,
    italicLargest: italicFontLargestTemplate
};

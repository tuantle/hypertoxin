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
 *
 * @flow
 *
 */

'use strict'; //eslint-disable-line

import { PixelRatio } from 'react-native';

/* base font size value */
const BASE_FONT_SCALING_UNIT = PixelRatio.get() >= 3 ? 8 : 6;

/* changing font size according to ratio */
const FONT_SCALING_UNIT = BASE_FONT_SCALING_UNIT * PixelRatio.get();

const FONT_SIZE_SMALLEST = FONT_SCALING_UNIT * 0.75;
const FONT_SIZE_SMALLER = FONT_SCALING_UNIT * 0.875;
const FONT_SIZE_SMALL = FONT_SCALING_UNIT * 1;
const FONT_SIZE_NORMAL = FONT_SCALING_UNIT * 1.125;
const FONT_SIZE_LARGE = FONT_SCALING_UNIT * 1.35;
const FONT_SIZE_LARGER = FONT_SCALING_UNIT * 1.65;
const FONT_SIZE_LARGEST = FONT_SCALING_UNIT * 2.25;

const FONT_WEIGHT_THIN = `200`;
const FONT_WEIGHT_NORMAL = `400`;
const FONT_WEIGHT_BOLD = `700`;

const thinFontSmallestTemplate = {
    flexWrap: `wrap`,
    fontSize: FONT_SIZE_SMALLEST,
    fontWeight: FONT_WEIGHT_THIN,
    marginVertical: 3,
    paddingVertical: 3
};

const normalFontSmallestTemplate = {
    flexWrap: `wrap`,
    fontSize: FONT_SIZE_SMALLEST,
    fontWeight: FONT_WEIGHT_NORMAL,
    marginVertical: 3,
    paddingVertical: 3,
    backgroundColor: `transparent`
};

const boldFontSmallestTemplate = {
    flexWrap: `wrap`,
    fontSize: FONT_SIZE_SMALLEST,
    fontWeight: FONT_WEIGHT_BOLD,
    marginVertical: 3,
    paddingVertical: 3,
    backgroundColor: `transparent`
};

const italicFontSmallestTemplate = {
    flexWrap: `wrap`,
    fontSize: FONT_SIZE_SMALLEST,
    fontWeight: FONT_WEIGHT_NORMAL,
    fontStyle: `italic`,
    marginVertical: 3,
    paddingVertical: 3,
    backgroundColor: `transparent`
};

const thinFontSmallerTemplate = {
    flexWrap: `wrap`,
    fontSize: FONT_SIZE_SMALLER,
    fontWeight: FONT_WEIGHT_THIN,
    marginVertical: 3,
    paddingVertical: 3,
    backgroundColor: `transparent`
};

const normalFontSmallerTemplate = {
    flexWrap: `wrap`,
    fontSize: FONT_SIZE_SMALLER,
    fontWeight: FONT_WEIGHT_NORMAL,
    marginVertical: 3,
    paddingVertical: 3,
    backgroundColor: `transparent`
};

const boldFontSmallerTemplate = {
    flexWrap: `wrap`,
    fontSize: FONT_SIZE_SMALLER,
    fontWeight: FONT_WEIGHT_BOLD,
    marginVertical: 3,
    paddingVertical: 3,
    backgroundColor: `transparent`
};

const italicFontSmallerTemplate = {
    flexWrap: `wrap`,
    fontSize: FONT_SIZE_SMALLER,
    fontWeight: FONT_WEIGHT_NORMAL,
    fontStyle: `italic`,
    marginVertical: 3,
    paddingVertical: 3,
    backgroundColor: `transparent`
};

const thinFontSmallTemplate = {
    flexWrap: `wrap`,
    fontSize: FONT_SIZE_SMALL,
    fontWeight: FONT_WEIGHT_THIN,
    marginVertical: 3,
    paddingVertical: 3,
    backgroundColor: `transparent`
};

const normalFontSmallTemplate = {
    flexWrap: `wrap`,
    fontSize: FONT_SIZE_SMALL,
    fontWeight: FONT_WEIGHT_NORMAL,
    marginVertical: 3,
    paddingVertical: 3,
    backgroundColor: `transparent`
};

const boldFontSmallTemplate = {
    flexWrap: `wrap`,
    fontSize: FONT_SIZE_SMALL,
    fontWeight: FONT_WEIGHT_BOLD,
    marginVertical: 3,
    paddingVertical: 3,
    backgroundColor: `transparent`
};

const italicFontSmallTemplate = {
    flexWrap: `wrap`,
    fontSize: FONT_SIZE_SMALL,
    fontWeight: FONT_WEIGHT_NORMAL,
    fontStyle: `italic`,
    marginVertical: 3,
    paddingVertical: 3,
    backgroundColor: `transparent`
};

const thinFontTemplate = {
    flexWrap: `wrap`,
    fontSize: FONT_SIZE_NORMAL,
    fontWeight: FONT_WEIGHT_THIN,
    marginVertical: 3,
    paddingVertical: 3,
    backgroundColor: `transparent`
};

const normalFontTemplate = {
    flexWrap: `wrap`,
    fontSize: FONT_SIZE_NORMAL,
    fontWeight: FONT_WEIGHT_NORMAL,
    marginVertical: 3,
    paddingVertical: 3,
    backgroundColor: `transparent`
};

const boldFontTemplate = {
    flexWrap: `wrap`,
    fontSize: FONT_SIZE_NORMAL,
    fontWeight: FONT_WEIGHT_BOLD,
    marginVertical: 3,
    paddingVertical: 3,
    backgroundColor: `transparent`
};

const italicFontTemplate = {
    flexWrap: `wrap`,
    fontSize: FONT_SIZE_NORMAL,
    fontWeight: FONT_WEIGHT_NORMAL,
    fontStyle: `italic`,
    marginVertical: 3,
    paddingVertical: 3,
    backgroundColor: `transparent`
};

const thinFontLargeTemplate = {
    flexWrap: `wrap`,
    fontSize: FONT_SIZE_LARGE,
    fontWeight: FONT_WEIGHT_THIN,
    marginVertical: 3,
    paddingVertical: 3,
    backgroundColor: `transparent`
};

const normalFontLargeTemplate = {
    flexWrap: `wrap`,
    fontSize: FONT_SIZE_LARGE,
    fontWeight: FONT_WEIGHT_NORMAL,
    marginVertical: 3,
    paddingVertical: 3,
    backgroundColor: `transparent`
};

const boldFontLargeTemplate = {
    flexWrap: `wrap`,
    fontSize: FONT_SIZE_LARGE,
    fontWeight: FONT_WEIGHT_BOLD,
    marginVertical: 3,
    paddingVertical: 3,
    backgroundColor: `transparent`
};

const italicFontLargeTemplate = {
    flexWrap: `wrap`,
    fontSize: FONT_SIZE_LARGE,
    fontWeight: FONT_WEIGHT_NORMAL,
    fontStyle: `italic`,
    marginVertical: 3,
    paddingVertical: 3,
    backgroundColor: `transparent`
};

const thinFontLargerTemplate = {
    flexWrap: `wrap`,
    fontSize: FONT_SIZE_LARGER,
    fontWeight: FONT_WEIGHT_THIN,
    marginVertical: 3,
    paddingVertical: 3,
    backgroundColor: `transparent`
};

const normalFontLargerTemplate = {
    flexWrap: `wrap`,
    fontSize: FONT_SIZE_LARGER,
    fontWeight: FONT_WEIGHT_NORMAL,
    marginVertical: 3,
    paddingVertical: 3,
    backgroundColor: `transparent`
};

const boldFontLargerTemplate = {
    flexWrap: `wrap`,
    fontSize: FONT_SIZE_LARGER,
    fontWeight: FONT_WEIGHT_BOLD,
    marginVertical: 3,
    paddingVertical: 3,
    backgroundColor: `transparent`
};

const italicFontLargerTemplate = {
    flexWrap: `wrap`,
    fontSize: FONT_SIZE_LARGER,
    fontWeight: FONT_WEIGHT_NORMAL,
    fontStyle: `italic`,
    marginVertical: 3,
    paddingVertical: 3,
    backgroundColor: `transparent`
};

const thinFontLargestTemplate = {
    flexWrap: `wrap`,
    fontSize: FONT_SIZE_LARGEST,
    fontWeight: FONT_WEIGHT_THIN,
    marginVertical: 3,
    paddingVertical: 3,
    backgroundColor: `transparent`
};

const normalFontLargestTemplate = {
    flexWrap: `wrap`,
    fontSize: FONT_SIZE_LARGEST,
    fontWeight: FONT_WEIGHT_NORMAL,
    marginVertical: 3,
    paddingVertical: 3,
    backgroundColor: `transparent`
};

const boldFontLargestTemplate = {
    flexWrap: `wrap`,
    fontSize: FONT_SIZE_LARGEST,
    fontWeight: FONT_WEIGHT_BOLD,
    marginVertical: 3,
    paddingVertical: 3,
    backgroundColor: `transparent`
};

const italicFontLargestTemplate = {
    flexWrap: `wrap`,
    fontSize: FONT_SIZE_LARGEST,
    fontWeight: FONT_WEIGHT_NORMAL,
    fontStyle: `italic`,
    marginVertical: 3,
    paddingVertical: 3,
    backgroundColor: `transparent`
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

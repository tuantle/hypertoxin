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
 * @description - Font template generator (default to San Francisco for iOS, Roboto for android).
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 *
 * @flow
 *
 */

'use strict'; //eslint-disable-line

import ReactNative from 'react-native';

const {
    PixelRatio
} = ReactNative;

const DEVICE_PIXEL_RATIO = PixelRatio.get();
const DEFAULT_FONT_FAMILY = `System`;
const DEFAULT_FONT_WEIGHTS = [ 200, 300, 800 ];
const DEFAULT_FONT_SCALINGS = [ 1.05, 1.25, 1.5, 1.75, 2.15, 2.85, 3.75 ];

export default function createFontTemplate (option = {
    fontFamily: DEFAULT_FONT_FAMILY,
    fontWeights: DEFAULT_FONT_WEIGHTS,
    fontScalings: DEFAULT_FONT_SCALINGS
}) {
    let {
        fontFamily,
        fontWeights,
        fontScalings
    } = option;
    let baseFontScalingUnit;

    fontFamily = typeof fontFamily === `string` ? fontFamily : DEFAULT_FONT_FAMILY;
    fontWeights = Array.isArray(fontWeights) && fontWeights.length === 3 ? fontWeights : DEFAULT_FONT_WEIGHTS;
    fontScalings = Array.isArray(fontScalings) && fontScalings.length === 7 ? fontScalings : DEFAULT_FONT_SCALINGS;

    if (DEVICE_PIXEL_RATIO === 2) {
        baseFontScalingUnit = 8.25 * PixelRatio.getFontScale();
    } else if (DEVICE_PIXEL_RATIO === 3) {
        baseFontScalingUnit = 9 * PixelRatio.getFontScale();
    } else {
        baseFontScalingUnit = 6;
    }

    const [
        fontWeightThin,
        fontWeightNormal,
        fontWeightBold
    ] = fontWeights.map((fontWeight) => `${fontWeight}`);
    const [
        fontSizeSmallest,
        fontSizeSmaller,
        fontSizeSmall,
        fontSizeNormal,
        fontSizeLarge,
        fontSizeLarger,
        fontSizeLargest
    ] = fontScalings.map((fontScaling) => baseFontScalingUnit * fontScaling);

    return {
        thinSmallest: {
            flexWrap: `wrap`,
            fontFamily,
            fontSize: fontSizeSmallest,
            fontWeight: fontWeightThin
        },
        normalSmallest: {
            flexWrap: `wrap`,
            fontFamily,
            fontSize: fontSizeSmallest,
            fontWeight: fontWeightNormal
        },
        boldSmallest: {
            flexWrap: `wrap`,
            fontFamily,
            fontSize: fontSizeSmallest,
            fontWeight: fontWeightBold
        },
        italicSmallest: {
            flexWrap: `wrap`,
            fontFamily,
            fontSize: fontSizeSmallest,
            fontWeight: fontWeightNormal,
            fontStyle: `italic`
        },

        thinSmaller: {
            flexWrap: `wrap`,
            fontFamily,
            fontSize: fontSizeSmaller,
            fontWeight: fontWeightThin
        },
        normalSmaller: {
            flexWrap: `wrap`,
            fontFamily,
            fontSize: fontSizeSmaller,
            fontWeight: fontWeightNormal
        },
        boldSmaller: {
            flexWrap: `wrap`,
            fontFamily,
            fontSize: fontSizeSmaller,
            fontWeight: fontWeightBold
        },
        italicSmaller: {
            flexWrap: `wrap`,
            fontFamily,
            fontSize: fontSizeSmaller,
            fontWeight: fontWeightNormal,
            fontStyle: `italic`
        },

        thinSmall: {
            flexWrap: `wrap`,
            fontFamily,
            fontSize: fontSizeSmall,
            fontWeight: fontWeightThin
        },
        normalSmall: {
            flexWrap: `wrap`,
            fontFamily,
            fontSize: fontSizeSmall,
            fontWeight: fontWeightNormal
        },
        boldSmall: {
            flexWrap: `wrap`,
            fontFamily,
            fontSize: fontSizeSmall,
            fontWeight: fontWeightBold
        },
        italicSmall: {
            flexWrap: `wrap`,
            fontFamily,
            fontSize: fontSizeSmall,
            fontWeight: fontWeightNormal,
            fontStyle: `italic`
        },

        thin: {
            flexWrap: `wrap`,
            fontFamily,
            fontSize: fontSizeNormal,
            fontWeight: fontWeightThin
        },
        normal: {
            flexWrap: `wrap`,
            fontFamily,
            fontSize: fontSizeNormal,
            fontWeight: fontWeightNormal
        },
        bold: {
            flexWrap: `wrap`,
            fontFamily,
            fontSize: fontSizeNormal,
            fontWeight: fontWeightBold
        },
        italic: {
            flexWrap: `wrap`,
            fontFamily,
            fontSize: fontSizeNormal,
            fontWeight: fontWeightNormal,
            fontStyle: `italic`
        },

        thinLarge: {
            flexWrap: `wrap`,
            fontFamily,
            fontSize: fontSizeLarge,
            fontWeight: fontWeightThin
        },
        normalLarge: {
            flexWrap: `wrap`,
            fontFamily,
            fontSize: fontSizeLarge,
            fontWeight: fontWeightNormal
        },
        boldLarge: {
            flexWrap: `wrap`,
            fontFamily,
            fontSize: fontSizeLarge,
            fontWeight: fontWeightBold
        },
        italicLarge: {
            flexWrap: `wrap`,
            fontFamily,
            fontSize: fontSizeLarge,
            fontWeight: fontWeightNormal,
            fontStyle: `italic`
        },

        thinLarger: {
            flexWrap: `wrap`,
            fontFamily,
            fontSize: fontSizeLarger,
            fontWeight: fontWeightThin
        },
        normalLarger: {
            flexWrap: `wrap`,
            fontFamily,
            fontSize: fontSizeLarger,
            fontWeight: fontWeightNormal
        },
        boldLarger: {
            flexWrap: `wrap`,
            fontFamily,
            fontSize: fontSizeLarger,
            fontWeight: fontWeightBold
        },
        italicLarger: {
            flexWrap: `wrap`,
            fontFamily,
            fontSize: fontSizeLarger,
            fontWeight: fontWeightNormal,
            fontStyle: `italic`
        },

        thinLargest: {
            flexWrap: `wrap`,
            fontFamily,
            fontSize: fontSizeLargest,
            fontWeight: fontWeightThin
        },
        normalLargest: {
            flexWrap: `wrap`,
            fontFamily,
            fontSize: fontSizeLargest,
            fontWeight: fontWeightNormal
        },
        boldLargest: {
            flexWrap: `wrap`,
            fontFamily,
            fontSize: fontSizeLargest,
            fontWeight: fontWeightBold
        },
        italicLargest: {
            flexWrap: `wrap`,
            fontFamily,
            fontSize: fontSizeLargest,
            fontWeight: fontWeightNormal,
            fontStyle: `italic`
        }
    };
}

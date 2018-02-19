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
 * @description - Text theme.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 * @flow
 *
 */
'use strict'; // eslint-disable-line

import fontStyleTemplate from './style-templates/font-style-template';

import colorTheme from './color-theme.js';

export default {
    headline: {
        shade: `light`,
        size: `normal`,
        // weight: `normal`,
        alignment: `center`,
        decoration: `none`
    },
    title: {
        shade: `light`,
        size: `normal`,
        // weight: `bold`,
        alignment: `center`,
        decoration: `none`
    },
    subtitle: {
        shade: `light`,
        size: `normal`,
        // weight: `normal`,
        alignment: `center`,
        decoration: `none`
    },
    info: {
        shade: `light`,
        size: `normal`,
        // weight: `normal`,
        alignment: `left`,
        decoration: `none`
    },
    caption: {
        shade: `light`,
        size: `normal`,
        // weight: `normal`,
        alignment: `left`,
        decoration: `none`
    },
    font: {
        headline: {
            small: fontStyleTemplate.normalLarge,
            normal: fontStyleTemplate.normalLarger,
            large: fontStyleTemplate.normalLargest
        },
        title: {
            small: fontStyleTemplate.bold,
            normal: fontStyleTemplate.boldLarge,
            large: fontStyleTemplate.boldLarger
        },
        subtitle: {
            small: fontStyleTemplate.normal,
            normal: fontStyleTemplate.normalLarge,
            large: fontStyleTemplate.normalLarger
        },
        info: {
            small: fontStyleTemplate.normalSmall,
            normal: fontStyleTemplate.normal,
            large: fontStyleTemplate.normalLarge
        },
        caption: {
            small: fontStyleTemplate.italicSmallest,
            normal: fontStyleTemplate.italicSmaller,
            large: fontStyleTemplate.italicSmall
        }
    },
    color: {
        dark: colorTheme.dark.default,
        light: colorTheme.light.default
    }
};

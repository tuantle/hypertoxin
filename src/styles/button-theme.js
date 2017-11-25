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
 * @description - Button theme.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 * @flow
 *
 */
'use strict'; // eslint-disable-line

import fontStyleTemplate from './templates/font-style-template';

import toxinPalette from './palettes/toxin-palette';

import colorTheme from './color-theme.js';

export default {
    flat: {
        shade: `light`,
        overlay: `opaque`,
        corner: `square`,
        color: `primary`,
        rippled: true,
        uppercasedLabel: true
    },
    raised: {
        shade: `light`,
        overlay: `opaque`,
        corner: `square`,
        color: `primary`,
        rippled: true,
        uppercasedLabel: true
    },
    font: {
        label: fontStyleTemplate.bold
    },
    corner: {
        square: 4,
        round25: 9,
        round50: 18
    },
    size: {
        flat: 36,
        raised: 36
    },
    color: {
        flat: {
            opacity: `dd`,
            accent: {
                dark: colorTheme.dark.accent,
                light: colorTheme.light.accent
            },
            primary: {
                dark: colorTheme.dark.primary,
                light: colorTheme.light.primary
            },
            secondary: {
                dark: colorTheme.dark.secondary,
                light: colorTheme.light.secondary
            },
            disabled: {
                dark: colorTheme.dark.disabled,
                light: colorTheme.light.disabled
            },
            label: {
                dark: colorTheme.light.default,
                light: colorTheme.dark.default
            },
            ripple: {
                dark: toxinPalette.white,
                light: toxinPalette.lightGrey
            }
        },
        raised: {
            opacity: `dd`,
            accent: {
                dark: colorTheme.dark.accent,
                light: colorTheme.light.accent
            },
            primary: {
                dark: colorTheme.dark.primary,
                light: colorTheme.light.primary
            },
            secondary: {
                dark: colorTheme.dark.secondary,
                light: colorTheme.light.secondary
            },
            disabled: {
                dark: colorTheme.dark.disabled,
                light: colorTheme.light.disabled
            },
            label: {
                dark: colorTheme.light.default,
                light: colorTheme.dark.default
            },
            ripple: {
                dark: toxinPalette.white,
                light: toxinPalette.lightGrey
            }
        }
    }
};

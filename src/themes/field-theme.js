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
 * @description - Field theme.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 * @flow
 *
 */
'use strict'; // eslint-disable-line

import fontStyleTemplate from './style-templates/font-style-template';

import toxinPalette from './palettes/toxin-palette';

import colorTheme from './color-theme.js';

export default {
    search: {
        shade: `light`,
        overlay: `opaque`,
        corner: `square`,
        dropShadowed: true
    },
    text: {
        shade: `light`,
        overlay: `opaque`,
        underlined: true,
        uppercasedLabel: false
    },
    corner: {
        search: {
            square: 4,
            round25: 13,
            round50: 26
        }
    },
    size: {
        search: {
            input: 42
        },
        text: {
            input: 36,
            underline: {
                focused: 3,
                blurred: 1
            }
        }
    },
    font: {
        search: {
            input: fontStyleTemplate.normalLarge,
            hint: fontStyleTemplate.normalLarge
        },
        text: {
            input: fontStyleTemplate.normalLarge,
            hint: fontStyleTemplate.normalLarger,
            status: fontStyleTemplate.italicSmall,
            helper: fontStyleTemplate.normalSmall,
            label: {
                focused: fontStyleTemplate.normalSmall,
                blurred: fontStyleTemplate.normalLarge
            }
        }
    },
    color: {
        search: {
            opacity: colorTheme.opacity,
            box: {
                dark: toxinPalette.deepGrey,
                light: toxinPalette.white
            },
            input: {
                dark: toxinPalette.white,
                light: toxinPalette.deepGrey
            },
            hint: toxinPalette.grey
        },
        text: {
            opacity: colorTheme.opacity,
            focused: {
                dark: toxinPalette.orange,
                light: toxinPalette.orange
            },
            blurred: {
                dark: toxinPalette.grey,
                light: toxinPalette.grey
            },
            disabled: {
                dark: colorTheme.dark.disabled,
                light: colorTheme.light.disabled
            },
            box: {
                dark: toxinPalette.charcoal,
                light: toxinPalette.silver
            },
            input: {
                dark: toxinPalette.white,
                light: toxinPalette.deepGrey
            },
            helper: {
                dark: toxinPalette.grey,
                light: toxinPalette.grey
            },
            hint: toxinPalette.lightGrey,
            status: toxinPalette.red
        }
    }
};

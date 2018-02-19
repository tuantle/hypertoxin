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
 * @description - View theme.
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
    screen: {
        shade: `light`
    },
    header: {
        shade: `light`,
        overlay: `opaque`,
        oversized: false,
        dropShadowed: true,
        offcenteredLabel: false,
        uppercasedLabel: false
    },
    body: {
        shade: `light`,
        overlay: `opaque`
    },
    card: {
        shade: `light`,
        overlay: `opaque`
    },
    item: {
        shade: `light`,
        overlay: `opaque`,
        rippled: true
    },
    layout: {
        shade: `light`,
        overlay: `opaque`
    },
    size: {
        header: {
            normal: 48,
            oversize: 148,
            status: 24
        },
        item: 48
    },
    font: {
        header: {
            label: fontStyleTemplate.boldLarge
        }
    },
    color: {
        screen: {
            opacity: colorTheme.opacity,
            dark: colorTheme.light.default,
            light: colorTheme.dark.default
        },
        header: {
            opacity: colorTheme.opacity,
            navigation: {
                dark: colorTheme.dark.primary,
                light: colorTheme.light.primary
            },
            status: {
                dark: colorTheme.dark.primary,
                light: colorTheme.light.primary
            },
            label: {
                dark: colorTheme.dark.default,
                light: colorTheme.light.default
            }
        },
        body: {
            opacity: colorTheme.opacity,
            dark: colorTheme.light.default,
            light: colorTheme.dark.default
        },
        card: {
            opacity: colorTheme.opacity,
            overlay: toxinPalette.black,
            dark: colorTheme.light.default,
            light: colorTheme.dark.default
        },
        item: {
            opacity: colorTheme.opacity,
            dark: colorTheme.light.default,
            light: colorTheme.dark.default,
            ripple: {
                dark: toxinPalette.lightGrey,
                light: toxinPalette.white
            }
        },
        layout: {
            opacity: colorTheme.opacity,
            dark: colorTheme.light.default,
            light: colorTheme.dark.default
        }
    }
};

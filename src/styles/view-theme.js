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

import fontStyleTemplate from './templates/font-style-template';

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
        dropShadowed: true
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
        overlay: `opaque`
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
        }
    },
    font: {
        header: {
            label: fontStyleTemplate.boldLarge
        }
    },
    color: {
        screen: {
            opacity: `dd`,
            dark: colorTheme.light.default,
            light: colorTheme.dark.default
        },
        header: {
            opacity: `dd`,
            navigation: {
                dark: toxinPalette.blue,
                light: toxinPalette.lightBlue
            },
            status: {
                dark: toxinPalette.blue,
                light: toxinPalette.lightBlue
            },
            label: {
                dark: toxinPalette.white,
                light: toxinPalette.white
            }
        },
        body: {
            opacity: `dd`,
            dark: colorTheme.light.default,
            light: colorTheme.dark.default
        },
        card: {
            opacity: `dd`,
            overlay: `#000000`,
            dark: colorTheme.light.default,
            light: colorTheme.dark.default
        },
        item: {
            opacity: `dd`,
            dark: colorTheme.light.default,
            light: colorTheme.dark.default
        },
        layout: {
            opacity: `dd`,
            dark: colorTheme.light.default,
            light: colorTheme.dark.default
        }
    }
};

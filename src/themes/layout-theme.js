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
 * @description - Default layout theme.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 * @flow
 *
 */
'use strict'; // eslint-disable-line

import ColorTheme from './color-theme';

export default {
    row: {
        shade: `light`,
        overlay: `transparent`,
        corner: `sharp`,
        margin: 0,
        color: `default`,
        dropShadowed: false,
        initialAnimation: `none`
    },
    column: {
        shade: `light`,
        overlay: `transparent`,
        corner: `sharp`,
        margin: 0,
        color: `default`,
        dropShadowed: false,
        initialAnimation: `none`
    },
    corner: {
        row: {
            circular: 0.5,
            round: 0.1,
            sharp: 0
        },
        column: {
            circular: 0.5,
            round: 0.1,
            sharp: 0
        }
    },
    margin: {
        row: {
            narrow: 3,
            wide: 6
        },
        column: {
            narrow: 3,
            wide: 6
        }
    },
    color: {
        row: {
            opacity: ColorTheme.opacity,
            accent: {
                dark: ColorTheme.light.accent,
                light: ColorTheme.dark.accent
            },
            primary: {
                dark: ColorTheme.light.primary,
                light: ColorTheme.dark.primary
            },
            secondary: {
                dark: ColorTheme.light.secondary,
                light: ColorTheme.dark.secondary
            },
            default: {
                dark: ColorTheme.light.default,
                light: ColorTheme.dark.default
            }
        },
        column: {
            opacity: ColorTheme.opacity,
            accent: {
                dark: ColorTheme.light.accent,
                light: ColorTheme.dark.accent
            },
            primary: {
                dark: ColorTheme.light.primary,
                light: ColorTheme.dark.primary
            },
            secondary: {
                dark: ColorTheme.light.secondary,
                light: ColorTheme.dark.secondary
            },
            default: {
                dark: ColorTheme.light.default,
                light: ColorTheme.dark.default
            }
        }
    },
    animation: {
        row: {
            none: {
                refName: ``,
                transitions: []
            }
        },
        column: {
            none: {
                refName: ``,
                transitions: []
            }
        }
    }
};

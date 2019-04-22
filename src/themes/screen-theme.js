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
 * @description - Default screen theme.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 * @flow
 *
 */
'use strict'; // eslint-disable-line

import FontTheme from '../fonts/san-francisco-font';

import ColorTheme from './color-theme';

export default {
    body: {
        shade: `light`
    },
    header: {
        shade: `light`,
        overlay: `opaque`,
        size: `normal`,
        dropShadowed: true,
        initialAnimation: `none`
    },
    size: {
        header: {
            status: 30,
            navigation: {
                small: 48,
                normal: 54,
                large: 72
            },
            media: 72
        }
    },
    font: {
        header: {
            label: {
                small: FontTheme.boldSmall,
                normal: FontTheme.bold,
                large: FontTheme.boldLarge
            }
        }
    },
    color: {
        body: {
            opacity: ColorTheme.opacity,
            dark: ColorTheme.light.default,
            light: ColorTheme.dark.default
        },
        header: {
            opacity: ColorTheme.opacity,
            status: {
                dark: ColorTheme.dark.primary,
                light: ColorTheme.light.primary
            },
            navigation: {
                dark: ColorTheme.dark.primary,
                light: ColorTheme.light.primary
            },
            media: {
                dark: ColorTheme.dark.primary,
                light: ColorTheme.light.primary
            },
            label: {
                dark: ColorTheme.light.default,
                light: ColorTheme.dark.default
            }
        }
    },
    animation: {
        header: {
            none: {
                refName: ``,
                transitions: []
            }
        },
        body: {
            none: {
                refName: ``,
                transitions: []
            }
        }
    }
};

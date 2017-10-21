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
 * @description - Image theme.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 * @flow
 *
 */
'use strict'; // eslint-disable-line

import toxinPalette from './palettes/toxin-palette';

import colorTheme from './color-theme.js';

export default {
    avatar: {
        size: `normal`,
        dropShadowed: true,
        frame: `thin`,
        frameColor: toxinPalette.lightGrey
    },
    icon: {
        shade: `dark`,
        size: `normal`,
        dropShadowed: true,
        color: `primary`
    },
    wallpaper: {
        resizeMode: `stretch`
    },
    frame: {
        none: 0,
        thin: 1,
        normal: 2,
        think: 4
    },
    size: {
        avatar: {
            small: 36,
            normal: 48,
            large: 56
        },
        icon: {
            small: 18,
            normal: 24,
            large: 28
        }
    },
    color: {
        icon: {
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
            }
        }
    }
};

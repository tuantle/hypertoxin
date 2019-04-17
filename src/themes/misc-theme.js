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
 * @description - Default misc theme.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 * @flow
 *
 */
'use strict'; // eslint-disable-line

import FontTheme from '../fonts/san-francisco-font';

import ColorTheme from './color-theme';

const MiscTheme = {
    divider: {
        horizontal: {
            shade: `light`,
            margin: `narrow`,
            color: `themed`
        },
        vertical: {
            shade: `light`,
            margin: `narrow`,
            color: `themed`
        }
    },
    badge: {
        shade: `light`
    },
    size: {
        divider: {
            horizontal: 1,
            vertical: 1
        },
        badge: {
            small: 21,
            normal: 24,
            large: 27
        }
    },
    margin: {
        divider: {
            horizontal: {
                narrow: {
                    vertical: 9
                },
                wide: {
                    vertical: 18
                }
            },
            vertical: {
                narrow: {
                    horizontal: 3
                },
                wide: {
                    horizontal: 6
                }
            }
        }
    },
    font: {
        badge: {
            label: {
                small: FontTheme.thinSmallest,
                normal: FontTheme.normalSmallest,
                large: FontTheme.normalSmaller
            }
        }
    },
    color: {
        divider: {
            horizontal: {
                dark: ColorTheme.palette.deepGrey,
                light: ColorTheme.palette.silver
            },
            vertical: {
                dark: ColorTheme.palette.deepGrey,
                light: ColorTheme.palette.silver
            }
        },
        badge: {
            dark: ColorTheme.palette.red,
            light: ColorTheme.palette.red
        }
    }
};

export default MiscTheme;

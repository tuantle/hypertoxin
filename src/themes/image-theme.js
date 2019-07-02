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
 * @description - Default image theme.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 * @flow
 *
 */
'use strict'; // eslint-disable-line

import ColorTheme from './color-theme';

export default {
    avatar: {
        shade: `light`,
        overlay: `opaque`,
        size: `normal`,
        margin: `narrow`,
        color: `default`,
        dropShadowed: true,
        initialAnimation: `none`
    },
    icon: {
        shade: `light`,
        size: `normal`,
        margin: `narrow`,
        dropShadowed: true,
        color: `primary`,
        initialAnimation: `none`
    },
    cover: {
        shade: `light`,
        corner: `sharp`,
        margin: `narrow`,
        dropShadowed: false
    },
    corner: {
        cover: {
            round: 6,
            sharp: 0
        }
    },
    size: {
        avatar: {
            small: 24,
            normal: 27,
            large: 36
        },
        icon: {
            small: 18,
            normal: 24,
            large: 27
        }
    },
    margin: {
        avatar: {
            none: 0,
            narrow: 0,
            wide: 3
        },
        icon: {
            none: 0,
            narrow: 0,
            wide: 3
        },
        cover: {
            none: 0,
            narrow: 0,
            wide: 3
        }
    },
    color: {
        avatar: {
            accent: {
                dark: ColorTheme.dark.accent,
                light: ColorTheme.light.accent
            },
            primary: {
                dark: ColorTheme.dark.primary,
                light: ColorTheme.light.primary
            },
            secondary: {
                dark: ColorTheme.dark.secondary,
                light: ColorTheme.light.secondary
            },
            default: {
                dark: ColorTheme.palette.white,
                light: ColorTheme.palette.white
            }
        },
        icon: {
            accent: {
                dark: ColorTheme.dark.accent,
                light: ColorTheme.light.accent
            },
            primary: {
                dark: ColorTheme.dark.primary,
                light: ColorTheme.light.primary
            },
            secondary: {
                dark: ColorTheme.dark.secondary,
                light: ColorTheme.light.secondary
            },
            default: {
                dark: ColorTheme.dark.default,
                light: ColorTheme.light.default
            },
            disabled: {
                dark: ColorTheme.dark.disabled,
                light: ColorTheme.light.disabled
            }
        }
    },
    animation: {
        avatar: {
            none: {
                refName: ``,
                transitions: []
            }
        },
        icon: {
            none: {
                refName: ``,
                transitions: []
            }
        }
    }
};

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
 * @description - Default text theme.
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
    headline: {
        shade: `light`,
        size: `normal`,
        color: `default`,
        initialAnimation: `none`
    },
    title: {
        shade: `light`,
        size: `normal`,
        color: `default`,
        initialAnimation: `none`
    },
    subtitle: {
        shade: `light`,
        size: `normal`,
        color: `default`,
        initialAnimation: `none`
    },
    info: {
        shade: `light`,
        size: `normal`,
        color: `default`,
        initialAnimation: `none`
    },
    caption: {
        shade: `light`,
        size: `normal`,
        color: `default`,
        initialAnimation: `none`
    },
    font: {
        headline: {
            small: FontTheme.normalLarge,
            normal: FontTheme.normalLarger,
            large: FontTheme.normalLargest
        },
        title: {
            small: FontTheme.boldLarge,
            normal: FontTheme.boldLarger,
            large: FontTheme.boldLargest
        },
        subtitle: {
            small: FontTheme.normalLarge,
            normal: FontTheme.normalLarger,
            large: FontTheme.normalLargest
        },
        info: {
            small: FontTheme.normalSmaller,
            normal: FontTheme.normalSmall,
            large: FontTheme.normal
        },
        caption: {
            small: FontTheme.italicSmallest,
            normal: FontTheme.italicSmaller,
            large: FontTheme.italicSmall
        }
    },
    color: {
        headline: {
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
            }
        },
        title: {
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
            }
        },
        subtitle: {
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
            }
        },
        info: {
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
            }
        },
        caption: {
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
            }
        }
    },
    animation: {
        headline: {
            none: {
                refName: ``,
                transitions: []
            }
        },
        title: {
            none: {
                refName: ``,
                transitions: []
            }
        },
        subtitle: {
            none: {
                refName: ``,
                transitions: []
            }
        },
        info: {
            none: {
                refName: ``,
                transitions: []
            }
        },
        caption: {
            none: {
                refName: ``,
                transitions: []
            }
        }
    }
};

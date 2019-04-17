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
 * @description - Default field theme.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 * @flow
 *
 */
'use strict'; // eslint-disable-line

import FontTheme from '../fonts/san-francisco-font';

import ColorTheme from './color-theme';

const FieldTheme = {
    search: {
        shade: `light`,
        overlay: `opaque`,
        corner: `sharp`,
        size: `normal`,
        margin: `narrow`,
        dropShadowed: true,
        initialAnimation: `none`
    },
    text: {
        shade: `light`,
        overlay: `opaque`,
        corner: `round`,
        size: `normal`,
        margin: `narrow`,
        underlined: true,
        initialAnimation: `none`
    },
    corner: {
        search: {
            circular: 0.5,
            round: 0.1,
            sharp: 0
        },
        text: {
            circular: {
                topLeft: 0.5,
                topRight: 0.5
            },
            round: {
                topLeft: 0.1,
                topRight: 0.1
            },
            sharp: 0
        }
    },
    size: {
        search: {
            input: {
                small: 27,
                normal: 36,
                large: 48
            }
        },
        text: {
            input: {
                small: 27,
                normal: 36,
                large: 48
            },
            underline: {
                focused: {
                    small: 1,
                    normal: 3,
                    large: 3
                },
                blurred: {
                    small: 1,
                    normal: 3,
                    large: 3
                }
            }
        }
    },
    margin: {
        search: {
            narrow: 3,
            wide: 6
        },
        text: {
            narrow: 3,
            wide: 6
        }
    },
    font: {
        search: {
            input: {
                small: FontTheme.normalSmall,
                normal: FontTheme.normal,
                large: FontTheme.normalLarge
            }
        },
        text: {
            input: {
                small: FontTheme.normalSmall,
                normal: FontTheme.normal,
                large: FontTheme.normalLarge
            },
            label: {
                focused: {
                    small: FontTheme.normalSmallest,
                    normal: FontTheme.normalSmaller,
                    large: FontTheme.normalSmall
                },
                blurred: {
                    small: FontTheme.normalSmall,
                    normal: FontTheme.normal,
                    large: FontTheme.normalLarge
                }
            },
            status: FontTheme.italicSmaller,
            helper: FontTheme.normalSmaller
        }
    },
    color: {
        search: {
            opacity: ColorTheme.opacity,
            focused: {
                dark: ColorTheme.palette.orange,
                light: ColorTheme.palette.orange
            },
            blurred: {
                dark: ColorTheme.palette.deepGrey,
                light: ColorTheme.palette.white
            },
            box: {
                dark: ColorTheme.palette.deepGrey,
                light: ColorTheme.palette.white
            },
            input: {
                dark: ColorTheme.palette.white,
                light: ColorTheme.palette.deepGrey
            },
            hint: ColorTheme.palette.grey
        },
        text: {
            opacity: ColorTheme.opacity,
            focused: {
                dark: ColorTheme.palette.orange,
                light: ColorTheme.palette.orange
            },
            blurred: {
                dark: ColorTheme.palette.lightGrey,
                light: ColorTheme.palette.lightGrey
            },
            disabled: {
                dark: ColorTheme.dark.disabled,
                light: ColorTheme.light.disabled
            },
            box: {
                dark: ColorTheme.palette.charcoal,
                light: ColorTheme.palette.silver
            },
            input: {
                dark: ColorTheme.palette.white,
                light: ColorTheme.palette.deepGrey
            },
            helper: {
                dark: ColorTheme.palette.grey,
                light: ColorTheme.palette.grey
            },
            hint: ColorTheme.palette.lightGrey,
            status: ColorTheme.palette.red
        }
    },
    animation: {
        search: {
            none: {
                refName: ``,
                transitions: []
            }
        },
        text: {
            none: {
                refName: ``,
                transitions: []
            }
        }
    }
};

export default FieldTheme;

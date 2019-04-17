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
 * @description - Default button theme.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 * @flow
 *
 */
'use strict'; // eslint-disable-line

import FontTheme from '../fonts/san-francisco-font';

import ColorTheme from './color-theme';

const ButtonTheme = {
    flat: {
        shade: `light`,
        overlay: `opaque`,
        corner: `sharp`,
        color: `primary`,
        size: `normal`,
        margin: `narrow`,
        rippled: true,
        initialAnimation: `none`
    },
    raised: {
        shade: `light`,
        overlay: `opaque`,
        corner: `sharp`,
        color: `primary`,
        size: `normal`,
        margin: `narrow`,
        rippled: true,
        initialAnimation: `none`
    },
    area: {
        shade: `light`,
        overlay: `opaque`,
        size: `normal`,
        margin: `narrow`,
        rippled: true,
        initialAnimation: `none`
    },
    font: {
        flat: {
            label: {
                small: FontTheme.boldSmallest,
                normal: FontTheme.boldSmall,
                large: FontTheme.bold
            }
        },
        raised: {
            label: {
                small: FontTheme.boldSmallest,
                normal: FontTheme.boldSmall,
                large: FontTheme.bold
            }
        }
    },
    corner: {
        flat: {
            circular: 0.5,
            round: 0.1,
            sharp: 0,
            pinched: {
                topLeft: 0,
                bottomLeft: 0.5,
                topRight: 0.5,
                bottomRight: 0
            },
            teardrop: {
                topLeft: 0.5,
                bottomLeft: 0.5,
                topRight: 0,
                bottomRight: 0.5
            }
        },
        raised: {
            circular: 0.5,
            round: 0.1,
            sharp: 0,
            pinched: {
                topLeft: 0,
                bottomLeft: 0.5,
                topRight: 0.5,
                bottomRight: 0
            },
            teardrop: {
                topLeft: 0.5,
                bottomLeft: 0.5,
                topRight: 0,
                bottomRight: 0.5
            }
        }

    },
    size: {
        flat: {
            small: 27,
            normal: 36,
            large: 48
        },
        raised: {
            small: 27,
            normal: 36,
            large: 48
        },
        area: {
            small: 36,
            normal: 48,
            large: 54
        }
    },
    margin: {
        flat: {
            narrow: 3,
            wide: 6
        },
        raised: {
            narrow: 3,
            wide: 6
        },
        area: {
            narrow: {
                vertical: 3
            },
            wide: {
                vertical: 6
            }
        }
    },
    color: {
        flat: {
            opacity: ColorTheme.opacity,
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
            },
            busy: {
                dark: ColorTheme.dark.accent,
                light: ColorTheme.light.accent
            },
            label: {
                dark: ColorTheme.light.default,
                light: ColorTheme.dark.default
            },
            ripple: {
                dark: ColorTheme.palette.white,
                light: ColorTheme.palette.lightGrey
            }
        },
        raised: {
            opacity: ColorTheme.opacity,
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
            },
            busy: {
                dark: ColorTheme.dark.accent,
                light: ColorTheme.light.accent
            },
            label: {
                dark: ColorTheme.light.default,
                light: ColorTheme.dark.default
            },
            ripple: {
                dark: ColorTheme.palette.white,
                light: ColorTheme.palette.lightGrey
            }
        },
        area: {
            opacity: ColorTheme.opacity,
            dark: ColorTheme.light.default,
            light: ColorTheme.dark.default,
            disabled: {
                dark: ColorTheme.dark.disabled,
                light: ColorTheme.light.disabled
            },
            ripple: {
                dark: ColorTheme.palette.white,
                light: ColorTheme.palette.lightGrey
            }
        }
    },
    animation: {
        flat: {
            none: {
                refName: ``,
                transitions: []
            }
        },
        raised: {
            none: {
                refName: ``,
                transitions: []
            }
        },
        area: {
            none: {
                refName: ``,
                transitions: []
            }
        }
    }
};

export default ButtonTheme;

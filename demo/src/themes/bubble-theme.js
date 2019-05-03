'use strict'; // eslint-disable-line

import { Hf } from 'hyperflow';

import { Font } from 'hypertoxin';

import DefaultTheme from './default-theme';

const BubbleFontTheme = Font.createFontTemplate({
    fontFamily: `Arial`
});

const BubbleColorTheme = {
    ...DefaultTheme.color,
    dark: {
        default: DefaultTheme.color.palette.white,
        accent: DefaultTheme.color.palette.lightRed,
        primary: DefaultTheme.color.palette.pink,
        secondary: DefaultTheme.color.palette.amber,
        disabled: DefaultTheme.color.palette.lightGrey
    },
    light: {
        default: DefaultTheme.color.palette.deepRed,
        accent: DefaultTheme.color.palette.lightRed,
        primary: DefaultTheme.color.palette.pink,
        secondary: DefaultTheme.color.palette.amber,
        disabled: DefaultTheme.color.palette.lightGrey
    }
};

const BubbleTheme = Hf.merge(DefaultTheme).with({
    name: `bubble`,
    color: BubbleColorTheme,
    font: BubbleFontTheme,
    field: {
        search: {
            shade: `light`,
            overlay: `translucent`,
            corner: `circular`,
            size: `normal`,
            dropShadowed: false
        },
        text: {
            shade: `light`,
            overlay: `transparent`,
            size: `normal`,
            underlined: true,
            initialAnimation: `none`
        }
    },
    image: {
        avatar: {
            shade: `light`,
            size: `normal`,
            dropShadowed: false
        },
        icon: {
            shade: `light`,
            size: `normal`,
            dropShadowed: false,
            color: `primary`
        },
        color: {
            avatar: {
                accent: {
                    dark: BubbleColorTheme.dark.accent,
                    light: BubbleColorTheme.light.accent
                },
                primary: {
                    dark: BubbleColorTheme.dark.primary,
                    light: BubbleColorTheme.light.primary
                },
                secondary: {
                    dark: BubbleColorTheme.dark.secondary,
                    light: BubbleColorTheme.light.secondary
                }
            },
            icon: {
                accent: {
                    dark: BubbleColorTheme.dark.accent,
                    light: BubbleColorTheme.light.accent
                },
                primary: {
                    dark: BubbleColorTheme.dark.primary,
                    light: BubbleColorTheme.light.primary
                },
                secondary: {
                    dark: BubbleColorTheme.dark.secondary,
                    light: BubbleColorTheme.light.secondary
                },
                disabled: {
                    dark: BubbleColorTheme.dark.disabled,
                    light: BubbleColorTheme.light.disabled
                }
            }
        }
    },
    text: {
        font: {
            headline: {
                small: BubbleFontTheme.normalLarge,
                normal: BubbleFontTheme.normalLarger,
                large: BubbleFontTheme.normalLargest
            },
            title: {
                small: BubbleFontTheme.boldLarge,
                normal: BubbleFontTheme.boldLarger,
                large: BubbleFontTheme.boldLargest
            },
            subtitle: {
                small: BubbleFontTheme.normal,
                normal: BubbleFontTheme.normalLarge,
                large: BubbleFontTheme.normalLarger
            },
            info: {
                small: BubbleFontTheme.normalSmaller,
                normal: BubbleFontTheme.normalSmall,
                large: BubbleFontTheme.normal
            },
            caption: {
                small: BubbleFontTheme.italicSmallest,
                normal: BubbleFontTheme.italicSmaller,
                large: BubbleFontTheme.italicSmall
            }
        },
        color: {
            headline: {
                accent: {
                    dark: BubbleColorTheme.dark.accent,
                    light: BubbleColorTheme.light.accent
                },
                primary: {
                    dark: BubbleColorTheme.dark.primary,
                    light: BubbleColorTheme.light.primary
                },
                secondary: {
                    dark: BubbleColorTheme.dark.secondary,
                    light: BubbleColorTheme.light.secondary
                },
                default: {
                    dark: BubbleColorTheme.dark.default,
                    light: BubbleColorTheme.light.default
                }
            },
            title: {
                accent: {
                    dark: BubbleColorTheme.dark.accent,
                    light: BubbleColorTheme.light.accent
                },
                primary: {
                    dark: BubbleColorTheme.dark.primary,
                    light: BubbleColorTheme.light.primary
                },
                secondary: {
                    dark: BubbleColorTheme.dark.secondary,
                    light: BubbleColorTheme.light.secondary
                },
                default: {
                    dark: BubbleColorTheme.dark.default,
                    light: BubbleColorTheme.light.default
                }
            },
            subtitle: {
                accent: {
                    dark: BubbleColorTheme.dark.accent,
                    light: BubbleColorTheme.light.accent
                },
                primary: {
                    dark: BubbleColorTheme.dark.primary,
                    light: BubbleColorTheme.light.primary
                },
                secondary: {
                    dark: BubbleColorTheme.dark.secondary,
                    light: BubbleColorTheme.light.secondary
                },
                default: {
                    dark: BubbleColorTheme.dark.default,
                    light: BubbleColorTheme.light.default
                }
            },
            info: {
                accent: {
                    dark: BubbleColorTheme.dark.accent,
                    light: BubbleColorTheme.light.accent
                },
                primary: {
                    dark: BubbleColorTheme.dark.primary,
                    light: BubbleColorTheme.light.primary
                },
                secondary: {
                    dark: BubbleColorTheme.dark.secondary,
                    light: BubbleColorTheme.light.secondary
                },
                default: {
                    dark: BubbleColorTheme.dark.default,
                    light: BubbleColorTheme.light.default
                }
            },
            caption: {
                accent: {
                    dark: BubbleColorTheme.dark.accent,
                    light: BubbleColorTheme.light.accent
                },
                primary: {
                    dark: BubbleColorTheme.dark.primary,
                    light: BubbleColorTheme.light.primary
                },
                secondary: {
                    dark: BubbleColorTheme.dark.secondary,
                    light: BubbleColorTheme.light.secondary
                },
                default: {
                    dark: BubbleColorTheme.dark.default,
                    light: BubbleColorTheme.light.default
                }
            }
        }
    },
    screen: {
        header: {
            shade: `light`,
            overlay: `opaque`,
            size: `normal`,
            dropShadowed: false
        },
        font: {
            header: {
                label: {
                    small: BubbleFontTheme.thinSmall,
                    normal: BubbleFontTheme.thinLarge,
                    large: BubbleFontTheme.thinLarger
                }
            }
        },
        color: {
            header: {
                opacity: BubbleColorTheme.opacity,
                status: {
                    dark: BubbleColorTheme.dark.accent,
                    light: BubbleColorTheme.light.accent
                },
                navigation: {
                    dark: BubbleColorTheme.dark.accent,
                    light: BubbleColorTheme.light.accent
                },
                media: {
                    dark: BubbleColorTheme.dark.primary,
                    light: BubbleColorTheme.light.primary
                },
                label: {
                    dark: BubbleColorTheme.light.default,
                    light: BubbleColorTheme.dark.default
                }
            }
        }
    },
    button: {
        flat: {
            corner: `circular`,
            overlay: `transparent-outline`
        },
        raised: {
            corner: `circular`
        },
        font: {
            flat: {
                label: {
                    small: BubbleFontTheme.thinSmaller,
                    normal: BubbleFontTheme.thinSmall,
                    large: BubbleFontTheme.thin
                }
            },
            raised: {
                label: {
                    small: BubbleFontTheme.thinSmaller,
                    normal: BubbleFontTheme.thinSmall,
                    large: BubbleFontTheme.thin
                }
            }
        },
        color: {
            flat: {
                opacity: BubbleColorTheme.opacity,
                accent: {
                    dark: BubbleColorTheme.dark.accent,
                    light: BubbleColorTheme.light.accent
                },
                primary: {
                    dark: BubbleColorTheme.dark.primary,
                    light: BubbleColorTheme.light.primary
                },
                secondary: {
                    dark: BubbleColorTheme.dark.secondary,
                    light: BubbleColorTheme.light.secondary
                },
                disabled: {
                    dark: BubbleColorTheme.dark.disabled,
                    light: BubbleColorTheme.light.disabled
                },
                label: {
                    dark: BubbleColorTheme.light.default,
                    light: BubbleColorTheme.dark.default
                },
                ripple: {
                    dark: BubbleColorTheme.palette.white,
                    light: BubbleColorTheme.palette.lightGrey
                }
            },
            raised: {
                opacity: BubbleColorTheme.opacity,
                accent: {
                    dark: BubbleColorTheme.dark.accent,
                    light: BubbleColorTheme.light.accent
                },
                primary: {
                    dark: BubbleColorTheme.dark.primary,
                    light: BubbleColorTheme.light.primary
                },
                secondary: {
                    dark: BubbleColorTheme.dark.secondary,
                    light: BubbleColorTheme.light.secondary
                },
                disabled: {
                    dark: BubbleColorTheme.dark.disabled,
                    light: BubbleColorTheme.light.disabled
                },
                label: {
                    dark: BubbleColorTheme.light.default,
                    light: BubbleColorTheme.dark.default
                },
                ripple: {
                    dark: BubbleColorTheme.palette.white,
                    light: BubbleColorTheme.palette.lightGrey
                }
            }
        }
    }
});

export default BubbleTheme;

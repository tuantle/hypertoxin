'use strict'; // eslint-disable-line

import { Hf } from 'hyperflow';

import { Font } from 'hypertoxin';

import DefaultTheme from './default-theme';

const CoffeeFontTheme = Font.createFontTemplate({
    fontFamily: `Futura`
});

const CoffeeColorPalette = {
    ...DefaultTheme.color.palette,
    grey: `#c9c1bb`,
    deepGrey: `#b7ada5`,
    lightGrey: `#e5e0dc`,

    beige: `#e8ded5`,
    white: `#ffefe0`,
    silver: `#c1b6ac`,
    charcoal: `#51473e`,
    black: `#2d251e`
};

const CoffeeColorTheme = {
    ...DefaultTheme.color,
    palette: CoffeeColorPalette,
    dark: {
        default: CoffeeColorPalette.deepOrange,
        accent: CoffeeColorPalette.red,
        primary: CoffeeColorPalette.orange,
        secondary: CoffeeColorPalette.pink,
        disabled: CoffeeColorPalette.deepGrey
    },
    light: {
        default: CoffeeColorPalette.deepRed,
        accent: CoffeeColorPalette.red,
        primary: CoffeeColorPalette.orange,
        secondary: CoffeeColorPalette.pink,
        disabled: CoffeeColorPalette.deepGrey
    }
};

const CoffeeTheme = Hf.merge(DefaultTheme).with({
    name: `coffee`,
    color: CoffeeColorTheme,
    font: CoffeeFontTheme,
    field: {
        search: {
            shade: `light`,
            overlay: `opaque`,
            corner: `circular`,
            size: `normal`,
            dropShadowed: true
        },
        text: {
            shade: `light`,
            overlay: `transparent`,
            size: `normal`,
            underlined: true,
            initialAnimation: `none`
        },
        color: {
            search: {
                opacity: CoffeeColorTheme.opacity,
                focused: {
                    dark: CoffeeColorTheme.palette.orange,
                    light: CoffeeColorTheme.palette.deepOrange
                },
                blurred: {
                    dark: CoffeeColorTheme.palette.lightOrange,
                    light: CoffeeColorTheme.palette.orange
                },
                box: {
                    dark: CoffeeColorTheme.palette.beige,
                    light: CoffeeColorTheme.palette.beige
                },
                input: {
                    dark: CoffeeColorTheme.palette.silver,
                    light: CoffeeColorTheme.palette.charcoal
                },
                hint: CoffeeColorTheme.palette.silver
            },
            text: {
                opacity: CoffeeColorTheme.opacity,
                focused: {
                    dark: CoffeeColorTheme.palette.orange,
                    light: CoffeeColorTheme.palette.deepOrange
                },
                blurred: {
                    dark: CoffeeColorTheme.palette.lightOrange,
                    light: CoffeeColorTheme.palette.orange
                },
                disabled: {
                    dark: CoffeeColorTheme.dark.disabled,
                    light: CoffeeColorTheme.light.disabled
                },
                box: {
                    dark: CoffeeColorTheme.palette.beige,
                    light: CoffeeColorTheme.palette.beige
                },
                input: {
                    dark: CoffeeColorTheme.palette.silver,
                    light: CoffeeColorTheme.palette.charcoal
                },
                helper: {
                    dark: CoffeeColorTheme.palette.silver,
                    light: CoffeeColorTheme.palette.charcoal
                },
                hint: CoffeeColorTheme.palette.silver,
                status: CoffeeColorTheme.palette.red
            }
        }
    },
    image: {
        avatar: {
            shade: `light`,
            size: `normal`,
            dropShadowed: true
        },
        icon: {
            shade: `light`,
            size: `normal`,
            dropShadowed: true,
            color: `primary`
        },
        color: {
            avatar: {
                accent: {
                    dark: CoffeeColorTheme.dark.accent,
                    light: CoffeeColorTheme.light.accent
                },
                primary: {
                    dark: CoffeeColorTheme.dark.primary,
                    light: CoffeeColorTheme.light.primary
                },
                secondary: {
                    dark: CoffeeColorTheme.dark.secondary,
                    light: CoffeeColorTheme.light.secondary
                }
            },
            icon: {
                accent: {
                    dark: CoffeeColorTheme.dark.accent,
                    light: CoffeeColorTheme.light.accent
                },
                primary: {
                    dark: CoffeeColorTheme.dark.primary,
                    light: CoffeeColorTheme.light.primary
                },
                secondary: {
                    dark: CoffeeColorTheme.dark.secondary,
                    light: CoffeeColorTheme.light.secondary
                },
                disabled: {
                    dark: CoffeeColorTheme.dark.disabled,
                    light: CoffeeColorTheme.light.disabled
                },
                default: {
                    dark: CoffeeColorTheme.dark.default,
                    light: CoffeeColorTheme.light.default
                }
            }
        }
    },
    text: {
        font: {
            headline: {
                small: CoffeeFontTheme.normalLarge,
                normal: CoffeeFontTheme.normalLarger,
                large: CoffeeFontTheme.normalLargest
            },
            title: {
                small: CoffeeFontTheme.boldLarge,
                normal: CoffeeFontTheme.boldLarger,
                large: CoffeeFontTheme.boldLargest
            },
            subtitle: {
                small: CoffeeFontTheme.normal,
                normal: CoffeeFontTheme.normalLarge,
                large: CoffeeFontTheme.normalLarger
            },
            info: {
                small: CoffeeFontTheme.normalSmaller,
                normal: CoffeeFontTheme.normalSmall,
                large: CoffeeFontTheme.normal
            },
            caption: {
                small: CoffeeFontTheme.italicSmallest,
                normal: CoffeeFontTheme.italicSmaller,
                large: CoffeeFontTheme.italicSmall
            }
        },
        color: {
            headline: {
                accent: {
                    dark: CoffeeColorTheme.dark.accent,
                    light: CoffeeColorTheme.light.accent
                },
                primary: {
                    dark: CoffeeColorTheme.dark.primary,
                    light: CoffeeColorTheme.light.primary
                },
                secondary: {
                    dark: CoffeeColorTheme.dark.secondary,
                    light: CoffeeColorTheme.light.secondary
                },
                default: {
                    dark: CoffeeColorTheme.dark.default,
                    light: CoffeeColorTheme.light.default
                }
            },
            title: {
                accent: {
                    dark: CoffeeColorTheme.dark.accent,
                    light: CoffeeColorTheme.light.accent
                },
                primary: {
                    dark: CoffeeColorTheme.dark.primary,
                    light: CoffeeColorTheme.light.primary
                },
                secondary: {
                    dark: CoffeeColorTheme.dark.secondary,
                    light: CoffeeColorTheme.light.secondary
                },
                default: {
                    dark: CoffeeColorTheme.dark.default,
                    light: CoffeeColorTheme.light.default
                }
            },
            subtitle: {
                accent: {
                    dark: CoffeeColorTheme.dark.accent,
                    light: CoffeeColorTheme.light.accent
                },
                primary: {
                    dark: CoffeeColorTheme.dark.primary,
                    light: CoffeeColorTheme.light.primary
                },
                secondary: {
                    dark: CoffeeColorTheme.dark.secondary,
                    light: CoffeeColorTheme.light.secondary
                },
                default: {
                    dark: CoffeeColorTheme.dark.default,
                    light: CoffeeColorTheme.light.default
                }
            },
            info: {
                accent: {
                    dark: CoffeeColorTheme.dark.accent,
                    light: CoffeeColorTheme.light.accent
                },
                primary: {
                    dark: CoffeeColorTheme.dark.primary,
                    light: CoffeeColorTheme.light.primary
                },
                secondary: {
                    dark: CoffeeColorTheme.dark.secondary,
                    light: CoffeeColorTheme.light.secondary
                },
                default: {
                    dark: CoffeeColorTheme.dark.default,
                    light: CoffeeColorTheme.light.default
                }
            },
            caption: {
                accent: {
                    dark: CoffeeColorTheme.dark.accent,
                    light: CoffeeColorTheme.light.accent
                },
                primary: {
                    dark: CoffeeColorTheme.dark.primary,
                    light: CoffeeColorTheme.light.primary
                },
                secondary: {
                    dark: CoffeeColorTheme.dark.secondary,
                    light: CoffeeColorTheme.light.secondary
                },
                default: {
                    dark: CoffeeColorTheme.dark.default,
                    light: CoffeeColorTheme.light.default
                }
            }
        }
    },
    screen: {
        header: {
            shade: `light`,
            overlay: `opaque`,
            size: `normal`,
            dropShadowed: true
        },
        font: {
            header: {
                label: {
                    small: CoffeeFontTheme.thinSmall,
                    normal: CoffeeFontTheme.thinLarge,
                    large: CoffeeFontTheme.thinLarger
                }
            }
        },
        color: {
            header: {
                opacity: CoffeeColorTheme.opacity,
                status: {
                    dark: CoffeeColorTheme.dark.primary,
                    light: CoffeeColorTheme.light.primary
                },
                navigation: {
                    dark: CoffeeColorTheme.dark.primary,
                    light: CoffeeColorTheme.light.primary
                },
                media: {
                    dark: CoffeeColorTheme.dark.primary,
                    light: CoffeeColorTheme.light.primary
                },
                label: {
                    dark: CoffeeColorTheme.palette.beige,
                    light: CoffeeColorTheme.palette.beige
                }
            }
        }
    },
    button: {
        flat: {
            corner: `pinched`
        },
        raised: {
            corner: `pinched`
        },
        font: {
            flat: {
                label: {
                    small: CoffeeFontTheme.thinSmaller,
                    normal: CoffeeFontTheme.thinSmall,
                    large: CoffeeFontTheme.thin
                }
            },
            raised: {
                label: {
                    small: CoffeeFontTheme.thinSmaller,
                    normal: CoffeeFontTheme.thinSmall,
                    large: CoffeeFontTheme.thin
                }
            }
        },
        color: {
            flat: {
                opacity: CoffeeColorTheme.opacity,
                accent: {
                    dark: CoffeeColorTheme.dark.accent,
                    light: CoffeeColorTheme.light.accent
                },
                primary: {
                    dark: CoffeeColorTheme.dark.primary,
                    light: CoffeeColorTheme.light.primary
                },
                secondary: {
                    dark: CoffeeColorTheme.dark.secondary,
                    light: CoffeeColorTheme.light.secondary
                },
                disabled: {
                    dark: CoffeeColorTheme.dark.disabled,
                    light: CoffeeColorTheme.light.disabled
                },
                label: {
                    dark: CoffeeColorTheme.palette.beige,
                    light: CoffeeColorTheme.palette.beige
                },
                ripple: {
                    dark: CoffeeColorTheme.palette.white,
                    light: CoffeeColorTheme.palette.lightGrey
                }
            },
            raised: {
                opacity: CoffeeColorTheme.opacity,
                accent: {
                    dark: CoffeeColorTheme.dark.accent,
                    light: CoffeeColorTheme.light.accent
                },
                primary: {
                    dark: CoffeeColorTheme.dark.primary,
                    light: CoffeeColorTheme.light.primary
                },
                secondary: {
                    dark: CoffeeColorTheme.dark.secondary,
                    light: CoffeeColorTheme.light.secondary
                },
                disabled: {
                    dark: CoffeeColorTheme.dark.disabled,
                    light: CoffeeColorTheme.light.disabled
                },
                label: {
                    dark: CoffeeColorTheme.palette.beige,
                    light: CoffeeColorTheme.palette.beige
                },
                ripple: {
                    dark: CoffeeColorTheme.palette.white,
                    light: CoffeeColorTheme.palette.lightGrey
                }
            }
        }
    }
});

export default CoffeeTheme;

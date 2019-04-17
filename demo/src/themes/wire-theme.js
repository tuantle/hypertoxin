'use strict'; // eslint-disable-line

import { Hf } from 'hyperflow';

import { Font } from 'hypertoxin';

import DefaultTheme from './default-theme';

const WiredFontTheme = Font.createFontTemplate({
    fontFamily: `Kailasa-Bold`
});

const WiredColorTheme = {
    ...DefaultTheme.color,
    opacity: `19`,
    dark: {
        default: DefaultTheme.color.palette.white,
        accent: DefaultTheme.color.palette.lightBlue,
        primary: `#607d8b`,
        secondary: DefaultTheme.color.palette.grey,
        disabled: DefaultTheme.color.palette.lightGrey
    },
    light: {
        default: DefaultTheme.color.palette.black,
        accent: DefaultTheme.color.palette.lightBlue,
        primary: `#607d8b`,
        secondary: DefaultTheme.color.palette.grey,
        disabled: DefaultTheme.color.palette.lightGrey
    }
};

const WiredTheme = Hf.merge(DefaultTheme).with({
    name: `wire`,
    color: WiredColorTheme,
    font: WiredFontTheme,
    field: {
        search: {
            shade: `dark`,
            overlay: `transparent-outline`,
            corner: `circular`,
            size: `normal`,
            dropShadowed: false
        },
        text: {
            shade: `light`,
            overlay: `transparent-outline`,
            size: `normal`,
            underlined: true,
            initialAnimation: `none`
        },
        color: {
            search: {
                focused: {
                    dark: WiredColorTheme.palette.teal,
                    light: WiredColorTheme.palette.teal
                },
                blurred: {
                    dark: WiredColorTheme.palette.blue,
                    light: WiredColorTheme.palette.blue
                }
            }
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
                    dark: WiredColorTheme.dark.accent,
                    light: WiredColorTheme.light.accent
                },
                primary: {
                    dark: WiredColorTheme.dark.primary,
                    light: WiredColorTheme.light.primary
                },
                secondary: {
                    dark: WiredColorTheme.dark.secondary,
                    light: WiredColorTheme.light.secondary
                }
            },
            icon: {
                accent: {
                    dark: WiredColorTheme.dark.accent,
                    light: WiredColorTheme.light.accent
                },
                primary: {
                    dark: WiredColorTheme.dark.primary,
                    light: WiredColorTheme.light.primary
                },
                secondary: {
                    dark: WiredColorTheme.dark.secondary,
                    light: WiredColorTheme.light.secondary
                },
                disabled: {
                    dark: WiredColorTheme.dark.disabled,
                    light: WiredColorTheme.light.disabled
                }
            }
        }
    },
    text: {
        font: {
            headline: {
                small: WiredFontTheme.normalLarge,
                normal: WiredFontTheme.normalLarger,
                large: WiredFontTheme.normalLargest
            },
            title: {
                small: WiredFontTheme.boldLarge,
                normal: WiredFontTheme.boldLarger,
                large: WiredFontTheme.boldLargest
            },
            subtitle: {
                small: WiredFontTheme.normal,
                normal: WiredFontTheme.normalLarge,
                large: WiredFontTheme.normalLarger
            },
            info: {
                small: WiredFontTheme.normalSmaller,
                normal: WiredFontTheme.normalSmall,
                large: WiredFontTheme.normal
            },
            caption: {
                small: WiredFontTheme.italicSmallest,
                normal: WiredFontTheme.italicSmaller,
                large: WiredFontTheme.italicSmall
            }
        },
        color: {
            headline: {
                accent: {
                    dark: WiredColorTheme.dark.accent,
                    light: WiredColorTheme.light.accent
                },
                primary: {
                    dark: WiredColorTheme.dark.primary,
                    light: WiredColorTheme.light.primary
                },
                secondary: {
                    dark: WiredColorTheme.dark.secondary,
                    light: WiredColorTheme.light.secondary
                },
                default: {
                    dark: WiredColorTheme.dark.default,
                    light: WiredColorTheme.light.default
                }
            },
            title: {
                accent: {
                    dark: WiredColorTheme.dark.accent,
                    light: WiredColorTheme.light.accent
                },
                primary: {
                    dark: WiredColorTheme.dark.primary,
                    light: WiredColorTheme.light.primary
                },
                secondary: {
                    dark: WiredColorTheme.dark.secondary,
                    light: WiredColorTheme.light.secondary
                },
                default: {
                    dark: WiredColorTheme.dark.default,
                    light: WiredColorTheme.light.default
                }
            },
            subtitle: {
                accent: {
                    dark: WiredColorTheme.dark.accent,
                    light: WiredColorTheme.light.accent
                },
                primary: {
                    dark: WiredColorTheme.dark.primary,
                    light: WiredColorTheme.light.primary
                },
                secondary: {
                    dark: WiredColorTheme.dark.secondary,
                    light: WiredColorTheme.light.secondary
                },
                default: {
                    dark: WiredColorTheme.dark.default,
                    light: WiredColorTheme.light.default
                }
            },
            info: {
                accent: {
                    dark: WiredColorTheme.dark.accent,
                    light: WiredColorTheme.light.accent
                },
                primary: {
                    dark: WiredColorTheme.dark.primary,
                    light: WiredColorTheme.light.primary
                },
                secondary: {
                    dark: WiredColorTheme.dark.secondary,
                    light: WiredColorTheme.light.secondary
                },
                default: {
                    dark: WiredColorTheme.dark.default,
                    light: WiredColorTheme.light.default
                }
            },
            caption: {
                accent: {
                    dark: WiredColorTheme.dark.accent,
                    light: WiredColorTheme.light.accent
                },
                primary: {
                    dark: WiredColorTheme.dark.primary,
                    light: WiredColorTheme.light.primary
                },
                secondary: {
                    dark: WiredColorTheme.dark.secondary,
                    light: WiredColorTheme.light.secondary
                },
                default: {
                    dark: WiredColorTheme.dark.default,
                    light: WiredColorTheme.light.default
                }
            }
        }
    },
    screen: {
        header: {
            shade: `light`,
            overlay: `transparent`,
            size: `normal`,
            dropShadowed: false
        },
        font: {
            header: {
                label: {
                    small: WiredFontTheme.normalSmall,
                    normal: WiredFontTheme.normalLarge,
                    large: WiredFontTheme.normalLarger
                }
            }
        },
        color: {
            header: {
                opacity: WiredColorTheme.opacity,
                status: {
                    dark: WiredColorTheme.dark.accent,
                    light: WiredColorTheme.light.accent
                },
                navigation: {
                    dark: WiredColorTheme.dark.accent,
                    light: WiredColorTheme.light.accent
                },
                media: {
                    dark: WiredColorTheme.dark.primary,
                    light: WiredColorTheme.light.primary
                },
                label: {
                    dark: WiredColorTheme.light.primary,
                    light: WiredColorTheme.dark.primary
                }
            }
        }
    },
    button: {
        flat: {
            corner: `sharp`,
            overlay: `transparent-outline`
        },
        raised: {
            corner: `sharp`
        },
        font: {
            flat: {
                label: {
                    small: WiredFontTheme.normalSmallest,
                    normal: WiredFontTheme.normalSmall,
                    large: WiredFontTheme.normal
                }
            },
            raised: {
                label: {
                    small: WiredFontTheme.normalSmallest,
                    normal: WiredFontTheme.normalSmall,
                    large: WiredFontTheme.normal
                }
            }
        },
        color: {
            flat: {
                opacity: WiredColorTheme.opacity,
                accent: {
                    dark: WiredColorTheme.dark.accent,
                    light: WiredColorTheme.light.accent
                },
                primary: {
                    dark: WiredColorTheme.dark.primary,
                    light: WiredColorTheme.light.primary
                },
                secondary: {
                    dark: WiredColorTheme.dark.secondary,
                    light: WiredColorTheme.light.secondary
                },
                disabled: {
                    dark: WiredColorTheme.dark.disabled,
                    light: WiredColorTheme.light.disabled
                },
                label: {
                    dark: WiredColorTheme.dark.default,
                    light: WiredColorTheme.dark.default
                },
                ripple: {
                    dark: WiredColorTheme.palette.white,
                    light: WiredColorTheme.palette.lightGrey
                }
            },
            raised: {
                opacity: WiredColorTheme.opacity,
                accent: {
                    dark: WiredColorTheme.dark.accent,
                    light: WiredColorTheme.light.accent
                },
                primary: {
                    dark: WiredColorTheme.dark.primary,
                    light: WiredColorTheme.light.primary
                },
                secondary: {
                    dark: WiredColorTheme.dark.secondary,
                    light: WiredColorTheme.light.secondary
                },
                disabled: {
                    dark: WiredColorTheme.dark.disabled,
                    light: WiredColorTheme.light.disabled
                },
                label: {
                    dark: WiredColorTheme.dark.default,
                    light: WiredColorTheme.dark.default
                },
                ripple: {
                    dark: WiredColorTheme.palette.white,
                    light: WiredColorTheme.palette.lightGrey
                }
            }
        }
    }
});

export default WiredTheme;

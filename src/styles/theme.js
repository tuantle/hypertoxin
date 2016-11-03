/**
 * Copyright (c) 2016-present, Boki, Inc. All rights reserved.
 *
 * Licensed TBA
 *
 *------------------------------------------------------------------------
 *
 * @description - UI-Kit color shade.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 *------------------------------------------------------------------------
 */
'use strict'; // eslint-disable-line

import materialPalette from './palettes/material-palette';

export default {
    palette: materialPalette,
    opacity: `a6`,
    accent: `#f2771d`,
    divider: `#e0dada`,
    body: {
        container: {
            dark: `#455a64`,
            light: `#fdfdfd`
        }
    },
    header: {
        container: {
            dark: `#607d8b`,
            light: `#00bcd4`
        },
        status: {
            dark: `#455a64`,
            light: `#0097a7`
        },
        label: {
            dark: `#fdfdfd`,
            light: `#fdfdfd`
        }
    },
    item: {
        container: {
            dark: `#455a64`,
            light: `#fdfdfd`
        }
    },
    card: {
        container: {
            dark: `#455a64`,
            light: `#fdfdfd`
        }
    },
    layout: {
        container: {
            dark: `#455a64`,
            light: `#fdfdfd`
        }
    },
    text: {
        default: {
            dark: `#5d5d5d`,
            light: `#fdfdfd`
        },
        primary: {
            dark: `#ff5722`,
            light: `#ff5722`
        },
        secondary: {
            dark: `#ffccbc`,
            light: `#ffccbc`
        }
    },
    icon: {
        default: {
            dark: `#5d5d5d`,
            light: `#fdfdfd`
        },
        primary: {
            dark: `#ff5722`,
            light: `#ff5722`
        },
        secondary: {
            dark: `#ffccbc`,
            light: `#ffccbc`
        }
    },
    button: {
        flat: {
            label: {
                default: {
                    dark: `#5d5d5d`,
                    light: `#fdfdfd`
                },
                primary: {
                    dark: `#ff5722`,
                    light: `#ff5722`
                },
                secondary: {
                    dark: `#ffccbc`,
                    light: `#ffccbc`
                },
                disabled: {
                    dark: `#bdbdbd`,
                    light: `#bdbdbd`
                }
            },
            icon: {
                default: {
                    dark: `#5d5d5d`,
                    light: `#fdfdfd`
                },
                primary: {
                    dark: `#ff5722`,
                    light: `#ff5722`
                },
                secondary: {
                    dark: `#ff5722`,
                    light: `#ffccbc`
                },
                disabled: {
                    dark: `#bdbdbd`,
                    light: `#bdbdbd`
                }
            }
        },
        icon: {
            default: {
                dark: `#5d5d5d`,
                light: `#fdfdfd`
            },
            primary: {
                dark: `#ff5722`,
                light: `#ff5722`
            },
            secondary: {
                dark: `#ffccbc`,
                light: `#ffccbc`
            },
            disabled: {
                dark: `#bdbdbd`,
                light: `#bdbdbd`
            }
        },
        raised: {
            container: {
                default: `#f2771d`,
                primary: `#ff5722`,
                secondary: `#ffccbc`,
                disabled: `#bdbdbd`
            },
            label: {
                default: `#fdfdfd`,
                primary: `#fdfdfd`,
                secondary: `#c8c8c8`,
                disabled: `#d8d8d8`
            },
            icon: {
                default: `#fdfdfd`,
                primary: `#fdfdfd`,
                secondary: `#c8c8c8`,
                disabled: `#d8d8d8`
            }
        },
        floatingAction: {
            container: {
                default: `#f2771d`,
                primary: `#ff5722`,
                secondary: `#ffccbc`,
                disabled: `#bdbdbd`
            },
            icon: {
                default: `#fdfdfd`,
                primary: `#fdfdfd`,
                secondary: `#c8c8c8`,
                disabled: `#d8d8d8`
            }
        }
    }
};

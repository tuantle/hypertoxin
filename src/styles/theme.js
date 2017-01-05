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
 * @description - UI-Kit color shade.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 *------------------------------------------------------------------------
 */
'use strict'; // eslint-disable-line

import materialPalette from './palettes/material-palette';
import materialIconPreset from './icons/material-icon-preset';

export default {
    icon: materialIconPreset,
    color: {
        palette: materialPalette,
        opacity: `aa`,
        accent: `#f2771d`,
        divider: `#f1e7e7`,
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
                dark: `#85d5eb`,
                light: `#85d5eb`
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
                dark: `#85d5eb`,
                light: `#85d5eb`
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
                        dark: `#85d5eb`,
                        light: `#85d5eb`
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
                        dark: `#85d5eb`,
                        light: `#85d5eb`
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
                    dark: `#85d5eb`,
                    light: `#85d5eb`
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
                    secondary: `#85d5eb`,
                    disabled: `#bdbdbd`
                },
                label: {
                    default: `#fdfdfd`,
                    primary: `#fdfdfd`,
                    secondary: `#fdfdfd`,
                    disabled: `#d8d8d8`
                },
                icon: {
                    default: `#fdfdfd`,
                    primary: `#fdfdfd`,
                    secondary: `#fdfdfd`,
                    disabled: `#d8d8d8`
                }
            },
            floatingAction: {
                container: {
                    default: `#f2771d`,
                    primary: `#ff5722`,
                    secondary: `#85d5eb`,
                    disabled: `#bdbdbd`
                },
                icon: {
                    default: `#fdfdfd`,
                    primary: `#fdfdfd`,
                    secondary: `#fdfdfd`,
                    disabled: `#d8d8d8`
                }
            }
        }
    }
};

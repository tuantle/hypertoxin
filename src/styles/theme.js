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
        border: `#f1e7e7`,
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
            },
            disabled: {
                dark: `#bdbdbd`,
                light: `#bdbdbd`
            }
        },
        textField: {
            helper: `#9b9b9b`,
            hint: `#9b9b9b`,
            status: `#ff5252`,
            label: {
                focused: {
                    dark: `#f2771d`,
                    light: `#f2771d`
                },
                blurred: {
                    dark: `#9b9b9b`,
                    light: `#fdfdfd`
                },
                disabled: {
                    dark: `#bdbdbd`,
                    light: `#bdbdbd`
                }
            },
            icon: {
                focused: {
                    dark: `#f2771d`,
                    light: `#f2771d`
                },
                blurred: {
                    dark: `#737373`,
                    light: `#fdfdfd`
                },
                disabled: {
                    dark: `#bdbdbd`,
                    light: `#bdbdbd`
                }
            },
            underline: {
                focused: {
                    dark: `#f2771d`,
                    light: `#f2771d`
                },
                blurred: {
                    dark: `#9b9b9b`,
                    light: `#9b9b9b`
                },
                disabled: {
                    dark: `#bdbdbd`,
                    light: `#bdbdbd`
                }
            }
        },
        icon: {
            default: {
                dark: `#737373`,
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
                        dark: `#737373`,
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
                    dark: `#737373`,
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
                    default: {
                        dark: `#f2771d`,
                        light: `#f2771d`
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
                label: {
                    default: {
                        dark: `#fdfdfd`,
                        light: `#fdfdfd`
                    },
                    primary: {
                        dark: `#fdfdfd`,
                        light: `#fdfdfd`
                    },
                    secondary: {
                        dark: `#fdfdfd`,
                        light: `#fdfdfd`
                    },
                    disabled: {
                        dark: `#bdbdbd`,
                        light: `#bdbdbd`
                    }
                },
                icon: {
                    default: {
                        dark: `#fdfdfd`,
                        light: `#fdfdfd`
                    },
                    primary: {
                        dark: `#fdfdfd`,
                        light: `#fdfdfd`
                    },
                    secondary: {
                        dark: `#fdfdfd`,
                        light: `#fdfdfd`
                    },
                    disabled: {
                        dark: `#bdbdbd`,
                        light: `#bdbdbd`
                    }
                }
            },
            floatingAction: {
                container: {
                    default: {
                        dark: `#f2771d`,
                        light: `#f2771d`
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
                        dark: `#fdfdfd`,
                        light: `#fdfdfd`
                    },
                    primary: {
                        dark: `#fdfdfd`,
                        light: `#fdfdfd`
                    },
                    secondary: {
                        dark: `#fdfdfd`,
                        light: `#fdfdfd`
                    },
                    disabled: {
                        dark: `#bdbdbd`,
                        light: `#bdbdbd`
                    }
                }
            }
        }
    }
};

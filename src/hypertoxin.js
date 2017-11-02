/**
 * Copyright 2015-present Tuan Le.
 *
 * Licensed under the MIT License.
 * You may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://opensource.org/licenses/mit-license.html
 *
 * Unless = required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 *------------------------------------------------------------------------
 *
 * @module Hypertoxin (Ht) (A React Native & Hyperflow component library for developing native app)
 * @description - Hf namespace setup. Initialize Hf, adding core modules, and apply settings.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 * @flow
 */
'use strict'; // eslint-disable-line

/* load and initialize hyperflow */
const Hf = require('hyperflow').init({ // eslint-disable-line
    target: `client-native`,
    enableProductionMode: false,
    enableInfo0Logging: false,
    enableInfo1Logging: true,
    enableWarn0Logging: false,
    enableWarn1Logging: true
});

/* load hypertoxin default icon and color theme */
const defaultTheme = require(`./styles/theme`).default;

/* hypertoxin global object */
let Ht = null;

/**
 * @description - Setup and initialize modules & dependencies for Ht`s namespaces.
 *
 * @function init
 * @param {object} setting - Ht's global settings.
 * @returns {object}
 */
const init = function init (option = {
    // setting: {
    //     touchPressDebounceTime: 250
    // },
    customTheme: {}
}) {
    const {
        customTheme
    } = Hf.fallback({
        customTheme: {}
    }).of(option);

    if (Ht === null) {
        Ht = {
            VERSION: `0.1.0-beta11`,
            Theme: Hf.isNonEmptyObject(customTheme) ? Hf.merge(defaultTheme).with(customTheme) : defaultTheme
        };

        const HtProperty = {
            Badge: null,
            Divider: null,
            Button: {},
            Text: {},
            Image: {},
            View: {},
            ViewComposite: {},
            Field: {}
        };

        const HtComposite = {
            View: {
                HeaderViewSlideAndFadeAnimation: require(`./composites/views/header-view-slide-and-fade-animation-composite`).default
            }
        };
        const HtComponent = {
            Divider: require(`./components/divider/divider-component`).default,
            /* load button components */
            Button: {
                FlatButton: require(`./components/buttons/flat-button-component`).default,
                RaisedButton: require(`./components/buttons/raised-button-component`).default
            },
            /* load image components */
            Image: {
                AvatarImage: require(`./components/images/avatar-image-component`).default,
                IconImage: require(`./components/images/icon-image-component`).default,
                WallpaperImage: require(`./components/images/wallpaper-image-component`).default
            },
            /* load text components */
            Text: {
                HeadlineText: require(`./components/texts/headline-text-component`).default,
                TitleText: require(`./components/texts/title-text-component`).default,
                SubtitleText: require(`./components/texts/subtitle-text-component`).default,
                InfoText: require(`./components/texts/info-text-component`).default,
                CaptionText: require(`./components/texts/caption-text-component`).default
            },
            /* load field components */
            Field: {
                TextField: require(`./components/fields/text-field-component`).default
                // SearchField: require(`./components/fields/search-field-component`).default
            },
            /* load view components */
            View: {
                ScreenView: require(`./components/views/screen-view-component`).default,
                HeaderView: require(`./components/views/header-view-component`).default,
                BodyView: require(`./components/views/body-view-component`).default,
                LayoutView: require(`./components/views/layout-view-component`).default,
                CardView: require(`./components/views/card-view-component`).default,
                ItemView: require(`./components/views/item-view-component`).default
            }
        };

        Object.defineProperty(HtProperty, `Divider`, {
            get: function get () {
                return HtComponent.Divider;
            },
            configurable: false,
            enumerable: true
        });

        Object.defineProperty(HtProperty.View, `ScreenView`, {
            get: function get () {
                return HtComponent.View.ScreenView;
            },
            configurable: false,
            enumerable: true
        });
        Object.defineProperty(HtProperty.View, `HeaderView`, {
            get: function get () {
                return HtComponent.View.HeaderView;
            },
            configurable: false,
            enumerable: true
        });
        Object.defineProperty(HtProperty.ViewComposite, `HeaderViewSlideAndFadeAnimation`, {
            get: function get () {
                return HtComposite.View.HeaderViewSlideAndFadeAnimation;
            },
            configurable: false,
            enumerable: true
        });
        Object.defineProperty(HtProperty.View, `BodyView`, {
            get: function get () {
                return HtComponent.View.BodyView;
            },
            configurable: false,
            enumerable: true
        });
        Object.defineProperty(HtProperty.View, `LayoutView`, {
            get: function get () {
                return HtComponent.View.LayoutView;
            },
            configurable: false,
            enumerable: true
        });
        Object.defineProperty(HtProperty.View, `CardView`, {
            get: function get () {
                return HtComponent.View.CardView;
            },
            configurable: false,
            enumerable: true
        });
        Object.defineProperty(HtProperty.View, `ItemView`, {
            get: function get () {
                return HtComponent.View.ItemView;
            },
            configurable: false,
            enumerable: true
        });

        Object.defineProperty(HtProperty.Button, `FlatButton`, {
            get: function get () {
                return HtComponent.Button.FlatButton;
            },
            configurable: false,
            enumerable: true
        });
        Object.defineProperty(HtProperty.Button, `RaisedButton`, {
            get: function get () {
                return HtComponent.Button.RaisedButton;
            },
            configurable: false,
            enumerable: true
        });

        Object.defineProperty(HtProperty.Field, `TextField`, {
            get: function get () {
                return HtComponent.Field.TextField;
            },
            configurable: false,
            enumerable: true
        });

        Object.defineProperty(HtProperty.Text, `HeadlineText`, {
            get: function get () {
                return HtComponent.Text.HeadlineText;
            },
            configurable: false,
            enumerable: true
        });
        Object.defineProperty(HtProperty.Text, `TitleText`, {
            get: function get () {
                return HtComponent.Text.TitleText;
            },
            configurable: false,
            enumerable: true
        });
        Object.defineProperty(HtProperty.Text, `SubtitleText`, {
            get: function get () {
                return HtComponent.Text.SubtitleText;
            },
            configurable: false,
            enumerable: true
        });
        Object.defineProperty(HtProperty.Text, `InfoText`, {
            get: function get () {
                return HtComponent.Text.InfoText;
            },
            configurable: false,
            enumerable: true
        });
        Object.defineProperty(HtProperty.Text, `CaptionText`, {
            get: function get () {
                return HtComponent.Text.CaptionText;
            },
            configurable: false,
            enumerable: true
        });

        Object.defineProperty(HtProperty.Image, `AvatarImage`, {
            get: function get () {
                return HtComponent.Image.AvatarImage;
            },
            configurable: false,
            enumerable: true
        });
        Object.defineProperty(HtProperty.Image, `IconImage`, {
            get: function get () {
                return HtComponent.Image.IconImage;
            },
            configurable: false,
            enumerable: true
        });
        Object.defineProperty(HtProperty.Image, `WallpaperImage`, {
            get: function get () {
                return HtComponent.Image.WallpaperImage;
            },
            configurable: false,
            enumerable: true
        });

        Ht = Hf.mix(Ht).with(HtProperty);

        /* create an Ht object */
        Ht = Object.freeze(Ht);
    }
    return Ht;
};

export {
    Ht,
    init
};

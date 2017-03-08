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
 */
/* @flow */
'use strict'; // eslint-disable-line

/* load and initialize hyperflow */
const Hf = require('hyperflow').init({ // eslint-disable-line
    target: `client-native`,
    enableProductionMode: process.env.NODE_ENV === `production` // eslint-disable-line
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
const init = function init ({
    customTheme
} = {}) {
    if (Ht === null) {
        Ht = {
            VERSION: `0.1.0-beta6`,
            Theme: Hf.isNonEmptyObject(customTheme) ? Hf.merge(defaultTheme).with(customTheme) : defaultTheme
        };

        const HtApplet = {
            /* load field applet components */
            EmailField: require(`./applets/fields/email-field-applet`).default,
            CreditCardField: require(`./applets/fields/credit-card-field-applet`).default,
            PhoneNumberField: require(`./applets/fields/phone-number-field-applet`).default,
            NumberField: require(`./applets/fields/number-field-applet`).default,
            TextField: require(`./applets/fields/text-field-applet`).default,
            /* SuggestiveSearch applet component */
            SuggestiveSearch: require(`./applets/searches/suggestive-search-applet`).default,
            /* load view applet component */
            HeaderView: require(`./applets/views/header-view-applet`).default
        };

        const HtProperty = {
            Divider: require(`./components/divider/divider-component`).default,
            /* load button components */
            Button: {
                FlatButton: require(`./components/buttons/flat-button-component`).default,
                RaisedButton: require(`./components/buttons/raised-button-component`).default,
                IconButton: require(`./components/buttons/icon-button-component`).default,
                FloatingActionButton: require(`./components/buttons/floating-action-button-component`).default
            },
            /* load text components */
            Text: {
                HeadlineText: require(`./components/texts/headline-text-component`).default,
                TitleText: require(`./components/texts/title-text-component`).default,
                SubtitleText: require(`./components/texts/subtitle-text-component`).default,
                InfoText: require(`./components/texts/info-text-component`).default,
                CaptionText: require(`./components/texts/caption-text-component`).default
            },
            /* load image components */
            Image: {
                AvatarImage: require(`./components/images/avatar-image-component`).default,
                IconImage: require(`./components/images/icon-image-component`).default,
                LandscapeImage: require(`./components/images/landscape-image-component`).default,
                PortraitImage: require(`./components/images/portrait-image-component`).default,
                SquareImage: require(`./components/images/square-image-component`).default,
                WallpaperImage: require(`./components/images/wallpaper-image-component`).default
            },
            /* load view components */
            View: {
                ScreenView: require(`./components/views/screen-view-component`).default,
                BodyView: require(`./components/views/body-view-component`).default,
                LayoutView: require(`./components/views/layout-view-component`).default,
                CardView: require(`./components/views/card-view-component`).default,
                ItemView: require(`./components/views/item-view-component`).default
                // DrawerView: require(`./components/views/drawer-view-component`).default,
                // BadgeView: require(`./components/views/badge-view-component`).default
            },
            Field: {}
        };

        Object.defineProperty(HtProperty, `SuggestiveSearch`, {
            get: function get () {
                return HtApplet.SuggestiveSearch({
                    name: `suggestive-search`
                }).getTopComponent({
                    doConvertToStandaloneComponent: true,
                    componentMethodAndPropertyInclusions: [
                        `isHidden`,
                        `show`,
                        `hide`,
                        `clear`,
                        `clearSearchSuggestion`
                        // `addSearchSuggestionItems`
                    ]
                });
            },
            configurable: false,
            enumerable: true
        });

        Object.defineProperty(HtProperty.View, `HeaderView`, {
            get: function get () {
                return HtApplet.HeaderView({
                    name: `header-view`
                }).getTopComponent({
                    alwaysUpdateAsParent: true,
                    doConvertToStandaloneComponent: true,
                    componentMethodAndPropertyInclusions: [
                        `isMinimized`,
                        `minimize`,
                        `maximize`
                    ]
                });
            },
            configurable: false,
            enumerable: true
        });

        Object.defineProperty(HtProperty.Field, `CreditCardField`, {
            get: function get () {
                return HtApplet.CreditCardField({
                    name: `credit-card-field`
                }).getTopComponent({
                    doConvertToStandaloneComponent: true,
                    componentMethodAndPropertyInclusions: [
                        `isValidated`,
                        `focus`,
                        `blur`,
                        `clear`
                    ]
                });
            },
            configurable: false,
            enumerable: true
        });

        Object.defineProperty(HtProperty.Field, `EmailField`, {
            get: function get () {
                return HtApplet.EmailField({
                    name: `email-field`
                }).getTopComponent({
                    doConvertToStandaloneComponent: true,
                    componentMethodAndPropertyInclusions: [
                        `isValidated`,
                        `focus`,
                        `blur`,
                        `clear`
                    ]
                });
            },
            configurable: false,
            enumerable: true
        });

        Object.defineProperty(HtProperty.Field, `NumberField`, {
            get: function get () {
                return HtApplet.NumberField({
                    name: `number-field`
                }).getTopComponent({
                    doConvertToStandaloneComponent: true,
                    componentMethodAndPropertyInclusions: [
                        `isValidated`,
                        `focus`,
                        `blur`,
                        `clear`
                    ]
                });
            },
            configurable: false,
            enumerable: true
        });

        Object.defineProperty(HtProperty.Field, `PhoneNumberField`, {
            get: function get () {
                return HtApplet.PhoneNumberField({
                    name: `phone-number-field`
                }).getTopComponent({
                    doConvertToStandaloneComponent: true,
                    componentMethodAndPropertyInclusions: [
                        `isValidated`,
                        `focus`,
                        `blur`,
                        `clear`
                    ]
                });
            },
            configurable: false,
            enumerable: true
        });

        Object.defineProperty(HtProperty.Field, `TextField`, {
            get: function get () {
                return HtApplet.TextField({
                    name: `text-field`
                }).getTopComponent({
                    doConvertToStandaloneComponent: true,
                    componentMethodAndPropertyInclusions: [
                        `isValidated`,
                        `focus`,
                        `blur`,
                        `clear`
                    ]
                });
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

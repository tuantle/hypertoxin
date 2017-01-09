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

/* load view components */
/* eslint-disable */
const { ScreenViewComponent } = require('./views/screen-view-component');
const { HeaderViewComponent } = require('./views/header-view-component');
const { BodyViewComponent } = require('./views/body-view-component');
const { LayoutViewComponent } = require('./views/layout-view-component');
const { CardViewComponent } = require('./views/card-view-component');
const { ItemViewComponent } = require('./views/item-view-component');
const { DividerViewComponent } = require('./views/divider-view-component');

/* load text components */
const { HeadlineTextComponent } = require('./texts/headline-text-component');
const { TitleTextComponent } = require('./texts/title-text-component');
const { SubtitleTextComponent } = require('./texts/subtitle-text-component');
const { InfoTextComponent } = require('./texts/info-text-component');
const { CaptionTextComponent } = require('./texts/caption-text-component');

/* load font style template */
const { FontStyleTemplate } = require('./styles/templates/font-style-template');

/* load image components */
const { AvatarImageComponent } = require('./images/avatar-image-component');
const { IconImageComponent } = require('./images/icon-image-component');
const { LandscapeImageComponent } = require('./images/landscape-image-component');
const { PortraitImageComponent } = require('./images/portrait-image-component');
const { SquareImageComponent } = require('./images/square-image-component');
const { WallpaperImageComponent } = require('./images/wallpaper-image-component');

/* load button components */
const { FlatButtonComponent } = require('./buttons/flat-button-component');
const { IconButtonComponent } = require('./buttons/icon-button-component');
const { RaisedButtonComponent } = require('./buttons/raised-button-component');
const { FloatingActionButtonComponent } = require('./buttons/floating-action-button-component');

/* load field components */
const { TextFieldComponent } = require('./fields/text-field-component');
const { SecuredTextFieldComponent } = require('./fields/secured-text-field-component');
const { EmailFieldComponent } = require('./fields/email-field-component');
const { NumberFieldComponent } = require('./fields/number-field-component');
/* eslint-enable */

import theme from './styles/theme';

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
        const HtProperty = {
            VERSION: `0.1.0-beta3`,
            View: {
                ScreenView: ScreenViewComponent,
                HeaderView: HeaderViewComponent,
                BodyView: BodyViewComponent,
                LayoutView: LayoutViewComponent,
                CardView: CardViewComponent,
                ItemView: ItemViewComponent,
                DividerView: DividerViewComponent
            },
            Button: {
                FlatButton: FlatButtonComponent,
                RaisedButton: RaisedButtonComponent,
                IconButton: IconButtonComponent,
                FloatingActionButton: FloatingActionButtonComponent
            },
            Field: {
                TextField: TextFieldComponent,
                SecuredTextField: SecuredTextFieldComponent,
                EmailField: EmailFieldComponent,
                NumberField: NumberFieldComponent
            },
            Image: {
                AvatarImage: AvatarImageComponent,
                IconImage: IconImageComponent,
                LandscapeImage: LandscapeImageComponent,
                PortraitImage: PortraitImageComponent,
                SquareImage: SquareImageComponent,
                WallpaperImage: WallpaperImageComponent
            },
            Text: {
                HeadlineText: HeadlineTextComponent,
                TitleText: TitleTextComponent,
                SubtitleText: SubtitleTextComponent,
                InfoText: InfoTextComponent,
                CaptionText: CaptionTextComponent
            },
            Theme: theme
        };

        HtProperty.Theme = Hf.isObject(customTheme) ? Hf.merge(HtProperty.Theme).with(customTheme) : HtProperty.Theme;

        /* create an Ht object */
        Ht = Object.freeze(HtProperty);
    }
    return Ht;
};

export {
    Ht,
    init
};

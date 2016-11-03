/**
 * Copyright 2015-present Tuan Le.
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
 * @module Hypertoxin (Ht) (A React Native & Hyperflow component library for developing native app)
 * @description - Hf namespace setup. Initialize Hf, adding core modules, and apply settings.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 */
/* @flow */
'use strict'; // eslint-disable-line

/* load Hf */
import { Hf } from 'hyperflow';

/* load view components */
import ScreenViewComponent from './views/screen-view-component';
import HeaderViewComponent from './views/header-view-component';
import BodyViewComponent from './views/body-view-component';
import LayoutViewComponent from './views/layout-view-component';
import CardViewComponent from './views/card-view-component';
import ItemViewComponent from './views/item-view-component';
import DividerViewComponent from './views/divider-view-component';

/* load text components */
import HeadlineTextComponent from './texts/headline-text-component';
import TitleTextComponent from './texts/title-text-component';
import SubtitleTextComponent from './texts/subtitle-text-component';
import InfoTextComponent from './texts/info-text-component';
import CaptionTextComponent from './texts/caption-text-component';

/* load font style template */
import FontStyleTemplate from './styles/templates/font-style-template';

/* load image components */
import AvatarImageComponent from './images/avatar-image-component';
import IconImageComponent from './images/icon-image-component';
import LandscapeImageComponent from './images/landscape-image-component';
import PortraitImageComponent from './images/portrait-image-component';
import SquareImageComponent from './images/square-image-component';
import WallpaperImageComponent from './images/wallpaper-image-component';

/* load icon image presets */
import IconImageComponentPreset from './images/presets/icon-image-component-preset';

/* load button components */
import FlatButtonComponent from './buttons/flat-button-component';
import IconButtonComponent from './buttons/icon-button-component';
import RaisedButtonComponent from './buttons/raised-button-component';
import FloatingActionButtonComponent from './buttons/floating-action-button-component';

/* load button presets */
import FlatButtonComponentPreset from './buttons/presets/flat-button-component-preset';
import RaisedButtonComponentPreset from './buttons/presets/raised-button-component-preset';
import IconButtonComponentPreset from './buttons/presets/icon-button-component-preset';
import FloatingActionButtonComponentPreset from './buttons/presets/floating-action-button-component-preset';

/* load field components */
import TextFieldComponent from './fields/text-field-component';
import SecuredTextFieldComponent from './fields/secured-text-field-component';
import EmailFieldComponent from './fields/email-field-component';
import NumberFieldComponent from './fields/number-field-component';

import defaultTheme from './styles/theme';

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
    // customPreset,
    // customIcon
} = {}) {
    if (Ht === null) {
        const HtProperty = {
            VERSION: `0.1.0-alpha3`,
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
                FontStyle: {
                    ...FontStyleTemplate
                },
                HeadlineText: HeadlineTextComponent,
                TitleText: TitleTextComponent,
                SubtitleText: SubtitleTextComponent,
                InfoText: InfoTextComponent,
                CaptionText: CaptionTextComponent
            },
            Preset: {
                FlatButton: {
                    ...FlatButtonComponentPreset
                },
                RaisedButton: {
                    ...RaisedButtonComponentPreset
                },
                IconButton: {
                    ...IconButtonComponentPreset
                },
                FloatingActionButton: {
                    ...FloatingActionButtonComponentPreset
                },
                IconImage: {
                    ...IconImageComponentPreset
                }
            },
            Theme: defaultTheme
            // Icon: defaultIcon
        };

        // HtProperty.Preset = Hf.isObject(customPreset) ? Hf.merge(HtProperty.Preset).with(customPreset) : HtProperty.Preset;
        HtProperty.Theme = Hf.isObject(customTheme) ? Hf.merge(HtProperty.Theme).with(customTheme) : HtProperty.Theme;
        // HtProperty.Icon = Hf.isObject(customIcon) ? Hf.merge(HtProperty.Icon).with(customIcon) : HtProperty.Icon;

        /* create an Ht object */
        Ht = Object.freeze(HtProperty);
    }
    return Ht;
};

export {
    Ht,
    init
};

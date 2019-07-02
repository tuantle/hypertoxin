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
 * @module Hypertoxin (Ht)
 * @description - A themeable ReactNative component library for developing native apps.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 * @flow
 */
'use strict'; // eslint-disable-line

import FlatButton from './components/buttons/flat-button';
import RaisedButton from './components/buttons/raised-button';
import AreaButton from './components/buttons/area-button';

import AvatarImage from './components/images/avatar-image';
import IconImage from './components/images/icon-image';
import CoverImage from './components/images/cover-image';

import TextField from './components/fields/text-field';
import SearchField from './components/fields/search-field';

import HorizontalDivider from './components/dividers/horizontal-divider';
import VerticalDivider from './components/dividers/vertical-divider';

import HeadlineText from './components/texts/headline-text';
import TitleText from './components/texts/title-text';
import SubtitleText from './components/texts/subtitle-text';
import InfoText from './components/texts/info-text';
import CaptionText from './components/texts/caption-text';

import HeaderScreen from './components/screens/header-screen';
import BodyScreen from './components/screens/body-screen';

import RowLayout from './components/layouts/row-layout';
import ColumnLayout from './components/layouts/column-layout';

import {
    DefaultTheme as Theme,
    DefaultThemeContext as ThemeContext
} from './themes/default-theme';

import createFontTemplate from './fonts/templates/create-font-template';
import RobotoFont from './fonts/roboto-font';
import SanFranciscoFont from './fonts/san-francisco-font';

const Font = {
    createFontTemplate,
    RobotoFont,
    SanFranciscoFont
};

const Ht = {
    VERSION: `0.2.1`,
    FlatButton,
    RaisedButton,
    AreaButton,

    AvatarImage,
    IconImage,
    CoverImage,

    TextField,
    SearchField,

    HorizontalDivider,
    VerticalDivider,

    HeadlineText,
    TitleText,
    SubtitleText,
    InfoText,
    CaptionText,

    BodyScreen,
    HeaderScreen,

    RowLayout,
    ColumnLayout
};

export {
    Ht,
    Theme,
    ThemeContext,
    Font
};

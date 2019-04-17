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
 * @description - Hypertoxin default theme.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 * @flow
 *
 */
'use strict'; // eslint-disable-line

import React from 'react';

import ColorTheme from './color-theme';

import ButtonTheme from './button-theme';

import FieldTheme from './field-theme';

import ImageTheme from './image-theme';

import MiscTheme from './misc-theme';

import TextTheme from './text-theme';

import LayoutTheme from './layout-theme';

import ScreenTheme from './screen-theme';

import FontTheme from '../fonts/san-francisco-font';

const DefaultTheme = {
    name: `default`,
    color: ColorTheme,
    font: FontTheme,
    misc: MiscTheme,
    field: FieldTheme,
    image: ImageTheme,
    button: ButtonTheme,
    text: TextTheme,
    layout: LayoutTheme,
    screen: ScreenTheme
};

const DefaultThemeContext = React.createContext({
    Theme: DefaultTheme
});

export {
    DefaultTheme,
    DefaultThemeContext
};

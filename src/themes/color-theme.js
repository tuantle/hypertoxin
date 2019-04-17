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
 * @description - Default color theme.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 * @flow
 *
 */
'use strict'; // eslint-disable-line

const Palette = {
    red: `#ee3d3d`,
    deepRed: `#b63939`,
    lightRed: `#fb6c6c`,

    pink: `#e8739b`,

    purple: `#9c67fb`,
    deepPurple: `#6543b8`,
    lightPurple: `#b793f7`,

    indigo: `#576eee`,

    blue: `#249bfa`,
    deepBlue: `#0c60a3`,
    lightBlue: `#49adfc`,

    cyan: `#53f2f7`,
    teal: `#38d1c3`,

    green: `#6cc855`,
    deepGreen: `#30861b`,
    lightGreen: `#9ed65b`,

    yellow: `#f6e761`,
    amber: `#fac72f`,

    orange: `#ff9b26`,
    deepOrange: `#d2770c`,
    lightOrange: `#fec47f`,

    grey: `#8299a3`,
    deepGrey: `#576970`,
    lightGrey: `#b2c9d4`,

    beige: `#edecea`,
    white: `#fafafa`,
    silver: `#ececec`,
    charcoal: `#355260`,
    black: `#2d424c`
};

const ColorTheme = {
    opacity: `b4`,
    dark: {
        default: Palette.white,
        accent: Palette.orange,
        primary: Palette.blue,
        secondary: Palette.pink,
        disabled: Palette.grey
    },
    light: {
        default: Palette.charcoal,
        accent: Palette.orange,
        primary: Palette.blue,
        secondary: Palette.pink,
        disabled: Palette.grey
    },
    palette: Palette
};

export default ColorTheme;

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
 * @description - Dropped shadow style template.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 *
 * @flow
 *
 */

'use strict'; //eslint-disable-line

import toxinPalette from '../palettes/toxin-palette';

const shallowDroppedShadowTemplate = {
    shadowRadius: 2,
    shadowOpacity: 0.2,
    shadowOffset: {
        width: 0,
        height: 1
    },
    shadowColor: toxinPalette.black
};

const deepDroppedShadowTemplate = {
    shadowRadius: 2.5,
    shadowOpacity: 0.35,
    shadowOffset: {
        width: 0,
        height: 3
    },
    shadowColor: toxinPalette.black
};

export default { // eslint-disable-line
    shallow: shallowDroppedShadowTemplate,
    deep: deepDroppedShadowTemplate
};

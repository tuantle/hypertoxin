/**
 * Copyright 2016-present Tuan Le.
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
 * @module HeaderViewSlideAndFadeAnimationComposite
 * @description - Header view default slide and fade animation composite.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 *------------------------------------------------------------------------
 */
'use strict'; // eslint-disable-line

import { Hf } from 'hyperflow';

const HeaderViewSlideAndFadeAnimationComposite = Hf.Composite({
    template: {
        renderHeaderViewEntryAnimation: function renderHeaderViewEntryAnimation (duration = 300) {
            const component = this;

            if (Hf.DEVELOPMENT) {
                if (!Hf.isSchema({
                    lookupComponentRefs: `function`
                }).of(component)) {
                    Hf.log(`error`, `HeaderViewSlideAndFadeAnimationComposite.$init - Component is invalid. Cannot apply composite.`);
                }
            }

            const [ animatedHeader ] = component.lookupComponentRefs(`animated-header`);

            if (Hf.DEVELOPMENT) {
                if (!Hf.isSchema({
                    animate: `function`
                }).of(animatedHeader)) {
                    Hf.log(`error`, `HeaderViewSlideAndFadeAnimationComposite.renderHeaderViewEntryAnimation - Animated header component is invalid.`);
                }
            }

            animatedHeader.animate(`animated-navigation-left-view`, {
                from: {
                    opacity: 0
                },
                to: {
                    opacity: 1
                },
                easing: `ease-in`,
                loopCount: 1,
                duration
            });
            animatedHeader.animate(`animated-navigation-center-view`, {
                from: {
                    opacity: 0,
                    translateX: 100
                },
                to: {
                    opacity: 1,
                    translateX: 0
                },
                easing: `ease-in`,
                loopCount: 1,
                duration
            });
        },
        renderHeaderViewExitAnimation: function renderHeaderViewExitAnimation (duration) {
            const component = this;

            if (Hf.DEVELOPMENT) {
                if (!Hf.isSchema({
                    lookupComponentRefs: `function`
                }).of(component)) {
                    Hf.log(`error`, `HeaderViewSlideAndFadeAnimationComposite.$init - Component is invalid. Cannot apply composite.`);
                }
            }

            const [ animatedHeader ] = component.lookupComponentRefs(`animated-header`);

            if (Hf.DEVELOPMENT) {
                if (!Hf.isSchema({
                    animate: `function`
                }).of(animatedHeader)) {
                    Hf.log(`error`, `HeaderViewSlideAndFadeAnimationComposite.renderHeaderViewEntryAnimation - Animated header component is invalid.`);
                }
            }

            animatedHeader.animate(`animated-navigation-left-view`, {
                from: {
                    opacity: 1
                },
                to: {
                    opacity: 0
                },
                easing: `ease-out`,
                loopCount: 1,
                duration
            });
            animatedHeader.animate(`animated-navigation-center-view`, {
                from: {
                    opacity: 1,
                    translateX: 0
                },
                to: {
                    opacity: 0,
                    translateX: 100
                },
                easing: `ease-out`,
                loopCount: 1,
                duration
            });
        }
    }
});

export default HeaderViewSlideAndFadeAnimationComposite;

# [Hypertoxin](https://github.com/tuantle/hypertoxin)

![Image](/assets/logos/hypertoxin-logo-mini.png "logo")

[![npm version](https://img.shields.io/npm/v/hypertoxin.svg?style=flat)](https://www.npmjs.com/package/hypertoxin)
[![npm downloads](https://img.shields.io/npm/dm/hypertoxin.svg?style=flat-square)](https://www.npmjs.com/package/hypertoxin)
## A themeable and declarative React Native component library for developing native mobile apps.

<p align="center">
    <img width="25%" height="25%" src="/assets/screenshots/screenshot-home-default-theme.png">
    <img width="25%" height="25%" src="/assets/screenshots/screenshot-home-bubble-theme.png">
    <img width="25%" height="25%" src="/assets/screenshots/screenshot-home-coffee-theme.png">
</p>
<p align="center">
    <em>Screenshots with some example themes</em>
</p>

<p align="center">
    <img width="35%" height="35%" src="/assets/screen-records/theme-switching.gif">
</p>
<p align="center">
    <em>Dynamic theme switching</em>
</p>

<p align="center">
    <img width="25%" height="25%" src="/assets/screenshots/screenshot-shopping-home-default-theme.png">
    <img width="25%" height="25%" src="/assets/screenshots/screenshot-shopping-cart-default-theme.png">
    <img width="25%" height="25%" src="/assets/screenshots/screenshot-shopping-checkout-default-theme.png">
</p>
<p align="center">
    <em>Mock up shopping app screenshots with default theme</em>
</p>

<p align="center">
<img width="25%" height="25%" src="/assets/screenshots/screenshot-shopping-home-bubble-theme.png">
<img width="25%" height="25%" src="/assets/screenshots/screenshot-shopping-cart-bubble-theme.png">
<img width="25%" height="25%" src="/assets/screenshots/screenshot-shopping-checkout-bubble-theme.png">
</p>
<p align="center">
    <em>Mock up shopping app screenshots with bubble theme</em>
</p>

---

- [Documentations & Examples](#documentations)
    - [Button Components](#button-components)
    - [Field Components](#field-components)
    - [Text Components](#text-components)
    - [Image Components](#image-components)
    - [Layout Components](#layout-components)
    - [Screen Components](#screen-components)
    - [Using Room Property](#using-room-property)
    - [Animation API](#animation-api)
    - [Theme Customization](#theme-customization)
- [Change Log](#change-log)
- [License](#license)

---

# Installation

```bash
$ npm install hypertoxin --save
```

# Demo & Showcase

Hypertoxin comes with a full demo that you can build and run on your device. All of the examples in this README are from the demo. To build the demo for iOS,

```bash
$ cd hypertoxin/demo
npm install
```

This will install the required modules such as React Native, Hypertoxin, [Hyperflow](https://github.com/tuantle/hyperflow), and others. Then open `hypertoxin/demo/ios` with Xcode, select your ios simulator/device, and build. The default build scheme is release.
When use successfully, you will see the following on your device or simulator.

<p align="center">
    <img width="35%" height="35%" src="/assets/screen-records/demo.gif">
</p>
<p align="center">
    <a href="https://github.com/tuantle/hypertoxin/tree/develop/demo/src"><em>Demo source</em></a>
</p>


# Usage

The imported `hypertoxin` object is consists of `Ht`, `ThemeContext`, and `Theme`. `Ht` is an object containing all available components. `Theme` is the default global theme object which is used as a reference for making custom themes. `ThemeContext` the a react context provider which is required for setting custom themes.

```js
import React, { Component } from 'react';
import ReactNative from 'react-native'
import { Ht, ThemeContext, Theme as DefaultTheme } from 'hyperflow';

// All current available components. More to come...
const {
    FlatButton,
    RaisedButton,
    AreaButton,

    AvatarImage,
    IconImage,
    CoverImage,

    TextField,
    SearchField,

    HorizontalDivider,
    VeriticalDivider,

    HeadlineText,
    TitleText,
    SubtitleText,
    InfoText,
    CaptionText,

    BodyScreen,
    HeaderScreen,

    RowLayout,
    ColumnLayout
} = Ht;

export default class App extends Component {
  render() {
      return (
          <ThemeContext.Provider value = {{
              DefaultTheme // Modify this DefaultTheme object to make your own custom theme
          }}>
              // Top level app component goes here...
          </ThemeContext.Provider>
      );
  }
}

```

---

# Documentations

## Button Components

<p align="center">
    <img width="35%" height="35%"  src="/assets/screen-records/buttons.gif">
</p>

Hypertoxin has three button components, [*FlatButton*](https://github.com/tuantle/hypertoxin/blob/develop/src/components/buttons/flat-button.js), [*RaisedButton*](https://github.com/tuantle/hypertoxin/blob/develop/src/components/buttons/raised-button.js), and [*AreaButton*](https://github.com/tuantle/hypertoxin/blob/develop/src/components/buttons/area-button.js)

#### Flat Button Properties

Prop | Type | Default | description
-----|------|---------|------------
exclusions | [string] | [] | Set which properties from parent component to ignore or exclude
room | string | `none` | Set button's room with respect to parent component which can be one of `none`, `content-left`, `content-middle`, `content-right`, `content-bottom`, `content-top`, `media`
action | string, object | `none` | Set button's onPress callback action to be defined by the parent component. This property is used when a button is set as a child search button for parent components such as SearchField, TextField, or HeaderScreen
shade | string, object | `themed` | Set button's shade theme, can be `themed`, `light`, or `dark`
overlay | string | `themed` | Set button's overplay style which can be one of `themed`, `opaque`, `translucent`, `translucent-outline`, `transparent`, `transparent-outline`
corner | string, number, object | `themed` | Set button's corner styles. As a number, corner is a scaler where border radius = corner * size. Set corner as an object for more control. For example `corner = { topLeft: 0.1, topRight: 0.1, bottomLeft: 0.1, bottomRight: 0.1}`
size  | string  | `themed`  | Set button's size which can be one of `themed`, `small`, `normal`, `large`
margin | string, number, object | None | Set button's margin styles. As a number, the margin is equally set around the button. Set margin as an object for more control. For example `margin = { top: 5, bottom: 5, left: 5, right: 5, horizontal: 5, vertical: 5}`
disabled | boolean | false | Disable the button
busy | boolean | false | Enable button busy activity indicator
rippled | boolean, string | `themed` | Enable button ripple animation
label | string | None | Button string label
color | string | `themed` | Set button's color style. Can be hex string, default color name, or themed color name
debounced | boolean | false | Enable button debouncing at 250 ms
initialAnimation | string, object | None  | See [Animation API](#animation-api) section for details
onPress | function | None | Button press action callback
style | object | None | Flat button style is an object with the following properties: `container: {...}, contentLeftRoom: {...}, contentMiddleRoom: {...}, contentRightRoom: {...}, badgeRoom: {...}, activityIndicatorRoom: {...}, label: {...}, ripple: {...}`. Standard React Native style properties go inside these properties. Changes to these properties will override the global theme. See [default style object](https://github.com/tuantle/hypertoxin/blob/c61f4bf96ac92efb550fb5264404f72cc0e1443f/src/components/buttons/flat-button.js#L53)

#### Raised Button Properties

Prop | Type | Default | description
-----|------|---------|------------
exclusions | [string] | [] | Set which properties from parent component to ignore or exclude
room | string | `none` | Set button's room with respect to parent component which can be one of `none`, `content-left`, `content-middle`, `content-right`, `content-bottom`, `content-top`, `media`
action | string, object | `none` | Set button's onPress callback action to be defined by the parent component. This property is used when a button is set as a child search button for parent components such as SearchField, TextField, or HeaderScreen
shade | string, object | `themed` | Set button's shade theme, can be `themed`, `light`, or `dark`
corner | string, number, object | `themed` | Set button's corner styles. As a number, corner is a scaler where border radius = corner * size. Set corner as an object for more control. For example `corner = { topLeft: 0.1, topRight: 0.1, bottomLeft: 0.1, bottomRight: 0.1}`
size  | string  | `themed`  | Set button's size which can be one of `themed`, `small`, `normal`, `large`
margin | string, number, object | None | Set button's margin styles. As a number, the margin is equally set around the button. Set margin as an object for more control. For example `margin = { top: 5, bottom: 5, left: 5, right: 5, horizontal: 5, vertical: 5}`
disabled | boolean | false | Disable the button
busy | boolean | false | Enable button busy activity indicator
rippled | boolean, string | `themed` | Enable button ripple animation
label | string | None | Button string label
color | string | `themed` | Set button's color style. Can be hex string, default color name, or themed color name
debounced | boolean | false | Enable button debouncing at 250 ms
initialAnimation | string, object | None  | See [Animation API](#animation-api) section for details
onPress | function | None | Button press action callback
style | object | None | Raised button style is an object with the following properties: `container: {...}, contentLeftRoom: {...}, contentMiddleRoom: {...}, contentRightRoom: {...}, badgeRoom: {...}, activityIndicatorRoom: {...}, label: {...}, ripple: {...}`. Standard React Native style properties go inside these properties. Changes to these properties will override the global theme. See [default style object](https://github.com/tuantle/hypertoxin/blob/c61f4bf96ac92efb550fb5264404f72cc0e1443f/src/components/buttons/raised-button.js#L63)

#### Flat & Raised Button Child View Compositions

<p align="center">
    <img width="50%" height="50%" src="/assets/images/flat-raised-button-compositions.png">
</p>

#### Flat & Raised Buttons Animated Child View Component References

RefName | description
--------|------------
`animated-container-view` | Reference name of button animated container child view
`animated-content-left-room-view` |
`animated-content-middle-room-view` |
`animated-content-right-room-view` |
`animated-activity-indicator-room-view` |
`animated-badge-room-view` | Reference name of button animated badge child view

#### Area Button Properties

Prop | Type | Default | description
-----|------|---------|------------
exclusions | [string] | [] | Set which properties from parent component to ignore or exclude
room | string | `none` | Set button's room with respect to parent component which can be one of `none`, `content-left`, `content-middle`, `content-right`, `content-bottom`, `content-top`, `media`
action | string, object | `none` | Set button's onPress callback action to be defined by the parent component. This property is used when a button is set as a child search button for parent components such as SearchField, TextField, or HeaderScreen
shade | string, object | `themed` | Set button's shade theme, can be `themed`, `light`, or `dark`
overlay | string | `themed` | Set button's overplay style which can be one of `themed`, `opaque`, `translucent`, `transparent`
size  | string  | `themed`  | Set button's size which can be one of `themed`, `small`, `normal`, `large`
margin | string, number, object | None | Set button's margin styles. As a number, the margin is equally set around the button. Set margin as an object for more control. For example `margin = { top: 5, bottom: 5, left: 5, right: 5, horizontal: 5, vertical: 5}`
disabled | boolean | false | Disable the button
rippled | boolean, string | `themed` | Enable button ripple animation
debounced | boolean | false | Enable button debouncing at 250 ms
initialAnimation | string, object | None  | See [Animation API](#animation-api) section for details
onPress | function | None | Button press action callback
style | object | None | Area button style is an object with the following properties: `container: {...}, contentLeftRoom: {...}, contentRightRoom: {...}, ripple: {...}`. Unlike flat and raised buttons, there is no middle room styling. Standard React Native style properties go inside these properties. Changes to these properties will override the global theme. See [default style object](https://github.com/tuantle/hypertoxin/blob/c61f4bf96ac92efb550fb5264404f72cc0e1443f/src/components/buttons/area-button.js#L55)

#### Area Button Child View Compositions

<p align="center">
    <img width="50%" height="50%" src="/assets/images/area-button-compositions.png">
</p>

#### Area Button Animated Component References

RefName | description
--------|------------
`animated-container-view` |
`animated-content-left-room-view` |
`animated-content-right-room-view` |

*Note: `themed` propperty indicates using values defined by the global theme provider.*

By default, flat button component passes `shade`, `size`, and `color` properties down to it child components and at the same time set `margin = { 0 }` and `indentation = { 0 }` properties onto its children. This behaviour can be overide by child components with the `exclusions` property. For example, the icon image component below will not receice the `color = 'primary'` property from he parent button.

```jsx
<FlatButton overlay = 'opaque' size = 'small' label = 'SMALL' color = 'primary' >
    <IconImage exclusions = {[ `color` ]} room = 'content-left' source = 'home' />
</FlatButton>
```

#### Button Component Public Methods Access Via Reference

Methods | description
--------|------------
animate | Do animation. See [Animation API](#animation-api)


#### Flat Button Examples

<p align="center">
    <img width="50%" height="50%" src="/assets/screenshots/flat-buttons.png">
</p>
<p align="center">
    <em>Standard flat buttons with colors defined by global theme</em>
</p>

```jsx
<FlatButton overlay = 'opaque' label = 'BUTTON' color = 'default' />
<FlatButton overlay = 'opaque' label = 'BUTTON' color = 'primary' />
<FlatButton overlay = 'opaque' label = 'BUTTON' color = 'secondary' />
<FlatButton overlay = 'opaque' label = 'BUTTON' color = 'accent' />
```

Clear buttons can be created when styling flat buttons with `overlay = 'transparent'` property. The component will auto-adjust the label text color accordingly.

<p align="center">
    <img width="50%" height="50%" src="/assets/screenshots/clear-buttons.png">
</p>
<p align="center">
    <em>Standard clear buttons with colors defined by global theme</em>
</p>

```jsx
<FlatButton overlay = 'transparent' label = 'BUTTON' color = 'default' />
<FlatButton overlay = 'transparent' label = 'BUTTON' color = 'primary' />
<FlatButton overlay = 'transparent' label = 'BUTTON' color = 'secondary' />
<FlatButton overlay = 'transparent' label = 'BUTTON' color = 'accent' />
```

<p align="center">
    <img width="50%" height="50%" src="/assets/screenshots/flat-buttons-with-l-icons.png">
</p>
<p align="center">
    <em>Flat buttons in 3 available sizes with icon images to the left</em>
</p>

<p align="center">
    <img width="50%" height="50%" src="/assets/screenshots/flat-buttons-with-r-icons.png">
</p>
<p align="center">
    <em>And icon images to the right</em>
</p>

To add icon image to button, add a child icon image component (more details for IconImage component below) with a content `room` property. All button components have 4 child rooms, `content-left`, `content-middle`, `content-right`, and `badge`.

Internally, a room is just a convient way for creating child Views, thus allowing the JSX code to be less clutter and much more declarative.

```jsx
<FlatButton overlay = 'opaque' size = 'small' label = 'SMALL' color = 'primary' >
    <IconImage room = 'content-left' source = 'home' />
</FlatButton>
<FlatButton overlay = 'opaque' size = 'normal' label = 'NORMAL' color = 'secondary' >
    <IconImage  room = 'content-left' source = 'home' />
</FlatButton>
<FlatButton overlay = 'opaque' size = 'large' label = 'LARGE' color = 'accent' >
    <IconImage room = 'content-left' source = 'home' />
</FlatButton>
<FlatButton overlay = 'opaque' size = 'small' label = 'SMALL' color = 'primary' >
    <IconImage room = 'content-right' source = 'profile' />
</FlatButton>
<FlatButton overlay = 'opaque' size = 'normal' label = 'NORMAL' color = 'secondary' >
    <IconImage room = 'content-right' source = 'profile' />
</FlatButton>
<FlatButton overlay = 'opaque' size = 'large' label = 'LARGE' color = 'accent' >
    <IconImage room = 'content-right' source = 'profile' />
</FlatButton>
```

<p align="center">
    <img width="50%" height="50%" src="/assets/screenshots/clear-buttons-with-l-icons.png">
    <img width="50%" height="50%" src="/assets/screenshots/clear-buttons-with-r-icons.png">
</p>
<p align="center">
    <em>Clear buttons in 3 available sizes with icon images to the left & right</em>
</p>

```jsx
<FlatButton overlay = 'transparent' size = 'small' label = 'SMALL' color = 'primary' >
    <IconImage room = 'content-left' source = 'home' />
</FlatButton>
<FlatButton overlay = 'transparent' size = 'normal' label = 'NORMAL' color = 'secondary' >
    <IconImage  room = 'content-left' source = 'home' />
</FlatButton>
<FlatButton overlay = 'transparent' size = 'large' label = 'LARGE' color = 'accent' >
    <IconImage room = 'content-left' source = 'home' />
</FlatButton>
<FlatButton overlay = 'transparent' size = 'small' label = 'SMALL' color = 'primary' >
    <IconImage room = 'content-right' source = 'profile' />
</FlatButton>
<FlatButton overlay = 'transparent' size = 'normal' label = 'NORMAL' color = 'secondary' >
    <IconImage room = 'content-right' source = 'profile' />
</FlatButton>
<FlatButton overlay = 'transparent' size = 'large' label = 'LARGE' color = 'accent' >
    <IconImage room = 'content-right' source = 'profile' />
</FlatButton>
```

<p align="center">
    <img width="50%" height="50%" src="/assets/screenshots/flat-buttons-with-corners.png">
</p>
<p align="center">
    <em>A few examples of corner styling</em>
</p>

```jsx
<FlatButton overlay = 'opaque' label = 'BUTTON' color = 'primary' corner = 'sharp' />
<FlatButton overlay = 'opaque' label = 'BUTTON' color = 'secondary' corner = 'round' />
<FlatButton overlay = 'opaque' label = 'BUTTON' color = 'accent' corner = 'circular' />
```

To create a button with a badge, add a child text component with a `room = 'badge'`.

<p align="center">
    <img width="20%" height="20%" src="/assets/screenshots/flat-button-with-badge.png">
</p>

```jsx
<FlatButton overlay = 'opaque' label = 'BUTTON' color = 'primary' >
    <InfoText room = 'badge' color = 'white' > 0 </InfoText>
    <IconImage room = 'content-left' source = 'home' />
</FlatButton>
```

<p align="center">
    <img width="50%" height="50%" src="/assets/screenshots/flat-buttons-with-outlines.png">
</p>
<p align="center">
    <em>Flat outlined buttons when styled with `overlay = 'transparent-outline'` property
</em>
</p>

```jsx
<FlatButton overlay = 'transparent-outline' size = 'small' label = 'BUTTON' color = 'primary' corner = 'sharp' >
    <IconImage room = 'content-left' source = 'star' />
</FlatButton>
<FlatButton overlay = 'transparent-outline' size = 'normal' label = 'BUTTON' color = 'secondary' corner = 'round' >
    <IconImage room = 'content-right' source = 'star' />
</FlatButton>
<FlatButton overlay = 'transparent-outline' size = 'large' label = 'BUTTON' color = 'accent' corner = 'circular' />
```

<p align="center">
    <img width="50%" height="50%" src="/assets/screenshots/icon-buttons.png">
</p>
<p align="center">
    <em>Flat buttons styled as icon buttons</em>
</p>

```jsx
<FlatButton overlay = 'transparent' size = 'small' color = 'primary' corner = 'circular' >
    <IconImage room = 'content-middle' source = 'favorite' />
</FlatButton>
<FlatButton overlay = 'transparent' size = 'normal' color = 'secondary' corner = 'circular' >
    <IconImage room = 'content-middle' source = 'favorite' />
</FlatButton>
<FlatButton overlay = 'transparent' size = 'large' color = 'accent' corner = 'circular' >
    <IconImage room = 'content-middle' source = 'favorite' />
</FlatButton>
<FlatButton overlay = 'transparent' color = { Theme.color.palette.purple } corner = 'circular' >
    <IconImage room = 'content-middle' source = 'smiley-face' />
</FlatButton>
<FlatButton overlay = 'transparent' color = { Theme.color.palette.green } corner = 'circular' >
    <IconImage room = 'content-middle' source = 'star' />
</FlatButton>
```

#### Raised Button Examples

<p align="center">
    <img width="50%" height="50%" src="/assets/screenshots/raised-buttons.png">
</p>
<p align="center">
    <em>Standard raised buttons with colors defined by global theme</em>
</p>

```jsx
<RaisedButton label = 'BUTTON' color = 'default' />
<RaisedButton label = 'BUTTON' color = 'primary' />
<RaisedButton label = 'BUTTON' color = 'secondary' />
<RaisedButton label = 'BUTTON' color = 'accent' />
```

<p align="center">
    <img width="50%" height="50%" src="/assets/screenshots/raised-buttons-with-l-icons.png">
    <img width="50%" height="50%" src="/assets/screenshots/raised-buttons-with-r-icons.png">
</p>
<p align="center">
    <em>Raised buttons in 3 available sizes with icon images to the left & right</em>
</p>

```jsx
<RaisedButton size = 'small' label = 'SMALL' color = 'primary' >
    <IconImage room = 'content-left' source = 'home' />
</RaisedButton>
<RaisedButton size = 'normal' label = 'NORMAL' color = 'secondary' >
    <IconImage room = 'content-left' source = 'home' />
</RaisedButton>
<RaisedButton size = 'large' label = 'LARGE' color = 'accent' >
    <IconImage room = 'content-left' source = 'home' />
</RaisedButton>
<RaisedButton size = 'small' label = 'SMALL' color = 'primary' >
    <IconImage room = 'content-right' source = 'profile' />
</RaisedButton>
<RaisedButton size = 'normal' label = 'NORMAL' color = 'secondary' >
    <IconImage room = 'content-right' source = 'profile' />
</RaisedButton>
<RaisedButton size = 'large' label = 'LARGE' color = 'accent' >
    <IconImage room = 'content-right' source = 'profile' />
</RaisedButton>
```

<p align="center">
    <img width="50%" height="50%" src="/assets/screenshots/raised-buttons-with-corners.png">
</p>
<p align="center">
    <em>A few examples of corner styling</em>
</p>

```jsx
<RaisedButton label = 'BUTTON' color = 'primary' corner = 'sharp' />
<RaisedButton label = 'BUTTON' color = 'secondary' corner = 'round' />
<RaisedButton label = 'BUTTON' color = 'accent' corner = 'circular' />
```

<p align="center">
    <img width="35%" height="35%" src="/assets/screenshots/fab-buttons.png">
</p>
<p align="center">
    <em>Raised buttons styled as floating action buttons</em>
</p>

```jsx
<RaisedButton color = 'primary' corner = 'circular' size = 'large' >
    <IconImage room = 'content-middle' source = 'add' />
</RaisedButton>
<RaisedButton color = 'secondary' corner = 'circular' size = 'large' >
    <IconImage room = 'content-middle' source = 'edit' />
</RaisedButton>
<RaisedButton color = 'accent' corner = 'circular' size = 'large' >
    <IconImage room = 'content-middle' source = 'star' />
</RaisedButton>
```

#### Area Button Examples

<p align="center">
    <img width="50%" height="50%" src="/assets/screen-records/area-buttons.gif">
</p>

```jsx
<FlatList
    data = { animals }
    renderItem = {(listData) => {
        const animal = listData.item;
        return (
            <AreaButton shade = { shade }>
                <ColumnLayout room = 'content-left' roomAlignment = 'center' >
                    <AvatarImage room = 'content-left' source = { animal.avatarImage } dropShadowed = { false } />
                    <TitleText room = 'content-right' size = 'small' indentation = { 20 }>{ animal.name }</TitleText>
                </ColumnLayout>
                <FlatButton room = 'content-right' overlay = 'transparent' corner = 'circular' color = 'red' >
                    <IconImage room = 'content-middle' source = `favorite` />
                </FlatButton>
            </AreaButton>
        );
    }}
/>
```

## Field Components

<p align="center">
    <img width="35%" height="35%" src="/assets/screen-records/text-fields.gif">
    <img width="35%" height="35%" src="/assets/screen-records/search-field.gif">
</p>

Hypertoxin has two field components, [*TextField*](https://github.com/tuantle/hypertoxin/blob/develop/src/components/fields/text-field.js) and [*SearchField*](https://github.com/tuantle/hypertoxin/blob/develop/src/components/fields/search-field.js)

#### Search Field Properties

Prop | Type | Default | description
-----|------|---------|------------
exclusions | [string] | [] | Set which properties from parent component to ignore or exclude
room | string | `none` | Set search field's room with respect to parent component which can be one of `none`, `content-left`, `content-middle`, `content-right`, `content-bottom`, `content-top`, `media`
shade | string, object | `themed` | Set search field's shade theme, can be `themed`, `light`, or `dark`
overlay | string | `themed` | Set search field's overplay style which can be one of `themed`, `opaque`, `translucent`, `translucent-outline`, `transparent`, `transparent-outline`
corner | string, number, object | `themed` | Set search field's corner styles. As a number, corner is a scaler where border radius = corner * size. Set corner as an object for more control. For example `corner = { topLeft: 0.1, topRight: 0.1, bottomLeft: 0.1, bottomRight: 0.1}`
size  | string  | `themed`  | Set search field's size which can be one of `themed`, `small`, `normal`, `large`
margin | string, number, object | None | Set search field's margin styles. As a number, the margin is equally set around search field container. Set margin as an object for more control. For example `margin = { top: 5, bottom: 5, left: 5, right: 5, horizontal: 5, vertical: 5}`
dropShadowed | boolean, string | `themed` | Enable search field's container drop shadow
autoFocus | boolean | true | Enable search field's auto focus
autoCorrect | boolean | true | Enable search field's auto correct spelling
suggestive | boolean | true | Enable search field's suggestion pullup view
pinnedSuggestionValues  | [string], [number], [object]  | [] | A list of pinned suggestion values
hint  | string  | None | Set search field's hint
initialAnimation | string, object | None  | See [Animation API](#animation-api) section for details
style | object | None | Search field style is an object with the following properties: `container: {...}, box, {...}, contentLeftRoom: {...}, contentRightRoom: {...}, input: {...}, suggestion: {...}`. Standard React Native style properties go inside these properties. Changes to these properties will override the global theme. See [default style object](https://github.com/tuantle/hypertoxin/blob/c61f4bf96ac92efb550fb5264404f72cc0e1443f/src/components/fields/search-field.js#L68)
onSearch | function | None | Called after search field's text input onSubmitEditing. Takes submitted search text value as argument
onGetAutocompletionValues | async function | None | Async retrieve autocompletion string value array for suggestion pullup view
onEditing | function | None |
onFocus | function | None | Called after search field's text input is focused. Takes no argument
onBlur | function | None | Called after search field's text input is blurred. Takes no argument
onCollapse | function | None | Called after search field view collapsed
onExpand | function | None | Called after search field view expanded
onHide | function | None | Called when search field view becomes hidden
onShow | function | None | Called when search field view becomes visible
onHideSuggestion | function | None | Called when search field's suggestion view becomes hidden
onShowSuggestion | function | None | Called when search field's suggestion view becomes visible
onClear | function | None | Called after search field's text input is cleared. Takes no argument
onClearSuggestion | function | None | Called after search field's suggestion is clear
renderSuggestionItem | function | None | Takes an item from a list of suggestion items (pinned, autocompleted, & history) and renders them into the list in pullup suggestion view. Takes suggestion item, onPressSelectAndSubmit, and onPressSelect as argument. See below for examples

#### Search Field Child View Compositions

<p align="center">
    <img width="50%" height="50%" src="/assets/images/search-field-compositions.png">
</p>

#### Search Field Animated Child View Component References

RefName | animated | description
--------|----------|------------
`animated-container-view` |
`animated-box-view` |
`animated-content-left-room-view` |
`animated-content-right-room-view` |
`animated-suggestion-view` |

#### Text Field Properties

Prop | Type | Default | description
-----|------|---------|------------
exclusions | [string] | [] | Set which properties from parent component to ignore or exclude
room | string | `none` | Set text field's room with respect to parent component which can be one of `none`, `content-left`, `content-middle`, `content-right`, `content-bottom`, `content-top`, `media`
shade | string, object | `themed` | Set text field's shade theme, can be `themed`, `light`, or `dark`
overlay | string | `themed` | Set text field's overplay style which can be one of `themed`, `opaque`, `translucent`, `translucent-outline`, `transparent`, `transparent-outline`
corner | string, number, object | `themed` | Set text field's corner styles. As a number, corner is a scaler where border radius = corner * size. Set corner as an object for more control. For example `corner = { topLeft: 0.1, topRight: 0.1, bottomLeft: 0.1, bottomRight: 0.1}`
size  | string  | `themed`  | Set text field's size which can be one of `themed`, `small`, `normal`, `large`
margin | string, number, object | None | Set text field's margin styles. As a number, the margin is equally set around text field container. Set margin as an object for more control. For example `margin = { top: 5, bottom: 5, left: 5, right: 5, horizontal: 5, vertical: 5}`
autoFocus | boolean | true | Enable text field's auto focus
autoCorrect | boolean | true | Enable text field's auto correct spelling
secured | boolean | false | Enable text field's secure mode
underlined | boolean, string | `themed` | Enable text field's underlined animation
disabled | boolean | false | Disable text field's input
initialValue  | string, number  | None | Set text input's initial value
selectableValues  | [string], [number], [object]  | [] | A list of selectable values
label  | string  | None | Set text field's label
hint  | string  | None | Set text field's hint
charLimit  | number  | -1 | Set text input's max characters count. Set charLimit > -1 for no character limit. When charLimit > 1, a little character counter will be visible in the bottom right
lineLimit  | number  | 1 | Set text input's max lines count. Set lineLimit > 1 for multilined text input
inputType  | string  | `default` | Set text input's type which can be one of `default`, `numeric`, `monetary`, `phone-pad`, `email-address`, `credit-card-visa`, `credit-card-master`, `credit-card-discover`, `credit-card-american-express`
disableValidation  | bool  | false | Disable text input validation
disableFormatting  | bool  | false | Disable text input formatting
initialAnimation | string, object | None  | See [Animation API](#animation-api) section for details
style | object | None | Text field style is an object with the following properties: `container: {...}, box: {...}, contentLeftRoom: {...}, contentRightRoom: {...}, input: {...}, helper: {...}, status: {...}, label: {...}, underline: {...}, selection: {...}`. Standard React Native style properties go inside these properties. Changes to these properties will override the global theme. See [default style object](https://github.com/tuantle/hypertoxin/blob/c61f4bf96ac92efb550fb5264404f72cc0e1443f/src/components/fields/text-field.js#L55)
onValidate | function | See [default onValidate](https://github.com/tuantle/hypertoxin/blob/c61f4bf96ac92efb550fb5264404f72cc0e1443f/src/components/fields/text-field.js#L1022) | Called after text field's text input onChangeText or onEndEditing. Takes current text input value and inputType as arguments. Expects return object with a `validate` boolean property and a `status` string property
onFormat | function | See [default onFormat](https://github.com/tuantle/hypertoxin/blob/c61f4bf96ac92efb550fb5264404f72cc0e1443f/src/components/fields/text-field.js#L1075) | Called after text field's text input onChangeText. Takes current text input value as argument. Return formated value
onEditing | function | None | Called when text field's text input onChangeText. Takes current text input value as argument.
onDoneEdit | function | None | Called when a value in text field's selectable pullup view is selected or after text field's text input onSubmitEditing. Takes current text input value or selected value as argument
onSelect | function | None  | Called when a value in text field's selectable pullup view is selected. Takes selected value as argument
onFocus | function | None | Called after text field's text input is focused. Takes no argument
onBlur | function | None | Called after text field's text input is blurred. Takes no argument
onHideSelection | function | None | Called after text field's selectable pullup view is hidden. Takes no argument
onShowSelection | function | None | Called after text field's selectable pullup view is visible. Takes no argument
onClear | function | None | Called after text field's text input is cleared. Takes no argument
renderSelectableItem | function | None | Takes an item from a list of selectable items and renders them into the list in pullup selection view. Takes selectable item and onPressSelect as argument. See below for examples

#### Text Field Child View Compositions

<p align="center">
    <img width="50%" height="50%" src="/assets/images/text-field-compositions.png">
</p>

#### Text Field Animated Child View Component References

RefName | animated | description
--------|----------|------------
`animated-container-view` |
`animated-box-view` |
`animated-label-text` |
`animated-underline-focused-view` |
`animated-content-left-room-view` |
`animated-content-right-room-view` |
`animated-selection-view` |

*Note: `themed` propperty indicates using values defined by the global theme provider.*

By default, text field component passes `shade`, `size`, and `disabled` properties down to it child components and at the same time set `margin = { 0 }` and `indentation = { 0 }` properties onto its children. This behaviour can be overide by child components with the `exclusions` property.

#### Text Field Component Public Methods Access Via Reference

Methods | description
--------|------------
isValidated | Check if text input's value is validated
isSelectionVisible | Check if selectable pullup view is visible
isFocused | Check if text input's value is focused
showSelection | Call to show selectable pullup view if `selectableValues` is provided
hideSelection | Call to hide selectable pullup view if `selectableValues` is provided
focus | Call to focus text input
blur | Call to blur text input
clear | Call to clear text input
animate | Do animation. See [Animation API](#animation-api)

#### Search Field Examples

<p align="center">
    <img width="35%" height="35%" src="/assets/screen-records/search-field-suggestion.gif">
</p>
<p align="center">
    <em>Search field with suggestion using Google's autocompletes</em>
</p>

```jsx
<SearchField
    hint = 'Search...'
    pinnedSuggestionValues = {[ `Hypertoxin`, `React Native` ]}
    onGetAutocompletionValues = {async (text) => {
        if (text) {
            const response = await fetch(`http://suggestqueries.google.com/complete/search?client=firefox&q=${text}`, {
                method: `get`
            });
            const data = await response.json();
            return data[1].slice(0, 6);
        }
        return [];
    }}
    renderSuggestionItem = {(item, onPressSelectAndSubmit, onPressSelect) => {
        // item = {
        //     value: ...             String value of the suggestion item
        //     suggestionType: ..     String value to indicate the suggestion types: pin, autocompletion, or history
        // }
        // onPressSelect              Callback to indicate which item was selected
        // onPressSelectAndSubmit     Callback to indicate which item was selected and then submitted
        return (
            <AreaButton shade = { shade } overlay = 'transparent' size = 'small' onPress = {() => onPressSelectAndSubmit(item)}>
                <ColumnLayout room = 'content-left' roomAlignment = 'center'
                >
                    <IconImage
                        room = 'content-left'
                        source = {(() => {
                            switch (item.suggestionType) { // eslint-disable-line
                            case `pin`:
                                return `star`;
                            case `history`:
                                return `history`;
                            case `autocompletion`:
                                return `search`;
                            default:
                                return null;
                            }
                        })()}
                        margin = {{ left: 10 }}
                    />
                    <InfoText room = 'content-right' indentation = { 10 }>{ item.value }</InfoText>
                </ColumnLayout>
                {
                    item.suggestionType !== `pin` ?
                    <FlatButton room = 'content-right' overlay = 'transparent' corner = 'circular' onPress = {() => onPressSelect(item)} margin = {{ right: 10 }}>
                        <IconImage room = 'content-middle' source = 'recall' size = 'small' />
                    </FlatButton> : null
                }
            </AreaButton>
        );
    }}
    style = {{
        suggestion: {
            left: -10
        }
    }}
>
    <FlatButton room = 'content-left' action = 'expand' overlay = 'transparent' corner = 'circular' >
        <IconImage room = 'content-middle' source = 'search' />
    </FlatButton>
    <FlatButton room = 'content-left' action = 'collapse' overlay = 'transparent' corner = 'circular' >
        <IconImage room = 'content-middle' source = 'go-back' />
    </FlatButton>
    <FlatButton room = 'content-right' action = 'clear' overlay = 'transparent' corner = 'circular' >
        <IconImage room = 'content-middle' source = 'cancel' />
    </FlatButton>
</SearchField>
```

#### Text Field Examples

<p align="center">
    <img width="35%" height="35%" src="/assets/screen-records/text-field-with-formatting-validation.gif">
</p>
<p align="center">
    <em>Text field with formatting and validation</em>
</p>

```jsx
<TextField
    label = 'PHONE NUMBER'
    inputType = 'phone-pad'
    charLimit = { 14 }
    onValidate = {(value, inputType) => {
        let regex;
        let validated = true;
        let status = ``;

        if (value !== `` && inputType === `phone-pad`) {
            regex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

            validated = regex.test(value);
            status = validated ? `` : `Phone number is invalid`;
        }
        return {
            validated,
            status
        };
    }}
    onFormat = {(value) => {
        return value.split(``).filter((char) => char !== `-` && char !== `(` && char !== `)` && char !== ` `).map((char, index) => {
            if (index === 0) {
                return `(${char}`;
            }
            if (index === 2) {
                return `${char}) `;
            }
            if (index === 5) {
                return `${char}-`;
            }
            return char;
        }).join(``);
    }}
>
    <FlatButton room = 'content-right' overlay = 'transparent' action = 'clear' corner = 'circular' >
        <IconImage room = 'content-middle' source = 'cancel' />
    </FlatButton>
</TextField>
```

<p align="center">
    <img width="25%" height="25%" src="/assets/screen-records/text-field-selectable.gif">
</p>
<p align="center">
    <em>Text field with selectable pullup view</em>
</p>

```jsx
<TextField
    label = 'LABEL'
    selectableValues = {[ `VALUE A`, `VALUE B`, `VALUE C` ]}
    renderSelectableItem = {(item, onPressSelect) => {
        // item = {
        //     value: ...       String value of the seleactable item
        //     selected: ..     Boolean to indicates that the item is selected or not
        // }
        // onPressSelect        Callback to indicate which item was selected
        return (
            <AreaButton
                shade = { shade }
                overlay = 'transparent'
                size = 'small'
                onPress = {() => onPressSelect(item)}
                contentRightRoomAlignment = 'start'
                margin = {{
                    horizontal: 10
                }}
            >
                <InfoText room = 'content-left' indentation = { 10 }>{ item.value }</InfoText>
                {
                    item.selected ? <IconImage room = 'content-right' source = 'check' /> : null
                }
            </AreaButton>
        );
    }}

    <FlatButton room = 'content-right' overlay = 'transparent' action = 'clear' corner = 'circular' >
        <IconImage room = 'content-middle' source = 'cancel' />
    </FlatButton>
    <FlatButton room = 'content-right' overlay = 'transparent' action = 'show-selection' corner = 'circular' >
        <IconImage room = 'content-middle' source = 'collapse' />
    </FlatButton>
    <FlatButton room = 'content-right' overlay = 'transparent' action = 'hide-selection' corner = 'circular' >
        <IconImage room = 'content-middle' source = 'expand' />
    </FlatButton>
</TextField>
```

## Text Components

<p align="center">
    <img width="35%" height="35%" src="/assets/screenshots/screenshot-text-default-theme.png">
</p>
<p align="center">
    <em>Text components with default theme and San-Francisco font</em>
</p>

<p align="center">
    <img width="35%" height="35%" src="/assets/screenshots/screenshot-text-bubble-theme.png">
</p>
<p align="center">
    <em>Text components with bubble theme and Arial font</em>
</p>

<p align="center">
    <img width="35%" height="35%" src="/assets/screenshots/screenshot-text-coffee-theme.png">
</p>
<p align="center">
    <em>Text components with coffee theme and Futura font</em>
</p>

Hypertoxin has five text components, [*CaptionText*](https://github.com/tuantle/hypertoxin/blob/develop/src/components/texts/caption-text.js), [*InfoText*](https://github.com/tuantle/hypertoxin/blob/develop/src/components/texts/info-text.js), [*SubtitleText*](https://github.com/tuantle/hypertoxin/blob/develop/src/components/texts/subtitle-text.js), [*TitleText*](https://github.com/tuantle/hypertoxin/blob/develop/src/components/texts/title-text.js), [*HeadlineText*](https://github.com/tuantle/hypertoxin/blob/develop/src/components/texts/headline-text.js)

#### Text (Caption, Info, Subtitle, Title, & Headline) Properties

Prop | Type | Default | description
-----|------|---------|------------
exclusions | [string] | [] | Set which properties from parent component to ignore or exclude
room | string | `none` | Set text's room with respect to parent component which can be one of `none`, `content-left`, `content-middle`, `content-right`, `content-bottom`, `content-top`, `media`, `activity-indicator`
shade | string, object | `themed` | Set text shade theme, can be `themed`, `light`, or `dark`
size  | string  | `themed`  | Set text font's size which can be one of `themed`, `small`, `normal`, `large`
alignment  | string  | `left`  | Set text's alignment which can be one of `left`, `center`, `right`
decoration  | string  | `none`  | Set text's decoration which can be one of `none`, `underline`, `line-through`
font  | string  | `themed`  | Set text font's family which can be `themed` or font family name
uppercased  | boolean  | False  | Force uppercased text
lowercased  | boolean  | False  | Force lowercased text
indentation  | number  | 0  | Set text indentation
color | string | `themed` | Set text's color style. Can be hex string, default color name, or themed color name
initialAnimation | string, object | None  | See [Animation API](#animation-api) section for details
style | object | None | Standard React Native text style properties.

#### Text Components Public Methods Access Via Reference

Methods | description
--------|------------
animate | Do animation. See [Animation API](#animation-api)

```jsx
<HeadlineText size = 'large' color = 'default' > Headline Large </HeadlineText>
<HeadlineText size = 'normal' color = 'primary' > Headline Normal </HeadlineText>
<HeadlineText size = 'small' color = 'secondary' > Headline Small </HeadlineText>
```
```jsx
<TitleText size = 'large' color = 'default' > Headline Large </TitleText>
<TitleText size = 'normal' color = 'primary' > Headline Normal </TitleText>
<TitleText size = 'small' color = 'secondary' > Headline Small </TitleText>
```

```jsx
<SubtitleText size = 'large' color = 'default' > Headline Large </SubtitleText>
<SubtitleText size = 'normal' color = 'primary' > Headline Normal </SubtitleText>
<SubtitleText size = 'small' color = 'secondary' > Headline Small </SubtitleText>
```

```jsx
<InfoText size = 'large' color = 'default' > Headline Large </InfoText>
<InfoText size = 'normal' color = 'primary' > Headline Normal </InfoText>
<InfoText size = 'small' color = 'secondary' > Headline Small </InfoText>
```

```jsx
<CaptionText size = 'large' color = 'default' > Headline Large </CaptionText>
<CaptionText size = 'normal' color = 'primary' > Headline Normal </CaptionText>
<CaptionText size = 'small' color = 'secondary' > Headline Small </CaptionText>
```

## Screen Components

<p align="center">
    <img width="35%" height="35%" src="/assets/screen-records/header-screens.gif">
</p>

Hypertoxin has two screen components, [*BodyScreen*](https://github.com/tuantle/hypertoxin/blob/develop/src/components/screens/body-screen.js), [*HeaderScreen*](https://github.com/tuantle/hypertoxin/blob/develop/src/components/screens/header-screen.js)

#### Header Screen Properties

Prop | Type | Default | description
-----|------|---------|------------
shade | string, object | `themed` | Set header screen's shade theme, can be `themed`, `light`, or `dark`
overlay | string | `themed` | Set header screen's overplay style which can be one of `themed`, `opaque`, `translucent`, `translucent-outline`, `transparent`, `transparent-outline`
size  | string  | `themed`  | Set header screen's size which can be one of `themed`, `small`, `normal`, `large`
dropShadowed | boolean, string | `themed` | Enable header screen's drop shadow
coverImageSource | | |
label  | string  | None | Set header screen's label
initialAnimation | string, object | None  | See [Animation API](#animation-api) section for details
style | object | None | Header screen style is an object with the following properties: `container: {...}, status: {...}, navigation: {...}, contentLeftRoom: {...}, contentMiddleRoom: {...}, contentRightRoom: {...}, mediaRoom: {...}, label: {...}`. Standard React Native style properties go inside these properties. Changes to these properties will override the global theme. See [default style object](https://github.com/tuantle/hypertoxin/blob/5d52bd4b55f810a27386516a958d398881f57133/src/components/screens/header-screen.js#L62)
onHideNavigation | function | None | Called when header screen's navigator view becomes hidden
onShowNavigation | function | None | Called when header screen's  navigator view becomes visible
onHideMedia | function | None | Called when header screen's media view becomes hidden
onShowMedia | function | None | Called when header screen's media view  becomes visible

#### Header Screen Child View Compositions

<p align="center">
    <img width="50%" height="50%" src="/assets/images/header-screen-compositions.png">
</p>

#### Header Screen Animated Component References

RefName | description
--------|------------
`animated-container-view` | Reference name of header screen animated container child view
`animated-navigation-room-view` |
`animated-content-left-room-view` |
`animated-content-middle-room-view` |
`animated-content-right-room-view` |
`animated-media-room-view` |

#### Body Screen Properties

Prop | Type | Default | description
-----|------|---------|------------
shade | string, object | `themed` | Set body screen's shade theme, can be `themed`, `light`, or `dark`
coverImageSource | React Native image source | None | Background cover image source
contentTopRoomAlignment | string | `none` | Child component top room property, which can be one of `none`, `start`, `center`, `end`, or `stretch`
contentMiddleRoomAlignment | string | `none` | Child component middle room property, which can be one of `none`, `start`, `center`, `end`, or `stretch`
contentBottomRoomAlignment | string | `none` | Child component bottom room property, which can be one of `none`, `start`, `center`, `end`, or `stretch`
scrollable | boolean | False | Enable to allow scrolling
keyboardAvoiding | boolean | False | Enable to allow keyboard avoiding. Works best with `scrollable = true`
style | object | None | Body screen style is an object with the following properties: `container: {...}, contentTopRoom: {...}, contentMiddleRoom: {...}, contentBottomRoom: {...}`. Standard React Native style properties go inside these properties. Changes to these properties will override the global theme. See [default style object](https://github.com/tuantle/hypertoxin/blob/29ebfe7ccf97fc934f56287afd1b8bffebf4bea0/src/components/screens/body-screen.js#L54)
onScroll | function | None | Called when scrolling with `scrollable = true`

#### Body Screen Child View Compositions

<p align="center">
    <img width="50%" height="50%" src="/assets/images/body-screen-compositions.png">
</p>

#### Body Screen Animated Component References

RefName | description
--------|------------
`animated-content-top-room-view` |
`animated-content-middle-room-view` |
`animated-content-bottom-room-view` |

#### Header Screen Examples

<p align="center">
    <img width="50%" height="50%" src="/assets/screenshots/header-screen-small.png">
    <img width="50%" height="50%" src="/assets/screenshots/header-screen-normal.png">
    <img width="50%" height="50%" src="/assets/screenshots/header-screen-large.png">
</p>
<p align="center">
    <em>Header screen in 3 available sizes with default theme</em>
</p>

```jsx
<HeaderScreen
    // size = `small`
    size = `normal`
    // size = `large`
    label = 'HEADER SCREEN'
>
    <FlatButton room = 'content-left' overlay = 'transparent' corner = 'circular' onPress = {() => navigation.toggleDrawer()}>
        <IconImage room = 'content-middle' source = 'menu' />
    </FlatButton>
</HeaderScreen>
```

<p align="center">
    <img width="50%" height="50%" src="/assets/screenshots/header-screen-with-media.png">
</p>
<p align="center">
    <em>Header screen with media</em>
</p>

```jsx
<HeaderScreen shade = 'light' label = 'HEADER SCREEN' >
    <FlatButton room = 'content-left' overlay = 'transparent' corner = 'circular' onPress = {() => navigation.toggleDrawer()}>
        <IconImage room = 'content-middle' source = 'menu' />
    </FlatButton>
    <ColumnLayout room = 'media' overlay = 'opaque' roomAlignment = 'center' corner = 'sharp' >
        <HeadlineText room = 'content-left' shade = 'light' size = 'small' indentation = { 10 }> Media section </HeadlineText>
        <FlatButton room = 'content-right' overlay = 'transparent-outline' corner = 'circular' size = 'small' label = 'BUTTON A' color = { Theme.color.palette.teal } margin = { 10 }/>
        <FlatButton room = 'content-right' overlay = 'transparent-outline' corner = 'circular' size = 'small' label = 'BUTTON B' color = { Theme.color.palette.teal } margin = { 10 }/>
    </ColumnLayout>
</HeaderScreen>
```

<p align="center">
    <img width="50%" height="50%" src="/assets/screenshots/header-screen-with-search-field.png">
</p>
<p align="center">
    <em>Header screen with icon button and search field</em>
</p>

```jsx
<HeaderScreen shade = 'light' >
    <FlatButton room = 'content-left' overlay = 'transparent' corner = 'circular' onPress = {() => navigation.toggleDrawer()} >
        <IconImage room = 'content-middle' source = 'menu' />
    </FlatButton>
    <SearchField room = 'content-middle' exclusions = {[ `size` ]} size = 'small' hint = 'Search...' dropShadowed = { false } initiallyCollapsed = { false } suggestive = { false }>
        <FlatButton room = 'content-left' overlay = 'transparent' corner = 'circular' >
            <IconImage room = 'content-middle' source = 'search' />
        </FlatButton>
        <FlatButton room = 'content-right' action = 'clear' overlay = 'transparent' corner = 'circular' >
            <IconImage room = 'content-middle' source = 'cancel' />
        </FlatButton>
    </SearchField>
    <FlatButton room = 'content-right' overlay = 'transparent' corner = 'circular' >
        <IconImage room = 'content-middle' size = 'large' source = 'info' />
    </FlatButton>
</HeaderScreen>
```

<p align="center">
    <img width="50%" height="50%" src="/assets/screenshots/header-screen-profile.png">
</p>
<p align="center">
    <em>An example of user profile header screen</em>
</p>

```jsx
<HeaderScreen shade = 'light' overlay = 'transparent' coverImageSource = { require(`../../../assets/images/geometric-wallpaper.png`) } label = 'PROFILE' >
    <FlatButton room = 'content-left' overlay = 'transparent' corner = 'circular' onPress = {() => navigation.toggleDrawer()}>
        <IconImage room = 'content-middle' source = 'menu' />
    </FlatButton>
    <ColumnLayout room = 'media' overlay = 'transparent' roomAlignment = 'center' corner = 'sharp' >
        <AvatarImage room = 'content-left' source = { require(`../../../assets/images/fox.png`) } size = 'large' dropShadowed = { false }
            margin = {{
                vertical: 5,
                right: 10
            }}
        />
        <RowLayout room = 'content-left' overlay = 'transparent'
            margin = {{
                vertical: 5,
                right: 10
            }}
        >
            <TitleText room = 'content-top' shade = 'light' size = 'small' > Mr. Fantastic Fox </TitleText>
            <SubtitleText room = 'content-middle' > A cool fox! </SubtitleText>
        </RowLayout>
        <FlatButton room = 'content-right' overlay = 'transparent-outline' corner = 'circular' size = 'small' label = 'LIKE' color = { Theme.color.palette.teal }
            margin = {{
                right: 10,
                vertical: 5
            }}
        />
    </ColumnLayout>
    <FlatButton room = 'content-right' overlay = 'transparent' corner = 'circular' >
        <IconImage room = 'content-middle' size = 'large' source = 'info' />
    </FlatButton>
</HeaderScreen>
```

## Layout Components

<p align="center">
    <img width="35%" height="35%" src="/assets/screen-records/row-layout.gif">
    <img width="35%" height="35%" src="/assets/screen-records/column-layout.gif">
</p>

Hypertoxin has two layout components, [*RowLayout*](https://github.com/tuantle/hypertoxin/blob/develop/src/components/layouts/row-layout.js), [*ColumnLayout*](https://github.com/tuantle/hypertoxin/blob/develop/src/components/layouts/column-layout.js)

#### Row Layout Properties

Prop | Type | Default | description
-----|------|---------|------------
exclusions | [string] | [] | Set which properties from parent component to ignore or exclude
room | string | `none` | Set row layout's room with respect to parent component which can be one of `none`, `content-left`, `content-middle`, `content-right`, `content-bottom`, `content-top`, `media`
shade | string, object | `themed` | Set row layout's shade theme, can be `themed`, `light`, or `dark`
overlay | string | `themed` | Set row layout's overplay style which can be one of `themed`, `opaque`, `translucent`, `translucent-outline`, `transparent`, `transparent-outline`
corner | string, number, object | `themed` | Set row layout's corner styles. As a number, corner is a scaler where border radius = corner * size. Set corner as an object for more control. For example `corner = { topLeft: 0.1, topRight: 0.1, bottomLeft: 0.1, bottomRight: 0.1}`
margin | string, number, object | None | Set row layout's margin styles. As a number, the margin is equally set around the layout. Set margin as an object for more control. For example `margin = { top: 5, bottom: 5, left: 5, right: 5, horizontal: 5, vertical: 5}`
color | string | `themed` | Set row layout's color style. Can be hex string, default color name, or themed color name
dropShadowed | boolean, string | `themed` | Enable row layout's drop shadow
roomAlignment | string | `none` | Component self's room property with respect to parent component's room, which can be one of `none`, `start`, `center`, `end`, or `stretch`
contentTopRoomAlignment | string | `none` | Child component top room property, which can be one of `none`, `start`, `center`, `end`, or `stretch`
contentMiddleRoomAlignment | string | `none` | Child component middle room property, which can be one of `none`, `start`, `center`, `end`, or `stretch`
contentBottomRoomAlignment | string | `none` | Child component bottom room property, which can be one of `none`, `start`, `center`, `end`, or `stretch`
scrollable | boolean | False | Enable to allow scrolling
initialAnimation | string, object | None  | See [Animation API](#animation-api) section for details
style | object | None | Header screen style is an object with the following properties: `container: {...}, contentTopRoom: {...}, contentMiddleRoom: {...}, contentBottomRoom: {...}`. Standard React Native style properties go inside these properties. Changes to these properties will override the global theme. See [default style object](https://github.com/tuantle/hypertoxin/blob/29ebfe7ccf97fc934f56287afd1b8bffebf4bea0/src/components/layouts/row-layout.js#L61)
onScroll | function | None | Called when scrolling with `scrollable = true`

#### Row Layout Child View Compositions

<p align="center">
    <img width="50%" height="50%" src="/assets/images/row-layout-compositions.png">
</p>

#### Row Layout Animated Component References

RefName | description
--------|------------
`animated-container-view` | Reference name of row layout animated container child view
`animated-content-top-room-view` |
`animated-content-middle-room-view` |
`animated-content-bottom-room-view` |

#### Column Layout Properties

Prop | Type | Default | description
-----|------|---------|------------
exclusions | [string] | [] | Set which properties from parent component to ignore or exclude
room | string | `none` | Set column layout's room with respect to parent component which can be one of `none`, `content-left`, `content-middle`, `content-right`, `content-bottom`, `content-top`, `media`
shade | string, object | `themed` | Set column layout's shade theme, can be `themed`, `light`, or `dark`
overlay | string | `themed` | Set column layouy's overplay style which can be one of `themed`, `opaque`, `translucent`, `translucent-outline`, `transparent`, `transparent-outline`
corner | string, number, object | `themed` | Set column layout's corner styles. As a number, corner is a scaler where border radius = corner * size. Set corner as an object for more control. For example `corner = { topLeft: 0.1, topRight: 0.1, bottomLeft: 0.1, bottomRight: 0.1}`
margin | string, number, object | None | Set column layout's margin styles. As a number, the margin is equally set around the layout. Set margin as an object for more control. For example `margin = { top: 5, bottom: 5, left: 5, right: 5, horizontal: 5, vertical: 5}`
color | string | `themed` | Set column layout's color style. Can be hex string, default color name, or themed color name
dropShadowed | boolean, string | `themed` | Enable column layout's drop shadow
roomAlignment | string | `none` | Component self's room property with respect to parent component's room, which can be one of `none`, `start`, `center`, `end`, or `stretch`
contentLeftRoomAlignment | string | `none` | Child component left room property, which can be one of `none`, `start`, `center`, `end`, or `stretch`
contentMiddleRoomAlignment | string | `none` | Child component middle room property, which can be one of `none`, `start`, `center`, `end`, or `stretch`
contentRightRoomAlignment | string | `none` | Child component right room property, which can be one of `none`, `start`, `center`, `end`, or `stretch`
scrollable | boolean | False | Enable to allow scrolling
initialAnimation | string, object | None  | See [Animation API](#animation-api) section for details
style | object | None | Header screen style is an object with the following properties: `container: {...}, contentLeftRoom: {...}, contentMiddleRoom: {...}, contentRightRoom: {...}`. Standard React Native style properties go inside these properties. Changes to these properties will override the global theme. See [default style object](https://github.com/tuantle/hypertoxin/blob/29ebfe7ccf97fc934f56287afd1b8bffebf4bea0/src/components/layouts/column-layout.js#L61)
onScroll | function | None | Called when scrolling with `scrollable = true`

#### Column Layout Child View Compositions

<p align="center">
    <img width="50%" height="50%" src="/assets/images/column-layout-compositions.png">
</p>

#### Column Layout Animated Component References

RefName | description
--------|------------
`animated-container-view` | Reference name of column animated container child view
`animated-content-left-room-view` |
`animated-content-middle-room-view` |
`animated-content-right-room-view` |

## Image Components

Hypertoxin has three image components, [*AvatarImage*](https://github.com/tuantle/hypertoxin/blob/develop/src/components/images/avatar-image.js), [*IconImage*](https://github.com/tuantle/hypertoxin/blob/develop/src/components/images/icon-image.js), and [*CoverImage*](https://github.com/tuantle/hypertoxin/blob/develop/src/components/images/cover-image.js)

#### Avatar Image Properties

Prop | Type | Default | description
-----|------|---------|------------
exclusions | [string] | [] | Set which properties from parent component to ignore or exclude
room | string | `none` | Set avatar image's room with respect to parent component which can be one of `none`, `content-left`, `content-middle`, `content-right`, `content-bottom`, `content-top`, `media`, `activity-indicator`
shade | string, object | `themed` | Set avatar image's shade theme, can be `themed`, `light`, or `dark`
overlay | string | `themed` | Set avatar image's overplay style which can be one of `themed`, `opaque`, `translucent`, `translucent-outline`, `transparent`, `transparent-outline`
size  | string  | `themed`  | Set avatar image's size which can be one of `themed`, `small`, `normal`, `large`
margin | string, number, object | None | Set avatar image's margin styles. As a number, the margin is equally set around avatar image container. Set margin as an object for more control. For example `margin = { top: 5, bottom: 5, left: 5, right: 5, horizontal: 5, vertical: 5}`
dropShadowed | boolean, string | `themed` | Enable avatar image drop shadow
color | string | `themed` | Set avatar's color style. Can be hex string, default color name, or themed color name
source | React Native image source | None | Image source
defaultSource | React Native image source | None | Image source
initialAnimation | string, object | None  | See [Animation API](#animation-api) section for details
style | object | None | Standard React Native style properties. Changes to these properties will override the global theme. See [default style object](https://github.com/tuantle/hypertoxin/blob/29ebfe7ccf97fc934f56287afd1b8bffebf4bea0/src/components/images/avatar-image.js#L56)

#### Icon Image Properties

Prop | Type | Default | description
-----|------|---------|------------
exclusions | [string] | [] | Set which properties from parent component to ignore or exclude
room | string | `none` | Set icon image's room with respect to parent component which can be one of `none`, `content-left`, `content-middle`, `content-right`, `content-bottom`, `content-top`, `media`, `activity-indicator`
shade | string, object | `themed` | Set icon image's shade theme, can be `themed`, `light`, or `dark`
size  | string  | `themed`  | Set icon image's size which can be one of `themed`, `small`, `normal`, `large`
margin | string, number, object | None | Set icon image's margin styles. As a number, the margin is equally set around icon image container. Set margin as an object for more control. For example `margin = { top: 5, bottom: 5, left: 5, right: 5, horizontal: 5, vertical: 5}`
dropShadowed | boolean, string | `themed` | Enableicon image drop shadow
color | string | `themed` | Set icon image's color style. Can be hex string, default color name, or themed color name
source | React Native image source | None | Image source
defaultSource | React Native image source | None | Image source
initialAnimation | string, object | None  | See [Animation API](#animation-api) section for details
style | object | None | Standard React Native style properties. Changes to these properties will override the global theme. See [default style object](https://github.com/tuantle/hypertoxin/blob/29ebfe7ccf97fc934f56287afd1b8bffebf4bea0/src/components/images/icon-image.js#L52)

#### Cover Image Properties

Prop | Type | Default | description
-----|------|---------|------------
exclusions | [string] | [] | Set which properties from parent component to ignore or exclude
room | string | `none` | Set cover image's room with respect to parent component which can be one of `none`, `content-left`, `content-middle`, `content-right`, `content-bottom`, `content-top`, `media`, `activity-indicator`
shade | string, object | `themed` | Set cover image's shade theme, can be `themed`, `light`, or `dark`
margin | string, number, object | None | Set cover image's margin styles. As a number, the margin is equally set around icon image container. Set margin as an object for more control. For example `margin = { top: 5, bottom: 5, left: 5, right: 5, horizontal: 5, vertical: 5}`
width | | |
height | | |
corner | string, number, object | `themed` | Set cover image's corner styles. As a number, corner is a scaler where border radius = corner * size. Set corner as an object for more control. For example `corner = { topLeft: 0.1, topRight: 0.1, bottomLeft: 0.1, bottomRight: 0.1}`
dropShadowed | boolean, string | `themed` | Enable cover image drop shadow
resizeMode | string | `contain` | React Native image resize property
source | React Native image source | None | Image source
defaultSource | React Native image source | None | Image source
style | object | None | Standard React Native style properties. Changes to these properties will override the global theme. See [default style object](https://github.com/tuantle/hypertoxin/blob/29ebfe7ccf97fc934f56287afd1b8bffebf4bea0/src/components/images/cover-image.js#L56)


#### Avatar Image Examples

<p align="center">
    <img width="50%" height="50%" src="/assets/screenshots/avatar-images.png">
</p>
<p align="center">
    <em>Avatar images in 3 available sizes with colors defined by global theme</em>
</p>

```jsx
<AvatarImage source = { require(`../../../assets/images/fox.png`) } size = 'small' color = 'default' dropShadowed = { true }/>
<AvatarImage source = { require(`../../../assets/images/fox.png`) } size = 'normal' color = 'primary' dropShadowed = { true }/>
<AvatarImage source = { require(`../../../assets/images/fox.png`) } size = 'large' color = 'secondary' dropShadowed = { true }/>
```
<p align="center">
    <img width="50%" height="50%" src="/assets/screenshots/avatar-images-with-outlines.png">
</p>
<p align="center">
    <em>Same but with border outlines</em>
</p>

```jsx
<AvatarImage source = { require(`../../../assets/images/fox.png`) } overlay = 'transparent-outline' size = 'small' color = 'default' />
<AvatarImage source = { require(`../../../assets/images/fox.png`) } overlay = 'transparent-outline' size = 'normal' color = 'primary' />
<AvatarImage source = { require(`../../../assets/images/fox.png`) } overlay = 'transparent-outline' size = 'large' color = 'secondary' />
```

#### Icon Image Examples

<p align="center">
    <img width="50%" height="50%" src="/assets/screenshots/icon-images.png">
</p>
<p align="center">
    <em>Some icon images with various colors</em>
</p>

```jsx
<IconImage source = 'socialShare' color = 'default' dropShadowed = { false }margin = { 10 }/>
<IconImage source = 'facebook' color = 'default' dropShadowed = { false } margin = { 10 }/>
<IconImage source = 'twitter' color = 'primary' dropShadowed = { false } margin = { 10 }/>
<IconImage source = 'googlePlus' color = 'primary' dropShadowed = { false } margin = { 10 }/>
<IconImage source = 'github' color = 'secondary' dropShadowed = { false } margin = { 10 }/>
<IconImage source = 'home' color = 'secondary' dropShadowed = { false } margin = { 10 }/>
<IconImage source = 'profile' color = 'accent' dropShadowed = { false } margin = { 10 }/>
<IconImage source = 'ellipsis' color = 'accent' dropShadowed = { false } margin = { 10 }/>
```

## Divider Components

Hypertoxin has two divider components, [*HorizontalDivider*](https://github.com/tuantle/hypertoxin/blob/develop/src/components/dividers/horizontal-divider.js), [*VeriticalDivider*](https://github.com/tuantle/hypertoxin/blob/develop/src/components/dividers/vertical-divider.js)

#### Divider (Horizontal and Vertical) Properties

Prop | Type | Default | description
-----|------|---------|------------
exclusions | [string] | [] | Set which properties from parent component to ignore or exclude
room | string | `none` | Set divider's room with respect to parent component which can be one of `none`, `content-left`, `content-middle`, `content-right`, `content-bottom`, `content-top`, `media`
shade | string, object | `themed` | Set divider shade theme, can be `themed`, `light`, or `dark`
thickness | number, string | `themed` | Set divider line thickness
edgeToEdge | boolean | false | Force divider line to the edges of screen
margin | string, number, object | None | Set text field's margin styles. As a number, the margin is equally set around text field container. Set margin as an object for more control. For example `margin = { top: 5, bottom: 5, left: 5, right: 5, horizontal: 5, vertical: 5}`
color | string | `themed` | Set divider's color style. Can be hex string, default color name, or themed color name
style | object | None | Standard React Native view style properties

## Using Room Property

Rooms are predefined child views of the button container view. The reason for this is to keep JSX code short and concise while maintaining a consistent theme for all buttons globally.

For example, JSX code for a flat button with left and right icons using `room` property.

```jsx
<FlatButton overlay = 'opaque' size = 'small' label = 'SMALL' color = 'primary' >
    <IconImage room = 'content-left' source = 'home' />
    <IconImage room = 'content-right' source = 'profile' />
</FlatButton>
```

JSX code for a flat button with left and right icons without using `room` property.

```jsx
<FlatButton overlay = 'opaque' size = 'small' label = 'SMALL' color = 'primary' >
    <View style = { leftChildViewStyle }>
        <IconImage source = 'home' />
    </VIew>
    <View style = { rightChildViewStyle }>
        <IconImage source = 'profile' />
    </VIew>
</FlatButton>
```

## Animation API

In Hypertoxin component library, all components, except for HorizontalDivider, VeriticalDivider, and CoverImage, have an `animate` method and an `initialAnimation` property. At it core, Hypertoxin uses [react-native-animatable](https://github.com/oblador/react-native-animatable) library for animation transistion.

#### Property `initialAnimation`

This property is set for initial component animation right after mounting. It can be either a string or an object. As a object, this property has a PropTypes shape of:

```js
PropTypes.shape({
    refName: PropTypes.string,
    transitions: PropTypes.arrayOf(PropTypes.shape({
        to: PropTypes.object,
        from: PropTypes.object,
        option: PropTypes.shape({
            duration: PropTypes.number,
            delay: PropTypes.number,
            easing: PropTypes.string
        })
    })),
    onTransitionBegin: PropTypes.func,
    onTransitionEnd: PropTypes.func,
    onAnimationBegin: PropTypes.func,
    onAnimationEnd: PropTypes.func
})
```

Where `refName` is reference name of animated child content component. See child component reference names above. And `transitions` is an array of transition object that has `to`, `from`, and `option` properties. From contains the starting transition animation style, and to contains the ending transition animation style. See [react-native-animatable](https://github.com/oblador/react-native-animatable) documentation for more details.

#### Method `animate`

All animatable components have an animate method which take an animation object as arg that is the same as the `initialAnimation` property described above.

```js
function animate (animation = {
    refName,
    transitions,
    onTransitionBegin,
    onTransitionEnd,
    onAnimationBegin,
    onAnimationEnd
}) {
    ...
};
```

Now to see how use the animate method, let's do a simple send mail button animation shown here below.

<p align="center">
    <img width="25%" height="25%" src="/assets/screen-records/button-animation2.gif">
</p>

The animation sequences of this button are onPress -> fade out SEND label and email icon -> fade in activity indicator and button in busy mode -> fade out activity indicator -> fade in SENT label with different color and a check icon to the left.
First let's create a raised button inside some other parent component. The parent component with track the raised button ref with `raisedButtonRef`, and also have two states, `mailSent` and `sendingMail`.
Property `color` switches value that depends on the state mailSent. Property `label`

```js
<RaisedButton
    ref = {(componentRef) => {
        component.raisedButtonRef = componentRef;
    }}
    busy = { sendingMail }
    rippled = { false }
    room = 'content-right'
    color = { mailSent ? `secondary` : `accent` }
    label = { mailSent ? `SENT` : sendingMail ? `` : `SEND` }
    margin = { 10 }
>
    <ActivityIndicator
        room = 'activity-indicator'
        size = 'small'
        color = { Theme.color.palette.pink }
    />
    <IconImage
        room = 'content-left'
        source = { !mailSent ? `email` : `check` }
    />
</RaisedButton>
```

Next, defines the onPress button that triggers the animation sequences.

```js
onPress = {() => {
    if (!mailSent) {
        // Fade out the left email icon
        component.raisedButtonRef.animate({
            refName: `animated-content-left-room-view`,
            transitions: [{
                from: { opacity: 1 },
                to: { opacity: 0 },
                option: { duration: 300 }
            }]
        });
        // Fade out the center label
        component.raisedButtonRef.animate({
            refName: `animated-content-middle-room-view`,
            transitions: [{
                from: { opacity: 1 },
                to: { opacity: 0 },
                option: { duration: 300 }
            }],
            onAnimationEnd: () => {
                component.setState(() => { sendingMail: true }, () => {
                    // Let the activity indicator runs for 2s. Using setTimeout to emulate waiting for server response.
                    setTimeout(() => {
                        component.setState(() => { mailSent: true, sendingMail: false }, () => {
                            // Fade in the check icon
                            component.raisedButton1Ref.animate({
                                refName: `animated-content-left-room-view`,
                                transitions: [{
                                    from: { opacity: 0 },
                                    to: { opacity: 1 },
                                    option: { duration: 300 }
                                }]
                            });
                            // Fade in the center label
                            component.raisedButton1Ref.animate({
                                refName: `animated-content-middle-room-view`,
                                transitions: [{
                                    from: { opacity: 0 },
                                    to: { opacity: 1 },
                                    option: { duration: 300 }
                                }]
                            });
                        });
                    }, 2000);
                });
            }
        });
    }
}}
```

Below are a few more examples of animations and code.

<p align="center">
    <img width="25%" height="25%" src="/assets/screen-records/button-animation1.gif">
</p>
<p align="center">
    <em>An example of animation sequences of payment submit button.</em>
    <a href="https://github.com/tuantle/hypertoxin/blob/c61f4bf96ac92efb550fb5264404f72cc0e1443f/demo/src/components/animation-views/example2-animation-view.js#L121"><em>Source</em></a>
</p>

<p align="center">
    <img width="10%" height="10%" src="/assets/screen-records/button-animation3.gif">
</p>
<p align="center">
    <em>An example of animation sequences of an expanding FAB menu.</em>
    <a href="https://github.com/tuantle/hypertoxin/blob/c61f4bf96ac92efb550fb5264404f72cc0e1443f/demo/src/components/animation-views/example2-animation-view.js#L444"><em>Source</em></a>
</p>

<p align="center">
    <img width="25%" height="25%" src="/assets/screen-records/button-animation4.gif">
</p>
<p align="center">
    <em>An example of animation sequences for popup menu.</em>
    <a href="https://github.com/tuantle/hypertoxin/blob/c61f4bf96ac92efb550fb5264404f72cc0e1443f/demo/src/components/animation-views/example2-animation-view.js#L675"><em>Source</em></a>
</p>

<p align="center">
    <img width="25%" height="25%" src="/assets/screen-records/header-screen-animations.gif">
</p>
<p align="center">
    <em>An example of animation sequences for header screen entry & exit.</em>
    <a href="https://github.com/tuantle/hypertoxin/blob/develop/demo/src/components/animation-views/example1-animation-view.js"><em>Source</em></a>
</p>

## Global Theme Customization

Hypertoxin gloabl theme is highly customizable and one of the way to make your own customized theme is to modify the default theme. For example, import the `Theme` object from `hyperflow` as `DefaultTheme`.

```js
import { ThemeContext, Theme as DefaultTheme } from 'hyperflow';
```
Next modify the DefaultTheme object using standard object destructuring method. For example, adding a customized global button corner theme called `semi-sharp`

```js
const MyTheme = {
    ...DefaultTheme,
    button: {
        ...DefaultTheme.button,
        flat: {
            ...DefaultTheme.button.flat,
            corner: `semi-round`
        },
        raised: {
            ...DefaultTheme.button.raised,
            corner: `semi-round`
        },
        corner: {
            ...DefaultTheme.button.corner,
            flat: {
                ...DefaultTheme.button.corner.flat,
                semiRound: 0.1
            },
            raised: {
                ...DefaultTheme.button.corner.raised,
                semiRound: 0.1
            }

        }
    }
};
```

Or using lodash library merge function.

```js
const MyTheme = _.merge(DefaultTheme, {
    button: {
        flat: {
            corner: `semi-round`
        },
        raised: {
            corner: `semi-round`
        },
        corner: {
            flat: {
                semiRound: 0.1
            },
            raised: {
                semiRound: 0.1
            }

        }
    }
});
```

# Change Log
- Link to [change log](https://github.com/tuantle/hypertoxin/tree/develop/CHANGELOG.md)

# License

Hyperflow is [MIT licensed](./LICENSE).

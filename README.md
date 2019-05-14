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

* * *

-   [Documentations](#documentations)
    -   [Button Components](#button-components)
    -   [Field Components](#field-components)
    -   [Text Components](#text-components)
    -   [Image Components](#image-components)
    -   [Layout Components](#layout-components)
    -   [Screen Components](#screen-components)
    -   [Using Room Property](#using-room-property)
    -   [Using Action Property](#using-action-property)
    -   [Using Exclusions Property](##using-exclusions-property)
    -   [Animation API](#animation-api)
    -   [Theme Customization](#theme-customization)
-   [Todo](#todo)
-   [Change Log](#change-log)
-   [License](#license)

* * *

# Installation

```bash
$ npm install hypertoxin --save
```

# Demo & Showcase

Hypertoxin comes with a full demo that you can build and run on your device or simulator. All of the code examples in this README are from the demo. To build the demo for iOS,

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

// All current available components with more to come. See todo list.
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

* * *

# Documentations

Documeantations are still WIP.

## Button Components

<p align="center">
    <img width="35%" height="35%"  src="/assets/screen-records/buttons.gif">
</p>

Hypertoxin has three button components, [_FlatButton_](https://github.com/tuantle/hypertoxin/blob/develop/src/components/buttons/flat-button.js), [_RaisedButton_](https://github.com/tuantle/hypertoxin/blob/develop/src/components/buttons/raised-button.js), and [_AreaButton_](https://github.com/tuantle/hypertoxin/blob/develop/src/components/buttons/area-button.js)

#### Flat Button Properties

A standard button component that can be styled as an icon, a clear, or simply a flat opaque button.

| Prop             | Type                   | Default  | Description |
| ---------------- | ---------------------- | -------- | -----------
| exclusions       | array of string        | []       | Set which properties from parent component to exclude. See [Using Exclusions Property](#using-exclusions-property) section for details |
| room             | string                 | `none`   | Set button's room with respect to parent component which can be one of `none`, `content-left`, `content-middle`, `content-right`, `content-bottom`, `content-top`, `media`. See [Using Room Property](#using-room-property) section for details |
| action           | string, object         | `none`   | Set button's onPress callback action to be defined by the parent component. This property is used when a button is set as a child search button for parent components such as SearchField, TextField, or HeaderScreen. See [Using Action Property](#using-action-property) section for details |
| shade            | string, object         | `themed` | Set button's shade theme, can be `themed`, `light`, or `dark` |
| overlay          | string                 | `themed` | Set button's overlay style which can be one of `themed`, `opaque`, `translucent`, `translucent-outline`, `transparent`, `transparent-outline` |
| corner           | string, number, object | `themed` | Set button's corner styles. As a number, corner is a scaler where border radius = corner size. Set corner as an object for more control. For example `corner = { topLeft: 0.1, topRight: 0.1, bottomLeft: 0.1, bottomRight: 0.1}` |
| size             | string                 | `themed` | Set button's size which can be one of `themed`, `small`, `normal`, `large` |
| margin           | string, number, object | None     | Set button's margin styles. As a number, the margin is equally set around the button. Set margin as an object for more control. For example `margin = { top: 5, bottom: 5, left: 5, right: 5, horizontal: 5, vertical: 5}` |
| disabled         | boolean                | false    | Disable the button |
| busy             | boolean                | false    | Enable button busy activity indicator |
| rippled          | boolean, string        | `themed` | Enable button ripple animation |
| label            | string                 | None     | Button string label |
| color            | string                 | `themed` | Set button's color style. Can be hex string, default color name, or themed color name |
| debounced        | boolean                | false    | Enable button debouncing at 250 ms |
| onPress          | function               | None     | Calls when button is pressed |
| style            | object                 | None     | Flat button style is an object with the following properties: `container: {...}, contentLeftRoom: {...}, contentMiddleRoom: {...}, contentRightRoom: {...}, badgeRoom: {...}, activityIndicatorRoom: {...}, label: {...}, ripple: {...}`. Standard React Native style properties go inside these properties. Changes to these properties will override the global theme. See [default style object](https://github.com/tuantle/hypertoxin/blob/c61f4bf96ac92efb550fb5264404f72cc0e1443f/src/components/buttons/flat-button.js#L53) |

#### Raised Button Properties

Raised button is similar to flat button with the exceptions that it has permanent drop shadow and opaque color.

| Prop             | Type                   | Default  | Description |
| ---------------- | ---------------------- | -------- | ----------- |
| exclusions       | array of string        | []       | Set which properties from parent component to exclude. See [Using Exclusions Property](#using-exclusions-property) section for details |
| room             | string                 | `none`   | Set button's room with respect to parent component which can be one of `none`, `content-left`, `content-middle`, `content-right`, `content-bottom`, `content-top`, `media`. See [Using Room Property](#using-room-property) section for details |
| action           | string, object         | `none`   | Set button's onPress callback action to be defined by the parent component. This property is used when a button is set as a child search button for parent components such as SearchField, TextField, or HeaderScreen. See [Using Action Property](#using-action-property) section for details |
| shade            | string, object         | `themed` | Set button's shade theme, can be `themed`, `light`, or `dark` |
| corner           | string, number, object | `themed` | Set button's corner styles. As a number, corner is a scaler where border radius = corner size. Set corner as an object for more control. For example `corner = { topLeft: 0.1, topRight: 0.1, bottomLeft: 0.1, bottomRight: 0.1}` |
| size             | string                 | `themed` | Set button's size which can be one of `themed`, `small`, `normal`, `large` |
| margin           | string, number, object | None     | Set button's margin styles. As a number, the margin is equally set around the button. Set margin as an object for more control. For example `margin = { top: 5, bottom: 5, left: 5, right: 5, horizontal: 5, vertical: 5}` |
| disabled         | boolean                | false    | Disable the button |
| busy             | boolean                | false    | Enable button busy activity indicator |
| rippled          | boolean, string        | `themed` | Enable button ripple animation |
| label            | string                 | None     | Button string label |
| color            | string                 | `themed` | Set button's color style. Can be hex string, default color name, or themed color name |
| debounced        | boolean                | false    | Enable button debouncing at 250 ms |
| onPress          | function               | None     | Calls when button is pressed |
| style            | object                 | None     | Raised button style is an object with the following properties: `container: {...}, contentLeftRoom: {...}, contentMiddleRoom: {...}, contentRightRoom: {...}, badgeRoom: {...}, activityIndicatorRoom: {...}, label: {...}, ripple: {...}`. Standard React Native style properties go inside these properties. Changes to these properties will override the global theme. See [default style object](https://github.com/tuantle/hypertoxin/blob/c61f4bf96ac92efb550fb5264404f72cc0e1443f/src/components/buttons/raised-button.js#L63) |

#### Area Button Properties

Unlike flat or raised button, area button was intended mainly as a list item component. Therefore it works nicely as a selectable item in a typical list view.

| Prop             | Type                   | Default  | Description |
| ---------------- | ---------------------- | -------- | ----------- |
| exclusions       | array of string        | []       | Set which properties from parent component to exclude. See [Using Exclusions Property](#using-exclusions-property) section for details |
| room             | string                 | `none`   | Set button's room with respect to parent component which can be one of `none`, `content-left`, `content-middle`, `content-right`, `content-bottom`, `content-top`, `media`. See [Using Room Property](#using-room-property) section for details |
| action           | string, object         | `none`   | Set button's onPress callback action to be defined by the parent component. This property is used when a button is set as a child search button for parent components such as SearchField, TextField, or HeaderScreen. See [Using Action Property](#using-action-property) section for details |
| shade            | string, object         | `themed` | Set button's shade theme, can be `themed`, `light`, or `dark` |
| overlay          | string                 | `themed` | Set button's overlay style which can be one of `themed`, `opaque`, `translucent`, `transparent` |
| size             | string                 | `themed` | Set button's size which can be one of `themed`, `small`, `normal`, `large` |
| margin           | string, number, object | None     | Set button's margin styles. As a number, the margin is equally set around the button. Set margin as an object for more control. For example `margin = { top: 5, bottom: 5, left: 5, right: 5, horizontal: 5, vertical: 5}` |
| disabled         | boolean                | false    | Disable the button |
| rippled          | boolean, string        | `themed` | Enable button ripple animation |
| debounced        | boolean                | false    | Enable button debouncing at 250 ms |
| onPress          | function               | None     | Calls when button is pressed |
| style            | object                 | None     | Area button style is an object with the following properties: `container: {...}, contentLeftRoom: {...}, contentRightRoom: {...}, ripple: {...}`. Unlike flat and raised buttons, there is no middle room styling. Standard React Native style properties go inside these properties. Changes to these properties will override the global theme. See [default style object](https://github.com/tuantle/hypertoxin/blob/c61f4bf96ac92efb550fb5264404f72cc0e1443f/src/components/buttons/area-button.js#L55) |

_Note: `themed` property indicates using values defined by the global theme provider._

By default, flat, raised, and area button components pass `shade`, `size`, `color` (flat & raised only), and `disabled` properties down to their child components and at the same time set `margin = { 0 }` and `indentation = { 0 }` properties onto its children. This behavior can be override by child components with the `exclusions` property. . See [Using Exclusions Property](#using-exclusions-property) section for details.

# ---

<p align="center">
    <img width="50%" height="50%" src="/assets/images/flat-raised-button-compositions.png">
</p>
<p align="center">
    <em>Flat & raised button internal view compositions diagram</em>
</p>

<p align="center">
    <img width="50%" height="50%" src="/assets/images/area-button-compositions.png">
</p>
<p align="center">
    <em>Area button internal view compositions diagram</em>
</p>

Flat & raised button animated internal view composition reference names. See [Animation API](#animation-api) for details:

-   `animated-container-view`
-   `animated-content-left-room-view`
-   `animated-content-middle-room-view`
-   `animated-content-right-room-view`
-   `animated-activity-indicator-room-view`
-   `animated-badge-room-view`

Area button animated internal view composition reference names. See [Animation API](#animation-api) for details:

-   `animated-container-view`
-   `animated-content-left-room-view`
-   `animated-content-right-room-view`

Flat, raised & area button methods & callbacks:

-   `animate` - See [Animation API](#animation-api) for details
-   `onPress` - Button press callback
    *   arguments:
        -   `event` (object) - React Native event
    *   return: None

# ---

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

Internally, a room is just a convenient way for creating child Views, thus allowing the JSX code to be less clutter and much more declarative.

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

# ---

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

# ---

#### Area Button Examples

<p align="center">
    <img width="50%" height="50%" src="/assets/screen-records/area-buttons.gif">
</p>
<p align="center">
    <em>Using area button to create selectable list items</em>
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

Hypertoxin has two field components, [_TextField_](https://github.com/tuantle/hypertoxin/blob/develop/src/components/fields/text-field.js) and [_SearchField_](https://github.com/tuantle/hypertoxin/blob/develop/src/components/fields/search-field.js)

#### Search Field Properties

Use search field to create functional search bar. Notable feature is suggestion pull-up view.

| Prop                      | Type                               | Default  | Description |
| ------------------------- | ---------------------------------- | -------- | ----------- |
| exclusions                | array of string                    | []       | Set which properties from parent component to exclude. See [Using Exclusions Property](#using-exclusions-property) section for details |
| room                      | string                             | `none`   | Set search field's room with respect to parent component which can be one of `none`, `content-left`, `content-middle`, `content-right`, `content-bottom`, `content-top`, `media`. See [Using Room Property](#using-room-property) section for details  |
| shade                     | string, object                     | `themed` | Set search field's shade theme, can be `themed`, `light`, or `dark` |
| overlay                   | string                             | `themed` | Set search field's overlay style which can be one of `themed`, `opaque`, `translucent`, `translucent-outline`, `transparent`, `transparent-outline` |
| corner                    | string, number, object             | `themed` | Set search field's corner styles. As a number, corner is a scaler where border radius = corner size. Set corner as an object for more control. For example `corner = { topLeft: 0.1, topRight: 0.1, bottomLeft: 0.1, bottomRight: 0.1}` |
| size                      | string                             | `themed` | Set search field's size which can be one of `themed`, `small`, `normal`, `large` |
| margin                    | string, number, object             | None     | Set search field's margin styles. As a number, the margin is equally set around search field container. Set margin as an object for more control. For example `margin = { top: 5, bottom: 5, left: 5, right: 5, horizontal: 5, vertical: 5}` |
| dropShadowed              | boolean, string                    | `themed` | Enable search field's container drop shadow |
| autoFocus                 | boolean                            | true     | Enable search field's auto focus |
| autoCorrect               | boolean                            | true     | Enable search field's auto correct spelling |
| suggestive                | boolean                            | true     | Enable search field's suggestion pull-up view |
| pinnedSuggestionValues    | array of string, number, or object | []       | A list of pinned suggestion values |
| hint                      | string                             | None     | Set search field's hint |
| style                     | object                             | None     | Search field style is an object with the following properties: `container: {...}, box, {...}, contentLeftRoom: {...}, contentRightRoom: {...}, input: {...}, suggestion: {...}`. Standard React Native style properties go inside these properties. Changes to these properties will override the global theme. See [default style object](https://github.com/tuantle/hypertoxin/blob/c61f4bf96ac92efb550fb5264404f72cc0e1443f/src/components/fields/search-field.js#L68) |
| onSearch                  | function                           | None     | Calls after search field's text input onSubmitEditing |
| onGetAutocompletionValues | async function                     | None     | Async retrieve autocompletion string value array for suggestion pull-up view |
| onEditing                 | function                           | None     | Calls when search field's text input onChangeText  |
| onFocus                   | function                           | None     | Calls after search field's text input is focused |
| onBlur                    | function                           | None     | Calls after search field's text input is blurred |
| onCollapse                | function                           | None     | Calls after search field view collapsed |
| onExpand                  | function                           | None     | Calls after search field view expanded |
| onHide                    | function                           | None     | Calls when search field view becomes hidden |
| onShow                    | function                           | None     | Calls when search field view becomes visible  |
| onHideSuggestion          | function                           | None     | Calls when search field's suggestion view becomes hidden |
| onShowSuggestion          | function                           | None     | Calls when search field's suggestion view becomes visible |
| onClear                   | function                           | None     | Calls after search field's text input is cleared |
| onClearSuggestion         | function                           | None     | Calls after search field's suggestion is clear |
| renderSuggestionItem      | function                           | None     | Takes an item from a list of suggestion items (pinned, autocompleted, & history) and renders them into the list in pull-up suggestion view |

#### Text Field Properties

Use text fields to create beautiful input forms. Notable features are input reformatting & validation and selectable pull-up view.

| Prop                 | Type                                | Default   | Description |
| -------------------- | ----------------------------------- | --------- | ----------- |
| exclusions           | array of string                     | []        | Set which properties from parent component to exclude. See [Using Exclusions Property](#using-exclusions-property) section for details  |
| room                 | string                              | `none`    | Set text field's room with respect to parent component which can be one of `none`, `content-left`, `content-middle`, `content-right`, `content-bottom`, `content-top`, `media`. See [Using Room Property](#using-room-property) section for details  |
| shade                | string, object                      | `themed`  | Set text field's shade theme, can be `themed`, `light`, or `dark` |
| overlay              | string                              | `themed`  | Set text field's overlay style which can be one of `themed`, `opaque`, `translucent`, `translucent-outline`, `transparent`, `transparent-outline` |
| corner               | string, number, object              | `themed`  | Set text field's corner styles. As a number, corner is a scaler where border radius = corner size. Set corner as an object for more control. For example `corner = { topLeft: 0.1, topRight: 0.1, bottomLeft: 0.1, bottomRight: 0.1}` |
| size                 | string                              | `themed`  | Set text field's size which can be one of `themed`, `small`, `normal`, `large` |
| margin               | string, number, object              | None      | Set text field's margin styles. As a number, the margin is equally set around text field container. Set margin as an object for more control. For example `margin = { top: 5, bottom: 5, left: 5, right: 5, horizontal: 5, vertical: 5}` |
| autoFocus            | boolean                             | true      | Enable text field's auto focus |
| autoCorrect          | boolean                             | true      | Enable text field's auto correct spelling |
| secured              | boolean                             | false     | Enable text field's secure mode |
| underlined           | boolean, string                     | `themed`  | Enable text field's underlined animation |
| disabled             | boolean                             | false     | Disable text field's input |
| initialValue         | string, number                      | None      | Set text input's initial value |
| selectableValues     | array of string, number, or object  | []        | A list of selectable values |
| label                | string                              | None      | Set text field's label |
| hint                 | string                              | None      | Set text field's hint |
| charLimit            | number                              | -1        | Set text input's max characters count. Set charLimit > -1 for no character limit. When charLimit > 1, a little character counter will be visible in the bottom right |
| lineLimit            | number                              | 1         | Set text input's max lines count. Set lineLimit > 1 for multi-lined text input |
| inputType            | string                              | `default` | Set text input's type which can be one of `default`, `numeric`, `monetary`, `phone-pad`, `email-address`, `credit-card-visa`, `credit-card-master`, `credit-card-discover`, `credit-card-american-express` |
| disableValidation    | bool                                | false     | Disable text input validation |
| disableFormatting    | bool                                | false     | Disable text input formatting |
| style                | object                              | None      | Text field style is an object with the following properties: `container: {...}, box: {...}, contentLeftRoom: {...}, contentRightRoom: {...}, input: {...}, helper: {...}, status: {...}, label: {...}, underline: {...}, selection: {...}`. Standard React Native style properties go inside these properties. Changes to these properties will override the global theme. See [default style object](https://github.com/tuantle/hypertoxin/blob/c61f4bf96ac92efb550fb5264404f72cc0e1443f/src/components/fields/text-field.js#L55) |
| onValidate           | function                            | None      | Calls after text field's text input onChangeText or onEndEditing |
| onReformat             | function                          | None      | Calls after text field's text input onChangeText |
| onEditing            | function                            | None      | Calls when text field's text input onChangeText |
| onDoneEdit           | function                            | None      | Calls when a value in text field's selectable pull-up view is selected or after text field's text input onSubmitEditing |
| onSelect             | function                            | None      | Calls when a value in text field's selectable pull-up view is selected |
| onFocus              | function                            | None      | Calls after text field's text input is focused |
| onBlur               | function                            | None      | Calls after text field's text input is blurred |
| onHideSelection      | function                            | None      | Calls after text field's selectable pull-up view is hidden |
| onShowSelection      | function                            | None      | Calls after text field's selectable pull-up view is visible |
| onClear              | function                            | None      | Calls after text field's text input is cleared |
| renderSelectableItem | function                            | None      | Takes an item from a list of selectable items and renders them into the list in pull-up selection view |

_Note: `themed` property indicates using values defined by the global theme provider._

By default, text field component passes `shade`, `size`, and `disabled` properties down to it child components and at the same time set `margin = { 0 }` and `indentation = { 0 }` properties onto its children. By default, search field component passes `shade` property down to it child components and at the same time set `margin = { 0 }` and `indentation = { 0 }` properties onto its children. This behavior can be override by child components with the `exclusions` property. See [Using Exclusions Property](#using-exclusions-property) section for details.

# ---

<p align="center">
    <img width="50%" height="50%" src="/assets/images/search-field-compositions.png">
</p>
<p align="center">
    <em>Search field internal view compositions diagram</em>
</p>

Search field animated internal view composition reference names. See [Animation API](#animation-api) for details:

-   `animated-container-view`
-   `animated-box-view`
-   `animated-content-left-room-view`
-   `animated-content-right-room-view`
-   `animated-suggestion-view`

Search field available actions:

-   `search`
-   `clear`
-   `expand`
-   `collapse`
-   `show`
-   `hide`

Search field methods & callbacks:

-   `animate` - See [Animation API](#animation-api) for details
-   `isCollapsed`
    *   arguments: None
    *   return: bool
-   `isVisible`
    *   arguments: None
    *   return: bool
-   `isSuggestionVisible`
    *   arguments: None
    *   return: bool
-   `isFocused`
    *   arguments: None
    *   return: bool
-   `collapse`
    *   arguments:
        -   `animation` (object) - Collapse animation object. See [Animation API](#animation-api) for details.
    *   return: None
-   `expand`
    *   arguments:
        -   `animation` (object) - Expand animation object. See [Animation API](#animation-api) for details
    *   return: None
-   `show`
    *   arguments:
        -   `animation` (object) - Show animation object. See [Animation API](#animation-api) for details
    *   return: None
-   `hide`
    *   arguments:
        -   `animation` (object) - Hide animation object. See [Animation API](#animation-api) for details
    *   return: None
-   `focus`
    *   arguments: None
    *   return: None
-   `blur`
    *   arguments: None
    *   return: None
-   `clear`
    *   arguments: None
    *   return: None
-   `clearSuggestion`
    *   arguments: None
    *   return: None
-   `onSearch`
    *   arguments:
        -   `value` (string) - Submitted search text value
    *   return: None
-   `onGetAutocompletionValues` (async)
    *   arguments:
        -   `value` (string) - Submitted search text value
    *   return:
        -   results (array) - An array of autocompletion text values
-   `onEditing`
    *   arguments:
        -   `value` (string) - Current search text value
    *   return: None
-   `onFocus`
    *   arguments: None
    *   return: None
-   `onBlur`
    *   arguments: None
    *   return: None
-   `onCollapse`
    *   arguments: None
    *   return: None
-   `onExpand`
    *   arguments: None
    *   return: None
-   `onHide`
    *   arguments: None
    *   return: None
-   `onShow`
    *   arguments: None
    *   return: None
-   `onHideSuggestion`
    *   arguments: None
    *   return: None
-   `onShowSuggestion`
    *   arguments: None
    *   return: None
-   `onClear`
    *   arguments: None
    *   return: None
-   `onClearSuggestion`
    *   arguments: None
    *   return: None
-   `renderSuggestionItem` - Render the suggestion item component
    *   arguments:
        -   `item` (object) - Suggestion item
        -   `onPressSelectAndSubmit` - Callback to indicate which item was selected and then submitted
            *   arguments:
                -   `item` - Selected item
            *   return: None
        -   `onPressSelect` - Callback to indicate which item was selected
            *   arguments:
                -   `item` - Selected item
            *   return: None
    *   return - Component

# ---

<p align="center">
    <img width="50%" height="50%" src="/assets/images/text-field-compositions.png">
</p>
<p align="center">
    <em>Text field internal view compositions diagram</em>
</p>

Text field animated internal view composition reference names. See [Animation API](#animation-api) for details:

-   `animated-container-view`
-   `animated-box-view`
-   `animated-label-text`
-   `animated-underline-focused-view`
-   `animated-content-left-room-view`
-   `animated-content-right-room-view`
-   `animated-selection-view`

Text field available actions:

-   clear
-   show-selection
-   hide-selection

Text field methods & callbacks:

-   `animate` - See [Animation API](#animation-api) for details
-   `isValidated` - Check if text input's value is validated
    *   arguments: None
    *   return: bool
-   `isSelectionVisible` - Check if selectable pull-up view is visible
    *   arguments: None
    *   return: bool
-   `isFocused` - Check if text input's value is focused
    *   arguments: None
    *   return: bool
-   `showSelection` - Show selectable pull-up view if `selectableValues` is provided
    *   arguments: None
    *   return: None
-   `hideSelection` - Hide selectable pull-up view if `selectableValues` is provided
    *   arguments: None
    *   return: None
-   `focus` - Focus text input
    *   arguments: None
    *   return: None
-   `blur` - Blur text input
    *   arguments: None
    *   return: None
-   `clear` - Clear text input
    *   arguments: None
    *   return: None
-   `onValidate` - Calls after text field's text input onChangeText or onEndEditing. See [default onValidate](https://github.com/tuantle/hypertoxin/blob/c61f4bf96ac92efb550fb5264404f72cc0e1443f/src/components/fields/text-field.js#L1022)
    *   arguments:
        -   `value` (string) - Current text value
        -   `inputType`
    *   return: object - Expects return object with a `validate` boolean property and a `status` string property
-   `onReformat` - Calls after text field's text input onChangeText. See [default onReformat](https://github.com/tuantle/hypertoxin/blob/c61f4bf96ac92efb550fb5264404f72cc0e1443f/src/components/fields/text-field.js#L1075)
    *   arguments:
        -   `value` (string) - Current text value
    *   return: string - Return reformatted value
-   `onEditing` - Calls when text field's text input onChangeText
    *   arguments:
        -   `value` (string) - Current text value
    *   return: None
-   `onDoneEdit` - Calls when a value in text field's selectable pull-up view is selected or after text field's text input onSubmitEditing
    *   arguments:
        -   `value` (string) - Current text value
    *   return: None
-   `onSelect` - Calls when a value in text field's selectable pull-up view is selected
    *   arguments:
        -   `value` (string) - Selected value
    *   return: None
-   `onFocus`
    *   arguments: None
    *   return: None
-   `onBlur`
    *   arguments: None
    *   return: None
-   `onHideSelection`
    *   arguments: None
    *   return: None
-   `onShowSelection`
    *   arguments: None
    *   return: None
-   `onClear`
    *   arguments: None
    *   return: None
-   `renderSelectableItem` - Render an item from a list of selectable items and renders them into the list in pull-up selection view.See below for examples

# ---

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

# ---

#### Text Field Examples

<p align="center">
    <img width="35%" height="35%" src="/assets/screen-records/text-field-login.gif">
</p>
<p align="center">
    <em>Using Text field to create simple logins</em>
</p>

```jsx
<TextField label = 'EMAIL' hint = 'user@gmail.com' inputType = 'email-address' >
    <IconImage room = 'content-left' source = 'email' />
    <FlatButton room = 'content-right' overlay = 'transparent' action = 'clear' corner = 'circular' >
        <IconImage room = 'content-middle' source = 'cancel' />
    </FlatButton>
</TextField>
<TextField secured = { true } label = 'PASSWORD' >
    <IconImage room = 'content-left' source = 'lock' />
    <FlatButton room = 'content-right' overlay = 'transparent' action = 'clear' corner = 'circular' >
        <IconImage room = 'content-middle' source = 'cancel' />
    </FlatButton>
</TextField>
```

<p align="center">
    <img width="35%" height="35%" src="/assets/screen-records/text-field-multiline.gif">
</p>
<p align="center">
    <em>Using Text field to create a simple note</em>
</p>

```jsx
<TextField label = 'ADD NOTE' charLimit = { 128 } lineLimit = { 5 }>
    <FlatButton overlay = 'transparent' room = 'content-right' action = 'clear' corner = 'circular' >
        <IconImage room = 'content-middle' source = 'cancel' />
    </FlatButton>
</TextField>
```

<p align="center">
    <img width="35%" height="35%" src="/assets/screen-records/text-field-with-reformatting-validation.gif">
</p>
<p align="center">
    <em>Text field with reformatting and validation</em>
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
    onReformat = {(value) => {
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
    <em>Text field with selectable pull-up view</em>
</p>

```jsx
<TextField
    label = 'LABEL'
    selectableValues = {[ `VALUE A`, `VALUE B`, `VALUE C` ]}
    renderSelectableItem = {(item, onPressSelect) => {
        // item = {
        //     value: ...       String value of the selectable item
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

Hypertoxin has five text components, [_CaptionText_](https://github.com/tuantle/hypertoxin/blob/develop/src/components/texts/caption-text.js), [_InfoText_](https://github.com/tuantle/hypertoxin/blob/develop/src/components/texts/info-text.js), [_SubtitleText_](https://github.com/tuantle/hypertoxin/blob/develop/src/components/texts/subtitle-text.js), [_TitleText_](https://github.com/tuantle/hypertoxin/blob/develop/src/components/texts/title-text.js), [_HeadlineText_](https://github.com/tuantle/hypertoxin/blob/develop/src/components/texts/headline-text.js)

#### Text (Caption, Info, Subtitle, Title, & Headline) Properties

| Prop             | Type            | Default  | Description |
| ---------------- | --------------- | -------- | ----------- |
| exclusions       | array of string | []       | Set which properties from parent component to exclude. See [Using Exclusions Property](#using-exclusions-property) section for details |
| room             | string          | `none`   | Set text's room with respect to parent component which can be one of `none`, `content-left`, `content-middle`, `content-right`, `content-bottom`, `content-top`, `media`, `activity-indicator`. See [Using Room Property](#using-room-property) section for details |
| shade            | string, object  | `themed` | Set text shade theme, can be `themed`, `light`, or `dark` |
| size             | string          | `themed` | Set text font's size which can be one of `themed`, `small`, `normal`, `large` |
| alignment        | string          | `left`   | Set text's alignment which can be one of `left`, `center`, `right` |
| decoration       | string          | `none`   | Set text's decoration which can be one of `none`, `underline`, `line-through` |
| font             | string          | `themed` | Set text font's family which can be `themed` or font family name |
| uppercased       | boolean         | False    | Force uppercased text |
| lowercased       | boolean         | False    | Force lowercased text |
| indentation      | number          | 0        | Set text indentation |
| color            | string          | `themed` | Set text's color style. Can be hex string, default color name, or themed color name |
| style            | object          | None     | Standard React Native text style properties |

Text (caption, info, subtitle, title, & headline) animated internal view composition reference names. See [Animation API](#animation-api) for details:

-   `animated-text`

Text (caption, info, subtitle, title, & headline) methods & callbacks:

-   `animate` - See [Animation API](#animation-api) for details

# ---

#### Text (Caption, Info, Subtitle, Title, & Headline)

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

Hypertoxin has two screen components, [_BodyScreen_](https://github.com/tuantle/hypertoxin/blob/develop/src/components/screens/body-screen.js), [_HeaderScreen_](https://github.com/tuantle/hypertoxin/blob/develop/src/components/screens/header-screen.js)

#### Header Screen Properties

Use header screen to create navigation top bar.

| Prop             | Type                      | Default  | Description |
| ---------------- | ------------------------- | -------- | ----------- |
| shade            | string, object            | `themed` | Set header screen's shade theme, can be `themed`, `light`, or `dark` |
| overlay          | string                    | `themed` | Set header screen's overlay style which can be one of `themed`, `opaque`, `translucent`, `translucent-outline`, `transparent`, `transparent-outline` |
| size             | string                    | `themed` | Set header screen's size which can be one of `themed`, `small`, `normal`, `large` |
| dropShadowed     | boolean, string           | `themed` | Enable header screen's drop shadow |
| coverImageSource | React Native image source | None     | Header screen's background cover image source |
| label            | string                    | None     | Set header screen's label |
| style            | object                    | None     | Header screen style is an object with the following properties: `container: {...}, status: {...}, navigation: {...}, contentLeftRoom: {...}, contentMiddleRoom: {...}, contentRightRoom: {...}, mediaRoom: {...}, label: {...}`. Standard React Native style properties go inside these properties. Changes to these properties will override the global theme. See [default style object](https://github.com/tuantle/hypertoxin/blob/5d52bd4b55f810a27386516a958d398881f57133/src/components/screens/header-screen.js#L62) |
| onHideNavigation | function                  | None     | Calls when header screen's navigator view becomes hidden |
| onShowNavigation | function                  | None     | Calls when header screen's  navigator view becomes visible |
| onHideMedia      | function                  | None     | Calls when header screen's media view becomes hidden |
| onShowMedia      | function                  | None     | Calls when header screen's media view  becomes visible |

#### Body Screen Properties

| Prop                       | Type                      | Default  | Description |
| -------------------------- | ------------------------- | -------- | ----------- |
| shade                      | string, object            | `themed` | Set body screen's shade theme, can be `themed`, `light`, or `dark` |
| coverImageSource           | React Native image source | None     | Body screen's background cover image source |
| contentTopRoomAlignment    | string                    | `none`   | Child component top room property, which can be one of `none`, `start`, `center`, `end`, or `stretch` |
| contentMiddleRoomAlignment | string                    | `none`   | Child component middle room property, which can be one of `none`, `start`, `center`, `end`, or `stretch` |
| contentBottomRoomAlignment | string                    | `none`   | Child component bottom room property, which can be one of `none`, `start`, `center`, `end`, or `stretch` |
| scrollable                 | boolean                   | False    | Enable to allow scrolling |
| keyboardAvoiding           | boolean                   | False    | Enable to allow keyboard avoiding. Works best with `scrollable = true` |
| style                      | object                    | None     | Body screen style is an object with the following properties: `container: {...}, contentTopRoom: {...}, contentMiddleRoom: {...}, contentBottomRoom: {...}`. Standard React Native style properties go inside these properties. Changes to these properties will override the global theme. See [default style object](https://github.com/tuantle/hypertoxin/blob/29ebfe7ccf97fc934f56287afd1b8bffebf4bea0/src/components/screens/body-screen.js#L54) |
| onScroll                   | function                  | None     | Calls when scrolling with `scrollable = true` |

By default, header screen component passes `shade`, `size`, and `color` properties down to it child components and at the same time set `margin = { 0 }` and `indentation = { 0 }` properties onto its children. By default, body screen component passes `shade` property down to it child components. This behavior can be override by child components with the `exclusions` property. See [Using Exclusions Property](#using-exclusions-property) section for details.

# ---

<p align="center">
    <img width="50%" height="50%" src="/assets/images/header-screen-compositions.png">
</p>
<p align="center">
    <em>Header screen internal view compositions diagram</em>
</p>

Header screen animated internal view composition reference names. See [Animation API](#animation-api) for details:

-   `animated-container-view`
-   `animated-navigation-view`
-   `animated-content-left-room-view`
-   `animated-content-middle-room-view`
-   `animated-content-right-room-view`
-   `animated-media-room-view`

Header screen available actions:

-   `show-media`
-   `hide-media`

Header screen methods & callbacks:

-   `animate` - See [Animation API](#animation-api) for details
-   `isNavigationVisible` - Check if header screen's navigation view is visible
    *   arguments: None
    *   return: bool
-   `isMediaVisible` - Check if header screen's media view is visible
    *   arguments: None
    *   return: bool
-   `hideNavigation`
    *   arguments:
        -   `animation` (object) - Hide animation object. See [Animation API](#animation-api) for details
    *   return: None
-   `showNavigation`
    *   arguments:
        -   `animation` (object) - Hide animation object. See [Animation API](#animation-api) for details
    *   return: None
-   `showMedia`
    *   arguments:
        -   `animation` (object) - Hide animation object. See [Animation API](#animation-api) for details
    *   return: None
-   `hideMedia`
    *   arguments:
        -   `animation` (object) - Hide animation object. See [Animation API](#animation-api) for details
    *   return: None
-   `onHideNavigation` - Calls when header screen's navigator view becomes hidden
    *   arguments: None
    *   return: None
-   `onShowNavigation` - Calls when header screen's  navigator view becomes visible
    *   arguments: None
    *   return: None
-   `onShowMedia` - Calls when header screen's media view becomes hidden
    *   arguments: None
    *   return: None
-   `onHideMedia` - Calls when header screen's media view  becomes visible
    *   arguments: None
    *   return: None

# ---

<p align="center">
    <img width="50%" height="50%" src="/assets/images/body-screen-compositions.png">
</p>
<p align="center">
    <em>Body screen internal view compositions diagram</em>
</p>

Body screen animated internal view composition reference names. See [Animation API](#animation-api) for details:

-   `animated-content-top-room-view`
-   `animated-content-middle-room-view`
-   `animated-content-bottom-room-view`

Body screen methods & callbacks:

-   `animate` - See [Animation API](#animation-api) for details
-   `onScroll` - Calls when scrolling with `scrollable = true`
    *   arguments:
        -   `scrollEvent` (object): Scroll event object with the following schema:
            -   `direction` (number): 1 = scrolling up, 0 = no scrolling, -1 = scrolling down
    *   return: None

# ---

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

# ---

#### Body Screen Examples

Below is an example of a basic app view that consists of a header and body screen where the render function returns an array of header and body screen component.

```jsx
render () {
    return ([
        <HeaderScreen key = 'header-screen' label = 'MY APP' />,
        <BodyScreen key = 'body-screen'>
            <HeadlineText room = 'content-top' size = 'large'> Hello World! </HeadlineText>
        </BodyScreen>
    ]);
}
```

Another example where you want the header screen to minimize (hide navigation view) when the body screen is scrolling down and maximize when scrolling up. This is achieved calling hideNavigation & showNavigation functions inside the onScroll callback of body screen component. onScroll provides scrolling direction that determines when to call hideNavigation or showNavigation function. 

```jsx
render () {
    return ([
        <HeaderScreen key = 'header-screen' label = 'MY APP'
            ref = {(componentRef) => {
                this.headerScreenRef = componentRef;
            }}
        />,
        <BodyScreen key = 'body-screen' scrollable = { true }
            onScroll = {({
                direction
            }) => {
                if (direction === -1 && this.headerScreenRef.isNavigationVisible()) {
                    this.headerScreenRef.hideNavigation();
                }
                if (direction === 1 && !this.headerScreenRef.isNavigationVisible()) {
                    this.headerScreenRef.showNavigation();
                }
            }}
        >
            <HeadlineText room = 'content-top' size = 'large'> Hello World! </HeadlineText>
        </BodyScreen>
    ]);
}
```

## Layout Components

<p align="center">
    <img width="35%" height="35%" src="/assets/screen-records/row-layout.gif">
    <img width="35%" height="35%" src="/assets/screen-records/column-layout.gif">
</p>

Hypertoxin has two layout components, [_RowLayout_](https://github.com/tuantle/hypertoxin/blob/develop/src/components/layouts/row-layout.js), [_ColumnLayout_](https://github.com/tuantle/hypertoxin/blob/develop/src/components/layouts/column-layout.js)

#### Row Layout Properties

| Prop                       | Type                   | Default  | Description |
| -------------------------- | ---------------------- | -------- | ----------- |
| exclusions                 | array of string        | []       | Set which properties from parent component to exclude. See [Using Exclusions Property](#using-exclusions-property) section for details |
| room                       | string                 | `none`   | Set row layout's room with respect to parent component which can be one of `none`, `content-left`, `content-middle`, `content-right`, `content-bottom`, `content-top`, `media`. See [Using Room Property](#using-room-property) section for details |
| shade                      | string, object         | `themed` | Set row layout's shade theme, can be `themed`, `light`, or `dark` |
| overlay                    | string                 | `themed` | Set row layout's overlay style which can be one of `themed`, `opaque`, `translucent`, `translucent-outline`, `transparent`, `transparent-outline` |
| corner                     | string, number, object | `themed` | Set row layout's corner styles. As a number, corner is a scaler where border radius = corner size. Set corner as an object for more control. For example `corner = { topLeft: 0.1, topRight: 0.1, bottomLeft: 0.1, bottomRight: 0.1}` |
| margin                     | string, number, object | None     | Set row layout's margin styles. As a number, the margin is equally set around the layout. Set margin as an object for more control. For example `margin = { top: 5, bottom: 5, left: 5, right: 5, horizontal: 5, vertical: 5}` |
| color                      | string                 | `themed` | Set row layout's color style. Can be hex string, default color name, or themed color name |
| dropShadowed               | boolean, string        | `themed` | Enable row layout's drop shadow |
| roomAlignment              | string                 | `none`   | Component self's room property with respect to parent component's room, which can be one of `none`, `start`, `center`, `end`, or `stretch` |
| contentTopRoomAlignment    | string                 | `none`   | Child component top room property, which can be one of `none`, `start`, `center`, `end`, or `stretch` |
| contentMiddleRoomAlignment | string                 | `none`   | Child component middle room property, which can be one of `none`, `start`, `center`, `end`, or `stretch` |
| contentBottomRoomAlignment | string                 | `none`   | Child component bottom room property, which can be one of `none`, `start`, `center`, `end`, or `stretch` |
| scrollable                 | boolean                | False    | Enable to allow scrolling |
| style                      | object                 | None     | Row layout style is an object with the following properties: `container: {...}, contentTopRoom: {...}, contentMiddleRoom: {...}, contentBottomRoom: {...}`. Standard React Native style properties go inside these properties. Changes to these properties will override the global theme. See [default style object](https://github.com/tuantle/hypertoxin/blob/29ebfe7ccf97fc934f56287afd1b8bffebf4bea0/src/components/layouts/row-layout.js#L61) |
| onScroll                   | function               | None     | Calls when scrolling with `scrollable = true`. Takes scroll direction object as argument |

#### Column Layout Properties

| Prop                       | Type                   | Default  | Description |
| -------------------------- | ---------------------- | -------- | ----------- |
| exclusions                 | array of string        | []       | Set which properties from parent component to exclude. See [Using Exclusions Property](#using-exclusions-property) section for details |
| room                       | string                 | `none`   | Set column layout's room with respect to parent component which can be one of `none`, `content-left`, `content-middle`, `content-right`, `content-bottom`, `content-top`, `media`. See [Using Room Property](#using-room-property) section for details |
| shade                      | string, object         | `themed` | Set column layout's shade theme, can be `themed`, `light`, or `dark` |
| overlay                    | string                 | `themed` | Set column layout's overlay style which can be one of `themed`, `opaque`, `translucent`, `translucent-outline`, `transparent`, `transparent-outline` |
| corner                     | string, number, object | `themed` | Set column layout's corner styles. As a number, corner is a scaler where border radius = corner size. Set corner as an object for more control. For example `corner = { topLeft: 0.1, topRight: 0.1, bottomLeft: 0.1, bottomRight: 0.1}` |
| margin                     | string, number, object | None     | Set column layout's margin styles. As a number, the margin is equally set around the layout. Set margin as an object for more control. For example `margin = { top: 5, bottom: 5, left: 5, right: 5, horizontal: 5, vertical: 5}` |
| color                      | string                 | `themed` | Set column layout's color style. Can be hex string, default color name, or themed color name |
| dropShadowed               | boolean, string        | `themed` | Enable column layout's drop shadow |
| roomAlignment              | string                 | `none`   | Component self's room property with respect to parent component's room, which can be one of `none`, `start`, `center`, `end`, or `stretch` |
| contentLeftRoomAlignment   | string                 | `none`   | Child component left room property, which can be one of `none`, `start`, `center`, `end`, or `stretch` |
| contentMiddleRoomAlignment | string                 | `none`   | Child component middle room property, which can be one of `none`, `start`, `center`, `end`, or `stretch` |
| contentRightRoomAlignment  | string                 | `none`   | Child component right room property, which can be one of `none`, `start`, `center`, `end`, or `stretch` |
| scrollable                 | boolean                | False    | Enable to allow scrolling |
| style                      | object                 | None     | Column layout style is an object with the following properties: `container: {...}, contentLeftRoom: {...}, contentMiddleRoom: {...}, contentRightRoom: {...}`. Standard React Native style properties go inside these properties. Changes to these properties will override the global theme. See [default style object](https://github.com/tuantle/hypertoxin/blob/29ebfe7ccf97fc934f56287afd1b8bffebf4bea0/src/components/layouts/column-layout.js#L61) |
| onScroll                   | function               | None     | Calls when scrolling with `scrollable = true`. Takes scroll direction object as argument |

By default, row and column layout components pass `shade` property down to their child components. This behavior can be override by child components with the `exclusions` property. See [Using Exclusions Property](#using-exclusions-property) section for details.

# ---

<p align="center">
    <img width="50%" height="50%" src="/assets/images/row-layout-compositions.png">
</p>
<p align="center">
    <em>Row layout internal view compositions diagram</em>
</p>

Row layout animated internal view composition reference names. See [Animation API](#animation-api) for details:

-   `animated-container-view`
-   `animated-content-top-room-view`
-   `animated-content-middle-room-view`
-   `animated-content-bottom-room-view`

Row layout methods & callbacks:

-   `animate` - See [Animation API](#animation-api) for details
-   `onScroll` - Calls when scrolling with `scrollable = true`
    *   arguments:
        -   `scrollEvent` (object): Scroll event object with the following schema:
            -   `direction` (number): 1 = scrolling up, 0 = no scrolling, -1 = scrolling down
    *   return: None

# ---

<p align="center">
    <img width="50%" height="50%" src="/assets/images/column-layout-compositions.png">
</p>
<p align="center">
    <em>Column layout internal view compositions diagram</em>
</p>

Column layout animated internal view composition reference names. See [Animation API](#animation-api) for details:

-   `animated-container-view`
-   `animated-content-left-room-view`
-   `animated-content-middle-room-view`
-   `animated-content-right-room-view`

Column layout  Methods & Callbacks:

-   `animate` - See [Animation API](#animation-api) for details
-   `onScroll` - Calls when scrolling with `scrollable = true`
    *   arguments:
        -   `scrollEvent` (object): Scroll event object with the following schema:
            -   `direction` (number): 1 = scrolling up, 0 = no scrolling, -1 = scrolling down
    *   return: None

## Image Components

Hypertoxin has three image components, [_AvatarImage_](https://github.com/tuantle/hypertoxin/blob/develop/src/components/images/avatar-image.js), [_IconImage_](https://github.com/tuantle/hypertoxin/blob/develop/src/components/images/icon-image.js), and [_CoverImage_](https://github.com/tuantle/hypertoxin/blob/develop/src/components/images/cover-image.js)

#### Avatar Image Properties

| Prop             | Type                      | Default  | Description |
| ---------------- | ------------------------- | -------- | ----------- |
| exclusions       | array of string           | []       | Set which properties from parent component to exclude. See [Using Exclusions Property](#using-exclusions-property) section for details |
| room             | string                    | `none`   | Set avatar image's room with respect to parent component which can be one of `none`, `content-left`, `content-middle`, `content-right`, `content-bottom`, `content-top`, `media`, `activity-indicator`. See [Using Room Property](#using-room-property) section for details |
| shade            | string, object            | `themed` | Set avatar image's shade theme, can be `themed`, `light`, or `dark` |
| overlay          | string                    | `themed` | Set avatar image's overlay style which can be one of `themed`, `opaque`, `translucent`, `translucent-outline`, `transparent`, `transparent-outline` |
| size             | string                    | `themed` | Set avatar image's size which can be one of `themed`, `small`, `normal`, `large` |
| margin           | string, number, object    | None     | Set avatar image's margin styles. As a number, the margin is equally set around avatar image container. Set margin as an object for more control. For example `margin = { top: 5, bottom: 5, left: 5, right: 5, horizontal: 5, vertical: 5}` |
| dropShadowed     | boolean, string           | `themed` | Enable avatar image drop shadow |
| color            | string                    | `themed` | Set avatar's color style. Can be hex string, default color name, or themed color name |
| source           | React Native image source | None     | Image source |
| defaultSource    | React Native image source | None     | Image source |
| style            | object                    | None     | Standard React Native style properties. Changes to these properties will override the global theme. See [default style object](https://github.com/tuantle/hypertoxin/blob/29ebfe7ccf97fc934f56287afd1b8bffebf4bea0/src/components/images/avatar-image.js#L56) |

#### Icon Image Properties

| Prop             | Type                      | Default  | Description |
| ---------------- | ------------------------- | -------- | ----------- |
| exclusions       | array of string           | []       | Set which properties from parent component to exclude. See [Using Exclusions Property](#using-exclusions-property) section for details |
| room             | string                    | `none`   | Set icon image's room with respect to parent component which can be one of `none`, `content-left`, `content-middle`, `content-right`, `content-bottom`, `content-top`, `media`, `activity-indicator`. See [Using Room Property](#using-room-property) section for details |
| shade            | string, object            | `themed` | Set icon image's shade theme, can be `themed`, `light`, or `dark` |
| size             | string                    | `themed` | Set icon image's size which can be one of `themed`, `small`, `normal`, `large` |
| margin           | string, number, object    | None     | Set icon image's margin styles. As a number, the margin is equally set around icon image container. Set margin as an object for more control. For example `margin = { top: 5, bottom: 5, left: 5, right: 5, horizontal: 5, vertical: 5}` |
| dropShadowed     | boolean, string           | `themed` | Enable icon image drop shadow |
| color            | string                    | `themed` | Set icon image's color style. Can be hex string, default color name, or themed color name |
| source           | React Native image source | None     | Image source |
| defaultSource    | React Native image source | None     | Image source |
| style            | object                    | None     | Standard React Native style properties. Changes to these properties will override the global theme. See [default style object](https://github.com/tuantle/hypertoxin/blob/29ebfe7ccf97fc934f56287afd1b8bffebf4bea0/src/components/images/icon-image.js#L52) |

#### Cover Image Properties

| Prop          | Type                      | Default   | Description |
| ------------- | ------------------------- | --------- | ----------- |
| exclusions    | array of string           | []        | Set which properties from parent component to exclude. See [Using Exclusions Property](#using-exclusions-property) section for details |
| room          | string                    | `none`    | Set cover image's room with respect to parent component which can be one of `none`, `content-left`, `content-middle`, `content-right`, `content-bottom`, `content-top`, `media`, `activity-indicator`. See [Using Room Property](#using-room-property) section for details |
| shade         | string, object            | `themed`  | Set cover image's shade theme, can be `themed`, `light`, or `dark` |
| margin        | string, number, object    | None      | Set cover image's margin styles. As a number, the margin is equally set around icon image container. Set margin as an object for more control. For example `margin = { top: 5, bottom: 5, left: 5, right: 5, horizontal: 5, vertical: 5}` |
| width         | number                    | None      | Set cover image's width |
| height        | number                    | None      | Set cover image's height  |
| corner        | string, number, object    | `themed`  | Set cover image's corner styles. As a number, corner is a scaler where border radius = corner size. Set corner as an object for more control. For example `corner = { topLeft: 0.1, topRight: 0.1, bottomLeft: 0.1, bottomRight: 0.1}` |
| dropShadowed  | boolean, string           | `themed`  | Enable cover image drop shadow |
| resizeMode    | string                    | `contain` | React Native image resize property |
| source        | React Native image source | None      | Image source |
| defaultSource | React Native image source | None      | Image source |
| style         | object                    | None      | Standard React Native style properties. Changes to these properties will override the global theme. See [default style object](https://github.com/tuantle/hypertoxin/blob/29ebfe7ccf97fc934f56287afd1b8bffebf4bea0/src/components/images/cover-image.js#L56) |

# ---

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

# ---

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

Hypertoxin has two divider components, [_HorizontalDivider_](https://github.com/tuantle/hypertoxin/blob/develop/src/components/dividers/horizontal-divider.js), [_VeriticalDivider_](https://github.com/tuantle/hypertoxin/blob/develop/src/components/dividers/vertical-divider.js)

#### Divider (Horizontal and Vertical) Properties

| Prop       | Type                   | Default  | Description |
| ---------- | ---------------------- | -------- | ----------- |
| exclusions | array of string        | []       | Set which properties from parent component to exclude. See [Using Exclusions Property](#using-exclusions-property) section for details |
| room       | string                 | `none`   | Set divider's room with respect to parent component which can be one of `none`, `content-left`, `content-middle`, `content-right`, `content-bottom`, `content-top`, `media`. See [Using Room Property](#using-room-property) section for details |
| shade      | string, object         | `themed` | Set divider shade theme, can be `themed`, `light`, or `dark` |
| thickness  | number, string         | `themed` | Set divider line thickness |
| edgeToEdge | boolean                | false    | Force divider line to the edges of screen |
| margin     | string, number, object | None     | Set text field's margin styles. As a number, the margin is equally set around text field container. Set margin as an object for more control. For example `margin = { top: 5, bottom: 5, left: 5, right: 5, horizontal: 5, vertical: 5}` |
| color      | string                 | `themed` | Set divider's color style. Can be hex string, default color name, or themed color name |
| style      | object                 | None     | Standard React Native view style properties |

## Using Room Property

Rooms are predefined child views of the component and because Hypertoxin is a themed component library, all layouts of child views with any component are retricted. And room property helps enforce this restriction. Another reason for this is to keep JSX code short and concise while maintaining a consistent theme for all buttons globally.
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
    <View style = {{
        flexDirection: `row`,
        alignItems: `center`,
        justifyContent: `center`,
        backgroundColor: `transparent`
    }}>
        <IconImage source = 'home' />
    </View>
    <View style = {{
        flexDirection: `row`,
        alignItems: `center`,
        justifyContent: `center`,
        backgroundColor: `transparent`
    }}>
        <IconImage source = 'profile' />
    </View>
</FlatButton>
```

## Using Action Property

This property is design as a short cut for attaching a specifics callback to the component. It help keeping the code less clutter. For example, text field component has a `clear` method and we want to connect `onPress` callback of the button component to the `clear` method. Without using `action` property, you would need to use reference like below.

```jsx
<TextField
    ref = {(componentRef) => {
        this.emailTextFieldRef = componentRef;
    }}
    label = 'EMAIL' hint = 'user@gmail.com' inputType = 'email-address'
>
    <IconImage room = 'content-left' source = 'email' />
    <FlatButton room = 'content-right' overlay = 'transparent' corner = 'circular'
        onPress = {() => this.emailTextFieldRef.clear()}
    >
        <IconImage room = 'content-middle' source = 'cancel' />
    </FlatButton>
</TextField>
```

But with `action` property, you only need to assign the action `clear` of the text field component to the child button component's `action` property. This make the JSX code a bit cleaner and shorter. See below.

```jsx
<TextField label = 'EMAIL' hint = 'user@gmail.com' inputType = 'email-address' >
    <IconImage room = 'content-left' source = 'email' />
    <FlatButton room = 'content-right' overlay = 'transparent' action = 'clear' corner = 'circular' >
        <IconImage room = 'content-middle' source = 'cancel' />
    </FlatButton>
</TextField>
```

## Using Exclusions Property

By default, parent component would pass down theme properties (`size`, `color`, etc) to child components. For example, if you want the icon image of the normal size button to be small, you must include `exclusions = {[ `size` ]}` so that the property `size = 'small'` of icon image component is not overwritten by the parent flat button component.

```jsx
<FlatButton overlay = 'opaque' size = 'normal' label = 'SMALL' color = 'primary' >
    <IconImage room = 'content-left' exclusions = {[ `size` ]} size = 'small' source = 'home' />
</FlatButton>
```

## Animation API

All components, except for HorizontalDivider, VeriticalDivider, and CoverImage, have an `animate` method. Internally, Hypertoxin uses [react-native-animatable](https://github.com/oblador/react-native-animatable) library for animation transition.

Method `animate` takes an object as argument with the following default property values.

*   arguments:
    -   `animation` (object) - Animation object that has the following schema:
        -   `refName` (string) - Animated reference name of cild component composite
        -   `transitions` (array) - An array of transition object with the following schema:
            -   `to` (object) - Transition to object
            -   `from` (object) - Transition from object
            -   `option` (object) - Transition option with the following schema:
                -   `duration` (number) - Transition duration (ms)
                -   `delay` (number) - Transition delay (ms)
                -   `easing` (string) - Transition easing. See react-native-animatable docs for all available easing types.
            -   `onTransitionBegin` (function) - Callback when a transition begins. Takes transition index as argument
            -   `onTransitionEnd` (function) - Callback when a transition ends. Takes transition index as argument
            -   `onAnimationBegin` (function) - Callback when an animation begins (before the first transition in sequence started)
            -   `onAnimationEnd` (function) - Callback when an animation ends  (after the last transition in sequence ended)
*   return: Promise

For a more elaborate animation sequence transitions, use `onTransitionBegin`, `onTransitionEnd`, `onAnimationBegin`, and `onAnimationEnd` callbacks to chain multiple animations together. The method also returns a promise that resolve between the transitions and animations which can be use if callback is not preferred.

Now to see how use the animate method, let's do a simple send mail button animation shown here below.

<p align="center">
    <img width="20%" height="20%" src="/assets/screen-records/button-animation2.gif">
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

## Theme Customization

Hypertoxin global theme is highly customizable and one of the way to make your own customized theme is to modify the default theme.

Default global theme object schema:

-   `name` (string) - Theme name
-   `color` (object) - [Default color theme object](https://github.com/tuantle/hypertoxin/blob/develop/src/themes/color-theme.js)
-   `font` (object) - [Default font theme object](https://github.com/tuantle/hypertoxin/blob/develop/src/themes/font-theme.js)
-   `misc` (object) - [Default misc theme object](https://github.com/tuantle/hypertoxin/blob/develop/src/themes/misc-theme.js)
-   `field` (object) - [Default field theme object](https://github.com/tuantle/hypertoxin/blob/develop/src/themes/field-theme.js)
-   `image` (object) - [Default image theme object](https://github.com/tuantle/hypertoxin/blob/develop/src/themes/image-theme.js)
-   `button` (object) - [Default button theme object](https://github.com/tuantle/hypertoxin/blob/develop/src/themes/button-theme.js)
-   `text` (object) - [Default text theme object](https://github.com/tuantle/hypertoxin/blob/develop/src/themes/text-theme.js)
-   `layout` (object) - [Default layout theme object](https://github.com/tuantle/hypertoxin/blob/develop/src/themes/layout-theme.js),
-   `screen` (object) - [Default screen theme object](https://github.com/tuantle/hypertoxin/blob/develop/src/themes/screen-theme.js)

For example, import the `Theme` object from `hyperflow` as `DefaultTheme`.

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

Or using [lodash](https://github.com/lodash/lodash) library merge function.

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

And to apply custom theme, simply set the top level ThemeContext provider value of your app.

```js
<ThemeContext.Provider value = {{ MyTheme }}>
    <App/>
</ThemeContext.Provider>
```

Hypertoxin demo has three custom themes that you can take a look for references. [Bubble Theme](https://github.com/tuantle/hypertoxin/blob/develop/demo/src/themes/bubble-theme.js), [Coffee Theme](https://github.com/tuantle/hypertoxin/blob/develop/demo/src/themes/coffee-theme.js), and [Wire Theme](https://github.com/tuantle/hypertoxin/blob/develop/demo/src/themes/wire-theme.js)

* * *

# Todo:

-   Use React Hooks
-   Add Switcher (Button group) component
-   Add expand/collapse actions to row and column layout components
-   More mockup app examples

# Change Log:

-   Link to [change log](https://github.com/tuantle/hypertoxin/tree/develop/CHANGELOG.md)

# License

Hyperflow is [MIT licensed](./LICENSE).

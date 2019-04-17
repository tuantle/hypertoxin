# Hypertoxin
[![npm version](https://img.shields.io/npm/v/hypertoxin.svg?style=flat)](https://www.npmjs.com/package/hypertoxin)
[![npm downloads](https://img.shields.io/npm/dm/hypertoxin.svg?style=flat-square)](https://www.npmjs.com/package/hypertoxin)
## A themeable and declarative React Native component library for developing native mobile apps.

Screenshots with some example themes.

<p align="center">
    <img width="25%" height="25%" src="/assets/screenshots/screenshot-6.png">
    <img width="25%" height="25%" src="/assets/screenshots/screenshot-5.png">
    <img width="25%" height="25%" src="/assets/screenshots/screenshot-7.png">
</p>

Dynamic theme switching.

<p align="center">
    <img width="25%" height="25%" src="/assets/screen-records/theme-switching.gif">
</p>

Mock up shopping app screenshots with default theme.

<p align="center">
    <img width="25%" height="25%" src="/assets/screenshots/screenshot-1.png">
    <img width="25%" height="25%" src="/assets/screenshots/screenshot-2.png">
</p>

Mock up shopping app screenshots with bubble theme.

<p align="center">
    <img width="25%" height="25%" src="/assets/screenshots/screenshot-3.png">
    <img width="25%" height="25%" src="/assets/screenshots/screenshot-4.png">
</p>

# Installation

`$ npm install hypertoxin --save`

# Usage

To animate things you must use the `createAnimatableComponent` composer similar to the `Animated.createAnimatedComponent`. The common components `View`, `Text` and `Image` are precomposed and exposed under the `Animatable` namespace. If you have your own component that you wish to animate, simply wrap it with a `Animatable.View` or compose it with:

```js
import React, { Component } from 'react';
import { Hf, ThemeContext, Theme as DefaultTheme } from 'hyperflow';

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

- [Documentations & Examples](#documentations)
    - [Button Components](#button-components)
    - [Field Components](#field-components)
    - [Text Components](#text-components)
    - [Image Components](#image-components)
    - [Layout Components](#layout-components)
    - [Screen Components](#screen-components)
    - [Animation API](#animation-api)
    - [Theme-customization](#text-components)
- [Demo](#demo)
- [Change Log](#change-log)
- [License](#license)

# Documentations

## Button Components

<p align="center">
    <img src="/assets/screen-records/buttons.gif">
</p>

Hypertoxin has three button components, [*FlatButton*](https://github.com/tuantle/hypertoxin/blob/master/src/components/buttons/flat-button.js), [*RaisedButton*](https://github.com/tuantle/hypertoxin/blob/master/src/components/buttons/raised-button.js), [*AreaButton*](https://github.com/tuantle/hypertoxin/blob/master/src/components/buttons/area-button.js)

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
style | object | None | Flat button style is an object with the following properties: `container: {...}, contentLeftRoom: {...}, contentMiddleRoom: {...}, contentRightRoom: {...}, badgeRoom: {...}, activityIndicatorRoom: {...}, label: {...}, ripple: {...}`. Standard React Native style properties go inside these properties. Changes to these properties will override the global theme

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
style | object | None | Raised button style is an object with the following properties: `container: {...}, contentLeftRoom: {...}, contentMiddleRoom: {...}, contentRightRoom: {...}, badgeRoom: {...}, activityIndicatorRoom: {...}, label: {...}, ripple: {...}`. Standard React Native style properties go inside these properties. Changes to these properties will override the global theme

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
style | object | None | Area button style is an object with the following properties: `container: {...}, contentLeftRoom: {...}, contentRightRoom: {...}, ripple: {...}`. Unlike flat and raised buttons, there is no middle room styling. Standard React Native style properties go inside these properties. Changes to these properties will override the global theme

*Note: `themed` propperty indicates using values defined by the global theme provider.*

By default, flat button component passes `shade`, `size`, and `color` properties down to it child components and at the same time set `margin = { 0 }` and `indentation = { 0 }` properties onto its children. This behaviour can be overide by child components with the `exclusions` property. For example, the icon image component below will not receice the `color = 'primary'` property from he parent button.

```jsx
<FlatButton overlay = 'opaque' size = 'small' label = 'SMALL' color = 'primary' >
    <IconImage exclusions = {[ `color` ]} room = 'content-left' source = 'home' />
</FlatButton>
```

#### Flat Button Examples

JSX code for standard flat buttons with colors defined by global theme.

<p align="center">
    <img width="50%" height="50%" src="/assets/screenshots/flat-buttons.png">
</p>

```jsx
<FlatButton overlay = 'opaque' label = 'BUTTON' color = 'default' />
<FlatButton overlay = 'opaque' label = 'BUTTON' color = 'primary' />
<FlatButton overlay = 'opaque' label = 'BUTTON' color = 'secondary' />
<FlatButton overlay = 'opaque' label = 'BUTTON' color = 'accent' />
```

And as clear buttons when styled with `overlay = 'transparent'` property. The component will adjust the label text color accordingly.

<p align="center">
    <img width="50%" height="50%" src="/assets/screenshots/clear-buttons.png">
</p>

```jsx
<FlatButton overlay = 'transparent' label = 'BUTTON' color = 'default' />
<FlatButton overlay = 'transparent' label = 'BUTTON' color = 'primary' />
<FlatButton overlay = 'transparent' label = 'BUTTON' color = 'secondary' />
<FlatButton overlay = 'transparent' label = 'BUTTON' color = 'accent' />
```

JSX code for flat buttons in 3 available sizes with icon images to the left.

<p align="center">
    <img width="50%" height="50%" src="/assets/screenshots/flat-buttons-with-l-icons.png">
</p>

And icon images to the right.

<p align="center">
    <img width="50%" height="50%" src="/assets/screenshots/flat-buttons-with-r-icons.png">
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

And similarly as clear buttons.

<p align="center">
    <img width="50%" height="50%" src="/assets/screenshots/clear-buttons-with-l-icons.png">
    <img width="50%" height="50%" src="/assets/screenshots/clear-buttons-with-r-icons.png">
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

A few examples of corner styling.

<p align="center">
    <img width="50%" height="50%" src="/assets/screenshots/flat-buttons-with-corners.png">
</p>

```jsx
<FlatButton overlay = 'opaque' label = 'BUTTON' color = 'primary' corner = 'sharp' />
<FlatButton overlay = 'opaque' label = 'BUTTON' color = 'secondary' corner = 'round' />
<FlatButton overlay = 'opaque' label = 'BUTTON' color = 'accent' corner = 'circular' />
```

To create a button with a badge, add a child text component (more details for InfoText component below) with a `room = 'badge'`.

<p align="center">
    <img width="25%" height="25%" src="/assets/screenshots/flat-button-with-badge.png">
</p>

```jsx
<FlatButton overlay = 'opaque' label = 'BUTTON' color = 'primary' >
    <InfoText room = 'badge' color = 'white' > 0 </InfoText>
    <IconImage room = 'content-left' source = 'home' />
</FlatButton>
```

Below are JSX code for flat outlined buttons when styled with `overlay = 'transparent-outline'` property

<p align="center">
    <img width="50%" height="50%" src="/assets/screenshots/flat-buttons-with-outlines.png">
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

Flat buttons styled as icon buttons.

<p align="center">
    <img width="50%" height="50%" src="/assets/screenshots/icon-buttons.png">
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

JSX code for standard raised buttons with colors defined by global theme.

<p align="center">
    <img width="50%" height="50%" src="/assets/screenshots/raised-buttons.png">
</p>

```jsx
<RaisedButton label = 'BUTTON' color = 'default' />
<RaisedButton label = 'BUTTON' color = 'primary' />
<RaisedButton label = 'BUTTON' color = 'secondary' />
<RaisedButton label = 'BUTTON' color = 'accent' />
```

JSX code for raised buttons in 3 available sizes with icon images to the left.

<p align="center">
    <img width="50%" height="50%" src="/assets/screenshots/raised-buttons-with-l-icons.png">
</p>

And icon images to the right.

<p align="center">
    <img width="50%" height="50%" src="/assets/screenshots/raised-buttons-with-r-icons.png">
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

A few examples of corner styling.

<p align="center">
    <img width="50%" height="50%" src="/assets/screenshots/raised-buttons-with-corners.png">
</p>

```jsx
<RaisedButton label = 'BUTTON' color = 'primary' corner = 'sharp' />
<RaisedButton label = 'BUTTON' color = 'secondary' corner = 'round' />
<RaisedButton label = 'BUTTON' color = 'accent' corner = 'circular' />
```

Raised buttons styled as FABs.

<p align="center">
    <img width="50%" height="50%" src="/assets/screenshots/fab-buttons.png">
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
            <AreaButton ref = {(componentRef) => component.itemViewRefs.push(componentRef)} shade = { shade }>
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
    <img src="/assets/screen-records/text-fields.gif">
</p>

Hypertoxin has two field components, [*TextField*](https://github.com/tuantle/hypertoxin/blob/master/src/components/fields/text-field.js), [*SearchField*](https://github.com/tuantle/hypertoxin/blob/master/src/components/fields/search-field.js)

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
style | object | None | Button style is an object with the following properties: `container: {...}, contentLeftRoom: {...}, contentMiddleRoom: {...}, contentRightRoom: {...}`. Standard React Native style properties go inside these properties. Changes to these properties will override the global theme

onValidate: PropTypes.func,
onFormat: PropTypes.func,
onEditing: PropTypes.func,
onDoneEdit: PropTypes.func,
onSelect: PropTypes.func,
onFocus: PropTypes.func,
onBlur: PropTypes.func,
onHideSelection: PropTypes.func,
onShowSelection: PropTypes.func,
onClear: PropTypes.func,
renderSelectableItem: PropTypes.func

*Note: `themed` propperty indicates using values defined by the global theme provider.*

By default, text field component passes `shade`, `size`, and `disabled` properties down to it child components and at the same time set `margin = { 0 }` and `indentation = { 0 }` properties onto its children. This behaviour can be overide by child components with the `exclusions` property.

#### Text Field Public Methods Access Via Reference

Methods | description
-----|------
isValidated | Check if text input's value is validated
isSelectionVisible | Check if selectable pullups view is visible
isFocused | Check if text input's value is focused
showSelection | Call to show selectable pullups view if `selectableValues` is provided
hideSelection | Call to hide selectable pullups view if `selectableValues` is provided
focus | Call to focus text input
blur | Call to blur text input
clear | Call to clear text input

Text field with formatting and validation.

<p align="center">
    <img width="35%" height="35%" src="/assets/screen-records/text-field-with-formatting-validation.gif">
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

Text field with selectable pullups.

<p align="center">
    <img width="25%" height="25%" src="/assets/screen-records/text-field-selectable.gif">
</p>

```jsx
<TextField
    label = 'LABEL'
    selectableValues = {[ `VALUE A`, `VALUE B`, `VALUE C` ]}
    renderSelectableItem = {(item, onPressSelect) => {
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
>
    <FlatButton room = 'content-right' overlay = 'transparent' action = 'show-selection' corner = 'circular' >
        <IconImage room = 'content-middle' source = 'collapse' />
    </FlatButton>
    <FlatButton room = 'content-right' overlay = 'transparent' action = 'hide-selection' corner = 'circular' >
        <IconImage room = 'content-middle' source = 'expand' />
    </FlatButton>
</TextField>
```

## Text Components

Text components with default theme and San-Francisco font.

<p align="center">
    <img width="35%" height="35%" src="/assets/screenshots/screenshot-text-default-theme.png">
</p>

Text components with bubble theme and Arial font.

<p align="center">
    <img width="35%" height="35%" src="/assets/screenshots/screenshot-text-bubble-theme.png">
</p>

Text components with coffee theme and Futura font.

<p align="center">
    <img width="35%" height="35%" src="/assets/screenshots/screenshot-text-coffee-theme.png">
</p>

Hypertoxin has five text components, [*CaptionText*](https://github.com/tuantle/hypertoxin/blob/master/src/components/texts/caption-text.js), [*InfoText*](https://github.com/tuantle/hypertoxin/blob/master/src/components/texts/info-text.js), [*SubtitleText*](https://github.com/tuantle/hypertoxin/blob/master/src/components/texts/subtitle-text.js), [*TitleText*](https://github.com/tuantle/hypertoxin/blob/master/src/components/texts/title-text.js), [*HeadlineText*](https://github.com/tuantle/hypertoxin/blob/master/src/components/texts/headline-text.js)

#### Text (Caption, Info, Subtitle, Title, & Headline) Property

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
initialAnimation | string, object | None  | See [Animations](## Animations) section for details
style | object | None | Standard React Native text style properties

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

Hypertoxin has two screen components, [*BodyScreen*](https://github.com/tuantle/hypertoxin/blob/master/src/components/screens/body-screen.js), [*HeaderScreen*](https://github.com/tuantle/hypertoxin/blob/master/src/components/screens/header-screen.js)

## Layout Components}

Hypertoxin has two layout components, [*RowLayout*](https://github.com/tuantle/hypertoxin/blob/master/src/components/layouts/row-layout.js), [*ColumnLayout*](https://github.com/tuantle/hypertoxin/blob/master/src/components/layouts/column-layout.js)

## Image Components

Hypertoxin has two layout components, [*RowLayout*](https://github.com/tuantle/hypertoxin/blob/master/src/components/layouts/row-layout.js), [*ColumnLayout*](https://github.com/tuantle/hypertoxin/blob/master/src/components/layouts/column-layout.js)

## Animation API

## Theme Customization

# Demo

# Change Log
- Link to [change log](https://github.com/tuantle/hypertoxin/tree/master/CHANGELOG.md)

# License

Hyperflow is [MIT licensed](./LICENSE).

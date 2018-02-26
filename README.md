# [Hypertoxin](https://github.com/tuantle/hypertoxin)![hypertoxin-logo-mini](/assets/logos/hypertoxin-logo-mini.png)
[![npm version](https://img.shields.io/npm/v/hypertoxin.svg?style=flat)](https://www.npmjs.com/package/hypertoxin)
[![npm downloads](https://img.shields.io/npm/dm/hypertoxin.svg?style=flat-square)](https://www.npmjs.com/package/hypertoxin)
## A themable client native app component library (built using React Native).

## Installation

`npm install hypertoxin --save`

Hypertoxin has `react-native-blur` dependency which required linking. So use the link command after install.

`react-native link`

## Documentation (WIP)

Import hypertoxin at the top of your app.js or index.js

```javascript
/* load and initialize hypertoxin */
import ht from 'hypertoxin'

hypertoxin.init();
```

Hypertoxin is themable. To change default theme, init hypertoxin with a custom theme object.
Checkout `/src/themes` to see the structure of the theme object.

```javascript
/* load and initialize hypertoxin */
import ht from 'hypertoxin'

hypertoxin.init({
    customTheme: myCustomTheme
});
```

### BUTTON COMPONENTS

![buttons](/assets/screenshots/buttons.gif)

Hypertoxin has two button components.

FlatButton, which can be style to look like a clear button, and RaisedButton.

#### FlatButton and RaisedButton Props

Below are the props you can pass to both FlatButton and RaisedButton component

Prop | Type | Default | description
-----|------|---------|------------
cId | string | None | Component Id
room | string | `none` | Set component room which can be one of `none`, `action-left`, `action-right`
action | string | `none` | Set component action which can be one of `none`, `toggle`, `search`, `clear`, `expand`, `collapse`, `show`, `hide`, `close`, `open`
shade | string | `light` | Set component shade theme, can be `light` or `dark`
overlay | string | `opaque` | Set button overplay style which can be one of `opaque`, `translucent`, `transparent`, `transparent-outlined`
corner | string | `round25` | Set button corner style which can be one of `round25`, `round50`, `square`
disabled | boolean | false | Disable the button
busy | boolean | false | Enable button busy activity indicator
rippled | boolean | true | Enable button ripple animation
uppercasedLabel | boolean | false | Force button label to be uppercased
label | string | `BUTTON` | Button label
color | string | See default theme | Set button color style
debounceTime | number | 250 | Set button debouncing time in ms
onPress | function | None | Button press callback function
---
#### CLEAR BUTTONS (FlatButton with `overlay = 'transparent'`)

Default

![clear-button-default](/assets/screenshots/clear-button-default.png)

```jsx
<FlatButton overlay = 'transparent' label = 'PRIMARY' color = 'primary' />
<FlatButton overlay = 'transparent' label = 'SECONDARY' color = 'secondary' />
<FlatButton overlay = 'transparent' label = 'DISABLED' disabled = { true }/>
```

Use with IconImage

![clear-button-icon](/assets/screenshots/clear-button-icon.png)

To add icon image to button, add a child component with a `room` assignment to button component that will handle the image rendering. See below for more info on IconImage component.

*Note: room assignment prop `room = 'content-left'` will put the icon image component on the left side of the button.
To put it on the right use `room = 'content-right'`*

```jsx
<FlatButton overlay = 'transparent' label = 'HOME PRIMARY' color = 'primary' >
    <IconImage
        room = 'content-left'
        source = 'home'
        size = 'small'
    />
</FlatButton>
<FlatButton overlay = 'transparent' label = 'HOME SECONDARY' color = 'secondary' >
    <IconImage
        room = 'content-left'
        source = 'home'
        size = 'small'
    />
</FlatButton>
<FlatButton overlay = 'transparent' label = 'HOME DISABLED' disabled = { true } >
    <IconImage
        room = 'content-left'
        source = 'home'
        size = 'small'
    />
</FlatButton>
```

With Badge

![clear-button-badge](/assets/screenshots/clear-button-badge.png)

To add badge to button, add a child component with a `room = 'badge'` assignment to button component that will handle the text rendering. See below for more info on InfoText component.

```jsx
<FlatButton overlay = 'transparent' label = 'PRIMARY' color = 'primary' >
    <InfoText size = 'small' room = 'badge' style = {{ color: `white` }} >0</InfoText>
</FlatButton>
<FlatButton overlay = 'transparent' label = 'SECONDARY' color = 'secondary' >
    <InfoText size = 'small' room = 'badge' style = {{ color: `white` }} >1</InfoText>
</FlatButton>
<FlatButton overlay = 'transparent' label = 'DISABLED' disabled = { true } >
    <InfoText size = 'small' room = 'badge' style = {{ color: `white` }} >2</InfoText>
</FlatButton>
```
---
#### FLAT BUTTONS

Default

![flat-button-default](/assets/screenshots/flat-button-default.png)


```jsx
<FlatButton label = 'PRIMARY' color = 'primary' />
<FlatButton label = 'SECONDARY' color = 'secondary' />
<FlatButton label = 'DISABLED' disabled = { true }/>
```

Use with IconImage

![flat-button-icon](/assets/screenshots/flat-button-icon.png)


```jsx
<FlatButton label = 'FAVORITE PRIMARY' color = 'primary' >
    <IconImage
        room = 'content-left'
        source = 'favorite'
        size = 'small'
    />
</FlatButton>
<FlatButton label = 'FAVORITE SECONDARY' color = 'secondary' >
    <IconImage
        room = 'content-left'
        source = 'favorite'
        size = 'small'
    />
</FlatButton>
<FlatButton label = 'FAVORITE DISABLED' disabled = { true } >
    <IconImage
        room = 'content-left'
        source = 'favorite'
        size = 'small'
    />
</FlatButton>
```

With Badge

![flat-button-badge](/assets/screenshots/flat-button-badge.png)

```jsx
<FlatButton overlay = 'transparent-outlined' label = 'Profile Primary' color = 'primary' corner = 'square' >
    <IconImage
        room = 'content-left'
        source = 'profile'
        size = 'small'
    />
    <InfoText size = 'small' room = 'badge' style = {{ color: `white` }} >0</InfoText>
</FlatButton>
<FlatButton overlay = 'transparent-outlined' label = 'Profile Secondary' color = 'secondary' corner = 'round25' >
    <IconImage
        room = 'content-left'
        source = 'profile'
        size = 'small'
    />
    <InfoText size = 'small' room = 'badge' style = {{ color: `white` }} >1</InfoText>
</FlatButton>
<FlatButton overlay = 'transparent-outlined' label = 'Profile Disabled' disabled = { true } corner = 'round50' >
    <IconImage
        room = 'content-left'
        source = 'profile'
        size = 'small'
    />
    <InfoText size = 'small' room = 'badge' style = {{ color: `white` }} >2</InfoText>
</FlatButton>
```
---
#### RAISED BUTTONS
Default

![raised-button-default](/assets/screenshots/raised-button-default.png)

```jsx
<FlatButton overlay = 'transparent' label = 'PRIMARY' color = 'primary' />
<FlatButton overlay = 'transparent' label = 'SECONDARY' color = 'secondary' />
<FlatButton overlay = 'transparent' label = 'DISABLED' disabled = { true }/>
```

Use with IconImage

![raised-button-icon](/assets/screenshots/raised-button-icon.png)

```jsx
<FlatButton overlay = 'transparent' label = 'HOME PRIMARY' color = 'primary' >
    <IconImage
        room = 'content-left'
        source = 'home'
        size = 'small'
    />
</FlatButton>
<FlatButton overlay = 'transparent' label = 'HOME SECONDARY' color = 'secondary' >
    <IconImage
        room = 'content-left'
        source = 'home'
        size = 'small'
    />
</FlatButton>
<FlatButton overlay = 'transparent' label = 'HOME DISABLED' disabled = { true } >
    <IconImage
        room = 'content-left'
        source = 'home'
        size = 'small'
    />
</FlatButton>
```

With Badge

![raised-button-badge](/assets/screenshots/raised-button-badge.png)

```jsx
<RaisedButton label = 'SMILE PRIMARY' color = 'primary' corner = 'square' >
    <IconImage
        room = 'content-left'
        source = 'smileyFace'
        size = 'small'
    />
    <InfoText size = 'small' room = 'badge' style = {{ color: `white` }} >0</InfoText>
</RaisedButton>
<RaisedButton label = 'SMILE SECONDARY' color = 'secondary' corner = 'round25' >
    <IconImage
        room = 'content-left'
        source = 'smileyFace'
        size = 'small'
    />
    <InfoText size = 'small' room = 'badge' style = {{ color: `white` }} >1</InfoText>
</RaisedButton>
<RaisedButton label = 'SMILE DISABLED' disabled = { true } corner = 'round50' >
    <IconImage
        room = 'content-left'
        source = 'smileyFace'
        size = 'small'
    />
    <InfoText size = 'small' room = 'badge' style = {{ color: `white` }} >2</InfoText>
</RaisedButton>
```

### FIELD COMPONENTS

![fields](/assets/screenshots/fields.gif)

### TEXT COMPONENTS

### VIEW COMPONENTS

### IMAGE COMPONENTS

## Change Log
- Link to [change log](https://github.com/tuantle/hypertoxin/tree/master/CHANGELOG.md)

## License

Hyperflow is [MIT licensed](./LICENSE).

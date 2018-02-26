# [Hypertoxin](https://github.com/tuantle/hypertoxin)[![npm version](https://img.shields.io/npm/v/hypertoxin.svg?style=flat)](https://www.npmjs.com/package/hypertoxin)
## A client native app component library (built using React Native).
[![npm version](https://img.shields.io/npm/v/hypertoxin.svg?style=flat)](https://www.npmjs.com/package/hypertoxin)
[![npm downloads](https://img.shields.io/npm/dm/hypertoxin.svg?style=flat-square)](https://www.npmjs.com/package/hypertoxin)

## Installation

`$ npm install react-native-search-header --save`

### CLEAR BUTTONS
![clear-button](/assets/screenshots/clear-button.png)
```jsx
// Simple
<FlatButton overlay = 'transparent' label = 'PRIMARY' color = 'primary' />
<FlatButton overlay = 'transparent' label = 'SECONDARY' color = 'secondary' />
<FlatButton overlay = 'transparent' label = 'DISABLED' disabled = { true }/>

// With Icon
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

### FLAT BUTTONS
![flat-button](/assets/screenshots/flat-button.png)
```jsx
// Simple
<FlatButton label = 'PRIMARY' color = 'primary' />
<FlatButton label = 'SECONDARY' color = 'secondary' />
<FlatButton label = 'DISABLED' disabled = { true }/>

// With Icon
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

### RAISED BUTTONS
![raised-button](/assets/screenshots/raised-button.png)
```jsx
// Simple
<FlatButton overlay = 'transparent' label = 'PRIMARY' color = 'primary' />
<FlatButton overlay = 'transparent' label = 'SECONDARY' color = 'secondary' />
<FlatButton overlay = 'transparent' label = 'DISABLED' disabled = { true }/>

// With Icon
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

## Change Log
- Link to [change log](https://github.com/tuantle/hypertoxin/tree/master/CHANGELOG.md)

## License

Hyperflow is [MIT licensed](./LICENSE).

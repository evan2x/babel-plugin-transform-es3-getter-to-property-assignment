# babel-plugin-transform-es3-getter-to-property-assignment

> This plugin transforms Object.defineProperty getter to property assignment for Babel 6.x

## Example

### In

```js
const exports = {};

Object.defineProperty(exports, 'foo', {
  enumerable: true,
  get: function get() {
    return 'bar';
  }
});
```

### Out

```js
const exports = {};

exports['foo'] = (function() {
  return 'bar';
})();
```

## Installation

```
$ npm install --save-dev babel-plugin-transform-es3-getter-to-property-assignment
```

## Usage

### Via .babelrc (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-es3-getter-to-property-assignment"]
}
```

### Via CLI

```
babel --plugins transform-es3-getter-to-property-assignment
```

### Via Node API

```js
require("babel-core").transform("code", {
  plugins: ["transform-es3-getter-to-property-assignment"]
});
```

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
$ npm install --save-dev babel-plugin-transform-es3-getter-to-assignment
```

## Usage

### Via .babelrc (Recommended)

**.babelrc**

```
{
  "plugins": ["transform-es3-getter-to-value"]
}
```

### Via CLI

```
{
  "plugins": ["transform-es3-getter-to-value"]
}
```

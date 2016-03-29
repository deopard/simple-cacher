# simple-cacher ![TravisCI](https://travis-ci.org/deopard/simple-cacher.svg?branch=master)

Simple caching class for javascript to cache collections and other objects

## ES6

This library is built in es6 syntax. By default, the dist file will be traspiled by Babel, but some features (Array prototype features) will still need shims. `array.shims.js` is a custom built core-js file which includes the features to run in non-es6 supported environment.

In a easy way of saying, if you DON'T have es6 Array support where you're using this, include the `dist/array.shim.js` file before `dist/simple-cacher.min.js` file.

If you have es6 array support, do not include `dist/array.shim.js` file.

## Testing

Running `grunt test` will run the unit tests with karma.


## API

[Found here](doc/documentation.md)


## Examples

#### Cache collection (with id)

```javascript
Cacher.cache(
  'test',
  [
    { id: 1, name: 'tom' },
    { id: 2, name: 'jade' },
    { id: 3, name: 'smith' },
  ]
);
Cacher.hit('test', 2); // { id: 2, name: 'jade' }
```

#### Cache single object (without id)

```javascript
Cacher.cache('test', { name: 'tom' });
Cacher.hit('test'); // { name: 'tom' }
```


#### Cache single object as collection (with id)

```javascript
Cacher.cache('test', { id: 3, name: 'smith' });
Cacher.hit('test', 3); // { id: 3, name: 'smith' }
```


#### Cache collection and overwrite cache

```javascript
Cacher.cache(
  'test',
  [
    { id: 1, name: 'tom' },
    { id: 2, name: 'jade' },
    { id: 3, name: 'smith' },
  ]
);
Cacher.cache('test', { id: 3, name: 'john' });
Cacher.hit('test', 3); // { id: 3, name: 'john' }
```


#### Cache collection with custom id

```javascript
Cacher.cache(
  'test',
  [
    { id: 1, name: 'tom' },
    { id: 2, name: 'jade' },
    { id: 2, name: 'smith' },
  ],
  'name'
);
Cacher.hit('jade'); // { id: 2, name: 'jade' }
```


#### Cache miss

```javascript
Cacher.cache(
  'test'
  [
    { id: 1, name: 'tom' },
    { id: 2, name: 'jade' },
    { id: 3, name: 'smith' },
  ]
)
Cacher.hit('test', 55); // null
```


#### Hit with multiple ids

```javascript
Cacher.cache(
  'test'
  [
    { id: 1, name: 'tom' },
    { id: 2, name: 'jade' },
    { id: 3, name: 'smith' },
  ]
)
Cacher.hit('test', [1,2,5]); // [{ id: 1, name: 'tom' }, { id: 2, name: 'jade' }]
```


#### Return all caches

```javascript
Cacher.cache(
  'test'
  [
    { id: 1, name: 'tom' },
    { id: 2, name: 'jade' },
    { id: 3, name: 'smith' }
  ]
)
Cacher.hit('test'); // [ { id: 1, name: 'tom' }, { id: 2, name: 'jade' }, { id: 3, name: 'smith' } ]
```

#### Force cache single object with id attribute

```javascript
Cacher.cache('test', { id: 1, name: 'tom' }, null);
Cacher.hit('test'); // { id: 1, name: 'tom' }
```


#### Cache array as single object

```javascript
Cacher.cache(
  'test',
  [
    { name: 'tom' },
    { name: 'jade' }
  ],
  null
);
Cacher.hit('test'); // [ { name: 'tom' }, { name: 'jade' } ]
```

#### Delete with multiple ids

```javascript
Cacher.cache(
  'test',
  [
    { id: 1, name: 'tom' },
    { id: 2, name: 'jade' },
    { id: 3, name: 'smith' }
  ]
);
Cacher.delete('test', [1,3]);
Cacher.hit('test'); // [ { id: 2, name: 'jade' } ]
```


#### Delete all

```javascript
Cacher.cache(
  'test',
  [
    { id: 1, name: 'tom' },
    { id: 2, name: 'jade' },
    { id: 3, name: 'smith' }
  ]
);
Cacher.delete('test');
Cacher.hit('test'); // [ ]
```

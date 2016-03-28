# simple-cacher

Simple caching class for javascript to cache collections and other objects


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

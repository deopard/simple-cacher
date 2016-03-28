<a name="cache"></a>

## .cache(key, value, [id])
Cache collection or single objects

**Kind**: static function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| key | <code>string</code> &#124; <code>number</code> |  | Key for the cache storage |
| value | <code>Object</code> &#124; <code>Array.&lt;Object&gt;</code> |  | Collection or single object to cache |
| [id] | <code>string</code> | <code>&quot;id&quot;</code> | Name of the attribute to identify uniqueness of objects in collection |

**Example**  
```js
// Cache single object
Cacher.cache('test', { name: 'tom' });
```
**Example**  
```js
// Cache collection
Cacher.cache('test', [{ id: 1, name: 'tom' }, { id: 2, name: 'john' }]);
```
**Example**  
```js
// Cache overwrite
Cacher.cache('test', [{ id: 1, name: 'tom' }, { id: 2, name: 'john' }]);
Cacher.cache('test', [{ id: 2, name: 'carl' }]);
Cacher.hit('test'); // [{ id: 1, name: 'tom' }, { id: 2, name: 'carl' }]
```
<a name="hit"></a>

## .hit(key, [ids]) ⇒ <code>object</code> &#124; <code>Array.&lt;object&gt;</code> &#124; <code>null</code>
Find cached objects

**Kind**: static function  
**Returns**: <code>object</code> &#124; <code>Array.&lt;object&gt;</code> &#124; <code>null</code> - If ids parameter is a number, single object will be returned.
               If ids parameter is array of keys, array of objects will be returned.
               null will be returned when no caches are hit.  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> &#124; <code>number</code> | Key for the cache storage |
| [ids] | <code>number</code> &#124; <code>Array.&lt;number&gt;</code> &#124; <code>string</code> &#124; <code>Array.&lt;string&gt;</code> | id or array of ids to find cache              Will get all cached objects if this parameter is not passed |

**Example**  
```js
// Hit single object from collection
Cacher.cache('test', [{ id: 1, name: 'tom' }, { id: 2, name: 'john' }]);
Cacher.hit('test', 2); // { id: 2, name: 'john' }
```
**Example**  
```js
// Hit multiple objects from collection
Cacher.cache('test', [{ id: 1, name: 'tom' }, { id: 2, name: 'john' }]);
Cacher.hit('test', [1, 2]); // [{ id: 1, name: 'tom' }, { id: 2, name: 'john' }]
```
**Example**  
```js
// Cache miss
Cacher.cache('test', [{ id: 1, name: 'tom' }, { id: 2, tom: 'john' }]);
Cacher.hit('test', [999]); // []
```
<a name="delete"></a>

## .delete(key, [ids])
Delete cached objects

**Kind**: static function  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> &#124; <code>number</code> | Key for the cache storage |
| [ids] | <code>number</code> &#124; <code>Array.&lt;number&gt;</code> &#124; <code>string</code> &#124; <code>Array.&lt;string&gt;</code> | id or array of ids to delete from cache              Will delete all cached objects if this parameter is not passed |

**Example**  
```js
// Delete single object from collection
Cacher.cache('test', [{ id: 1, name: 'tom' }, { id: 2, name: 'john' }]);
Cacher.delete('test', 2);
Cacher.hit('test'); // [{ id: 1, name: 'tom' }]
```
**Example**  
```js
// Delete multiple objects from collection
Cacher.cache('test', [{ id: 1, name: 'tom' }, { id: 2, name: 'john' }]);
Cacher.delete('test', [1, 2]);
Cacher.hit('test'); // []
```
**Example**  
```js
// Delete all
Cacher.cache('test', [{ id: 1, name: 'tom' }, { id: 2, name: 'john' }]);
Cacher.delete('test');
Cacher.hit('test'); // []
```

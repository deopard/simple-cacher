class Cacher {
  /**
    * Cache collection or single objects
    * @method cache
    * @static
    * @param {(string|number)} key - Key for the cache storage
    * @param {(Object|Object[])} value - Collection or single object to cache
    * @param {string} [id=id] - Name of the attribute to identify uniqueness of objects in collection
    * @example
    * // Cache single object
    * Cacher.cache('test', { name: 'tom' });
    * @example
    * // Cache collection
    * Cacher.cache('test', [{ id: 1, name: 'tom' }, { id: 2, name: 'john' }]);
    * @example
    * // Cache overwrite
    * Cacher.cache('test', [{ id: 1, name: 'tom' }, { id: 2, name: 'john' }]);
    * Cacher.cache('test', [{ id: 2, name: 'carl' }]);
    * Cacher.hit('test'); // [{ id: 1, name: 'tom' }, { id: 2, name: 'carl' }]
    */
  static cache (key, value, id='id') {
    // Force cache as single object
    if (id === null) {
      return this._cacheSingleObject(key, value);
    }

    if (!Array.isArray(value)) {
      // cache as single object (no id)
      if (typeof value[id] === 'undefined') {
        return this._cacheSingleObject(key, value);
      }
      // auto-convert into array
      value = [value];
    }

    // initialize storage
    let storage = this._initStorage(key, id);

    value.forEach(v => {
      let idx = storage.data.findIndex(x => x[id] === v[id]);

      if (idx === -1) {
        // add a new one
        storage.data.push(v);
      }
      else {
        // replace original
        storage.data[idx] = v;
      }
    });

  }

  /**
    * Find cached objects
    * @method hit
    * @static
    * @param {(string|number)} key - Key for the cache storage
    * @param {number|number[]|string|string[]} [ids] - id or array of ids to find cache
             Will get all cached objects if this parameter is not passed
    * @returns {object|object[]|null} If ids parameter is a number, single object will be returned.
               If ids parameter is array of keys, array of objects will be returned.
               null will be returned when no caches are hit.
    * @example
    * // Hit single object from collection
    * Cacher.cache('test', [{ id: 1, name: 'tom' }, { id: 2, name: 'john' }]);
    * Cacher.hit('test', 2); // { id: 2, name: 'john' }
    * @example
    * // Hit multiple objects from collection
    * Cacher.cache('test', [{ id: 1, name: 'tom' }, { id: 2, name: 'john' }]);
    * Cacher.hit('test', [1, 2]); // [{ id: 1, name: 'tom' }, { id: 2, name: 'john' }]
    * @example
    * // Cache miss
    * Cacher.cache('test', [{ id: 1, name: 'tom' }, { id: 2, tom: 'john' }]);
    * Cacher.hit('test', [999]); // []
    */
  static hit(key, ids=null) {
    let storage = this.storage[key];

    // invalid key
    if (!storage) {
      return null;
    }

    // single object cache
    if (storage.id === null) {
      return storage.data;
    }

    // get all cache
    if (ids === null) {
      return storage.data;
    }

    return Array.isArray(ids) ?
      // hit array
      storage.data.filter(x => ids.includes(x.id)) :

      // hit single cache
      storage.data.find(x => x.id === ids) || null;
  }

  /**
    * Delete cached objects
    * @method delete
    * @static
    * @param {(string|number)} key - Key for the cache storage
    * @param {number|number[]|string|string[]} [ids] - id or array of ids to delete from cache
             Will delete all cached objects if this parameter is not passed
    * @example
    * // Delete single object from collection
    * Cacher.cache('test', [{ id: 1, name: 'tom' }, { id: 2, name: 'john' }]);
    * Cacher.delete('test', 2);
    * Cacher.hit('test'); // [{ id: 1, name: 'tom' }]
    * @example
    * // Delete multiple objects from collection
    * Cacher.cache('test', [{ id: 1, name: 'tom' }, { id: 2, name: 'john' }]);
    * Cacher.delete('test', [1, 2]);
    * Cacher.hit('test'); // []
    * @example
    * // Delete all
    * Cacher.cache('test', [{ id: 1, name: 'tom' }, { id: 2, name: 'john' }]);
    * Cacher.delete('test');
    * Cacher.hit('test'); // []
    */
  static delete (key, ids=null) {
    let storage = this.storage[key];

    // delete all cache
    if (!ids) {
      storage.data = storage.id === null ? null : [];
      return;
    }

    if (!Array.isArray(ids)) {
      ids = [ids];
    }

    storage.data = storage.data.filter(x => !ids.includes(x.id));
  }

  /**
    * Cache single object
    * @method _cacheSingleObject
    * @static
    * @private
    * @param {(string|number)} key - Key for the cache storage
    * @param {(Object|Object[])} value - Single object value to cache. Arrays are allowed too
    */
  static _cacheSingleObject (key, value) {
    this._initStorage(key, null);

    let storage = this.storage[key];
    storage.data = value;
  }

  /**
    * Init cache storage for given key if it is not initialized.
      Will do nothing if storage is already initialized.
    * @method _initStorage
    * @static
    * @private
    * @param {(string|number)} key - Key for the cache storage
    * @param {string} [id=id] - Name of the attribute to identify uniqueness of objects in collection
    * @return {object} Stroage of the given key
    */
  static _initStorage (key, id='id') {
    this.storage = this.storage || {};
    this.storage[key] = this.storage[key] || {
      id: id,
      data: []
    };

    return this.storage[key];
  }
}

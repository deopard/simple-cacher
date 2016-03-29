describe('Cacher', function () {
  'use strict';

  var collection = [
    { id: 1, name: 'tom' },
    { id: 2, name: 'jade' },
    { id: 3, name: 'smith' },
  ];

  var collection2 = [
    { id: 2, name: 'john' },
    { id: 4, name: 'smith' }
  ];

  var collectionMerged = [
    { id: 1, name: 'tom' },
    { id: 2, name: 'john' },
    { id: 3, name: 'smith' },
    { id: 4, name: 'smith' }
  ];

  var collectionMergedByName = [
    { id: 1, name: 'tom' },
    { id: 2, name: 'jade' },
    { id: 4, name: 'smith' },
    { id: 2, name: 'john' }
  ];

  var fixtureSingle = { name: 'andy' };
  var fixtureSingle2 = { name: 'susan' };

  beforeEach(function () {
    Cacher.storage = null;
  });

  // Cache tests

  it('should cache collection', function () {
    Cacher.cache('test', collection);
    expect(Cacher.hit('test')).toEqual(collection);
  });

  it('should overwrite cache collection with existing id', function () {
    Cacher.cache('test', collection);
    Cacher.cache('test', collection2);
    expect(Cacher.hit('test')).toEqual(collectionMerged);
  });

  it('should cache collection with custom id', function () {
    Cacher.cache('test', collection, 'name');
    expect(Cacher.hit('test')).toEqual(collection);
  });

  it('should cache collection with custom and existing id', function () {
    Cacher.cache('test', collection, 'name');
    Cacher.cache('test', collection2, 'name');
    expect(Cacher.hit('test')).toEqual(collectionMergedByName);
  });

  it('should cache single object', function () {
    Cacher.cache('test', fixtureSingle);
    expect(Cacher.hit('test')).toEqual(fixtureSingle);
  });

  it('should overwrite cache single object', function () {
    Cacher.cache('test', fixtureSingle);
    Cacher.cache('test', fixtureSingle2);
    expect(Cacher.hit('test')).toEqual(fixtureSingle2);
  });

  it('should cache single object as collection with id', function () {
    Cacher.cache('test', { id: 3, name: 'smith' });
    expect(Cacher.hit('test')).toEqual([{ id: 3, name: 'smith'}]);
    expect(Cacher.hit('test', 3)).toEqual({ id: 3, name: 'smith'});
  });


  // Hit tests

  it('should hit by id in collection', function () {
    Cacher.cache('test', collection);
    expect(Cacher.hit('test', 2)).toEqual({ id: 2, name: 'jade' });
  });

  it('should hit with multiple ids', function () {
    Cacher.cache('test', collection);
    expect(Cacher.hit('test', [1,2,999])).toEqual([
      { id: 1, name: 'tom' },
      { id: 2, name: 'jade' }
    ]);
  });

  it('should force cache single object with id attribute', function () {
    Cacher.cache('test', collection[0], null);
    expect(Cacher.hit('test')).toEqual(collection[0]);
  });

  it('should cache array as single object with null id', function () {
    Cacher.cache('test', collection, null);
    expect(Cacher.hit('test')).toEqual(collection);
  });

  it('should miss by non-existing id', function () {
    Cacher.cache('test', collection);
    expect(Cacher.hit('test', 999)).toBe(null);
  });


  // Devare tests

  it('should devare by id in collection', function () {
    Cacher.cache('test', collection);
    Cacher.devare('test', 2);
    expect(Cacher.hit('test')).toEqual([
      { id: 1, name: 'tom' },
      { id: 3, name: 'smith' }
    ]);
  });

  it('should devare by ids in collection', function () {
    Cacher.cache('test', collection);
    Cacher.devare('test', [2, 3]);
    expect(Cacher.hit('test')).toEqual([
      { id: 1, name: 'tom' }
    ]);
  });

  it('should devare all in collection', function () {
    Cacher.cache('test', collection);
    Cacher.devare('test');
    expect(Cacher.hit('test')).toEqual([]);
  });

  it('should devare single object', function () {
    Cacher.cache('test', fixtureSingle);
    Cacher.devare('test');
    expect(Cacher.hit('test')).toBe(null);
  });
});

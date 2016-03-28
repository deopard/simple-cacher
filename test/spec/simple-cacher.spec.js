describe('Cacher', () => {
  'use strict';

  let collection = [
    { id: 1, name: 'tom' },
    { id: 2, name: 'jade' },
    { id: 3, name: 'smith' },
  ];

  let collection2 = [
    { id: 2, name: 'john' },
    { id: 4, name: 'smith' }
  ];

  let collectionMerged = [
    { id: 1, name: 'tom' },
    { id: 2, name: 'john' },
    { id: 3, name: 'smith' },
    { id: 4, name: 'smith' }
  ];

  let collectionMergedByName = [
    { id: 1, name: 'tom' },
    { id: 2, name: 'jade' },
    { id: 4, name: 'smith' },
    { id: 2, name: 'john' }
  ];

  let fixtureSingle = { name: 'andy' };
  let fixtureSingle2 = { name: 'susan' };

  beforeEach(() => {
    Cacher.storage = null;
  });

  // Cache tests

  it('should cache collection', () => {
    Cacher.cache('test', collection);
    expect(Cacher.hit('test')).toEqual(collection);
  });

  it('should overwrite cache collection with existing id', () => {
    Cacher.cache('test', collection);
    Cacher.cache('test', collection2);
    expect(Cacher.hit('test')).toEqual(collectionMerged);
  });

  it('should cache collection with custom id', () => {
    Cacher.cache('test', collection, 'name');
    expect(Cacher.hit('test')).toEqual(collection);
  });

  it('should cache collection with custom and existing id', () => {
    Cacher.cache('test', collection, 'name');
    Cacher.cache('test', collection2, 'name');
    expect(Cacher.hit('test')).toEqual(collectionMergedByName);
  });

  it('should cache single object', () => {
    Cacher.cache('test', fixtureSingle);
    expect(Cacher.hit('test')).toEqual(fixtureSingle);
  });

  it('should overwrite cache single object', () => {
    Cacher.cache('test', fixtureSingle);
    Cacher.cache('test', fixtureSingle2);
    expect(Cacher.hit('test')).toEqual(fixtureSingle2);
  });

  it('should cache single object as collection with id', () => {
    Cacher.cache('test', { id: 3, name: 'smith' });
    expect(Cacher.hit('test')).toEqual([{ id: 3, name: 'smith'}]);
    expect(Cacher.hit('test', 3)).toEqual({ id: 3, name: 'smith'});
  });


  // Hit tests

  it('should hit by id in collection', () => {
    Cacher.cache('test', collection);
    expect(Cacher.hit('test', 2)).toEqual({ id: 2, name: 'jade' });
  });

  it('should hit with multiple ids', () => {
    Cacher.cache('test', collection);
    expect(Cacher.hit('test', [1,2,999])).toEqual([
      { id: 1, name: 'tom' },
      { id: 2, name: 'jade' }
    ]);
  });

  it('should force cache single object with id attribute', () => {
    Cacher.cache('test', collection[0], null);
    expect(Cacher.hit('test')).toEqual(collection[0]);
  });

  it('should cache array as single object with null id', () => {
    Cacher.cache('test', collection, null);
    expect(Cacher.hit('test')).toEqual(collection);
  });

  it('should miss by non-existing id', () => {
    Cacher.cache('test', collection);
    expect(Cacher.hit('test', 999)).toBe(null);
  });


  // Delete tests

  it('should delete by id in collection', () => {
    Cacher.cache('test', collection);
    Cacher.delete('test', 2);
    expect(Cacher.hit('test')).toEqual([
      { id: 1, name: 'tom' },
      { id: 3, name: 'smith' }
    ]);
  });

  it('should delete by ids in collection', () => {
    Cacher.cache('test', collection);
    Cacher.delete('test', [2, 3]);
    expect(Cacher.hit('test')).toEqual([
      { id: 1, name: 'tom' }
    ]);
  });

  it('should delete all in collection', () => {
    Cacher.cache('test', collection);
    Cacher.delete('test');
    expect(Cacher.hit('test')).toEqual([]);
  });

  it('should delete single object', () => {
    Cacher.cache('test', fixtureSingle);
    Cacher.delete('test');
    expect(Cacher.hit('test')).toBe(null);
  });
});

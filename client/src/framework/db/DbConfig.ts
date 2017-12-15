import NoSqlProvider = require('nosqlprovider');

import DbModels = require('./DbModels');

// The actual value is just a string, but the type system can extract this extra info.
type DBStore<Name extends string, ObjectType, KeyFormat> = string & { name?: Name, objectType?: ObjectType, keyFormat?: KeyFormat };
type DBIndex<Store extends DBStore<string, any, any>, IndexKeyFormat> = string & { store?: Store, indexKeyFormat?: IndexKeyFormat };

export const Stores = {
    noteItems: 'noteItems' as DBStore<'NoteItemsStore', DbModels.INoteItem, string>,
    urlCache: 'urlCache' as DBStore<'UrlCacheStore', DbModels.IUrlCache, string>,
    keyValueCache: 'keyValueCache' as DBStore<'KeyValueCacheStore', DbModels.IKeyValueCache, string>,
    docsDbCache: 'docsDbCache' as DBStore<'DocsDbStore', DbModels.IKeyValueCache, string>,
};
export const Indexes = {
    noteSearchTerms: 'noteItems_searchTerms' as DBIndex<typeof Stores.noteItems, string>,
};
export const _databaseName = 'db';
export const _dbSchemaVersion = 1;

export const _dbSchema: NoSqlProvider.DbSchema = {
    version: _dbSchemaVersion,
    lastUsableVersion: _dbSchemaVersion,
    stores: [
        {
            name: Stores.noteItems,
            primaryKeyPath: 'id',
            indexes: [
                {
                    name: Indexes.noteSearchTerms,
                    keyPath: '_searchTerms',
                    fullText: true,
                },
            ],
        },
        {
            name: Stores.urlCache,
            primaryKeyPath: 'id',
        },
        {
            name: Stores.keyValueCache,
            primaryKeyPath: 'id',
        },
        {
            name: Stores.docsDbCache,
            primaryKeyPath: 'id',
        },
    ],
};

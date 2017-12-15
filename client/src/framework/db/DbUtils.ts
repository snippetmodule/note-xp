import NoSqlProvider = require('nosqlprovider');
import SyncTasks = require('synctasks');

import DBConfig = require('./DbConfig');

let _db: NoSqlProvider.DbProvider;
let providers: NoSqlProvider.DbProvider[];

export function init(providersToTry: NoSqlProvider.DbProvider[]): SyncTasks.Promise<NoSqlProvider.DbProvider> {
    providers = providersToTry;
    return _openListOfProviders(providers, DBConfig._databaseName, DBConfig._dbSchema)
        .then((prov: NoSqlProvider.DbProvider) => _db = prov);
}

function _openListOfProviders(providersToTry: NoSqlProvider.DbProvider[], dbName: string, schema: NoSqlProvider.DbSchema)
    : SyncTasks.Promise<NoSqlProvider.DbProvider> {

    const task = SyncTasks.Defer<NoSqlProvider.DbProvider>();
    let providerIndex = 0;
    let errorList: any[] = [];

    console.log('DbUtils Providers: ' + providersToTry.length);

    const tryNext = () => {
        if (providerIndex >= providersToTry.length) {
            task.reject(errorList.length <= 1 ? errorList[0] : errorList);
            return;
        }

        let provider = providersToTry[providerIndex];
        provider.open(dbName, schema, false, false).then(() => {
            console.log('DbUtils Provider ' + providerIndex + ': Open Success!');
            task.resolve(provider);
        }, (err) => {
            console.error('DbUtils Provider ' + providerIndex + ': Open Failure: ' + JSON.stringify(err));
            errorList.push(err);
            providerIndex++;
            tryNext();
        });
    };

    tryNext();

    return task.promise();
}
export function getStore(storename: string, writeNeeded = false): SyncTasks.Promise<NoSqlProvider.DbStore> {
    return _db.openTransaction([storename], writeNeeded).then((tx: NoSqlProvider.DbTransaction) => {
        return tx.getStore(storename);
    });
}

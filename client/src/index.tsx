import { CordovaNativeSqliteProvider } from 'nosqlprovider/dist/CordovaNativeSqliteProvider';
import { InMemoryProvider } from 'nosqlprovider/dist/InMemoryProvider';
import rnSqliteProvider = require('react-native-sqlite-storage');
import { AppRegistry } from 'react-native';

import fm = require('./framework');
import { App } from './ui/App';

fm.db.DbUtils.init([
    // Specify the DB providers that are valid on the RN platforms.
    new CordovaNativeSqliteProvider(rnSqliteProvider),
    new InMemoryProvider()
]).then(() => {
    // to do Other Init
    return fm.manager.UserManager.Instance.init();
}).then(() => {
    AppRegistry.registerComponent('App', () => App);
}).catch((err) => {
    fm.utils.Log.i('Index', err);
});

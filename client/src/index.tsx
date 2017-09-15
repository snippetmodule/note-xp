import { AppRegistry } from 'react-native';
import { CordovaNativeSqliteProvider } from 'nosqlprovider/dist/CordovaNativeSqliteProvider';
import { InMemoryProvider } from 'nosqlprovider/dist/InMemoryProvider';

import fm = require('./framework');
import App from './ui/App';

// const rnSqliteProvider = require('react-native-sqlite-storage');

// fm.db.DbUtils.init([
//     // Specify the DB providers that are valid on the RN platforms.
//     new CordovaNativeSqliteProvider(rnSqliteProvider),
//     new InMemoryProvider(),
// ]).then(() => {
//     // to do Other Init
//     return fm.manager.UserManager.Instance.init();
// }).then(() => {
//     AppRegistry.registerComponent('NoteTs', () => App);
// }).catch((err) => {
//     fm.utils.Log.i('Index', err);
// });
AppRegistry.registerComponent('RXApp', () => App);
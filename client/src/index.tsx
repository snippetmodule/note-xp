import rx = require('reactxp');
import { CordovaNativeSqliteProvider } from 'nosqlprovider/dist/CordovaNativeSqliteProvider';
import { InMemoryProvider } from 'nosqlprovider/dist/InMemoryProvider';

import fm = require('./framework');
import { App } from './ui/App';

const rnSqliteProvider = require('react-native-sqlite-storage');

rx.App.initialize(true, true);
fm.db.DbUtils.init([
    // Specify the DB providers that are valid on the RN platforms.
    new CordovaNativeSqliteProvider(rnSqliteProvider),
    new InMemoryProvider(),
]).then(() => {
    // to do Other Init
    return fm.manager.UserManager.init();
}).then(() => {
    rx.UserInterface.setMainView(<App />);
}).catch((err) => {
    fm.utils.Log.i('Index', err);
});

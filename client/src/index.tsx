import RX = require('reactxp');

import { CordovaNativeSqliteProvider } from 'nosqlprovider/dist/CordovaNativeSqliteProvider';
import { InMemoryProvider } from 'nosqlprovider/dist/InMemoryProvider';

import { default as UserManager, User } from './framework/manager/UserManager';
import DbUtils = require('./framework/db/DbUtils');
import { App } from './ui/App';

const rnSqliteProvider = require('react-native-sqlite-storage');

RX.App.initialize(true, true);
DbUtils.init([
    // Specify the DB providers that are valid on the RN platforms.
    new CordovaNativeSqliteProvider(rnSqliteProvider),
    new InMemoryProvider()
]).then(() => {
    // to do Other Init
    return UserManager.init();
}).then(() => {
    RX.UserInterface.setMainView(<App />);
});

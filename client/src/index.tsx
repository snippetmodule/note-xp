import RX = require('reactxp');

import { CordovaNativeSqliteProvider } from 'nosqlprovider/dist/CordovaNativeSqliteProvider';
import { InMemoryProvider } from 'nosqlprovider/dist/InMemoryProvider';

import DbUtils = require('./framework/db/DbUtils');
import App = require('./App');

const rnSqliteProvider = require('react-native-sqlite-storage');

RX.App.initialize(true, true);
RX.App.initialize(true, true);
DbUtils.init([
    // Specify the DB providers that are valid on the RN platforms.
    new CordovaNativeSqliteProvider(rnSqliteProvider),
    new InMemoryProvider()
]).then(() => {
    // to do Other Init
    return 1;
}).then(() => {
    RX.UserInterface.setMainView(<App />);
});

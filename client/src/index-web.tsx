import RX = require('reactxp');

import { IndexedDbProvider } from 'nosqlprovider/dist/IndexedDbProvider';
import { InMemoryProvider } from 'nosqlprovider/dist/InMemoryProvider';
import { WebSqlProvider } from 'nosqlprovider/dist/WebSqlProvider';

import { default as UserManager, User } from './framework/manager/UserManager';
import DbUtils = require('./framework/db/DbUtils');
import { App } from './ui/App';

RX.App.initialize(true, true);

DbUtils.init([
    new IndexedDbProvider(),
    new WebSqlProvider(),
    new InMemoryProvider()
]).then(() => {
    // to do Other Init
    return UserManager.init();
}).then(() => {
    RX.UserInterface.setMainView(<App />);
});

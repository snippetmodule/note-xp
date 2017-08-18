import RX = require('reactxp');

import { IndexedDbProvider } from 'nosqlprovider/dist/IndexedDbProvider';
import { InMemoryProvider } from 'nosqlprovider/dist/InMemoryProvider';
import { WebSqlProvider } from 'nosqlprovider/dist/WebSqlProvider';

import { DbUtils } from './common/utils/DbUtils';
import App = require('./App');

RX.App.initialize(true, true);
DbUtils.init([
    new IndexedDbProvider(),
    new WebSqlProvider(),
    new InMemoryProvider()
]).then(() => {
    // to do Other Init
    return 1;
}).then(() => {
    RX.UserInterface.setMainView(<App />);
});


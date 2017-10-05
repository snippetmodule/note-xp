import rx = require('reactxp');

import { IndexedDbProvider } from 'nosqlprovider/dist/IndexedDbProvider';
import { InMemoryProvider } from 'nosqlprovider/dist/InMemoryProvider';
import { WebSqlProvider } from 'nosqlprovider/dist/WebSqlProvider';

import fm = require('./framework');
import { App } from './ui/App';

fm.utils.Log.i('index', JSON.stringify(process.env));

rx.App.initialize(fm.utils.DeviceUtils.isDebug, fm.utils.DeviceUtils.isDebug);
fm.db.DbUtils.init([
    new IndexedDbProvider(),
    new WebSqlProvider(),
    new InMemoryProvider(),
]).then(() => {
    // to do Other Init
    return fm.manager.UserManager.Instance.init();
}).then(() => {
    rx.UserInterface.setMainView(<App />);
}).catch((err) => {
    fm.utils.Log.i('Index', err);
});

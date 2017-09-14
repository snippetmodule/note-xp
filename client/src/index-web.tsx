import { AppRegistry } from 'react-native';

import { IndexedDbProvider } from 'nosqlprovider/dist/IndexedDbProvider';
import { InMemoryProvider } from 'nosqlprovider/dist/InMemoryProvider';
import { WebSqlProvider } from 'nosqlprovider/dist/WebSqlProvider';

import fm = require('./framework');
import App from './ui/App';

fm.db.DbUtils.init([
    new IndexedDbProvider(),
    new WebSqlProvider(),
    new InMemoryProvider(),
]).then(() => {
    // to do Other Init
    return fm.manager.UserManager.Instance.init();
}).then(() => {
    AppRegistry.registerComponent('NoteTs', () => App);
}).catch((err) => {
    fm.utils.Log.i('Index', err);
});

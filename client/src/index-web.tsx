import { IndexedDbProvider } from 'nosqlprovider/dist/IndexedDbProvider';
import { InMemoryProvider } from 'nosqlprovider/dist/InMemoryProvider';
import { WebSqlProvider } from 'nosqlprovider/dist/WebSqlProvider';
import { AppRegistry } from 'react-native';

import fm = require('./framework');
import { App } from './ui/App';


// if (__OFFLINE__) {
//   import offline = require('offline-plugin/runtime');//.install()
// }

fm.db.DbUtils.init([
    new IndexedDbProvider(),
    new WebSqlProvider(),
    new InMemoryProvider()
]).then(() => {
    // to do Other Init
    return fm.manager.UserManager.Instance.init();
}).then(() => {
    AppRegistry.registerComponent('App', () => App);
    AppRegistry.runApplication('App', {
        rootTag: window.document.getElementById('react-root'),
      });
}).catch((err) => {
    fm.utils.Log.i('Index', err);
});

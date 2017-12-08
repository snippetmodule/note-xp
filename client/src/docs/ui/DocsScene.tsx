
import rx = require('reactxp');
import fm = require('../../framework');
import { SearchComp } from './SearchComp';

export class DocsScene extends rx.Component<{}, {}> {
    render() {
        return (
            <SearchComp />
        );
    }
}
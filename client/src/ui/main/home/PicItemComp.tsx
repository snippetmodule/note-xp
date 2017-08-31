import rx = require('reactxp');
import react = require('react');

import models = require('../../modles');
import { SimpleItemComp, ArticleItem } from './SimpleItemComp';


export class PicItemComp extends rx.Component<ArticleItem, any>{
    render() {
        return (
            <SimpleItemComp {...this.props}>
                <rx.Button onPress={this.props.onPicBtn}>
                    <rx.Image source={this.props.data.simpleUrl} />
                </rx.Button>
            </SimpleItemComp>
        );
    }
}
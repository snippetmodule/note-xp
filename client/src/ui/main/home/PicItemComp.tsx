import rx = require('reactxp');
import react = require('react');

import models = require('../../modles');
import { SimpleItemComp } from './SimpleItemComp';


export class PicItemComp extends rx.Component<models.Json.Article, any>{
    render() {
        return (
            <SimpleItemComp {...this.props}>
                <rx.Image source={this.props.simpleUrl}>
                </rx.Image>
            </SimpleItemComp>
        );
    }
}
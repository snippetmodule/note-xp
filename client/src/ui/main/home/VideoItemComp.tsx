import rx = require('reactxp');
import react = require('react');

import models = require('../../modles');
import { SimpleItemComp } from './SimpleItemComp';

const styles={
    video:rx.Styles.createImageStyle({
        height:189,
        marginTop:17,
    }),
}
export class VideoItemComp extends rx.Component<models.Json.Article, any>{
    render() {
        return (
            <SimpleItemComp {...this.props}>
                <rx.Image resizeMode='cover' source={this.props.simpleUrl} style={styles.video}>
                </rx.Image>
            </SimpleItemComp>
        );
    }
}
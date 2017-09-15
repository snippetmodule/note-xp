import React = require('react');
import ReactNative = require('react-native');

import fm = require('../../framework');

const styles = ReactNative.StyleSheet.create({
    img: {
        bottom: 90,
    },
});

export default class SplashComponent extends React.Component<any, null> {

    render() {
        return (
            <fm.component.TitleComponent ref="titleLayout" isShowTitle={false} {...this.props}>
                <fm.component.widget.FitImage source={require('../../../asserts/login/logo.png')} style={styles.img} />
            </fm.component.TitleComponent>
        );
    }
}

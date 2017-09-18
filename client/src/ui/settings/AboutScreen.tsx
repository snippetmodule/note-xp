
import React = require('react');
import ReactNative = require('react-native');

import fm = require('../../framework');

const styles = ReactNative.StyleSheet.create({
    img: {
        marginTop: 100,
        alignSelf: 'center',
        height: 60,
        width: 60,
    },
    tex: {
        marginTop: 10,
        fontSize: 16,
        color: '#303030',
        alignSelf: 'center',
    },
});
export = class AboutScreen extends fm.component.NavComp<any, null>{
    render() {
        let version = ReactNative.Platform.Version + '';
        return (
            <fm.component.TitleComponent
                {...this.props}
                title="关于"
            >
                <ReactNative.Image style={styles.img} source={require('../../../asserts/home/menu/ic_fanslist.png')} />
                <ReactNative.Text style={styles.tex}>
                    {`版本号：${version}`}
                </ReactNative.Text>
            </fm.component.TitleComponent>
        );
    }
};
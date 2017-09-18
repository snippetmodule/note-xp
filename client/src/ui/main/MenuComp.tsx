import React = require('react');
import ReactNative = require('react-native');

import fm = require('../../framework');

const styles = ReactNative.StyleSheet.create({
    menuItem: {
        height: 54,
        opacity: 0.9,
        backgroundColor: '#fff',
        paddingLeft: 22,
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuImg: {
        height: 22,
        width: 22,
    },
    menuTex: {
        marginLeft: 17,
        fontSize: 16,
        color: '#333333',
    },
    header: {
        alignItems: 'center',
        height: 144,
    },
    userPic: {
        height: 70, width: 70,
    },
    userNickName: {
        marginTop: 10,
        fontSize: 16,
        color: '#2b2b2b',
    },
    userQr: {
        height: 26,
        width: 26,
        marginTop: 10,
        padding: 5,
    },
    dividLine: {
        height: 1,
        marginLeft: 13,
        marginRight: 13,
        backgroundColor: '#cccccc',
    },
});
interface IMenuProp {
    img: ReactNative.ImageURISource;
    tex: string;
    routerName: string;
}
class MenuItem extends fm.component.NavComp<IMenuProp, null> {
    render() {
        return (
            <ReactNative.TouchableOpacity onPress={this._onPress} style={styles.menuItem}>
                <ReactNative.Image source={this.props.img} style={styles.menuImg} resizeMode="center" />
                <ReactNative.Text style={styles.menuTex}>
                    {this.props.tex}
                </ReactNative.Text>
            </ReactNative.TouchableOpacity>
        );
    }
    _onPress = () => {
        this.go(this.props.routerName);
    }
}
interface IState {
    isLogined: boolean;
    nickName: string;
    userPic: string;
}
export class MenuComp extends fm.component.NavComp<{}, IState> {
    protected _buildState(props: {}, initialBuild: boolean): IState {
        let user = fm.manager.UserManager.getUser();
        return {
            isLogined: user.isLogined,
            nickName: user.isLogined ? user.info.nickName : '',
            userPic: user.isLogined ? user.info.nickName : '',
        };
    }
    render() {
        return (
            <ReactNative.View>
                {/* user pic */}
                <ReactNative.View style={styles.header}>
                    <ReactNative.Image style={styles.userPic} source={require('../../../asserts/home/menu/default_avator.png')} />
                    <ReactNative.Text style={styles.userNickName}>
                        {this.state.nickName}
                    </ReactNative.Text>
                    <ReactNative.Image style={styles.userQr} source={require('../../../asserts/home/menu/ic_fanslist.png')} />
                </ReactNative.View>
                <ReactNative.View style={styles.dividLine}/>
                <MenuItem img={require('../../../asserts/home/menu/ic_drawer_follow.png')} tex="Follow" routerName="about" {...this.props} />
                <MenuItem img={require('../../../asserts/home/menu/ic_fans.png')} tex="粉丝" routerName="about" {...this.props} />
                <MenuItem img={require('../../../asserts/home/menu/ic_group.png')} tex="圈子" routerName="about" {...this.props} />
                <MenuItem img={require('../../../asserts/home/menu/ic_scan.png')} tex="Scan" routerName="about" {...this.props} />
                <MenuItem img={require('../../../asserts/home/menu/ic_personal.png')} tex="个人中心" routerName="about" {...this.props} />
                <MenuItem img={require('../../../asserts/home/menu/ic_setting.png')} tex="设置" routerName="about" {...this.props} />
            </ReactNative.View>
        );
    }
}
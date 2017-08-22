
import RX = require('reactxp');
import React = require('react');

const styles = {
    scroll: RX.Styles.createScrollViewStyle({
        alignSelf: 'stretch',
        backgroundColor: '#fff'
    }),
    container: RX.Styles.createViewStyle({
        justifyContent: 'center',
        alignItems: 'center'
    }),
    titleContainer: RX.Styles.createViewStyle({
        flexDirection: 'column',
        height: 56
    }),
    dividerLine: RX.Styles.createViewStyle({
        height: 0.5,
        backgroundColor: '#d0d0d0'
    }),
}

export interface Prop extends RX.CommonStyledProps<RX.Types.ViewStyle> {
    isShowTitle?: boolean,
    backImg?: string,
    title?: string,
    titleImg?: string,
    right?: string,
    rightImg?: string,
    rightStyle?: any,
    onBack?: () => any,
    onTitle?: () => any,
    onRight?: () => any,
}
interface State {
    children: React.ReactNode | React.ReactNode[];
}
export class TitleComponent extends RX.Component<Prop, State>{
    constructor(prop: Prop, state: State) {
        super(prop, state);
        this.state = { children: this.props.children }
    }
    get titleLayout(): React.Component<any, any> {
        return this.refs['titleLayout'];
    }
    get dividerLine(): React.Component<any, any> {
        return this.refs['dividerLine'];
    }
    render() {
        let backImg = '../../asserts/common/back.png';
        let titleBtn = this.props.titleImg
            ? (
                <RX.Button onPress={this._onPressTitleBtn}>
                    <RX.Image source={this.props.titleImg}>
                    </RX.Image>
                    <RX.Text >
                        {this.props.title}
                    </RX.Text>
                </RX.Button>
            ) : (
                <RX.Button onPress={this._onPressTitleBtn}>
                    <RX.Text >
                        {this.props.title}
                    </RX.Text>
                </RX.Button>
            );
        let rightBtn = this.props.titleImg
            ? (
                <RX.Button onPress={this._onPressRightBtn}>
                    <RX.Image source={this.props.rightImg}>
                    </RX.Image>
                    <RX.Text >
                        {this.props.right}
                    </RX.Text>
                </RX.Button>
            ) : (
                this.props.right
                    ? (<RX.Button onPress={this._onPressRightBtn}>
                        <RX.Text >
                            {this.props.right}
                        </RX.Text>
                    </RX.Button>)
                    : null
            );
        return (
            <RX.ScrollView style={styles.scroll}>
                <RX.View style={styles.container}>
                    <RX.View style={styles.titleContainer} ref='titleLayout'>
                        <RX.Button onPress={this._onPressBackBtn}>
                            <RX.Image source={this.props.backImg || backImg}>
                            </RX.Image>
                        </RX.Button>
                        {titleBtn}
                        {rightBtn}
                        <RX.View style={styles.dividerLine} ref='dividerLine' />
                    </RX.View>
                    {this.state.children}
                </RX.View>
            </RX.ScrollView>
        );
    }
    private _onPressBackBtn() {
        if (this.props.onBack) {
            this.props.onBack();
        } else {
            // navigator back here
        }
    }
    private _onPressTitleBtn() {
        this.props.onTitle && this.props.onTitle();
    }
    private _onPressRightBtn() {
        this.props.onRight && this.props.onRight();
    }
}
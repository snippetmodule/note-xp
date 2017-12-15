import rx = require('reactxp');
import { ICanExpendedItem } from '../doclist/DocListState';

const styles = {
    root: rx.Styles.createViewStyle({
        height: 30,
        flexDirection: 'row',
        alignSelf: 'flex-start',
        alignItems: 'flex-start',
        paddingLeft: 8,
    }),
    docicon: rx.Styles.createImageStyle({
        width: 15,
        height: 15,
        marginLeft: 8,
        marginRight: 8,
    }),
    docname: rx.Styles.createTextStyle({
        fontSize: 14,
        color: '#333',
        textDecorationLine: 'none',
    }),
    pathname: rx.Styles.createTextStyle({
        fontSize: 14,
        color: '#333',
        textDecorationLine: 'none',
    }),
    onFocus: rx.Styles.createTextStyle({
        color: '#3370c0',
        textDecorationLine: 'underline',
    }),
};
interface IBottomMarkProps {
    data: ICanExpendedItem;
    gotoSelectedPath: (pathname: string) => void;
}
interface IState {
    isDocNameFocus: boolean;
    isPathnameFocus: boolean;
}
export class BottomMark extends rx.Component<IBottomMarkProps, any> {
    public render() {
        const { docInfo, docType, docEntry } = this.props.data.data;
        if (!docType && !docEntry) {
            return null;
        }
        return (
            <rx.View style={styles.root}>
                <rx.Image style={styles.docicon} source={require('../../../../asserts/login/logo.png')} />
                <rx.Text
                    style={[]}
                    onPress={this.props.gotoSelectedPath.bind(null, docInfo.pathname)}>
                    {docInfo.name + ' ' + (docInfo.version || '')}
                </rx.Text>
                {
                    docType ? (
                        <rx.Text
                            onPress={this.props.gotoSelectedPath.bind(null, docType.pathname)}>
                            docType.name
                        </rx.Text>
                    ) : null
                }
                <rx.Text >{docEntry ? docEntry.name : ''}</rx.Text>
            </rx.View>
        );
    }
}
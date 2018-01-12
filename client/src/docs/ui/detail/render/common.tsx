import rx = require('reactxp');
import fm = require('../../../../framework');
import { IHtmlElement } from '../../../../framework/component/widget/index';
import { INodeProp, IRenderNodeParams } from '../../../../framework/component/widget/html/HtmlView';

const styles = {
    p: rx.Styles.createTextStyle({
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        marginBottom: 14,
        color: '#333',
        lineHeight: 23,
        fontSize: 14,
        fontWeight: '400',
    }),
    link: rx.Styles.createLinkStyle({
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        fontSize: 14,
        color: '#3377c0',
        fontWeight: '400',
        textDecorationLine: 'none',
    }),
    linkFocus: rx.Styles.createLinkStyle({
        textDecorationLine: 'underline',
    }),
    linkExternal: rx.Styles.createImageStyle({
        width: 8,
        height: 8,
        marginTop: 2,
        marginLeft: 2,
    }),
    pre: rx.Styles.createTextStyle({
        flex: 1,
        flexDirection: 'column',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginTop: 6,
        marginBottom: 18,
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#d8d8d8',
        borderRadius: 3,
        backgroundColor: '#fafafa',
        lineHeight: 21,
        fontSize: 13,
        color: '#333',
        overflow: 'hidden',
    }),
    code: rx.Styles.createTextStyle({
        fontSize: 15,
        lineHeight: 19,
        fontWeight: '400',
    }),
};
export const commonStyles = {
    note: rx.Styles.createViewStyle({
        marginVertical: 8,
        paddingHorizontal: 14,
        paddingVertical: 8,
        backgroundColor: '#f8f8dd',
        borderRadius: 3,
        borderColor: '#d3d952',
        borderWidth: 1,
    }),
    noteGreen: rx.Styles.createViewStyle({
        backgroundColor: '#e7f8e1',
        borderColor: '#89da70',
    }),
    noteBlue: rx.Styles.createViewStyle({
        backgroundColor: '#d4f3fd',
        borderColor: '#94bbeb',
    }),
    noteOrange: rx.Styles.createViewStyle({
        backgroundColor: '#fbe6d1',
        borderColor: '#ec8b01',
    }),
    noteRed: rx.Styles.createViewStyle({
        backgroundColor: '#fed5d3',
        borderColor: '#dc7874',
    }),
    label: rx.Styles.createViewStyle({
        marginHorizontal: 1,
        paddingTop: 1,
        paddingRight: 4,
        paddingBottom: 2,
        borderRadius: 3,
        backgroundColor: '#f4f4f4',
    }),
    blockLabel: rx.Styles.createTextStyle({
        marginTop: 32,
        marginBottom: 16,
        paddingLeft: 8,
        paddingRight: 8,
        color: '#333',
        borderRadius: 2,
        borderWidth: 1,
        borderColor: '#d8d8d8',
        lineHeight: 21,
    }),
};
export interface IRenderItemProp {
    onClick: (url: string) => any;
    node: IHtmlElement;
    index: number;
    list: IHtmlElement[];
    parent: IHtmlElement;
}
export function renderNode(onClick: (url: string) => any, props: IRenderNodeParams): JSX.Element {
    if (props.node.type !== 'tag') { return null; }
    switch (props.node.name) {
        // case 'a':
        //     return (<A {...prop} />);
        default: return null;
    }
}
export function getNodeProp(onClick: (url: string) => any, props: IRenderNodeParams): INodeProp {
    if (props.node.type !== 'tag') { return null; }
    switch (props.node.name) {
        case 'p':
            return {
                style: styles.p,
                key: `${props.node.name}_${props.node.children.length}_${props.index}`,
            };
        case 'a':
            const href: string = props.node.attribs.href;
            const isExternalLink = href.startsWith('http:') || href.startsWith('https:');
            return {
                key: href + props.index,
                style: styles.link,
                onClick: onClick.bind(null, href),
                childView: isExternalLink ? (
                    <rx.Image
                        key={`${props.node.name}_${props.node.children.length}_${props.index}_child`}
                        style={styles.linkExternal}
                        source={require('../../../../../asserts/login/logo.png')} />
                ) : null,
            };
        case 'pre':
            return {
                style: styles.pre,
                key: `${props.node.name}_${props.node.children.length}_${props.index}`,
            };
        case 'code':
            if (props.parent.name === 'a') {
                let style = { ...styles.link as rx.Types.LinkStyle, ...styles.code as rx.Types.TextStyle };
                return { style: style };
            }
            return { style: styles.code };
        default: return null;
    }
}
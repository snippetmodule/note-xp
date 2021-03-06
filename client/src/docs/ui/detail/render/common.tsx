import * as react from 'react';
import rx = require('reactxp');
import fm = require('../../../../framework');
import { IHtmlElement } from '../../../../framework/component/widget/index';
import { INodeProp, IRenderNodeParams } from '../../../../framework/component/widget/html/HtmlView';

const styles = {
    h1Root: rx.Styles.createViewStyle({
        flex: 1,
        flexDirection: 'row',
        marginBottom: 21,
        alignItems: 'center',
        justifyContent: 'space-between',
        wordBreak: 'break-word',
        overflow: 'hidden',
    }),
    h1Text: rx.Styles.createTextStyle({
        fontSize: 21,
        fontWeight: '600',
        color: '#333',
        lineHeight: 27,
    }),
    h1After: rx.Styles.createViewStyle({
        backgroundColor: '#e5e5e5',
        height: 1,
        flex: 1,
        marginLeft: 16,
    }),
    p: rx.Styles.createTextStyle({
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        marginVertical: 3,
        color: '#333',
        lineHeight: 23,
        fontSize: 14,
        fontWeight: '400',
    }),
    link: rx.Styles.createLinkStyle({
        flexDirection: 'row',
        justifyContent: 'flex-start',
        fontSize: 14,
        color: '#3377c0',
        fontWeight: '400',
        lineHeight: 23,
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
        alignSelf: 'stretch',
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
    _links: rx.Styles.createTextStyle({
        position: 'absolute',
        backgroundColor: '#fff',
        top: 18, right: 20,
        textAlign: 'right',
    }),
    table: rx.Styles.createViewStyle({
        marginVertical: 21,

    }),
    captionOfTable: rx.Styles.createTextStyle({
        flex: 1,
        alignSelf: 'center',
        fontWeight: '400',
        paddingHorizontal: 10,
        paddingBottom: 5,
    }),
    thead: rx.Styles.createViewStyle({
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
        backgroundColor: '#f5f5f5',
        borderColor: '#d8d8d8',
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
    }),
    tbody: rx.Styles.createViewStyle({
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
        borderRadius: 3,
        borderColor: '#d8d8d8',
        borderWidth: 1,
    }),
    tr: rx.Styles.createViewStyle({
        flex: 1,
        flexDirection: 'row',
    }),
    td: rx.Styles.createViewStyle({
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderColor: '#e5e5e5',
        borderRightWidth: 1,
        borderBottomWidth: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
    }),
    dl: rx.Styles.createViewStyle({
        marginVertical: 5,
    }),
    dt: rx.Styles.createTextStyle({
        fontWeight: '500',
    }),
    dd: rx.Styles.createTextStyle({
        marginVertical: 5,
        marginHorizontal: 5,
        paddingLeft: 14,
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 23,
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
        flexDirection: 'row',
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
class H1 extends rx.Component<IRenderNodeParams & { onClick: (url: string) => any }, {}> {
    componentDidCatch(error: Error, errorInfo: react.ErrorInfo) {
        console.log(`${error.message},${errorInfo.componentStack}`);
    }
    render() {
        return (
            <rx.View style={styles.h1Root}>
                <rx.Text style={styles.h1Text}>
                    {this.props.domToElement(this.props.node.children, this.props.node, styles.h1Text)}
                </rx.Text>
                <rx.View style={styles.h1After} />
            </rx.View>
        );
    }
}
class A extends rx.Component<IRenderNodeParams & { onClick: (url: string) => any }, {}> {
    componentDidCatch(error: Error, errorInfo: react.ErrorInfo) {
        console.log(`${error.message},${errorInfo.componentStack}`);
    }
    render() {
        const href: string = this.props.node.attribs.href;
        const isExternalLink = href && (href.startsWith('http:') || href.startsWith('https:'));
        const isPLinks = this.props.parent && this.props.parent.name === 'p' && this.props.parent.attribs.class === '_links';

        let childView: react.ReactNode = isPLinks ? '  ' : null;
        if (childView == null && isExternalLink) {
            childView = (
                <rx.Image style={styles.linkExternal}
                    source={require('../../../../../asserts/login/logo.png')} />
            );
        }
        return (
            <fm.component.widget.Link
                url={this.props.node.attribs.href}
                style={[styles.link, this.props.node.attribs.class === '_links-link' ? { paddingHorizontal: 16 } : null]}
                focusStyle={styles.linkFocus}
                onClick={this.props.onClick.bind(null, href)}>
                {this.props.domToElement(this.props.node.children, this.props.node, styles.link)}
                {childView}
            </fm.component.widget.Link>
        );
    }
}
export function renderNode(onClick: (url: string) => any, props: IRenderNodeParams): JSX.Element {
    if (props.node.type !== 'tag') { return null; }
    switch (props.node.name) {
        case 'h1':
            return (<H1 {...props} onClick={onClick} key={`${props.node.name}_${props.node.children.length}_${props.index}`} />);
        case 'a':
            return (<A {...props} onClick={onClick} key={`${props.node.name}_${props.node.children.length}_${props.index}`} />);
        default: return null;
    }
}
export function getNodeProp(onClick: (url: string) => any, props: IRenderNodeParams): INodeProp {
    if (props.node.type !== 'tag') { return null; }
    switch (props.node.name) {
        case 'table':
            return {
                style: styles.table,
                key: `${props.node.name}_${props.node.children.length}_${props.index}`,
            };
        case 'thead':
            return {
                style: styles.thead,
                key: `${props.node.name}_${props.node.children.length}_${props.index}`,
            };
        case 'tbody':
            return {
                style: styles.tbody,
                key: `${props.node.name}_${props.node.children.length}_${props.index}`,
            };
        case 'tr':
            return {
                style: styles.tr,
                key: `${props.node.name}_${props.node.children.length}_${props.index}`,
            };
        case 'th':
        case 'td':
            return {
                style: rx.Styles.combine(styles.td, { width: (props.index + 1) * 262 }) as rx.Types.ViewStyleRuleSet,
                key: `${props.node.name}_${props.node.children.length}_${props.index}`,
            };
        case 'caption':
            if (props.parent && props.parent.name === 'table') {
                return {
                    style: styles.captionOfTable,
                    key: `${props.node.name}_${props.node.children.length}_${props.index}`,
                };
            }
        case 'dl':
            return {
                style: styles.dl,
                key: `${props.node.name}_${props.node.children.length}_${props.index}`,
            };
        case 'dt':
            return {
                style: styles.dt,
                key: `${props.node.name}_${props.node.children.length}_${props.index}`,
            };
        case 'dd':
            return {
                style: styles.dd,
                key: `${props.node.name}_${props.node.children.length}_${props.index}`,
            };
        case 'p':
            if (props.node.attribs.class === '_links') {
                return {
                    style: styles._links,
                };
            }
            return {
                style: styles.p,
                key: `${props.node.name}_${props.node.children.length}_${props.index}`,
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
    }
    return null;
}
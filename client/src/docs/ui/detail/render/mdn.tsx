import rx = require('reactxp');
import fm = require('../../../../framework');
import { IHtmlElement } from '../../../../framework/component/widget/index';
import { IRenderItemProp, commonStyles } from './common';
import { INodeProp, IRenderNodeParams } from '../../../../framework/component/widget/html/HtmlView';

const styles = {
    index: rx.Styles.createViewStyle({
        flexDirection: 'column',
        flexWrap: 'wrap',
    }),
    spanOfIndex: rx.Styles.createTextStyle({
        fontWeight: '500',
        fontSize: 16,
        lineHeight: 27,
        color: '#333',
        width: 224,
        flex: 1,
    }),
    ul: rx.Styles.createViewStyle({
        marginBottom: 14,
        width: 224,
        flexDirection: 'column',
    }),
    li: rx.Styles.createViewStyle({
        paddingLeft: 14,
    }),
    h1: rx.Styles.createTextStyle({
        flex: 1,
        flexDirection: 'row',
        marginBottom: 21,
        fontSize: 21,
        alignItems: 'center',
        justifyContent: 'space-between',
        fontWeight: '600',
        color: '#333',
        wordBreak: 'break-word',
        overflow: 'hidden',
        lineHeight: 27,
    }),
    h1After: rx.Styles.createViewStyle({
        backgroundColor: '#e5e5e5',
        height: 1,
        flex: 1,
        marginLeft: 16,
    }),
    h2: rx.Styles.createTextStyle({
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'stretch',
        backgroundColor: '#f5f5f5',
        borderColor: '#d8d8d8',
        borderWidth: 1,
        borderRadius: 3,
        marginBottom: 16,
        marginTop: 8,
        marginHorizontal: 0,
        paddingVertical: 8,
        paddingHorizontal: 12,
        fontSize: 16,
        fontWeight: '500',
        color: '#333333',
        overflow: 'hidden',
        lineHeight: 20,
    }),
    h3: rx.Styles.createTextStyle({
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'stretch',
        backgroundColor: '#d4f3fd',
        borderColor: '#94bbeb',
        borderWidth: 1,
        borderRadius: 2,
        marginBottom: 14,
        marginTop: 8,
        marginHorizontal: 0,
        paddingBottom: 2,
        paddingTop: 1,
        paddingHorizontal: 7,
        fontSize: 14,
        fontWeight: '500',
        color: '#333',
        overflow: 'hidden',
        lineHeight: 22,
    }),
    h4: rx.Styles.createTextStyle({
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'stretch',
        marginBottom: 14,
        marginTop: 5,
        fontSize: 14,
        fontWeight: '500',
        color: '#333',
        overflow: 'hidden',
        lineHeight: 18,
    }),
};

export function renderNode(onClick: (url: string) => any, props: IRenderNodeParams): JSX.Element {
    if (props.node.type !== 'tag') { return null; }
    return null;
}
export function getNodeProp(onClick: (url: string) => any, props: IRenderNodeParams): INodeProp {
    if (props.node.type !== 'tag') { return null; }
    switch (props.node.name) {
        case 'h1':
            return {
                style: styles.h1,
                key: `${props.node.name}_${props.node.children.length}_${props.index}`,
                // childView: (
                //     <rx.View
                //         key={`${props.node.name}_${props.node.children.length}_${props.index}_child`}
                //         style={styles.h1After} />
                // ),
            };
        case 'h2':
            return {
                style: styles.h2,
                key: `${props.node.name}_${props.node.children.length}_${props.index}`,
            };
        case 'h3':
            return {
                style: styles.h3,
                key: `${props.node.name}_${props.node.children.length}_${props.index}`,
            };
        case 'h4':
            return {
                style: styles.h4,
                key: `${props.node.name}_${props.node.children.length}_${props.index}`,
            };
        case 'span':
            if (props.parent.attribs.class === 'index') {
                return {
                    style: styles.spanOfIndex,
                    key: `${props.node.name}_${props.node.children.length}_${props.index}`,
                };
            }
    }
    switch (props.node.attribs.class) {
        case 'note':
        case 'notice':
        case 'overheadIndicator':
        case 'syntaxbox':
        case 'twopartsyntaxbox':
        case 'inheritsbox':
            return {
                style: commonStyles.note,
                key: `${props.node.name}_${props.node.children.length}_${props.index}`,
            };
        // case 'eval': // warning :first-of-type
        //     const index = props.list.indexOf(props.node);
        //     const isFirst = props.list.find((v, i) => {
        //         if (i >= index) { return true; }
        //         if (v.attribs.class === props.node.attribs.class) { return false; }
        //         return false;
        //     }) && true;
        //     if (isFirst) {
        //         return {
        //             style: commonStyles.note,
        //             key: `${props.node.name}_${props.node.children.length}_${props.index}`,
        //         };
        //     }
        //     break;
        // case 'index':
        //     return {
        //         style: styles.index,
        //     };
        // case 'ul':
        //     return {
        //         style: styles.ul,
        //         key: `${props.node.name}_${props.node.children.length}_${props.index}`,
        //     };
        // case 'li':
        //     return {
        //         style: styles.li,
        //         key: `${props.node.name}_${props.node.children.length}_${props.index}`,
        //     };
    }
    return null;
}
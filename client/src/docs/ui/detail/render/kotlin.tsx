import rx = require('reactxp');
import fm = require('../../../../framework');
import { IHtmlElement } from '../../../../framework/component/widget/index';
import * as common from './common';
import * as mdn from './mdn';
import { INodeProp, IRenderNodeParams } from '../../../../framework/component/widget/html/HtmlView';

export function renderNode(onClick: (url: string) => any, props: IRenderNodeParams): JSX.Element {
    switch (props.node.attribs.class) {
        case 'api-docs-breadcrumbs':
            return (
                <rx.Text style={common.commonStyles.note} key={`${props.node.name}_${props.node.children.length}_${props.index}`}>
                    {props.domToElement(props.node.children, props.node, common.commonStyles.note)}
                </rx.Text>
            );
    }
    return null;
}
export function getNodeProp(onClick: (url: string) => any, props: IRenderNodeParams): INodeProp {
    if (props.node.type !== 'tag') { return null; }
    return null;
}
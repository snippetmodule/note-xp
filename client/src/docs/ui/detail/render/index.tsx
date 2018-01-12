import rx = require('reactxp');
import fm = require('../../../../framework');
import common = require('./common');
import mdn = require('./mdn');
import { IHtmlElement } from '../../../../framework/component/widget/index';
import { INodeProp, IRenderNodeParams } from '../../../../framework/component/widget/html/HtmlView';

export function renderNode(
    slug: string,
    onClick: (url: string) => any,
    params: IRenderNodeParams): JSX.Element {
    if (params.node.type !== 'tag') { return null; }
    let view = common.renderNode(onClick, params);
    if (view) { return view; }
    return mdn.renderNode(onClick, params);
}
export function getNodeProp(
    slug: string,
    onClick: (url: string) => any,
    params: IRenderNodeParams): INodeProp {
    if (params.node.type !== 'tag') { return null; }
    let commProp: INodeProp = common.getNodeProp(onClick, params);
    let mdnProp: INodeProp = mdn.getNodeProp(onClick, params);
    if (commProp == null || mdnProp == null) {
        return commProp || mdnProp || null;
    }
    let style = { ...commProp.style as rx.Types.ViewStyle, ...mdnProp.style as rx.Types.ViewStyle };
    return { ...commProp, ...mdnProp, style: style };
}
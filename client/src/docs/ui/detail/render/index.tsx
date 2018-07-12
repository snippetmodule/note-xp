import rx = require('reactxp');
import fm = require('../../../../framework');
import common = require('./common');
import mdn = require('./mdn');
import kotlin = require('./kotlin');
import { IHtmlElement } from '../../../../framework/component/widget/index';
import { INodeProp, IRenderNodeParams } from '../../../../framework/component/widget/html/HtmlView';

const render: { [key: string]: any } = {
    kotlin: kotlin,
};
export function renderNode(slug: string, onClick: (url: string) => any, params: IRenderNodeParams): JSX.Element {
    if (params.node.type !== 'tag') { return null; }
    let view = render[slug] && render[slug].renderNode(onClick, params);
    if (view) { return view; }
    view = common.renderNode(onClick, params);
    if (view) { return view; }
    return mdn.renderNode(onClick, params);
}
export function getNodeProp(slug: string, onClick: (url: string) => any, params: IRenderNodeParams): INodeProp {
    if (params.node.type !== 'tag') { return null; }
    let commProp: INodeProp = common.getNodeProp(onClick, params);
    let mdnProp: INodeProp = mdn.getNodeProp(onClick, params);
    let otherProp: INodeProp = render[slug] && render[slug].getNodeProp(onClick, params);
    if (commProp == null || mdnProp == null || otherProp == null) {
        return commProp || mdnProp || otherProp || null;
    }
    let style = { ...commProp.style as rx.Types.ViewStyle, ...mdnProp.style as rx.Types.ViewStyle, ...otherProp.style as rx.Types.ViewStyle };
    return { ...commProp, ...mdnProp, ...otherProp, style: style };
}
import * as react from 'react';
import * as entities from 'entities';
import * as htmlparser from 'htmlparser2';
import rx = require('reactxp');

import { FitImage } from '../FitImage';

interface IProp {
    lineBreak?: string;
    paragraphBreak?: string;
    bullet?: string;
    renderNode?: (node: IHtmlElement,
                  index: number,
                  list: IHtmlElement[],
                  parent: IHtmlElement,
                  domToElement?: (dom: IHtmlElement[], parent: IHtmlElement) => JSX.Element[]) => any;
    TextComponent?: typeof rx.Text;
    textComponentProps?: rx.Types.TextProps;
    NodeComponent?: typeof rx.View;
    nodeComponentProps?: rx.Types.ViewProps;
    styles?: {
        [key: string]: any;
    };
    onLinkPress?: (url: string) => any;
    onLinkLongPress?: (url: string) => any;
    addLineBreaks?: boolean;
}

const defaultOpts: IProp = {
    lineBreak: '\n',
    paragraphBreak: '\n\n',
    bullet: '\u2022 ',
    onLinkPress: (url) => { },
    TextComponent: rx.Text,
    NodeComponent: rx.View,
};
typeof rx.Text;
const Img = (props: { key: number, attribs: any }) => {
    const width =
        parseInt(props.attribs['width'], 10) || parseInt(props.attribs['data-width'], 10) || 0;
    const height =
        parseInt(props.attribs['height'], 10) ||
        parseInt(props.attribs['data-height'], 10) ||
        0;
    const imgStyle = {
        width,
        height,
    };
    return <FitImage source={props.attribs.src} style={imgStyle} />;
};

export function htmlToElement(rawHtml: string, customOpts: IProp = defaultOpts, done: (err: Error, components: JSX.Element[]) => any) {
    const opts = {
        ...defaultOpts,
        ...customOpts,
    };

    function inheritedStyle(parent: IHtmlElement): rx.Types.ViewStyle {
        if (!parent) { return null; }
        const style = opts.styles[parent.name] || {};
        const parentStyle = inheritedStyle(parent.parent) || {};
        return { ...parentStyle, ...style };
    }

    function domToElement(dom: IHtmlElement[], parent: IHtmlElement = null): JSX.Element[] {
        if (!dom) { return null; }

        const renderNode = opts.renderNode;
        let orderedListCounter = 1;
        return dom.map((node, index, list) => {
            if (renderNode) {
                const rendered = renderNode(node, index, list, parent, domToElement);
                if (rendered) { return rendered; }
            }
            const { TextComponent } = opts;
            if (node.type === 'text') {
                const defaultStyle = opts.textComponentProps ? opts.textComponentProps.style : null;
                const customStyle = inheritedStyle(parent);
                return (
                    <TextComponent
                        {...opts.textComponentProps}
                        key={index}
                        style={[defaultStyle, customStyle]}
                    >
                        {entities.decodeHTML(node.data)}
                    </TextComponent>
                );
            }

            if (node.type === 'tag') {
                if (node.name === 'img') {
                    return <Img key={index} attribs={node.attribs} />;
                }

                let linkPressHandler = null;
                let linkLongPressHandler = null;
                if (node.name === 'a' && node.attribs && node.attribs.href) {
                    linkPressHandler = () => opts.onLinkPress(entities.decodeHTML(node.attribs.href));
                    if (opts.onLinkLongPress) {
                        linkLongPressHandler = () => opts.onLinkLongPress(entities.decodeHTML(node.attribs.href));
                    }
                }

                let linebreakBefore = null;
                let linebreakAfter = null;
                if (opts.addLineBreaks) {
                    switch (node.name) {
                        case 'pre':
                            linebreakBefore = opts.lineBreak;
                            break;
                        case 'p':
                            if (index < list.length - 1) {
                                linebreakAfter = opts.paragraphBreak;
                            }
                            break;
                        case 'br':
                        case 'h1':
                        case 'h2':
                        case 'h3':
                        case 'h4':
                        case 'h5':
                            linebreakAfter = opts.lineBreak;
                            break;
                    }
                }

                let listItemPrefix = null;
                if (node.name === 'li') {
                    const defaultStyle = opts.textComponentProps ? opts.textComponentProps.style : null;
                    const customStyle = inheritedStyle(parent);

                    if (parent.name === 'ol') {
                        listItemPrefix = (
                            <TextComponent style={[defaultStyle, customStyle]}>
                                {`${orderedListCounter++}. `}
                            </TextComponent>
                        );
                    } else if (parent.name === 'ul') {
                        listItemPrefix = (
                            <TextComponent style={[defaultStyle, customStyle]}>
                                {opts.bullet}
                            </TextComponent>
                        );
                    }
                    if (opts.addLineBreaks && index < list.length - 1) {
                        linebreakAfter = opts.lineBreak;
                    }
                }

                const { NodeComponent, styles } = opts;
                return (
                    <NodeComponent
                        {...opts.nodeComponentProps}
                        key={index}
                        onPress={linkPressHandler}
                        style={!node.parent ? styles[node.name] : null}
                        onLongPress={linkLongPressHandler}
                    >
                        {linebreakBefore}
                        {listItemPrefix}
                        {domToElement(node.children, node)}
                        {linebreakAfter}
                    </NodeComponent>
                );
            }
        });
    }
    let handler = new (htmlparser as any).DomHandler((error: Error, dom: IHtmlElement[]) => {
        done(error, error ? null : domToElement(dom));
        console.log(dom);
    });
    let parser = new htmlparser.Parser(handler);
    parser.write(rawHtml);
    parser.end();
}

export interface IHtmlElement {
    data?: string;
    type: string;
    name?: string;
    attribs?: {
        [key: string]: any,
    };
    parent?: IHtmlElement;
    children?: IHtmlElement[];
}
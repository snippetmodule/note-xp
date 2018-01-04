import rx = require('reactxp');
import { DeviceUtils } from '../../../utils/index';
import { ICanExpendedItem } from '../../../../docs/ui/doclist/DocListState';
import { CSSProperties } from 'react';

const rootStyle: CSSProperties = {
    flex: 1,
    paddingTop: 18,
    paddingLeft: 24,
    overflowX: 'hidden',
    overflowY: 'auto',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    flexDirection: 'column',
};
interface IDocContentProp {
    pathname: string;
    htmlResponse?: string;
    clickExpendedItem?: ICanExpendedItem;
    gotoSelectedPath: (pathname: string) => void;
}

interface IProp {
    pathname: string;
    htmlContent: string;
    cssStyle?: any;
    className?: string;
    onClick: (path: string) => void;
    filterLink: (host: string) => boolean;
}
class HtmlView extends rx.Component<IProp, {}> {
    private rootElem: HTMLElement;
    componentDidMount() {
        this._setOnClick();
    }
    componentDidUpdate(prevProps: IProp, prevState: {}, prevContext: any) {
        this._setOnClick();
    }
    _setOnClick = () => {
        if (!this.rootElem || !this.rootElem.getElementsByTagName) {
            return;
        }
        let nextScroolToElement: string = null;
        const links = this.rootElem.getElementsByTagName('a');
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < links.length; i++) {
            const link = links[i];
            link.onclick = (event: MouseEvent) => {
                event.preventDefault();
                event.stopPropagation();
                if (this.props.filterLink(link.host)) {
                    let split = this.props.pathname.split('/');
                    this.props.onClick(`/${split[1]}/${split[2]}${link.pathname}${link.hash}`);
                } else {
                    window.open(link.href);
                }
            };
        }
        nextScroolToElement = this.props.pathname.split('#')[1];
        if (nextScroolToElement) {
            const element = document.getElementById(nextScroolToElement);
            if (element) {
                this.rootElem.scrollTop = element.offsetTop;
            }
        } else {
            this.rootElem.scrollTop = 0;
        }
    }
    render() {
        let isWeb = DeviceUtils.isWeb;
        if (DeviceUtils.isWeb) {
            return (
                <div style={rootStyle}>
                    <div ref={ref => this.rootElem = ref}>
                        {
                            this.props.cssStyle ?
                                (
                                    <style scoped={true}>
                                        {this.props.cssStyle}
                                    </style>
                                )
                                : null
                        }
                        <div
                            dangerouslySetInnerHTML={{ __html: this.props.htmlContent }} />
                    </div >
                </div>

            );
        }
        return null;
    }
}

export default HtmlView;
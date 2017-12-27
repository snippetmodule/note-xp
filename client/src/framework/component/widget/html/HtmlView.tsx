import rx = require('reactxp');
import { DeviceUtils } from '../../../utils/index';
interface IProp {
    pathname: string;
    htmlContent: string;
    className: string;
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
                <div ref={ref => this.rootElem = ref}
                    dangerouslySetInnerHTML={{ __html: this.props.htmlContent }}
                    className={this.props.className} />
            );
        }
        return null;
    }
}

export default HtmlView;
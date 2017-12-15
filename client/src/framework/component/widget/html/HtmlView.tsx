import rx = require('reactxp');
import { DeviceUtils } from '../../../utils/index';
interface IProp {
    htmlContent: string;
    className: string;
}
class HtmlView extends rx.Component<IProp, {}> {

    render() {
        let isWeb = DeviceUtils.isWeb;
        if (DeviceUtils.isWeb) {
            return (
                <div
                    dangerouslySetInnerHTML={{ __html: this.props.htmlContent }}
                    className={this.props.className} />
            );
        }
        return null;
    }
}

export default HtmlView;
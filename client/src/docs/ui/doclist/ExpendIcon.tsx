
import rx = require('reactxp');
import { default as RXImageSvg, SvgPath as RXSvgPath } from 'reactxp-imagesvg';

export interface IPorps extends rx.CommonStyledProps<rx.Types.ViewStyleRuleSet> {
    focsusColor: string;
    fillColor: string;
    size: number;
    isExpend: boolean;
}
const loadingValue = new rx.Animated.Value(0);

const styles = {
    expend: rx.Styles.createViewStyle({
        transform: [
            {
                rotate: '90',
            },
        ],
    }),
    cosollape: rx.Styles.createViewStyle({
        transform: [
            {
                rotate: '0',
            },
        ],
    }),
};
export class ExpandIcon extends rx.Component<IPorps, any> {
    private _ExpendAnim = rx.Animated.timing(loadingValue, {
        toValue: 1,
        duration: 30,
        easing: rx.Animated.Easing.Linear(),
    });
    private _CollopsdAnim = rx.Animated.timing(loadingValue, {
        toValue: 1,
        duration: 30,
        easing: rx.Animated.Easing.Linear(),
    });
    componentDidUpdate(prevProps: IPorps, prevState: any, prevContext: any): void {
        if (this.props.isExpend) {
            this._ExpendAnim.start();
        } else {
            this._CollopsdAnim.start();
        }
    }
    render() {
        const size = this.props.size;
        const expendIcon = 'M 15 10 c 0 0.3 -0.305 0.515 -0.305 0.515 l -8.56 5.303 c -0.625 0.41 -1.135 0.106 -1.135 -0.67 V 4.853 c 0 -0.777 0.51 -1.078 1.135 -0.67 l 8.56 5.305 S 15 9.702 15 10 Z';
        return (
            <rx.View style={[this.props.style]}>
                <RXImageSvg
                    style={this.props.isExpend ? styles.expend : styles.cosollape}
                    viewBox={'0 0 ' + size + ' ' + size}
                    width={size}
                    height={size}
                >
                    <RXSvgPath
                        fillColor={this.props.fillColor}
                        d={expendIcon}
                    />
                </RXImageSvg>
            </rx.View >
        );
    }
}
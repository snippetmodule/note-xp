
import rx = require('reactxp');

const styles = {
    root: rx.Styles.createViewStyle({
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }),
    content: rx.Styles.createViewStyle({
        justifyContent: 'center',
        flexDirection: 'column',
        padding: 15,
        maxWidth: 600,
        backgroundColor: '#e7f8e1',
        borderColor: '#89da70',
        borderWidth: 1,
    }),
    list: rx.Styles.createViewStyle({
        justifyContent: 'center',
        flexDirection: 'column',
        marginVertical: 16,
        paddingLeft: 36,
    }),
};

export class Home extends rx.Component<any, any> {
    public render() {
        return (
            <rx.View style={styles.root}>
                <rx.View style={styles.content}>
                    <rx.Text>欢迎使用DevDocs!</rx.Text>
                    <rx.Text>DevDocs包含了超过60种API文档，是程序员的必备法宝。下面是几点使用技巧：</rx.Text>
                    <rx.View style={styles.list}>
                        <rx.Text>1. 搜索支持模糊匹配，比如搜索"background-clip"只需输入"bgcp"</rx.Text>
                        <rx.Text>2. 输入文档名称按"Tab"键，可以搜索此文档内的内容。比如要搜索PHP中的array_push，则先输入"PHP"，按Tab，然后再输入"array_push"</rx.Text>
                        <rx.Text>3. 如果本文档对您有帮助，请分享给更多的人。您也可以<a href="#">资助我们</a>，帮助我们努力完善更多内容</rx.Text>
                    </rx.View>
                    <rx.Text>Happy coding!</rx.Text>
                </rx.View>
            </rx.View>
        );
    }
}
import 'dart:async';
import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';
import 'package:flutter/services.dart';
import 'package:client/generated/i18n.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:share/share.dart';
import 'package:client/utils/log.dart';

class WebViewPage extends StatefulWidget {
  final _logger = Logger("WebViewPage");

  final String url;
  final String title;
  final bool isShowMenu;

  WebViewPage(this.url, {this.title, this.isShowMenu = true});

  @override
  _WebViewPageState createState() => _WebViewPageState();
}

class _WebViewPageState extends State<WebViewPage> {
  final Completer<WebViewController> _controller =
      Completer<WebViewController>();
  int _stackToView = 1;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: widget.url.contains("hideTitle=1")
          ? null
          : AppBar(
              title: widget.title == null ? null : Text(widget.title),
              // This drop down menu demonstrates that Flutter widgets can be shown over the web view.
              actions: !widget.isShowMenu
                  ? null
                  : <Widget>[
                      // NavigationControls(_controller.future),
                      MoreMenu(_controller.future),
                    ],
            ),
      // We're using a Builder here so we have a context that is below the Scaffold
      // to allow calling Scaffold.of(context) so we can show a snackbar.
      body: IndexedStack(index: _stackToView, children: [
        WebView(
          initialUrl: widget.url,
          javascriptMode: JavascriptMode.unrestricted,
          onWebViewCreated: (WebViewController webViewController) {
            widget._logger.d('Page loading: ${widget.url}');
            _controller.complete(webViewController);
          },
          // ignore: prefer_collection_literals
          javascriptChannels: <JavascriptChannel>[
            _toasterJavascriptChannel(context),
          ].toSet(),
          navigationDelegate: (NavigationRequest request) {
//            if (request.url.startsWith('https://www.youtube.com/')) {
//              print('blocking navigation to $request}');
//              return NavigationDecision.prevent;
//            }
            print('allowing navigation to $request');
            widget._logger.d('allowing navigation to $request');
//            if (request.isForMainFrame) {
//              setState(() {
//                _stackToView = 1;
//              });
//            } else {
//              setState(() {
//                _stackToView = 0;
//              });
//            }
            return NavigationDecision.navigate;
          },
          onPageFinished: (String url) {
            widget._logger.d('Page finished loading: $url');
            setState(() {
              _stackToView = 0;
            });
          },
        ),
        Container(
          color: Colors.white,
          child: Center(
            child: CircularProgressIndicator(),
          ),
        ),
      ]),
    );
  }

  JavascriptChannel _toasterJavascriptChannel(BuildContext context) {
    return JavascriptChannel(
        name: 'Toaster',
        onMessageReceived: (JavascriptMessage message) {
          Scaffold.of(context).showSnackBar(
            SnackBar(content: Text(message.message)),
          );
        });
  }
}

enum MenuOptions {
  reload,
  share,
  copyLink,
  openByBrowser,
}

class MoreMenu extends StatelessWidget {
  MoreMenu(this.controller);

  final Future<WebViewController> controller;
  final CookieManager cookieManager = CookieManager();

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<WebViewController>(
      future: controller,
      builder:
          (BuildContext context, AsyncSnapshot<WebViewController> controller) {
        return PopupMenuButton<MenuOptions>(
          onSelected: (MenuOptions value) {
            switch (value) {
              case MenuOptions.reload:
                _reload(controller.data, context);
                break;
              case MenuOptions.share:
                _share(controller.data, context);
                break;
              case MenuOptions.copyLink:
                _copyLink(controller.data, context);
                break;
              case MenuOptions.openByBrowser:
                _openByBrowser(controller.data, context);
                break;
            }
          },
          itemBuilder: (BuildContext context) => <PopupMenuEntry<MenuOptions>>[
                PopupMenuItem<MenuOptions>(
                  value: MenuOptions.reload,
                  child: _getMenuChild(S.of(context).reload),
                ),
                PopupMenuDivider(height: 0.5),
                PopupMenuItem<MenuOptions>(
                  value: MenuOptions.share,
                  child: _getMenuChild(S.of(context).share),
                ),
                PopupMenuDivider(height: 0.5),
                PopupMenuItem<MenuOptions>(
                  value: MenuOptions.copyLink,
                  child: _getMenuChild(S.of(context).copy),
                ),
                PopupMenuDivider(height: 0.5),
                PopupMenuItem<MenuOptions>(
                  value: MenuOptions.openByBrowser,
                  child: _getMenuChild(S.of(context).web_menu_open_by_browser),
                ),
              ],
        );
      },
    );
  }

  Widget _getMenuChild(String menu) {
    return Text(menu);
//    return Container(
//        height: double.infinity,
//        width: double.infinity,
//        color: Colors.red,
//        child: Center(
//            child: Text(
//          menu,
//          textAlign: TextAlign.center,
//        )));
  }

  void _reload(WebViewController controller, BuildContext context) async {
    await controller.reload();
  }

  void _share(WebViewController controller, BuildContext context) async {
    String url = await controller.currentUrl();
    await Share.share('link: $url');
  }

  void _copyLink(WebViewController controller, BuildContext context) async {
    String url = await controller.currentUrl();
    await Clipboard.setData(ClipboardData(text: url));
    Scaffold.of(context)
        .showSnackBar(SnackBar(content: Text(S.of(context).copy_success)));
  }

  void _openByBrowser(
      WebViewController controller, BuildContext context) async {
    String url = await controller.currentUrl();
    if (await canLaunch(url)) {
      await launch(url);
    }
  }
}

class NavigationControls extends StatelessWidget {
  const NavigationControls(this._webViewControllerFuture)
      : assert(_webViewControllerFuture != null);

  final Future<WebViewController> _webViewControllerFuture;

  void _goBack(
      BuildContext context, AsyncSnapshot<WebViewController> snapshot) async {
    final bool webViewReady = snapshot.connectionState == ConnectionState.done;
    final WebViewController controller = snapshot.data;
    if (!webViewReady) return;

    if (await controller.canGoBack()) {
      await controller.goBack();
    }
//    Scaffold.of(context).showSnackBar(
//      const SnackBar(content: Text("No back history item")),
//    );
    return;
  }

  void _goForward(
      BuildContext context, AsyncSnapshot<WebViewController> snapshot) async {
    final bool webViewReady = snapshot.connectionState == ConnectionState.done;
    final WebViewController controller = snapshot.data;
    if (!webViewReady) return;
    if (await controller.canGoForward()) {
      await controller.goForward();
    }
//    Scaffold.of(context).showSnackBar(
//      const SnackBar(content: Text("No forward history item")),
//    );
    return;
  }

  void _reload(
      BuildContext context, AsyncSnapshot<WebViewController> snapshot) async {
    final bool webViewReady = snapshot.connectionState == ConnectionState.done;
    final WebViewController controller = snapshot.data;
    if (!webViewReady) return;
    await controller.reload();
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<WebViewController>(
      future: _webViewControllerFuture,
      builder:
          (BuildContext context, AsyncSnapshot<WebViewController> snapshot) {
        return Row(
          children: <Widget>[
            IconButton(
                icon: const Icon(Icons.arrow_back_ios),
                onPressed: () => _goBack(context, snapshot)),
            IconButton(
                icon: const Icon(Icons.arrow_forward_ios),
                onPressed: () => _goForward(context, snapshot)),
            IconButton(
              icon: const Icon(Icons.replay),
              onPressed: () => _reload(context, snapshot),
            ),
          ],
        );
      },
    );
  }
}

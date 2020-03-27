import 'package:client/core/utils/log.dart';
import 'package:client/ui/setting/about_page.dart';
import 'package:client/ui/main/main_page.dart';
import 'package:fluro/fluro.dart';
import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

class RouterCenter {
  RouterCenter._();

  static final RouteObserver<PageRoute> routeObserver = RouteObserver<PageRoute>();

  static final Logger _logger = Logger("RouterCenter");
  static final Router _router = Router();

  static final String _main = "/";

//  static final String _web = "web";
  static final String _demoSimple = "demo";
  static final String _demoSimpleFixedTrans = "demo/fixedtrans";
  static final String _demoFunc = "demo/func";
  static final String _deepLink = "message";
  static final String _about = "about";

  static RouteFactory init() {
//    _router.notFoundHandler = Handler(handlerFunc: (BuildContext context, Map<String, List<String>> params) {
//      _logger.d("ROUTE WAS NOT FOUND !!!");
//    });

    _router.define(_main,
        handler: Handler(handlerFunc: (BuildContext context, Map<String, List<String>> params) {
      return MainPage();
    }));
//    _router.define(_web, handler: Handler(handlerFunc: (BuildContext context, Map<String, List<String>> params) {
//      String url = params["url"]?.first;
//      String title = params["title"]?.first;
//      return WebViewPage(url, title: title);
//    }));
    _router.define(_about,
        handler: Handler(handlerFunc: (BuildContext context, Map<String, List<String>> params) {
      return AboutPage();
    }));
    return _router.generator;
  }

  static void openWebViewPage(BuildContext context, String url, {String title = ""}) {
    launch(url,
        forceSafariVC: true, forceWebView: false, enableJavaScript: true, enableDomStorage: true);
  }

//
  static void openAboutPage(BuildContext context) {
    _router.navigateTo(context, _about, transition: TransitionType.inFromRight);
  }
}

//class Routes {
//  static String root = "/";
//  static String webView = "/webview";
//  static String demoSimple = "/demo";
//  static String demoSimpleFixedTrans = "/demo/fixedtrans";
//  static String demoFunc = "/demo/func";
//  static String deepLink = "/message";
//
//  static void configureRoutes(Router router) {
//    router.notFoundHandler = new Handler(
//        handlerFunc: (BuildContext context, Map<String, List<String>> params) {
//      print("ROUTE WAS NOT FOUND !!!");
//    });
//
//    router.define(root, handler: Handler(
//        handlerFunc: (BuildContext context, Map<String, List<String>> params) {
//      return MainScreen();
//    }));
//    router.define(webView, handler: Handler(
//        handlerFunc: (BuildContext context, Map<String, List<String>> params) {
//      String url = Uri.decodeQueryComponent(params["url"]?.first);
//      String title = params["title"]?.first;
//      return WebViewScreen(url, title: title);
//    }));
//  }
//}
//    router.define(demoSimple, handler: demoRouteHandler);
//    router.define(demoSimpleFixedTrans,
//        handler: demoRouteHandler, transitionType: TransitionType.inFromLeft);
//    router.define(demoFunc, handler: demoFunctionHandler);
//    router.define(deepLink, handler: deepLinkHandler);
//var demoRouteHandler = new Handler(
//    handlerFunc: (BuildContext context, Map<String, List<String>> params) {
//      String message = params["message"]?.first;
//      String colorHex = params["color_hex"]?.first;
//      String result = params["result"]?.first;
//      Color color = new Color(0xFFFFFFFF);
//      if (colorHex != null && colorHex.length > 0) {
//        color = new Color(ColorHelpers.fromHexString(colorHex));
//      }
//      return new DemoSimpleComponent(
//          message: message, color: color, result: result);
//    });
//
//var demoFunctionHandler = new Handler(
//    type: HandlerType.function,
//    handlerFunc: (BuildContext context, Map<String, List<String>> params) {
//      String message = params["message"]?.first;
//      showDialog(
//        context: context,
//        builder: (context) {
//          return new AlertDialog(
//            title: new Text(
//              "Hey Hey!",
//              style: new TextStyle(
//                color: const Color(0xFF00D6F7),
//                fontFamily: "Lazer84",
//                fontSize: 22.0,
//              ),
//            ),
//            content: new Text("$message"),
//            actions: <Widget>[
//              new Padding(
//                padding: new EdgeInsets.only(bottom: 8.0, right: 8.0),
//                child: new FlatButton(
//                  onPressed: () {
//                    Navigator.of(context).pop(true);
//                  },
//                  child: new Text("OK"),
//                ),
//              ),
//            ],
//          );
//        },
//      );
//    });
//
///// Handles deep links into the app
///// To test on Android:
/////
///// `adb shell am start -W -a android.intent.action.VIEW -d "fluro://deeplink?path=/message&mesage=fluro%20rocks%21%21" com.theyakka.fluro`
//var deepLinkHandler = new Handler(
//    handlerFunc: (BuildContext context, Map<String, List<String>> params) {
//      String colorHex = params["color_hex"]?.first;
//      String result = params["result"]?.first;
//      Color color = new Color(0xFFFFFFFF);
//      if (colorHex != null && colorHex.length > 0) {
//        color = new Color(ColorHelpers.fromHexString(colorHex));
//      }
//      return new DemoSimpleComponent(
//          message: "DEEEEEP LINK!!!", color: color, result: result);
//    });

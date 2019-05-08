import 'package:fluro/fluro.dart';
import 'package:flutter/material.dart';
import 'package:client/ui/home/home.dart';

class Routes {
  static String root = "/";
  static String demoSimple = "/demo";
  static String demoSimpleFixedTrans = "/demo/fixedtrans";
  static String demoFunc = "/demo/func";
  static String deepLink = "/message";

  static void configureRoutes(Router router) {
    router.notFoundHandler = new Handler(
        handlerFunc: (BuildContext context, Map<String, List<String>> params) {
      print("ROUTE WAS NOT FOUND !!!");
    });

    router.define(root, handler: Handler(
        handlerFunc: (BuildContext context, Map<String, List<String>> params) {
      return MyHomePage();
    }));
//    router.define(demoSimple, handler: demoRouteHandler);
//    router.define(demoSimpleFixedTrans,
//        handler: demoRouteHandler, transitionType: TransitionType.inFromLeft);
//    router.define(demoFunc, handler: demoFunctionHandler);
//    router.define(deepLink, handler: deepLinkHandler);
  }
}
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

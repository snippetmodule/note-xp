import 'package:client/core/utils/build_mode.dart';
import 'package:client/core/utils/local_config.dart';
import 'package:client/core/utils/log.dart';
import 'package:client/core/widget/fatal_error_widget.dart';
import 'package:firebase_crashlytics/firebase_crashlytics.dart';
import 'package:flutter/material.dart';

class CrashlyticsUtil {
  static void init() async {
    Crashlytics.instance.enableInDevMode = false; //isDebug;
    FlutterError.onError = (FlutterErrorDetails details) {
      Log.instance().e("FlutterError", ex: details.exception, stacktrace: details.stack);
      Crashlytics.instance.recordFlutterError(details);
    };
//    ErrorWidget.builder = (FlutterErrorDetails details) {
//      return FatalErrorWidget(
//        details: details,
//        showStacktrace: isDebug,
//      );
//    };
    Crashlytics.instance.setUserIdentifier(await LocalConfig.getDeviceId());
  }

  static void crash() {
    Crashlytics.instance.crash();
  }
}
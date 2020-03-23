import 'package:client/core/utils/log.dart';
import 'package:firebase_crashlytics/firebase_crashlytics.dart';
import 'package:flutter/material.dart';

class CrashlyticsUtils {
  static void init(Logger logger) {
    Crashlytics.instance.enableInDevMode = false; //isDebug;
    FlutterError.onError = (FlutterErrorDetails details) {
      logger.e("FlutterError", ex: details.exception, stacktrace: details.stack);
      Crashlytics.instance.recordFlutterError(details);
    };
  }
}

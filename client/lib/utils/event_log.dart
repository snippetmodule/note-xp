import 'package:firebase_analytics/firebase_analytics.dart';
import 'package:firebase_analytics/observer.dart';
import './mmkv.dart';
import './build_mode.dart';
import 'package:meta/meta.dart';

class EventLog {
  static final enable = !isDebug;
  static final analytics = FirebaseAnalytics();
  static final analyticsObserver =
      FirebaseAnalyticsObserver(analytics: analytics);

  EventLog._();

  static void init() {
    analytics.setAnalyticsCollectionEnabled(true);
    Mmkv.getInstallTime();
  }

  static void log({@required String name, @required String value}) {
    if (!enable) return;
    analytics.setUserProperty(name: name, value: value);
  }

  static void logScreen(String screenName) {
    if (!enable) return;
    analytics.setCurrentScreen(screenName: screenName);
  }

  static void logScreenLift(String screenName, int duration) {
    if (!enable) return;
    if (duration <= 0) return;
    logEvent("screen", "screen_life", screenName, value: duration);
  }

  static void logAction(String category, String itemName) {
    if (!enable) return;
    logEvent("user_action", category, itemName);
  }

  static void logEvent(String name, String category, String itemName,
      {dynamic value, Map<String, dynamic> parameters}) {
    if (!enable) return;
    if (parameters == null) {
      parameters = Map<String, dynamic>();
    }
    parameters["item_category"] = category;
    parameters["item_name"] = itemName;
    if (value != null) {
      parameters["value"] = value;
    }
    analytics.logEvent(name: name, parameters: parameters);
  }
}

class EventConstants {
  EventConstants._();

  static final EVENT_TAB = "main_tab";
}

class CategoryConstants {
  CategoryConstants._();

  static final CATEGORY_TAB = "more";
}

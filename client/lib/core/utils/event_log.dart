import 'package:firebase_analytics/firebase_analytics.dart';
import 'package:firebase_analytics/observer.dart';

import './local_config.dart';
import './log.dart';

class EventLog {
  static final enable = true; //!isDebug;
  static final analytics = FirebaseAnalytics();
  static final analyticsObserver = FirebaseAnalyticsObserver(analytics: analytics);
  static final _logger = Logger("EventLog");

  EventLog._();

  static void init() async {
//    analytics.setAnalyticsCollectionEnabled(true);
//    LocalConfig.getInstallTime();
    String deviceId = await LocalConfig.getDeviceId();
    analytics.setUserId(deviceId);
    setUserProperty("ug", deviceId.substring(deviceId.length - 1));
  }

  static void setUserProperty(String name, String value) {
    if (!enable) return;
    _logger.d("setUserProperty name:$name value:$value");
    analytics.setUserProperty(name: name, value: value);
  }

  static void logScreen(String screenName) {
    if (!enable) return;
    _logger.d("logScreen screenName:$screenName");
    analytics.setCurrentScreen(screenName: screenName);
  }

  static void logScreenLift(String screenName, int duration) {
    if (!enable) return;
    if (duration <= 0) return;
    _logger.d("logScreenLift screenName:$screenName duration:$duration");
    logEvent("screen", "screen_life", screenName, value: duration);
  }

  static void logAction(String category, String itemName) {
    if (!enable) return;
    _logger.d("logAction category:$category itemName:$itemName");
    logEvent("user_action", category, itemName);
  }

  static void logEvent(String name, String category, String itemName,
      {dynamic value, Map<String, dynamic> parameters}) {
    if (!enable) return;
    _logger.d(
        "logEvent name:$name category:$category itemName:$itemName value:$value parameters:$parameters");

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

  static final EVENT_TAB_DOC = "main_tab_doc";
  static final EVENT_TAB_MORE = "main_tab_more";
  static final EVENT_ABOUT = "about";
}

class CategoryConstants {
  CategoryConstants._();

  static final CATEGORY_TAB = "more";
}

import 'package:flutter/material.dart';
import 'package:client/core/utils/log.dart';
import 'package:client/core/utils/event_log.dart';

import 'visible_listener_widget.dart';

class EventLogWidget extends StatelessWidget {
  final String screenName;
  final Widget child;

  EventLogWidget({@required this.screenName, @required this.child});

  @override
  Widget build(BuildContext context) {
    if (screenName == null || screenName.isEmpty) {
      return child;
    }
    return VisibleListenerWidget(
      child: child,
      visibleListener: EventLogVisibleListener(screenName),
      logger: Logger('LifecycleWidget', msgPrefix: screenName),
    );
  }
}

class EventLogVisibleListener extends VisibleListener {
  final String screenName;

  EventLogVisibleListener(this.screenName);

  @override
  void onInVisible(int duration) {
    if (duration > 0 && duration <= 30 * 60 * 1000) {
      // 0 < duration <= 30 minutes
      // 30 minutes
      EventLog.logScreenLift(screenName, duration);
    }
  }

  @override
  void onVisible() {
    EventLog.logScreen(screenName);
  }
}

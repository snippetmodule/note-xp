import 'package:flutter/material.dart';
import 'package:client/utils/log.dart';
import './liftcycle_widget.dart';
import 'package:client/utils/event_log.dart';

class EventLogWidget extends StatelessWidget {
  final String screenName;
  final Widget child;
  final bool isReport;

  EventLogWidget(
      {@required this.screenName, @required this.child, this.isReport = true});

  @override
  Widget build(BuildContext context) {
    if (!this.isReport) {
      return child;
    }
    return LifecycleWidget(
        child: child,
        liftCycleObserver: EventLogObserver(
            screenName: this.screenName, isReport: this.isReport),
        logger: Logger(screenName));
  }
}

class EventLogObserver extends LiftCycleObserver {
  final String screenName;
  final bool isReport;

  var _lastScreenLogTime = 0;

  EventLogObserver({@required this.screenName, this.isReport = true});

  @override
  void didInitState() {
    _logScreen();
  }

  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
    switch (state) {
      case AppLifecycleState.inactive:
        break;
      case AppLifecycleState.paused:
        _logScreenPause();
        break;
      case AppLifecycleState.resumed:
        if (_lastScreenLogTime != 0) {
          _logScreenPause();
        }
        _lastScreenLogTime = DateTime.now().millisecondsSinceEpoch;
        _logScreen();
        break;
      case AppLifecycleState.suspending:
        break;
    }
  }

  void _logScreen() {
    EventLog.logScreen(screenName);
  }

  void _logScreenPause() {
    final diffTime = DateTime.now().millisecondsSinceEpoch - _lastScreenLogTime;
    if (diffTime > 0 && diffTime <= 30 * 60 * 1000) {
      // 30 minutes
      EventLog.logScreenLift(screenName, diffTime);
    }
    _lastScreenLogTime = 0;
  }
}

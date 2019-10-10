import 'package:client/core/utils/router_center.dart';
import 'package:flutter/material.dart';
import 'package:client/core/utils/log.dart';

class VisibleListenerWidget extends StatefulWidget {
  final Widget child;
  final VisibleListener visibleListener;
  final Logger logger;

  VisibleListenerWidget({
    @required this.child,
    this.visibleListener,
    this.logger,
  });

  @override
  State<StatefulWidget> createState() {
    return _WidgetState();
  }
}

class _WidgetState extends State<VisibleListenerWidget> with WidgetsBindingObserver, RouteAware {
  _WidgetState();

  @override
  void initState() {
    widget.logger?.d("initState");
    super.initState();
    WidgetsBinding.instance.addObserver(this);
  }

  @override
  void didChangeDependencies() {
    widget.logger?.d('didChangeDependencies');
    RouterCenter.routeObserver.subscribe(this, ModalRoute.of(context) as PageRoute);
    super.didChangeDependencies();
  }

  @override
  void didUpdateWidget(VisibleListenerWidget oldWidget) {
    widget.logger?.d('didUpdateWidget');
    super.didUpdateWidget(oldWidget);
  }

  @override
  void deactivate() {
    widget.logger?.d('deactivate');
    super.deactivate();
  }

  @override
  void dispose() {
    widget.logger?.d('dispose');
    WidgetsBinding.instance.removeObserver(this);
    RouterCenter.routeObserver.unsubscribe(this);
    super.dispose();
  }

  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
    widget.logger?.d('didChangeAppLifecycleState state：$state');
    switch (state) {
      case AppLifecycleState.paused:
        _inVisible();
        break;
      case AppLifecycleState.resumed:
        _visible();
        break;
      default:
        break;
    }
    super.didChangeAppLifecycleState(state);
  }

  @override
  Widget build(BuildContext context) {
    widget.logger?.d('build');
    return widget.child;
  }

  /// Called when the top route has been popped off, and the current route
  /// shows up.
  @override
  void didPopNext() {
    widget.logger?.d('didPopNext');
    _visible();
  }

  /// Called when the current route has been pushed.
  @override
  void didPush() {
    widget.logger?.d('didPush');
    _visible();
  }

  /// Called when the current route has been popped off.
  @override
  void didPop() {
    widget.logger?.d('didPop');
    _inVisible();
  }

  /// Called when a new route has been pushed, and the current route is no
  /// longer visible.
  @override
  void didPushNext() {
    widget.logger?.d('didPushNext');
    _inVisible();
  }

  var _lastScreenLogTime = 0;

  void _inVisible() {
    final diffTime = DateTime.now().millisecondsSinceEpoch - _lastScreenLogTime;
    widget.visibleListener.onInVisible(diffTime);
    _lastScreenLogTime = 0;
  }

  void _visible() {
    _lastScreenLogTime = DateTime.now().millisecondsSinceEpoch;
    widget.visibleListener.onVisible();
  }
}

class VisibleListener {
  void onInVisible(int duration) {}

  void onVisible() {}
}

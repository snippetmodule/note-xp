import 'package:flutter/material.dart';
import 'package:client/utils/log.dart';

class LifecycleWidget extends StatefulWidget {
  final _logger = Logger("LifecycleAppPage");

  final Widget child;
  final WidgetsBindingObserver liftCycleObserver;

  LifecycleWidget({@required this.child, this.liftCycleObserver});

  @override
  State<StatefulWidget> createState() {
    return new _LifecycleWidgetState();
  }
}

class _LifecycleWidgetState extends State<LifecycleWidget>
    with WidgetsBindingObserver {
  _LifecycleWidgetState();

  @override
  void initState() {
    widget._logger.d("initState");
    super.initState();
    WidgetsBinding.instance.addObserver(this);
    WidgetsBinding.instance.addObserver(widget.liftCycleObserver);
  }

  @override
  void didChangeDependencies() {
    widget._logger.d('didChangeDependencies');
    super.didChangeDependencies();
  }

  @override
  void didUpdateWidget(LifecycleWidget oldWidget) {
    widget._logger.d('didUpdateWidget');
    super.didUpdateWidget(oldWidget);
  }

  @override
  void deactivate() {
    widget._logger.d('deactivate');
    super.deactivate();
  }

  @override
  void dispose() {
    widget._logger.d('dispose');
    WidgetsBinding.instance.removeObserver(this);
    WidgetsBinding.instance.removeObserver(widget.liftCycleObserver);
    super.dispose();
  }

  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
    switch (state) {
      case AppLifecycleState.inactive:
        widget._logger.d('AppLifecycleState.inactive');
        break;
      case AppLifecycleState.paused:
        widget._logger.d('AppLifecycleState.paused');
        break;
      case AppLifecycleState.resumed:
        widget._logger.d('AppLifecycleState.resumed');
        break;
      case AppLifecycleState.suspending:
        widget._logger.d('AppLifecycleState.suspending');
        break;
    }

    super.didChangeAppLifecycleState(state);
  }

  @override
  Widget build(BuildContext context) {
    widget._logger.d('build');
    return widget.child;
  }
}

import 'package:flutter/material.dart';
import 'package:client/core/utils/log.dart';

class LifecycleWidget extends StatefulWidget {
  final Logger logger;

  final Widget child;
  final LiftCycleObserver liftCycleObserver;

  LifecycleWidget({@required this.child, this.liftCycleObserver, this.logger});

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
    widget.logger?.d("initState");
    super.initState();
    WidgetsBinding.instance.addObserver(this);
    WidgetsBinding.instance.addObserver(widget.liftCycleObserver);
    widget.liftCycleObserver.didInitState();
  }

  @override
  void didChangeDependencies() {
    widget.logger?.d('didChangeDependencies');
    super.didChangeDependencies();
  }

  @override
  void didUpdateWidget(LifecycleWidget oldWidget) {
    widget.logger?.d('didUpdateWidget');
    super.didUpdateWidget(oldWidget);
  }

  @override
  void deactivate() {
    widget.logger?.d('deactivate');
    widget.liftCycleObserver.didDeactivate();
    super.deactivate();
  }

  @override
  void dispose() {
    widget.logger?.d('dispose');
    WidgetsBinding.instance.removeObserver(this);
    WidgetsBinding.instance.removeObserver(widget.liftCycleObserver);
    widget.liftCycleObserver.didDispose();
    super.dispose();
  }

  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
    widget.logger?.d('didChangeAppLifecycleState state：$state');
    super.didChangeAppLifecycleState(state);
  }

  @override
  Widget build(BuildContext context) {
    widget.logger?.d('build');
    return widget.child;
  }
}
class LiftCycleObserver extends WidgetsBindingObserver {
  void didInitState() { }
  void didDeactivate() { }
  void didDispose() { }
}

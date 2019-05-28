import 'package:bloc/bloc.dart';
import 'package:client/utils/log.dart';

class AppBlocDelegate extends BlocDelegate {
  final Logger _logger = Logger("BlocDelegate");

  @override
  void onTransition(Transition transition) {
    super.onTransition(transition);
    _logger.d("onTransition ${transition.runtimeType}\n\tcurrentState:${transition.currentState}\tevent:${transition.event}\tnextState:${transition.nextState}");
  }

  @override
  void onError(Object error, StackTrace stacktrace) {
    super.onError(error, stacktrace);
    _logger.e("onError", ex: error,stacktrace: stacktrace);
  }
}
import 'package:bloc/bloc.dart';
import 'package:client/utils/log.dart';

class AppBlocDelegate extends BlocDelegate {
  Logger _logger = Logger("AppBlocDelegate");

  @override
  void onTransition(Transition transition) {
    super.onTransition(transition);
    _logger.d("onTransition ${transition.currentState.runtimeType}:${transition.currentState} ${transition.event.runtimeType}:${transition.event} ${transition.nextState.runtimeType}:${transition.nextState}");
  }

  @override
  void onError(Object error, StackTrace stacktrace) {
    super.onError(error, stacktrace);
    _logger.e("onError", ex: error,stacktrace: stacktrace);
  }
}
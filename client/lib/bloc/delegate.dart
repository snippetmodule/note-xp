import 'package:bloc/bloc.dart';
import 'package:client/utils/log.dart';

class AppBlocDelegate extends BlocDelegate {
  final Logger _logger = Logger("AppBlocDelegate");

  @override
  void onTransition(Transition transition) {
    super.onTransition(transition);
    _logger.d("onTransition ${transition.runtimeType}\n\t${transition.currentState.runtimeType}:${transition.currentState}\t${transition.event.runtimeType}:${transition.event}\t${transition.nextState.runtimeType}:${transition.nextState}");
  }

  @override
  void onError(Object error, StackTrace stacktrace) {
    super.onError(error, stacktrace);
    _logger.e("onError", ex: error,stacktrace: stacktrace);
  }
}
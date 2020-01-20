import 'package:bloc/bloc.dart';
import 'package:client/core/utils/log.dart';

class AppBlocDelegate extends BlocDelegate {
  final Logger _logger = Logger("BlocDelegate");

  @override
  void onEvent(Bloc bloc, Object event) {
    super.onEvent(bloc, event);
    _logger.d("${bloc.runtimeType} onEvent ${event.runtimeType}");
  }

  @override
  void onTransition(Bloc bloc, Transition transition) {
    super.onTransition(bloc, transition);
    _logger.d(
        "${bloc.runtimeType} onTransition ${transition.runtimeType}\n\tcurrentState:${transition.currentState}\tevent:${transition.event}\tnextState:${transition.nextState}");
  }

  @override
  void onError(Bloc bloc, Object error, StackTrace stacktrace) {
    super.onError(bloc, error, stacktrace);
    _logger.e("onError", ex: error, stacktrace: stacktrace);
  }
}

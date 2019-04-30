import 'dart:async';
import 'package:bloc/bloc.dart';
import './bloc.dart';

class LocaleBloc extends Bloc<LocaleEvent, LocaleState> {
  @override
  LocaleState get initialState => InitialLocaleState();

  @override
  Stream<LocaleState> mapEventToState(LocaleEvent event) async* {
    if (event is ChangeLocaleEvent) {
      yield LocaleState(locale: event.locale);
      return;
    }
  }
}

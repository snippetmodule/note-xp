import 'dart:async';
import 'package:bloc/bloc.dart';
import './bloc.dart';
import 'package:client/core/utils/local_config.dart';
import 'package:flutter/material.dart';

class LocaleBloc extends Bloc<LocaleEvent, LocaleState> {
  @override
  LocaleState get initialState => InitLocaleState();

  @override
  Stream<LocaleState> mapEventToState(LocaleEvent event) async* {
    if (event is InitLocaleEvent) {
      Locale locale = await LocalConfig.getLocale();
      yield ChangedLocaleState(locale: locale);
      return;
    }
    if (event is ChangeLocaleEvent) {
      LocalConfig.setLocale(event.locale);
      Locale locale = await LocalConfig.getLocale();
      yield ChangedLocaleState(locale: locale);
      return;
    }
  }
}

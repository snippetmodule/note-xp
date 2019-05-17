import 'dart:async';
import 'package:bloc/bloc.dart';
import './bloc.dart';
import 'package:client/utils/mmkv.dart';
import 'package:flutter/material.dart';

class LocaleBloc extends Bloc<LocaleEvent, LocaleState> {
  @override
  LocaleState get initialState => InitLocaleState();

  @override
  Stream<LocaleState> mapEventToState(LocaleEvent event) async* {
    if (event is InitLocaleEvent) {
      Locale locale = await Mmkv.getLocale();
      yield ChangedLocaleState(locale: locale);
      return;
    }
    if (event is ChangeLocaleEvent) {
      Mmkv.setLocale(event.locale);
      Locale locale = await Mmkv.getLocale();
      yield ChangedLocaleState(locale: locale);
      return;
    }
  }
}

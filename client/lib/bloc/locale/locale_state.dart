import 'package:flutter/material.dart';
import 'package:equatable/equatable.dart';
import 'package:meta/meta.dart';

@immutable
class LocaleState extends Equatable {
  final Locale locale;

  LocaleState({this.locale}) : super([locale]);
}

class InitialLocaleState extends LocaleState {
  InitialLocaleState() : super(locale: Locale("en", ""));
}

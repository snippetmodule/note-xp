import 'package:flutter/material.dart';
import 'package:equatable/equatable.dart';
import 'package:meta/meta.dart';

@immutable
abstract class LocaleState extends Equatable {
  LocaleState([List props = const []]) : super(props);
}

@immutable
class ChangedLocaleState extends LocaleState {
  final Locale locale;

  ChangedLocaleState({this.locale}) : super([locale]);
}

class InitLocaleState extends LocaleState {}

import 'package:flutter/material.dart';
import 'package:equatable/equatable.dart';
import 'package:meta/meta.dart';

@immutable
abstract class LocaleEvent extends Equatable {
  LocaleEvent([List props = const []]) : super(props);
}

class ChangeLocaleEvent extends LocaleEvent {
  final Locale locale;

  ChangeLocaleEvent({this.locale}) : super([locale]);
}

import 'package:flutter/material.dart';
import 'package:equatable/equatable.dart';
import 'package:meta/meta.dart';

@immutable
abstract class LocaleState extends Equatable {
  LocaleState();

  @override
  List<Object> get props => [];
}

class ChangedLocaleState extends LocaleState {
  final Locale locale;

  ChangedLocaleState({this.locale});

  @override
  List<Object> get props => [locale];
}

class InitLocaleState extends LocaleState {}

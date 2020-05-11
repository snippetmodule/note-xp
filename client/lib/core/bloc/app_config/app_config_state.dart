import 'package:equatable/equatable.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:meta/meta.dart';

import 'app_config.dart';

@immutable
class AppConfigState extends Equatable {
  final AppConfig appConfig;

  AppConfigState(this.appConfig);

  @override
  List<Object> get props => [appConfig];
}
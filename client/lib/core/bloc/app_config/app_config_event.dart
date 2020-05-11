import 'package:equatable/equatable.dart';
import 'package:meta/meta.dart';

import 'app_config.dart';

@immutable
abstract class AppConfigEvent extends Equatable {
  AppConfigEvent();

  @override
  List<Object> get props => [];
}

class InitAppConfigEvent extends AppConfigEvent {
  InitAppConfigEvent();
}

class UpdateAppConfigEvent extends AppConfigEvent {
  final AppConfig newConfig;

  UpdateAppConfigEvent(this.newConfig);

  @override
  List<Object> get props => [newConfig];
}

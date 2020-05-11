import 'dart:async';

import 'package:bloc/bloc.dart';
import 'package:client/constants.dart';
import 'package:client/core/utils/local_config.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/scheduler.dart';
import 'package:flutter/services.dart';

import 'app_config.dart';
import 'bloc.dart';

class AppConfigBloc extends Bloc<AppConfigEvent, AppConfigState> {
  Timer _timeDilationTimer;

  @override
  AppConfigState get initialState => AppConfigState(null);

  @override
  Stream<AppConfigState> mapEventToState(AppConfigEvent event) async* {
    if (event is InitAppConfigEvent) {
      var config = AppConfig(
        themeMode: await LocalConfig.getThemeMode(),
        textScaleFactor: systemTextScaleFactorOption,
        customTextDirection: CustomTextDirection.localeBased,
        locale: null,
        timeDilation: timeDilation,
        platform: defaultTargetPlatform,
        isUseMaterial: await LocalConfig.isUserMaterial(),
        isDebug: await LocalConfig.isDebug(),
      );
      await Future.delayed(Duration(microseconds: 3000));
      yield AppConfigState(config);
      return;
    }
    if (event is UpdateAppConfigEvent) {
      _handleTimeDilation(state.appConfig, event.newConfig);
      _handleThemeChange(event.newConfig);
      yield AppConfigState(event.newConfig);
      return;
    }
  }

  @override
  Future<void> close() {
    _timeDilationTimer?.cancel();
    _timeDilationTimer = null;
    return super.close();
  }

  void _handleTimeDilation(AppConfig oldConfig, AppConfig newConfig) {
    if (oldConfig.timeDilation != newConfig.timeDilation) {
      _timeDilationTimer?.cancel();
      _timeDilationTimer = null;
      if (newConfig.timeDilation > 1) {
        // We delay the time dilation change long enough that the user can see
        // that UI has started reacting and then we slam on the brakes so that
        // they see that the time is in fact now dilated.
        _timeDilationTimer = Timer(const Duration(milliseconds: 150), () {
          timeDilation = newConfig.timeDilation;
        });
      } else {
        timeDilation = newConfig.timeDilation;
      }
    }
  }

  void _handleThemeChange(AppConfig newConfig) {
    switch (newConfig.themeMode) {
      case ThemeMode.system:
        final brightness = WidgetsBinding.instance.window.platformBrightness;
        SystemChrome.setSystemUIOverlayStyle(
            brightness == Brightness.dark ? SystemUiOverlayStyle.light : SystemUiOverlayStyle.dark);
        break;
      case ThemeMode.light:
        SystemChrome.setSystemUIOverlayStyle(SystemUiOverlayStyle.dark);
        break;
      case ThemeMode.dark:
        SystemChrome.setSystemUIOverlayStyle(SystemUiOverlayStyle.light);
    }
  }
}

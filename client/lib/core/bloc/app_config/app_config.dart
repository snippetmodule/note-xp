import 'dart:io';

import 'package:client/constants.dart';
import 'package:equatable/equatable.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:meta/meta.dart';

enum CustomTextDirection {
  localeBased,
  ltr,
  rtl,
}

// See http://en.wikipedia.org/wiki/Right-to-left
const List<String> rtlLanguages = <String>[
  'ar', // Arabic
  'fa', // Farsi
  'he', // Hebrew
  'ps', // Pashto
  'ur', // Urdu
];

// Fake locale to represent the system Locale option.
const systemLocaleOption = Locale('system');

Locale _deviceLocale;

Locale get deviceLocale => _deviceLocale;

set deviceLocale(Locale locale) {
  if (_deviceLocale == null) {
    _deviceLocale = locale;
  }
}

@immutable
class AppConfig extends Equatable {
  final ThemeMode themeMode;
  final double _textScaleFactor;
  final CustomTextDirection customTextDirection;
  final Locale _locale;
  final double timeDilation;
  final TargetPlatform platform;
  final bool isUseMaterial;
  final bool isDebug;

  const AppConfig({
    this.themeMode,
    double textScaleFactor,
    this.customTextDirection,
    Locale locale,
    this.timeDilation,
    this.platform,
    this.isUseMaterial = true,
    this.isDebug = true,
  })  : _textScaleFactor = textScaleFactor,
        _locale = locale;

  // We use a sentinel value to indicate the system text scale option. By
  // default, return the actual text scale factor, otherwise return the
  // sentinel value.
  double textScaleFactor(BuildContext context, {bool useSentinel = false}) {
    if (_textScaleFactor == systemTextScaleFactorOption) {
      return useSentinel ? systemTextScaleFactorOption : MediaQuery.of(context).textScaleFactor;
    } else {
      return _textScaleFactor;
    }
  }

  Locale get locale =>
      _locale ??
      deviceLocale ??
      // TODO: When deviceLocale can be obtained on macOS, this won't be necessary
      // https://github.com/flutter/flutter/issues/45343
      (!kIsWeb && Platform.isMacOS ? Locale('en', 'US') : null);

  /// Returns the text direction based on the [CustomTextDirection] setting.
  /// If the locale cannot be determined, returns null.
  TextDirection textDirection() {
    switch (customTextDirection) {
      case CustomTextDirection.localeBased:
        final String language = locale?.languageCode?.toLowerCase();
        if (language == null) return null;
        return rtlLanguages.contains(language) ? TextDirection.rtl : TextDirection.ltr;
      case CustomTextDirection.rtl:
        return TextDirection.rtl;
      default:
        return TextDirection.ltr;
    }
  }

  AppConfig copyWith({
    ThemeMode themeMode,
    double textScaleFactor,
    CustomTextDirection customTextDirection,
    Locale locale,
    double timeDilation,
    TargetPlatform platform,
    bool isUseMaterial,
    bool isDebug,
  }) {
    return AppConfig(
      themeMode: themeMode ?? this.themeMode,
      textScaleFactor: textScaleFactor ?? this._textScaleFactor,
      customTextDirection: customTextDirection ?? this.customTextDirection,
      locale: locale ?? this.locale,
      timeDilation: timeDilation ?? this.timeDilation,
      platform: platform ?? this.platform,
      isUseMaterial: isUseMaterial ?? this.isUseMaterial,
      isDebug: isDebug ?? this.isDebug,
    );
  }

  @override
  List<Object> get props => [
        themeMode,
        _textScaleFactor,
        customTextDirection,
        _locale,
        timeDilation,
        platform,
        isUseMaterial,
        isDebug
      ];
}

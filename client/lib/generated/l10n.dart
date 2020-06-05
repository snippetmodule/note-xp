// GENERATED CODE - DO NOT MODIFY BY HAND
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'intl/messages_all.dart';

// **************************************************************************
// Generator: Flutter Intl IDE plugin
// Made by Localizely
// **************************************************************************

class S {
  S();
  
  static const AppLocalizationDelegate delegate =
    AppLocalizationDelegate();

  static Future<S> load(Locale locale) {
    final name = (locale.countryCode?.isEmpty ?? false) ? locale.languageCode : locale.toString();
    final localeName = Intl.canonicalizedLocale(name); 
    return initializeMessages(localeName).then((_) {
      Intl.defaultLocale = localeName;
      return S();
    });
  } 

  static S of(BuildContext context) {
    return Localizations.of<S>(context, S);
  }

  String get appName {
    return Intl.message(
      'Note',
      name: 'appName',
      desc: '',
      args: [],
    );
  }

  String get appDesc {
    return Intl.message(
      'This is Note',
      name: 'appDesc',
      desc: '',
      args: [],
    );
  }

  String get fatalErrTitle {
    return Intl.message(
      'An application error has occurred',
      name: 'fatalErrTitle',
      desc: '',
      args: [],
    );
  }

  String get fatalErrDes {
    return Intl.message(
      'There was unexepcted situation in application. Application has been able to recover from error state.',
      name: 'fatalErrDes',
      desc: '',
      args: [],
    );
  }

  String get fatalErrHint {
    return Intl.message(
      '  See details below.',
      name: 'fatalErrHint',
      desc: '',
      args: [],
    );
  }

  String get debug {
    return Intl.message(
      'Debug',
      name: 'debug',
      desc: '',
      args: [],
    );
  }

  String get cancel {
    return Intl.message(
      'Cancel',
      name: 'cancel',
      desc: '',
      args: [],
    );
  }

  String get ok {
    return Intl.message(
      'Ok',
      name: 'ok',
      desc: '',
      args: [],
    );
  }

  String get main_tab_home {
    return Intl.message(
      'Home',
      name: 'main_tab_home',
      desc: '',
      args: [],
    );
  }

  String get main_tab_list {
    return Intl.message(
      'List',
      name: 'main_tab_list',
      desc: '',
      args: [],
    );
  }

  String get main_tab_personal {
    return Intl.message(
      'Personal',
      name: 'main_tab_personal',
      desc: '',
      args: [],
    );
  }

  String get main_tab_more {
    return Intl.message(
      'More',
      name: 'main_tab_more',
      desc: '',
      args: [],
    );
  }

  String get more_menu_abort {
    return Intl.message(
      'About',
      name: 'more_menu_abort',
      desc: '',
      args: [],
    );
  }

  String get more_menu_logout {
    return Intl.message(
      'Logout',
      name: 'more_menu_logout',
      desc: '',
      args: [],
    );
  }

  String get more_menu_modify_pass {
    return Intl.message(
      'Modify password',
      name: 'more_menu_modify_pass',
      desc: '',
      args: [],
    );
  }

  String get more_menu_member_notice {
    return Intl.message(
      'Member notice',
      name: 'more_menu_member_notice',
      desc: '',
      args: [],
    );
  }

  String get more_menu_help {
    return Intl.message(
      'Help',
      name: 'more_menu_help',
      desc: '',
      args: [],
    );
  }

  String get more_menu_help_call {
    return Intl.message(
      'Help call',
      name: 'more_menu_help_call',
      desc: '',
      args: [],
    );
  }

  String get web_menu_open_by_browser {
    return Intl.message(
      'Open in Browser',
      name: 'web_menu_open_by_browser',
      desc: '',
      args: [],
    );
  }

  String get reload {
    return Intl.message(
      'reload',
      name: 'reload',
      desc: '',
      args: [],
    );
  }

  String get share {
    return Intl.message(
      'Share',
      name: 'share',
      desc: '',
      args: [],
    );
  }

  String get copy {
    return Intl.message(
      'Copy',
      name: 'copy',
      desc: '',
      args: [],
    );
  }

  String get copy_success {
    return Intl.message(
      'Copied to clipboard',
      name: 'copy_success',
      desc: '',
      args: [],
    );
  }
}

class AppLocalizationDelegate extends LocalizationsDelegate<S> {
  const AppLocalizationDelegate();

  List<Locale> get supportedLocales {
    return const <Locale>[
      Locale.fromSubtags(languageCode: 'en'),
      Locale.fromSubtags(languageCode: 'zh', countryCode: 'CN'),
      Locale.fromSubtags(languageCode: 'zh', countryCode: 'HK'),
    ];
  }

  @override
  bool isSupported(Locale locale) => _isSupported(locale);
  @override
  Future<S> load(Locale locale) => S.load(locale);
  @override
  bool shouldReload(AppLocalizationDelegate old) => false;

  bool _isSupported(Locale locale) {
    if (locale != null) {
      for (var supportedLocale in supportedLocales) {
        if (supportedLocale.languageCode == locale.languageCode) {
          return true;
        }
      }
    }
    return false;
  }
}
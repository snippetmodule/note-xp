import 'package:client/bloc/auth/auth_bloc.dart';
import 'package:client/bloc/auth/auth_event.dart';
import 'package:flutter/material.dart';
import 'package:bloc/bloc.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:client/bloc/delegate.dart';
import 'package:client/bloc/locale/bloc.dart';
import 'package:client/config/application.dart';
import 'package:client/utils/log.dart';
import 'package:client/generated/i18n.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:firebase_crashlytics/firebase_crashlytics.dart';
import 'package:client/utils/event_log.dart';

void main() {
  BlocSupervisor().delegate = AppBlocDelegate();

  // firebase_crashlytics init
  Crashlytics.instance.enableInDevMode = false; //isDebug;
  FlutterError.onError = (FlutterErrorDetails details) {
    Crashlytics.instance.onError(details);
  };
  // Analytics
  EventLog.init();

  runApp(_App());
}

class _App extends StatelessWidget {
  final Logger _logger = Logger("App");

  final localBloc = LocaleBloc();
  final authBloc = AuthBloc();

  _App() : super() {
    Application.init();
    localBloc.dispatch(InitLocaleEvent());
    authBloc.dispatch(InitAuthEvent());

    _logger.d("Application init");
  }

  @override
  Widget build(BuildContext context) {
    return BlocProviderTree(
        blocProviders: [
          BlocProvider<LocaleBloc>(bloc: localBloc),
          BlocProvider<AuthBloc>(bloc: authBloc)
        ],
        child: BlocBuilder<LocaleEvent, LocaleState>(
            bloc: localBloc,
            builder: (BuildContext context, LocaleState state) {
              if (state is InitLocaleState) {
                return Container();
              }
              if (state is ChangedLocaleState) {
                return MaterialApp(
                  theme: ThemeData(
                    primarySwatch: Colors.orange,
                  ),
                  onGenerateRoute: Application.router.generator,
                  localizationsDelegates: [
                    S.delegate,
                    GlobalMaterialLocalizations.delegate,
                    GlobalWidgetsLocalizations.delegate,
                  ],
                  supportedLocales: S.delegate.supportedLocales,
                  localeListResolutionCallback:
                      S.delegate.listResolution(fallback: state.locale),
                  locale: state.locale,
                  navigatorObservers: [EventLog.analyticsObserver],
                );
              }
            }));
  }
}

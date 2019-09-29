import 'package:client/core/bloc/auth/auth_bloc.dart';
import 'package:client/core/bloc/auth/auth_event.dart';
import 'package:client/ui/home/home_page.dart';
import 'package:flutter/material.dart';
import 'package:bloc/bloc.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:client/core/bloc/delegate.dart';
import 'package:client/core/bloc/locale/bloc.dart';
import 'package:client/core/utils/log.dart';
import 'package:client/generated/i18n.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:firebase_crashlytics/firebase_crashlytics.dart';
import 'package:client/core/utils/event_log.dart';
import 'package:client/core/utils/router_center.dart';

void main() {
  final Logger _logger = Logger("application");

  BlocSupervisor.delegate = AppBlocDelegate();
  // firebase crashlytics init
  Crashlytics.instance.enableInDevMode = false; //isDebug;
  FlutterError.onError = (FlutterErrorDetails details) {
    _logger.e("FlutterError", ex: details.exception, stacktrace: details.stack);
    Crashlytics.instance.recordFlutterError(details);
  };
  // Analytics
  EventLog.init();

  runApp(_App());

  _logger.d("init");
}

class _App extends StatelessWidget {
  final routeFactory = RouterCenter.init();

  final localBloc = LocaleBloc();
  final authBloc = AuthBloc();

  _App() : super() {
    localBloc.dispatch(InitLocaleEvent());
    authBloc.dispatch(InitAuthEvent());
  }

  @override
  Widget build(BuildContext context) {
    return MultiBlocProvider(
        providers: [
          BlocProvider<LocaleBloc>(builder: ((BuildContext context) => localBloc)),
          BlocProvider<AuthBloc>(builder: (BuildContext context) => authBloc),
        ],
        child: BlocBuilder<LocaleBloc, LocaleState>(
            bloc: localBloc,
            builder: (BuildContext context, LocaleState state) {
              if (state is ChangedLocaleState) {
                return MaterialApp(
                  theme: ThemeData(
                      primarySwatch: Colors.orange,
                      pageTransitionsTheme: PageTransitionsTheme(builders: {
                        TargetPlatform.android: CupertinoPageTransitionsBuilder(),
                        TargetPlatform.iOS: CupertinoPageTransitionsBuilder(),
                      })),
                  localizationsDelegates: [
                    S.delegate,
                    GlobalMaterialLocalizations.delegate,
                    GlobalWidgetsLocalizations.delegate,
                  ],
                  supportedLocales: S.delegate.supportedLocales,
                  localeListResolutionCallback: S.delegate.listResolution(fallback: state.locale),
                  locale: state.locale,
                  navigatorObservers: [EventLog.analyticsObserver],
                  home: HomePage(),
                  onGenerateRoute: routeFactory,
                );
              }
              return Container();
            }));
  }
}

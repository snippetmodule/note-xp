import 'package:bloc/bloc.dart';
import 'package:client/core/bloc/auth/auth_bloc.dart';
import 'package:client/core/bloc/auth/auth_event.dart';
import 'package:client/core/bloc/delegate.dart';
import 'package:client/core/bloc/locale/bloc.dart';
import 'package:client/core/utils/crashlytics_utils.dart';
import 'package:client/core/utils/event_log.dart';
import 'package:client/core/utils/log.dart';
import 'package:client/core/utils/router_center.dart';
import 'package:client/generated/i18n.dart';
import 'package:client/ui/main/main_page.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_localizations/flutter_localizations.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  _init();
  runApp(App());
}

void _init() {
  Log.instance().d("_init");
  CrashlyticsUtils.init();
  // Analytics
  EventLog.init();
  BlocSupervisor.delegate = AppBlocDelegate();
}

class App extends StatelessWidget {
  final routeFactory = RouterCenter.init();

  final localBloc = LocaleBloc();
  final authBloc = AuthBloc();

  App() : super() {
    localBloc.add(InitLocaleEvent());
    authBloc.add(InitAuthEvent());
  }

  @override
  Widget build(BuildContext context) {
    return MultiBlocProvider(
        providers: [
          BlocProvider<LocaleBloc>(create: ((BuildContext context) => localBloc)),
          BlocProvider<AuthBloc>(create: (BuildContext context) => authBloc),
        ],
        child: BlocBuilder<LocaleBloc, LocaleState>(
            bloc: localBloc,
            builder: (BuildContext context, LocaleState state) {
              if (state is ChangedLocaleState) {
                return MaterialApp(
                  debugShowCheckedModeBanner: false,
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
                  navigatorObservers: [EventLog.analyticsObserver, RouterCenter.routeObserver],
                  home: MainPage(),
                  onGenerateRoute: routeFactory,
                );
              }
              return Container();
            }));
  }
}

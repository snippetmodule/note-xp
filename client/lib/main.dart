import 'package:bloc/bloc.dart';
import 'package:client/core/bloc/app_config/app_config.dart';
import 'package:client/core/bloc/app_config/bloc.dart';
import 'package:client/core/bloc/auth/bloc.dart';
import 'package:client/core/bloc/delegate.dart';
import 'package:client/core/utils/crashlytics_utils.dart';
import 'package:client/core/utils/event_log.dart';
import 'package:client/core/utils/log.dart';
import 'package:client/core/utils/router_center.dart';
import 'package:client/generated/i18n.dart';
import 'package:client/ui/main/main_page.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_localizations/flutter_localizations.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  _init();
  runApp(App());
}

void _init() {
  BlocSupervisor.delegate = AppBlocDelegate();
  Log.instance().d("_init");
  CrashlyticsUtil.init();
  // Analytics
  EventLog.init();
}

class App extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MultiBlocProvider(
        providers: [
          BlocProvider<AppConfigBloc>(
              create: (BuildContext context) => AppConfigBloc()..add(InitAppConfigEvent())),
          BlocProvider<AuthBloc>(
              create: (BuildContext context) => AuthBloc()..add(InitAuthEvent())),
        ],
        child: BlocBuilder<AppConfigBloc, AppConfigState>(
            builder: (BuildContext context, AppConfigState state) {
          if (state.appConfig == null) {
            return Container();
          }
          if (!state.appConfig.isUseMaterial) {
            return _buildCupertinoApp(state.appConfig);
          }
          return _buildMaterialApp(state.appConfig);
        }));
  }

  _buildCupertinoApp(AppConfig appConfig) {
    return CupertinoApp(
      debugShowCheckedModeBanner: false,
      theme: CupertinoThemeData(primaryColor: Colors.orange),
      localizationsDelegates: [
        S.delegate,
        GlobalMaterialLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
      ],
      supportedLocales: S.delegate.supportedLocales,
      localeListResolutionCallback: S.delegate.listResolution(fallback: appConfig.locale),
      locale: appConfig.locale,
      navigatorObservers: [EventLog.analyticsObserver, RouterCenter.routeObserver],
      home: MainPage(),
      onGenerateRoute: RouterCenter.router,
    );
  }

  _buildMaterialApp(AppConfig appConfig) {
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
      localeListResolutionCallback: S.delegate.listResolution(fallback: appConfig.locale),
      locale: appConfig.locale,
      navigatorObservers: [EventLog.analyticsObserver, RouterCenter.routeObserver],
      home: MainPage(),
      onGenerateRoute: RouterCenter.router,
    );
  }
}

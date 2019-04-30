import 'package:flutter/material.dart';
import 'package:client/generated/i18n.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:client/home/home.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:client/bloc/locale/bloc.dart';

class MainApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return BlocBuilder<LocaleEvent, LocaleState>(
        bloc: BlocProvider.of<LocaleBloc>(context),
        builder: (BuildContext context, LocaleState state) {
          print("MainApp:${state.locale}");
          return MaterialApp(
            theme: ThemeData(
              primarySwatch: Colors.blue,
            ),
            localizationsDelegates: [
              S.delegate,
              GlobalMaterialLocalizations.delegate,
              GlobalWidgetsLocalizations.delegate,
            ],
            supportedLocales: S.delegate.supportedLocales,
            localeListResolutionCallback:
                S.delegate.listResolution(fallback: state.locale),
            home: MyHomePage(),
          );
        });
  }
}

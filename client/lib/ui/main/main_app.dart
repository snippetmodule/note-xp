import 'package:flutter/material.dart';
import 'package:client/generated/i18n.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:client/bloc/locale/bloc.dart';
import 'package:client/config/application.dart';

class MainApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return BlocBuilder<LocaleEvent, LocaleState>(
        bloc: BlocProvider.of<LocaleBloc>(context),
        builder: (BuildContext context, LocaleState state) {
          if (state is InitialLocaleState) {
            return Container();
          }
          return MaterialApp(
            theme: ThemeData(
              primarySwatch: Colors.blue,
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
          );
        });
  }
}

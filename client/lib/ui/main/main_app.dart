import 'package:flutter/material.dart';
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
            return Container();
        });
  }
}

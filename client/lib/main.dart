import 'package:flutter/material.dart';
import 'package:bloc/bloc.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:client/ui/main/main_app.dart';
import 'package:client/bloc/delegate.dart';
import 'package:client/bloc/locale/bloc.dart';
import 'package:client/config/application.dart';

void main() {
  BlocSupervisor().delegate = AppBlocDelegate();
  runApp(App());
}

class App extends StatelessWidget {
  App() : super() {
    Application.init();
  }

  @override
  Widget build(BuildContext context) {
    return BlocProviderTree(
      blocProviders: [BlocProvider<LocaleBloc>(bloc: LocaleBloc())],
      child: MainApp(),
    );
  }
}

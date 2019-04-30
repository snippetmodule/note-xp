import 'package:flutter/material.dart';
import 'package:bloc/bloc.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:client/main/main_app.dart';
import 'package:client/bloc/delegate.dart';
import 'package:client/bloc/locale/bloc.dart';

void main() {
  BlocSupervisor().delegate = AppBlocDelegate();
  runApp(App());
}

class App extends StatelessWidget {
  const App({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return BlocProviderTree(
      blocProviders: [BlocProvider<LocaleBloc>(bloc: LocaleBloc())],
      child: MainApp(),
    );
  }
}

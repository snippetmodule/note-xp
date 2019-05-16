import 'package:flutter/material.dart';
import 'package:bloc/bloc.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:client/ui/main/main_app.dart';
import 'package:client/bloc/delegate.dart';
import 'package:client/bloc/locale/bloc.dart';
import 'package:client/config/application.dart';
import 'package:client/utils/log.dart';

void main() {
  BlocSupervisor().delegate = AppBlocDelegate();
  runApp(_App());
}

class _App extends StatelessWidget {
  Logger _logger = Logger("App");
  var localBloc = LocaleBloc();
  _App() : super() {
    Application.init();
    localBloc.dispatch(InitLocaleEvent());
    
    _logger.d("Application init");
  }

  @override
  Widget build(BuildContext context) {
    return BlocProviderTree(
      blocProviders: [BlocProvider<LocaleBloc>(bloc: localBloc)],
      child: MainApp(),
    );
  }
}

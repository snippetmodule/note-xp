import 'dart:async';
import 'package:bloc/bloc.dart';
import './bloc.dart';

class MainTabBloc extends Bloc<MainTabEvent, MainTabState> {
  @override
  MainTabState get initialState => MainTabState();

  @override
  Stream<MainTabState> mapEventToState(MainTabEvent event) async* {
      yield MainTabState(tab: event.tab);
      return;
  }
}

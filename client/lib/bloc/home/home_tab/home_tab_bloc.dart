import 'dart:async';
import 'package:bloc/bloc.dart';
import './bloc.dart';

class HomeTabBloc extends Bloc<HomeTabEvent, HomeTabState> {
  @override
  HomeTabState get initialState => HomeTabState();

  @override
  Stream<HomeTabState> mapEventToState(HomeTabEvent event) async* {
      yield HomeTabState(tab: event.tab);
      return;
  }
}

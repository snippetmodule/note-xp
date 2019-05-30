import 'package:equatable/equatable.dart';
import 'package:meta/meta.dart';
import './home_tab_state.dart';

@immutable
 class HomeTabEvent extends Equatable {
   final TabItemType tab;
  HomeTabEvent({this.tab = TabItemType.home}) : super([tab]);
}

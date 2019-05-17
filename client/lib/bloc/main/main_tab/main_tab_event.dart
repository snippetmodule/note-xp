import 'package:equatable/equatable.dart';
import 'package:meta/meta.dart';
import './main_tab_state.dart';

@immutable
 class MainTabEvent extends Equatable {
   final TabItemType tab;
  MainTabEvent({this.tab = TabItemType.home}) : super([tab]);
}

import 'package:equatable/equatable.dart';
import 'package:meta/meta.dart';
import './main_tab_state.dart';

@immutable
class MainTabEvent extends Equatable {
  final MainTabItemType tab;

  MainTabEvent(this.tab);

  @override
  List<Object> get props => [tab];
}

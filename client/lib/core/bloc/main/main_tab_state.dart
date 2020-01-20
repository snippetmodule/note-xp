import 'package:equatable/equatable.dart';
import 'package:meta/meta.dart';

@immutable
class MainTabState extends Equatable {
  final MainTabItemType tab;
  MainTabState({this.tab = MainTabItemType.home});

  @override
  List<Object> get props => [tab];
}

enum MainTabItemType { home, list, personal, more }

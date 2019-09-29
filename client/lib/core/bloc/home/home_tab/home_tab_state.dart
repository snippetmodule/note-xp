import 'package:equatable/equatable.dart';
import 'package:meta/meta.dart';

@immutable
class HomeTabState extends Equatable {
  final TabItemType tab;
  HomeTabState({this.tab = TabItemType.home});

  @override
  List<Object> get props => [tab];
}

enum TabItemType { home, list, personal, more }

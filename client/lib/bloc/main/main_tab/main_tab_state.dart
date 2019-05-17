import 'package:equatable/equatable.dart';
import 'package:meta/meta.dart';

@immutable
class MainTabState extends Equatable {
  final TabItemType tab;
  MainTabState({this.tab = TabItemType.home}) : super([tab]);
}

enum TabItemType { home, list, personal, more }

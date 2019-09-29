import 'package:equatable/equatable.dart';
import 'package:meta/meta.dart';

typedef ExecAsyncFunc = Future<dynamic> Function();

@immutable
abstract class AsyncEvent extends Equatable {
  AsyncEvent();

  @override
  List<Object> get props => [];
}

class ExecAsyncEvent extends AsyncEvent {
  final ExecAsyncFunc execAsync;

  ExecAsyncEvent(this.execAsync);

  @override
  List<Object> get props => [execAsync];
}

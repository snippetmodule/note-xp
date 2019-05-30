import 'package:equatable/equatable.dart';
import 'package:meta/meta.dart';

@immutable
abstract class AsyncState extends Equatable {
  AsyncState([List props = const []]) : super(props);
}

class InitialAsyncState extends AsyncState {}

class LoadingAsyncState extends AsyncState {}

class SuccessAsyncState extends AsyncState {
  final dynamic result;

  SuccessAsyncState(this.result);
}

class FailAsyncState extends AsyncState {
  final dynamic exception;
  final StackTrace stackTrace;

  FailAsyncState(this.exception, this.stackTrace);
}

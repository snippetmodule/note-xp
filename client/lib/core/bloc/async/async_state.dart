import 'package:equatable/equatable.dart';
import 'package:flutter/material.dart';
import 'package:meta/meta.dart';

@immutable
abstract class AsyncState extends Equatable {
  AsyncState();

  @override
  List<Object> get props => [];
}

class InitialAsyncState extends AsyncState {}

class LoadingAsyncState extends AsyncState {}

class SuccessAsyncState extends AsyncState {
  final Widget result;

  SuccessAsyncState(this.result);

  @override
  List<Object> get props => [result];
}

class FailAsyncState extends AsyncState {
  final dynamic exception;
  final StackTrace stackTrace;

  FailAsyncState(this.exception, this.stackTrace);

  @override
  List<Object> get props => [exception, stackTrace];
}

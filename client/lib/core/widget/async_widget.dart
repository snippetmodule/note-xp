import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:client/core/bloc/async/bloc.dart';

typedef ExecAsyncFunc = Future<dynamic> Function();

typedef InitialBuilder = Widget Function(BuildContext context);
typedef LoadingBuilder = Widget Function(BuildContext context);
typedef SuccessBuilder = Widget Function(BuildContext context, dynamic result);
typedef FailBuilder = Widget Function(
    BuildContext context, dynamic exception, StackTrace stackTrace);

class AsyncWidget<Result> extends StatelessWidget {
  final _bloc = AsyncBloc();

  final Future<Result> Function() execAsync;
  final InitialBuilder initialBuilder;
  final LoadingBuilder loadingBuilder;
  final SuccessBuilder successBuilder;
  final FailBuilder failBuilder;

  AsyncWidget({
    Key key,
    this.execAsync,
    this.initialBuilder,
    this.loadingBuilder,
    this.successBuilder,
    this.failBuilder,
  })  : assert(execAsync != null),
        assert(successBuilder != null),
        super(key: key);

  @override
  Widget build(BuildContext context) {
    _bloc.add(ExecAsyncEvent(execAsync));
    return BlocBuilder<AsyncBloc, AsyncState>(
        bloc: _bloc,
        builder: (BuildContext context, AsyncState state) {
          if (state is InitialAsyncState && initialBuilder != null) {
            return initialBuilder(context);
          }
          if (state is LoadingAsyncState && loadingBuilder != null) {
            return loadingBuilder(context);
          }
          if (state is SuccessAsyncState && successBuilder != null) {
            return successBuilder(context, state.result);
          }
          if (state is FailAsyncState && failBuilder != null) {
            return failBuilder(context, state.exception, state.stackTrace);
          }
          return Container();
        });
  }
}

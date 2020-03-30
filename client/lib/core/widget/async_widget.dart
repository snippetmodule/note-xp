import 'package:client/core/bloc/async/bloc.dart';
import 'package:client/core/utils/build_mode.dart';
import 'package:client/core/utils/log.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

typedef ExecAsyncFunc = Future<Widget> Function();
typedef InitialBuilder = Widget Function(BuildContext context);
typedef LoadingBuilder = Widget Function(BuildContext context);
typedef FailBuilder = Widget Function(
    BuildContext context, dynamic exception, StackTrace stackTrace);

class AsyncWidget extends StatelessWidget {
  final Logger _logger = Logger("AsyncWidget");

  final AsyncBloc _bloc; // = AsyncBloc();

  final ExecAsyncFunc execAsync;
  final InitialBuilder initialBuilder;
  final LoadingBuilder loadingBuilder;
  final FailBuilder failBuilder;

  AsyncWidget({
    Key key,
    this.execAsync,
    this.initialBuilder,
    this.loadingBuilder,
    this.failBuilder,
  })  : assert(execAsync != null),
        _bloc = AsyncBloc()..add(ExecAsyncEvent(execAsync)),
        super(key: key);

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<AsyncBloc, AsyncState>(
        bloc: _bloc,
        builder: (BuildContext context, AsyncState state) {
          if (state is InitialAsyncState && initialBuilder != null) {
            return initialBuilder(context);
          }
          if (state is LoadingAsyncState && loadingBuilder != null) {
            return loadingBuilder(context);
          }
          if (state is SuccessAsyncState) {
            return state.result;
          }
          if (state is FailAsyncState) {
            if (failBuilder != null) {
              return failBuilder(context, state.exception, state.stackTrace);
            }
            if (isDebug) {
              return _failBuilder(context, state.exception, state.stackTrace);
            }
          }
          return Container();
        });
  }

  Widget _failBuilder(BuildContext context, dynamic exception, StackTrace stackTrace) {
    _logger.e("exception", ex: exception, stacktrace: stackTrace);
    return Column(
      children: <Widget>[
        Text("Exception:"),
        Text("$exception"),
        Text("StackTrace:"),
        Text("$stackTrace"),
      ],
    );
  }
}

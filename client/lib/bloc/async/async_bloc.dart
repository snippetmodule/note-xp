import 'dart:async';
import 'package:bloc/bloc.dart';
import 'package:client/bloc/async/bloc.dart';

class AsyncBloc extends Bloc<AsyncEvent, AsyncState> {
  @override
  AsyncState get initialState => InitialAsyncState();

  @override
  Stream<AsyncState> mapEventToState(AsyncEvent event) async* {
    if (event is ExecAsyncEvent) {
      try {
        yield LoadingAsyncState();
        final result = await event.execAsync();
        yield SuccessAsyncState(result);
      } catch (e, s) {
        yield FailAsyncState(e, s);
      }
      return;
    }
  }
}

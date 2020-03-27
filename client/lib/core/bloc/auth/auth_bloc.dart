import 'dart:async';
import 'package:bloc/bloc.dart';
import 'package:client/core/model/account_entity.dart';
import './bloc.dart';
import 'package:client/core/utils/local_config.dart';

class AuthBloc extends Bloc<AuthEvent, AuthState> {
  @override
  AuthState get initialState => InitAuthState();

  @override
  Stream<AuthState> mapEventToState(AuthEvent event) async* {
    if (event is InitAuthEvent) {
      AccountEntity account = await LocalConfig.getAccount();
      if (account == null) {
        yield UnLoginAuthState();
      } else {
        yield LoginedAuthState(account);
      }
      return;
    }
    if (event is LoginAuthEvent) {
      yield LoginingAuthState();
      AccountEntity account = AccountEntity();
      account.username = event.userName;
      account.pic = event.pass;
      await LocalConfig.setAccount(account);
      yield LoginedAuthState(account);
      return;
    }
    if (event is RegisterAuthEvent) {
      yield LoginingAuthState();
      AccountEntity account = AccountEntity();
      account.username = event.userName;
      account.pic = event.pass;
      await LocalConfig.setAccount(account);
      yield LoginedAuthState(account);
      return;
    }
    if (event is LogoutAuthEvent) {
      yield LogoutingAuthState();
      await LocalConfig.setAccount(null);
      yield UnLoginAuthState();
      return;
    }
  }
}

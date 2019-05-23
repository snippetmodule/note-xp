import 'dart:async';
import 'package:bloc/bloc.dart';
import 'package:client/model/auth/account.dart';
import './bloc.dart';
import 'package:client/utils/mmkv.dart';

class AuthBloc extends Bloc<AuthEvent, AuthState> {
  @override
  AuthState get initialState => InitAuthState();

  @override
  Stream<AuthState> mapEventToState(AuthEvent event) async* {
    if (event is InitAuthEvent) {
      Account account = await Mmkv.getAccount();
      if(account == null){
        yield UnLoginAuthState();
      }else{
        yield LoginedAuthState(account);
      }
      return;
    }
    if (event is LoginAuthEvent) {
      yield LoginingAuthState();
      Account account = Account(event.userName, event.pass);
      await Mmkv.setAccount(account);
      yield LoginedAuthState(account);
      return;
    }
    if (event is RegisterAuthEvent) {
      yield LoginingAuthState();
      Account account = Account(event.userName, event.pass);
      await Mmkv.setAccount(account);
      yield LoginedAuthState(account);
      return;
    }
    if (event is LogoutAuthEvent) {
      yield LogoutingAuthState();
      await Mmkv.setAccount(null);
      yield UnLoginAuthState();
      return;
    }
  }
}

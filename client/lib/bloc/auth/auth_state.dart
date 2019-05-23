import 'package:client/model/auth/account.dart';
import 'package:equatable/equatable.dart';
import 'package:meta/meta.dart';

@immutable
abstract class AuthState extends Equatable {
  AuthState([List props = const []]) : super(props);
}

class InitAuthState extends AuthState {}

class LoginedAuthState extends AuthState {
  final Account account;

  LoginedAuthState(this.account);
}

class LoginingAuthState extends AuthState {}

class LogoutingAuthState extends AuthState {}

class UnLoginAuthState extends AuthState {}

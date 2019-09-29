import 'package:client/core/model/auth/account.dart';
import 'package:equatable/equatable.dart';
import 'package:meta/meta.dart';

@immutable
abstract class AuthState extends Equatable {
  AuthState();

  @override
  List<Object> get props => [];
}

class InitAuthState extends AuthState {}

class LoginedAuthState extends AuthState {
  final Account account;

  LoginedAuthState(this.account);

  @override
  List<Object> get props => [account];
}

class LoginingAuthState extends AuthState {}

class LogoutingAuthState extends AuthState {}

class UnLoginAuthState extends AuthState {}

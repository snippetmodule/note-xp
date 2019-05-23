import 'package:equatable/equatable.dart';
import 'package:meta/meta.dart';

@immutable
abstract class AuthEvent extends Equatable {
  AuthEvent([List props = const []]) : super(props);
}

class InitAuthEvent extends AuthEvent {}

class LoginAuthEvent extends AuthEvent {
  final String userName;
  final String pass;
  LoginAuthEvent(this.userName, this.pass);
}

class RegisterAuthEvent extends AuthEvent {
  final String userName;
  final String pass;
  RegisterAuthEvent(this.userName, this.pass);
}

class LogoutAuthEvent extends AuthEvent {}

library account;

import 'package:json_annotation/json_annotation.dart';

part 'account.g.dart';

@JsonSerializable()
class Account {
  factory Account.fromJson(Map<String, dynamic> json) =>
      _$AccountFromJson(json);

  Map<String, dynamic> toJson(Account instance) => _$AccountToJson(instance);

  @JsonKey(name: 'username')
  String userName;
  @JsonKey(name: 'pic')
  String pic;

  Account(this.userName, this.pic);
}

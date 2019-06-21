// GENERATED CODE - DO NOT MODIFY BY HAND

part of account;

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Account _$AccountFromJson(Map<String, dynamic> json) {
  return Account(json['username'] as String, json['pic'] as String);
}

Map<String, dynamic> _$AccountToJson(Account instance) =>
    <String, dynamic>{'username': instance.userName, 'pic': instance.pic};

import 'package:client/generated/json/base/json_convert_content.dart';
import 'package:client/generated/json/base/json_filed.dart';

class AccountEntity with JsonConvert<AccountEntity> {
  @JSONField(name: "username")
  String username;
  @JSONField(name: "pic")
  String pic;
}

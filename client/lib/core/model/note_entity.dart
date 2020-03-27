import 'package:client/generated/json/base/json_convert_content.dart';
import 'package:client/generated/json/base/json_filed.dart';

class NoteEntity with JsonConvert<NoteEntity> {
  @JSONField(name: "id")
  int id;
  @JSONField(name: "text")
  String text;
  @JSONField(name: "type")
  int type;
  @JSONField(name: "createTime")
  int createTime;
}

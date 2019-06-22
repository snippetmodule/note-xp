library note;

import 'package:json_annotation/json_annotation.dart';

part 'note.g.dart';

@JsonSerializable()
class Note {
  factory Note.fromJson(Map<String, dynamic> json) => _$NoteFromJson(json);

  Map<String, dynamic> toJson(Note instance) => _$NoteToJson(instance);

  int id;
  String text;
  int type;
  int createTime;

  Note(this.id, this.text, this.type, this.createTime);
}

// GENERATED CODE - DO NOT MODIFY BY HAND

part of note;

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Note _$NoteFromJson(Map<String, dynamic> json) {
  return Note(json['id'] as int, json['text'] as String, json['type'] as int,
      json['createTime'] as int);
}

Map<String, dynamic> _$NoteToJson(Note instance) => <String, dynamic>{
      'id': instance.id,
      'text': instance.text,
      'type': instance.type,
      'createTime': instance.createTime
    };

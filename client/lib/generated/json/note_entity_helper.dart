import 'package:client/core/model/note_entity.dart';

noteEntityFromJson(NoteEntity data, Map<String, dynamic> json) {
	if (json['id'] != null) {
		data.id = json['id']?.toInt();
	}
	if (json['text'] != null) {
		data.text = json['text']?.toString();
	}
	if (json['type'] != null) {
		data.type = json['type']?.toInt();
	}
	if (json['createTime'] != null) {
		data.createTime = json['createTime']?.toInt();
	}
	return data;
}

Map<String, dynamic> noteEntityToJson(NoteEntity entity) {
	final Map<String, dynamic> data = new Map<String, dynamic>();
	data['id'] = entity.id;
	data['text'] = entity.text;
	data['type'] = entity.type;
	data['createTime'] = entity.createTime;
	return data;
}
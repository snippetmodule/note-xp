import 'package:client/core/model/account_entity.dart';

accountEntityFromJson(AccountEntity data, Map<String, dynamic> json) {
	if (json['username'] != null) {
		data.username = json['username']?.toString();
	}
	if (json['pic'] != null) {
		data.pic = json['pic']?.toString();
	}
	return data;
}

Map<String, dynamic> accountEntityToJson(AccountEntity entity) {
	final Map<String, dynamic> data = new Map<String, dynamic>();
	data['username'] = entity.username;
	data['pic'] = entity.pic;
	return data;
}
class Note {
  int id;
  String text;
  int type;
  int createTime;

  Note({this.id, this.text, this.type, this.createTime});

  Note.fromJson(Map<String, dynamic> json) {
    id = json['id'] as int;
    text = json['text'] as String;
    type = json['type'] as int;
    createTime = json['createTime'] as int;
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = Map<String, dynamic>();
    data['id'] = this.id;
    data['text'] = this.text;
    data['type'] = this.type;
    data['createTime'] = this.createTime;
    return data;
  }
}

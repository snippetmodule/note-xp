class Account {
  String userName;
  String pic;

  Account(this.userName, this.pic);

  Account.fromJson(Map<String, dynamic> json) {
    userName = json['username'] as String;
    pic = json['pic'] as String;
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = Map<String, dynamic>();
    data['username'] = this.userName;
    data['pic'] = this.pic;
    return data;
  }
}

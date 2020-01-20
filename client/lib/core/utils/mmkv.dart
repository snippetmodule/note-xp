import 'package:client/core/model/auth/account.dart';
import 'package:mmkv_flutter/mmkv_flutter.dart';
import 'package:flutter/material.dart';
import 'dart:convert';
import 'dart:core';

class Mmkv {
  Mmkv._();

  static int _firstLaunchTime = 0;

  static Future<int> getInstallTime() async {
    var mmkv = await MmkvFlutter.getInstance();
    var now = DateTime.now().millisecondsSinceEpoch;
    if (_firstLaunchTime == 0) {
      _firstLaunchTime = await mmkv.getLong("firstLaunchDate");
    }
    if (_firstLaunchTime.isNaN) {
      _firstLaunchTime = now;
      await mmkv.setLong("firstLaunchDate", _firstLaunchTime);
    }
    return ((now - _firstLaunchTime) / 1000).abs().toInt();
  }

  static Future<Locale> getLocale() async {
    var mmkv = await MmkvFlutter.getInstance();
    var config = await mmkv.getString("locale");
    if (config.isEmpty) {
      return Locale("zh", "CN");
    }
    var splits = config.split("_");
    return Locale(splits[0], splits[1]);
  }

  static void setLocale(Locale locale) async {
    var mmkv = await MmkvFlutter.getInstance();
    await mmkv.setString(
        "locale", "${locale.languageCode}_${locale.countryCode}");
  }

  static Future<Account> getAccount() async {
    var mmkv = await MmkvFlutter.getInstance();
    var config = await mmkv.getString("account");
    if (config.isEmpty) {
      return null;
    }
    Map<String, dynamic> map = jsonDecode(config) as Map<String, dynamic>;
    return Account.fromJson(map);
  }

  static void setAccount(Account account) async {
    var mmkv = await MmkvFlutter.getInstance();
    if (account == null) {
      await mmkv.removeByKey("account");
      return;
    }
    await mmkv.setString("account", json.encode(account.toJson()));
  }
}

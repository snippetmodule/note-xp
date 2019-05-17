import 'package:mmkv_flutter/mmkv_flutter.dart';
import 'package:flutter/material.dart';

class Mmkv {
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
}

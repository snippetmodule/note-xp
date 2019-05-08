import 'package:mmkv_flutter/mmkv_flutter.dart';
import 'package:flutter/material.dart';

Future<Locale> getLocale() async {
  var mmkv = await MmkvFlutter.getInstance();
  var config = await mmkv.getString("locale_") ?? "en_";
  var splits = config.split("_");
  return Locale(splits[0], splits[1]);
}

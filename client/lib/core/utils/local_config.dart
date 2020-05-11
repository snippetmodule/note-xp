import 'dart:core';

import 'package:client/core/model/account_entity.dart';
import 'package:client/core/utils/common/sp_util.dart';
import 'package:flutter/material.dart';
import 'package:uuid/uuid.dart';

class LocalConfig {
  LocalConfig._();

  static int _firstLaunchTime = 0;

  static Future<int> getInstallTime() async {
    var now = DateTime.now().millisecondsSinceEpoch;
    if (_firstLaunchTime == 0) {
      _firstLaunchTime = await SpUtil.getInt("firstLaunchDate");
    }
    if (_firstLaunchTime.isNaN) {
      _firstLaunchTime = now;
      await SpUtil.setInt("firstLaunchDate", _firstLaunchTime);
    }
    return ((now - _firstLaunchTime) / 1000).abs().toInt();
  }

  static Future<String> getDeviceId() async {
    return await SpUtil.getString("device_id", defValue: Uuid().v4());
  }

  static Future<Locale> getLocale() async {
    var config = await SpUtil.getString("locale");
    if (config.isEmpty) {
      return Locale("zh", "CN");
    }
    var splits = config.split("_");
    return Locale(splits[0], splits[1]);
  }

  static Future<ThemeMode> getThemeMode() async {
    var config = await SpUtil.getInt("theme_mode");
    switch (config) {
      case 1:
        return ThemeMode.light;
      case 2:
        return ThemeMode.dark;
      default:
        return ThemeMode.system;
    }
  }

  static void setThemeMode(ThemeMode mode) async {
    await SpUtil.setInt("theme_mode", mode.index);
  }

  static Future<bool> isDebug() async {
    return await SpUtil.getBool("app_config_is_debug");
  }

  static void setIsDebug(bool isDebug) async {
    await SpUtil.setBool("app_config_is_debug", isDebug);
  }

  static Future<bool> isUserMaterial() async {
    return await SpUtil.getBool("app_config_is_material");
  }

  static void setIsUserMaterial(bool value) async {
    await SpUtil.setBool("app_config_is_material", value);
  }

  static void setLocale(Locale locale) async {
    await SpUtil.setString("locale", "${locale.languageCode}_${locale.countryCode}");
  }

  static Future<AccountEntity> getAccount() async {
    return await SpUtil.getObject("account");
  }

  static Future<void> setAccount(AccountEntity account) async {
    if (account == null) {
      await SpUtil.remove("account");
      return;
    }
    await SpUtil.setObject("account", account);
  }
}

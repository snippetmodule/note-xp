import 'dart:async';
import 'dart:convert';

import 'package:client/generated/json/base/json_convert_content.dart';
import 'package:shared_preferences/shared_preferences.dart';

/// SharedPreferences Util.
class SpUtil {
  static SpUtil _singleton;

  static SpUtil getInstance() {
    if (_singleton == null) {
      _singleton = SpUtil._();
    }
    return _singleton;
  }

  SpUtil._();

  /// set object.
  static Future<bool> setObject<T>(String key, JsonConvert<T> value) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.setString(key, value == null ? "" : json.encode(value.toJson()));
  }

  /// get obj.
  static Future<JsonConvert<T>> getObject<T>(String key, {JsonConvert<T> defValue}) async {
    JsonConvert<T> object = await _getObj(key);
    return object == null ? defValue : object;
  }

  /// get object.
  static Future<JsonConvert<T>> _getObj<T>(String key) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    String data = prefs.getString(key);
    return (data == null || data.isEmpty) ? null : JsonConvert.fromJsonAsT(json.decode(data));
  }

  /// set object list.
  static Future<bool> setObjectList<T>(String key, List<JsonConvert<T>> list) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    List<String> dataList = list?.map((value) {
      return json.encode(value.toJson());
    })?.toList();
    return prefs.setStringList(key, dataList);
  }

  /// get obj list.
  static Future<List<JsonConvert<T>>> getObjectList<T>(String key,
      {List<JsonConvert<T>> defValue = const []}) async {
    List<Map> dataList = await _getObjList(key);
    List<JsonConvert<T>> list = dataList?.map((value) {
      return JsonConvert.fromJsonAsT(value) as JsonConvert<T>;
    })?.toList();
    return list ?? defValue;
  }

  /// get object list.
  static Future<List<Map>> _getObjList(String key) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    List<String> dataLis = prefs.getStringList(key);
    return dataLis?.map((value) {
      Map _dataMap = json.decode(value);
      return _dataMap;
    })?.toList();
  }

  /// get string.
  static Future<String> getString(String key, {String defValue = ''}) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.getString(key) ?? defValue;
  }

  /// set string.
  static Future<bool> setString(String key, String value) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.setString(key, value);
  }

  /// get bool.
  static Future<bool> getBool(String key, {bool defValue = false}) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.getBool(key) ?? defValue;
  }

  /// set bool.
  static Future<bool> setBool(String key, bool value) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.setBool(key, value);
  }

  /// get int.
  static Future<int> getInt(String key, {int defValue = 0}) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.getInt(key) ?? defValue;
  }

  /// set int.
  static Future<bool> setInt(String key, int value) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.setInt(key, value);
  }

  /// get double.
  static Future<double> getDouble(String key, {double defValue = 0.0}) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.getDouble(key) ?? defValue;
  }

  /// set double.
  static Future<bool> setDouble(String key, double value) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.setDouble(key, value);
  }

  /// get string list.
  static Future<List<String>> getStringList(String key, {List<String> defValue = const []}) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.getStringList(key) ?? defValue;
  }

  /// set string list.
  static Future<bool> setStringList(String key, List<String> value) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.setStringList(key, value);
  }

  /// get dynamic.
  static Future<dynamic> getDynamic(String key, {Object defValue}) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.get(key) ?? defValue;
  }

  /// have key.
  static Future<bool> haveKey(String key) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.getKeys().contains(key);
  }

  /// get keys.
  static Future<Set<String>> getKeys() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.getKeys();
  }

  /// remove.
  static Future<bool> remove(String key) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.remove(key);
  }

  /// clear.
  static Future<bool> clear() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.clear();
  }
}

import 'package:flutter/foundation.dart';
import 'package:intl/intl.dart';

class Logger {
  final bool isEnable;
  final String tag;
  final String msgPrefix;
  DateFormat _dateFormat = DateFormat("yyyy-MM-dd hh:mm:ss.S");
  static Map<String, Logger> _cache = Map<String, Logger>();

  Logger._(this.tag, {this.msgPrefix = '', this.isEnable = true});

  factory Logger(String tag, {msgPrefix = '', isEnable = true}) {
    String key = '$tag$msgPrefix';
    if (_cache.containsKey(key)) {
      return _cache[key];
    } else {
      final instance = Logger._(tag, msgPrefix: msgPrefix as String, isEnable: isEnable as bool);
      _cache[key] = instance;
      return instance;
    }
  }

  v(String msg, {dynamic ex, StackTrace stacktrace}) {
    if (!isEnable) {
      return;
    }
    _log("V", tag, '$msgPrefix $msg', ex: ex, stacktrace: stacktrace);
  }

  d(String msg, {dynamic ex, StackTrace stacktrace}) {
    if (!isEnable) {
      return;
    }
    _log("D", tag, '$msgPrefix $msg', ex: ex, stacktrace: stacktrace);
  }

  i(String msg, {dynamic ex, StackTrace stacktrace}) {
    if (!isEnable) {
      return;
    }
    _log("I", tag, '$msgPrefix $msg', ex: ex, stacktrace: stacktrace);
  }

  w(String msg, {dynamic ex, StackTrace stacktrace}) {
    if (!isEnable) {
      return;
    }
    _log("W", tag, '$msgPrefix $msg', ex: ex, stacktrace: stacktrace);
  }

  e(String msg, {dynamic ex, StackTrace stacktrace}) {
    if (!isEnable) {
      return;
    }
    _log("E", tag, '$msgPrefix $msg', ex: ex, stacktrace: stacktrace);
  }

  _log(String level, String tag, String msg, {dynamic ex, StackTrace stacktrace}) {
    if (ex != null) {
      var tmpStacktrace = stacktrace?.toString()?.split('\n');
      var stackTraceMessage = tmpStacktrace.map((stackLine) => "\t$stackLine").join("\n");
      _printLog("$level $tag: $msg \n${ex.toString()}\n$stackTraceMessage", level: level);
    } else {
      _printLog("$level $tag: $msg", level: level);
    }
  }

  _printLog(String logLine, {String level}) {
    String printableLine = "${_dateFormat.format(DateTime.now())} $logLine";
    debugPrint(printableLine);
  }
}

class Log extends Logger {
  static Log _instance = Log._();

  Log._() : super._("Log");

  factory Log.instance() {
    return _instance;
  }
}

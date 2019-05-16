import 'package:fimber/fimber.dart';
import 'package:flutter_fimber/flutter_fimber.dart';
import 'build_mode.dart' as Build;
import 'package:intl/intl.dart';
import 'package:flutter/foundation.dart';

class Logger {
  bool _isDebug = Build.isDebug;

  String tag;

  static Map<String, Logger> _cache = Map<String, Logger>();

  Logger._(this.tag);

  factory Logger(String tag) {
    if (_cache.isEmpty) {
      Fimber.plantTree(DebugTimeBufferTree());
    }
    if (_cache.containsKey(tag)) {
      return _cache[tag];
    } else {
      final instance = Logger._(tag);
      _cache[tag] = instance;
      return instance;
    }
  }

  v(String msg, {dynamic ex, StackTrace stacktrace}) {
    if (!_isDebug) {
      return;
    }
    _log("V", tag, msg, ex: ex, stacktrace: stacktrace);
  }

  d(String msg, {dynamic ex, StackTrace stacktrace}) {
    if (!_isDebug) {
      return;
    }
    _log("D", tag, msg, ex: ex, stacktrace: stacktrace);
  }

  i(String msg, {dynamic ex, StackTrace stacktrace}) {
    if (!_isDebug) {
      return;
    }
    _log("I", tag, msg, ex: ex, stacktrace: stacktrace);
  }

  w(String msg, {dynamic ex, StackTrace stacktrace}) {
    if (!_isDebug) {
      return;
    }
    _log("W", tag, msg, ex: ex, stacktrace: stacktrace);
  }

  e(String msg, {dynamic ex, StackTrace stacktrace}) {
    if (!_isDebug) {
      return;
    }
    _log("E", tag, msg, ex: ex, stacktrace: stacktrace);
  }

  _log(String level, String tag, String msg,
      {dynamic ex, StackTrace stacktrace}) {
//    developer.log(msg, name: tag, error: ex, stackTrace: stacktrace);
//    printDebug("");
    Fimber.log(level, msg, tag: tag, ex: ex, stacktrace: stacktrace);
  }
}

class Log extends Logger {
  static Logger _instance = Log._();

  Log._() : super._("Log");

  factory Log() {
    return _instance;
  }
}

class DebugTimeBufferTree extends DebugBufferTree {
  DateFormat _dateFormat = DateFormat("yyyy-MM-dd hh:mm:ss.S");

  DebugTimeBufferTree(
      {int printTimeType = DebugTree.TIME_ELAPSED,
      List<String> logLevels = const ["V", "D", "I", "W", "E"]})
      : super(printTimeType: printTimeType, logLevels: logLevels);

  @override
  log(String level, String msg,
      {String tag, dynamic ex, StackTrace stacktrace}) {
    var logTag = tag ?? LogTree.getTag();
    if (ex != null) {
      var tmpStacktrace =
          stacktrace?.toString()?.split('\n') ?? LogTree.getStacktrace();
      var stackTraceMessage =
          tmpStacktrace.map((stackLine) => "\t$stackLine").join("\n");
      printLog("$level $logTag: $msg \n${ex.toString()}\n$stackTraceMessage",
          level: level);
    } else {
      printLog("$level $logTag: $msg", level: level);
    }
  }

  @override
  printLog(String logLine, {String level}) {
    String printableLine = "${_dateFormat.format(DateTime.now())} $logLine";
    debugPrint(printableLine);
  }
}

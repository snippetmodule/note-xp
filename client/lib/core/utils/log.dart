import 'package:fimber/fimber.dart';
import 'package:flutter_fimber/flutter_fimber.dart';
import 'build_mode.dart' as Build;
import 'package:intl/intl.dart';
import 'package:flutter/foundation.dart';

class Logger {
  final bool isEnable;
  final String tag;
  final String msgPrefix;

  static Map<String, Logger> _cache = Map<String, Logger>();

  Logger._(this.tag, {this.msgPrefix = '', this.isEnable = true});

  factory Logger(String tag, {msgPrefix = '', isEnable = true}) {
    if (_cache.isEmpty) {
      Fimber.plantTree(DebugTimeBufferTree());
    }
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
//    developer.log(msg, name: tag, error: ex, stackTrace: stacktrace);
//    printDebug("");
    Fimber.log(level, msg, tag: tag, ex: ex, stacktrace: stacktrace);
  }
}

class Log extends Logger {
  static Log _instance = Log._();

  Log._() : super._("Log");

  factory Log.instance() {
    return _instance;
  }
}

class DebugTimeBufferTree extends DebugBufferTree {
  DateFormat _dateFormat = DateFormat("yyyy-MM-dd hh:mm:ss.S");

  DebugTimeBufferTree({int printTimeType = DebugTree.TIME_ELAPSED, List<String> logLevels = const ["V", "D", "I", "W", "E"]})
      : super(printTimeType: printTimeType, logLevels: logLevels);

  @override
  log(String level, String msg, {String tag, dynamic ex, StackTrace stacktrace}) {
    var logTag = tag ?? LogTree.getTag();
    if (ex != null) {
      var tmpStacktrace = stacktrace?.toString()?.split('\n') ?? LogTree.getStacktrace();
      var stackTraceMessage = tmpStacktrace.map((stackLine) => "\t$stackLine").join("\n");
      printLog("$level $logTag: $msg \n${ex.toString()}\n$stackTraceMessage", level: level);
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

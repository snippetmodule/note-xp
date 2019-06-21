enum BuildMode { release, profile, debug }

BuildMode buildMode = (() {
  if (const bool.fromEnvironment('dart.vm.product')) {
    return BuildMode.release;
  }
  var result = BuildMode.profile;
  assert(() {
    result = BuildMode.debug;
    return true;
  }());
  return result;
}());
final bool isStrictDebug = buildMode == BuildMode.debug;
final bool isDebug = buildMode == BuildMode.debug || buildMode == BuildMode.profile;

import 'dart:async';
import 'dart:core';

import 'package:package_info/package_info.dart';
import 'package:device_info/device_info.dart';
import 'dart:io' show Platform;

class AppUtils {
  AppUtils._();

  static Future<PackageInfo> getPackageInfo() async {
    return await PackageInfo.fromPlatform();
  }

  static Future<String> getDeviceInfo() async {
    DeviceInfoPlugin deviceInfo = DeviceInfoPlugin();

    if (Platform.isAndroid) {
      AndroidDeviceInfo info = await deviceInfo.androidInfo;
      return "[version:${info.version},\nboard:${info.board},\nbootloader:${info.bootloader},\nbrand:${info.brand},\ndevice:${info.device},\ndisplay:${info.display},\nfingerprint:${info.fingerprint},\nhardware:${info.hardware},host:${info.host},\nid:${info.id},\nmanufacturer:${info.manufacturer},\nmodel:${info.model},\nproduct:${info.product},\nsupported32BitAbis:${info.supported32BitAbis},\nsupported64BitAbis:${info.supported64BitAbis},\nsupportedAbis:${info.supportedAbis},\ntags:${info.tags},\ntype:${info.type},\nisPhysicalDevice:${info.isPhysicalDevice},\nandroidId:${info.androidId}]";
    } else if (Platform.isIOS) {
      IosDeviceInfo info = await deviceInfo.iosInfo;
      return "[name:${info.name},\nsystemName:${info.systemName},\nsystemVersion:${info.systemVersion},\nmodel:${info.model},\nlocalizedModel:${info.localizedModel},\nidentifierForVerdor:${info.identifierForVendor},\nisPhysicalDevice:${info.isPhysicalDevice},\nutsname:\n[sysname:${info.utsname.sysname},\n\tnodename:${info.utsname.nodename},\n\trelease:${info.utsname.release},\n\tversion:${info.utsname.version},\n\tmachine:${info.utsname.machine}]\n]";
    } else {
      return "";
    }
  }
}

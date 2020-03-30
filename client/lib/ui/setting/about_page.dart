import 'package:client/core/utils/app_utils.dart';
import 'package:client/core/utils/build_mode.dart' as BuildMode;
import 'package:client/core/utils/event_log.dart';
import 'package:client/core/utils/router_center.dart';
import 'package:client/core/widget/async_widget.dart';
import 'package:client/core/widget/event_log_widget.dart';
import 'package:client/generated/i18n.dart';
import 'package:client/ui/widget/custom_app_bar.dart';
import 'package:flutter/material.dart';
import 'package:package_info/package_info.dart';

class AboutPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return EventLogWidget(
        screenName: EventConstants.EVENT_ABOUT,
        child: Scaffold(
            appBar: CustomAppBar(title: S.of(context).more_menu_abort),
            body: AsyncWidget(
              execAsync: () async {
                var packageInfo = await AppUtils.getPackageInfo();
                var deviceInfo = await AppUtils.getDeviceInfo();
                return _body(context, packageInfo, deviceInfo);
              },
            )));
  }

  Widget _body(BuildContext context, PackageInfo packageInfo, String deviceInfo) {
    return ListView(
        shrinkWrap: true,
        padding: const EdgeInsets.symmetric(horizontal: 10),
        children: <Widget>[
          Column(
            children: <Widget>[
              Padding(
                padding: EdgeInsets.symmetric(vertical: 12),
                child: ImageIcon(
                  AssetImage('assets/images/btn_icon_dingyuehao_normal.png'),
                  color: Colors.red,
                  size: 50.0,
                ),
              ),
              InkWell(
                child: Text(
                  S.of(context).appName,
                  style: TextStyle(fontSize: 20, color: Colors.black, fontWeight: FontWeight.w500),
                ),
                onTap: () {
                  if (clickCount >= 10) {
                    RouterCenter.openDebugPage(context);
                    return;
                  }
                  DateTime now = DateTime.now();
                  if (now.difference(lastClickTime).inMilliseconds > 2000) {
                    clickCount = 0;
                    lastClickTime = now;
                    return;
                  }
                  clickCount++;
                },
              ),
              Padding(
                padding: EdgeInsets.symmetric(vertical: 12),
                child: Text(
                    '${packageInfo.version}-${packageInfo.buildNumber} ${BuildMode.buildMode.toString().split(".").last}'),
              ),
              Padding(
                padding: EdgeInsets.symmetric(vertical: 12),
                child: Text(S.of(context).appDesc),
              ),
              Text(
                deviceInfo,
                textAlign: TextAlign.start,
                style: TextStyle(fontSize: 15),
              ),
            ],
          ),
        ]);
  }
}

var clickCount = 0;
var lastClickTime = DateTime.now();

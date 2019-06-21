import 'package:client/ui/widget/custom_app_bar.dart';
import 'package:flutter/material.dart';
import 'package:client/generated/i18n.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:client/core/bloc/auth/bloc.dart';
import './logined_widget.dart';
import './unlogin_widget.dart';
import 'package:client/ui/widget/event_log_widget.dart';
import 'package:client/core/utils/event_log.dart';
import 'package:client/core/utils/app_utils.dart';
import 'package:client/ui/widget/async_widget.dart';
import 'package:package_info/package_info.dart';
import 'package:client/core/utils/build_mode.dart' as BuildMode;

class AboutPage extends StatelessWidget {
//  PackageInfo _packageInfo;
//  String _deviceInfo;
  Widget _body(
      BuildContext context, PackageInfo packageInfo, String deviceInfo) {
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
              Text(
                S.of(context).appName,
                style: TextStyle(
                    fontSize: 20,
                    color: Colors.black,
                    fontWeight: FontWeight.w500),
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

  @override
  Widget build(BuildContext context) {
    return EventLogWidget(
        screenName: EventConstants.EVENT_ABOUT,
        child: Scaffold(
            appBar: CustomAppBar(title: S.of(context).more_menu_abort),
            body: AsyncWidget(
                execAsync: () async => {
                      "packageInfo": await AppUtils.getPackageInfo(),
                      "deviceInfo": await AppUtils.getDeviceInfo()
                    },
                successBuilder: (context, result) {
                  Map<String, dynamic> data = result as Map<String, dynamic>;
                  return _body(context, data["packageInfo"] as PackageInfo,
                      data["deviceInfo"] as String);
                })));
  }
}

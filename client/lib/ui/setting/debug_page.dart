import 'package:client/core/utils/crashlytics_utils.dart';
import 'package:client/core/utils/dialog_util.dart';
import 'package:client/core/utils/local_config.dart';
import 'package:client/core/utils/toast_util.dart';
import 'package:client/core/widget/async_widget.dart';
import 'package:client/generated/i18n.dart';
import 'package:client/ui/widget/custom_app_bar.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class DebugPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: CustomAppBar(title: S.of(context).debug),
        body: AsyncWidget(
          execAsync: () async {
            var deviceId = await LocalConfig.getDeviceId();
            return ListView(
              shrinkWrap: true,
              padding: const EdgeInsets.symmetric(horizontal: 10),
              children: <Widget>[
                ListTile(
                  title: Text("Device Id"),
                  subtitle: Text(deviceId),
                  onTap: () => _copyToClipboard(context, deviceId),
                ),
                ListTile(
                  title: Text("Trigger App Crash"),
                  onTap: () => DialogUtil.show(context,
                      title: "Trigger App Crash",
                      cancelTitle: S.of(context).cancel,
                      okTitle: S.of(context).ok,
                      okCallback: () => CrashlyticsUtil.crash()),
                )
              ],
            );
          },
        ));
  }

  _copyToClipboard(BuildContext context, String text) {
    ClipboardData data = new ClipboardData(text: text);
    Clipboard.setData(data);
    ToastUtil.show(context, "Copied to clipboard.");
  }
}

import 'package:client/core/bloc/app_config/app_config_bloc.dart';
import 'package:client/core/bloc/app_config/bloc.dart';
import 'package:client/core/utils/crashlytics_utils.dart';
import 'package:client/core/utils/dialog_util.dart';
import 'package:client/core/utils/local_config.dart';
import 'package:client/core/utils/toast_util.dart';
import 'package:client/core/widget/async_widget.dart';
import 'package:client/generated/l10n.dart';
import 'package:client/ui/widget/custom_app_bar.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class DebugPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: CustomAppBar(title: S.of(context).debug),
        body: AsyncWidget(
          execAsync: () async {
            var configBloc = BlocProvider.of<AppConfigBloc>(context);
            var config = configBloc.state.appConfig;
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
                    title: Text(
                        config.isUseMaterial ? "Change to Cupertino UI" : "Change to Material UI"),
                    subtitle: Text(config.isUseMaterial ? "Material UI" : "Cupertino UI"),
                    onTap: () {
                      var newConfig = config.copyWith(isUseMaterial: !config.isUseMaterial);
                      configBloc.add(UpdateAppConfigEvent(newConfig));
                    }),
                ListTile(
                    title: Text("Debug"),
                    subtitle: Text(config.isDebug ? "true" : "false"),
                    onTap: () {
                      var newConfig = config.copyWith(isDebug: !config.isDebug);
                      configBloc.add(UpdateAppConfigEvent(newConfig));
                    }),
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

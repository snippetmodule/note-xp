import 'package:client/ui/widget/custom_app_bar.dart';
import 'package:flutter/material.dart';
import 'package:client/generated/i18n.dart';
import 'package:client/ui/widget/listview_extension.dart';
import 'package:client/utils/router_center.dart';

class LoginedWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    List<Widget> list = [
      ListTile(
        leading: Icon(Icons.help),
        title: Text(S.of(context).more_menu_help),
        trailing: Icon(Icons.arrow_forward_ios),
      ),
      ListTile(
        leading: Icon(Icons.help),
        title: Text(S.of(context).more_menu_help_call),
        trailing: Icon(Icons.arrow_forward_ios),
      ),
      ListTile(
        leading: Icon(Icons.help),
        title: Text(S.of(context).more_menu_modify_pass),
        trailing: Icon(Icons.arrow_forward_ios),
      ),
      ListTile(
        leading: Icon(Icons.help),
        title: Text(S.of(context).more_menu_abort),
        trailing: Icon(Icons.arrow_forward_ios),
      ),
      ListTile(
        leading: Icon(Icons.help),
        title: Text(S.of(context).more_menu_logout),
        trailing: Icon(Icons.arrow_forward_ios),
        onTap: () => RouterCenter.openAboutScreen(context),
      ),
    ];

    return ListView(
        children: divideTiles(context: context, tiles: list).toList());
  }
}

import 'package:client/generated/i18n.dart';
import 'package:client/ui/widget/listview_extension.dart';
import 'package:client/utils/router_center.dart';
import 'package:flutter/material.dart';

class UnloginWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    List<Widget> list = [
      ListTile(
          leading: Icon(Icons.help),
          title: Text(S.of(context).more_menu_help),
          trailing: Icon(Icons.arrow_forward_ios),
          onTap: () {
            RouterCenter.openWebView(context, 'https://www.google.com/',
                title: S.of(context).more_menu_help);
          }),
      ListTile(
        leading: Icon(Icons.help),
        title: Text(S.of(context).more_menu_help_call),
        trailing: Icon(Icons.arrow_forward_ios),
      ),
      ListTile(
        leading: Icon(Icons.help),
        title: Text(S.of(context).more_menu_abort),
        trailing: Icon(Icons.arrow_forward_ios),
      )
    ];

    return ListView(
        children: divideTiles(context: context, tiles: list).toList());
  }
}

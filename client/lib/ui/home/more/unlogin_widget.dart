import 'package:client/generated/i18n.dart';
import 'package:client/ui/widget/listview_extension.dart';
import 'package:client/core/utils/router_center.dart';
import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

class UnloginWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    List<Widget> list = [
      ListTile(
          leading: Icon(Icons.help),
          title: Text(S.of(context).more_menu_help),
          trailing: Icon(Icons.arrow_forward_ios),
          onTap: () => {}),
      ListTile(
        leading: Icon(Icons.help),
        title: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: <Widget>[
            Text(S.of(context).more_menu_help_call),
            Text(
              "400-002-2820",
              style: TextStyle(color: Colors.redAccent),
            ),
          ],
        ),
        trailing: Icon(Icons.arrow_forward_ios),
        onTap: () async => {await launch('tel:400-002-2820')},
      ),
      ListTile(
        leading: Icon(Icons.help),
        title: Text(S.of(context).more_menu_abort),
        trailing: Icon(Icons.arrow_forward_ios),
        onTap: () =>{},
      )
    ];

    return ListView(
        children: divideTiles(context: context, tiles: list).toList());
  }
}

import 'package:client/generated/l10n.dart';
import 'package:flutter/material.dart';

class DialogUtil {
  static Future<T> show<T>(
    BuildContext context, {
    bool barrierDismissible = true,
    String title,
    String content,
    WidgetBuilder contentBuilder,
    String cancelTitle,
    GestureTapCallback cancelCallback,
    String okTitle,
    GestureTapCallback okCallback,
  }) {
    return showDialog<T>(
        context: context,
        barrierDismissible: barrierDismissible,
        builder: (BuildContext context) {
          _buildContent(BuildContext context) {
            if (content != null) {
              return Text(content);
            }
            if (contentBuilder == null) {
              return null;
            }
            return SingleChildScrollView(
              child: Column(
                children: <Widget>[contentBuilder(context)],
              ),
            );
          }

          return AlertDialog(
            title: title == null ? null : Text(title),
            content: _buildContent(context),
            actions: <Widget>[
              FlatButton(
                  child: Text(
                    cancelTitle ?? S.of(context).cancel,
                    style: TextStyle(fontSize: 14, color: Theme.of(context).accentColor),
                  ),
                  onPressed: () {
                    Navigator.of(context).pop();
                    cancelCallback?.call();
                  }),
              FlatButton(
                  child: Text(
                    okTitle ?? S.of(context).ok,
                    style: TextStyle(fontSize: 14, color: Theme.of(context).accentColor),
                  ),
                  onPressed: () {
                    Navigator.of(context).pop();
                    okCallback?.call();
                  }),
            ],
          );
        });
  }
}

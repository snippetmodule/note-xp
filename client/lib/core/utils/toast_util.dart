import 'package:flutter/material.dart';
import 'package:toast/toast.dart';

class ToastUtil {
  static void show(BuildContext context, String msg) {
    Toast.show(msg, context, duration: Toast.LENGTH_SHORT, gravity: Toast.BOTTOM);
  }

  static void showL(BuildContext context, String msg) {
    Toast.show(msg, context, duration: Toast.LENGTH_LONG, gravity: Toast.BOTTOM);
  }
}
